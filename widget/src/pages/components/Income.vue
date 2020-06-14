<template>
  <div class="point-page">
    <div class="point-manage" v-show="show===0">
        <div class="top">
            <div class="point">收益管理</div>
            <div class="back" @click="back"></div>
            
        </div>

        <!--个人积分栏-->
        <!-- <div class="mypoint"> -->
            <!-- <div class="user_head"><div id="img" :style="{backgroundImage:'url('+avatar+')'}"></div></div> -->
            <!-- <div class="user_id">{{user.userName}}</div> -->
            <!-- <span class="user_id">ID:{{user.userName}}</span> -->
            <!-- <span class="user_level">{{level}}</span> -->
            <!-- <div class="level"><div class="user_level">{{user.point}}</div></div> -->
        <!-- </div> -->
        <!--我的资产-->
        <div class="balance">
              <span >￥{{nowMoney}}</span>
              <!-- <span  v-show="!user.loginOk">余额  ￥0</span> -->
              <span>累计收益结算(元)</span>
              <span>账户余额(元)：￥{{balance}}</span>
        </div>
        <div class="scrollbar">
          <div class="payment-content">
            <div >
                <div>上月预估收入(元)</div>
                <div>￥{{lastPayEstIncome}}</div>
                <div v-show="lastStatus" style="color:#FA5876">待结算</div>
                <div v-show="!lastStatus" style="color:green">已结算</div>        
            </div>
            <div>
                <div>本月预估收入(元)</div>
                <div>￥{{NowPayEstIncome}}</div>
                <div v-show="nowStatus" style="color:#FA5876">待结算</div>
                <div v-show="!nowStatus" style="color:green">已结算</div> 
            </div>
        </div>
        <div class="myassets">
            <div class="tab">
              <div class="sticky">
                <ul class="tab-container">
                    <li :class="{active:current===0}" @click="change(0)">今日</li>
                    <li :class="{active:current===1}" @click="change(1)">昨日</li>
                    <li :class="{active:current===2}" @click="change(2)">本月</li>
                    <li :class="{active:current===3}" @click="change(3)">上月</li>
                    <div id="indicator" :style="{left:indicatorLeft}"></div>
                </ul>
              </div>
                
                <ul class="tab-content" :style="{width:contentWidth,transform:contentTransform}" :class="{trans:untouching}">
                    <li v-for="(item,index) in income" :key="index" @touchstart="touchstart($event)" @touchmove="touchmove($event)" @touchend="touchend($event)">
                        <div class="payment">
                            <i class="iconfont">&#xe6db;</i>
                            <span>付款</span>
                        </div>
                        <div class="payment-content">
                            <div >
                                <div>付款笔数</div>
                                <div>{{item.payNumber}}笔</div>   
                            </div>
                            <div >
                                <div>付款预估收入</div>
                                <div>￥{{item.payEstIncome}}</div>
                            </div>
                        </div>
                        <div class="payment">
                            <i class="iconfont">&#xe6db;</i>
                            <span>失效</span>
                        </div>
                        <div class="payment-content">
                            <div >
                                <div>失效笔数</div>
                                <div>{{item.lostNumber}}笔</div>   
                            </div>
                            <div >
                                <div>失效预估收入</div>
                                <div>￥{{item.lostEstIncome}}</div>
                            </div>
                        </div>
                        
                        <div class="settleAccounts">
                            <i class="iconfont">&#xe646;</i>
                            <span>结算</span>
                        </div>
                        <div class="settleAccounts-content">
                            <div>
                                <div>结算笔数</div>
                                <div>{{item.settleNumber}}笔</div>
                            </div>
                            <div>
                                <div>结算预估收入</div>
                                <div>￥{{item.settleEstIncome}}</div>
                            </div>
                        </div>
                        <div class="footer" style="height:20px"></div>
                    </li>
                </ul>
            </div>
        </div>
         
          
            
        </div>
       
    </div>
   
  </div>
</template>

<script>

export default {
  name: 'pointpage',
  props: [],
  components: {
  },
  data () {
    return {
      lastPayEstIncome:0,
      NowPayEstIncome:0,
      balance:0,
      nowMoney:0,
      pointRate:0,
      avatar: require('./assets/user_center_default_head.png'),
      user: {
          userName:'',
          userId:'',
          userlevel:0
      },
      lastStatus: true,
      nowStatus: true,
      show:0,
      income:[
          {
                payNumber:0,
                payEstIncome:0,
                settleNumber:0,
                settleEstIncome:0,
          },
          {
                payNumber:0,
                payEstIncome:0,
                settleNumber:0,
                settleEstIncome:0,
          },
          {
                payNumber:0,
                payEstIncome:0,
                settleNumber:0,
                settleEstIncome:0,
          },
          {
                payNumber:0,
                payEstIncome:0,
                settleNumber:0,
                settleEstIncome:0,
          }
      ],
      current:0,
      pages:4,
      curX:0,
      scrollLen:0,
      verticalScroll:false,
      untouching:true,
      firstTouchmove:false,
    }
  },
  computed:{
    level(){
      switch (this.user.userlevel) {
        case 0: 
          return 0
          break
        case 1: 
          return '普通会员'
          break
        case 2: 
          return '超级会员'
          break
        case 8: 
          return '运营商'
          break
      }
    },
      indicatorLeft:function(){
         return `${this.current*25}%`
        },
      contentWidth(){
          return `${this.pages*100}%`
      },
      contentTransform(){
          return `translateX(${this.curX+this.scrollLen}px)`
      }
  },
  methods: {
    nowMonth(){
        let nowdate = new Date();
        let y = nowdate.getFullYear();
        let m = (nowdate.getMonth() + 1 < 10
          ? "0" + (nowdate.getMonth() + 1)
          : nowdate.getMonth() + 1)
        let formatnowdate = y+''+m;
        return parseInt(formatnowdate)
    },
    lastMonth(){
        let nowdate = new Date();
         nowdate.setMonth(nowdate.getMonth()-1);
        let y = nowdate.getFullYear();
        let m = (nowdate.getMonth() + 1 < 10
          ? "0" + (nowdate.getMonth() + 1)
          : nowdate.getMonth() + 1)
        let formatnowdate = y+''+m
        return parseInt(formatnowdate)
    },
    change:function(index){
        this.current =index
        this.curX = -this.current*document.body.clientWidth
    },
     touchstart:function(e){
        //  alert(1)
                //触摸目标在页面中的x坐标
                this.startX=e.touches[0].pageX;
                this.startY=e.touches[0].pageY;
                //不是竖直
                this.verticalScroll=false;
                //没有动画
                this.untouching = false;
                //是第一次触摸
                this.firstTouchmove = true;
            },
            touchmove:function(e){
                if(this.firstTouchmove){
                    this.firstTouchmove=false;
                    //x方向滑的距离
                    let scrollX=e.touches[0].pageX-this.startX;
                    //取绝对值，你竖着滑
                    if(Math.abs(e.touches[0].pageY-this.startY) > Math.abs(scrollX)){
                        //竖着滑
                        this.verticalScroll=true;
                        return
                    }
                }
                if(!this.verticalScroll){
                    let scrollX=e.touches[0].pageX-this.startX;
                    this.scrollLen=scrollX;
                    e.preventDefault();
                    e.stopPropagation();
                }
            },
            touchend:function(e){
                
                if(this.scrollLen > document.body.clientWidth/4){
                    if(this.current>0){
                        this.current--
                    }
                    //向左滑 page++
                }else if(this.scrollLen < -(document.body.clientWidth/4)){
                 
                    if(this.current<this.pages-1){
                  
                        this.current++
                    }
                }
                //有动画
                this.untouching=true;
                //清空滑动距离
                this.scrollLen=0;
                this.curX= -this.current*document.body.clientWidth;
            },
    back: function () {
      window.history.back(-1)
    },
    fetchData: function () {
        // let objUser= JSON.parse(localStorage.userInfo);
        let objUser = localStorage.userInfo ? JSON.parse(localStorage.userInfo) : '{}';
        // this.user.userId=objUser.userId;
        this.user.userName =objUser.userId;
        this.user.userlevel = objUser.vipgrade
        console.log(this.user.userlevel)
        // this.avatar =objUser.headimgurl
        // this.user.userName=objUser.userName;
        // this.user.userId=objUser.userId;
        this.pointRate=this.$route.query.pointRate;
        //把这里userid 改成110
        
        fetch("http://47.97.153.221:8080/app/getUserIncome",{
            method:"POST",
            headers:{'Content-Type':'application/x-www-form-urlencoded'},
            credentials: 'include',
            // body:"userId="+objUser.userId
            body:"userId=12345"
        }).then((response) => {
            if (response.ok) {
            return response.json()
            }
        }).then((json) => {
            console.log(json.result)
            // this.income = json.result
            //由于和后台数据命名不一致这里改动
            this.income[0].payNumber =  json.result[0].tdPayNum || 0
            this.income[0].payEstIncome =  json.result[0].tdSettleEstIncome || 0
            this.income[0].lostNumber = json.result[0].tdLostNum || 0
            this.income[0].lostEstIncome = json.result[0].tdLostIncome || 0
            this.income[0].settleNumber =  json.result[0].tdSettleNumber || 0
            this.income[0].settleEstIncome =  json.result[0].tdPayEstIncome || 0

            this.income[1].payNumber =  json.result[1].ldPayEstIncome || 0
            this.income[1].payEstIncome =  json.result[1].ldSettleNumber || 0
            this.income[1].lostNumber = json.result[1].ldLostNum || 0
            this.income[1].lostEstIncome = json.result[1].ldLostIncome || 0
            this.income[1].settleNumber =  json.result[1].ldPayNum || 0
            this.income[1].settleEstIncome =  json.result[1].ldSettleEstIncome || 0

            this.income[2].payNumber =  json.result[2].tmPayNum || 0
            this.income[2].payEstIncome =  json.result[2].tmPayEstIncome || 0
            this.NowPayEstIncome = json.result[2].tmPayEstIncome || 0
            this.income[2].lostNumber = json.result[2].tmLostNum || 0
            this.income[2].lostEstIncome = json.result[2].tmLostIncome || 0
            this.income[2].settleNumber =  json.result[2].tmSettleNumber || 0
            this.income[2].settleEstIncome =  json.result[2].tmSettleEstIncome || 0

            this.income[3].payNumber =  json.result[3].tmPayNum || 0
            this.income[3].payEstIncome =  json.result[3].tmPayEstIncome || 0
            this.lastPayEstIncome = json.result[3].tmPayEstIncome || 0
            this.income[3].lostNumber = json.result[3].ldLostNum || 0
            this.income[3].lostEstIncome = json.result[3].ldLostIncome || 0
            this.income[3].settleNumber =  json.result[3].tmSettleNumber || 0
            this.income[3].settleEstIncome =  json.result[3].tmSettleEstIncome || 0
            // this.userPoint=json.userPoint;
            // this.withdrawMoney=json.userWithdrawedAmount.toFixed(2);
            // this.nowMoney=json.userMoneyAmount.toFixed(2);
        }).catch(err=>{
            console.log(err)
        })
         fetch("http://47.97.153.221:8080/app/getCashAmountAll",{
            method:"POST",
            headers:{'Content-Type':'application/x-www-form-urlencoded'},
            credentials: 'include',
            // body:"userId="+objUser.userId
            body:"userId=12345"
        }).then((response) => {
            if (response.ok) {
            return response.json()
            }
        }).then((json) => {
            console.log(json.result)
            // this.income = json.result
            //由于和后台数据命名不一致这里改动
            this.nowMoney = json.result || 0
        }).catch(err=>{
            console.log(err)
        })
        let nowMonth = this.nowMonth()
        let lastMonth = this.lastMonth()
        fetch("http://47.97.153.221:8080/app/getSettleStatus",{
            method:"POST",
            headers:{'Content-Type':'application/x-www-form-urlencoded'},
            credentials: 'include',
            // body:"userId="+objUser.userId
            body:`userId=12345&countMonth=${nowMonth}`
        }).then((response) => {
            if (response.ok) {
            return response.json()
            }
        }).then((json) => {
          if(json.result === 0) {
            this.nowStatus = true
          }else if(json.result === 1) {
            this.nowStatus = false
          }
            
        }).catch(err=>{
            console.log(err)
        })
        fetch("http://47.97.153.221:8080/app/getSettleStatus",{
            method:"POST",
            headers:{'Content-Type':'application/x-www-form-urlencoded'},
            credentials: 'include',
            // body:"userId="+objUser.userId
            body:`userId=12345&countMonth=${lastMonth}`
        }).then((response) => {
            if (response.ok) {
            return response.json()
            }
        }).then((json) => {
            if(json.result === 0) {
            this.lastStatus = true
            }else if(json.result === 1) {
            this.lastStatus = false
            }
        }).catch(err=>{
            console.log(err)
        })

        fetch("http://47.97.153.221:8080/app/user/pointManager",{
            method:"POST",
            headers:{'Content-Type':'application/x-www-form-urlencoded'},
            credentials: 'include',
            body:"userId="+objUser.userId
        }).then((response) => {
            if (response.ok) {
            return response.json()
            }
        }).then((json) => {
           
            //奖金
            this.balance=json.userMoneyAmount.toFixed(2);
            
        }).catch(err=>{
            console.log(err)
        })
    },
   
    
    
  },
//   mounted () {
//       this.fetchData();
//   },
watch:{
    'show':'fetchData'
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
.sticky{
    position: sticky;
    top: 0px;
    background: #fff;
    z-index: 1000;
}
.balance{
  background: #FA5876;
  text-align: center;
  color:#ccc;
  span {
    display:block;
    margin-bottom: 15px;
  }
  & > span:first-child{
    color: #FFFFFF;
    font-size:22px;
  }
  & > span:nth-child(2){

    font-size:14px;
  }
  & > span:nth-child(3){
 
    font-size:18px;
    padding-bottom: 40px;
  }
}
.scrollbar {
    position: absolute;
    width: 100%;
    overflow-x:hidden;
    overflow-y: scroll;
    top: calc(188px + 3.5rem);
    height: calc(100vh - 242px);
    /* bottom: 3rem; */
    background-color: white;
}
.payment-content{
    display: flex;
    justify-content: space-around;
    flex-grow: 1;
    text-align: center;
    background: #fff;
    &>div{
        width:50%;
        overflow:hidden;
        div{
            margin: 7px;
            
        }
        div:nth-child(2){
            margin-top:14px;
            font-size:20px;
        }
    }
    &>div:first-child{
        border-right:1px solid #ddd;
    }
}
.point-manage {
  // overflow:scroll;
}
.iconfont{
    font-family:"iconfont" !important;
    font-size:24px;font-style:normal;
    color:#FA5876;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
    }
h1, h2 ,h3{
  font-weight: normal;
  margin:0
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
//   margin: 0 10px;
}
.prenticeOrderlist {
  display: flex;
  flex-direction: column;
  li{
    line-height: 42px;
    height:42px;
  }
}
.no-record {
  width: 100%;
}
a {
  color: #42b983;
}
.point-page {
    position: relative;
    height: 100%;
    background-color: #f4f4f4;
    text-align: left;
    z-index: 1;
}
.top{
    position: relative;
    background-color:#FA5876;
    height:100px;
    //line-height: 100px;
}
.back{
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
.point{
    position: absolute;
    top:3rem;
    width: 100%;
    //line-height: 2rem;
    font-size:1.2rem;
    color: #FFFFFF;
    text-align: center;
}
.mypoint{
    position: relative;
    height:60px;
    background-color: #FFFFFF;
}
.user_head {
    position: absolute;
    left: 10px;
    top: -20px;
    width: 70px;
    height:70px;
    padding: 2px;
    background: #fff;
    border-radius: 50%;
    
    #img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-size: cover;
        background-repeat: no-repeat;
    }
}

.mypoint{
    position: relative;
    height:60px;
    /*border-bottom:1px solid #e0e0e0;*/
}
.user_id{
    // position:absolute;
    // padding-top:5px;
    padding-left: 100px;
    display: inline;
    font-size:1.2rem;
}
// .level{
//   position: absolute;
//   top:25px;
//   padding-left: 100px;
//   display: inline;
// }
.user_level {
  margin-left: 100px;
  // margin-top: 6px;
  position: relative;
  padding-left: 1.5rem;
  padding-right: 5px;
  line-height: 1rem;
  font-size: 0.875rem;
  width: 1rem;
  background-color: #FD8298;
  border-radius: .5rem;
  color: white;

  &:before {
    content: '';
    position: absolute;
    top: 2px;
    left: 8px;
    width: .75rem;
    height: .75rem;
    background-image: url(./assets/lv.png);
    background-repeat: no-repeat;
    background-size: contain;
  }
}

.myassets,.attention{
    position: relative;
    border-top:1px solid #f4f4f4;
    background-color: #FFFFFF;
    // height:calc(100vh - 340px);
    // margin-top: 10px;
}
.attention{
    border-bottom: 1px solid #f4f4f4;
}

.item{
    position: absolute;
    padding-top:10px;
    width: 100%;
    height:30px;
    text-align: center;
    border-bottom: 1px solid #f4f4f4;
}
.tab{
    position:absolute;
    width:100%;
    // padding-top: 50px;
    
    ul{
        display: flex;
        justify-content:space-around;
        position:relative;
        padding: 16px 0 16px 0;
        margin:0;
        li{
            color:#888;
        }
        li.active{
            color:#000;
        }
        #indicator{
            position:absolute;
            left:0;
            bottom:0px;
            width:25%;
            height:2px;
            background-color: #f35c05;
            z-index:1;
            transition: .3s ease
        }
    }
    & > ul:nth-child(2) {
        margin: 0;
        padding: 0;
    }
    .tab-content{
        li{
            width: 100%;
            // height:800px;
            color:#767676;
            .payment {
                height:50px;
                line-height: 50px;
                width:100%;
                padding-left:5%;
                display: flex;
                align-items: center;
                border-bottom:1px solid #ddd;
                span {
                    margin-left: 10px;
                    font-size:18px;

                }
            }
            .payment-content{
                    display: flex;
                    justify-content: space-around;
                    flex-grow: 1;
                    text-align: center;
                    &>div{
                        width:50%;
                        overflow:hidden;
                        div{
                            margin: 7px;
                            
                        }
                        div:nth-child(2){
                            margin-top:14px;
                            font-size:20px;
                        }
                    }
                    &>div:first-child{
                        border-right:1px solid #ddd;
                    }
                }
            .settleAccounts {
                height:50px;
                line-height: 50px;
                width:100%;
                padding-left:5%;
                display: flex;
                align-items: center;
                border-bottom:1px solid #ddd;
                span {
                    margin-left: 10px;
                    font-size:18px;

                }
            }
            .settleAccounts-content{
                display: flex;
                justify-content: space-around;
                text-align: center;
                &>div{
                        width:50%;
                        overflow:hidden;
                        div{
                            margin: 7px;
                            
                        }
                        div:nth-child(2){
                            margin-top:14px;
                            font-size:20px;
                        }
                    }
                &>div:first-child{
                    border-right:1px solid #ddd;
                }
            }
        }
    }

}
.trans{
        transition: .3s;
    }

</style>
