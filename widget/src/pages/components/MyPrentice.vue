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
        <div
          id="indicator"
          :style="{left:indicatorLeft,width:inviteWidth}"
        ></div>
      </div>

    </div>
    <!-- 增加了一个动画 -->
    <div
      id="content"
      :style="{width:contentWidth,transform:contentTransform}"
      :class="{trans:untouching}"
    >

      <div
        id="invited"
        class="pages"
        @touchstart="touchstart($event)"
        @touchmove="touchmove($event)"
        @touchend="touchend($event)"
      >
        <div id="myprelist">
          <h3>
            <p>直属粉丝数&nbsp;<span>{{preCount}}</span></p>
          </h3>

          <table id="prelist">
            <thead>
              <tr>

                <th>用户名</th>
                <th>等级</th>
                <th>手机号</th>
                <th>创建日期</th>
              </tr>
            </thead>
            <tbody>
              <tr
                id="prentice"
                v-for="(item,index) in prentice"
                :key="index"
              >
                <td>{{item.weixin}}</td>
                <td>{{vipGrade(item.vipGrade)}}</td>
                <td>{{item.mobile.toString().slice(0,3)+'****'+item.mobile.toString().slice(-4)}}</td>
                <td>{{timeCount(item.createTime)}}</td>
              </tr>
            </tbody>
          </table>
          <div
            class="no-record"
            v-show="innerShow"
          >啊哦，你还没有直属粉丝<br>（＞人＜；）</div>
        </div>
      </div>
      <div
        id="invited"
        class="pages"
        @touchstart="touchstart($event)"
        @touchmove="touchmove($event)"
        @touchend="touchend($event)"
      >
        <div id="myprelist">
          <h3>
            <p>推荐粉丝数&nbsp;<span>{{smallPreCount}}</span></p>
          </h3>
          <table id="prelist">
            <thead>
              <tr>
                <th>用户名</th>
                <th>等级</th>
                <th>手机号</th>
                <th>创建日期</th>
              </tr>
            </thead>
            <tbody>
              <tr
                id="prentice"
                v-for="(item,index) in smallPrentice"
                :key="index"
                style="border:1px solid #ddd;color:orange;font-size:18px"
              >
                <td>{{item.weixin}}</td>
                <td>{{vipGrade(item.vipGrade)}}</td>
                <td>{{item.mobile}}</td>
                <td>{{item.createTime}}</td>
              </tr>
            </tbody>
          </table>
          <div
            class="no-record"
            v-show="innerSmallShow"
          >啊哦，你还没有推荐粉丝<br>（＞人＜；）</div>
        </div>
      </div>
    </div>
  </div>
  <!-- </div> -->
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
      img: require("./assets/inviting.jpg"),
      innerShow: true,
      innerSmallShow: true,
      show: false,
      current: 0,
      preCount: 0,
      smallPreCount: 0,
      inviteCode: "",
      pages: 2,
      curX: 0,
      startX: 0,
      startY: 0,
      scrollLen: 0,
      verticalScroll: "false",
      untouching: "true",
      firstTouchmove: "false",
      // tabs:3,
      // base64:'',
      fans: [
        // { value: "邀请粉丝" },
        { value: "直属粉丝" },
        { value: "推荐粉丝" }
      ],
      prentice: [
        // {
        //   weixin: "马建阳",
        //   vipGrade: 1,
        //   mobile: 15827114816,
        //   createTime: 1546700550000
        // },
        // {
        //   weixin: "杨一帆",
        //   vipGrade: 2,
        //   mobile: 15723016991,
        //   createTime: 2546700550000
        // }
      ],
      smallPrentice: [
        // {
        // "weixin":1,
        // "vipGrade":1,
        // "mobile":1,
        // "createTime":1
        // },
        // {
        // "weixin":2,
        // "vipGrade":2,
        // "mobile":2,
        // "createTime":2
        // }
      ]
      // operator:1,
    };
  },

  computed: {
    indicatorLeft: function() {
      //由点击tab变化current从而变化indicatorLeft
      return "calc(" + this.current * (100 / this.pages) + "%)";
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
    timeCount(time) {
      let date = new Date(time);
      let Y = date.getFullYear() + "-";
      let M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      let D =
        (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
      return Y + M + D;
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
    back: function() {
      window.history.back(-1);
    },
    fetchData: function() {
      let userInfo = localStorage.userInfo
        ? JSON.parse(localStorage.userInfo)
        : "{}";
      fetch("http://47.97.153.221:8080/app/user/getPSubUserInfo", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        credentials: "include",
        body: "userId=" + userInfo.userId
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          }
        })
        .then(json => {
          // this.inviteCode=json.inviteCode;
          if (json.status == 1) {
            this.prentice = json.resultList;
            this.preCount = json.resultTotal;
            if (this.preCount === 0) {
              this.innerShow = true;
            } else {
              this.innerShow = false;
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
      //判断
      // if (userInfo.vipgrade === 1 || userInfo.vipgrade === 2) {
      //   this.fans = this.fans.slice(0, 2);
      //   this.pages = 1;
      //   this.smallShow = false;
      // }
      // 去掉vip8
      // if (userInfo.vipgrade === 8) {
      //   fetch("http://47.97.153.221:8080//app/user/getTSubUserInfo", {
      //     method: "POST",
      //     headers: { "Content-Type": "application/x-www-form-urlencoded" },
      //     credentials: "include",
      //     body: "userId=" + userInfo.userId
      //   })
      //     .then(response => {
      //       if (response.ok) {
      //         return response.json();
      //       }
      //     })
      //     .then(json => {
      //       // this.inviteCode=json.inviteCode;
      //       if (json.status == 1) {
      //         this.smallPrentice = json.resultList;
      //         this.smallPreCount = json.resultTotal;
      //         if (this.smallPreCount === 0) {
      //           this.innerSmallShow = true;
      //         } else {
      //           this.innerSmallShow = false;
      //         }
      //       }
      //     })
      //     .catch(err => {
      //       console.log(err);
      //     });
      // }
    },
    invite: function(index) {
      this.current = index;
      //this.curX为0
      this.curX = -this.current * document.body.clientWidth;
    },
    // invited:function(){
    //     this.current=1;
    //     //this.curX为负一个宽度
    //      this.curX= -this.current*document.body.clientWidth;
    // },
    touchstart: function(e) {
      //触摸目标在页面中的x坐标
      this.startX = e.touches[0].pageX;
      this.startY = e.touches[0].pageY;
      //不是竖直
      this.verticalScroll = false;
      //没有动画
      this.untouching = false;
      //是第一次触摸
      this.firstTouchmove = true;
    },
    touchmove: function(e) {
      if (this.firstTouchmove) {
        this.firstTouchmove = false;
        //x方向滑的距离
        let scrollX = e.touches[0].pageX - this.startX;
        //取绝对值，你竖着滑
        if (Math.abs(e.touches[0].pageY - this.startY) > Math.abs(scrollX)) {
          //竖着滑
          this.verticalScroll = true;
          return;
        }
      }
      if (!this.verticalScroll) {
        let scrollX = e.touches[0].pageX - this.startX;
        this.scrollLen = scrollX;
        e.preventDefault();
        e.stopPropagation();
      }
    },
    touchend: function(e) {
      if (this.scrollLen > document.body.clientWidth / 4) {
        if (this.current > 0) {
          this.current--;
        }
        //向左滑 page++
      } else if (this.scrollLen < -(document.body.clientWidth / 4)) {
        if (this.current < this.pages - 1) {
          this.current++;
        }
      }
      //有动画
      this.untouching = true;
      //清空滑动距离
      this.scrollLen = 0;
      this.curX = -this.current * document.body.clientWidth;
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.fetchData();
    });
  },
  created() {}
};
</script>

<style lang="scss" scoped>
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
  width: 2rem;
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
  // margin-top: 15px;
  // border-top: 1px solid #f4f4f4;
  .share_text {
    margin: 10px;
    color: #fa5875;
    font-size: 1rem;
  }
  .share_list {
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
}
#invited {
  text-align: center;

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
    // color:orange;
    // font-size:18px"
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
  border-collapse: collapse;
  thead {
    border-bottom: 1px solid #ddd;
  }
  th {
    height: 2.5rem;
    line-height: 2.5rem;
    font-size: 18px;
    // color: #fc7d07;
    // width: 25%;
  }
  td {
    height: 2.5rem;
    line-height: 2.5rem;
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
