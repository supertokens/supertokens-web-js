# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html)

## [unreleased]

## [0.3.0] - 2022-10-17

### Added

-   Adding an interceptor for XMLHttpRequest by default upon initializing SuperTokens
-   Marked `addAxiosInterceptors` as deprecated
-   Request interception can now be disabled by adding `superTokensDoNotDoInterception` to the hash of the request (works as a queryparam as well)

### Changes

-   Make the UserRoleClaim and PermissionClaim never expire by default (you can still use the `maxAgeInSeconds` param of validators to check expiration)

## [0.2.1] - 2022-09-14

### Changes

-   Fix type of parameter for `Passwordless.consumeCode`

## [0.2.0] - 2022-09-14

### Added

-   Session claims related types/classes and the `validateClaims` & `getClaimValue` functions
-   Added `getInvalidClaimsFromResponse` to the SessionClass to help parsing responses with invalid claim errors
-   Added `API_INVALID_CLAIM` event to the Session recipe
-   Added `UserRoleClaim` and `PermissionClaim`

### Breaking changes

-   Only supporting FDI 1.15
-   Backend SDKs have to be updated first to a version that supports session claims before enabling EmailVerification!
    -   supertokens-node: >= 12.0
    -   supertokens-golang: >= 0.9
    -   supertokens-python >= 0.11
-   EmailVerification recipe is now not initialized as part of auth recipes. You can add it to the recipe list as `EmailVerification.init` like other recipes.
-   Removed `verifyEmail`, `sendVerificationEmail` and `isEmailVerified` from auth recipes. These should now be called on the `EmailVerification` recipe
-   Moved email verification related events, overrides, pre-api hooks and redirection contexts into the `EmailVerification` recipe. You should configure them while initializing the `EmailVerification` recipe.
-   Fix typing of `consumeCode` in the passwordless recipe

### Migration

#### EmailVerification recipe init

```ts
SuperTokens.init({
    // Normal init conf...
    recipeList: [
        EmailPassword.init({
            preAPIHook: (context) => {
                // Move email verification related pre-API hooks into the preAPIHook of the EmailVerification config
            },
            postAPIHook: (context) => {
                // Move email verification related post-API hooks into the postAPIHook of the EmailVerification config
            }
            override: {
                emailVerificationFeature: {
                    // These overrides should be moved into the config of the EmailVerification recipe
                }
            }
        }),
    ]
})
```

Should become:

```ts
SuperTokens.init({
    // Normal init conf...
    recipeList: [
        EmailVerification.init({
            // Props from emailVerificationFeature of the EmailPassword.init config should be moved here.
            override: {
                // The overrides from emailVerificationFeature in the overrides of the EmailPassword config should be moved here
            },

            preAPIHook: (context) => {
                // Move email verification related pre-API hooks here
            },
            postAPIHook: (context) => {
                // Move email verification related post-API hooks here
            },
        }),
        EmailPassword.init({}),
    ],
});
```

## [0.1.6] - 2022-08-23

### Changed

-   Makes the input argument for `consumePasswordlessCode` in ThirdPartyPasswordless optional.

## [0.1.5] - 2022-08-11

### Changed

-   Refactors the way the SDK exports recipe functions and utilities

## [0.1.4] - 2022-07-30

-   Corrects error message thrown from ThirdParty recipe if its init function is not called.

## [0.1.3] - 2022-07-18

## Bug fixes

-   Fixes an issue with webpack configuration that resulted in custom window and cookie handlers to not get initialised correctly

## [0.1.2] - 2022-07-06

## Bug Fixes

-   Fixes an issue where `Passwordless.consumeCode` was not honoring the API spec

## [0.1.1] - 2022-06-27

-   Updates supertokens-website dependency to reflect change in cookieHandler interface

## [0.1.0] - 2022-06-22

### Adds

-   New FDI support (1.14)

### Breaking Changes

-   Removes `setCookieSync` and `getCookieSync` from the interface for `cookieHandler` when calling `SuperTokens.init`
-   Updates dependency version for supertokens website to support General Error handling

## [0.0.2] - 2022-06-03

-   Minor changes

## [0.0.1] - 2022-06-02

-   Initial Release
