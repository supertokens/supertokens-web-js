"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isVersionCompatible = void 0;
var parseVersion = function (version) {
    var match = version.match(/^(\d+)\.(\d+)\.(\d+)(?:-(.+))?$/);
    if (!match) {
        throw new Error("Invalid version format: ".concat(version));
    }
    return {
        major: parseInt(match[1]),
        minor: parseInt(match[2]),
        patch: parseInt(match[3]),
        prerelease: match[4],
    };
};
var compareVersions = function (a, b) {
    if (a.major !== b.major)
        return a.major - b.major;
    if (a.minor !== b.minor)
        return a.minor - b.minor;
    if (a.patch !== b.patch)
        return a.patch - b.patch;
    // canary versions
    if (a.prerelease && !b.prerelease)
        return -1;
    if (!a.prerelease && b.prerelease)
        return 1;
    if (a.prerelease && b.prerelease) {
        return a.prerelease.localeCompare(b.prerelease);
    }
    return 0;
};
// checks if a version satisfies a range constraint. supports: ">=0.49.0", "0.49.x", "~0.49.0", "^0.49.0", "0.49.1"
var satisfiesRange = function (version, range) {
    var parsedVersion = parseVersion(version);
    if (range === version)
        return true;
    var rangeMatch = range.match(/^([<>=~^]+)\s*(.+)$/);
    if (rangeMatch) {
        var operator = rangeMatch[1];
        var rangeVersion = rangeMatch[2];
        var parsedRangeVersion = parseVersion(rangeVersion);
        var comparison = compareVersions(parsedVersion, parsedRangeVersion);
        switch (operator) {
            case ">=":
                return comparison >= 0;
            case ">":
                return comparison > 0;
            case "<=":
                return comparison <= 0;
            case "<":
                return comparison < 0;
            case "=":
            case "==":
                return comparison === 0;
            case "~":
                return (parsedVersion.major === parsedRangeVersion.major &&
                    parsedVersion.minor === parsedRangeVersion.minor &&
                    parsedVersion.patch >= parsedRangeVersion.patch);
            case "^":
                if (parsedRangeVersion.major === 0) {
                    return (parsedVersion.major === 0 &&
                        parsedVersion.minor === parsedRangeVersion.minor &&
                        parsedVersion.patch >= parsedRangeVersion.patch);
                }
                else {
                    return (parsedVersion.major === parsedRangeVersion.major &&
                        parsedVersion.minor >= parsedRangeVersion.minor);
                }
            default:
                return false;
        }
    }
    // x-ranges like "0.49.x"
    var xRangeMatch = range.match(/^(\d+)\.(\d+)\.x$/);
    if (xRangeMatch) {
        return (parsedVersion.major === parseInt(xRangeMatch[1], 10) && parsedVersion.minor === parseInt(xRangeMatch[2], 10));
    }
    // wildcard ranges like "0.x"
    var wildcardMatch = range.match(/^(\d+)\.x$/);
    if (wildcardMatch) {
        return parsedVersion.major === parseInt(wildcardMatch[1], 10);
    }
    var exactRangeVersion = parseVersion(range);
    return compareVersions(parsedVersion, exactRangeVersion) === 0;
};
var isVersionCompatible = function (currentVersion, constraints) {
    var constraintArray = Array.isArray(constraints) ? constraints : [constraints];
    for (var _i = 0, constraintArray_1 = constraintArray; _i < constraintArray_1.length; _i++) {
        var constraint = constraintArray_1[_i];
        if (satisfiesRange(currentVersion, constraint)) {
            return true;
        }
    }
    return false;
};
exports.isVersionCompatible = isVersionCompatible;
