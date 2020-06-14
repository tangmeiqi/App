<template>
  <div class="tab" :id="cpntId">
    <div class="tab-container"
    @touchstart="tabbarTouchstart($event)"
    @touchmove="tabbarTouchmove($event)">
    <!-- 可变的整个滑动条宽度 -->
    <ul class="tab-bar" :style="{width:tabbarWidth}" :id="'tb'+cpntId">
      <div class="tab-indicator" :style="{transform: indicatorLeft}"></div>
      <!--上面的div是下面的滑动条-->
      <!--click-->
      <!-- 男装女装之类的 -->
      <!-- 可变的每个滑动条的宽度 -->
      <li class="tab-front" v-for="(item, index) in choosenTabs" :key="index"
          @click="forwardTo(index, $event)" :style="{width:frontTabWidth}" :class="{tabfrontactive:index === curPage}">
        {{item.opt_name}}
      </li>
    </ul>
  </div>
    <!--下面那个div是右上角的+-->
    <div class="tab-more" @click="toggleFullpage(true)"></div>
    <transition name="slide-fade">
    <div class="fullpage" v-if="fullpageshow" @touchmove.stop.prevent :id="'fp'+cpntId">
      <!--下面那个div是右上角的x-->
      <div class="fullpage-close" @click="toggleFullpage(false)"></div>
      <div class="tab-choosen">
        <p class="fullpage-title">我的分类</p>
         <transition-group name="flip-list" class="tab-list"> 
           <!-- :class="{defaultTab: item.default}" -->
          <li class="tab-option"
              v-for="(item, index) in choosenTabs" :key="index" :itemindex="index"    
              @touchstart.stop.prevent="tabTouchstart(index, $event)"
              @touchmove.stop.prevent="tabTouchmove($event)"
              @touchend.stop.prevent="tabTouchend(index, $event)">
            {{item.opt_name}}
            <!-- <div class="tabDelete" @touchstart.stop="deleteTab(index)"></div> -->
            <!-- :class="{tabDelete: !item.default}" -->
          </li>
         </transition-group> 
        <div class="tab-option virtual-tab" v-if="virtual.show"
             :style="{left: virtual.x, top: virtual.y}">
          {{choosenTabs[virtual.index].opt_name}}
        </div>
      </div>
      <!-- <div class="tab-recommend">
        <p class="fullpage-title">推荐分类</p>
        <ul class="tab-list">
          <li class="tab-option" v-for="(item, index) in recommendTabs" :key="index" @click="addTab(index)">{{item.opt_name}}</li>
        </ul>
      </div> -->
    </div>
  </transition>

    <!--tab里的组件-->
    <div class="content" :style="{width: contentWidth, transform: contentTransform}" :class="{trans:untouching}">
      <!-- 宽度设为每个小tab宽度 -->
      <!-- id[1]为1或2来判断是淘宝京东tab还是男装女装tab -->
    <div class="page" v-for="(item, index) in choosenTabs" :key="index" :style="{width: pageWidth}" :class="{childrenPage:id[1] === '2', parentPage: id[1] === '1'}"
         @touchstart="touchstart($event)"
         @touchmove="touchmove($event)"
         @touchend="touchend($event)"
         :id="'p'+cpntId+index">
      <slider></slider>
      <!-- :sonScrollable="scrolls[index].sonScrollable" 
      :sonScrollTop="scrolls[index].sonScrollTop"   :cpntId="item.cpntId"-->
      <!-- :class="{heightSized:!scrollable}"  -->
       <div class="page-wrapper"  is="Pddlistview"
       :id="item.cpntId"
      :msg="item.opt_name" :index="index" :currentPage="curPage" :scrollBottom="scrolls[index].scrollBottom" :key="item.opt_name"></div>
    </div>
  </div>
  </div>
</template>

<script>
  // import Listview from './Listview'
  import Pddlistview from './Pddlistview'
  import Slider from './Slider'
  export default {
    name: 'tab',
    props:['choosen','cpntId'],
    //  props: {'choosen': {type:Array}, 'cpntId':{type:String}, 'scrollable': {type: Boolean, default: true}, 'scrollTop': {type: Number, default: 0}},
    data () {
      return {
        // 把字符串分割成数组
        // id和cpntId是啥，从index传过来的
        id: this.cpntId.split(''),
        curPage: 0,
        startX: 0,
        curX: 0,
        scrollLen: 0,                                                                       
        verticalScroll: false,
        fullpageshow: false,      
        fullpageTop: 0,
        virtualIndex: 0,
        virtual: {
          index: 0,
          show: false,
          x: 0,
          y: 0,
          top: this.cpntId.split('')[1] === '1' ? 4 * window.getComputedStyle(document.body).fontSize.slice(0, -2) : 6 * window.getComputedStyle(document.body).fontSize.slice(0, -2)
        },
        untouching: true,
        firstTouchmove: false,
        choosenTabs: this.choosen,
        // recommendTabs: this.recommend,
        initScrollTop: 0,
        // curName:this.choosen.name,
        tabbar: {
          x: 0,
          y: 0,
          firstTouchmove: false,
          isVertical: true
        },
        gettype:7,
        // 这是个啥东西？
        scrolls:
        // map() 方法返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值。map不会处理空数组，map也不会改变原数组
          Array.apply(null, Array(this.choosen.length)).map((item, i) => {
            return {
              sonScrollTop: -1,
              sonScrollable: false,
              pageScrollTop: 0,
              scrollBottom: false,
              height: 0,
              pagingCount:1
            }
          })
      }
    },
   components: {
      Pddlistview,Slider
    },
    computed: {
      indicatorLeft: function () {
        // 相当于this.tabbarWidth.slice(0,this.tabbarWidth.length-1)
        let tbwStr = parseInt(this.tabbarWidth.slice(0, -1))
        let tbwStr100 = tbwStr < 100 ? 100 : tbwStr//如果ul的宽度小于100，说明整个ul是没有整个屏幕的大小的，所以要手动把屏幕变成100%的大小
        // 16
        let rem = window.getComputedStyle(document.body).fontSize.slice(0, -2)
        ;
        // 算出ul的实际宽度
        let tbw = tbwStr100 / 100 * (document.body.offsetWidth - 2 * rem) // 算出ul的实际宽度，括号里是tab-container的宽度，2rem是右边加号的宽度
        let tw = tbw / this.choosenTabs.length//应该是每个li的宽度，每点击一次，下面的红线就要移动一个li的距离
        let trans = tw * (this.curPage + 0.5)//这是一个动态的定位方式，点击哪一个li,就要移动多少距离，比如说第一次红线最左边就是第一个li的正中心
        // 0.5*320/4,向左移动这么多距离再减去indicator长度的1/2
        return 'translateX(calc(' + trans + 'px - 1.5rem))' // 1.5rem是indicator长度的1/2
      },
      tabbarWidth: function () {
        // 整个滑动块长度，之前是有四个，加一个就有5个，就为125%
        // +变成了字符串
        return 25 * this.choosenTabs.length + '%'//tabbarWidth的宽度是相对于tab-container的不知道25怎么来的
      },
      frontTabWidth: function () {
        // 每个滑动块的长度
        return 100 / this.choosenTabs.length + '%'//frontTabWidth的宽度是相当于tabbarWidth的
      },
      // 总的内容宽度，如果有5个内容，宽度就是500%
      contentWidth: function () {
        return 100 * this.choosenTabs.length + '%'
      },
      pageWidth: function () {
        // 每个内容的宽度，相对于总内容的几%
        return 100 / this.choosenTabs.length + '%'
      },
      contentTransform: function () {
        // 内容移动距离，一般是整个手机屏幕的多少倍
        return 'translateX(' + (this.curX + this.scrollLen) + 'px)'
      }
  
    },
    methods: {
      add: function (component, text) {
        this.items.push({
          'component': component,
          'text': text
        })
      },
//      点击京东旁边的+是否显示更多分类
      toggleFullpage: function (bool) {
        this.fullpageshow = bool
      },
      // deleteTab: function (index) {
      //   if (this.choosenTabs[index].default) return
      //   this.forwardTo(0)
      //   this.recommendTabs = this.recommendTabs.concat(this.choosenTabs.splice(index, 1))
      //   this.scrolls.splice(index, 1)
      // },
      // addTab: function (index) {
      //   this.choosenTabs = this.choosenTabs.concat(this.recommendTabs.splice(index, 1))
      //   this.scrolls.push({
      //     sonScrollTop: -1,
      //     sonScrollable: false,
      //     pageScrollTop: 0
      //   })
      // },
      touchstart: function (e) {
        this.startX = e.touches[0].pageX
        this.startY = e.touches[0].pageY
        //竖直
        this.verticalScroll = false
        this.untouching = false
        this.firstTouchmove = true
        //this.$root.eventHub.$emit('tabInitScrollTop')
        this.$root.eventHub.$emit
      },
      touchmove: function (e) {
        if (this.firstTouchmove) {
          this.firstTouchmove = false
          let scrollX = e.touches[0].pageX - this.startX
          if (Math.abs(e.touches[0].pageY - this.startY) > Math.abs(scrollX)) {
            this.verticalScroll = true
            return
          }
        }
        if (!this.verticalScroll) {
          let scrollX = e.touches[0].pageX - this.startX
          this.scrollLen = scrollX
          e.preventDefault()
          e.stopPropagation()
        }
        if (this.cpntId === 'l11') {
          e.stopPropagation()
        }
      },
      touchend: function (e) {
        if (this.scrollLen > document.body.clientWidth / 4) {
          if (this.curPage > 0) {
            this.curPage--
          }
        } else if (this.scrollLen < -(document.body.clientWidth / 4)) {
          if (this.curPage < this.choosenTabs.length - 1) {
            this.curPage++
          }
        }
        this.untouching = true
        this.scrollLen = 0
        this.curX = -this.curPage * document.body.clientWidth
      },
      forwardTo: function (index) {
        //  如果点击的不是当前页面，
        if (index !== this.curPage) { 
          this.curPage = index
          // 设置移动距离为页数*屏幕宽度
          this.curX = -this.curPage * document.body.clientWidth
        }
      },
      tabTouchstart: function (index, $event) {
        // if (this.choosenTabs[index].default) {
        //   return
        // }
        this.virtual.show = true
        this.virtual.x = $event.changedTouches[0].pageX + 'px'// changedTouches[0]触发事件时改变的触摸点的集合
        // let st = this.scrollTop === -1 ? this.initScrollTop : this.scrollTop;
        //要注意pagey表示什么
        this.virtual.y = $event.changedTouches[0].pageY - this.virtual.top + 'px'
        this.virtual.index = index
      },
      tabTouchmove: function ($event) {
        this.virtual.x = $event.changedTouches[0].pageX + 'px'
        // let st = this.scrollTop === -1 ? this.initScrollTop : this.scrollTop
        this.virtual.y = $event.changedTouches[0].pageY - this.virtual.top+ 'px'
        //下面表示分淘宝和拼多多的时候拖到哪儿框移到哪儿
        // this.virtual.y = $event.changedTouches[0].pageY - st - this.virtual.top+'px'
      },
      tabTouchend: function (index, $event) {
        this.virtual.show = false
        this.$nextTick(function () {
          let curMouseOn = document.elementFromPoint($event.changedTouches[0].clientX, $event.changedTouches[0].clientY);
          if (curMouseOn !== null && curMouseOn.hasAttribute('itemindex')) {
            let onIndex = curMouseOn.getAttribute('itemindex')
            if (index !== onIndex) {
              // 交换移动的选中块
                this.choosenTabs.splice(onIndex, 0, this.choosenTabs.splice(index, 1)[0])
                this.scrolls.splice(onIndex, 0, this.scrolls.splice(index, 1)[0])
                this.resetScrollTop(index, onIndex)
            }
          } else {
 
            return
          }
        })
      },
      // 纪录高度
      resetScrollTop: function () {
        Array.prototype.slice.apply(arguments).map(index => {
          this.$nextTick(function () {
            document.getElementById('p' + this.cpntId + index).scrollTop = this.scrolls[index].pageScrollTop
          })
        })
      },
      // 感觉这个tabbar是多余的
      tabbarTouchstart: function ($event) {
        let bar = this.tabbar
        bar.x = $event.touches[0].pageX
        bar.y = $event.touches[0].pageY
        bar.firstTouchmove = true
        bar.isVertical = true
      },
      tabbarTouchmove: function ($event) {
        let abs = Math.abs
        // Math.abs(x) 函数返回指定数字 “x“ 的绝对值
        let bar = this.tabbar
        if (bar.firstTouchmove) {
          if (abs($event.touches[0].pageX - bar.x) > abs($event.touches[0].pageY - bar.y)) {
            bar.isVertical = false
          }
          bar.firstTouchmove = false
        }
        if (!bar.isVertical) {
          $event.stopPropagation()
        }
      },
      scroll: function (e) {
        let top = e.target.scrollTop;  
        // let hei = e.target.firstChild.offsetHeight
        // this.scrolls[this.curPage].sonScrollable = top >= hei
        // this.scrolls[this.curPage].sonScrollTop = hei - top
        // document.body.clientHeight
        this.scrolls[this.curPage].pageScrollTop = top
        if(e.target.scrollTop>this.scrolls[this.curPage].pagingCount*2560-this.scrolls[this.curPage].height){
            this.scrolls[this.curPage].pagingCount++;
            this.scrolls[this.curPage].scrollBottom=!this.scrolls[this.curPage].scrollBottom;
        }
      },

      // childrenScroll: function (e) {
      //   this.scrolls[this.curPage].pageScrollTop = e.target.scrollTop;
      //   // this.scrolls[this.curPage].scrollBottom = e.target.scrollTop + this.scrolls[this.curPage].height >= e.target.firstChild.offsetHeight
      //   var scrollHeight=e.target.scrollTop;
      //   if(scrollHeight>=(this.scrolls[this.curPage].pagingCount*2560-this.scrolls[this.curPage].height)){
      //     this.scrolls[this.curPage].pagingCount++;
      //     this.scrolls[this.curPage].scrollBottom=!this.scrolls[this.curPage].scrollBottom;
      //   }
      // },
      initializeScrollTop: function (e) {
        for (let i = 0; i < this.scrolls.length; i++) {
          document.getElementById('p' + this.cpntId + i).scrollTop = this.scrolls[i].pageScrollTop
        }
      },
      indicatorChange: function () {
        this.$nextTick(() => {
          let tb = document.getElementById('tb' + this.cpntId)//tb为ul
          let left = tb.lastChild.offsetWidth * this.curPage;
          let right = tb.lastChild.offsetWidth * (this.curPage + 1)
          let scroll = tb.parentNode.scrollLeft
          let width = tb.parentNode.offsetWidth
          let toScroll
          if (right - scroll >= width) {
            toScroll = right - width
          } else if (left < scroll) {
            toScroll = left
          }
          var TWEEN = require('@tweenjs/tween.js')//tween.js是一款可生成平滑动画效果的js动画库
          var coords = { x: scroll, y: tb.parentNode }
          var tween = new TWEEN.Tween(coords)
            .to({x: toScroll}, 300)
            .onUpdate(() => {
              coords.y.scrollLeft = coords.x
            })
          tween.start()
          requestAnimationFrame(animate)

          function animate (time) {
            requestAnimationFrame(animate)
            TWEEN.update(time)
          }
        })
      },
    },
    mounted: function () {
      if (this.id[1] === '1') {
        for (let i = 0; i < this.scrolls.length; i++) {
          var el=document.getElementById('p' + this.cpntId + i);
          el.addEventListener('scroll', this.scroll)
          this.scrolls[i].height = el.offsetHeight
        }
        // [].forEach.call(document.getElementsByClassName('parentPage'), item => {
        //   item.addEventListener('scroll', this.scroll)
        // })
      }
      // if (this.id[1] === '2') {
      //   for (let i = 0; i < this.scrolls.length; i++) {
      //     let curP = document.getElementById('p' + this.cpntId + i)
      //     curP.addEventListener('scroll', this.childrenScroll)
      //     this.scrolls[i].height = curP.offsetHeight
      //   }
      // }
      // fullpage的virtual-tab由于定位用了absolute，位置会受到顶栏和父tab滑动距离影响([prop]this.scrollTop)。
      // 顶栏高度在this.virtual.top中给出。
      // 滑动高度在this.scroll()中会计算，但没有初始化的过程。
      // 父tab的scrollTop就是0，子tab的scrollTop在这里计算出来。
      // 父tab滑动高度初始就是pageWrapper的高度。pageWrapper也就是当前这个tab的父节点。
    //   if (this.id[1] === '2') {
    //     this.initScrollTop = document.getElementById(this.cpntId).parentNode.offsetHeight
    //   }
        this.$root.eventHub.$on('tabInitScrollTop', this.initializeScrollTop)
    },
    // beforeCreate: function () {
    //   //  避免循环引用，在beforeCreate钩子这里动态引入。
    //   console.log('this.$options',this.$options);
    //   this.$options.components.Taobao = require('./Taobao.vue')
    //   this.$options.components.Pdd = require('./Pdd.vue')
    // },
    watch: {
      // 没有用到route
      'route': 'routeChange',
      // 当indicatorLeft改变触发
      'indicatorLeft': 'indicatorChange',
      // 传入的choosen变化了就把this.choosenTabs=this.choosen
      'choosen':function(){
        ;
        this.choosenTabs=this.choosen;
      },
//       　　choosen:{  
// 　　　　    handler(newValue, oldValue) {  
// 　　　　　　for (let i = 0; i < newValue.length; i++) {  
// 　　　　　　　　if (oldValue[i] != newValue[i]) {  
// 　　　　　　　　　　   
// 　　　　　　　　}  
// 　　　　　　}
//             this.choosenTabs= newValue; 
// 　　　　},  
// 　　　　deep: true  
// 　　}, 
　　
　
      'curPage':function(){
        this.$root.eventHub.$emit('myclick',this.choosenTabs[this.curPage].index)
      },
      
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped rel="stylesheet/scss">
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  li {
    display: inline-block;
  }

  a {
    color: #42b983;
  }

  $frontTabNum: 3;
  $tabbarHeight: 2rem;

  .tab {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: white;
    -webkit-transform: translateZ(0);
    -moz-transform: translateZ(0);
    -ms-transform: translateZ(0);
    -o-transform: translateZ(0);
    transform: translateZ(0);

    $margin: 0.5rem; //通过此变量调节“+”的大小
    .tab-more {
      position: absolute;
      top: 0;
      right: 0;
      width: $tabbarHeight;
      height: $tabbarHeight;
      background-color: white;
      box-shadow: -0.75rem 0rem 0.75rem -0.125rem white;

      &:before {
        content: '';
        position: absolute;
        top: $margin;
        right: $margin;
        width: $tabbarHeight - 2 * $margin;
        height: $tabbarHeight - 2 * $margin;
        background-image: url(./assets/tabmore.png);
        background-size: contain;
        background-repeat: no-repeat;
      }
    }

    .tab-top {
      position: absolute;
      top: 0;
      left: 0;
      width: $tabbarHeight;
      height: $tabbarHeight;
      background-color: white;
      box-shadow: -0.75rem 0rem 0.75rem -0.125rem white;

      &:before {
        content: '';
        position: absolute;
        top: $margin;
        right: $margin;
        width: $tabbarHeight - 2 * $margin;
        height: $tabbarHeight - 2 * $margin;
        background-image: url(./assets/tabmore.png);
        background-size: contain;
        background-repeat: no-repeat;
      }
    }

    .tab-container {
      position: absolute;
      width: calc(100% - 2rem);
      overflow: scroll;
    }

    .tab-bar {
      position: relative;
      width: $frontTabNum * 20%;
      min-width: 100%;
      height: 2rem;
      line-height: 2rem;

      .tab-indicator {
        position: absolute;
        margin: 0 calc($temp - 6rem);
        left: 0;
        bottom: 0;
        width: 3rem;
        height: 0.125rem;
        background-color: #FA5876;
        transition: 0.3s
      }

      .tab-front {
        display: inline-block;
        width: 100% / $frontTabNum;
       
      }

      .tabfrontactive {
        color: #FA5876;
        font-size:1.2em;
      }
    }

    .fullpage {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #F2F2F2;
      z-index: 999;
      overflow: scroll;
      .fullpage-close {
        position: absolute;
        $margin: 0.3rem;
        top: 1rem + $margin;
        right: 0 + $margin;
        width: 2rem - 2 * $margin;
        height: 2rem - 2 * $margin;
        background-image: url('./assets/close.png');
        background-size: contain;
        background-repeat: no-repeat;
      }

      .tab-choosen {
        margin-top: 4rem;
        

        .tabDelete {
          content: "";
          position: absolute;
          top: -0.6rem;
          right: -0.6rem;
          width: 1.2rem;
          height: 1.2rem;
          background-image: url(./assets/delete.png);
          background-size: contain;
          background-repeat: no-repeat;
        }

        // .defaultTab {
        //   color: gray;
        // }

        .virtual-tab {
          position: absolute;
          opacity: 0.5;
          transform: translateX(-50%) translateY(-50%);
        }
      }
      .tab-recommend {
        margin-top: 1rem;
      }
      .fullpage-title {
        font-weight: bold;
      }
      .tab-option {
        position: relative;
        display: inline-block;
        width: 5rem;
        margin: 0.5rem 0.5rem;
        line-height: 2rem;
        border-radius: 0.5rem;
        border: 1px solid #E2E2E2;
        background-color: white;
      }

      .flip-list-move {
        transition: 0.2s;
      }
    }

    .show {
      top: 0;
    }

    .trans {
      transition: 0.3s;
    }

    .slide-fade-enter-active {
      transition: all .2s ease;
    }
    .slide-fade-leave-active {
      transition: all .2s ease;
    }
    .slide-fade-enter, .slide-fade-leave-to {
      transform: translateY(20px);
      opacity: 0;
    }
   
    .content {
      position: absolute;
      top: 2rem;
      left: 0;
      bottom: 0;
      width: 200%;

      .page {
        position: relative;
        display: inline-block;
        width: 50%;
        height: 100%;
        vertical-align:top;
        background-color: #EEEEEE;
        transition: 1s;
        overflow-x: hidden;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;

        // .page-wrapper {
        //   overflow: hidden;
        // }

        .heightSized {
          height: 100%;
        }
      }
    }
  }

</style>
