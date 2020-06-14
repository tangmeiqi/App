<template>
  <div class="buyrecords">
    <div class="top">
        <div id="text">订单管理</div>
        <div id="back" @click="back"></div>
    </div>
    <div id="content">
      <div id="order">
        <div>
        <img src="./assets/order.png" >
        <p>上传淘宝第一单，绑定特征码</p>
        <input type="text" placeholder="输入淘宝/天猫 订单号" v-model="orderNum">
        <button @click.prevent="submit">确认提交</button>
        <p class="warn">请务必确保提交的淘宝第一单编号正确</p>
        <p>此编码用来绑定用户，请勿随意填写</p>
        </div>
        
        <!-- <ul class="orderList" v-for="(item,index) in orderlist" :key="index">
          <li>提交时间：{{new Date(item.createTime).toLocaleString()}}</li>
          <li>订单号：{{item.orderNumber}}<span>{{item.orderState}}</span></li>
        </ul> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "buyrecords",
  props: [],
  components: {},
  data() {
    return {
      orderNum: "",
      orderlist: [],
      page: 1,
      userId: "",
      pageSize: 500
      // user:JSON.parse(localStorage.userInfo),
    };
  },
  methods: {
    back: function() {
      window.history.back(-1);
    },
    fetchData: function() {
      // let user = JSON.parse(localStorage.userInfo);
      let user = localStorage.userInfo ? JSON.parse(localStorage.userInfo) : '{}';
      let a = user.userId;
      this.userId = a ? a.toString() : '';
    },
    submit: function() {
      // let fd=new FormData();
      // fd.append('userId',1);
      // fd.append('orderNumber',this.orderNum)
      // let fd=[{
      //   'userId':this.userId,
      //   'orderNumber':this.orderNum
      // }]
      // if(this.orderNum)
      ;
      const reg = /\d{6,}/g;
      if (reg.test(this.orderNum)) {
        fetch("http://47.97.153.221:8080/app/good/inputFirstTbOrder", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          credentials: "include",
          body: "userId=" + this.userId + "&orderNumber=" + this.orderNum
        })
          .then(response => {
            if (response.ok) {
              return response.json();
            }
          })
          .then(json => {
            ;
            if (json.status === "1") {
              this.$root.eventHub.$emit("showNotification", "提交成功");
            } else if (json.message) {
              this.$root.eventHub.$emit("showNotification", json.message);
            }
          })
          .catch(err => {
            // this.$root.eventHub.$emit("showNotification", err);
            console.log(err)
          });
      }else{
        // 文字不完全显示？
        this.$root.eventHub.$emit("showNotification","订单号至少为6位数字");
      }
    }
  },
  mounted() {},
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.fetchData();
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.warn {
  color:#fa5876;
}
#content {
  position: absolute;
  width: 100%;
  top: 5rem;
  bottom: 0px;
  //text-align: center;
}
#content img {
  width: 100%;
}
#content button {
  padding: 15px 30px;
  border-radius: 15px;
  margin: 25px auto;
  background: #fff;
  border: 1px solid black;
  border-bottom: 5px solid #d5b50a;
  outline: none;
  font-size: 16px;
}
#content input {
  display: block;
  width: 80%;
  height: 2.4rem;
  margin: 0 auto;
  padding-left: 5px;
  border: 2px solid #bbb;
  border-radius: 8px;
  outline: none;
  font-size: 1rem;
}
#content p {
  font-size: 1rem;
}

.buyrecords {
  position: relative;
  height: 100%;
  z-index: 1;
  text-align: left;
  background-color: white;
}
.top {
  position: relative;
  background-color: #fa5876;
  height: 5rem;
}
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
#text {
  position: absolute;
  width: 100%;
  line-height: 6.5rem;
  font-size: 1.2rem;
  color: #ffffff;
  text-align: center;
}
#order {
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  //background-color: #F0F0F0;
  overflow: scroll;
  z-index: 1;

  & > div {
    margin-bottom: 10px;
    text-align: center;
  }
}
ul {
  border-top: 10px solid rgb(241, 240, 240);
  text-align: left;
  margin: 0;
  list-style-type: none;
  padding: 0;

  li:first-child {
    border-bottom: 1px solid #ddd;
    font-size: 0.85rem;
    height: 2rem;
    line-height: 2rem;
    padding: 0 10px;
    //width:100%;
  }
  li:last-child {
    //width:100%;
    height: 3rem;
    line-height: 3rem;
    padding: 0 10px;

    span {
      //margin-right:20px;
      float: right;
    }
  }
}
</style>
