![SuperTokens banner](https://raw.githubusercontent.com/supertokens/supertokens-logo/master/images/Artboard%20%E2%80%93%2027%402x.png)

# SuperTokens ThirdPartyEmailPassword Demo app for Vue

This demo app demonstrates the following use cases:

-   Social Login / Sign up
-   Email & Password login
-   Logout
-   Session management & Calling APIs

## Project setup

Use `npm` to install the project dependencies:

```bash
npm install
```

## Run the demo app

This compiles and serves the React app and starts the backend API server on port 3001.

```bash
npm run dev
```

The app will start on `http://localhost:3000`

If you would like to modify the website (http://localhost:3000) or the API server (http://localhost:3001) URL:

-   Change the `apiPort` or `apiDomain` values in `api-server.js`
-   Change the `apiPort` or `apiDomain` values in `src/main.ts`
-   Change the `websitePort` or `websiteDomain` values in `api-server.js`
-   Change the `websitePort` or `websiteDomain` values in `src/views/AuthCallvackView.vue`

## Project structure & Parameters

-   The frontend code is located in the `src` folder.
-   The backend API is in the `api-server.js` file.

## Author

Created with :heart: by the folks at supertokens.com.

## License

This project is licensed under the Apache 2.0 license.
