import {
  doesEmailExist,
  signIn,
  signUp,
} from "supertokens-web-js/recipe/emailpassword";
import { getAuthorisationURLWithQueryParamsAndSetState } from "supertokens-web-js/recipe/thirdparty";
import { createSignal, onMount, Show } from "solid-js";
import "./App.css";
import { superTokensInit } from "./config/supertokens";
import { useNavigate } from "@solidjs/router";
import { signInAndUp } from "supertokens-web-js/recipe/thirdparty";

async function handleGoogleCallback(navigate: (path: string) => void) {
  try {
    const response = await signInAndUp();

    if (response.status === "OK") {
      console.log(response.user);
      if (
        response.createdNewRecipeUser &&
        response.user.loginMethods.length === 1
      ) {
        console.log("sign up successful, google");
      } else {
        console.log("sign in successful, google");
      }
      // window.location.assign("/home");
      navigate("/dashboard/");
    } else if (response.status === "SIGN_IN_UP_NOT_ALLOWED") {
      // the reason string is a user friendly message
      // about what went wrong. It can also contain a support code which users
      // can tell you so you know why their sign in / up was not allowed.
      window.alert(response.reason);
    } else {
      // SuperTokens requires that the third party provider
      // gives an email for the user. If that's not the case, sign up / in
      // will fail.

      // As a hack to solve this, you can override the backend functions to create a fake email for the user.

      window.alert(
        "No email provided by social login. Please use another form of login"
      );
      navigate("/auth"); // redirect back to login page
    }
  } catch (err: any) {
    if (err.isSuperTokensGeneralError === true) {
      // this may be a custom error message sent from the API by you.
      window.alert(err.message);
    } else {
      window.alert("Oops! Something went wrong.");
    }
  }
}

async function googleSignInClicked() {
  try {
    const authUrl = await getAuthorisationURLWithQueryParamsAndSetState({
      thirdPartyId: "google",

      // This is where Google should redirect the user back after login or error.
      // This URL goes on the Google's dashboard as well.
      frontendRedirectURI: "http://localhost:3000/auth/callback/google",
    });

    // we redirect the user to google for auth.
    window.location.assign(authUrl);
  } catch (err: any) {
    if (err.isSuperTokensGeneralError === true) {
      // this may be a custom error message sent from the API by you.
      window.alert(err.message);
    } else {
      window.alert("Oops! Something went wrong.");
    }
  }
}

async function handleGitHubCallback(navigate: (path: string) => void) {
  try {
    const response = await signInAndUp();

    if (response.status === "OK") {
      console.log(response.user);
      if (
        response.createdNewRecipeUser &&
        response.user.loginMethods.length === 1
      ) {
        console.log("sign up successful, github");
      } else {
        console.log("sign in successful, github");
      }
      // window.location.assign("/home");
      navigate("/dashboard/");
    } else if (response.status === "SIGN_IN_UP_NOT_ALLOWED") {
      // the reason string is a user friendly message
      // about what went wrong. It can also contain a support code which users
      // can tell you so you know why their sign in / up was not allowed.
      window.alert(response.reason);
    } else {
      // SuperTokens requires that the third party provider
      // gives an email for the user. If that's not the case, sign up / in
      // will fail.

      // As a hack to solve this, you can override the backend functions to create a fake email for the user.

      window.alert(
        "No email provided by social login. Please use another form of login"
      );
      navigate("/auth"); // redirect back to login page
    }
  } catch (err: any) {
    if (err.isSuperTokensGeneralError === true) {
      // this may be a custom error message sent from the API by you.
      window.alert(err.message);
    } else {
      window.alert("Oops! Something went wrong.");
    }
  }
}

async function githubSignInClicked() {
  try {
    const authUrl = await getAuthorisationURLWithQueryParamsAndSetState({
      thirdPartyId: "github",

      // This is where Google should redirect the user back after login or error.
      // This URL goes on the Google's dashboard as well.
      frontendRedirectURI: "http://localhost:3000/auth/callback/github",
    });

    // we redirect the user to google for auth.
    window.location.assign(authUrl);
  } catch (err: any) {
    if (err.isSuperTokensGeneralError === true) {
      // this may be a custom error message sent from the API by you.
      window.alert(err.message);
    } else {
      window.alert("Oops! Something went wrong.");
    }
  }
}

async function handleAppleCallback(navigate: (path: string) => void) {
  try {
    const response = await signInAndUp();

    if (response.status === "OK") {
      console.log(response.user);
      if (
        response.createdNewRecipeUser &&
        response.user.loginMethods.length === 1
      ) {
        console.log("sign up successful, apple");
      } else {
        console.log("sign in successful, apple");
      }
      // window.location.assign("/home");
      navigate("/dashboard/");
    } else if (response.status === "SIGN_IN_UP_NOT_ALLOWED") {
      // the reason string is a user friendly message
      // about what went wrong. It can also contain a support code which users
      // can tell you so you know why their sign in / up was not allowed.
      window.alert(response.reason);
    } else {
      // SuperTokens requires that the third party provider
      // gives an email for the user. If that's not the case, sign up / in
      // will fail.

      // As a hack to solve this, you can override the backend functions to create a fake email for the user.

      window.alert(
        "No email provided by social login. Please use another form of login"
      );
      navigate("/auth"); // redirect back to login page
    }
  } catch (err: any) {
    if (err.isSuperTokensGeneralError === true) {
      // this may be a custom error message sent from the API by you.
      window.alert(err.message);
    } else {
      window.alert("Oops! Something went wrong.");
    }
  }
}

async function appleSignInClicked() {
  try {
    const authUrl = await getAuthorisationURLWithQueryParamsAndSetState({
      thirdPartyId: "apple",

      frontendRedirectURI: "http://localhost:3000/auth/callback/apple", // This is an example callback URL on your frontend. You can use another path as well.
      redirectURIOnProviderDashboard:
        "http://localhost:3000/auth/callback/apple", // This URL goes on the Apple's dashboard
    });

    // we redirect the user to apple for auth.
    window.location.assign(authUrl);
  } catch (err: any) {
    if (err.isSuperTokensGeneralError === true) {
      // this may be a custom error message sent from the API by you.
      window.alert(err.message);
    } else {
      window.alert("Oops! Something went wrong.");
    }
  }
}

async function signUpClicked(
  email: string,
  password: string,
  navigate: (path: string) => void
) {
  try {
    let response = await signUp({
      formFields: [
        {
          id: "email",
          value: email,
        },
        {
          id: "password",
          value: password,
        },
      ],
    });

    if (response.status === "FIELD_ERROR") {
      // one of the input formFields failed validaiton
      response.formFields.forEach((formField) => {
        if (formField.id === "email") {
          // Email validation failed (for example incorrect email syntax),
          // or the email is not unique.
          window.alert(formField.error);
        } else if (formField.id === "password") {
          // Password validation failed.
          // Maybe it didn't match the password strength
          window.alert(formField.error);
        }
      });
    } else if (response.status === "SIGN_UP_NOT_ALLOWED") {
      // the reason string is a user friendly message
      // about what went wrong. It can also contain a support code which users
      // can tell you so you know why their sign up was not allowed.
      window.alert(response.reason);
    } else {
      // sign up successful. The session tokens are automatically handled by
      // the frontend SDK.
      navigate("/dashboard/");
    }
  } catch (err: any) {
    console.log(err);

    if (err.isSuperTokensGeneralError === true) {
      // this may be a custom error message sent from the API by you.
      window.alert(err.message);
    } else {
      window.alert("Oops! Something went wrong.");
    }
  }
}

async function checkEmail(email: string) {
  try {
    let response = await doesEmailExist({
      email,
    });

    return response;
  } catch (err: any) {
    if (err.isSuperTokensGeneralError === true) {
      // this may be a custom error message sent from the API by you.
      window.alert(err.message);
    } else {
      window.alert("Oops! Something went wrong.");
    }
  }
}

async function signInClicked(
  email: string,
  password: string,
  navigate: (path: string) => void
) {
  try {
    let response = await signIn({
      formFields: [
        {
          id: "email",
          value: email,
        },
        {
          id: "password",
          value: password,
        },
      ],
    });

    if (response.status === "FIELD_ERROR") {
      response.formFields.forEach((formField) => {
        if (formField.id === "email") {
          // Email validation failed (for example incorrect email syntax).
          window.alert(formField.error);
        }
      });
    } else if (response.status === "WRONG_CREDENTIALS_ERROR") {
      window.alert("Email password combination is incorrect.");
    } else if (response.status === "SIGN_IN_NOT_ALLOWED") {
      // the reason string is a user friendly message
      // about what went wrong. It can also contain a support code which users
      // can tell you so you know why their sign in was not allowed.
      window.alert(response.reason);
    } else {
      // sign in successful. The session tokens are automatically handled by
      // the frontend SDK.
      navigate("/dashboard/");
    }
  } catch (err: any) {
    if (err.isSuperTokensGeneralError === true) {
      // this may be a custom error message sent from the API by you.
      window.alert(err.message);
    } else {
      window.alert("Oops! Something went wrong.");
    }
  }
}

function Auth() {
  const navigate = useNavigate();
  superTokensInit();
  const [showOAuthLoading] = createSignal(
    (() => {
      if (window.location.pathname === "/auth/callback/google") {
        return "Google";
      }

      if (window.location.pathname === "/auth/callback/github") {
        return "GitHub";
      }

      if (window.location.pathname === "/auth/callback/apple") {
        return "Apple";
      }

      return false;
    })()
  );

  onMount(() => {
    if (window.location.pathname === "/auth/callback/google") {
      handleGoogleCallback(navigate);
    }

    if (window.location.pathname === "/auth/callback/github") {
      handleGitHubCallback(navigate);
    }

    if (window.location.pathname === "/auth/callback/apple") {
      handleAppleCallback(navigate);
    }
  });

  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");

  const handleSignUpClicked = async () => {
    const res = await checkEmail(email());
    if (!res?.doesExist) {
      signUpClicked(email(), password(), navigate);
    } else {
      window.alert("Email already exists. Please sign in instead");
    }
  };

  const handleSignInClicked = async () => {
    const res = await checkEmail(email());
    if (res?.doesExist) {
      signInClicked(email(), password(), navigate);
    } else {
      window.alert("Email does not exist. Please sign up instead");
    }
  };

  const handleGoogleSignInClicked = async () => {
    googleSignInClicked();
  };

  const handleGithubSignInClicked = async () => {
    githubSignInClicked();
  };

  const handleAppleSignInClicked = async () => {
    appleSignInClicked();
  };

  return (
    <div class="wrapper">
      <div class="form-wrap">
        <Show when={showOAuthLoading()}>
          Logging-in via {showOAuthLoading()}, please wait...
        </Show>
        <Show when={!showOAuthLoading()}>
          <input
            type="email"
            placeholder="Email"
            onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
          />
          <input
            type="password"
            placeholder="Password"
            onInput={(e) => setPassword((e.target as HTMLInputElement).value)}
          />
          <button onClick={handleSignUpClicked}>Sign Up</button>
          <button onClick={handleSignInClicked}>Sign In</button>
          <button onClick={handleGoogleSignInClicked}>
            Sign-in with Google
          </button>
          <button onClick={handleGithubSignInClicked}>
            Sign-in with GitHub
          </button>
          <button onClick={handleAppleSignInClicked}>Sign-in with Apple</button>
        </Show>
      </div>
    </div>
  );
}

export default Auth;
