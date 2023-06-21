import Querier from "../../utils/querier";
import NormalisedURLDomain from "../../utils/normalisedURLDomain";
import NormalisedURLPath from "../../utils/normalisedURLPath";
import assert from "assert";

describe("Querier", () => {
    let querier;

    beforeEach(() => {
        querier = new Querier("mockRecipeId", {
            apiBasePath: new NormalisedURLPath("/"),
            apiDomain: new NormalisedURLDomain("http://api.example.com"),
            appName: "test",
        });
    });

    describe(".callPreAPIHook()", () => {
        it("don't modify request context if no preAPIHook", async () => {
            // given
            const mockRequestInit = {};
            const mockUrl = "/mock";

            // when
            const result = await querier.callPreAPIHook({
                requestInit: mockRequestInit,
                url: mockUrl,
            });

            assert.deepEqual(result, {
                url: mockUrl,
                requestInit: mockRequestInit,
            });
        });

        it("call preAPIHook and use return to modify request context", async () => {
            // given
            const mockReturnedRequestInit = {
                // Method is not important here, it's just a property that can be used to distinguish
                // provided value vs returned value
                method: "MOCK_RETURNED_METHOD",
            };
            const mockReturnedUrl = "http://api.example.com/mock-returned-url";
            let recievedContext = {};

            const mockPreAPIHook = (context) => {
                recievedContext = context;

                return {
                    url: mockReturnedUrl,
                    requestInit: mockReturnedRequestInit,
                };
            };

            const mockUrl = "http://api.example.com/mock-url";
            const mockRequestInit = {
                method: "MOCK_METHOD",
            };

            // when
            const result = await querier.callPreAPIHook({
                url: mockUrl,
                requestInit: mockRequestInit,
                preAPIHook: mockPreAPIHook,
            });

            assert.deepEqual(recievedContext, {
                url: mockUrl,
                requestInit: mockRequestInit,
            });

            assert.deepEqual(result, {
                url: mockReturnedUrl,
                requestInit: mockReturnedRequestInit,
            });
        });
    });

    describe("common behaviour", async () => {
        let originalCallPreAPI;
        let originalFetch;

        let callAPIParams = {};
        let preAPIContext = {};
        let fetchURL = "";
        let fetchInit = {};

        beforeEach(() => {
            // Mock fetch
            originalFetch = global["fetch"];
            global["fetch"] = (url, requestInit) => {
                fetchURL = url;
                fetchInit = requestInit;
                return {
                    json: () => {
                        return {};
                    },
                    clone: () => {
                        return {
                            json: () => {
                                return {};
                            },
                        };
                    },
                };
            };

            originalCallPreAPI = querier.callPreAPIHook;

            // Mock callPreAPIHook because we want to verify the params
            querier.callPreAPIHook = (params) => {
                callAPIParams = params;
                return originalCallPreAPI(params);
            };
        });

        afterEach(() => {
            // Reset
            querier.callPreAPIHook = originalCallPreAPI;
            callAPIParams = {};
            preAPIContext = {};
            global["fetch"] = originalFetch;
            fetchURL = "";
            fetchInit = {};
        });

        const mockRequestInit = {
            method: "MOCK_METHOD",
        };

        const mockPreAPIHook = (context) => {
            preAPIContext = context;
            return {
                url: "/mock-url",
                requestInit: mockRequestInit,
            };
        };

        it(".get() should call .callPreAPIHook()", async () => {
            // when
            await querier.get(undefined, "/path", {}, {}, mockPreAPIHook);

            assert.deepEqual(callAPIParams["preAPIHook"], mockPreAPIHook);
            // ? added to url due to possible query param input
            assert.equal(callAPIParams["url"], "http://api.example.com/path?");
            assert.notStrictEqual(callAPIParams["requestInit"], undefined);

            assert.equal(preAPIContext["url"], "http://api.example.com/path?");
            assert.notStrictEqual(preAPIContext["requestInit"], undefined);

            assert.equal(fetchURL, "/mock-url");
            assert.deepEqual(fetchInit, mockRequestInit);
        });

        it(".post() should call .callPreAPIHook()", async () => {
            await querier.post(undefined, "/path", { body: JSON.stringify({}) }, mockPreAPIHook);

            assert.deepEqual(callAPIParams["preAPIHook"], mockPreAPIHook);
            // ? added to url due to possible query param input
            assert.equal(callAPIParams["url"], "http://api.example.com/path");
            assert.notStrictEqual(callAPIParams["requestInit"], undefined);

            assert.equal(preAPIContext["url"], "http://api.example.com/path");
            assert.notStrictEqual(preAPIContext["requestInit"], undefined);

            assert.equal(fetchURL, "/mock-url");
            assert.deepEqual(fetchInit, mockRequestInit);
        });

        it(".delete() should call .callPreAPIHook()", async () => {
            await querier.delete(undefined, "/path", { body: JSON.stringify({}) }, mockPreAPIHook);

            assert.deepEqual(callAPIParams["preAPIHook"], mockPreAPIHook);
            // ? added to url due to possible query param input
            assert.equal(callAPIParams["url"], "http://api.example.com/path");
            assert.notStrictEqual(callAPIParams["requestInit"], undefined);

            assert.equal(preAPIContext["url"], "http://api.example.com/path");
            assert.notStrictEqual(preAPIContext["requestInit"], undefined);

            assert.equal(fetchURL, "/mock-url");
            assert.deepEqual(fetchInit, mockRequestInit);
        });

        it(".put() should call .callPreAPIHook()", async () => {
            await querier.put(undefined, "/path", { body: JSON.stringify({}) }, mockPreAPIHook);

            assert.deepEqual(callAPIParams["preAPIHook"], mockPreAPIHook);
            // ? added to url due to possible query param input
            assert.equal(callAPIParams["url"], "http://api.example.com/path");
            assert.notStrictEqual(callAPIParams["requestInit"], undefined);

            assert.equal(preAPIContext["url"], "http://api.example.com/path");
            assert.notStrictEqual(preAPIContext["requestInit"], undefined);

            assert.equal(fetchURL, "/mock-url");
            assert.deepEqual(fetchInit, mockRequestInit);
        });

        it(".get() should prepend tenantId if defined", async () => {
            // when
            await querier.get("testTenant", "/path", {}, {}, mockPreAPIHook);

            assert.deepEqual(callAPIParams["preAPIHook"], mockPreAPIHook);
            // ? added to url due to possible query param input
            assert.equal(callAPIParams["url"], "http://api.example.com/testTenant/path?");
            assert.notStrictEqual(callAPIParams["requestInit"], undefined);

            assert.equal(preAPIContext["url"], "http://api.example.com/testTenant/path?");
            assert.notStrictEqual(preAPIContext["requestInit"], undefined);

            assert.equal(fetchURL, "/mock-url");
            assert.deepEqual(fetchInit, mockRequestInit);
        });

        it(".post() should prepend tenantId if defined", async () => {
            await querier.post("testTenant", "/path", { body: JSON.stringify({}) }, mockPreAPIHook);

            assert.deepEqual(callAPIParams["preAPIHook"], mockPreAPIHook);
            // ? added to url due to possible query param input
            assert.equal(callAPIParams["url"], "http://api.example.com/testTenant/path");
            assert.notStrictEqual(callAPIParams["requestInit"], undefined);

            assert.equal(preAPIContext["url"], "http://api.example.com/testTenant/path");
            assert.notStrictEqual(preAPIContext["requestInit"], undefined);

            assert.equal(fetchURL, "/mock-url");
            assert.deepEqual(fetchInit, mockRequestInit);
        });

        it(".delete() should prepend tenantId if defined", async () => {
            await querier.delete("testTenant", "/path", { body: JSON.stringify({}) }, mockPreAPIHook);

            assert.deepEqual(callAPIParams["preAPIHook"], mockPreAPIHook);
            // ? added to url due to possible query param input
            assert.equal(callAPIParams["url"], "http://api.example.com/testTenant/path");
            assert.notStrictEqual(callAPIParams["requestInit"], undefined);

            assert.equal(preAPIContext["url"], "http://api.example.com/testTenant/path");
            assert.notStrictEqual(preAPIContext["requestInit"], undefined);

            assert.equal(fetchURL, "/mock-url");
            assert.deepEqual(fetchInit, mockRequestInit);
        });

        it(".put() should prepend tenantId if defined", async () => {
            await querier.put("testTenant", "/path", { body: JSON.stringify({}) }, mockPreAPIHook);

            assert.deepEqual(callAPIParams["preAPIHook"], mockPreAPIHook);
            // ? added to url due to possible query param input
            assert.equal(callAPIParams["url"], "http://api.example.com/testTenant/path");
            assert.notStrictEqual(callAPIParams["requestInit"], undefined);

            assert.equal(preAPIContext["url"], "http://api.example.com/testTenant/path");
            assert.notStrictEqual(preAPIContext["requestInit"], undefined);

            assert.equal(fetchURL, "/mock-url");
            assert.deepEqual(fetchInit, mockRequestInit);
        });
    });
});
