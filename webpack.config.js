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
            filename: "supertokens.[contenthash].js",
            dependOn: "supertokensWebsite",
        },
        supertokensSession: {
            import: APP_DIR + "/lib/build/recipe/session/index.js",
            filename: "session.[contenthash].js",
            dependOn: "supertokensWebsite",
        },
        supertokensEmailVerification: {
            import: APP_DIR + "/lib/build/recipe/emailverification/index.js",
            filename: "emailverification.[contenthash].js",
            dependOn: "supertokensWebsite",
        },
        supertokensEmailPassword: {
            import: APP_DIR + "/lib/build/recipe/emailpassword/index.js",
            filename: "emailpassword.[contenthash].js",
            dependOn: "supertokensWebsite",
        },
        supertokensThirdParty: {
            import: APP_DIR + "/lib/build/recipe/thirdparty/index.js",
            filename: "thirdparty.[contenthash].js",
            dependOn: "supertokensWebsite",
        },
        supertokensPasswordless: {
            import: APP_DIR + "/lib/build/recipe/passwordless/index.js",
            filename: "passwordless.[contenthash].js",
            dependOn: "supertokensWebsite",
        },
        supertokensUserRoles: {
            import: APP_DIR + "/lib/build/recipe/userroles/index.js",
            filename: "userroles.[contenthash].js",
            dependOn: "supertokensWebsite",
        },
        supertokensMultitenancy: {
            import: APP_DIR + "/lib/build/recipe/multitenancy/index.js",
            filename: "multitenancy.[contenthash].js",
            dependOn: "supertokensWebsite",
        },
        supertokensMultiFactorAuth: {
            import: APP_DIR + "/lib/build/recipe/multifactorauth/index.js",
            filename: "multifactorauth.[contenthash].js",
            dependOn: "supertokensWebsite",
        },
        supertokensTOTP: {
            import: APP_DIR + "/lib/build/recipe/totp/index.js",
            filename: "totp.[contenthash].js",
            dependOn: "supertokensWebsite",
        },
        supertokensOAuth2Provider: {
            import: APP_DIR + "/lib/build/recipe/oauth2provider/index.js",
            filename: "oauth2provider.[contenthash].js",
            dependOn: "supertokensWebsite",
        },
        /**
         * The import path is /utils/dateProvider/index.js instead of /lib/build/dateProvider/index.js because the supertokens.js also imports
         * the dateProvider from the build folder and that creates a dependency requiring us to load dateprovider.js bundle before supertokens.js.
         * However, this issue doesn't happen if we use the /utils/dateProvider/index.js file as import path.
         */
        supertokensDateProvider: {
            import: APP_DIR + "/utils/dateProvider/index.js",
            filename: "dateprovider.[contenthash].js",
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
            filename: "website.[contenthash].js",
        },
    },
    output: {
        path: BUILD_DIR + "/bundle",
        library: "[name]",
    },
};

module.exports = config;
