<template>
  <div id="app">
    <transition name="shake-in">
      <div class="notification" v-show="notiShow">{{notiInfo}}</div>
    </transition>
    <!-- <transition name="packet-in"> -->
      <!-- 注册会有钱包 -->
      <div class="registerMoney" v-show="packetShow">
      <!-- 注册奖金提示 -->
        <div class="packetClose" @click="closePacket"></div>
        <div class="packetText">
          <div class="packetAmount">{{registerMoney.toFixed(2)}}</div>
          <div class="packetRules">注册奖励红包</div>
        </div>
      </div>
    <!-- </transition> -->
    
    <!--keep-alive缓存组件，不重复加载-->
    <!--2.1.0后提供了include/exclude两个属性 可以针对性缓存相应的组件-->
    <keep-alive exclude="'detail'">
      <!--路由的内容将被渲染在view中。-->
      <!--$route.path路由路径-->
      <router-view :key="$route.path"></router-view>
    </keep-alive>
      <!--底栏Tabfooter-->
    <tabfooter></tabfooter>
  </div>
</template>

<script>

import Tabfooter from '../../components/Tabfooter'

export default {
  name: 'app',
  components: {
    Tabfooter
  },
  data () {
    return {
      notiShow: false,
      packetShow:false,
      notiInfo: '',
      itemId:'',
      registerMoney:0
    }
  },
  methods: {
    showNotification(info, time = 3000) {
        if (!this.notiShow) {
          this.notiShow = true
          this.notiInfo = info
          setTimeout(() => {
            this.notiShow = false
          }, time)
        }
    },
    showPacket:function(money){
      this.packetShow=true;
      this.registerMoney=money;
    },
    closePacket:function(){
      this.packetShow=false;
    },
    assignData:function(item){
      this.$root.eventHub.$emit('toDetailDate',item)
    }
  },
  mounted () {
    /*放到index页面*/
//  某一个组件内调用事件触发
    this.$root.eventHub.$emit('pushToIndex')
    /*监听动画*/
    this.$root.eventHub.$on('showNotification', this.showNotification)
    this.$root.eventHub.$on('showPacket',this.showPacket)
    
  },
  updated(){
    this.$root.eventHub.$on('toAppDate',this.assignData)
   
  }
}
</script>

<style lang='scss'>

html, body {
  overflow: hidden;
}

body * {
  max-height: 999999px;   // overflow在hidden和scroll切换的时候字体会自动改变，可以用这个方法解决.
}

body {
  margin: 0;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
a, img, button, input, textarea, div, li {
  -webkit-tap-highlight-color:rgba(255,255,255,0);
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  color: #2c3e50;
  overflow: hidden;
  font-size: 1rem;
}


.notification {
  position:absolute;
  display:inline-block;
  padding:0 0.5rem;
  top:48.2%;
  transform: translateX(-50%);
  left:50%;
  height: 2rem;
  line-height: 2rem;
  background-color: black;
  opacity: 0.5;
  color: white;
  z-index: 999999;
  border-radius: 0.5rem;
}
/*过渡动画*/
.shake-in-enter-active {
  animation: shake 10s
}

@keyframes shake {
  from {transform: translateX(calc(-50% + 0));}
  10% {transform: translateX(calc(-50% - 1rem));}
  30% {transform: translateX(calc(-50% + 1rem));}
  50% {transform: translateX(calc(-50% - 1rem));}
  80% {transform: translateX(calc(-50% + 1rem));}
  to {transform: translateX(calc(-50% + 0));}
}


@-moz-keyframes shake /* Firefox */
{
from {transform: translateX(0);}
10% {transform: translateX(-5px);}
30% {transform: translateX(5px);}
50% {transform: translateX(-5px);}
80% {transform: translateX(5px);}
to {transform: translateX(0);}
}

@-webkit-keyframes shake /* Safari 和 Chrome */
{
from {transform: translateX(0);}
10% {transform: translateX(-5px);}
30% {transform: translateX(5px);}
50% {transform: translateX(-5px);}
80% {transform: translateX(5px);}
to {transform: translateX(0);}
}

@-o-keyframes shake /* Opera */
{
from {transform: translateX(0);}
10% {transform: translateX(-5px);}
30% {transform: translateX(5px);}
50% {transform: translateX(-5px);}
80% {transform: translateX(5px);}
to {transform: translateX(0);}
}
// .packet-in-enter-active, .packet-in-leave-active {
//   transition: all .4s ease;
// }
// .packet-in-enter {
//   transform: translateY(100%);
// }
// .packet-in-leave-to {
//   transform: translateY(100%);
// }

.registerMoney{
  height:262px;
  width:203px;
  background-image: url(../../components/assets/packet.png);
  background-size: contain;
  background-repeat: no-repeat;
  border-radius: 15px;
  z-index:2;
 // text-align:center;
  position:absolute;
  top:30%;
  left:50%;
  transform:translateX(-50%);
 // animation:enter .5s ease;
}
// @keyframes enter {
//   from {opacity:0;}
//   to {opacity:1;}
// }
.packetClose{
  position: absolute;
  width: 1.5rem;
  height: 1.5rem;
  right: .5rem;
  top: .5rem;
  z-index: 1;
  background-image: url(../../components/assets/close.png);
  background-size: contain;
  background-repeat: no-repeat;
}
.packetText{
  margin-top:90px;
  color:yellow;
  .packetAmount{
    font-size:4.5rem;
  }
  .packetRules{
    font-size:1.3rem;
  }
}
</style>
