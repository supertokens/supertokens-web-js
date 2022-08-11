import assert from "assert";
import SuperTokens from "../../lib/build/supertokens";

describe("Exports", function () {
    beforeEach(function () {
        SuperTokens.reset();
    });

    describe("Passwordless", function () {
        it("Utils", function () {
            let _default = require("../../recipe/passwordless/utils");
            let { consumeCode, createCode, resendCode } = require("../../recipe/passwordless/utils");

            assert(createCode !== undefined && _default.createCode !== undefined);
            assert(consumeCode !== undefined && _default.consumeCode !== undefined);
            assert(resendCode !== undefined && _default.resendCode !== undefined);
        });
    });
});
