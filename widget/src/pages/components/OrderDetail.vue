<template>
  <div class="detail">
    <div class="dt-head">
      <div class="dt-h-back" @click="goback"></div>
      <span class="dt-h-title">搜索结果</span>
    </div>
    <div class="dt-body">
      <Ordershop  v-if="find" v-for="(item,index) in order" :key="index" :item="item"></Ordershop>
      <div v-if="notFind">没有找到对应的订单（＞人＜；）</div>
      <div class="spinner" v-show="loading"></div>
    </div>
  </div>
</template>

<script>
import Ordershop from "./Ordershop";
export default {
  name: "orderdetail",
  data() {
    return {
      loading: true,
      notFind: false,
      find: false,
      value: this.$route.query.value,
      item: this.$route.query.item,
      order: null
      // order: [
        //    {
        //    orderNumber:123456,
        //    status:'已付款',
        //    clickTime:'2017-08-16,13:42',
        //    goodsAmount:2,
        //    detail:
        //    [
        //      {name:'升入理解es6啊的撒法法大撒法马甲发生发生马发放吗沙发沙发',price:11789.6},
        //      {name:'升入理解es6啊的撒法法大撒法',price:789}
        //     ]
        //   },
      // ]
    };
  },

  watch: {
    "$route.query.value": "reSearch",
    "$route.query.item": "reSearch"
  },
  components: {
    // Tab
    Ordershop
  },
  methods: {
    goback: function() {
      history.go(-1);
    },
    reSearch() {
      this.value = this.$route.query.value;
      this.item = this.$route.query.item;
    },
    pushToOrderData(value) {
      this.value = value;
    },
    featchData() {
      if (this.item === "淘宝") {
        // this.show = true;
        fetch("http://47.97.153.221:8080/app/getTbOrderByOrderNumber", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: "orderNumber=" + this.value
        })
          .then(response => {
            if (response.ok) {
              return response.json();
            }
          })
          .then(json => {
            if (json.results[0] === null) {
              this.loading = false
              this.notFind = true
            } else {
              this.loading = false
              this.order = json.results;
              this.find = true
            }
          }).catch(err=>{
            console.log(err)
          })
      }
      if (this.item === "拼多多") {
        // this.show = true;
        fetch("http://47.97.153.221:8080/app/pddOrderByOrderNumber", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: "orderNumber=" + this.value
        })
          .then(response => {
            if (response.ok) {
              return response.json();
            }
          })
          .then(json => {
            if (!json.result) {
              this.loading = false
              this.notFind = true
            } else {
              this.loading = false
              //因为拼多多和淘宝订单数据格式不同，在这里转数据
              this.order.push(json.result);
              this.order[0].orderNumber = json.result.pddOrderId;
              let status = "";
              switch (json.result.status) {
                case 1:
                  status = "付款";
                  break;
                case 2:
                  status = "已结算";
                  break;
                case 3:
                  status = "已失效";
                  break;
              }
              this.order[0].orderState = status;
              this.order[0].goodsList = [];
              this.order[0].goodsList.push({});
              this.order[0].goodsList[0].goodsName = json.result.pddGoodsName;
              this.order[0].goodsList[0].goodsPrice = json.result.pddGoodsPrice;
              this.order[0].goodsList[0].pddUrl = json.result.pddGoodsThumburl;
              this.order[0].createTime = json.result.createtime;
              this.order[0].goodsList.length = 1;
              this.find = true
            }
          }).catch(err=>{
            console.log(err)
          })
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.featchData();
    });
  },
  beforeRouteLeave(to, from, next) {
    this.order = [];
    this.$route.query.value = "";
    this.$route.query.item = "";
    next();
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped rel="stylesheet/scss">
.detail {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 3rem;
  bottom: 0;
  position: relative;
  height: 100%;
  background-color: #f1f1f1;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  z-index: 1;
}

$headH: 3rem;
.dt-head {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: $headH;
  background-color: #fb5776;
  padding-top: 1.5rem;
  $headTextH: 1.5rem;
  & > div {
    margin-top: ($headH - $headTextH) / 2;
  }
  .dt-h-back {
    float: left;
    margin-left: 0.5rem;
    width: 1.5rem;
    height: $headTextH;
    background-image: url(./assets/back.png);
    background-size: contain;
    background-repeat: no-repeat;
  }

  .dt-h-title {
    //      position: absolute;
    // top: 50%;
    // left: 50%;
    // transform:translateX(-50%);
    // transform:translateY(-50%);
    // margin-left: 50%;
    margin-left: -2rem;
    line-height: 3rem;
    width: 4rem;
    color: white;
    font-size: 1.2rem;
  }
}

.dt-body {
  position: absolute;
  top: 4.5rem;
  width: 100%;
  bottom: 0;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  div {
    margin-top: 20px;
    font-size: 18px;
  }
}
.dt-item {
  position: relative;
  // height: 8rem;
  height: 90%;
  padding: 0.5rem;
  background-color: white;
  text-align: left;
  display: flex;
  flex-flow: column wrap;
}
.spinner {
  width: 40px;
  height: 40px;
  background-color: #FA5876;

  margin: 100px auto;
  -webkit-animation: sk-rotateplane 1.2s infinite ease-in-out;
  animation: sk-rotateplane 1.2s infinite ease-in-out;
}

@-webkit-keyframes sk-rotateplane {
  0% { -webkit-transform: perspective(120px) }
  50% { -webkit-transform: perspective(120px) rotateY(180deg) }
  100% { -webkit-transform: perspective(120px) rotateY(180deg)  rotateX(180deg) }
}

@keyframes sk-rotateplane {
  0% { 
    transform: perspective(120px) rotateX(0deg) rotateY(0deg);
    -webkit-transform: perspective(120px) rotateX(0deg) rotateY(0deg) 
  } 50% { 
    transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
    -webkit-transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg) 
  } 100% { 
    transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
    -webkit-transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
  }
}
</style>
