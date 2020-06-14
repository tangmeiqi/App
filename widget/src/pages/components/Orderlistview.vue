<template>
  <div class="order" >
    <div class="button">
      <li  :class="{active:current===index}" v-for="(item,index) in list" :key="index" :id="'taobao'+index" @click="clickFetch($event,index,item.name)">{{item.name}}</li>
    </div>
    <div class="item-wrapper">
      <Ordershop  v-for="(item,index) in order" :key="index" :item="item"></Ordershop>
      <div class="no-record" v-show="show">啊哦，你还没有对应订单信息<br>（＞人＜；）</div>
    </div>
  </div>
</template>

<script>
import Ordershop from "./Ordershop";
import Pdd from "@/common/js/service.js";
export default {
  name: "Orderlistview",
  props: ["ownprop", "item"],
  components: {
    Ordershop
  },
  data() {
    return {
      show:false,
      current: 0,
      // user: JSON.parse(localStorage.userInfo),
      user: localStorage.userInfo ? JSON.parse(localStorage.userInfo) : '{}',
      userId: "",
      // prop:this.item,
      list: [
        { name: "基础订单" },
        { name: "分享订单" },
        // { name: "直属粉丝订单" },
        // { name: "推荐粉丝订单" }
      ],
      order: [
        {
         orderNumber:12345721412412342142134312443,
         orderState:'已付款',
         createTime:'2019-01-16,13:42',
         number:2,
         goodsList:
         [
           {goodsName:'上好佳烈焰五杀薯条',goodsPrice:4.5,pddUrl:'https://dummyimage.com/221x221/4da67e/26ef6'},
           {goodsName:'好吃点香脆核桃饼',goodsPrice:3,pddUrl:'https://dummyimage.com/221x221/4da67e/26ef6'}
          ]
        },
      ]
    };
  },
  created() {
    console.log('订单管理执行了吗')
    this.featchData();
    // this.prop=this.item;
  },
  mounted() {},
  // beforeRouteEnter (to, from, next) {
  //    next(vm => {
  //     vm.featchData();
  //   })
  // },
  methods: {
    featchData() {
      // let userInfo = JSON.parse(localStorage.userInfo);
      let userInfo = localStorage.userInfo ? JSON.parse(localStorage.userInfo) : '{}';
      var userId=localStorage.userInfo?JSON.parse(localStorage.userInfo).userId:'';
      // if ((this.item === "淘宝")) {
      //   this.userId = `${userInfo.userId}`;
      //   if (userInfo.vipgrade === 1 || userInfo.vipgrade === 2) {
      //     this.list = this.list.slice(0, 2);
      //   }
      //   switch (this.ownprop) {
      //     case "全部":
      //       this.type = "1";
      //       break;
      //     case "付款":
      //       this.type = "4";
      //       break;
      //     case "已结算":
      //       this.type = "7";
      //       break;
      //     case "已失效":
      //       this.type = "10";
      //       break;
      //   }
      //   fetch("http://47.97.153.221:8080/app/getTbOrderList", {
      //     method: "POST",
      //     headers: { "Content-Type": "application/x-www-form-urlencoded" },
      //     body: "type=" + this.type + "&userId=" + this.userId
      //   })
      //     .then(response => {
      //       if (response.ok) {
      //         return response.json();
      //       }
      //     })
      //     .then(json => {
      //       this.order = json.results;
      //     }).catch(err=>{
      //       console.log(err)
      //     }).catch(err=>{
      //       console.log(err)
      //     })
      // }
      if ((this.item === "拼多多")) {
        this.userId = userId;
        // if (userInfo.vipgrade === 1 || userInfo.vipgrade === 2) {
        //   this.list = this.list.slice(0, 2);
        // }
        switch (this.ownprop) {
          case "全部":
            this.type = "11";
            break;
          case "付款":
            this.type = "21";
            break;
          case "已结算":
            this.type = "31";
            break;
          case "已失效":
            this.type = "41";
            break;
        }
        Pdd.getPddOrderList( this.type,this.userId)
          .then(json => {
          console.log('订单展示：',json)
          this.order = []
            for(let key in json.result) {
              let value = json.result[key]
              if(value.length!==0){
                for(const [index,val] of value.entries()){
                  val['type'] = key
                }
              }else {
              }
              this.order= this.order.concat(value)
            }
            for (let i = 0; i < this.order.length; i++) {
              this.order[i].orderNumber = this.order[i].pddOrderId;
              let status = ''
              switch(this.order[i].status) {
                case 1:
                  status = '付款'
                  break
                case 2:
                  status = '已结算'
                  break
                case 3:
                  status = '已失效'
                  break
              } ;
              this.order[i].orderState = status
              this.order[i].goodsList = [];
              this.order[i].goodsList.push({});
              this.order[i].goodsList[0].goodsName = this.order[i].pddGoodsName;
              this.order[i].goodsList[0].goodsPrice = this.order[i].pddGoodsPrice;
              this.order[i].goodsList[0].pddUrl = this.order[i].pddGoodsThumburl;
              this.order[i].createTime = this.order[i].createtime;
              this.order[i].goodsList.length = 1;
            }
            let count = 0
            for(let key in json.result){
              if(json.result[key].length!==0){
                count++
              }
            }
            if (count === 0) {
              // this.$root.eventHub.$emit("showNotification", "没有相关数据");
              this.show = true
            }else{
              this.show = false
            }
        })
        
      }
    },
    clickFetch(e, index, name) {
      let userInfo = localStorage.userInfo ? JSON.parse(localStorage.userInfo) : '{}';
      this.current = index;
      // if ((this.item === "淘宝")) {
      //   this.userId = `${userInfo.userId}`;
      //   switch (this.ownprop) {
      //     case "全部":
      //       if (index === 0) {
      //         this.type = "1";
      //       }
      //       if (index === 1) {
      //         this.type = "2";
      //       }
      //       if (index === 2) {
      //         this.type = "3";
      //       }
      //       break;
      //     case "付款":
      //       if (index === 0) {
      //         this.type = "4";
      //       }
      //       if (index === 1) {
      //         this.type = "5";
      //       }
      //       if (index === 2) {
      //         this.type = "6";
      //       }
      //       break;
      //     case "已结算":
      //       if (index === 0) {
      //         this.type = "7";
      //       }
      //       if (index === 1) {
      //         this.type = "8";
      //       }
      //       if (index === 2) {
      //         this.type = "9";
      //       }
      //       break;
      //     case "已失效":
      //       if (index === 0) {
      //         this.type = "10";
      //       }
      //       if (index === 1) {
      //         this.type = "11";
      //       }
      //       if (index === 2) {
      //         this.type = "12";
      //       }
      //       break;
      //   }
      //   ;
      //   fetch("http://47.97.153.221:8080/app/getTbOrderList", {
      //     method: "POST",
      //     headers: { "Content-Type": "application/x-www-form-urlencoded" },
      //     body: "type=" + this.type + "&userId=" + this.userId
      //   })
      //     .then(response => {
      //       if (response.ok) {
      //         return response.json();
      //       }
      //     })
      //     .then(json => {
      //       this.order = json.results;
      //       if (json.results.length === 0) {
      //         // this.$root.eventHub.$emit("showNotification", "没有相关数据");
      //         this.show = true
      //       }else{
      //         this.show = false
      //       }
      //     }).catch(err=>{
      //       console.log(err)
      //     })
      // }
      if ((this.item === "拼多多")) {
        this.userId = "12345";
        switch (this.ownprop) {
          case "全部":
            if (index === 0) {
              this.type = "11";
            }
            if (index === 1) {
              this.type = "12";
            }
            // if (index === 2) {
            //   this.type = "3";
            // }
            break;
          case "付款":
            if (index === 0) {
              this.type = "21";
            }
            if (index === 1) {
              this.type = "22";
            }
            // if (index === 2) {
            //   this.type = "6";
            // }
            break;
          case "已结算":
            if (index === 0) {
              this.type = "31";
            }
            if (index === 1) {
              this.type = "32";
            }
            // if (index === 2) {
            //   this.type = "9";
            // }
            break;
          case "已失效":
            if (index === 0) {
              this.type = "41";
            }
            if (index === 1) {
              this.type = "42";
            }
            // if (index === 2) {
            //   this.type = "12";
            // }
            break;
        }
        ;
        // fetch("http://47.97.153.221:8080/app/getPddOrderList", {
        //   method: "POST",
        //   headers: { "Content-Type": "application/x-www-form-urlencoded" },
        //   body: "type=" + this.type + "&userId=" + this.userId
        // })
          // .then(response => {
          //   if (response.ok) {
          //     return response.json();
          //   }
          // })
          Pdd.getPddOrderList( this.type,this.userId)
          .then(json => {
            // this.order = json.result;
            this.order = []
            for(let key in json.result) {
              let value = json.result[key]
              if(value.length!==0){
                for(const [index,val] of value.entries()){
                  val['type'] = key
                }
              }else {
                // value.push({key:key})
              }
              this.order= this.order.concat(value)
            }
            // this.order.push(json.result)
            for (let i = 0; i < this.order.length; i++) {
              this.order[i].orderNumber = this.order[i].pddOrderId;
              let status = ''
              switch(this.order[i].status) {
                case 1:
                  status = '付款'
                  break
                case 2:
                  status = '已结算'
                  break
                case 3:
                  status = '已失效'
                  break
              };
              this.order[i].orderState = status
              this.order[i].goodsList = [];
              this.order[i].goodsList.push({});
              this.order[i].goodsList[0].goodsName = this.order[i].pddGoodsName;
              this.order[i].goodsList[0].goodsPrice = this.order[i].pddGoodsPrice;
              this.order[i].goodsList[0].pddUrl = this.order[i].pddGoodsThumburl;
              this.order[i].createTime = this.order[i].createtime;
              this.order[i].goodsList.length = 1;
            }
            let count = 0
            for(let key in json.result){
              if(json.result[key].length!==0){
                count++
              }
            }
            if (count === 0) {
              // this.$root.eventHub.$emit("showNotification", "没有相关数据");
              this.show = true
            }else{
              this.show = false
            }
          })
      }
    }
  }
};

// beforeRouteEnter(to, from, next) {
//       next(vm => {
//           vm.featchData();
// //           // this.$root.eventHub.$on('pushToOrderData', this.pushToOrderData)
// //           // vm.initMark();
        
         
//       })
// };
//   beforeRouteLeave(to, from, next) {
//       // this.marked = false;
//       // next();
  // },
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.no-record {
  position: absolute;
  top: 30%;
  width: 100%;
  color: #FD8298;
  text-align: center;
}
.button {
  display: flex;
  justify-content: space-around;
  margin-bottom: 10px;
  li {
    // border:1px solid #ffca28;
    border-radius: 5px;
    padding: 2px;
    border-bottom: 1px solid #ddd;
    // color:#777;
  }
  li.active {
    border-bottom: 1px solid red;
  }
}
.item-wrapper {
  position: relative;
  height: calc(100vh - 167px);
  overflow-y: auto;
  background: #ddd;
}
</style>
