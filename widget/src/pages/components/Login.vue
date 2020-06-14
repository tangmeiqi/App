<template>
  <transition name="slide-up">
    <div class="login">
      <div id="header">
        <div
          id="back"
          @click="back"
        >
          <!--此处插入APP图标或者名字-->
          <div id="app-name">省省帮</div>
        </div>
      </div>

      <!-- 登录页面 -->
      <transition name="slide-fade">
        <div
          class="main"
          v-show="show === 0"
        >
          <form class="login-wrapper">
            <div class="login-input li-phone">
              <input
                type="text"
                data-valid="none"
                placeholder="请输入手机号"
                v-model="signinPhone"
              />
            </div>
            
            <div class="login-input li-pass">
              <input
                type="password"
                date-valid="none"
                placeholder="请输入密码"
                v-model="signinPassword"
              />
              <div class="forget-password"></div>
            </div>
            <button
              class="login-submit"
              type="submit"
              @click.prevent="signin"
            >登&nbsp;&nbsp;录</button>
          </form>
          <div class="register">
            <div
              class="re-1"
              @click="show = 1"
            >验证码登陆</div>
            <div
              class="re-2"
              @click="show = 2"
            >忘记密码？</div>
          </div>
          <div class="other">
            <div class="o-header">
              <hr />
              <span>首次请用微信授权并注册</span>
            </div>
            <div class="o-body">
              <div class="o-option">
                <div
                  class="o-icon oi-wx"
                  id="weixin"
                  @click="wxLogin"
                ></div>
                <span class="o-tag">微信</span>
              </div>
            </div>
             <!-- <span class="o-fei">非首次直接用密码/验证码登录</span>
             <div class="o-fei">勿用微信登录</div> -->
          </div>
        </div>
      </transition>
      <!-- 验证码登陆 -->
      <transition name="slide-fade">
        <div
          class="main"
          v-show="show === 1"
        >
          <form class="login-wrapper">
            <div class="login-input li-phone">
              <input
                type="text"
     
                data-valid="none"
                placeholder="请输入手机号"
                v-model="signupPhone"
              />
              <div
                class="get-captcha"
                v-show="!captchaSent"
                @click="getCaptcha('login')"
              >获取验证码</div>
              <div
                class="get-captcha"
                v-show="captchaSent"
              >{{curCaptchaCool}}s后重发</div>
            </div>
            <div class="login-input li-captcha">
              <input
                type="text"
                date-valid="none"
                placeholder="短信中的验证码"
                v-model="captcha"
              />
            </div>
            <button
              class="login-submit"
              type="submit"
              @click.prevent="phonesignin"
            >登&nbsp;&nbsp;录</button>
          </form>
          <div class="register">
            <div
              class="re-1"
              @click="show = 0"
            >密码登陆</div>
          </div>

        </div>
        <!-- 忘记密码 -->
      </transition>
      <transition name="slide-fade">
        <div
          class="main"
          v-show="show === 2"
        >
          <form class="login-wrapper">
            <div class="login-input li-phone">
              <input
                type="text"
                data-valid="none"
                placeholder="请输入手机号"
                v-model="signupPhone"
              />
              <div
                class="get-captcha"
                v-show="!captchaSent"
                @click="getCaptcha('reset')"
              >获取验证码</div>
              <div
                class="get-captcha"
                v-show="captchaSent"
              >{{curCaptchaCool}}s后重发</div>
            </div>
            <div class="login-input li-captcha">
              <input
                date-valid="none"
                placeholder="请输入短信中的验证码"
                v-model="captcha"
              />
            </div>
            <div class="login-input li-pass">
              <input
                type="password"
                date-valid="none"
                placeholder="请输入新密码(6-16位字母或数字)"
                v-model="signupPassword"
              />
            </div>
            <button
              class="login-submit"
              type="submit"
              @click.prevent="reset"
            >设置新密码</button>
          </form>
          <div class="register">
            <div
              class="re-1"
              @click="show = 0"
            >返回登录界面</div>
          </div>
        </div>
      </transition>
      <!-- 注册页面 -->
      <transition name="slide-fade">
        <div
          class="main"
          v-show="show === 3"
        >
          <form
            class="login-wrapper"
            id="register"
          >
            <div class="login-input li-phone">
              <input
                type="text"
  
                data-valid="none"
                placeholder="手机号"
                v-model="signupPhone"
              />
              <div
                class="get-captcha"
                v-show="!captchaSent"
                @click="getCaptcha('register')"
              >获取验证码</div>
              <div
                class="get-captcha"
                v-show="captchaSent"
              >{{curCaptchaCool}}s后重发</div>
            </div>
            <div class="login-input li-captcha">
              <input
                type="text"
                date-valid="none"
                placeholder="短信中的验证码"
                v-model="captcha"
              />
            </div>
            <div class="login-input li-invite">
              <input
                type="text"
                date-valid="none"
                placeholder="邀请码(非必填)"
                v-model="supInviteCode"
              />
            </div>
            <!-- <div class="login-input li-user">
              <input
                type="text"
                id="userName"
                data-valid="none"
                placeholder="用户名(3-16位字母/数字/汉字/_)"
                v-model="signupName"
              />
            </div> -->
            <div class="login-input li-pass">
              <input
                type="password"
                id="password"
                date-valid="none"
                placeholder="密码(6-16位字母或数字)"
                v-model="signupPassword"
              />
            </div>
            <button
              class="login-submit"
              type="submit"
              @click.prevent="signup"
            >请绑定用户信息</button>
          </form>
          <!-- <div class="register">
            <div
              class="re-1"
              @click="show = 0"
            >已注册？前往登录</div>
          </div> -->
        </div>
      </transition>
      <!-- 绑定手机号 -->
      <!-- <transition name="slide-fade">
        <div
          class="main"
          v-show="show === 4"
        >
          <form class="login-wrapper">
            <div class="login-input li-phone">
              <input
                type="text"
                id="phoneNum"
                data-valid="none"
                placeholder="请输入手机号"
                v-model="signupPhone"
              />
              <div
                class="get-captcha"
                v-show="!captchaSent"
                @click="getCaptcha('register')"
              >获取验证码</div>
              <div
                class="get-captcha"
                v-show="captchaSent"
              >{{curCaptchaCool}}s后重发</div>
            </div>
            <div class="login-input li-captcha">
              <input
                type="text"
                date-valid="none"
                placeholder="短信中的验证码"
                v-model="captcha"
              />
            </div>
            <button
              class="login-submit"
              type="submit"
              @click.prevent="signin"
            >绑定手机号</button>
          </form>
        </div>
      </transition> -->
    </div>
  </transition>
</template>

<script>
export default {
  name: "login",
  props: [""],
  components: {},
  data() {
    return {
      // id:'',
      weixin: '',
      show: 0,
      keyWord: "register",
      captchaSent: false,
      getCaptchaCool: 60,
      curCaptchaCool: 0,
      signinPhone: "",
      signinPassword: "",
      signupPhone: "",
      captcha: "",
      supInviteCode: "",
      // signupName: "",
      signupPassword: "",
      signupRePassword: "",
      submitDisabled: false,
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.initShow();
    });
  },
  methods: {
    initShow() {
      this.show = 0
    },
    wxLogin() {
      window.wx = api.require("wx");
      wx.auth(
        {
          apiKey: "wxb531b503239f2ee0"
        },
        (ret, err)=> {
          if (ret.status) {
            wx.getToken(
              {
                apiKey: "wxb531b503239f2ee0",
                apiSecret: "22a45313acaa6827d8746715f3280d04",
                code: `${ret.code}`
              },
              (ret, err)=> {
                if (ret.status) {
                  wx.getUserInfo(
                    {
                      accessToken: `${ret.accessToken}`,
                      openId: `${ret.openId}`
                    },
                    (ret, err) => {
                      // alert(ret.unionid)
                      // alert(ret)
                      // document.cookie = ''
                      // document.cookie ='JSESSIONID = null'
                      if (ret.status) {
                      this.weixin = ret.unionid
                      fetch("http://47.97.153.221:8080/app/user/login", {
                        method: "POST",
                        headers: { "Content-Type": "application/x-www-form-urlencoded" },
                        credentials: "include",
                        body:
                          "weixin="+this.weixin
                      })
                        .then(response => {
                          if (response.ok) {
                            // alert(response.headers)
                            return response.json();
                          }
                        })
                        .then(json => {
                          //alert(JSON.stringify(json))
                          if (json.userId) {
                             // alert('第二次登录');
                              // window.id = this.getSessionId()
                              // alert(this.getSessionId())
                              localStorage.userInfo = JSON.stringify(json);
                              // alert(localStorage.userInfo.userId)
                              let objUser = JSON.parse(localStorage.userInfo);
                              this.$root.eventHub.$emit("pushToProfile", objUser.userId);
                             // alert(localStorage.userInfo) 
                            // alert(localStorage)
                            // let objUser = JSON.parse(localStorage.userInfo);                                             
                            // this.$root.eventHub.$emit("pushToProfile", objUser.userId);
                          } else if (json.status === 1) {                                 
                            // alert('第一次进来')                     
                              this.show = 3                              
                          }else if (json.message) {
                            this.$root.eventHub.$emit("showNotification", json.message);
                          }
                        });
                      }else {
                        // alert(err.code);                       
                      }
                    }
                  );
                } else {
                  // alert(err.code);
                }
              }
            );
           
          } else {
            if(err.code===3){
              alert('当前设备未安装微信客户端')
            }else{
              // alert(err.code);
            }
            
          }
        }
      );
      
      
        // } 
    },
    getSessionId(){  
            var c_name = 'SSBSESSIONID';  
            if(document.cookie.length>0){  
             var  c_start=document.cookie.indexOf(c_name + "=")  
               if(c_start!=-1){   
                 c_start=c_start + c_name.length+1   
                var c_end=document.cookie.indexOf(";",c_start)  
                 if(c_end==-1) c_end=document.cookie.length  
                 return unescape(document.cookie.substring(c_start,c_end));  
               }  
            }  
        },  
    back: function() {
      window.history.back(-1);
      this.show = 0;
    },
    clearLogin: function() {
      this.signinPhone = "";
      this.signinPassword = "";
      this.signupPhone = "";
      // this.signupName = "";
      this.captcha = "";
      this.signupPassword = "";
      this.signupRePassword = "";
    },
    // 点击获取验证码
    getCaptcha: function(keyWord) {
      //验证手机号格式是否正确
      let reg = /^1\d{10}$/;
      if (reg.test(this.signupPhone)) {
        //手机号格式正确将手机号发送给后台用于获取验证码
        fetch("http://47.97.153.221:8080/app/getCode", {
          method: "post",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          credentials: "include",
          body: "phoneNum=" + this.signupPhone + "&keyWord=" + keyWord
        })
          .then(response => {
            if (response.ok) {
              return response.json();
            }
          })
          .then(json => {
            if (json.message) {
              this.$root.eventHub.$emit("showNotification", json.message);
            }
          });
        //触发验证码发送倒计时
        //验证码发送
        //验证码时间
        this.captchaSent = true;
        this.curCaptchaCool = this.getCaptchaCool;
        let i = setInterval(() => {
          this.curCaptchaCool -= 1;
          if (this.curCaptchaCool === 0) {
            clearInterval(i);
            this.captchaSent = false;
          }
        }, 1000);
      } else {
        this.$root.eventHub.$emit("showNotification", "手机号格式错误");
      }
    },
    signup: function() {
      if (
        this.signupPhone != "" &&
        this.captcha != "" &&
        // this.signupName != "" &&
        this.signupPassword != ""
      ) {
        let phoneReg = /^1\d{10}$/;
        //邀请码
        //\u4e00-\u9fa5匹配所有中文
        let nameReg = /^[0-9a-zA-Z\u4e00-\u9fa5_]{3,16}$/;
        let nameNumReg = /^[0-9]{3,16}$/;
        let pwdReg = /^[0-9a-zA-Z]{6,16}$/;
        if (!phoneReg.test(this.signupPhone)) {
          this.$root.eventHub.$emit("showNotification", "手机号格式错误");
        // } else if (!nameReg.test(this.signupName)) {
        //   this.$root.eventHub.$emit("showNotification", "用户名格式错误");
        // } else if (nameNumReg.test(this.signupName)) {
        //   this.$root.eventHub.$emit("showNotification", "用户名不可全为数字");
        } else if (!pwdReg.test(this.signupPassword)) {
          this.$root.eventHub.$emit("showNotification", "密码格式错误");
        } else {
          //禁止提交表单成立立即返回
          if (this.submitDisabled) return;
          //禁止提交表单
          this.submitDisabled = true;
          //三秒之后可在提交表单
          setTimeout(() => {
            this.submitDisabled = false;
          }, 3000);
          fetch("http://47.97.153.221:8080/app/user/register", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            credentials: "include",
            body:
              "phoneNum=" +
              this.signupPhone +
              "&rCode=" +
              this.captcha +
              "&supInviteCode=" +
              this.supInviteCode +
              "&weixin=" +
              this.weixin +
              "&password=" +
              this.signupPassword
          })
            .then(response => {
              if (response.ok) {
                return response.json();
              }
            })
            .then(json => {
              //this.clearLogin();
              if (json.status) {
                //localStorage.userInfo = JSON.stringify(json)
                //;
                //传递红包信息到app，挂载的时候监听
                // this.$root.eventHub.$emit("showPacket", json.registerMoney);
                this.$root.eventHub.$emit('showNotification', '注册成功')
                // localStorage.userInfo = JSON.stringify(json);
                // let objUser = JSON.parse(localStorage.userInfo);
                // this.$root.eventHub.$emit("pushToProfile", objUser.userId);
                localStorage.userInfo = JSON.stringify(json);
                let objUser = JSON.parse(localStorage.userInfo);
                // alert(localStorage.userInfo)
              //  if(objUer.unionid === json.weixin){
                this.$root.eventHub.$emit("pushToProfile", objUser.userId);
                this.show = 0;
                //this.$root.eventHub.$emit('pushToLogin')
              } else if (json.message) {
                this.$root.eventHub.$emit("showNotification", json.message);
              }
            })
            .catch(error => {
              console.error(error);
            });
        }
      } else {
        this.$root.eventHub.$emit("showNotification", "必填内容不能为空");
      }
    },
    signin: function() {
      if (this.signinPhone != "" && this.signinPassword != "") {
        if (this.submitDisabled) return;
        this.submitDisabled = true;
        setTimeout(() => {
          this.submitDisabled = false;
        }, 3000);
        fetch("http://47.97.153.221:8080/app/user/login", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          credentials: "include",
          body:
            "phoneNum=" + this.signinPhone + "&password=" + this.signinPassword
        })
          .then(response => {
            if (response.ok) {
              return response.json();
            }
          })
          .then(json => {
            if (json.status === 1) {       
              // let objUser = JSON.parse(localStorage.userInfo);
                localStorage.userInfo = JSON.stringify(json);
                let objUser = JSON.parse(localStorage.userInfo);
                // alert(localStorage.userInfo)
              //  if(objUer.unionid === json.weixin){
                this.$root.eventHub.$emit("pushToProfile", objUser.userId);
              //  }else {
                //  this.$root.eventHub.$emit("showNotification", '请用与微信绑定的手机号和密码登录');
              //  }
              // this.$root.eventHub.$emit("pushToProfile", json.weixin);
              this.clearLogin();
            } else if (json.message) {
              this.$root.eventHub.$emit("showNotification", json.message);
            }
          });
      } else {
        this.$root.eventHub.$emit("showNotification", "内容不能为空");
      }
    },
    phonesignin: function() {
      if (this.signupPhone != "" && this.captcha != "") {
        if (this.submitDisabled) return;
        this.submitDisabled = true;
        setTimeout(() => {
          this.submitDisabled = false;
        }, 3000);
  
        fetch("http://47.97.153.221:8080//app/phoneLogin", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          credentials: "include",
          body: "phoneNum=" + this.signupPhone + "&code=" + this.captcha
        })
          .then(response => {
            if (response.ok) {
              return response.json();
            }
          })
          .then(json => {
            if (json.status === 1) {
              //  let objUser = JSON.parse(localStorage.userInfo);
                localStorage.userInfo = JSON.stringify(json);
                let objUser = JSON.parse(localStorage.userInfo);
              //  if(objUer.unionid === json.weixin){
                this.$root.eventHub.$emit("pushToProfile", objUser.userId);
              //  } else{
                //  this.$root.eventHub.$emit("showNotification", '请用与微信绑定的手机号登录');
              //  }
              // this.$root.eventHub.$emit("pushToProfile", json.weixin)
              //清空表单数据
              this.clearLogin();
            } else if (json.message) {
              this.$root.eventHub.$emit("showNotification", json.message);
            }
          });
      } else {
        this.$root.eventHub.$emit("showNotification", "内容不能为空");
      }
    },
    reset: function() {
      //表单内容不空
      if (
        this.signupPhone != "" &&
        this.captcha != "" &&
        this.signupPassword != ""
      ) {
        //if(this.signupRePassword===this.signupPassword){
        if (this.submitDisabled) return;
        this.submitDisabled = true;
        setTimeout(() => {
          this.submitDisabled = false;
        }, 3000);
        fetch("http://47.97.153.221:8080/app/resetPassword", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          credentials: "include",
          body:
            "phoneNum=" +
            this.signupPhone +
            "&code=" +
            this.captcha +
            "&newPassword=" +
            this.signupPassword
        })
          .then(response => {
            if (response.ok) {
              return response.json();
            }
          })
          .then(json => {
            if (json.status == 1) {
              this.$root.eventHub.$emit("showNotification", "重置成功");
              this.show = 0;
            } else if (json.message) {
              this.$root.eventHub.$emit("showNotification", json.message);
            }
          });
      } else {
        this.$root.eventHub.$emit("showNotification", "内容不能为空");
      }
    }
    
  },
  
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.o-fei {
  color:#fb5876;
}
.icon {
  margin: 0 auto;
  width: 2rem;
  height: 2rem;
  background-repeat: no-repeat;
  background-size: cover;
}
.wx {
  background-image: url(./assets/wx.png);
}
a {
  color: #fb5876;
  text-decoration: none;
}
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.2s;
}
.slide-up-enter,
.slide-up-leave-to {
  transform: translateY(100%);
}

.login {
  position: absolute;
  bottom: 0;
  left: 0;
  top: 0;
  right: 0;
  background-color: white;
  z-index: 1;
  //height:100%;
  overflow: scroll;
}

#header {
  height: 8rem;
  background-color: #fa5876;

  #back {
    position: absolute;
    width: 1.5rem;
    height: 1.5rem;
    left: 1rem;
    top: 1.75rem;
    z-index: 1;
    background-image: url(./assets/close3.png);
    background-size: contain;
    background-repeat: no-repeat;

    #app-name {
      position: absolute;
      left: -1rem;
      top: 1.5rem;
      width: 100vw;
      font-size: 2rem;
      color: #fff;
    }
  }
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.4s ease;
}
.slide-fade-enter {
  transform: translateX(100%);
}
.slide-fade-leave-to {
  transform: translateX(-100%);
}

.main {
  position: absolute;
  width: 100%;
}

.login-wrapper {
  margin: 0 1rem;
  border-color: #e5eae4;
  text-align: center;

  .login-input {
    position: relative;
    margin-top: 1rem;
    height: 2.5rem;
    border-bottom: 1px solid #eee;
    padding-left: 2.5rem;
    text-align: left;

    &:before {
      content: "";
      position: absolute;
      top: 0.625rem;
      left: 0.625rem;
      width: 1.25rem;
      height: 1.25rem;
      background-repeat: no-repeat;
      background-size: cover;
    }

    & > input {
      height: 2.5rem;
      padding: 0;
      border: 0;
      font-size: 1rem;
      outline: none;
    }

    .get-captcha {
      position: absolute;
      right: 0;
      bottom: 0;
      line-height: 2.5rem;
      font-size: 0.875rem;
      color: #8e8e8e;
    }
  }
  .li-user > input {
    display: inline-block;
    width: 83vw;
  }
  .li-pass > input {
    display: inline-block;
    width: 83vw;
  }
  .li-user:before {
    background-image: url(./assets/user.png);
  }

  .li-phone:before {
    background-image: url(./assets/phone.png);
  }

  .li-pass:before {
    background-image: url(./assets/pass.png);
  }
  .li-captcha:before {
    background-image: url(./assets/captcha.png);
  }
  .li-invite:before {
    background-image: url(./assets/invite.png);
  }

  .login-submit {
    margin-top: 1rem;
    width: 80%;
    height: 2rem;
    background-color: #fa5875;
    color: white;
    border-radius: 1rem;
    outline: none;
    border: none;
    font-size: 1rem;
  }
}

.register {
  margin: 2rem auto 0 auto;
  width: 80%;
  font-size: 0.875rem;
  color: #fb5876;
  height: 1rem;

  .re-1,
  .re-2 {
    height: 1rem;
  }

  .re-1 {
    float: left;
  }
  .re-2 {
    float: right;
  }
}

.other {
  margin-top: 4rem;
  font-size: 0.875rem;

  .o-header {
    position: relative;
    margin: 0 auto;
    width: 80%;
    height: 1rem;

    & > hr {
      position: absolute;
      margin: 7.5px 0;
      top: 0;
      left: 0;
      width: 100%;
      height: 1px;
      border: 0;
      background-color: #fb5876;
    }

    & > span {
      position: relative;
      display: inline-block;
      width: 6rem;
      line-height: 1rem;
      font-size: 0.875rem;
      color: #fb5876;
      background-color: white;
      z-index: 1;
    }
  }

  .o-body {
    margin: 1rem auto 0 auto;
    width: 80%;
    display: flex;
    flex-flow: row;
    justify-content: center;

    .o-option {
      display: inline-block;
      // text-align: center;
      width: 33.3%;

      .o-icon {
        margin: 0 auto 0.5rem auto;
        width: 2.5rem;
        height: 2.5rem;
        background-repeat: no-repeat;
        background-size: cover;
      }

      .oi-qq {
        background-image: url(./assets/QQ.png);
      }

      .oi-wx {
        background-image: url(./assets/wx.png);
      }

      .oi-wb {
        background-image: url(./assets/wb.png);
      }

      .o-tag {
        font-size: 0.75rem;
        color: #fa5876;
      }
    }
  }
}
</style>
