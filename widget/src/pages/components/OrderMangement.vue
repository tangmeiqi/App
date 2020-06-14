<template>
  <div class="order">
    <div class="top">
        <div id="text">订单管理</div>
        <div id="back" @click="back"></div>
    </div>
    <div id="content">
      <!-- <ul class="tab-container"> -->
        <!-- <li :class="{active:current===index}" @click="change(index)"  v-for="(item,index) in choosenTabs" :key="index">{{item.name}}</li> -->
        <!-- <li :class="{active:current===1}" @click="change(1)">拼多多</li> -->
      <!-- </ul> -->
      <div class="tab-content" :style="{width:contentWidth,transform:contentTransform}" >
        <div v-for="(item,index) in choosenTabs" :class="{active:current===index}" :key="index">
          <!-- <div> -->
            <!-- <Ordersearch :item="item.name"/> -->
            <!-- <input type="text" placeholder="搜索订单编号" v-model="value" @keyup.enter="submit"> -->
          <!-- </div> -->
          <ul class="tab-container-inner">
            <li :class="{active:currentInner===index}" @click="changeInner(index)" v-for="(item,index) in choosenTabsInner" :key="index">{{item.name}}</li>
            <!-- <li :class="{active:currentInner===1}" @click="changeInner(1)">已付款</li>
            <li :class="{active:currentInner===2}" @click="changeInner(2)">已结算</li>
            <li :class="{active:currentInner===3}" @click="changeInner(3)">已失效</li> -->
            <div id="indicator" :style="{left:indicatorLeft}"></div>
          </ul>
          <ul class="tab-content-inner" :style="{width:contentInnerWidth,transform:contentInnerTransform}">
            <Orderlistview v-for="(itemInner,index) in choosenTabsInner" :key="index" :ownprop="itemInner.name" :item="item.name" ></Orderlistview>
            <!-- <div class="order" v-for="(item,index) in choosenTabsInner" :key="index">
              <div class="button">
                <li>自己订单1</li>
                <li>直属粉丝订单</li>
                <li>推荐粉丝订单</li>
              </div>
              <div class="item-wrapper">
                <Ordershop  v-for="(item,index) in order" :key="index" :item=item></Ordershop>
              </div>
            </div> -->
            <!-- <div class="order">
              <div class="button">
                <li>自己订单1</li>
                <li>直属粉丝订单</li>
                <li>推荐粉丝订单</li>
              </div>
              <div class="item-wrapper">
                <Ordershop  v-for="(item,index) in order" :key="index" :item=item></Ordershop>
              </div>
            </div>
            <div class="order">
              <div class="button">
                <li>自己订单1</li>
                <li>直属粉丝订单</li>
                <li>推荐粉丝订单</li>
              </div>
              <div class="item-wrapper">
                <Ordershop  v-for="(item,index) in order" :key="index" :item=item></Ordershop>
              </div>
            </div>
            <div class="order">
              <div class="button">
                <li>自己订单1</li>
                <li>直属粉丝订单</li>
                <li>推荐粉丝订单</li>
              </div>
              <div class="item-wrapper">
                <Ordershop  v-for="(item,index) in order" :key="index" :item=item></Ordershop>
              </div>
            </div> -->
          </ul>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import Ordershop from './Ordershop'
import Ordersearch from './Ordersearch'
import Orderlistview from './Orderlistview'
export default {
  name: 'orderMangement',
  props: [],
  components: {
    Ordershop,
    Ordersearch,
    Orderlistview
  },
  data () {
    return {
     current:0,
     currentInner:0,
     pages:2,
     pagesInner:4,
     curX:0,
     curXInner:0,
    
     choosenTabs: [
      //  {name: '淘宝'},
       {name: '拼多多'}
      ],
      choosenTabsInner: [
       {name: '全部'},
       {name: '付款'},
       {name: '已结算'},
       {name: '已失效'},
      ],
     
    }
  },
  computed:{
     contentWidth(){
          return `${this.pages*100}%`
      },
      contentTransform(){
          return `translateX(${this.curX}px)`
      },
      contentInnerWidth(){
        return `${this.pagesInner*100}%`
      },
      contentInnerTransform(){
        return `translateX(${this.curXInner}px)`
      },
      indicatorLeft:function(){
         return `${this.currentInner*25}%`
        },
  },
  methods: {
    back: function () {
      window.history.back(-1)
    },
    change:function(index){
        this.current =index
        this.curX = -this.current*document.body.clientWidth
    },
    changeInner:function(index){
        this.currentInner =index
        this.curXInner = -this.currentInner*document.body.clientWidth
    },
      
  },
  // beforeRouteEnter (to, from, next) {
  //   next(vm => {
  //     vm.fetchData()
  //   })
  // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
*{margin:0;  padding:0;box-sizing:border-box;}
*::before{box-sizing: border-box;}
*::after{box-sizing:border-box;}

ul,ol{list-style:none;}
h1,h2,h3,h4,h5,h6{ font-weight:normal;}
a{text-decoration: none;color:inherit;}
img {vertical-align: top;}
input,button{border: 0;outline: none;}

.order {
    position: relative;
    height: 100%;
    z-index: 1;
    text-align: left;
    background-color: white;
    .top{
    position: relative;
    background-color:#FA5876;
    height: 5rem;
    #back {
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
    width: 100%;
    line-height: 6.5rem;
    font-size:1.2rem;
    color: #FFFFFF;
    text-align: center;
    } 
  }
  #content {
    position: absolute;
    width: 100%;
    top: 5rem;
    bottom: 0px;  
   //text-align: center; 
   .tab-container{
     display: flex;
     justify-content: space-between;
     
     li{
      //  width:50%;
      width:100%;
       text-align: center;
       padding: 10px;
       font-size:20px;
       border:1px solid #ddd;
     }
     li.active{
       color:#FA5876;
     }
   }
   .tab-content{
     display: flex;
     transition: .3s ease;
     &>div.active{
       z-index:2;
     }
     &>div{
       width: 100vw;

         &>div{
           margin: 0 auto;
           text-align: center;
           padding:15px 0;
           background: #EBEBEB;
           
         }
         .tab-container-inner{
           display: flex;
           justify-content: space-between;
           position:relative;
           margin-bottom: 10px;
           li{
             width: 25%;
             text-align: center;
             padding:10px;
           }
           li.active{
             color:#FA5876;
           }
           #indicator{
            position:absolute;
            left:0;
            bottom:0;
            width:25%;
            height:2px;
            background-color: #f35c05;
            z-index:1;
            transition: .3s ease
          }
         }
         .tab-content-inner{
           transition: .3s ease;
           display: flex;
           justify-content: space-between;
           
           &>div{
             width: 100%;
       
            position: relative;
            
            // -webkit-overflow-scrolling: touch;
            
           
           }
           
         }
     }
   }
}
}





</style>
