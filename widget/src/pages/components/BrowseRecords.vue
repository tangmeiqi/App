<template>
  <div class="browserecords">
    <div id="top">
        <div id="back" @click="back"></div>
        <div id="text">我的浏览</div>
        <div id="clear" @click="deleteData"></div>
    </div>
     <!-- <div id="choose">
        <div id="shangpin" @click="show = 0" :class="{active: show === 0}">淘宝</div>
        <div id="dianpu" @click="show = 1" :class="{active: show === 1}">拼多多</div>
        <div id="indicator" :style="{left: indicatorLeft}"></div>
    </div>  -->
    <!-- <div class="auto-src">
      <span class="auto-src-tab" :style="{width: srcWidth}" :class="{activeSrc: index===curSrc}"
      v-for="(item,index) in tab" :key="index" @click="forwardTo(index)">{{item}}</span>
      <span class="src-indicator" :style="{transform: indicatorLeft, width: srcWidth}"></span>
    </div> -->
      <div id="content">
        <div id="goods">
          <!-- <div>
            <div class="no-record" v-show="show === 0&&show1 === 0">啊哦，这里空空如也,<br>快去浏览一下优惠商品吧~</div> 
            <ul v-for="(listItem, index) in tbdata" :key="index"
                is="Shop" :ownprop="listItem" v-show="show === 0&&show1 === 1">
            </ul>  
          </div> -->
          <!-- show是区别淘宝还是拼多多，0是点击淘宝，1是拼多多，show1是每个商品是否有浏览记录，0是没有浏览记录，1是有浏览记录 -->
          <div>
            <div class="no-record" v-show="show1 === 0">啊哦，这里空空如也,<br>快去浏览一下优惠商品吧~</div> 
            <ul v-for="(listItem, index) in pdddata" :key="index"
                is="Item" :ownprop="listItem" v-show="show1 === 1">
            </ul>
          </div>
        </div>
    </div>  
  </div>
</template>

<script>
import Shop from "./Shop"
import Item from "./Item"
export default {
  name: 'browserecords',
  props: [],
  components: {
      'Shop':Shop,
      'Item':Item
  },
  data () {
    return {
      tbdata: [],
      pdddata:[],
      show: 0,
      show1:0,
      // tab:['淘宝','拼多多'],
      curSrc: 0,
      //frontStar: require('./assets/frontstar.png'),
    //   backStar: require('./assets/backstar.png')
    }
  },
  computed: {
    // indicatorLeft: function () {
    //   return 'translateX(' + (this.curSrc * (1 / this.tab.length * document.body.offsetWidth)) + 'px)'
    // },
    //  srcWidth: function () {
    //   return 100 / this.tab.length + '%'
    // }
  },
  methods: {
    back: function () {
      window.history.back(-1)
    },
    //  forwardTo: function (index) {
    //   this.curSrc = index;
    //   this.show=index;
    // },
    fetchData: function () {
      //其他地方赋值给了localStorage.browseHistory
      // this.tbdata= localStorage.browseHistory?JSON.parse(localStorage.browseHistory):[]
      this.pdddata = localStorage.pddbrowseHistory?JSON.parse(localStorage.pddbrowseHistory):[]
      // if(this.tbdata.length==0){
      //   this.show1=0;
      // }else{
      //   this.show1=1;
      // }
      if(this.pdddata.length==0){
        this.show1=0;
      }else{
        this.show1=1;
      }
      
      
    },
    deleteData: function () {
       let result=confirm('确定清空浏览记录吗？');
      // if(this.tbdata.length!==0){
      //   if(result){
      //       this.tbdata = [];
      //       this.show1=0;
      //       localStorage.browseHistory = '[]'
      //   }
      // } 
      if(this.pdddata.length!==0){
        if(result){
            this.pdddata = [];
            this.show1=0;
            localStorage.pddbrowseHistory = '[]'
        }
      } 
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.fetchData()
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}
.browserecords {
  position: relative;
  height: 100%;
  z-index: 1;
  text-align: left;
}
.no-record {
  position: absolute;
  top: 30%;
  width: 100%;
  color: #AAA;
  text-align: center;
}
a {
  color: #42b983;
}
#top{
    position: relative;
    background-color:#FA5876;
    height: 5rem;
}
#back{
    position: absolute;
    width: 1.5rem;
    height: 1.5rem;
    left: 1rem;
    top: 2.5rem;
    z-index: 1;
    background-image: url(./assets/back.png);
    background-size: contain;
    background-repeat: no-repeat;
}
#text{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 6.4rem;
    line-height: 6.5rem;
    font-size:1.2rem;
    color: #FFFFFF;
    text-align: center;
}
#clear {
    position: absolute;
    right: 0.5rem;
    top: 2.4rem;
    background-image: url(./assets/dump2.png);
    width: 1.75rem;
    height: 1.75rem;
    background-size: contain;
    background-repeat: no-repeat;
}
.auto-src {
  position: relative;
  height: 2rem;
  border-bottom: 1px solid #DDD;

  .auto-src-tab {
    line-height: 2rem;
    display: inline-block;
    text-align:center;
  }

  .activeSrc {
    color: #FA5876;
  }

  .src-indicator {
    position: absolute;
    left: 0;
    bottom: 0;
    height: 2px;
    transition: .3s;

    &:before {
      content: '';
      display: block;
      margin: 0 auto;
      width: 61.8%;
      height: 100%;
      background-color: #FA5876;
    }
  }
}
// #choose{
//     position: relative;
//     height: 2rem;
// }
// .active {
//   color: #42b983;
// }
// #indicator {
//   position: absolute;
//   box-sizing: border-box;
//   width: 4rem;
//   height: 2px;
//   left: 0;
//   bottom: 0;
//   background-color: #42b983;
//   transition: .3s ease-in-out;//过渡属性默认值是all
// }
// #shangpin{
//     position:absolute;
//     width:50%;
//     top:5px;
//     text-align: center;
// }
// #dianpu{
//     position:absolute;
//     left:50%;
//     top:5px;
//     width: 50%;
//     text-align: center;
// }
#content{
    position: absolute;
    width: 100%;
    top: 5rem;
    bottom: 0px;
    background-color: #F0F0F0;
}
#goods{
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
    background-color: #F0F0F0;
    overflow: scroll;
    z-index: 1;
}
// .goods_records {
//     position: relative;
//     width: 100%;
//     height: 128px;
//     border-bottom: 1px #eee solid;
//     background-color: white;
// }
// .img_goods{
//     position: absolute;
//     left:8px;
//     top:8px;
//     width:112px;
//     height: 112px;
// }
// #img1{
//     width: 112px;
//     height: 112px;
// }
// .goods_name{
//     position: absolute;
//     left:128px;
//     top:8px;
// }
// .price{
//     position: absolute;
//     left:128px;
//     bottom: .5rem;
//     color: #FA5876;
//     font-size: 1.25rem;
    
//     &:before {
//         content: '￥';
//         font-size: 1rem;
//     }

//     span{
//         color: #BBB;
//         font-size: .875rem;
//     }
// }
// .sales{
//     position: absolute;
//     right: .5rem;
//     bottom: .5rem;
//     color: #BBB;
//     font-size: 1rem;
// }

// #shop{
//     position: absolute;
//     top: 0;
//     left: 0;
//     right: 0;
//     bottom: 0;
//     overflow: scroll;
//     background-color: white;
//     z-index: 0;
// }
// .shop_records{
//     position: relative;
//     height:128px;
//     border-bottom: 1px #eee solid;
// }
// .img_shop{
//     position: absolute;
//     left:8px;
//     top:8px;
//     width:112px;
//     height: 112px;
// }
// #img2{
//     width: 112px;
//     height: 112px;
// }
// .shopname{
//     position: absolute;
//     left: 128px;
//     top:8px;
// }
// .shopitem1,.shopitem2,.shopitem3{
//     position: absolute;
//     width: 300px;
//     height: 20px;
//     left:128px;
//     top:40px;
// }
// .shopitem2{
//     top:70px;
// }
// .shopitem3{
//     top:100px;
// }
// .miaoshu,.maijia,.wuliu{
//     font-size: 0.875rem;
//     width: 80px;
//     height: 20px;
// }
// .star1,.star2,.star3{
//     position:absolute;
//     left:80px;
//     top:2px;
// }
// .backstar{
//     position: absolute;
//     width:70px;
//     height:14px;
// }
// .frontstar{
//     position: absolute;
//     width:70px;
//     height: 14px;
// }
// .score1{
//     position: absolute;
//     left: 160px;
//     top:2px;
//     font-size: 0.875rem;
// }
</style>
