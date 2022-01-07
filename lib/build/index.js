"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
var supertokens_1 = require("./supertokens");
// TODO: Implement
var SuperTokensAPIWrapper = /** @class */ (function () {
    function SuperTokensAPIWrapper() {}
    SuperTokensAPIWrapper.init = function (config) {
        supertokens_1.default.init(config);
    };
    return SuperTokensAPIWrapper;
})();
exports.default = SuperTokensAPIWrapper;
exports.init = SuperTokensAPIWrapper.init;
