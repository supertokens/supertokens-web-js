<script lang="ts">
import EmailPassword from "supertokens-web-js/recipe/emailpassword";
import { defineComponent } from "vue";

export default defineComponent({
    data() {
        /**
         * If the URL has a token query param, it means that we should show the
         * "enter new password" screen, else we should ask the user for their email
         * to send the password reset link.
         */
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");
        return {
            // the email property is used for the enter email screen
            email: "",
            error: false,
            errorMessage: "Something Went Wrong",
            didSubmit: false,
            // if tokenPresent is true, it means that the user has clicked on the
            // reset password link.
            tokenPresent: token !== null,
            password: "",
        };
    },
    methods: {
        onSubmitClicked: async function () {
            if (this.tokenPresent) {
                // we try and change the user's password now by consuming the token
                try {
                    const response = await EmailPassword.submitNewPassword({
                        formFields: [
                            {
                                id: "password",
                                value: this.password,
                            },
                        ],
                    });

                    if (response.status === "FIELD_ERROR") {
                        // this indicates that the password entered by the user
                        // did not match the backend password validation logic.
                        throw new Error(response.formFields[0].error);
                    } else if (response.status === "RESET_PASSWORD_INVALID_TOKEN_ERROR") {
                        // the password reset token was consumed already, or has expired.
                        // in this case, the user should go back to the login screen or the
                        // enter email screen
                        throw new Error("Password reset token has expired, please go back to the sign in page");
                    }

                    // password reset successful.
                    window.location.assign("/auth");
                } catch (e: any) {
                    this.errorMessage = e.message;
                    this.error = true;
                }
            } else {
                // the user has entered an email for whom the password reset link
                // will be sent.
                try {
                    const response = await EmailPassword.sendPasswordResetEmail({
                        formFields: [
                            {
                                id: "email",
                                value: this.email,
                            },
                        ],
                    });

                    if (response.status !== "OK") {
                        // this means that the email validation logic failed.
                        throw new Error(response.formFields[0].error);
                    }

                    // a password reset email was sent successfully.

                    if (this.didSubmit !== true) {
                        // we change the UI to show that the email has been sent
                        this.didSubmit = true;
                    }
                } catch (e: any) {
                    this.errorMessage = e.message;
                    this.error = true;
                }
            }
        },
    },
});
</script>

<template src="../html/forgotPassword.html"></template>

<style>
@import "@/assets/base.css";
@import "../css/forgotpassword.css";
</style>
