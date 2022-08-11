var webpack = require("webpack");
var path = require("path");

var BUILD_DIR = path.resolve(__dirname, "");
var APP_DIR = path.resolve(__dirname, "");
var version = JSON.stringify(require("./package.json").version);

var config = {
    /**
     * The key of the object should be what you want the variable to be named after
     * the user imports it as a script.
     *
     * The `import` property tells webpack what file to use as the starting point
     * The `filename` property is the name of the bundle file
     */
    entry: {
        supertokens: {
            import: APP_DIR + "/lib/build/bundleEntry.js",
            filename: "supertokens.js",
            dependOn: "supertokensWebsite",
        },
        supertokensSession: {
            import: APP_DIR + "/lib/build/recipe/session/index.js",
            filename: "session.js",
            dependOn: "supertokensWebsite",
        },
        supertokensEmailVerification: {
            import: APP_DIR + "/lib/build/recipe/emailverification/index.js",
            filename: "emailverification.js",
            dependOn: "supertokensWebsite",
        },
        supertokensEmailPassword: {
            import: APP_DIR + "/lib/build/recipe/emailpassword/index.js",
            filename: "emailpassword.js",
            dependOn: "supertokensWebsite",
        },
        supertokensThirdParty: {
            import: APP_DIR + "/lib/build/recipe/thirdparty/index.js",
            filename: "thirdparty.js",
            dependOn: "supertokensWebsite",
        },
        supertokensThirdPartyEmailPassword: {
            import: APP_DIR + "/lib/build/recipe/thirdpartyemailpassword/index.js",
            filename: "thirdpartyemailpassword.js",
            dependOn: "supertokensWebsite",
        },
        supertokensPasswordless: {
            import: APP_DIR + "/lib/build/recipe/passwordless/index.js",
            filename: "passwordless.js",
            dependOn: "supertokensWebsite",
        },
        supertokensThirdPartyPasswordless: {
            import: APP_DIR + "/lib/build/recipe/thirdpartypasswordless/index.js",
            filename: "thirdpartypasswordless.js",
            dependOn: "supertokensWebsite",
        },
        supertokensUserRoles: {
            import: APP_DIR + "/lib/build/recipe/userroles/index.js",
            filename: "userroles.js",
            dependOn: "supertokensWebsite",
        },
        /**
         * Without this webpack will bundle supertokens-website as independent references
         * within each recipe bundle. Any shared resources (WindowHandler for example) will no
         * longer be initialised in this case
         *
         * By separating this and making the recipes depend on this new bundle we ensure that all
         * usages of the supertokens-website SDK use the same reference.
         */
        supertokensWebsite: {
            import: "supertokens-website",
            filename: "website.js",
        },
    },
    output: {
        path: BUILD_DIR + "/bundle",
        library: "[name]",
    },
};

module.exports = config;
