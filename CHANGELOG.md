# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html)

## [unreleased]

## [0.8.0] - 2023-XX-XX

### Overview

#### Introducing account-linking

With this release, we are introducing AccountLinking, this will let you:

-   link accounts automatically,
-   implement manual account linking flows.

Check our [guide](https://supertokens.com/docs/thirdpartyemailpassword/common-customizations/account-linking/overview) for more information.

To use this you'll need compatible versions:

-   Core>=7.0.0
-   supertokens-node>=16.0.0 (support is pending in other backend SDKs)
-   supertokens-website>=17.0.3
-   supertokens-web-js>=0.8.0
-   supertokens-auth-react>=0.35.0

### Breaking changes

-   Added support for FDI 1.18 (Node SDK>= 16.0.0), but keeping support FDI version1.17 (node >= 15.0.0, golang>=0.13, python>=0.15.0)
-   User type has changed across recipes and functions: recipe specific user types have been removed and replaced by a generic one that contains more information
-   `createdNewUser` has been renamed to `createdNewRecipeUser`
-   `createCode`, `consumeCode`, `createPasswordlessCode` and `consumePasswordlessCode` can now return status: `SIGN_IN_UP_NOT_ALLOWED`
-   `signInAndUp` and `thirdPartySignInAndUp` can now return new status: `SIGN_IN_UP_NOT_ALLOWED`
-   `sendPasswordResetEmail` can now return `status: "PASSWORD_RESET_NOT_ALLOWED"`
-   `signIn` and `emailPasswordSignIn` can now return `SIGN_IN_NOT_ALLOWED`
-   `signUp` and `emailPasswordSignUp` can now return `SIGN_UP_NOT_ALLOWED`

### Migration

#### New User structure

We've added a generic `User` type instead of the old recipe specific ones. The mapping of old props to new in case you are not using account-linking:

-   `user.id` stays `user.id`
-   `user.email` becomes `user.emails[0]`
-   `user.phoneNumber` becomes `user.phoneNumbers[0]`
-   `user.thirdParty` becomes `user.thirdParty[0]`
-   `user.timeJoined` is still `user.timeJoined`
-   `user.tenantIds` is still `user.tenantIds`

#### Checking if a user signed up or signed in

-   When calling passwordless consumeCode / social login signinup APIs, you can check if a user signed up by:

```
    // Here res refers to the result the function/api functions mentioned above.
    const isNewUser = res.createdNewRecipeUser && res.user.loginMethods.length === 1;
```

-   When calling the emailpassword sign up API, you can check if a user signed up by:

```
    const isNewUser = res.user.loginMethods.length === 1;
```

## [0.7.3] - 2023-08-21

### Fixes

-   Fixed `clientType` usage in `thirdpartypasswordless`

## [0.7.2] - 2023-08-07

### Fixes

-   Fixed `clientType` usage in `thirdpartyemailpassword` and `thirdpartypasswordless`

## [0.7.1] - 2023-07-31

### Changes

-   Removed unused tenant id param from `isEmailVerified` and `sendVerificationEmail` requests

## [0.7.0] - 2023-07-19

### Added

-   Multitenancy recipe
-   Added an overrideable `getTenantIdFromURL` to multiple recipes
-   Optional `clientType` config in the input for `SuperTokens.init` function, that is used by thirdparty and multitenancy recipes.

### Breaking changes

-   Only supporting FDI 1.17
-   Backend SDKs have to be updated first to a version that supports multi-tenancy for thirdparty
    -   supertokens-node: >= 15.0.0
    -   supertokens-golang: >= 0.13.0
    -   supertokens-python: >= 0.15.0
-   In ThirdParty recipe,
    -   Changed signatures of the functions `getAuthorisationURLWithQueryParamsAndSetState`
    -   Removed functions - `setStateAndOtherInfoToStorage`, `getAuthorisationURLFromBackend`, `generateStateToSendToOAuthProvider`, `verifyAndGetStateOrThrowError`, `getAuthCodeFromURL`, `getAuthErrorFromURL`, `getAuthStateFromURL`
-   In ThirdPartyEmailpassword recipe,
    -   Changed signatures of the functions `getAuthorisationURLWithQueryParamsAndSetState`
    -   Removed functions - `setStateAndOtherInfoToStorage`, `getAuthorisationURLFromBackend`, `generateStateToSendToOAuthProvider`, `verifyAndGetStateOrThrowError`, `getAuthCodeFromURL`, `getAuthErrorFromURL`, `getAuthStateFromURL`
-   In ThirdPartyPasswordless recipe,
    -   Changed signatures of the functions `getThirdPartyAuthorisationURLWithQueryParamsAndSetState`
    -   Removed functions - `setThirdPartyStateAndOtherInfoToStorage`, `getAuthorisationURLFromBackend`, `generateThirdPartyStateToSendToOAuthProvider`, `verifyAndGetThirdPartyStateOrThrowError`, `getThirdPartyAuthCodeFromURL`, `getThirdPartyAuthErrorFromURL`, `getThirdPartyAuthStateFromURL`

### Changes

-   Updates dependencies and backend config for the vue with-thirdpartyemailpassword example app

### Migration

#### Renamed parameters in `getAuthorisationURLWithQueryParamsAndSetState`

Before:

```
    const authUrl = await ThirdPartyEmailPassword.getAuthorisationURLWithQueryParamsAndSetState({
        providerId: "google",
        authorisationURL: `${websiteDomain}/auth/callback/google`,
    });
```

After:

```
    const authUrl = await ThirdPartyEmailPassword.getAuthorisationURLWithQueryParamsAndSetState({
        thirdPartyId: "google",
        frontendRedirectURI: `${websiteDomain}/auth/callback/google`,
    });
```

##### If the provider is redirecting to the backend directly (i.e.: Apple)

Before:

```
    const authUrl = await ThirdPartyEmailPassword.getAuthorisationURLWithQueryParamsAndSetState({
        providerId: "apple",
        authorisationURL: `${websiteDomain}/auth/callback/apple`,
    });
```

After:

```
    const authUrl = await ThirdPartyEmailPassword.getAuthorisationURLWithQueryParamsAndSetState({
        thirdPartyId: "apple",
        frontendRedirectURI: `${websiteDomain}/auth/callback/apple`,
        redirectURIOnProviderDashboard: `${apiDomain}/auth/callback/apple`
    });
```

## [0.6.0] - 2023-03-14

## Additions

-   Re-export getGlobalClaimValidators function from supertokens-website
-   Re-export PrimitiveArrayClaimConfig & PrimitiveClaimConfig from supertokens-website

## Breaking changes

-   Remove EmailVerificationClaimClass constructor's updateContextOnIsVerifiedFalse prop
-   Update to web-js interface version
-   Updated supertokens website dependency, which made SessionClaimValidator a type instead of an abstract class

## [0.5.0] - 2023-02-01

## Breaking changes

-   Only supporting FDI 1.16
-   Updated `supertokens-website` dependency that requires a backend SDK update to:
    -   supertokens-node: >= 13.0.0
    -   supertokens-python: >= 0.12.0
    -   supertokens-golang: >= 0.10.0
-   Renamed configuration options:
    -   `sessionScope` renamed to `sessionTokenFrontendDomain`
    -   `cookieDomain` renamed to `sessionTokenBackendDomain`

### Added

-   Added support for authorizing requests using the `Authorization` header instead of cookies
    -   Added `tokenTransferMethod` config option
    -   Check out https://supertokens.com/docs/thirdpartyemailpassword/common-customizations/sessions/token-transfer-method for more information

## [0.4.0] - 2023-01-19

### Added

-   Re-exporting `cookieHandler`, `windowHandler` and `sessionClaimValidatorStore` from supertokens-website.

### Breaking Changes

-   Updated website dependency, which added `getWindowUnsafe` to the WindowHandlerInterface. This function should return the raw window object.

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
