<template>
  <div class="wrapper">
    <ol class="tabs-outer">
        <li calss="li1" @touchend=forwardTo(0) :class="{active: current===0}">
        <!-- <li :class="{active: current===index}" v-for="(value, index) in panes"
        @touchend=forwardTo(index) :key=index> -->
          <!-- {{value.text}} -->
         <div class="imgdiv"> 
          <svg class="icon">
            <use xlink:href="#icon-99"></use>
          </svg>
         </div>
          <span>9.9包邮</span>
         </li><li calss="li" @touchend=forwardTo(1) :class="{active: current===1}">
          <div class="imgdiv"> 
          <svg class="icon">
            <use xlink:href="#icon-99yuanbaoyou"></use>
          </svg>
          </div>
          <span>19.9包邮</span>
        </li><li calss="li" @touchend=forwardTo(2) :class="{active: current===2}">
          <div class="imgdiv"> 
          <svg class="icon" >
            <use xlink:href="#icon-navicon-mrpc"></use>
          </svg>
          </div>
          <span>每日半价</span>
        </li><li calss="li" @touchend=forwardTo(3) :class="{active: current===3}">
          <div class="imgdiv"> 
          <svg class="icon" >
            <use xlink:href="#icon-tianmao"></use>
          </svg>
          </div>
          <span>天猫精选</span>
        </li><li calss="li2" @touchend=forwardTo(4) :class="{active: current===4}">
          <div class="imgdiv"> 
          <svg class="icon" >
            <use xlink:href="#icon-shishi"></use>
          </svg>
          </div>
          <span>实时疯抢top100</span>
        </li>
        <div id="indicator" :style="{transform:indicatorTransform,width:indicatorWidth}"></div>
    </ol>
    <div id="content" 
    :style="{width:contentWidth,transform:contentTransform}" 
    :class="{trans:untouching}">
      <div class="tabs-container"  
      v-for="(value, index) in panes" 
      :key=index
      @touchstart="touchstart($event)" 
      @touchmove="touchmove($event)"
      @touchend="touchend($event, index)"
      >
        <ol class="tabs-content" >
          <li :id="'p'+index">
            <keep-alive>
              <div class="page-wrapper"  is="Splistview"  :msg="value.text"
                  :scrollBottom="scrolls[index].scrollBottom" :key="value.text" 
                  >
                </div>
            </keep-alive>
          </li>
        </ol>
      </div>
    </div>
    </div>
</template>

<script>
import Splistview from "./Splistview";

export default {
  name: "special",
  components: {
    Splistview: Splistview
  },
  data() {
    return {
      curX: 0,
      startX: 0,
      startY: 0,
      scrollLen: 0,
      verticalScroll: "false",
      untouching: "true",
      firstTouchmove: "false",
      width: "",
      left: "",
      pages: 5,
      current: 0,
      currentTab: 1,
      panes: [
        { text: "9.9包邮" },
        { text: "19.9包邮" },
        { text: "每日半价" },
        { text: "天猫精选" },
        { text: "实时疯抢TOP100" }
      ],
      scrolls:
        // map() 方法返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值。map不会处理空数组，map也不会改变原数组
        Array.apply(null, Array(5)).map((item, i) => {
          return {
            // sonScrollTop: -1,
            // sonScrollable: false,
            pageScrollTop: 0,
            scrollBottom: false,
            // height: 0,
            pagingCount: 1
          };
        })
    };
  },
  mounted: function() {
    for (let i = 0; i < 5; i++) {
      document.getElementById("p" + i).addEventListener("scroll", this.scroll);
      ;
    }
  },
  computed: {
    indicatorWidth() {
      return this.width + "px";
    },
    indicatorTransform() {
      ;
      return "translateX(" + this.left + "px";
    },
    contentWidth: function() {
      return 100 * this.pages + "%";
    },
    contentTransform: function() {
      ;
      return "translateX(" + this.curX + "px)";
    }
  },
  methods: {
    // fetchData(){
    //   fetch("http://47.97.153.221:8080/app/good/getGoodList?",{
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/x-www-form-urlencoded"
    //     },
    //     body: "type=5&orderBy=2"
    //   }).then((response)=>{
    //     if(response.ok){
    //       return response.json()
    //     }
    //   }).then((json)=>{
    //     
    //   })
    // },
    scroll: function(e) {
      ;
      let top = e.target.scrollTop;
      this.scrolls[this.current].pageScrollTop = top;
      if (
        e.target.scrollTop >
        this.scrolls[this.current].pagingCount * document.body.clientHeight
      ) {
        this.scrolls[this.current].pagingCount++;
        ;
        console.log(
          "this.pagingCount" + this.scrolls[this.current].pagingCount
        );
        this.scrolls[this.current].scrollBottom = !this.scrolls[this.current]
          .scrollBottom;
      }
    },
    forwardTo(index) {
      this.current = index;
      this.curX = -this.current * document.body.clientWidth;
      this.$nextTick(function() {
        let ol = document.getElementsByClassName("tabs-outer")[0];
        this.width = ol.children[index].clientWidth;
        this.left = ol.children[index].offsetLeft;
      });
    },
    touchstart: function(e) {
      this.startX = e.touches[0].pageX;
      this.startY = e.touches[0].pageY;
      this.verticalScroll = false;
      this.untouching = false;
      this.firstTouchmove = true;
    },
    touchmove: function(e) {
      if (this.firstTouchmove) {
        this.firstTouchmove = false;
        let scrollX = e.touches[0].pageX - this.startX;
        if (Math.abs(e.touches[0].pageY - this.startY) > Math.abs(scrollX)) {
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
    touchend: function(e, index) {
      if (this.scrollLen > document.body.clientWidth / 5) {
        if (this.current > 0) {
          ;
          this.current--;
          ;
        }
      } else if (this.scrollLen < -(document.body.clientWidth / 5)) {
        if (this.current < this.pages - 1) {
          ;
          this.current++;
          ;
        }
      }
      this.untouching = true;
      this.scrollLen = 0;
      // this.current = index
      this.curX = -this.current * document.body.clientWidth;
      let ol = document.getElementsByClassName("tabs-outer")[0];
      this.width = ol.children[this.current].clientWidth;
      this.left = ol.children[this.current].offsetLeft;
    }
  }
  // beforeRouteEnter(to,from,next){
  //           next(vm=>{
  //               vm.forwardTo();
  //           })
  //       }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
/*----------------------------css reset -------------------------------------*/
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
*::before {
  box-sizing: border-box;
}
*::after {
  box-sizing: border-box;
}
// ul li {list-style-type: none;}
ul,
ol {
  list-style: none;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: normal;
}
a {
  text-decoration: none;
  color: inherit;
}
img {
  vertical-align: top;
}
input,
button {
  border: none;
  outline: none;
}
.icon {
  width: 2.5em;
  height: 2.5em;
  vertical-align: -0.15em;
  fill: #fff;
  overflow: hidden;
  transition: 0.5s linear;
}
body {
  font: 15px/1.5 Helvetica, sans-serif;
  color: #333;
}
/*-----------------------------content -------------------------------------*/

// margin-left解决空隙问题
.wrapper {
  .tabs-outer {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 2px;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 1;
    box-shadow: 0px 5px 7px #ddd;
    padding-top: 1.5rem;
    background: #fa5876;
    li {
      flex-grow: 1;
      padding: 10px 0px 0px 0px;
      // border-radius: 1px;
      margin-left: -1px;
      color: #fff;
      min-height: 60px;
      z-index: 1;
      font-size: 12.5px;
      font-weight: bold;
      overflow: hidden;
      .imgdiv {
        background: #fa5876;
      }
      &.active {
        svg {
          fill: #fff;
          transform: scale(1.2);
        }
        span {
          color: #fa5876;
        }
      }
      svg {
        margin-bottom: 4px;
      }

      span {
        display: block;
        padding: 5px 0px 10px 0px;
        background: #fff;
        color: #999;
        // border-left:1px solid #fff;
        // border-right: 1px solid #fff;

        // outline:2px solid #fff;
      }
      // li:last-child{
      //   span {
      //     margin-left: 2px;
      //     background: #fff;
      //     z-index: 1000000;
      //   }
      // }
    }
    #indicator {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 15%;
      height: 2px;
      z-index: 100;
      background-color: #fa5876;
      transition: 0.3s ease;
    }
  }
  #content {
    display: flex;
    .tabs-container {
      width: 20%;
      border-radius: 4px;
      // background: repeating-linear-gradient( -45deg, #D7D3C7, #D7D3C7 2px, #CECABE 2px, #CECABE 4px);
      box-shadow: 0 0 3px #888;
      .tabs-content {
        margin-top: 75px;
        background: #f0ede6;
        li {
          overflow-x: hidden;
          overflow-y: scroll;
          -webkit-overflow-scrolling: touch;
          height: calc(100vh - 75px - 3rem);
          .page-wrapper {
            margin-top: 2rem;
            overflow: hidden;
          }
        }
      }
    }
  }
}
.trans {
  transition: 0.3s;
}
</style>
