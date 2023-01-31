"use strict";var supertokensEmailPassword;(self.webpackChunksupertokens_web_js=self.webpackChunksupertokens_web_js||[]).push([[581],{7611:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.SSR_ERROR=t.DEFAULT_API_BASE_PATH=void 0,t.DEFAULT_API_BASE_PATH="/auth",t.SSR_ERROR="\nIf you are trying to use this method doing server-side-rendering, please make sure you move this method inside a componentDidMount method or useEffect hook."},2173:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0});var r=n(711);t.default=r.STGeneralError},7992:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0});function n(e,t){void 0===t&&(t=!1),e=e.trim();try{if(!e.startsWith("http://")&&!e.startsWith("https://"))throw new Error("Error converting to proper URL");var r=new URL(e);return t?r.hostname.startsWith("localhost")||(o=r.hostname,/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(o))?"http://"+r.host:"https://"+r.host:r.protocol+"//"+r.host}catch(e){}var o;if(e.startsWith("/"))throw new Error("Please provide a valid domain name");if(0===e.indexOf(".")&&(e=e.substr(1)),(-1!==e.indexOf(".")||e.startsWith("localhost"))&&!e.startsWith("http://")&&!e.startsWith("https://")){e="https://"+e;try{return new URL(e),n(e,!0)}catch(e){}}throw new Error("Please provide a valid domain name")}t.default=function(e){var t=this;this.getAsStringDangerous=function(){return t.value},this.value=n(e)}},1260:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0});function n(e){e=e.trim();try{if(!e.startsWith("http://")&&!e.startsWith("https://"))throw new Error("Error converting to proper URL");return"/"===(e=new URL(e).pathname).charAt(e.length-1)?e.substr(0,e.length-1):e}catch(e){}if((function(e){if(-1===e.indexOf(".")||e.startsWith("/"))return!1;try{return-1!==new URL(e).hostname.indexOf(".")}catch(e){}try{return-1!==new URL("http://"+e).hostname.indexOf(".")}catch(e){}return!1}(e)||e.startsWith("localhost"))&&!e.startsWith("http://")&&!e.startsWith("https://"))return n(e="http://"+e);"/"!==e.charAt(0)&&(e="/"+e);try{return new URL("http://example.com"+e),n("http://example.com"+e)}catch(e){throw new Error("Please provide a valid URL path")}}t.default=function e(t){var r=this;this.startsWith=function(e){return r.value.startsWith(e.value)},this.appendPath=function(t){return new e(r.value+t.value)},this.getAsStringDangerous=function(){return r.value},this.value=n(t)}},634:function(e,t,n){var r=this&&this.__assign||function(){return r=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},r.apply(this,arguments)},o=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function s(e){try{u(r.next(e))}catch(e){i(e)}}function a(e){try{u(r.throw(e))}catch(e){i(e)}}function u(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,a)}u((r=r.apply(e,t||[])).next())}))},i=this&&this.__generator||function(e,t){var n,r,o,i,s={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(i){return function(a){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;s;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return s.label++,{value:i[1],done:!1};case 5:s.label++,r=i[1],i=[0];continue;case 7:i=s.ops.pop(),s.trys.pop();continue;default:if(!((o=(o=s.trys).length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){s=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){s.label=i[1];break}if(6===i[0]&&s.label<o[1]){s.label=o[1],o=i;break}if(o&&s.label<o[2]){s.label=o[2],s.ops.push(i);break}o[2]&&s.ops.pop(),s.trys.pop();continue}i=t.call(e,s)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,a])}}};Object.defineProperty(t,"__esModule",{value:!0});var s=n(1260),a=n(255),u=n(2173),c=function(){function e(e,t){var n=this;this.get=function(e,t,s,a,u){return o(n,void 0,void 0,(function(){var n;return i(this,(function(o){switch(o.label){case 0:return[4,this.fetch(this.getFullUrl(e,s),r({method:"GET"},t),a,u)];case 1:return n=o.sent(),[4,this.getResponseJsonOrThrowGeneralError(n)];case 2:return[2,{jsonBody:o.sent(),fetchResponse:n}]}}))}))},this.post=function(e,t,s,a){return o(n,void 0,void 0,(function(){var n;return i(this,(function(o){switch(o.label){case 0:if(void 0===t.body)throw new Error("Post request must have a body");return[4,this.fetch(this.getFullUrl(e),r({method:"POST"},t),s,a)];case 1:return n=o.sent(),[4,this.getResponseJsonOrThrowGeneralError(n)];case 2:return[2,{jsonBody:o.sent(),fetchResponse:n}]}}))}))},this.delete=function(e,t,s,a){return o(n,void 0,void 0,(function(){var n;return i(this,(function(o){switch(o.label){case 0:return[4,this.fetch(this.getFullUrl(e),r({method:"DELETE"},t),s,a)];case 1:return n=o.sent(),[4,this.getResponseJsonOrThrowGeneralError(n)];case 2:return[2,{jsonBody:o.sent(),fetchResponse:n}]}}))}))},this.put=function(e,t,s,a){return o(n,void 0,void 0,(function(){var n;return i(this,(function(o){switch(o.label){case 0:return[4,this.fetch(this.getFullUrl(e),r({method:"PUT"},t),s,a)];case 1:return n=o.sent(),[4,this.getResponseJsonOrThrowGeneralError(n)];case 2:return[2,{jsonBody:o.sent(),fetchResponse:n}]}}))}))},this.fetch=function(e,t,s,u){return o(n,void 0,void 0,(function(){var n,o,c,l,f,p;return i(this,(function(i){switch(i.label){case 0:return n=void 0===t?{}:t.headers,[4,this.callPreAPIHook({preAPIHook:s,url:e,requestInit:r(r({},t),{headers:r(r({},n),{"fdi-version":a.supported_fdi.join(","),"Content-Type":"application/json",rid:this.recipeId})})})];case 1:return o=i.sent(),c=o.requestInit,l=o.url,[4,fetch(l,c)];case 2:if((f=i.sent()).status>=300)throw f;return void 0===u?[3,4]:(p=f.clone(),[4,u({requestInit:c,url:e,fetchResponse:p})]);case 3:i.sent(),i.label=4;case 4:return[2,f]}}))}))},this.callPreAPIHook=function(e){return o(n,void 0,void 0,(function(){return i(this,(function(t){switch(t.label){case 0:return void 0===e.preAPIHook?[2,{url:e.url,requestInit:e.requestInit}]:[4,e.preAPIHook({url:e.url,requestInit:e.requestInit})];case 1:return[2,t.sent()]}}))}))},this.getFullUrl=function(e,t){var r=new s.default(e),o="".concat(n.appInfo.apiDomain.getAsStringDangerous()).concat(n.appInfo.apiBasePath.getAsStringDangerous()).concat(r.getAsStringDangerous());return void 0===t?o:o+"?"+new URLSearchParams(t)},this.getResponseJsonOrThrowGeneralError=function(e){return o(n,void 0,void 0,(function(){var t,n;return i(this,(function(r){switch(r.label){case 0:return[4,e.clone().json()];case 1:if("GENERAL_ERROR"===(t=r.sent()).status)throw n=void 0===t.message?"No Error Message Provided":t.message,new u.default(n);return[2,t]}}))}))},this.recipeId=e,this.appInfo=t}var t;return t=e,e.preparePreAPIHook=function(e){var n=e.recipePreAPIHook,s=e.action,a=e.options,u=e.userContext;return function(e){return o(void 0,void 0,void 0,(function(){var o;return i(t,(function(t){switch(t.label){case 0:return[4,n(r(r({},e),{action:s,userContext:u}))];case 1:return o=t.sent(),void 0===a||void 0===a.preAPIHook?[2,o]:[2,a.preAPIHook({url:o.url,requestInit:o.requestInit,userContext:u})]}}))}))}},e.preparePostAPIHook=function(e){var n=e.recipePostAPIHook,s=e.action,a=e.userContext;return function(e){return o(void 0,void 0,void 0,(function(){return i(t,(function(t){switch(t.label){case 0:return[4,n(r(r({},e),{userContext:a,action:s}))];case 1:return t.sent(),[2]}}))}))}},e}();t.default=c},7725:function(e,t,n){var r,o=this&&this.__extends||(r=function(e,t){return r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])},r(e,t)},function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function n(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}),i=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function s(e){try{u(r.next(e))}catch(e){i(e)}}function a(e){try{u(r.throw(e))}catch(e){i(e)}}function u(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,a)}u((r=r.apply(e,t||[])).next())}))},s=this&&this.__generator||function(e,t){var n,r,o,i,s={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(i){return function(a){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;s;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return s.label++,{value:i[1],done:!1};case 5:s.label++,r=i[1],i=[0];continue;case 7:i=s.ops.pop(),s.trys.pop();continue;default:if(!((o=(o=s.trys).length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){s=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){s.label=i[1];break}if(6===i[0]&&s.label<o[1]){s.label=o[1],o=i;break}if(o&&s.label<o[2]){s.label=o[2],s.ops.push(i);break}o[2]&&s.ops.pop(),s.trys.pop();continue}i=t.call(e,s)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,a])}}};Object.defineProperty(t,"__esModule",{value:!0});var a=n(1996),u=n(6322),c=function(e){function t(t){var n=e.call(this,t)||this;return n.signOut=function(e){return i(n,void 0,void 0,(function(){return s(this,(function(t){switch(t.label){case 0:return[4,u.default.getInstanceOrThrow().signOut({userContext:e.userContext})];case 1:return[2,t.sent()]}}))}))},n}return o(t,e),t}(a.default);t.default=c},5053:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.normaliseAuthRecipe=void 0;var r=n(6069);t.normaliseAuthRecipe=function(e){return(0,r.normaliseRecipeModuleConfig)(e)}},6022:function(e,t,n){var r=this&&this.__assign||function(){return r=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},r.apply(this,arguments)};Object.defineProperty(t,"__esModule",{value:!0}),t.signOut=t.getResetPasswordTokenFromURL=t.doesEmailExist=t.signIn=t.signUp=t.sendPasswordResetEmail=t.submitNewPassword=t.init=void 0;var o=n(7939),i=n(8122),s=function(){function e(){}return e.init=function(e){return o.default.init(e)},e.signOut=function(e){return o.default.getInstanceOrThrow().signOut({userContext:(0,i.getNormalisedUserContext)(null==e?void 0:e.userContext)})},e.submitNewPassword=function(e){return o.default.getInstanceOrThrow().recipeImplementation.submitNewPassword(r(r({},e),{userContext:(0,i.getNormalisedUserContext)(e.userContext)}))},e.sendPasswordResetEmail=function(e){return o.default.getInstanceOrThrow().recipeImplementation.sendPasswordResetEmail(r(r({},e),{userContext:(0,i.getNormalisedUserContext)(e.userContext)}))},e.signUp=function(e){return o.default.getInstanceOrThrow().recipeImplementation.signUp(r(r({},e),{userContext:(0,i.getNormalisedUserContext)(e.userContext)}))},e.signIn=function(e){return o.default.getInstanceOrThrow().recipeImplementation.signIn(r(r({},e),{userContext:(0,i.getNormalisedUserContext)(e.userContext)}))},e.doesEmailExist=function(e){return o.default.getInstanceOrThrow().recipeImplementation.doesEmailExist(r(r({},e),{userContext:(0,i.getNormalisedUserContext)(e.userContext)}))},e.getResetPasswordTokenFromURL=function(e){return o.default.getInstanceOrThrow().recipeImplementation.getResetPasswordTokenFromURL(r(r({},e),{userContext:(0,i.getNormalisedUserContext)(null==e?void 0:e.userContext)}))},e}();t.default=s;var a=s.init;t.init=a;var u=s.submitNewPassword;t.submitNewPassword=u;var c=s.sendPasswordResetEmail;t.sendPasswordResetEmail=c;var l=s.signUp;t.signUp=l;var f=s.signIn;t.signIn=f;var p=s.doesEmailExist;t.doesEmailExist=p;var d=s.signOut;t.signOut=d;var h=s.getResetPasswordTokenFromURL;t.getResetPasswordTokenFromURL=h},7939:function(e,t,n){var r,o=this&&this.__extends||(r=function(e,t){return r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])},r(e,t)},function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function n(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}),i=this&&this.__assign||function(){return i=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},i.apply(this,arguments)};Object.defineProperty(t,"__esModule",{value:!0}),t.Recipe=void 0;var s=n(5110),a=n(4071),u=n(6333),c=n(8122),l=function(e){function t(t){var n=e.call(this,(0,s.normaliseUserInput)(t))||this,r=new u.default((0,a.default)({recipeId:n.config.recipeId,appInfo:n.config.appInfo,preAPIHook:n.config.preAPIHook,postAPIHook:n.config.postAPIHook}));return n.recipeImplementation=r.override(n.config.override.functions).build(),n}return o(t,e),t.init=function(e){return function(n){return t.instance=new t(i(i({},e),{recipeId:t.RECIPE_ID,appInfo:n})),t.instance}},t.getInstanceOrThrow=function(){if(void 0===t.instance){var e="No instance of EmailPassword found. Make sure to call the EmailPassword.init method.";throw e=(0,c.checkForSSRErrorAndAppendIfNeeded)(e),Error(e)}return t.instance},t.reset=function(){(0,c.isTest)()&&(t.instance=void 0)},t.RECIPE_ID="emailpassword",t}(n(7725).default);t.Recipe=l,t.default=l},4071:function(e,t,n){var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function s(e){try{u(r.next(e))}catch(e){i(e)}}function a(e){try{u(r.throw(e))}catch(e){i(e)}}function u(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,a)}u((r=r.apply(e,t||[])).next())}))},o=this&&this.__generator||function(e,t){var n,r,o,i,s={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(i){return function(a){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;s;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return s.label++,{value:i[1],done:!1};case 5:s.label++,r=i[1],i=[0];continue;case 7:i=s.ops.pop(),s.trys.pop();continue;default:if(!((o=(o=s.trys).length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){s=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){s.label=i[1];break}if(6===i[0]&&s.label<o[1]){s.label=o[1],o=i;break}if(o&&s.label<o[2]){s.label=o[2],s.ops.push(i);break}o[2]&&s.ops.pop(),s.trys.pop();continue}i=t.call(e,s)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,a])}}};Object.defineProperty(t,"__esModule",{value:!0}),t.getRecipeImplementation=void 0;var i=n(634),s=n(8122);function a(e){var t=new i.default(e.recipeId,e.appInfo);return{submitNewPassword:function(n){var s=n.formFields,a=n.options,u=n.userContext;return r(this,void 0,void 0,(function(){var n,r,c,l;return o(this,(function(o){switch(o.label){case 0:return n=this.getResetPasswordTokenFromURL({userContext:u}),[4,t.post("/user/password/reset",{body:JSON.stringify({formFields:s,token:n,method:"token"})},i.default.preparePreAPIHook({recipePreAPIHook:e.preAPIHook,action:"SUBMIT_NEW_PASSWORD",options:a,userContext:u}),i.default.preparePostAPIHook({recipePostAPIHook:e.postAPIHook,action:"SUBMIT_NEW_PASSWORD",userContext:u}))];case 1:return r=o.sent(),c=r.jsonBody,l=r.fetchResponse,"FIELD_ERROR"===c.status?[2,{status:"FIELD_ERROR",formFields:c.formFields,fetchResponse:l}]:[2,{status:c.status,fetchResponse:l}]}}))}))},sendPasswordResetEmail:function(n){var s=n.formFields,a=n.options,u=n.userContext;return r(this,void 0,void 0,(function(){var n,r,c;return o(this,(function(o){switch(o.label){case 0:return[4,t.post("/user/password/reset/token",{body:JSON.stringify({formFields:s})},i.default.preparePreAPIHook({recipePreAPIHook:e.preAPIHook,action:"SEND_RESET_PASSWORD_EMAIL",options:a,userContext:u}),i.default.preparePostAPIHook({recipePostAPIHook:e.postAPIHook,action:"SEND_RESET_PASSWORD_EMAIL",userContext:u}))];case 1:return n=o.sent(),r=n.jsonBody,c=n.fetchResponse,"FIELD_ERROR"===r.status?[2,{status:"FIELD_ERROR",formFields:r.formFields,fetchResponse:c}]:[2,{status:r.status,fetchResponse:c}]}}))}))},signUp:function(n){var s=n.formFields,a=n.options,u=n.userContext;return r(this,void 0,void 0,(function(){var n,r,c;return o(this,(function(o){switch(o.label){case 0:return[4,t.post("/signup",{body:JSON.stringify({formFields:s})},i.default.preparePreAPIHook({recipePreAPIHook:e.preAPIHook,action:"EMAIL_PASSWORD_SIGN_UP",options:a,userContext:u}),i.default.preparePostAPIHook({recipePostAPIHook:e.postAPIHook,action:"EMAIL_PASSWORD_SIGN_UP",userContext:u}))];case 1:return n=o.sent(),r=n.jsonBody,c=n.fetchResponse,"FIELD_ERROR"===r.status?[2,{status:"FIELD_ERROR",formFields:r.formFields,fetchResponse:c}]:[2,{status:r.status,user:r.user,fetchResponse:c}]}}))}))},signIn:function(n){var s=n.formFields,a=n.options,u=n.userContext;return r(this,void 0,void 0,(function(){var n,r,c;return o(this,(function(o){switch(o.label){case 0:return[4,t.post("/signin",{body:JSON.stringify({formFields:s})},i.default.preparePreAPIHook({recipePreAPIHook:e.preAPIHook,action:"EMAIL_PASSWORD_SIGN_IN",options:a,userContext:u}),i.default.preparePostAPIHook({recipePostAPIHook:e.postAPIHook,action:"EMAIL_PASSWORD_SIGN_IN",userContext:u}))];case 1:return n=o.sent(),r=n.jsonBody,c=n.fetchResponse,"FIELD_ERROR"===r.status?[2,{status:"FIELD_ERROR",formFields:r.formFields,fetchResponse:c}]:"WRONG_CREDENTIALS_ERROR"===r.status?[2,{status:"WRONG_CREDENTIALS_ERROR",fetchResponse:c}]:[2,{status:"OK",user:r.user,fetchResponse:c}]}}))}))},doesEmailExist:function(n){var s=n.email,a=n.options,u=n.userContext;return r(this,void 0,void 0,(function(){var n,r,c;return o(this,(function(o){switch(o.label){case 0:return[4,t.get("/signup/email/exists",{},{email:s},i.default.preparePreAPIHook({recipePreAPIHook:e.preAPIHook,action:"EMAIL_EXISTS",options:a,userContext:u}),i.default.preparePostAPIHook({recipePostAPIHook:e.postAPIHook,action:"EMAIL_EXISTS",userContext:u}))];case 1:return n=o.sent(),r=n.jsonBody,c=n.fetchResponse,[2,{status:r.status,doesExist:r.exists,fetchResponse:c}]}}))}))},getResetPasswordTokenFromURL:function(){var e=(0,s.getQueryParams)("token");return void 0===e?"":e}}}t.default=a,t.getRecipeImplementation=a},5110:function(e,t,n){var r=this&&this.__assign||function(){return r=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},r.apply(this,arguments)};Object.defineProperty(t,"__esModule",{value:!0}),t.normaliseUserInput=void 0;var o=n(5053);t.normaliseUserInput=function(e){var t=r({functions:function(e){return e}},e.override);return r(r({},(0,o.normaliseAuthRecipe)(e)),{override:t})}},1996:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0});t.default=function(e){this.config=e}},6069:function(e,t){var n=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function s(e){try{u(r.next(e))}catch(e){i(e)}}function a(e){try{u(r.throw(e))}catch(e){i(e)}}function u(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,a)}u((r=r.apply(e,t||[])).next())}))},r=this&&this.__generator||function(e,t){var n,r,o,i,s={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(i){return function(a){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;s;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return s.label++,{value:i[1],done:!1};case 5:s.label++,r=i[1],i=[0];continue;case 7:i=s.ops.pop(),s.trys.pop();continue;default:if(!((o=(o=s.trys).length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){s=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){s.label=i[1];break}if(6===i[0]&&s.label<o[1]){s.label=o[1],o=i;break}if(o&&s.label<o[2]){s.label=o[2],s.ops.push(i);break}o[2]&&s.ops.pop(),s.trys.pop();continue}i=t.call(e,s)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,a])}}};Object.defineProperty(t,"__esModule",{value:!0}),t.normaliseRecipeModuleConfig=void 0,t.normaliseRecipeModuleConfig=function(e){var t=this,o=e.preAPIHook;void 0===o&&(o=function(e){return n(t,void 0,void 0,(function(){return r(this,(function(t){return[2,e]}))}))});var i=e.postAPIHook;return void 0===i&&(i=function(){return n(t,void 0,void 0,(function(){return r(this,(function(e){return[2]}))}))}),{recipeId:e.recipeId,appInfo:e.appInfo,preAPIHook:o,postAPIHook:i}}},6322:function(e,t,n){var r,o=this&&this.__extends||(r=function(e,t){return r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])},r(e,t)},function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function n(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}),i=this&&this.__assign||function(){return i=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},i.apply(this,arguments)},s=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function s(e){try{u(r.next(e))}catch(e){i(e)}}function a(e){try{u(r.throw(e))}catch(e){i(e)}}function u(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,a)}u((r=r.apply(e,t||[])).next())}))},a=this&&this.__generator||function(e,t){var n,r,o,i,s={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(i){return function(a){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;s;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return s.label++,{value:i[1],done:!1};case 5:s.label++,r=i[1],i=[0];continue;case 7:i=s.ops.pop(),s.trys.pop();continue;default:if(!((o=(o=s.trys).length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){s=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){s.label=i[1];break}if(6===i[0]&&s.label<o[1]){s.label=o[1],o=i;break}if(o&&s.label<o[2]){s.label=o[2],s.ops.push(i);break}o[2]&&s.ops.pop(),s.trys.pop();continue}i=t.call(e,s)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,a])}}};Object.defineProperty(t,"__esModule",{value:!0}),t.Recipe=void 0;var u=n(1996),c=n(3621),l=n(8122),f=function(e){function t(t){var n=e.call(this,t)||this;return n.getUserId=function(e){return c.default.getUserId({userContext:e.userContext})},n.getAccessTokenPayloadSecurely=function(e){return s(n,void 0,void 0,(function(){return a(this,(function(t){return[2,c.default.getAccessTokenPayloadSecurely({userContext:e.userContext})]}))}))},n.doesSessionExist=function(e){return c.default.doesSessionExist({userContext:e.userContext})},n.signOut=function(e){return c.default.signOut({userContext:e.userContext})},n.attemptRefreshingSession=function(){return s(n,void 0,void 0,(function(){return a(this,(function(e){return[2,c.default.attemptRefreshingSession()]}))}))},n.validateClaims=function(e){return c.default.validateClaims(e.overrideGlobalClaimValidators,e.userContext)},c.default.init(i(i({},t),{preAPIHook:function(e){return s(n,void 0,void 0,(function(){var n;return a(this,(function(r){return n=i(i({},e),{requestInit:i(i({},e.requestInit),{headers:i(i({},e.requestInit.headers),{rid:t.recipeId})})}),void 0===t.preAPIHook?[2,n]:[2,t.preAPIHook(e)]}))}))},apiDomain:t.appInfo.apiDomain.getAsStringDangerous(),apiBasePath:t.appInfo.apiBasePath.getAsStringDangerous()})),n}return o(t,e),t.init=function(e){return function(n,r){return t.instance=new t(i(i({},e),{appInfo:n,recipeId:t.RECIPE_ID,enableDebugLogs:r})),t.instance}},t.prototype.getClaimValue=function(e){return c.default.getClaimValue(e)},t.prototype.getInvalidClaimsFromResponse=function(e){return c.default.getInvalidClaimsFromResponse(e)},t.addAxiosInterceptors=function(e,t){return c.default.addAxiosInterceptors(e,t)},t.getInstanceOrThrow=function(){if(void 0===t.instance){var e="No instance of Session found. Make sure to call the Session.init method.";throw e=(0,l.checkForSSRErrorAndAppendIfNeeded)(e),Error(e)}return t.instance},t.reset=function(){(0,l.isTest)()&&(t.instance=void 0)},t.RECIPE_ID="session",t}(u.default);t.Recipe=f,t.default=f},8122:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.getGlobalClaimValidators=t.getHashFromLocation=t.getNormalisedUserContext=t.checkForSSRErrorAndAppendIfNeeded=t.getQueryParams=t.isTest=t.normaliseInputAppInfoOrThrowError=t.appendQueryParamsToURL=void 0;var r=n(7528),o=n(7611),i=n(7992),s=n(1260),a=n(3771);t.appendQueryParamsToURL=function(e,t){if(void 0===t)return e;try{var n=new URL(e);return Object.entries(t).forEach((function(e){var t=e[0],r=e[1];n.searchParams.set(t,r)})),n.href}catch(n){var r=e.startsWith("/")?"http:localhost":"http://localhost/",o=new URL("".concat(r).concat(e));return Object.entries(t).forEach((function(e){var t=e[0],n=e[1];o.searchParams.set(t,n)})),"".concat(o.pathname).concat(o.search)}},t.normaliseInputAppInfoOrThrowError=function(e){if(void 0===e)throw new Error("Please provide the appInfo object when calling supertokens.init");if(void 0===e.apiDomain)throw new Error("Please provide your apiDomain inside the appInfo object when calling supertokens.init");if(void 0===e.appName)throw new Error("Please provide your appName inside the appInfo object when calling supertokens.init");var t,n,r=new s.default("");return void 0!==e.apiGatewayPath&&(r=new s.default(e.apiGatewayPath)),{appName:e.appName,apiDomain:new i.default(e.apiDomain),apiBasePath:r.appendPath((t=o.DEFAULT_API_BASE_PATH,n=e.apiBasePath,void 0!==n?new s.default(n):new s.default(t)))}},t.isTest=function(){try{return"testing"===process.env.TEST_MODE}catch(e){return!1}},t.getQueryParams=function(e){var t=new URLSearchParams(r.WindowHandlerReference.getReferenceOrThrow().windowHandler.location.getSearch()).get(e);if(null!==t)return t},t.checkForSSRErrorAndAppendIfNeeded=function(e){return"undefined"==typeof window&&(e+=o.SSR_ERROR),e},t.getNormalisedUserContext=function(e){return void 0===e?{}:e},t.getHashFromLocation=function(){return r.WindowHandlerReference.getReferenceOrThrow().windowHandler.location.getHash().substring(1)},t.getGlobalClaimValidators=function(e){var t=e.overrideGlobalClaimValidators,n=e.userContext;return(0,a.getGlobalClaimValidators)(t,n)}},255:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.supported_fdi=t.package_version=void 0,t.package_version="0.4.1",t.supported_fdi=["1.15"]},7528:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.WindowHandlerReference=void 0;var r=n(1102);Object.defineProperty(t,"WindowHandlerReference",{enumerable:!0,get:function(){return r.WindowHandlerReference}})},2225:function(e,t){var n=this&&this.__assign||function(){return n=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},n.apply(this,arguments)};Object.defineProperty(t,"__esModule",{value:!0}),t.getProxyObject=void 0,t.getProxyObject=function(e){for(var t=n(n({},e),{_call:function(e,t){throw new Error("This function should only be called through the recipe object")}}),r=function(e){"_call"!==e&&(t[e]=function(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];return this._call(e,t)})},o=0,i=Object.keys(t);o<i.length;o++)r(i[o]);return t}},6333:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.OverrideableBuilder=void 0;var r=n(2225),o=function(){function e(e){this.layers=[e],this.proxies=[]}return e.prototype.override=function(e){for(var t=(0,r.getProxyObject)(this.layers[0]),n=e(t,this),o=0,i=Object.keys(this.layers[0]);o<i.length;o++){var s=i[o];n[s]===t[s]||"_call"===s?delete n[s]:void 0===n[s]&&(n[s]=null)}return this.layers.push(n),this.proxies.push(t),this},e.prototype.build=function(){var e=this;if(this.result)return this.result;this.result={};for(var t=0,n=this.layers;t<n.length;t++)for(var r=n[t],o=0,i=Object.keys(r);o<i.length;o++){var s=i[o],a=r[s];void 0!==a&&(this.result[s]=null===a?void 0:"function"==typeof a?a.bind(this.result):a)}for(var u=function(t){c.proxies[t]._call=function(n,r){for(var o=t;o>=0;--o){var i=e.layers[o][n];if(null!=i)return i.bind(e.result).apply(void 0,r)}}},c=this,l=0;l<this.proxies.length;++l)u(l);return this.result},e}();t.OverrideableBuilder=o,t.default=o},6754:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.getGlobalClaimValidators=void 0;var r=n(6355),o=n(7260),i=n(1772);t.getGlobalClaimValidators=function(e,t){var n=(0,r.getNormalisedUserContext)(t),s=i.default.getClaimValidatorsAddedByOtherRecipes(),a=o.default.recipeImpl.getGlobalClaimValidators({claimValidatorsAddedByOtherRecipes:s,userContext:n});return void 0!==e?e(a,n):a}},711:(e,t,n)=>{function r(e){for(var n in e)t.hasOwnProperty(n)||(t[n]=e[n])}t.__esModule=!0;let o=n(3951);void 0!==o.default?r(o):r({default:o,...o})},3771:(e,t,n)=>{t.__esModule=!0,function(e){for(var n in e)t.hasOwnProperty(n)||(t[n]=e[n])}(n(6754))},1102:(e,t,n)=>{t.__esModule=!0,function(e){for(var n in e)t.hasOwnProperty(n)||(t[n]=e[n])}(n(6174))}},e=>{var t=(6022,e(e.s=6022));supertokensEmailPassword=t}]);