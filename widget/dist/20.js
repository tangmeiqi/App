webpackJsonp([20],{142:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"login",props:[""],components:{},data:function(){return{weixin:"",show:0,keyWord:"register",captchaSent:!1,getCaptchaCool:60,curCaptchaCool:0,signinPhone:"",signinPassword:"",signupPhone:"",captcha:"",supInviteCode:"",signupPassword:"",signupRePassword:"",submitDisabled:!1}},beforeRouteEnter:function(e,t,i){i(function(e){e.initShow()})},methods:{initShow:function(){this.show=0},wxLogin:function(){var e=this;window.wx=api.require("wx"),wx.auth({apiKey:"wxb531b503239f2ee0"},function(t,i){t.status?wx.getToken({apiKey:"wxb531b503239f2ee0",apiSecret:"22a45313acaa6827d8746715f3280d04",code:""+t.code},function(t,i){t.status&&wx.getUserInfo({accessToken:""+t.accessToken,openId:""+t.openId},function(t,i){t.status&&(e.weixin=t.unionid,fetch("http://47.97.153.221:8080/app/user/login",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},credentials:"include",body:"weixin="+e.weixin}).then(function(e){if(e.ok)return e.json()}).then(function(t){if(t.userId){localStorage.userInfo=JSON.stringify(t);var i=JSON.parse(localStorage.userInfo);e.$root.eventHub.$emit("pushToProfile",i.userId)}else 1===t.status?e.show=3:t.message&&e.$root.eventHub.$emit("showNotification",t.message)}))})}):3===i.code&&alert("当前设备未安装微信客户端")})},getSessionId:function(){if(document.cookie.length>0){var e=document.cookie.indexOf("SSBSESSIONID=");if(-1!=e){e=e+"SSBSESSIONID".length+1;var t=document.cookie.indexOf(";",e);return-1==t&&(t=document.cookie.length),unescape(document.cookie.substring(e,t))}}},back:function(){window.history.back(-1),this.show=0},clearLogin:function(){this.signinPhone="",this.signinPassword="",this.signupPhone="",this.captcha="",this.signupPassword="",this.signupRePassword=""},getCaptcha:function(e){var t=this;if(/^1\d{10}$/.test(this.signupPhone)){fetch("http://47.97.153.221:8080/app/getCode",{method:"post",headers:{"Content-Type":"application/x-www-form-urlencoded"},credentials:"include",body:"phoneNum="+this.signupPhone+"&keyWord="+e}).then(function(e){if(e.ok)return e.json()}).then(function(e){e.message&&t.$root.eventHub.$emit("showNotification",e.message)}),this.captchaSent=!0,this.curCaptchaCool=this.getCaptchaCool;var i=setInterval(function(){t.curCaptchaCool-=1,0===t.curCaptchaCool&&(clearInterval(i),t.captchaSent=!1)},1e3)}else this.$root.eventHub.$emit("showNotification","手机号格式错误")},signup:function(){var e=this;if(""!=this.signupPhone&&""!=this.captcha&&""!=this.signupPassword){var t=/^1\d{10}$/,i=/^[0-9a-zA-Z]{6,16}$/;if(t.test(this.signupPhone))if(i.test(this.signupPassword)){if(this.submitDisabled)return;this.submitDisabled=!0,setTimeout(function(){e.submitDisabled=!1},3e3),fetch("http://47.97.153.221:8080/app/user/register",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},credentials:"include",body:"phoneNum="+this.signupPhone+"&rCode="+this.captcha+"&supInviteCode="+this.supInviteCode+"&weixin="+this.weixin+"&password="+this.signupPassword}).then(function(e){if(e.ok)return e.json()}).then(function(t){if(t.status){e.$root.eventHub.$emit("showNotification","注册成功"),localStorage.userInfo=JSON.stringify(t);var i=JSON.parse(localStorage.userInfo);e.$root.eventHub.$emit("pushToProfile",i.userId),e.show=0}else t.message&&e.$root.eventHub.$emit("showNotification",t.message)}).catch(function(e){console.error(e)})}else this.$root.eventHub.$emit("showNotification","密码格式错误");else this.$root.eventHub.$emit("showNotification","手机号格式错误")}else this.$root.eventHub.$emit("showNotification","必填内容不能为空")},signin:function(){var e=this;if(""!=this.signinPhone&&""!=this.signinPassword){if(this.submitDisabled)return;this.submitDisabled=!0,setTimeout(function(){e.submitDisabled=!1},3e3),fetch("http://47.97.153.221:8080/app/user/login",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},credentials:"include",body:"phoneNum="+this.signinPhone+"&password="+this.signinPassword}).then(function(e){if(e.ok)return e.json()}).then(function(t){if(1===t.status){localStorage.userInfo=JSON.stringify(t);var i=JSON.parse(localStorage.userInfo);e.$root.eventHub.$emit("pushToProfile",i.userId),e.clearLogin()}else t.message&&e.$root.eventHub.$emit("showNotification",t.message)})}else this.$root.eventHub.$emit("showNotification","内容不能为空")},phonesignin:function(){var e=this;if(""!=this.signupPhone&&""!=this.captcha){if(this.submitDisabled)return;this.submitDisabled=!0,setTimeout(function(){e.submitDisabled=!1},3e3),fetch("http://47.97.153.221:8080//app/phoneLogin",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},credentials:"include",body:"phoneNum="+this.signupPhone+"&code="+this.captcha}).then(function(e){if(e.ok)return e.json()}).then(function(t){if(1===t.status){localStorage.userInfo=JSON.stringify(t);var i=JSON.parse(localStorage.userInfo);e.$root.eventHub.$emit("pushToProfile",i.userId),e.clearLogin()}else t.message&&e.$root.eventHub.$emit("showNotification",t.message)})}else this.$root.eventHub.$emit("showNotification","内容不能为空")},reset:function(){var e=this;if(""!=this.signupPhone&&""!=this.captcha&&""!=this.signupPassword){if(this.submitDisabled)return;this.submitDisabled=!0,setTimeout(function(){e.submitDisabled=!1},3e3),fetch("http://47.97.153.221:8080/app/resetPassword",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},credentials:"include",body:"phoneNum="+this.signupPhone+"&code="+this.captcha+"&newPassword="+this.signupPassword}).then(function(e){if(e.ok)return e.json()}).then(function(t){1==t.status?(e.$root.eventHub.$emit("showNotification","重置成功"),e.show=0):t.message&&e.$root.eventHub.$emit("showNotification",t.message)})}else this.$root.eventHub.$emit("showNotification","内容不能为空")}}}},206:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("transition",{attrs:{name:"slide-up"}},[i("div",{staticClass:"login"},[i("div",{attrs:{id:"header"}},[i("div",{attrs:{id:"back"},on:{click:e.back}},[i("div",{attrs:{id:"app-name"}},[e._v("省省帮")])])]),e._v(" "),i("transition",{attrs:{name:"slide-fade"}},[i("div",{directives:[{name:"show",rawName:"v-show",value:0===e.show,expression:"show === 0"}],staticClass:"main"},[i("form",{staticClass:"login-wrapper"},[i("div",{staticClass:"login-input li-phone"},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.signinPhone,expression:"signinPhone"}],attrs:{type:"text","data-valid":"none",placeholder:"请输入手机号"},domProps:{value:e.signinPhone},on:{input:function(t){t.target.composing||(e.signinPhone=t.target.value)}}})]),e._v(" "),i("div",{staticClass:"login-input li-pass"},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.signinPassword,expression:"signinPassword"}],attrs:{type:"password","date-valid":"none",placeholder:"请输入密码"},domProps:{value:e.signinPassword},on:{input:function(t){t.target.composing||(e.signinPassword=t.target.value)}}}),e._v(" "),i("div",{staticClass:"forget-password"})]),e._v(" "),i("button",{staticClass:"login-submit",attrs:{type:"submit"},on:{click:function(t){return t.preventDefault(),e.signin(t)}}},[e._v("登  录")])]),e._v(" "),i("div",{staticClass:"register"},[i("div",{staticClass:"re-1",on:{click:function(t){e.show=1}}},[e._v("验证码登陆")]),e._v(" "),i("div",{staticClass:"re-2",on:{click:function(t){e.show=2}}},[e._v("忘记密码？")])]),e._v(" "),i("div",{staticClass:"other"},[i("div",{staticClass:"o-header"},[i("hr"),e._v(" "),i("span",[e._v("首次请用微信授权并注册")])]),e._v(" "),i("div",{staticClass:"o-body"},[i("div",{staticClass:"o-option"},[i("div",{staticClass:"o-icon oi-wx",attrs:{id:"weixin"},on:{click:e.wxLogin}}),e._v(" "),i("span",{staticClass:"o-tag"},[e._v("微信")])])])])])]),e._v(" "),i("transition",{attrs:{name:"slide-fade"}},[i("div",{directives:[{name:"show",rawName:"v-show",value:1===e.show,expression:"show === 1"}],staticClass:"main"},[i("form",{staticClass:"login-wrapper"},[i("div",{staticClass:"login-input li-phone"},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.signupPhone,expression:"signupPhone"}],attrs:{type:"text","data-valid":"none",placeholder:"请输入手机号"},domProps:{value:e.signupPhone},on:{input:function(t){t.target.composing||(e.signupPhone=t.target.value)}}}),e._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:!e.captchaSent,expression:"!captchaSent"}],staticClass:"get-captcha",on:{click:function(t){e.getCaptcha("login")}}},[e._v("获取验证码")]),e._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:e.captchaSent,expression:"captchaSent"}],staticClass:"get-captcha"},[e._v(e._s(e.curCaptchaCool)+"s后重发")])]),e._v(" "),i("div",{staticClass:"login-input li-captcha"},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.captcha,expression:"captcha"}],attrs:{type:"text","date-valid":"none",placeholder:"短信中的验证码"},domProps:{value:e.captcha},on:{input:function(t){t.target.composing||(e.captcha=t.target.value)}}})]),e._v(" "),i("button",{staticClass:"login-submit",attrs:{type:"submit"},on:{click:function(t){return t.preventDefault(),e.phonesignin(t)}}},[e._v("登  录")])]),e._v(" "),i("div",{staticClass:"register"},[i("div",{staticClass:"re-1",on:{click:function(t){e.show=0}}},[e._v("密码登陆")])])])]),e._v(" "),i("transition",{attrs:{name:"slide-fade"}},[i("div",{directives:[{name:"show",rawName:"v-show",value:2===e.show,expression:"show === 2"}],staticClass:"main"},[i("form",{staticClass:"login-wrapper"},[i("div",{staticClass:"login-input li-phone"},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.signupPhone,expression:"signupPhone"}],attrs:{type:"text","data-valid":"none",placeholder:"请输入手机号"},domProps:{value:e.signupPhone},on:{input:function(t){t.target.composing||(e.signupPhone=t.target.value)}}}),e._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:!e.captchaSent,expression:"!captchaSent"}],staticClass:"get-captcha",on:{click:function(t){e.getCaptcha("reset")}}},[e._v("获取验证码")]),e._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:e.captchaSent,expression:"captchaSent"}],staticClass:"get-captcha"},[e._v(e._s(e.curCaptchaCool)+"s后重发")])]),e._v(" "),i("div",{staticClass:"login-input li-captcha"},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.captcha,expression:"captcha"}],attrs:{"date-valid":"none",placeholder:"请输入短信中的验证码"},domProps:{value:e.captcha},on:{input:function(t){t.target.composing||(e.captcha=t.target.value)}}})]),e._v(" "),i("div",{staticClass:"login-input li-pass"},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.signupPassword,expression:"signupPassword"}],attrs:{type:"password","date-valid":"none",placeholder:"请输入新密码(6-16位字母或数字)"},domProps:{value:e.signupPassword},on:{input:function(t){t.target.composing||(e.signupPassword=t.target.value)}}})]),e._v(" "),i("button",{staticClass:"login-submit",attrs:{type:"submit"},on:{click:function(t){return t.preventDefault(),e.reset(t)}}},[e._v("设置新密码")])]),e._v(" "),i("div",{staticClass:"register"},[i("div",{staticClass:"re-1",on:{click:function(t){e.show=0}}},[e._v("返回登录界面")])])])]),e._v(" "),i("transition",{attrs:{name:"slide-fade"}},[i("div",{directives:[{name:"show",rawName:"v-show",value:3===e.show,expression:"show === 3"}],staticClass:"main"},[i("form",{staticClass:"login-wrapper",attrs:{id:"register"}},[i("div",{staticClass:"login-input li-phone"},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.signupPhone,expression:"signupPhone"}],attrs:{type:"text","data-valid":"none",placeholder:"手机号"},domProps:{value:e.signupPhone},on:{input:function(t){t.target.composing||(e.signupPhone=t.target.value)}}}),e._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:!e.captchaSent,expression:"!captchaSent"}],staticClass:"get-captcha",on:{click:function(t){e.getCaptcha("register")}}},[e._v("获取验证码")]),e._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:e.captchaSent,expression:"captchaSent"}],staticClass:"get-captcha"},[e._v(e._s(e.curCaptchaCool)+"s后重发")])]),e._v(" "),i("div",{staticClass:"login-input li-captcha"},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.captcha,expression:"captcha"}],attrs:{type:"text","date-valid":"none",placeholder:"短信中的验证码"},domProps:{value:e.captcha},on:{input:function(t){t.target.composing||(e.captcha=t.target.value)}}})]),e._v(" "),i("div",{staticClass:"login-input li-invite"},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.supInviteCode,expression:"supInviteCode"}],attrs:{type:"text","date-valid":"none",placeholder:"邀请码(非必填)"},domProps:{value:e.supInviteCode},on:{input:function(t){t.target.composing||(e.supInviteCode=t.target.value)}}})]),e._v(" "),i("div",{staticClass:"login-input li-pass"},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.signupPassword,expression:"signupPassword"}],attrs:{type:"password",id:"password","date-valid":"none",placeholder:"密码(6-16位字母或数字)"},domProps:{value:e.signupPassword},on:{input:function(t){t.target.composing||(e.signupPassword=t.target.value)}}})]),e._v(" "),i("button",{staticClass:"login-submit",attrs:{type:"submit"},on:{click:function(t){return t.preventDefault(),e.signup(t)}}},[e._v("请绑定用户信息")])])])])],1)])},staticRenderFns:[]}},81:function(e,t,i){i(!function(){var e=new Error('Cannot find module "!!../../../node_modules/extract-text-webpack-plugin/loader.js?{"omit":1,"remove":true}!vue-style-loader!css-loader?{"minimize":true,"sourceMap":true}!../../../node_modules/vue-loader/lib/style-rewriter?id=data-v-e3de25da&scoped=true!sass-loader?{"sourceMap":true}!../../../node_modules/vue-loader/lib/selector?type=styles&index=0!./Login.vue"');throw e.code="MODULE_NOT_FOUND",e}());var s=i(6)(i(142),i(206),"data-v-e3de25da",null);e.exports=s.exports}});