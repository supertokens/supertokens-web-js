# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html)

## [unreleased]

## Changed

-   Refactors the way the SDK exports recipe functions and utilities

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
