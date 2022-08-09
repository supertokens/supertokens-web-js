import { Injectable } from '@angular/core';
import SuperTokens from 'supertokens-web-js';
import Session from 'supertokens-web-js/recipe/session';
import Passwordless from 'supertokens-web-js/recipe/passwordless';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {
    this.configureAuth();
  }

  configureAuth(){
    SuperTokens.init({
      appInfo: {
          apiDomain: "http://localhost:3000",
          apiBasePath: "/api",
          appName: "SuperTokens-Passwordless-Demo",
      },
      recipeList: [
          Session.init(),
          Passwordless.init(),
      ],
    });
  }

  sendCode(inputs: { email?: string }): Promise<string>{
    if(!inputs || !inputs.hasOwnProperty("email")){
      return Promise.reject("Invalid input. Please provide email.");
    }
    return Passwordless.createCode({ email: inputs.email }).then((response) => {
      if(response && response.status=="OK"){
        return "Please check your mailbox for the login code";
      } else {
        return response.fetchResponse.statusText;
      }
    });
  }

  consumeCode(inputs: { userInputCode?: string }): Promise<string>{
    if(!inputs || !inputs.hasOwnProperty("userInputCode")){
      return Promise.reject("Invalid input. Please provide login code.");
    }
    return Passwordless.consumeCode({ userInputCode: inputs.userInputCode }).then((response) => {
      if(response && response.status=="OK" && response.user){
        return "Login successful";
      } else {
        return response.fetchResponse.statusText;
      }
    }).catch((err) => {
      return err
    })
  }

  logout(){
    return Passwordless.signOut();
  }

}
