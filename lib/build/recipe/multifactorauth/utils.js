"use strict";
var __assign =
    (this && this.__assign) ||
    function () {
        __assign =
            Object.assign ||
            function (t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                }
                return t;
            };
        return __assign.apply(this, arguments);
    };
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkFactorRequirement = exports.normaliseUserInput = void 0;
/* Copyright (c) 2022, VRAI Labs and/or its affiliates. All rights reserved.
 *
 * This software is licensed under the Apache License, Version 2.0 (the
 * "License") as published by the Apache Software Foundation.
 *
 * You may not use this file except in compliance with the License. You may
 * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */
var utils_1 = require("../authRecipe/utils");
function normaliseUserInput(config) {
    var _a;
    var override = __assign(
        {
            functions: function (originalImplementation) {
                return originalImplementation;
            },
        },
        config.override
    );
    return __assign(__assign({}, (0, utils_1.normaliseAuthRecipe)(config)), {
        override: override,
        customFactorChecker:
            (_a = config.customFactorChecker) !== null && _a !== void 0
                ? _a
                : function () {
                      return undefined;
                  },
    });
}
exports.normaliseUserInput = normaliseUserInput;
function checkFactorRequirement(req, completedFactors) {
    if (typeof req === "string") {
        return {
            id: req,
            isValid: completedFactors[req] !== undefined,
            message: "Not completed",
        };
    } else {
        // We could loop through factor validators added by other recipes here.
        if (req.params === undefined) {
            return {
                id: req.id,
                isValid: completedFactors[req.id] !== undefined,
                message: "Not completed",
            };
        }
        return {
            id: req.id,
            isValid: false,
            message: "Factor checker not configured for " + req.id,
        };
    }
}
exports.checkFactorRequirement = checkFactorRequirement;