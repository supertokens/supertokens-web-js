<script lang="ts">
import ThirdPartyEmailPassword from "supertokens-web-js/recipe/thirdpartyemailpassword";
import { defineComponent } from "vue";

export default defineComponent({
    data() {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");
        return {
            email: "",
            error: false,
            errorMessage: "Something Went Wrong",
            didSubmit: false,
            tokenPresent: token !== null,
            password: "",
        };
    },
    methods: {
        onSubmitClicked: async function () {
            if (this.tokenPresent) {
                try {
                    const response = await ThirdPartyEmailPassword.submitNewPassword({
                        formFields: [
                            {
                                id: "password",
                                value: this.password,
                            },
                        ],
                    });

                    if (response.status === "FIELD_ERROR") {
                        throw new Error(response.formFields[0].error);
                    } else if (response.status === "RESET_PASSWORD_INVALID_TOKEN_ERROR") {
                        throw new Error("Password reset token has expired, please go back to the sign in page");
                    }

                    window.location.assign("/auth");
                } catch (e: any) {
                    this.errorMessage = e.message;
                    this.error = true;
                }
            } else {
                try {
                    const response = await ThirdPartyEmailPassword.sendPasswordResetEmail({
                        formFields: [
                            {
                                id: "email",
                                value: this.email,
                            },
                        ],
                    });

                    if (response.status !== "OK") {
                        throw new Error(response.formFields[0].error);
                    }

                    if (this.didSubmit !== true) {
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

<template>
    <div class="fill">
        <div class="form-container">
            <div v-if="tokenPresent" class="form-content-container">
                <div v-if="error" class="top-error-container">
                    <div class="error-message">{{ errorMessage }}</div>
                </div>
                <div v-if="!didSubmit">
                    <div class="form-text-header">Enter new password</div>
                    <div class="form-subtitle">Please enter your new password below</div>

                    <div class="input-section-container">
                        <div class="input-label">New Password</div>
                        <div class="input-container">
                            <div class="input-wrapper">
                                <input
                                    autocomplete="current-password"
                                    class="input"
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    v-model="password"
                                />
                            </div>
                        </div>
                    </div>

                    <div class="button-container">
                        <button v-on:click="onSubmitClicked" class="form-button">Change Password</button>
                    </div>
                </div>
            </div>
            <div v-else class="form-content-container">
                <div v-if="error" class="top-error-container">
                    <div class="error-message">{{ errorMessage }}</div>
                </div>
                <div v-if="!didSubmit">
                    <div class="form-text-header">Reset your password</div>
                    <div class="form-subtitle">We will send you an email to reset your password</div>

                    <div class="input-section-container">
                        <div class="input-label">Email</div>
                        <div class="input-container">
                            <div class="input-wrapper">
                                <input autocomplete="email" class="input" type="email" name="email" v-model="email" />
                            </div>
                        </div>
                    </div>

                    <div class="button-container">
                        <button v-on:click="onSubmitClicked" class="form-button">Email Me</button>
                    </div>
                </div>
                <div v-else>
                    <div class="confirmation">
                        Please check your email for the password recovery link
                        <span class="resend-button" v-on:click="onSubmitClicked">Resend</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
@import "@/assets/base.css";

.form-text-header {
    font-size: 24px;
    line-height: 40px;
    letter-spacing: 0.58px;
    font-weight: 800;
    margin-bottom: 2px;
    color: rgb(34, 34, 34);
}

.confirmation {
    margin: 15px auto;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.4px;
    line-height: 21px;
    color: rgb(34, 34, 34);
}

.form-subtitle {
    margin-bottom: 10px;
}

.button-container {
    display: flex;
    flex-direction: column;
    padding-top: 0px;
    padding-bottom: 34px;
}

.form-button {
    width: 100%;
    height: 34px;
    background-color: rgb(255, 155, 51);
    color: white;
    font-weight: 700;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(238, 141, 35);
    border-radius: 6px;
    background-position: center center;
    transition: all 0.4s ease 0s;
    background-size: 12000%;
    cursor: pointer;
}

.fill {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
}

.form-container {
    width: 420px;
    margin: 26px auto;
    text-align: center;
    border-radius: 8px;
    box-shadow: rgba(0, 0, 0, 0.16) 1px 1px 10px;
    background-color: white;
    padding-top: 30px;
    padding-bottom: 10px;
    display: flex;
    flex-direction: column;
}

.input-label {
    text-align: left;
    font-weight: 600;
    font-size: 14px;
    line-height: 24px;
    color: rgb(34, 34, 34);
}

.input-container {
    margin-top: 6px;
}

.input-wrapper {
    box-sizing: border-box;
    width: 100%;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    background-color: rgb(250, 250, 250);
    height: 34px;
    border-radius: 6px;
    border: 1px solid rgb(224, 224, 224);
}

.input {
    box-sizing: border-box;
    padding-left: 15px;
    filter: none;
    color: rgb(34, 34, 34);
    background-color: transparent;
    border-radius: 6px;
    font-size: 14px;
    border: none;
    padding-right: 25px;
    letter-spacing: 1.2px;
    flex: 9 1 75%;
    width: 75%;
    height: 32px;
}

.input-section-container {
    display: flex;
    flex-direction: column;
    padding-top: 0px;
    padding-bottom: 34px;
}

.form-content-container {
    margin: 0px auto;
}

.top-error-container {
    display: flex;
    width: calc(100% - 24px);
    background-color: #ffcdd2;
    justify-content: center;
    align-items: center;
    padding-top: 2px;
    padding-bottom: 2px;
    margin-left: 12px;
    margin-right: 12px;
    border-radius: 6px;
    box-sizing: border-box;
    border-width: 1px;
    border: 1px solid #ff1744;
}

.resend-button {
    padding-left: 3px;
    padding-right: 3px;
    color: rgb(0, 118, 255);
    font-size: 14px;
    cursor: pointer;
    letter-spacing: 0.16px;
    line-height: 26px;
}
</style>
