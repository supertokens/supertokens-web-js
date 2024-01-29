"use strict";var supertokensEmailVerification;(self.webpackChunksupertokens_web_js=self.webpackChunksupertokens_web_js||[]).push([[537,560],{7611:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.SSR_ERROR=t.DEFAULT_API_BASE_PATH=void 0,t.DEFAULT_API_BASE_PATH="/auth",t.SSR_ERROR="\nIf you are trying to use this method doing server-side-rendering, please make sure you move this method inside a componentDidMount method or useEffect hook."},2173:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0});var r=n(942);t.default=r.STGeneralError},7992:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0});function n(e,t){void 0===t&&(t=!1),e=e.trim();try{if(!e.startsWith("http://")&&!e.startsWith("https://"))throw new Error("Error converting to proper URL");var r=new URL(e);return t?r.hostname.startsWith("localhost")||(o=r.hostname,/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(o))?"http://"+r.host:"https://"+r.host:r.protocol+"//"+r.host}catch(e){}var o;if(e.startsWith("/"))throw new Error("Please provide a valid domain name");if(0===e.indexOf(".")&&(e=e.substr(1)),(-1!==e.indexOf(".")||e.startsWith("localhost"))&&!e.startsWith("http://")&&!e.startsWith("https://")){e="https://"+e;try{return new URL(e),n(e,!0)}catch(e){}}throw new Error("Please provide a valid domain name")}t.default=function(e){var t=this;this.getAsStringDangerous=function(){return t.value},this.value=n(e)}},1260:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0});function n(e){e=e.trim();try{if(!e.startsWith("http://")&&!e.startsWith("https://"))throw new Error("Error converting to proper URL");return"/"===(e=new URL(e).pathname).charAt(e.length-1)?e.substr(0,e.length-1):e}catch(e){}if((function(e){if(-1===e.indexOf(".")||e.startsWith("/"))return!1;try{return-1!==new URL(e).hostname.indexOf(".")}catch(e){}try{return-1!==new URL("http://"+e).hostname.indexOf(".")}catch(e){}return!1}(e)||e.startsWith("localhost"))&&!e.startsWith("http://")&&!e.startsWith("https://"))return n(e="http://"+e);"/"!==e.charAt(0)&&(e="/"+e);try{return new URL("http://example.com"+e),n("http://example.com"+e)}catch(e){throw new Error("Please provide a valid URL path")}}t.default=function e(t){var r=this;this.startsWith=function(e){return r.value.startsWith(e.value)},this.appendPath=function(t){return new e(r.value+t.value)},this.getAsStringDangerous=function(){return r.value},this.value=n(t)}},5941:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.PostSuperTokensInitCallbacks=void 0;var n=function(){function e(){}return e.addPostInitCallback=function(t){e.postInitCallbacks.push(t)},e.runPostInitCallbacks=function(){for(var t=0,n=e.postInitCallbacks;t<n.length;t++)(0,n[t])()},e.postInitCallbacks=[],e}();t.PostSuperTokensInitCallbacks=n},634:function(e,t,n){var r=this&&this.__assign||function(){return r=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},r.apply(this,arguments)},o=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function a(e){try{u(r.next(e))}catch(e){i(e)}}function s(e){try{u(r.throw(e))}catch(e){i(e)}}function u(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,s)}u((r=r.apply(e,t||[])).next())}))},i=this&&this.__generator||function(e,t){var n,r,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function s(i){return function(s){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,r=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!((o=(o=a.trys).length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=t.call(e,a)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,s])}}};Object.defineProperty(t,"__esModule",{value:!0});var a=n(1260),s=n(255),u=n(2173),l=function(){function e(e,t){var n=this;this.recipeId=e,this.appInfo=t,this.get=function(e,t,a,s,u,l){return o(n,void 0,void 0,(function(){var n;return i(this,(function(o){switch(o.label){case 0:return[4,this.fetch(this.getFullUrl(e,t,s),r({method:"GET"},a),u,l)];case 1:return n=o.sent(),[4,this.getResponseJsonOrThrowGeneralError(n)];case 2:return[2,{jsonBody:o.sent(),fetchResponse:n}]}}))}))},this.post=function(e,t,a,s,u){return o(n,void 0,void 0,(function(){var n;return i(this,(function(o){switch(o.label){case 0:if(void 0===a.body)throw new Error("Post request must have a body");return[4,this.fetch(this.getFullUrl(e,t),r({method:"POST"},a),s,u)];case 1:return n=o.sent(),[4,this.getResponseJsonOrThrowGeneralError(n)];case 2:return[2,{jsonBody:o.sent(),fetchResponse:n}]}}))}))},this.delete=function(e,t,a,s,u){return o(n,void 0,void 0,(function(){var n;return i(this,(function(o){switch(o.label){case 0:return[4,this.fetch(this.getFullUrl(e,t),r({method:"DELETE"},a),s,u)];case 1:return n=o.sent(),[4,this.getResponseJsonOrThrowGeneralError(n)];case 2:return[2,{jsonBody:o.sent(),fetchResponse:n}]}}))}))},this.put=function(e,t,a,s,u){return o(n,void 0,void 0,(function(){var n;return i(this,(function(o){switch(o.label){case 0:return[4,this.fetch(this.getFullUrl(e,t),r({method:"PUT"},a),s,u)];case 1:return n=o.sent(),[4,this.getResponseJsonOrThrowGeneralError(n)];case 2:return[2,{jsonBody:o.sent(),fetchResponse:n}]}}))}))},this.fetch=function(e,t,a,u){return o(n,void 0,void 0,(function(){var n,o,l,c,f,d;return i(this,(function(i){switch(i.label){case 0:return n=void 0===t?{}:t.headers,[4,this.callPreAPIHook({preAPIHook:a,url:e,requestInit:r(r({},t),{headers:r(r({},n),{"fdi-version":s.supported_fdi.join(","),"Content-Type":"application/json",rid:this.recipeId})})})];case 1:return o=i.sent(),l=o.requestInit,c=o.url,[4,fetch(c,l)];case 2:if((f=i.sent()).status>=300)throw f;return void 0===u?[3,4]:(d=f.clone(),[4,u({requestInit:l,url:e,fetchResponse:d})]);case 3:i.sent(),i.label=4;case 4:return[2,f]}}))}))},this.callPreAPIHook=function(e){return o(n,void 0,void 0,(function(){return i(this,(function(t){switch(t.label){case 0:return void 0===e.preAPIHook?[2,{url:e.url,requestInit:e.requestInit}]:[4,e.preAPIHook({url:e.url,requestInit:e.requestInit})];case 1:return[2,t.sent()]}}))}))},this.getFullUrl=function(e,t,r){var o=n.appInfo.apiBasePath.getAsStringDangerous();void 0!==e&&"public"!==e&&(o="".concat(o,"/").concat(e));var i=new a.default(t),s="".concat(n.appInfo.apiDomain.getAsStringDangerous()).concat(o).concat(i.getAsStringDangerous());return void 0===r?s:s+"?"+new URLSearchParams(r)},this.getResponseJsonOrThrowGeneralError=function(e){return o(n,void 0,void 0,(function(){var t,n;return i(this,(function(r){switch(r.label){case 0:return[4,e.clone().json()];case 1:if("GENERAL_ERROR"===(t=r.sent()).status)throw n=void 0===t.message?"No Error Message Provided":t.message,new u.default(n);return[2,t]}}))}))}}var t;return t=e,e.preparePreAPIHook=function(e){var n=e.recipePreAPIHook,a=e.action,s=e.options,u=e.userContext;return function(e){return o(void 0,void 0,void 0,(function(){var o;return i(t,(function(t){switch(t.label){case 0:return[4,n(r(r({},e),{action:a,userContext:u}))];case 1:return o=t.sent(),void 0===s||void 0===s.preAPIHook?[2,o]:[2,s.preAPIHook({url:o.url,requestInit:o.requestInit,userContext:u})]}}))}))}},e.preparePostAPIHook=function(e){var n=e.recipePostAPIHook,a=e.action,s=e.userContext;return function(e){return o(void 0,void 0,void 0,(function(){return i(t,(function(t){switch(t.label){case 0:return[4,n(r(r({},e),{userContext:s,action:a}))];case 1:return t.sent(),[2]}}))}))}},e}();t.default=l},3288:function(e,t,n){var r,o=this&&this.__extends||(r=function(e,t){return r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])},r(e,t)},function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function n(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}),i=this&&this.__assign||function(){return i=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},i.apply(this,arguments)},a=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function a(e){try{u(r.next(e))}catch(e){i(e)}}function s(e){try{u(r.throw(e))}catch(e){i(e)}}function u(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,s)}u((r=r.apply(e,t||[])).next())}))},s=this&&this.__generator||function(e,t){var n,r,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function s(i){return function(s){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,r=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!((o=(o=a.trys).length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=t.call(e,a)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,s])}}};Object.defineProperty(t,"__esModule",{value:!0}),t.EmailVerificationClaimClass=void 0;var u=n(9236);function l(e){return Math.max(e,u.DateProviderReference.getReferenceOrThrow().dateProvider.getThresholdInSeconds())}var c=function(e){function t(t){var n=e.call(this,{id:"st-ev",refresh:function(e){return a(n,void 0,void 0,(function(){return s(this,(function(n){switch(n.label){case 0:return[4,t().isEmailVerified({userContext:e})];case 1:return n.sent(),[2]}}))}))}})||this;return n.validators=i(i({},n.validators),{isVerified:function(e,t){return{id:n.id,refresh:n.refresh,shouldRefresh:function(r,o){var i=u.DateProviderReference.getReferenceOrThrow().dateProvider;if(t=null!=t?t:l(10),e=null!=e?e:l(300),t<i.getThresholdInSeconds())throw new Error("maxAgeInSeconds must be greater than or equal to the DateProvider threshold value -> ".concat(i.getThresholdInSeconds()));if(e<i.getThresholdInSeconds())throw new Error("refetchTimeOnFalseInSeconds must be greater than or equal to the DateProvider threshold value -> ".concat(i.getThresholdInSeconds()));var a=n.getValueFromPayload(r,o);return void 0===a||n.getLastFetchedTime(r,o)<i.now()-1e3*t||!1===a&&n.getLastFetchedTime(r,o)<i.now()-1e3*e},validate:function(e,t){return a(n,void 0,void 0,(function(){var n;return s(this,(function(r){return[2,!0===(n=this.getValueFromPayload(e,t))?{isValid:!0}:{isValid:!1,reason:{message:"wrong value",expectedValue:!0,actualValue:n}}]}))}))}}}}),n}return o(t,e),t}(n(1013).BooleanClaim);t.EmailVerificationClaimClass=c},5857:function(e,t,n){var r=this&&this.__assign||function(){return r=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},r.apply(this,arguments)};Object.defineProperty(t,"__esModule",{value:!0}),t.EmailVerificationClaimClass=t.EmailVerificationClaim=t.getTenantIdFromURL=t.getEmailVerificationTokenFromURL=t.isEmailVerified=t.sendVerificationEmail=t.verifyEmail=t.init=void 0;var o=n(6923),i=n(8122),a=n(3288);Object.defineProperty(t,"EmailVerificationClaimClass",{enumerable:!0,get:function(){return a.EmailVerificationClaimClass}});var s=function(){function e(){}return e.init=function(e){return o.default.init(e)},e.verifyEmail=function(e){return o.default.getInstanceOrThrow().recipeImplementation.verifyEmail(r(r({},e),{userContext:(0,i.getNormalisedUserContext)(null==e?void 0:e.userContext)}))},e.sendVerificationEmail=function(e){return o.default.getInstanceOrThrow().recipeImplementation.sendVerificationEmail(r(r({},e),{userContext:(0,i.getNormalisedUserContext)(null==e?void 0:e.userContext)}))},e.isEmailVerified=function(e){return o.default.getInstanceOrThrow().recipeImplementation.isEmailVerified(r(r({},e),{userContext:(0,i.getNormalisedUserContext)(null==e?void 0:e.userContext)}))},e.getEmailVerificationTokenFromURL=function(e){return o.default.getInstanceOrThrow().recipeImplementation.getEmailVerificationTokenFromURL(r(r({},e),{userContext:(0,i.getNormalisedUserContext)(null==e?void 0:e.userContext)}))},e.getTenantIdFromURL=function(e){return o.default.getInstanceOrThrow().recipeImplementation.getTenantIdFromURL(r(r({},e),{userContext:(0,i.getNormalisedUserContext)(null==e?void 0:e.userContext)}))},e.EmailVerificationClaim=o.default.EmailVerificationClaim,e}();t.default=s;var u=s.init;t.init=u;var l=s.verifyEmail;t.verifyEmail=l;var c=s.sendVerificationEmail;t.sendVerificationEmail=c;var f=s.isEmailVerified;t.isEmailVerified=f;var d=s.getEmailVerificationTokenFromURL;t.getEmailVerificationTokenFromURL=d;var p=s.getTenantIdFromURL;t.getTenantIdFromURL=p;var h=s.EmailVerificationClaim;t.EmailVerificationClaim=h},6923:function(e,t,n){var r=this&&this.__assign||function(){return r=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},r.apply(this,arguments)};Object.defineProperty(t,"__esModule",{value:!0}),t.Recipe=void 0;var o=n(4881),i=n(787),a=n(5120),s=n(6333),u=n(8122),l=n(3288),c=n(5941),f=function(){function e(t){this.config=(0,i.normaliseUserInput)(t);var n=new s.default((0,a.default)({recipeId:this.config.recipeId,appInfo:this.config.appInfo,clientType:this.config.clientType,preAPIHook:this.config.preAPIHook,postAPIHook:this.config.postAPIHook}));this.recipeImplementation=n.override(this.config.override.functions).build(),c.PostSuperTokensInitCallbacks.addPostInitCallback((function(){o.SessionClaimValidatorStore.addClaimValidatorFromOtherRecipe(e.EmailVerificationClaim.validators.isVerified(10))}))}return e.init=function(t){return function(n,o){return e.instance=new e(r(r({},t),{appInfo:n,clientType:o,recipeId:e.RECIPE_ID})),e.instance}},e.getInstanceOrThrow=function(){if(void 0===e.instance){var t="No instance of EmailVerification found. Ensure that the 'EmailVerification.init' method is called within the 'SuperTokens.init' recipeList.";throw t=(0,u.checkForSSRErrorAndAppendIfNeeded)(t),Error(t)}return e.instance},e.reset=function(){(0,u.isTest)()&&(e.instance=void 0)},e.RECIPE_ID="emailverification",e.EmailVerificationClaim=new l.EmailVerificationClaimClass((function(){return e.getInstanceOrThrow().recipeImplementation})),e}();t.Recipe=f,t.default=f},5120:function(e,t,n){var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function a(e){try{u(r.next(e))}catch(e){i(e)}}function s(e){try{u(r.throw(e))}catch(e){i(e)}}function u(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,s)}u((r=r.apply(e,t||[])).next())}))},o=this&&this.__generator||function(e,t){var n,r,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function s(i){return function(s){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,r=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!((o=(o=a.trys).length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=t.call(e,a)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,s])}}};Object.defineProperty(t,"__esModule",{value:!0}),t.getRecipeImplementation=void 0;var i=n(634),a=n(8122);function s(e){var t=new i.default(e.recipeId,e.appInfo);return{verifyEmail:function(n){var a=n.options,s=n.userContext;return r(this,void 0,void 0,(function(){var n,r,u,l,c;return o(this,(function(o){switch(o.label){case 0:return n=this.getEmailVerificationTokenFromURL({userContext:s}),r=this.getTenantIdFromURL({userContext:s}),[4,t.post(r,"/user/email/verify",{body:JSON.stringify({method:"token",token:n})},i.default.preparePreAPIHook({recipePreAPIHook:e.preAPIHook,action:"VERIFY_EMAIL",options:a,userContext:s}),i.default.preparePostAPIHook({recipePostAPIHook:e.postAPIHook,userContext:s,action:"VERIFY_EMAIL"}))];case 1:return u=o.sent(),l=u.jsonBody,c=u.fetchResponse,[2,{status:l.status,fetchResponse:c}]}}))}))},isEmailVerified:function(n){var a=n.options,s=n.userContext;return r(this,void 0,void 0,(function(){var n,r,u;return o(this,(function(o){switch(o.label){case 0:return[4,t.get(void 0,"/user/email/verify",{},void 0,i.default.preparePreAPIHook({recipePreAPIHook:e.preAPIHook,action:"IS_EMAIL_VERIFIED",options:a,userContext:s}),i.default.preparePostAPIHook({recipePostAPIHook:e.postAPIHook,userContext:s,action:"IS_EMAIL_VERIFIED"}))];case 1:return n=o.sent(),r=n.jsonBody,u=n.fetchResponse,[2,{status:"OK",isVerified:r.isVerified,fetchResponse:u}]}}))}))},sendVerificationEmail:function(n){var a=n.options,s=n.userContext;return r(this,void 0,void 0,(function(){var n,r,u;return o(this,(function(o){switch(o.label){case 0:return[4,t.post(void 0,"/user/email/verify/token",{body:JSON.stringify({})},i.default.preparePreAPIHook({recipePreAPIHook:e.preAPIHook,action:"SEND_VERIFY_EMAIL",options:a,userContext:s}),i.default.preparePostAPIHook({recipePostAPIHook:e.postAPIHook,userContext:s,action:"SEND_VERIFY_EMAIL"}))];case 1:return n=o.sent(),r=n.jsonBody,u=n.fetchResponse,[2,{status:r.status,fetchResponse:u}]}}))}))},getEmailVerificationTokenFromURL:function(){var e=(0,a.getQueryParams)("token");return void 0===e?"":e},getTenantIdFromURL:function(){return(0,a.getQueryParams)("tenantId")}}}t.default=s,t.getRecipeImplementation=s},787:function(e,t,n){var r=this&&this.__assign||function(){return r=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},r.apply(this,arguments)};Object.defineProperty(t,"__esModule",{value:!0}),t.normaliseUserInput=void 0;var o=n(6069);t.normaliseUserInput=function(e){var t=r({functions:function(e){return e}},e.override);return r(r({},(0,o.normaliseRecipeModuleConfig)(e)),{override:t})}},1996:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0});t.default=function(e){this.config=e}},6069:function(e,t){var n=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function a(e){try{u(r.next(e))}catch(e){i(e)}}function s(e){try{u(r.throw(e))}catch(e){i(e)}}function u(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,s)}u((r=r.apply(e,t||[])).next())}))},r=this&&this.__generator||function(e,t){var n,r,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function s(i){return function(s){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,r=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!((o=(o=a.trys).length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=t.call(e,a)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,s])}}};Object.defineProperty(t,"__esModule",{value:!0}),t.normaliseRecipeModuleConfig=void 0,t.normaliseRecipeModuleConfig=function(e){var t=this,o=e.preAPIHook;void 0===o&&(o=function(e){return n(t,void 0,void 0,(function(){return r(this,(function(t){return[2,e]}))}))});var i=e.postAPIHook;return void 0===i&&(i=function(){return n(t,void 0,void 0,(function(){return r(this,(function(e){return[2]}))}))}),{recipeId:e.recipeId,appInfo:e.appInfo,clientType:e.clientType,preAPIHook:o,postAPIHook:i}}},1013:function(e,t,n){var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function a(e){try{u(r.next(e))}catch(e){i(e)}}function s(e){try{u(r.throw(e))}catch(e){i(e)}}function u(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,s)}u((r=r.apply(e,t||[])).next())}))},o=this&&this.__generator||function(e,t){var n,r,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function s(i){return function(s){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,r=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!((o=(o=a.trys).length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=t.call(e,a)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,s])}}};Object.defineProperty(t,"__esModule",{value:!0}),t.getInvalidClaimsFromResponse=t.getClaimValue=t.validateClaims=t.signOut=t.addAxiosInterceptors=t.doesSessionExist=t.attemptRefreshingSession=t.getAccessToken=t.getAccessTokenPayloadSecurely=t.getUserId=t.init=t.BooleanClaim=t.PrimitiveArrayClaim=t.PrimitiveClaim=void 0;var i=n(8122),a=n(6322),s=function(){function e(){}return e.init=function(e){return a.default.init(e)},e.getUserId=function(e){return a.default.getInstanceOrThrow().getUserId({userContext:(0,i.getNormalisedUserContext)(null==e?void 0:e.userContext)})},e.getAccessToken=function(e){return a.default.getInstanceOrThrow().getAccessToken({userContext:(0,i.getNormalisedUserContext)(null==e?void 0:e.userContext)})},e.getAccessTokenPayloadSecurely=function(e){return r(this,void 0,void 0,(function(){return o(this,(function(t){return[2,a.default.getInstanceOrThrow().getAccessTokenPayloadSecurely({userContext:(0,i.getNormalisedUserContext)(null==e?void 0:e.userContext)})]}))}))},e.attemptRefreshingSession=function(){return r(this,void 0,void 0,(function(){return o(this,(function(e){return[2,a.default.getInstanceOrThrow().attemptRefreshingSession()]}))}))},e.doesSessionExist=function(e){return a.default.getInstanceOrThrow().doesSessionExist({userContext:(0,i.getNormalisedUserContext)(null==e?void 0:e.userContext)})},e.addAxiosInterceptors=function(e,t){return a.default.addAxiosInterceptors(e,(0,i.getNormalisedUserContext)(t))},e.signOut=function(e){return a.default.getInstanceOrThrow().signOut({userContext:(0,i.getNormalisedUserContext)(null==e?void 0:e.userContext)})},e.getClaimValue=function(e){return a.default.getInstanceOrThrow().getClaimValue({claim:e.claim,userContext:(0,i.getNormalisedUserContext)(null==e?void 0:e.userContext)})},e.validateClaims=function(e){return a.default.getInstanceOrThrow().validateClaims({overrideGlobalClaimValidators:null==e?void 0:e.overrideGlobalClaimValidators,userContext:(0,i.getNormalisedUserContext)(null==e?void 0:e.userContext)})},e.getInvalidClaimsFromResponse=function(e){return a.default.getInstanceOrThrow().getInvalidClaimsFromResponse({response:e.response,userContext:(0,i.getNormalisedUserContext)(null==e?void 0:e.userContext)})},e}();t.default=s;var u=s.init;t.init=u;var l=s.getUserId;t.getUserId=l;var c=s.getAccessTokenPayloadSecurely;t.getAccessTokenPayloadSecurely=c;var f=s.getAccessToken;t.getAccessToken=f;var d=s.attemptRefreshingSession;t.attemptRefreshingSession=d;var p=s.doesSessionExist;t.doesSessionExist=p;var h=s.addAxiosInterceptors;t.addAxiosInterceptors=h;var v=s.signOut;t.signOut=v;var m=s.validateClaims;t.validateClaims=m;var g=s.getClaimValue;t.getClaimValue=g;var y=s.getInvalidClaimsFromResponse;t.getInvalidClaimsFromResponse=y;var w=n(1757);Object.defineProperty(t,"PrimitiveClaim",{enumerable:!0,get:function(){return w.PrimitiveClaim}}),Object.defineProperty(t,"PrimitiveArrayClaim",{enumerable:!0,get:function(){return w.PrimitiveArrayClaim}}),Object.defineProperty(t,"BooleanClaim",{enumerable:!0,get:function(){return w.BooleanClaim}})},6322:function(e,t,n){var r,o=this&&this.__extends||(r=function(e,t){return r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])},r(e,t)},function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function n(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}),i=this&&this.__assign||function(){return i=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},i.apply(this,arguments)},a=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function a(e){try{u(r.next(e))}catch(e){i(e)}}function s(e){try{u(r.throw(e))}catch(e){i(e)}}function u(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,s)}u((r=r.apply(e,t||[])).next())}))},s=this&&this.__generator||function(e,t){var n,r,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function s(i){return function(s){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,r=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!((o=(o=a.trys).length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=t.call(e,a)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,s])}}};Object.defineProperty(t,"__esModule",{value:!0}),t.Recipe=void 0;var u=n(1996),l=n(1757),c=n(8122),f=function(e){function t(t){var n=e.call(this,t)||this;return n.getUserId=function(e){return l.default.getUserId({userContext:e.userContext})},n.getAccessToken=function(e){return a(n,void 0,void 0,(function(){return s(this,(function(t){return[2,l.default.getAccessToken({userContext:e.userContext})]}))}))},n.getAccessTokenPayloadSecurely=function(e){return a(n,void 0,void 0,(function(){return s(this,(function(t){return[2,l.default.getAccessTokenPayloadSecurely({userContext:e.userContext})]}))}))},n.doesSessionExist=function(e){return l.default.doesSessionExist({userContext:e.userContext})},n.signOut=function(e){return l.default.signOut({userContext:e.userContext})},n.attemptRefreshingSession=function(){return a(n,void 0,void 0,(function(){return s(this,(function(e){return[2,l.default.attemptRefreshingSession()]}))}))},n.validateClaims=function(e){return l.default.validateClaims(e.overrideGlobalClaimValidators,e.userContext)},l.default.init(i(i({},t),{preAPIHook:function(e){return a(n,void 0,void 0,(function(){var n,r;return s(this,(function(o){return(n=new Headers(e.requestInit.headers)).set("rid",t.recipeId),r=i(i({},e),{requestInit:i(i({},e.requestInit),{headers:n})}),void 0===t.preAPIHook?[2,r]:[2,t.preAPIHook(e)]}))}))},apiDomain:t.appInfo.apiDomain.getAsStringDangerous(),apiBasePath:t.appInfo.apiBasePath.getAsStringDangerous()})),n}return o(t,e),t.init=function(e){return function(n,r,o){return t.instance=new t(i(i({},e),{appInfo:n,recipeId:t.RECIPE_ID,enableDebugLogs:o})),t.instance}},t.prototype.getClaimValue=function(e){return l.default.getClaimValue(e)},t.prototype.getInvalidClaimsFromResponse=function(e){return l.default.getInvalidClaimsFromResponse(e)},t.addAxiosInterceptors=function(e,t){return l.default.addAxiosInterceptors(e,t)},t.getInstanceOrThrow=function(){if(void 0===t.instance){var e="No instance of Session found. Ensure that the 'Session.init' method is called within the 'SuperTokens.init' recipeList.";throw e=(0,c.checkForSSRErrorAndAppendIfNeeded)(e),Error(e)}return t.instance},t.reset=function(){(0,c.isTest)()&&(t.instance=void 0)},t.RECIPE_ID="session",t}(u.default);t.Recipe=f,t.default=f},4881:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.SessionClaimValidatorStore=void 0;var r=n(6376);Object.defineProperty(t,"SessionClaimValidatorStore",{enumerable:!0,get:function(){return r.SessionClaimValidatorStore}})},8122:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.normaliseUser=t.normaliseUserResponse=t.getGlobalClaimValidators=t.getHashFromLocation=t.getNormalisedUserContext=t.checkForSSRErrorAndAppendIfNeeded=t.getAllQueryParams=t.getQueryParams=t.isTest=t.normaliseInputAppInfoOrThrowError=t.appendQueryParamsToURL=void 0;var r=n(7528),o=n(7611),i=n(7992),a=n(1260),s=n(5811);function u(e,t){if("loginMethods"in t)return t;var n=void 0!==t.email?[t.email]:[],r=void 0!==t.phoneNumber?[t.phoneNumber]:[],o=void 0!==t.thirdParty?[t.thirdParty]:[];return{id:t.id,emails:n,phoneNumbers:r,thirdParty:o,isPrimaryUser:!1,tenantIds:t.tenantIds,timeJoined:t.timeJoined,loginMethods:[{recipeId:e,recipeUserId:t.id,timeJoined:t.timeJoined,tenantIds:t.tenantIds,email:t.email,phoneNumber:t.email}]}}t.appendQueryParamsToURL=function(e,t){if(void 0===t)return e;try{var n=new URL(e);return Object.entries(t).forEach((function(e){var t=e[0],r=e[1];n.searchParams.set(t,r)})),n.href}catch(n){var r=e.startsWith("/")?"http:localhost":"http://localhost/",o=new URL("".concat(r).concat(e));return Object.entries(t).forEach((function(e){var t=e[0],n=e[1];o.searchParams.set(t,n)})),"".concat(o.pathname).concat(o.search)}},t.normaliseInputAppInfoOrThrowError=function(e){if(void 0===e)throw new Error("Please provide the appInfo object when calling supertokens.init");if(void 0===e.apiDomain)throw new Error("Please provide your apiDomain inside the appInfo object when calling supertokens.init");if(void 0===e.appName)throw new Error("Please provide your appName inside the appInfo object when calling supertokens.init");var t,n,r=new a.default("");return void 0!==e.apiGatewayPath&&(r=new a.default(e.apiGatewayPath)),{appName:e.appName,apiDomain:new i.default(e.apiDomain),apiBasePath:r.appendPath((t=o.DEFAULT_API_BASE_PATH,n=e.apiBasePath,void 0!==n?new a.default(n):new a.default(t)))}},t.isTest=function(){try{return"testing"===process.env.TEST_MODE}catch(e){return!1}},t.getQueryParams=function(e){var t=new URLSearchParams(r.WindowHandlerReference.getReferenceOrThrow().windowHandler.location.getSearch()).get(e);if(null!==t)return t},t.getAllQueryParams=function(){return new URLSearchParams(r.WindowHandlerReference.getReferenceOrThrow().windowHandler.location.getSearch())},t.checkForSSRErrorAndAppendIfNeeded=function(e){return"undefined"==typeof window&&(e+=o.SSR_ERROR),e},t.getNormalisedUserContext=function(e){return void 0===e?{}:e},t.getHashFromLocation=function(){return r.WindowHandlerReference.getReferenceOrThrow().windowHandler.location.getHash().substring(1)},t.getGlobalClaimValidators=function(e){var t=e.overrideGlobalClaimValidators,n=e.userContext;return(0,s.getGlobalClaimValidators)(t,n)},t.normaliseUserResponse=function(e,t){return"createdNewRecipeUser"in t?t:{createdNewRecipeUser:t.createdNewUser,user:u(e,t.user)}},t.normaliseUser=u},255:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.supported_fdi=t.package_version=void 0,t.package_version="0.9.0",t.supported_fdi=["1.17","1.18"]},7528:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.WindowHandlerReference=void 0;var r=n(9092);Object.defineProperty(t,"WindowHandlerReference",{enumerable:!0,get:function(){return r.WindowHandlerReference}})},4328:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.getGlobalClaimValidators=void 0;var r=n(2652),o=n(788),i=n(2582);t.getGlobalClaimValidators=function(e,t){var n=(0,r.getNormalisedUserContext)(t),a=i.default.getClaimValidatorsAddedByOtherRecipes(),s=o.default.recipeImpl.getGlobalClaimValidators({claimValidatorsAddedByOtherRecipes:a,userContext:n});return void 0!==e?e(s,n):s}},9236:(e,t,n)=>{t.__esModule=!0,function(e){for(var n in e)t.hasOwnProperty(n)||(t[n]=e[n])}(n(2519))},942:(e,t,n)=>{function r(e){for(var n in e)t.hasOwnProperty(n)||(t[n]=e[n])}t.__esModule=!0;let o=n(6398);void 0!==o.default?r(o):r({default:o,...o})},5811:(e,t,n)=>{t.__esModule=!0,function(e){for(var n in e)t.hasOwnProperty(n)||(t[n]=e[n])}(n(4328))},6376:(e,t,n)=>{function r(e){for(var n in e)t.hasOwnProperty(n)||(t[n]=e[n])}t.__esModule=!0;let o=n(2582);void 0!==o.default?r(o):r({default:o,...o})},9092:(e,t,n)=>{t.__esModule=!0,function(e){for(var n in e)t.hasOwnProperty(n)||(t[n]=e[n])}(n(7860))}},e=>{var t=(5857,e(e.s=5857));supertokensEmailVerification=t}]);