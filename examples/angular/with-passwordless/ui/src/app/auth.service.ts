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
          Session.init({
            onHandleEvent: (context) => {
              if (context.action === "UNAUTHORISED") {
                  // called when the user doesn't have a valid session but made a request that requires one
                  // NOTE: This event can fire multiple times
                  console.log("xxxxxx----Unauthorized----xxxxxx");
                  if (context.sessionExpiredOrRevoked) {
                      // the sessionExpiredOrRevoked property is set to true if the current call cleared the session from storage
                      // this happens only once, even if multiple tabs sharing the same session are open, making it useful for analytics purposes
                      console.log("xxxxxx----Session Expired----xxxxxx");
                  }
              }
            },
          }),
          Passwordless.init(),
      ],
    });
  }

  authenticate() : Promise<boolean> {
      return Session.doesSessionExist().then((isValidSession) => {
        return isValidSession;
      }).catch((err) => {
        throw new Error(err);
      })
  }


  getUserIdAndPayload() : Promise<any> {
    return Session.doesSessionExist().then((exists) => {
      if(!exists){
        throw Error("No session exists")
      }
      return exists;
    }).then((exists) => {
      return Session.getUserId().then((userId) => {
        return userId;
      })
    }).then((userId) => {
      return Session.getAccessTokenPayloadSecurely().then((payload) => {
        return { userId, payload }
      })
    }).catch((err) => {
      throw new Error(err);
    })
  }

  sendCode(inputs: { email?: string }): Promise<string>{
    if(!inputs || !inputs.hasOwnProperty("email")){
      return Promise.reject("Invalid input. Please provide email.");
    }
    return Passwordless.createCode({ email: inputs.email }).then((response) => {
      if(response && response.status=="OK"){
        return "Please check your mailbox for the login code";
      } else {
        throw new Error(response.status || response.fetchResponse.statusText);
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
        throw new Error(response.status || response.fetchResponse.statusText);
        // Promise.reject(response.fetchResponse.statusText);
      }
    })
  }

  consumeCodeFromLink(){
    return Passwordless.consumeCode({}).then((response) => {
      if(response && response.status=="OK" && response.user){
        return "Login successful";
      } else {
        throw new Error(response.status || response.fetchResponse.statusText);
        // Promise.reject(response.fetchResponse.statusText);
      }
    })
  }

  logout(){
    return Passwordless.signOut();
  }

}
