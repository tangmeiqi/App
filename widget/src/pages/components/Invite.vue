<template>
  <div class="prentice">
    <div id="top">
      <div
        id="back"
        @click="back"
      ></div>
      <div class="invite-wrapper">
        <div
          class="invite"
          :style="{width:inviteWidth}"
          :class="{active:current===index}"
          @click="invite(index)"
          v-for="(item,index) in fans"
          :key="index"
        >{{item.value}}</div>
        <!-- <div
          id="indicator"
          :style="{left:indicatorLeft,width:inviteWidth}"
        ></div> -->
      </div>

      <!-- <div class="mypre" :class="{active:current===1}" @click="invited">我的粉丝</div> -->

    </div>
    <!-- 增加了一个动画 -->
    <div
      id="content"
      :style="{width:contentWidth,transform:contentTransform}"
      :class="{trans:untouching}"
    >
      <!-- 在下面把宽度设为了50% -->
      <div
        id="inviting"
        class="pages"
      >
        <!-- <img src="./assets/share.png"/> -->
        <div
          class="spinner"
          v-show="!show"
        ></div>
        <img
          :src="b64"
          alt=""
          class="src"
          v-show="show"
        >
        <!-- <div class="invite_img"></div>
         <h3>一次邀请 永久分红</h3>
            <article>徒弟消费每一单,<br>师傅永久提成分红</article>
        <div class="invite_code">
                <qrcode id="canvas" value="https://www.baidu.com/" :options="{ size: 150 }"></qrcode><br>
                <span>我的邀请码：</span><input type="text" v-model="inviteCode" >
                <button v-clipboard:copy="inviteCode" v-clipboard:success="onCopy" v-clipboard:error="onError">复制</button>
            </div> -->
        <div class="share">
          <div class="share_list">
            <button
             
              class="share_text"
              @click="sharePoster"
            >分享该张海报</button>
            <button
              class="share_text"
              v-clipboard:copy="text"
              v-clipboard:success="onCopy"
              v-clipboard:error="onError"
            >复制邀请口令</button>
            <!-- <button @click="changeImg" ></button> -->
            <!-- <div class="share_items">
                        <div class="icon qq"></div>
                        <div>手机QQ</div>
                    </div>
                    <div class="share_items">
                        <div class="icon qqzone"></div>
                        <div>QQ空间</div>
                    </div>  -->
          </div>
        </div>
        <!-- <img id="avatar" /> -->
      </div>
      
    </div>
    <transition name="fade">
        <div
          class="fade"
          v-show="fadeShow"
        >
          <div class="share_item">
            <div
              class="share_items"
              @click="jumpToWX"
            >
              <div class="icon wx"></div>
              <div>微信</div>
            </div>
            <div
              class="share_items"
              @click="jumpToWXPen"
            >
              <div class="icon wxpen"></div>
              <div>朋友圈</div>
            </div>
          </div>
          <button @click="sharePoster">取消</button>
        </div>
      </transition>
  </div>
</template>

<script>
import Qrcode from "@xkeshi/vue-qrcode";
import MCanvas from "mcanvas";
export default {
  components: {
    qrcode: Qrcode
  },
  data() {
    return {
      fadeShow: false,
      text: `邀请您加入省省帮，使用拼多多优惠券！先领券,再购物，更划算!
------------
下载链接：http://url.cn/5KRkJq6
------------
邀请码:${this.inviteCode}`,
      img: require("./assets/inviting.jpg"),
      innerShow: false,
      innerSmallShow: false,
      show: false,
      b64: "",
      contributeMoney: 0,
      current: 0,
      preCount: 0,
      smallPreCount: 0,
      inviteCode: "",
      pages: 1,
      curX: 0,
      startX: 0,
      startY: 0,
      scrollLen: 0,
      verticalScroll: "false",
      untouching: "true",
      firstTouchmove: "false",
      // tabs:3,
      smallShow: true,
      // base64:'',
      fans: [
        { value: "邀请好友" }
        // { value: "直属粉丝" },
        // { value: "推荐粉丝" }
      ]
    };
  },

  computed: {
    indicatorLeft: function() {
      //由点击tab变化current从而变化indicatorLeft
      //25%-0和75%-3rem
      return "calc(" + this.current * (100 / this.pages) + "%";
    },
    contentWidth: function() {
      //200%
      return 100 * this.pages + "%";
    },
    contentTransform: function() {
      //向左移动0和一个手机屏幕宽度
      return "translateX(" + (this.curX + this.scrollLen) + "px)";
    },
    inviteWidth() {
      return 100 / this.pages + "%";
    }
  },
  methods: {
    sharePoster() {
      this.fadeShow = !this.fadeShow;
    },
    onCopy: function(e) {
      this.$root.eventHub.$emit("showNotification", "已复制，快去邀请好友吧");
    },
    onError: function(e) {
      this.$root.eventHub.$emit("showNotification", "复制出错");
    },
    vipGrade(vip) {
      switch (vip) {
        case 1:
          vip = "普通会员";
          break;
        case 2:
          vip = "超级会员";
          break;
        case 8:
          vip = "运营商";
          break;
      }
      return vip;
    },
    jumpToWX: function() {
      wx.shareImage(
        {
          apiKey: "wxb531b503239f2ee0",
          scene: "session",
          contentUrl: "fs://img/ss.jpeg"
        },
        function(ret, err) {
          if (ret.status) {
            alert("分享成功");
          } else {
            alert(err.code);
          }
        }
      );
    },
    jumpToWXPen() {
      wx.shareImage(
        {
          apiKey: "wxb531b503239f2ee0",
          scene: "timeline",
          contentUrl: "fs://img/ss.jpeg"
        },
        function(ret, err) {
          if (ret.status) {
            alert("分享成功");
          } else {
            alert(err.code);
          }
        }
      );
    },
    changeImg() {
      let userInfo = localStorage.userInfo
        ? JSON.parse(localStorage.userInfo)
        : "{}";
      this.inviteCode = userInfo.inviteCode;
      let self = this;
      let mc = new MCanvas({
        width: 1000,
        height: 1000,
        // backgroundColor: "black"
      });
      mc.background(`${this.img}`, {
        left: 0,
        top: 0,
        // color: "#000000",
        type: "origin"
      })
        // text 添加文字数据基础函数；
        .text(`${this.inviteCode}`, {
          width: "100px",
          align: "center",
          normalStyle: {
            font: "14px"
          },
          pos: {
            x: "48%",
            y: "82%"
          }
        })
        // draw 最终绘制函数，用于最终的绘制；
        .draw({
          type: "jpeg",
          quality: 1,
          success(b64) {
            // console.log(b64);
            self.b64 = b64;
            self.show = true;
            b64 = b64.replace("data:image/jpeg;base64,", "");
            trans.saveImage(
              {
                base64Str: b64,
                album: false,
                imgPath: "fs://img/",
                imgName: "ss.jpeg"
              },
              function(ret, err) {
                if (ret.status) {
                  // alert(JSON.stringify(ret));
                } else {
                  alert(JSON.stringify(err));
                }
              }
            );
          },
          error(err) {
            console.log(err);
          }
        });
    },
    back: function() {
      window.history.back(-1);
    },

    invite: function(index) {
      this.current = index;
      //this.curX为0
      this.curX = -this.current * document.body.clientWidth;
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.changeImg();
    });
  },
  created() {}
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: translateY(100%);
}
.fade {
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 1;
}
.pages {
  position: relative;
}
.no-record {
  position: absolute;
  top: 30%;
  width: 100%;
  color: #aaa;
  text-align: center;
}
#avatar {
  opacity: 1;
}
.trans {
  transition: 0.3s;
}
.prentice {
  position: relative;
  height: 100%;
  z-index: 1;
  text-align: left;
  background-color: #fff;
}
#top {
  position: relative;
  //background-color:#FA5876;
  height: 5rem;
  //border-bottom:2px solid rgb(143, 142, 142)
}
#back {
  position: absolute;
  width: 3rem;
  height: 1.5rem;
  top: 1.75rem;
  left: 1rem;
  z-index: 1;
  background-image: url(./assets/bback.png);
  background-size: contain;
  background-repeat: no-repeat;
}
#indicator {
  position: absolute;
  box-sizing: border-box;
  bottom: 0;
  left: 0;
  // width:6rem;
  height: 2px;
  background-color: #f35c05;
  //加动画
  transition: 0.3s ease;
  z-index: 1;
}
.invite-wrapper {
  position: absolute;
  left: 3rem;
  width: calc(100% - 3rem);
  // text-align:center;
  line-height: 5rem;
  // height:100%;

  font-size: 1.2rem;
  color: #bbb;
  display: flex;
  flex-grow: 1;

  .invite {
    //  width: 50%;
    text-align: center;
    margin-left: -24px;
  }
}

// .mypre{
//     position:absolute;
//     width:50%;
//     left:50%;
//     text-align:center;
//     line-height:6.5rem;
//     font-size:1.2rem;
//     color: #bbb;
// }
.active {
  color: black;
}

#content {
  // text-align:left;
  // //height:100%;
  // position: absolute;
  // width: 100%;
  // top: 5rem;
  // bottom: 0px;
  display: flex;
  height: calc(100vh - 5rem);
}
#inviting {
  // display:inline-block;
  // width:50%;
  width: 100vw;
  height: 100%;
  text-align: center;
  // 使手机上滑动顺滑
  -webkit-overflow-scrolling: touch;
  overflow: scroll;

  img {
    width: 100%;
  }
  .invite_img {
    width: 100%;
    height: 200px;
    background-image: url(./assets/share.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  h3 {
    margin: 10px auto;
    color: #ca2b2b;
    font-size: 24px;
  }
  article {
    max-width: 250px;
    margin: 0 auto;
    text-align: center;
    height: 80px;
    line-height: 30px;
    span {
      color: #ca2b2b;
      float: right;
    }
  }
  .invite_code {
    // margin-top:10px;
    color: black;
    span {
      font-size: 1.2rem;
      font-weight: bold;
    }

    input {
      //display:inline-block;
      border: 1px solid #ddd;
      padding: 3px;
      width: 6rem;
      font-size: 1rem;
      font-weight: bold;
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
}
.share {
  margin-bottom: 25px;
  // border-top: 1px solid #f4f4f4;
  .share_text {
    border: none;
    border-radius: 5px;
    padding: 10px;
    margin: 0 15px 0 15px;
    color: #fff;
    font-size: 1rem;
    flex-grow: 1;
  }
  & button:nth-child(1) {
    background: orange;
  }
  & button:nth-child(2) {
    background: rgb(233, 37, 69);
  }
  .share_list {
    display: flex;
    justify-content: center;
  }
}
.share_item {
  padding-top:15px;
  display: flex;
  justify-content: center;
  .share_items {
    margin: 0 10px;
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
    .wxpen {
      background-image: url(./assets/wxpen.png);
    }
    .qq {
      background-image: url(./assets/QQ.png);
    }
    .qqzone {
      background-image: url(./assets/QQZone.png);
    }
  }
}
.fade {
  border: 1px solid #ddd;
  background: #fff;
  button {
    border: none;
    width: 100%;
    background: #ddd;
    padding: 10px;
  }
}
#invited {
  text-align: center;
  // display:inline-block;
  //background-color:#f4f4f4;
  // position: absolute;
  //top:3rem;
  // bottom:0;
  height: 100%;
  width: 100vw;
  //width:100%;
  h3 {
    margin: 0;
    padding-left: 15px;
    // height:4rem;
    text-align: left;
    // line-height:4rem;
    color: #fc7d07;
    border: 1px solid #ddd;
    background-color: #f4f4f4;
    display: flex;
    justify-content: space-around;
    span {
      padding: 0 3px;
      border: 1px solid #bbb;
      border-radius: 8px;
    }
  }
  #prentice {
    color: black;
  }
  #smallPrentice {
    color: #fc7d07;
  }
}
#myprelist {
  // position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  //background-color: #F0F0F0;
  overflow: scroll;
  z-index: 1;
  td {
    width: 25%;
  }
}
#prelist {
  width: 100%;
  padding: 5px;

  td {
    height: 2rem;
    line-height: 2rem;
    width: 25%;
  }
}
.spinner {
  width: 40px;
  height: 40px;
  background-color: #fa5876;

  margin: 100px auto;
  -webkit-animation: sk-rotateplane 1.2s infinite ease-in-out;
  animation: sk-rotateplane 1.2s infinite ease-in-out;
}

@-webkit-keyframes sk-rotateplane {
  0% {
    -webkit-transform: perspective(120px);
  }
  50% {
    -webkit-transform: perspective(120px) rotateY(180deg);
  }
  100% {
    -webkit-transform: perspective(120px) rotateY(180deg) rotateX(180deg);
  }
}

@keyframes sk-rotateplane {
  0% {
    transform: perspective(120px) rotateX(0deg) rotateY(0deg);
    -webkit-transform: perspective(120px) rotateX(0deg) rotateY(0deg);
  }
  50% {
    transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
    -webkit-transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
  }
  100% {
    transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
    -webkit-transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
  }
}
</style>
