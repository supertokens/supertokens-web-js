<script lang="ts">
import ThirdPartyEmailPassword from "supertokens-web-js/recipe/thirdpartyemailpassword";
import Session from "supertokens-web-js/recipe/session";
import { defineComponent } from "vue";

const websitePort = import.meta.env.VUE_APP_WEB_PORT || 3000;
const websiteDomain = import.meta.env.VUE_APP_WEB_URL || `http://localhost:${websitePort}`;

export default defineComponent({
    data() {
        return {
            // we allow the user to switch between sign in and sign up view
            isSignIn: true,

            // this will store the email and password entered by the user.
            email: "",
            password: "",

            // any generic error states
            error: false,
            errorMessage: "Something went wrong",

            // any error states specific to the input fields.
            emailError: "",
            passwordError: "",
        };
    },

    mounted() {
        // if there is an "error" query param on this page, it means that
        // social login has failed for some reason. See the AuthCallbackView.vue file
        // for more context on this
        const params = new URLSearchParams(window.location.search);

        if (params.has("error")) {
            this.errorMessage = "Something went wrong";
            this.error = true;
        }

        // this redirects the user to the HomeView.vue component if a session
        // already exists.
        this.checkForSession();
    },

    methods: {
        goToSignUp() {
            this.isSignIn = false;
        },
        goToSignIn() {
            this.isSignIn = true;
        },
        signIn: async function (_: Event) {
            const response = await ThirdPartyEmailPassword.emailPasswordSignIn({
                formFields: [
                    {
                        id: "email",
                        value: this.email,
                    },
                    {
                        id: "password",
                        value: this.password,
                    },
                ],
            });

            if (response.status === "WRONG_CREDENTIALS_ERROR") {
                // the input email / password combination did not match,
                // so we show an appropriate error message to the user
                this.errorMessage = "Invalid credentials";
                this.error = true;
                return;
            }

            if (response.status === "FIELD_ERROR") {
                response.formFields.forEach((item) => {
                    if (item.id === "email") {
                        // this means that something was wrong with the entered email.
                        // probably that it's not a valid email (from a syntax point of view)
                        this.emailError = item.error;
                    } else if (item.id === "password") {
                        this.passwordError = item.error;
                    }
                });
                return;
            }

            // login is successful, and we redirect the user to the home page.
            // Note that session cookies are added automatically and nothing needs to be
            // done here about them.
            window.location.assign("/");
        },
        validateEmail(email: string) {
            return email
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                );
        },
        signUp: async function (_: Event) {
            const response = await ThirdPartyEmailPassword.emailPasswordSignUp({
                formFields: [
                    {
                        id: "email",
                        value: this.email,
                    },
                    {
                        id: "password",
                        value: this.password,
                    },
                ],
            });

            if (response.status === "FIELD_ERROR") {
                response.formFields.forEach((item) => {
                    if (item.id === "email") {
                        // this means that something was wrong with the entered email.
                        // probably that it's not a valid email (from a syntax point of view)
                        this.emailError = item.error;
                    } else if (item.id === "password") {
                        // this means that something was wrong with the entered password.
                        // probably it doesn't meet the password validation criteria on the backend.
                        this.passwordError = item.error;
                    }
                });
                return;
            }

            // signup is successful, and we redirect the user to the home page.
            // Note that session cookies are added automatically and nothing needs to be
            // done here about them.
            window.location.assign("/");
        },
        onSubmitPressed: function (e: Event) {
            e.preventDefault();
            // we reset the error states in case the user has fixed the input errors
            this.error = false;
            this.emailError = "";
            this.passwordError = "";

            if (this.isSignIn) {
                this.signIn(e);
            } else {
                this.signUp(e);
            }
        },
        onGithubPressed: async function () {
            const authUrl = await ThirdPartyEmailPassword.getAuthorisationURLWithQueryParamsAndSetState({
                providerId: "github",

                // This is where github should redirect the user back after login or error.
                // This URL goes on the github dashboard as well.
                authorisationURL: `${websiteDomain}/auth/callback/github`,
            });

            window.location.assign(authUrl);
        },
        onGooglePressed: async function () {
            const authUrl = await ThirdPartyEmailPassword.getAuthorisationURLWithQueryParamsAndSetState({
                providerId: "google",

                // This is where google should redirect the user back after login or error.
                // This URL goes on the google dashboard as well.
                authorisationURL: `${websiteDomain}/auth/callback/google`,
            });

            window.location.assign(authUrl);
        },
        onApplePressed: async function () {
            const authUrl = await ThirdPartyEmailPassword.getAuthorisationURLWithQueryParamsAndSetState({
                providerId: "apple",

                // This is where apple should redirect the user back after login or error.
                // This URL goes on the apple dashboard as well.
                authorisationURL: `${websiteDomain}/auth/callback/apple`,
            });

            window.location.assign(authUrl);
        },
        checkForSession: async function () {
            if (await Session.doesSessionExist()) {
                // since a session already exists, we redirect the user to the HomeView.vue component
                window.location.assign("/");
            }
        },
    },
});
</script>

<template src="../html/authView.html"></template>

<style>
@import "@/assets/base.css";
@import "../css/authview.css";
</style>
