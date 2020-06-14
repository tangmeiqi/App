<template>
  <div class="item">
    <div class="item-top" >
        <span class="order">订单编号：{{item.orderNumber}}</span>
        <button v-clipboard:copy="item.orderNumber" v-clipboard:success="onCopy" v-clipboard:error="onError">复制</button>
        <span style=" margin-left: 20px;">{{item.orderState}}</span>
        <div class="rotate" :style="whichStyle(item.type)">{{whichType(item.type)}}</div>
    </div>
    <div class="item-content">
      <div v-for="(item,index) in item.goodsList" :key="index" class="item-inner">
        <!-- <i class="iconfont">&#xe600;</i> -->
        <div class="img" :style="{backgroundImage:'url('+url(item.pddUrl)+')'}"></div>
        <div class="name">{{item.goodsName}}</div>
        <div class="price">￥{{item.goodsPrice}}元</div>
      </div>
    </div>
    <div class="item-bottom" >
        <span>时间:{{timetrans(item.createTime)}}</span>
        <span>数量:{{item.goodsList.length}}</span>
      </div>
  </div>
</template>

<script>

export default {
  props: ['item'],
  components: {
  },
  data () {
    return {
      tbUrl: require('./assets/timg.jpg'),
    }
  },
  computed: {
    
  },
  methods: {
    
    whichType(type){
      switch (type) {
        case 'ownOrderList': 
          return '自己订单'
          break
        case 'ownPayOrderList': 
          return '自己订单'
          break
        case 'ownCloseOrderList': 
          return '自己订单'
          break
        case 'ownLostOrderList': 
          return '自己订单'
          break
        case 'puserOrderList' : 
          return '粉丝订单'
          break
        case 'puserPayOrderList' : 
          return '粉丝订单'
          break
        case 'puserCloseOrderList' : 
          return '粉丝订单'
          break
        case 'puserLostOrderList' : 
          return '粉丝订单'
          break
        
        case 'tuserOrderList': 
          return '推荐订单'
          break
        case 'tuserPayOrderList': 
          return '推荐订单'
          break
        case 'tuserCloseOrderList': 
          return '推荐订单'
          break
        case 'tuserLostOrderList': 
          return '推荐订单'
          break
        case 'shareOrderList': 
          return '分享订单'
          break
        case 'sharePayOrderList': 
          return '分享订单'
          break
        case 'shareCloseOrderList': 
          return '分享订单'
          break
        case 'shareLostOrderList': 
          return '分享订单'
          break
      }
    },
    whichStyle(type){
      switch (type) {
        case 'ownOrderList': 
          return 'background-color: green;'
          break
        case 'ownPayOrderList': 
          return 'background-color: green;'
          break
        case 'ownCloseOrderList': 
          return 'background-color: green;'
          break
        case 'ownLostOrderList': 
          return 'background-color: green;'
          break
        case 'puserOrderList' : 
          return 'background-color: pink;'
          break
        case 'puserPayOrderList' : 
          return 'background-color: pink;'
          break
        case 'puserCloseOrderList' : 
          return 'background-color: pink;'
          break
        case 'puserLostOrderList' : 
          return 'background-color: pink;'
          break
        
        case 'tuserOrderList': 
          return 'background-color: blue;'
          break
        case 'tuserPayOrderList': 
          return 'background-color: blue;'
          break
        case 'tuserCloseOrderList': 
          return 'background-color: blue;'
          break
        case 'tuserLostOrderList': 
          return 'background-color: blue;'
          break
        case 'shareOrderList': 
          return 'background-color: yellow;'
          break
        case 'sharePayOrderList': 
          return 'background-color: yellow;'
          break
        case 'shareCloseOrderList': 
          return 'background-color: yellow;'
          break
        case 'shareLostOrderList': 
          return 'background-color: yellow;'
          break
      }
    },
    timetrans(time){
      let date = new Date(time);//如果date为13位不需要乘1000
      let Y = date.getFullYear() + '-';
      let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
      let D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
      let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
      let m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
      let s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
      return Y+M+D+h+m+s;
    },
    onCopy: function(e) {
      this.$root.eventHub.$emit("showNotification", "已复制，请去提交订单页");
    },
    onError: function(e) {
      this.$root.eventHub.$emit("showNotification", "复制出错");
    },
    linktoItem: function () {

      this.$root.eventHub.$emit('pushToDetail')
      //把this.ownprop赋值给localStorage.item
      localStorage.item= JSON.stringify(this.ownprop)
      
      //本来就注释的this.$root.eventHub.$emit('toAppDate',this.ownprop)
    },
    url(pddUrl){
      return  pddUrl?pddUrl:this.tbUrl
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.item-top{
  position: relative;
  .order{
    // display:inline-block;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    max-width: 50%;
  }
  .rotate {
    position: absolute;
    right: -20px;
    top: 12px;
    width: 100px;
    margin-left: 15px;
    // background-color: yellow;
    text-align: center;
    transform: rotate(37deg);
    z-index: 100;
  }
  
}
button {
      margin-left: 5px;
      border: 1px solid #bbb;
      border-radius: 5px;
      font-size: 0.8rem;
      outline: none;
    }
.item{
      margin:10px 0;
      background: #fff;
      overflow: hidden;
      .item-top{
        display: flex;
        // justify-content: space-between;
        padding: 10px;
        margin-bottom:2px;
        border-bottom:1px solid #ddd;
        &>:nth-child(2){
          color:#ff5000;
        }
      }
      .item-content{
        .item-inner{
          margin-bottom: 10px;
          position:relative;
          height: 50px;
          // display: flex;
          // justify-content: space-between;
          .img{
          position:absolute;
          left:10px;
          top:0;
          
          display: inline-block;
          vertical-align: top;
          width:3rem;
          height: 3rem;
          // background: url('./assets/timg.jpg') no-repeat;
          background-size:3rem;
        }
        .name{
          margin-left: 75px;
          margin-right: 100px;
          font-size:.9rem;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          line-height:1.8;
          letter-spacing: 1px;
          text-align: left;
        }
        .price{
          position:absolute;
          right:10px;
          top:0;
          font-size:.9rem;
        }
        }
        
        
      }
      .item-bottom{
        border-top:1px solid #ddd;
        display: flex;
        justify-content: space-between;
        padding:5px 10px;
      }   
}

  
</style>
