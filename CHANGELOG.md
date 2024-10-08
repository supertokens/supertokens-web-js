# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html)

## [unreleased]

## [0.14.0] - 2024-10-07

-   Added the OAuth2Provider recipe

### Breaking changes

-   Added a new `shouldTryLinkingToSessionUser` flag to sign in/up related function inputs:
    -   No action is needed if you are not using MFA/session based account linking.
    -   If you are implementing MFA:
        -   Plase set this flag to `false` (or leave as undefined) during first factor sign-ins
        -   Please set this flag to `true` for secondary factors.
        -   Please forward this flag to the original implementation in any of your overrides.
    -   Changed functions:
        -   `EmailPassword.signIn`, `EmailPassword.signUp`: both override and callable functions
        -   `ThirdParty.getAuthorisationURLWithQueryParamsAndSetState`: both override and callable function
        -   `Passwordless`:
            -   Functions overrides: `consumeCode`, `resendCode`, `createCode`, `setLoginAttemptInfo`, `getLoginAttemptInfo`
            -   Calling `createCode` and `setLoginAttemptInfo` take this flag as an optional input (it defaults to false)
-   Changed the default implementation of `getTenantId` to default to the `tenantId` query parameter (if present) then falling back to the public tenant instead of always defaulting to the public tenant
-   We now disable session based account linking in the magic link based flow in passwordless by default
    -   This is to make it function more consistently instead of only working if the link was opened on the same device
    -   You can override by overriding the `consumeCode` function in the Passwordless Recipe (see in the Migration guide section below for more information)

### Migration guide

#### Session based account linking for magic link based flows

You can re-enable linking by overriding the `consumeCode` function in the passwordless recipe and setting `shouldTryLinkingToSessionUser` to `true`.

```ts
Passwordless.init({
    override: {
        functions: (original) => {
            return {
                ...original,
                consumeCode: async (input) => {
                    // Please note that this is means that the session is required and will cause an error if it is not present
                    return original.consumeCode({ ...input, shouldTryLinkingWithSessionUser: true });
                },
            };
        },
    },
});
```

## [0.13.1] - 2024-10-08

-   Changes bundle file names to include a hash.

## [0.13.0] - 2024-07-10

### Breaking Changes

-   Removes the default `maxAgeInSeconds` value (previously 300 seconds) in EmailVerification Claim. If the claim value is true and `maxAgeInSeconds` is not provided, it will not be refreshed.

## [0.12.0] - 2024-05-24

### Breaking Changes

-   Removed ThirdPartyEmailPassword and ThirdPartyPasswordless recipes
-   Dropped support for FDI version 1.X
-   Added support for FDI version 2.0 and 3.0
-   Removed `createCode`, `resendCode` and `consumeCode` from the exports of `recipe/passwordless/utils`
-   Added the `SESSION_ALREADY_EXISTS` event to the session recipe. This is used by our pre-built UI.

### Migration guide

-   If you were using `ThirdPartyEmailPassword`, you should now init `ThirdParty` and `EmailPassword` recipes separately. The config for the individual recipes are mostly the same, except the syntax may be different. Check our recipe guides for [ThirdParty](https://supertokens.com/docs/thirdparty/introduction) and [EmailPassword](https://supertokens.com/docs/emailpassword/introduction) for more information.

-   If you were using `ThirdPartyPasswordless`, you should now init `ThirdParty` and `Passwordless` recipes separately. The config for the individual recipes are mostly the same, except the syntax may be different. Check our recipe guides for [ThirdParty](https://supertokens.com/docs/thirdparty/introduction) and [Passwordless](https://supertokens.com/docs/passwordless/introduction) for more information.

## [0.11.0] - 2024-05-09

### Breaking changes

The `shouldDoInterceptionBasedOnUrl` function now returns true:

-   If sessionTokenBackendDomain is a valid subdomain of the URL's domain. This aligns with the behavior of browsers when sending cookies to subdomains.
-   Even if the ports of the URL you are querying are different compared to the apiDomain's port ot the sessionTokenBackendDomain port (as long as the hostname is the same, or a subdomain of the sessionTokenBackendDomain): #217

## [0.10.1] - 2024-04-08

#### Fixes

-   Reduced the number of unnecessary email verification checks by fixing the default values for `refetchTimeOnFalseInSeconds` and `maxAgeInSeconds`

## [0.10.0] - 2024-03-03

### Overview

#### Introducing multi-factor authentication

With this release, we are introducing MultiFactorAuthentication and TOTP, this will let you:

-   require (2FA or MFA) during sign in
-   make use of our TOTP

Check our [guide](https://supertokens.com/docs/thirdpartyemailpassword/common-customizations/multi-factor-auth/overview) for more information.

### Changes

-   Added support for FDI 1.19 (Node SDK>= 17.0.0), but keeping support FDI version 1.17 and 1.18 (node >= 15.0.0, golang>=0.13, python>=0.15.0)
-   Added the `MultiFactorAuth` and `TOTP` recipes. To start using them you'll need compatible versions:
    -   Core>=8.0.0
    -   supertokens-node>=17.0.0
    -   supertokens-website>=18.0.0
    -   supertokens-web-js>=0.10.0
    -   supertokens-auth-react>=0.39.0

### Breaking changes

-   Added `firstFactors` into the return type of `getLoginMethods` and removed the enabled flags of different login methods.
    -   For older FDI versions, the firstFactors array will be calculated based on those enabled flags.
-   Renamed `validatorId` in claim validation errors to `id` to match the backend SDKs

### Migration guide

#### getLoginMethods interface change

If you used to use the enabled flags in getLoginMethods:

Before:

```ts
async function checkLoginMethods() {
    const loginMethods = await Multitenancy.getLoginMethods();
    if (loginMethods.thirdParty.enabled) {
        // custom logic
    }
    if (loginMethods.emailPassword.enabled) {
        // custom logic
    }
    if (loginMethods.passwordless.enabled) {
        // custom logic
    }
}
```

After:

```ts
async function checkLoginMethods() {
    const loginMethods = await Multitenancy.getLoginMethods();
    if (loginMethods.firstFactors.includes("thirdparty")) {
        // custom logic
    }
    if (loginMethods.firstFactors.includes("emailpassword")) {
        // custom logic
    }

    if (
        loginMethods.firstFactors.includes("otp-email") ||
        loginMethods.firstFactors.includes("otp-phone") ||
        loginMethods.firstFactors.includes("link-email") ||
        loginMethods.firstFactors.includes("link-phone")
    ) {
        // custom logic
    }
}
```

#### Renamed validatorId

If you used to use the `validatorId` prop of validationErrors, you should now use `id` instead.

Before:

```ts
async function checkValidators() {
    const validationErrors = await Session.validateClaims();
    for (const error of validationErrors) {
        console.log(error.validatorId, error.reason);
    }
}
```

After:

```ts
async function checkValidators() {
    const validationErrors = await Session.validateClaims();
    for (const error of validationErrors) {
        console.log(error.id, error.reason);
    }
}
```

## [0.9.1] - 2024-02-07

### Changes

-   Added `dateprovider.js` bundle file to enable importing `DateProvider` via a script tag

## [0.9.0] - 2024-01-18

## Breaking Changes

-   The default `DateProvider` implementation relies on `localStorage`. If your environment lacks support for `localStorage`, you must provide custom implementations for either the `DateProvider` or `localStorage`.

### Changes

-   `EmailVerificationClaim` now uses `DateProvider` to account for clock skew.
-   Exporting the `DateProvider` from supertokens-website, that both built-in and custom validators can use instead of `Date.now` to get an estimate of the server clock.
-   Added the `dateProvider` prop to the configuration that can be used to customize the built-in `DateProvider`.
-   Added `calculateClockSkewInMillis` as an overrideable function to the Session recipe that estimates the time difference between the backend and the client.
-   Fix "MultiTenancy not initialized" error being thrown instead of "SuperTokens not initialized" when calling recipe methods directly without initializing SuperTokens first.

## [0.8.0] - 2023-09-25

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
