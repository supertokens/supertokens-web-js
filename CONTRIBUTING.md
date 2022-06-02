# Contributing

We're so excited you're interested in helping with SuperTokens! We are happy to help you get started, even if you don't have any previous open-source experience :blush:

## New to Open Source?

1. Take a look at [How to Contribute to an Open Source Project on GitHub](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github)
2. Go through the [SuperTokens Code of Conduct](https://github.com/supertokens/supertokens-web-js/blob/master/CODE_OF_CONDUCT.md)

## Where to ask Questions?

1. Check our [Github Issues](https://github.com/supertokens/supertokens-web-js/issues) to see if someone has already answered your question.
2. Join our community on [Discord](https://supertokens.com/discord) and feel free to ask us your questions

### Prerequisites

-   OS: Linux or macOS
-   Nodejs & npm
-   IDE: [VSCode](https://code.visualstudio.com/download)(recommended) or equivalent IDE

### Project Setup

1. `git clone https://github.com/supertokens/supertokens-web-js.git`
2. `cd supertokens-web-js`
3. Install the project dependencies
    ```
    npm i -d
    ```
4. Add git pre-commit hooks
    ```
    npm run set-up-hooks
    ```

## Modifying Code

1. Open the `supertokens-web-js` project in your IDE.
2. You can start modifying the code.
3. After modification, you need to build the project:
    ```
    npm run build-pretty
    ```
4. Make sure the linter passes:
    ```
    npm run lint
    ```

## Running the tests

1. Navigate to your fork of supertokens-web-js on https://github.com
2. Set the `AUTH0_EMAIL` and `AUTH0_PASSWORD` secrets in your repository (Your forked repository -> Settings -> Secrets -> Actions). You can refer to [this file](https://github.com/supertokens/supertokens-auth-react/blob/master/test/.env.js) for the values
3. Navigate to the "Actions" tab in the repository
4. Select the "Run tests" Action in the sidebar
5. Use the "Run workflow" button to configure the correct branch to use when running the tests. For supertokens-auth-react you can use "supertokens" as the owner name and use the latest version branch. For example if the latest version for supertokens-auth-react is `0.22.0`, you should use the branch `0.22`. You can use the default values for the rest. (Make sure to select the correct branch for your fork of supertokens-web-js in the dropdown)
6. Run the workflow

## Pull Request

1. Before submitting a pull request make sure all tests have passed
2. Reference the relevant issue or pull request and give a clear description of changes/features added when submitting a pull request
3. Make sure the PR title follows [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) specification

## SuperTokens Community

SuperTokens is made possible by a passionate team and a strong community of developers. If you have any questions or would like to get more involved in the SuperTokens community you can check out:

-   [Github Issues](https://github.com/supertokens/supertokens-web-js/issues)
-   [Discord](https://supertokens.io/discord)
-   [Twitter](https://twitter.com/supertokensio)
-   or [email us](mailto:team@supertokens.io)

Additional resources you might find useful:

-   [SuperTokens Docs](https://supertokens.io/docs/community/getting-started/installation)
-   [Blog Posts](https://supertokens.io/blog/)
