<template>
  <div class="profile">
    <div class="user_center">
      <span
        id="user"
        @click="updateUserStatus"
      >个人中心</span>
    </div>

    <!--登陆栏-->
    <div class="login">
      <div class="user_head">
        <div
          id="img"
          :style="{backgroundImage:'url('+avatar+')'}"
        ></div>
      </div>
      <div
        class="login_box"
        v-show="!user.loginOk"
      >
        <div
          class="login_prompt1"
          @click="linkTo('lo')"
        >登录 / 注册</div>
        <div class="login_prompt2">点击登陆享受更多优惠！</div>
      </div>
      <div
        class="login_box"
        v-show="user.loginOk"
      >
        <!-- <span class="user_name">ID:{{user.userName}}</span> -->
        <span class="user_level">{{level}}</span>
        <div class="container">
          <div class="invite_code">
            <span></span>邀请码:&nbsp;<input
              class="inviteCode"
              type="text"
              v-model="inviteCode"
              readonly
            >
            <button
              type="button"
              v-clipboard:copy="inviteCode"
              v-clipboard:success="onCopy"
              v-clipboard:error="onError"
            >复制</button>
          </div>
        </div>
      </div>
    </div>

    <div class="checkInIntegral">
      
      <p><span></span></p>
      <div class="checkInIntegralContent">
        <!-- <div class="integral">累计积分：{{user.integral}}</div>
        <button
          class="checkin"
          @click="checkIn"
          :disabled="flag==true"
          :class="{checkout:flag === true}"
        >签到</button> -->
      <!-- <div class="money"> -->
        <div class="balance">
          <span  v-show="user.loginOk">余额  ￥{{nowMoney}}</span>
          <span  v-show="!user.loginOk">余额  ￥0</span>
          <small>每月20号可提现上月结算收益 &nbsp;&gt;</small>
          <button  @click="linkTo('pp')">立即提现</button>
        </div>
        <div class="income">
          
        </div> 
      </div>
      <!-- </div> -->
    </div>
    <!--记录栏-->
    <div class="record">
      <!-- row行 -->
      <div class="row">
        <!-- col列 -->
        <div class="col">
          <div
            id="title1"
            @click="linkTo('brr')"
          >浏览记录</div>
        </div>
        <div class="col">
          <div
            id="title2"
            @click="linkTo('mr')"
          >收藏记录</div>
        </div>
      </div>
    </div>

    <div class="scrollbar">
      <!--几个选项-->
      <div class="mainitem">
        
        <div
          class="item"
          @click="linkTo('ic')"
        >
        <svg class="icon" aria-hidden="true" style="fill: gold;">
          <use xlink:href="#icon-shouyi"></use>
        </svg>
        <span class="text">收益</span> </div>
        <div
          class="item"
          @click="linkTo('om')"
        >
        <svg class="icon" aria-hidden="true" style="fill: pink;">
          <use xlink:href="#icon-order_icon"></use>
        </svg>
        <span class="text">订单</span></div>
        <div
          class="item"
          @click="linkTo('tui')"
        >
        <svg class="icon" aria-hidden="true" style="fill: blue;">
          <use xlink:href="#icon-fensi"></use>
        </svg>
        <span class="text">粉丝</span></div>
        <div
          class="item"
          @click="linkTo('in')"
        >
        <svg class="icon" aria-hidden="true" style="fill: #fd8298;">
          <use xlink:href="#icon-yaoqing"></use>
        </svg>
        <span class="text">邀请</span></div>
      </div>
      <div class="useritem">

        
        <div
          class="item"
          @click="linkTo('pp')"
        ><span class="text">奖金管理</span> </div>
        
        <!-- <div
          class="item order"
          @click="linkTo('bur')"
        ><span class="text order">提交订单<small>（购买淘宝首单后，请提交订单）</small></span></div> -->
        <!-- <div
          class="item order"
          @click="linkTo('ug')"
        ><span class="text order">用户指南</span></div> -->
        <div
          class="item order"
          @click="linkTo('cs')"
        ><span class="text order">联系客服</span></div>
        <div
          class="item order"
          @click="linkTo('vi')"
        ><span class="text order">版本信息</span></div>
        <!-- <div class="item" @click="linkTo('pr')"><span class="text">支付管理</span></div> -->
        <!-- <div class="item" @click="linkTo('md')"><span class="text">个人资料</span></div> -->
        <div class="item"><span class="text">敬请期待</span></div>
      </div>
      <div class="part">
        <div
          clas="signout"
          :class="{disabled:!user.loginOk}"
          @click="signout"
        >退出当前账号</div>
      </div>
    </div>
  </div>
</template>

<script>
// import Setting from './Setting'

export default {
  name: "profile",
  data() {
    return {
      message: "Copy These Text",
      inviteCode: "",
      avatar: require("./assets/images.jpg"),
      //  用户信息用对象
      user: {
        loginOk: false,
        userId: "",
        userName: "",
        integral: 0,
        userlevel: 0
      },
      flag: true,
      // 订单积分
      orderPoint: 0,
      // 积分率
      pointRate: 0,
      // 贡献积分
      contributePoint: 0,
      // 贡献金钱
      contributeMoney: 0,
      //currentTab: 1,
      nowMoney: 0,
    };
  },
  computed: {
    level() {
      switch (this.user.userlevel) {
        case 0:
          return 0;
          break;
        case 1:
          return "普通会员";
          break;
        case 2:
          return "超级会员";
          break;
        case 8:
          return "运营商";
          break;
      }
    }
  },
  methods: {
    onCopy: function(e) {
      this.$root.eventHub.$emit("showNotification", "已复制，快邀请徒弟吧");
    },
    onError: function(e) {
      this.$root.eventHub.$emit("showNotification", "复制出错");
    },
    //用户签到
    checkIn() {
      //this.user.integral +=1
      //this.flag = true;
       let objUser = localStorage.userInfo?JSON.parse(localStorage.userInfo):"{}";
      this.user.userId = objUser.userId;
      fetch("http://47.97.153.221:8080/app/user/dailySignIn", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        credentials: "include", //带上使fetch带cookie(包含凭证)
        body: "&userId=" + this.user.userId+"&signToken=" + objUser.signToken
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          }
        })
        .then(json => {
          if ((json.status = 1)) {
            this.flag = true; //签到按钮不可用
            this.user.integral = json.userPoint; //获取用户积分
          } else if (json.message) {
            this.$root.eventHub.$emit("showNotification", "签到失败");
            this.flag = false; //签到按钮可用
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    fetchData: function() {
      fetch("http://47.97.153.221:8080/app/getAppSetting", {
        method: "GET",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        credentials: "include"
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          }
        })
        .then(json => {
          this.orderPoint = json.orderPoint; // 订单积分
          this.pointRate = json.pointRate; // 积分率
          this.contributePoint = json.contributePoint; // 贡献积分
          this.contributeMoney = json.contributeMoney; // 贡献金钱
        })
        .catch(err => {
          console.log(err);
        });
    },
    fetchMoneyData: function () {
        if (
        localStorage.userInfo !== undefined &&
        localStorage.userInfo !== null
      ) {
         let objUser = JSON.parse(localStorage.userInfo)
         // this.user.userName=objUser.weixin;
        this.user.userId=objUser.userId;
        this.user.userName =objUser.userId;
        fetch("http://47.97.153.221:8080/app/user/pointManager",{
            method:"POST",
            headers:{'Content-Type':'application/x-www-form-urlencoded'},
            credentials: 'include',
            body:"userId="+objUser.userId
        }).then((response) => {
            if (response.ok) {
            return response.json()
            }
        }).then((json) => {
            this.nowMoney=json.userMoneyAmount.toFixed(2);
        }).catch(err=>{
            console.log(err)
        })
      }
    },
    //每次进入跟新用户信息
    updateUserStatus: function() {
      //alert('进入profile')
      //alert(localStorage.userInfo)
      if (
        localStorage.userInfo !== undefined &&
        localStorage.userInfo !== null
      ) {
        //alert('进入里面')
        //let objUser = this.$route.query.userName;
        // 字符串变对象
         let objUser = JSON.parse(localStorage.userInfo)
        this.user.loginOk = true;
        this.user.userName = objUser.userId;
        // this.avatar = objUser.headimgurl
        this.user.userlevel = objUser.vipgrade;
        this.inviteCode = objUser.inviteCode;
        // alert(this.user.loginOk)
        // this.user.userName =objUser.weixin;
        // this.user.userId=objUser.userId;
        //判断签到按钮是否可用
        //  alert('進入')
        // document.cookie = `SSBSESSIONID=${window.id}`
        // debugger
        fetch("http://47.97.153.221:8080/app/user/judgeSigned", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          //可以使fetch 带上cookie
          credentials: "include",
          body: "&userId=" + objUser.userId
        })
          .then(response => {
            // if(response.status==0){
            //   this.user.loginOk=false;
            // }
            // 这里是干啥？自己判断是否登陆？
            if(response.headers.get('isLogin')==1){
              // console.log(response.headers.get('set-cookie'))
                      if (response.ok) {
                        response.json().then((json) => {
                      // 获取用户积分
                      this.user.integral = json.userPoint;
                      if (json.status == 0) {
                        this.flag = false; //签到按钮可用
                      } else {
                        this.flag = true; //签到按钮不可用
                      }
                    })
                    .catch(err => {
                      console.log(err);
                    });
                      }
            }else {
              delete localStorage.userInfo
              this.flag = true;
              this.user.loginOk = false;
            }
                    })
                    
          // }
      } else {
       // alert('没进入里面')
        // 用户不存在，禁用，loginOk为false
        this.flag = true;
        this.user.loginOk = false;
        // this.user.avatar = require('./assets/images.jpg')
      }
    },
    linkTo: function(tar) {
      let eh = this.$root.eventHub;
      // 如果未登录或者设置页面，跳到登陆页
      if (!this.user.loginOk && tar !== "st") {
        eh.$emit("pushToLogin");
        return;
      }
      switch (tar) {
        case "brr":
          eh.$emit("pushToBrowseRecords");
          break;
        case "st":
          eh.$emit("pushToSetting");
          break;
        case "lo":
          eh.$emit("pushToLogin");
          break;
        case "pp":
          eh.$emit("pushToPointPage", this.pointRate);
          break;
        case "ic":
          eh.$emit("pushToIncome");
          break;
        case "pr":
          eh.$emit("pushToPayRecords");
          break;
        case "bur":
          eh.$emit("pushToBuyRecords", this.orderPoint);
          break;
        case "om":
          eh.$emit("pushToOrderMangement");
          break;
        case "mr":
          eh.$emit("pushToMarkRecords");
          break;
        case "md":
          eh.$emit("pushToMyData", this.user);
          break;
        case "tui":
          eh.$emit("pushToMyPrentice", this.contributeMoney);
          break;
        case "in":
          eh.$emit("pushToInvite");
          break;
        case "ug":
          eh.$emit("pushToUserGuide");
          break;
        case "cs":
          eh.$emit("pushToCustomService");
          break;
        case "vi":
          eh.$emit("pushToVersionInf");
          break;
      }
    },
    signout: function() {
       let userInfo = localStorage.userInfo?JSON.parse(localStorage.userInfo):"{}";
      if (this.user.loginOk) {
        let result = confirm("确定退出登录吗？");
        if (result) {
    
          this.user.loginOk = false;
          this.user.integral = 0
           this.flag = true
        
          fetch("http://47.97.153.221:8080/app/user/quit", {
            method: "POST",
            headers: {},
            credentials: "include",
            body: "&userId=" + userInfo.userId
          })
            .then(response => {
              if (response.ok) {
                return response.json();
              }
            }).then(json => {
              if(json.status ===1) {
              
                 delete localStorage.userInfo;
              }else{
                this.$root.eventHub.$emit("showNotification", json.message);
              }
            })
            .catch(err => {
              console.log(err);
            });
          //   .then((json)=>{
          //     ;
          //     if(json.status==1){
          //       this.user.loginOk=false;
          //       delete localStorage.userInfo;
          //       //this.flag=true;
          //     }
          //   })
          //  this.updateUserStatus();
        }
      }
    }
  },
  // watch: {
  //   //监听路由变化
  //   '$route': 'updateUserStatus'
  // },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.updateUserStatus();
      vm.fetchData();
      vm.fetchMoneyData()
    });
  },
  mounted() {
    // 这里加时为什么
    // this.updateUserStatus();
    //this.$root.eventHub.$on('closeSetting', this.closeSetting)
    // this.$root.eventHub.$on('updateUserInfo', this.updateUserStatus)
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.inviteCode {
  width: 50px !important;
  height: 1rem;
}
.checkInIntegral {
  background: #fff;
  margin-top: -21px;
  border-bottom: 1px solid #ddd;
}
.checkInIntegral > p {
  // border-bottom: 1px solid #ddd;
  // padding: 8px;
  margin-bottom: 0;
}
.checkInIntegral > p > span {
  margin-left: 20px;
}
.checkInIntegralContent {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 8px;
}
.checkin {
  background: #ffe76a;
  border: none;
  border-radius: 4px;
  padding: 4px 16px;
}
.checkout {
  background-color: #ccc !important;
}
/* 之前 */
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}
a {
  color: #42b983;
}

.profile {
  height: 100%;
  height: 100%;
  text-align: left;
  background-color: #f8f8f8;
  font-size: 1rem;
}

.slide-left-enter-active,
.slide-left-leave-active {
  transition: transform 0.2s ease;
}
.slide-left-enter,
.slide-left-leave-to {
  transform: translateX(100%);
}

.user_center {
  position: relative;
  background-color: #fa5876;
  height: 110px;
  line-height: 130px;
}
#user {
  position: absolute;
  display: block;
  width: 100%;
  //line-height: 3rem;
  font-size: 1.2rem;
  color: #ffffff;
  text-align: center;
}
.setting-entry {
  $height: 3rem;
  $width: 1.5rem;
  position: absolute;
  top: ($height - $width) / 2;
  right: ($height - $width) / 2;
  width: $width;
  height: $width;
  background-image: url(./assets/setting.png);
  background-repeat: no-repeat;
  background-size: contain;
}

/*登陆栏*/
.login {
  position: relative;
  background-color: white;
  height: 50px;
  // border-bottom:1px solid #ddd;
}

.user_head {
  position: absolute;
  left: 10px;
  top: -35px;
  width: 70px;
  height: 70px;
  padding: 2px;
  background: #fff;
  border-radius: 50%;

  #img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-size: cover;
    background-repeat: no-repeat;
  }
}

.login_box {
  margin-left: 100px;

  .login_prompt1 {
    padding-top: 5px;
  }

  .login_prompt2 {
    margin-top: 5px;
    color: #0088cc;
    font-size: 12px;
  }

  .user_name {
    padding-top: 5px;
    font-size: 1.1rem;
  }
  .user_level {
    margin-top: 3px;
    position: relative;
    padding-left: 1.5rem;
    padding-right: 4px;
    line-height: 1rem;
    font-size: 0.875rem;
    // min-width: 1rem;
    // max-width: 5em;
    background-color: #fd8298;
    border-radius: 0.5rem;
    color: white;

    &:before {
      content: "";
      position: absolute;
      top: 2px;
      left: 8px;
      width: 0.75rem;
      height: 0.75rem;
      background-image: url(./assets/lv.png);
      background-repeat: no-repeat;
      background-size: contain;
    }
  }
}

.scrollbar {
  position: absolute;
  width: 100%;
  overflow-y: scroll;
  // 会有消失的bug
  // -webkit-overflow-scrolling: touch;
  top: calc(233px + 3.5rem);
  bottom: 3rem;
  background-color: white;
}

/*记录信息*/
.row {
  display: -webkit-box;
  display: -webkit-flex;
  height: 3rem;
  background-color: white;
}
.col,
.tab-but {
  position: relative;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  text-align: center;

  &:after {
    content: "";
    position: absolute;
    top: 1rem;
    right: 0;
    width: 1px;
    height: 1rem;
    background-color: #eee;
  }
}

.active {
  color: #42b983;
}

#title1,
#title2,
#title3,
.title {
  margin-top: 14px;
}

/*各种选项*/
// .useritem {
//     background-color: white;
// }
.icon{
  width: 1.5em; height: 1.5em;
  box-shadow: 10px;
   text-shadow:10px;
}
.mainitem {
  display: flex;
  border:1px solid #ddd;
  border-radius:5px;
  box-shadow: 2px 10px 0px 0px rgba(0, 0, 255, .2);
  // padding:10px;
  margin: 10px;
  div{
    flex-grow: 1;
    padding:  10px 15px 10px 15px;
    text-align:center;
    span{
      display: block;
      margin-top: 5px;
    }
    .text {
      line-height: 1;
    }
  }
}
.checkInIntegralContent{
  border:1px solid #ddd;
  border-radius:5px;
  margin: 0px 15px 10px 15px;
  background: #333333;
  position:relative;
  .balance {
    color:#F9EDD7;
    span{
      display: block;
    }
    small {
      color:#A7A7A7;
    }
    button{
      position:absolute;
      right: 5px;
      top:20%;
      border: none;
      outline:none;
      border-radius: 5px;
      background: #FEE3B1;
      padding: 7px 10px 7px 10px;
    }
  }
}
.useritem div {
  height: 2.75rem;
  padding-left: 15px;
  border-bottom: 1px solid #f4f4f4;
}
.useritem > .order {
  // border: 1px solid red;
  small {
    color: #fa5876;
  }
}
.useritem div:last-child {
  border: none;
}
.text {
  line-height: 50px;
  height: 100%;
}
.message-box {
  margin-top: 0.5rem;
}
.message {
  position: relative;
  background-color: white;
  padding: 0 1rem;
  height: 3rem;
  overflow: hidden;

  .tab {
    position: absolute;
    height: 100%;
  }

  .slide-up-enter-active,
  .slide-up-leave-active {
    transition: transform 0.3s;
  }

  .slide-up-leave-to {
    transform: translateY(-100%);
  }

  .slide-up-enter {
    transform: translateY(-100%);
  }
}

.part {
  height: 3rem;
  text-align: center;
  line-height: 3rem;
  border-top: 1px solid #f4f4f4;
  //border-bottom:1px solid #ddd;
  color: #fd8298;
  //background-color:#fff;
}
.disabled {
  color: #aaa;
  //backgroud-color
}
.invite_code {
  // margin-top:10px;
  // color: black;
  span {
    font-size: 1.2rem;
    // font-weight: bold;
  }

  input {
    //display:inline-block;
    border: 1px solid #ddd;
    padding: 3px;
    width: 6rem;
    font-size: 1rem;
    // font-weight: bold;
    outline: none;
  }
  button {
    margin-left: 5px;
    border: 1px solid #bbb;
    border-radius: 5px;
    font-size: 0.8rem;
    outline: none;
  }
}
</style>
