import ThirdPartyWebJs from "supertokens-web-js/recipe/thirdparty";
import EmailPasswordWebJs from "supertokens-web-js/recipe/emailpassword";
import SessionWebJs from "supertokens-web-js/recipe/session";
import appInfo from "./appInfo.json";
import { type SuperTokensConfig } from "supertokens-web-js/types";

export const initFE = (): SuperTokensConfig => {
  return {
    appInfo,
    recipeList: [
      ThirdPartyWebJs.init(),
      EmailPasswordWebJs.init(),
      SessionWebJs.init(),
    ],
  };
};
