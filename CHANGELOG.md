# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html)

## [unreleased]

### Added

-   Session claims related types/classes and the validateClaims function
-   Added `getInvalidClaimsFromResponse` to the SessionClass to help parsing responses with invalid claim errors
-   Added `API_INVALID_CLAIM` event to the Session recipe

### Breaking changes

-   Backend SDKs have to be updated first to a version that supports session claims before enabling EmailVerification!
    -   supertokens-node: 12.0
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

## [0.0.2] - 2022-06-03

-   Minor changes

## [0.0.1] - 2022-06-02

-   Initial Release
