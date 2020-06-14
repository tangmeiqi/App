<template>
  <div class="point-page">
    <div class="point-manage" v-show="show===0">
        <div class="top">
            <div class="point">奖金管理</div>
            <div class="back" @click="back"></div>
        </div>

        <!--个人积分栏-->
        <div class="mypoint">
            <div class="user_head"><div id="img" :style="{backgroundImage:'url('+avatar+')'}"></div></div>
            <!-- <div class="user_id">{{user.userName}}</div> -->
            <!-- <div class="level"><div class="user_level">{{user.point}}</div></div> -->
        </div>
        <!--我的资产-->
        <div class="myassets">
            <div class="item">我的资产</div>
            <div class="row">
                <div class="col">
                    <span class="amount moneyIcon">{{withdrawMoney}}</span>
                    <span class="title">已提</span>
                </div>
                <div class="col">
                    <span class="amount moneyIcon">{{nowMoney}}</span>
                    <span class="title">余额</span>
                </div>
                <!-- <div class="col">
                    <span class="amount">{{userPoint}}</span>
                    <span class="title">积分</span>
                </div> -->
            </div>
        </div>
        <div class="pointitem">
            <!-- <div class="item1" @click="creditPage">积分兑换</div> -->
            <div class="item2" @click="moneyPage">奖金提现</div>
            <!-- <div class="item3">敬请期待</div> -->
        </div>
    </div>
    <div class="exchange" v-show="show===1">
        <div class="item_top">
            <div class="text">积分兑换</div>
            <div class="back" @click="show=0"></div>
        </div>
        <div class="content">
            <!-- <div id="credit_picture">
                <img src="./assets/credit.png" alt="">
            </div> -->
            <div id="creditTop">
                <div class="creditCount">
                    <span>当前积分</span>
                    <div>{{currentPoint}} </div>
                </div>
                <div class="creditCount">
                    <span>累计兑换</span>
                    <div>{{allChanged}}</div>
                </div>
            </div>
            <div id="creditContent">
                <div id="credit_rule">
                    100 积分可兑换为 {{pointRate}} 元现金哦 ^_^<br>
                （可通过提交订单，徒弟进贡，签到获取积分哦）
                </div>
                <div id="credit_change">
                    <span>我要兑换</span>
                    <input type="text" placeholder="请输入兑换积分数" v-model="creditVal">
                    <div><button @click="creditChange">兑换</button></div>
                </div>
            </div>
            <!-- <div id="changeList">
                <div>
                    兑换记录
                </div>
            </div>
             -->
            
        </div>
    </div>
    <div class="exchange" v-show="show===2">
        <div class="item_top">
            <div class="text">奖金提现</div>
            <div class="back" @click="show=0"></div>
        </div>
        <div class="content">
            <div class="item_content">
                <div id="bind_amount">
                    <h3>绑定提现账号</h3>
                    <div v-show="bind==false">
                        <!-- <div class="account"><span>微信</span><input type="text" placeholder="请输入微信帐号" v-model="weixin"></div> -->
                        <div class="account">
                            <span>支付宝</span>
                            <input type="text" placeholder="请输入支付宝帐号" v-model="alipay">
                        </div>
                        <button @click="bindAmount">提交</button>
                    </div>
                    <div v-show="bind==true">
                        <div class="account">
                            <span>已绑账号</span>
                            <input type="text"  v-model="aliAmount">
                        </div>
                        <button @click="bind=false">更改账号</button>
                    </div>
                </div>
                <div class="deposit">
                    <h3>我要提现</h3>
                    <!-- <div class="money">
                        <span>微信</span>
                        <div :class="{active:select===1}" @click="select=1">30元</div>
                        <div :class="{active:select===2}" @click="select=2">50元</div>
                        <div :class="{active:select===3}" @click="select=3">100元</div>
                    </div> -->
                    <div class="money">
                        <!-- <span>支付宝</span> -->
                        <div :class="{active:select===1}" @click="select=1">10元</div>
                        <div :class="{active:select===2}" @click="select=2">20元</div>
                        <div :class="{active:select===3}" @click="select=3">50元</div>
                    </div>
                    <div><button @click="moneyChange">提现</button></div>
                </div>
                <div class="records">
                    <h3>提现记录</h3>
                    <div class="item-record" v-for="(item,index) in records" :key="index">

                        <!-- newDate() 毫秒数转换成国际时间对象，再转成本地时间字符串-->

                        <div class="time">提交时间：{{item.applyTime}}</div>

                        <div class="item_msg">
                            <div class="item_money">金额：<span>{{item.moneyAmount}}</span></div>
                            <div class="status">{{status(item.status)}}</div>
                        </div>
                    </div>
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
      pointRate:0,
      avatar: require('./assets/images.jpg'),
      user: {
          userName:'',
          userId:'',
      },
      creditVal:'',
      userPoint:0,
      withdrawMoney:0,
      nowMoney:0,
      currentPoint:0,
      allChanged:0,
      show:0,
      bind:false,
      select:1,
      weixin:'',
      alipay:'',
      aliAmount:'',
      page:1,
      pageSize:100,
      records:[],
    }
  },
  methods: {
    status(sta){
        
        switch(sta){
            case 0:
                sta = '待处理'
                break;
            case 1:
                sta = '已处理'
                break;
            case 2:
                sta = '处理失败'
                break;
        }
        return sta
    },
    back: function () {
      window.history.back(-1)
    },
    fetchData: function () {
        // let objUser= JSON.parse(localStorage.userInfo);
        let objUser= localStorage.userInfo ? JSON.parse(localStorage.userInfo) : '{}';
        // this.user.userName=objUser.weixin;
        this.user.userId=objUser.userId;
        this.user.userName =objUser.userId;
        // this.avatar =objUser.headimgurl
        this.pointRate=this.$route.query.pointRate;
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
            //积分
            this.userPoint=json.userPoint;
            //已提
            this.withdrawMoney=json.userWithdrawedAmount.toFixed(2);
            //奖金
            this.nowMoney=json.userMoneyAmount.toFixed(2);
            
        }).catch(err=>{
            console.log(err)
        })
    },
    // 积分兑换页面
    creditPage:function(){
        
        this.show=1;
        this.creditVal='';
        fetch("http://47.97.153.221:8080/app/user/pointExchangeMain",{
            method:"POST",
            headers:{'Content-Type':'application/x-www-form-urlencoded'},
            credentials: 'include',
            body:"userId="+this.user.userId
        }).then((response) => {
            if (response.ok) {
            return response.json()
            }
        }).then((json) => {
            this.currentPoint=json.userPoint;
            //接口变化
            this.allChanged=json.getUserAccExPoint;
        }).catch(err=>{b
          console.log(err)
        })
    },
    creditChange:function(){
        let objUser= localStorage.userInfo ? JSON.parse(localStorage.userInfo) : '{}';
        if(this.creditVal!=''){
            if(this.creditVal<=this.currentPoint){
     //confirm确认（返回true or false）
                let result=confirm("确认兑换"+this.creditVal+"积分？");
                if(result){
                    fetch("http://47.97.153.221:8080/app/user/pointExchange",{
                    method:"POST",
                    headers:{'Content-Type':'application/x-www-form-urlencoded'},
                    credentials: 'include',
                    body:"userId="+this.user.userId+"&pointExAmount="+this.creditVal+"&signToken=" + objUser.signToken
                    }).then((response) => {
                        if (response.ok) {
                        return response.json()
                        }
                    }).then((json) => {
                        ;
                        if(json.status==1){
                            this.currentPoint=json.userPoint;
                            //this.userPoint=json.userPoint;
                            this.allChanged=json.getUserAccExPoint;
                            this.$root.eventHub.$emit('showNotification', '兑换成功')
                        }else if(json.status==0){
                            this.$root.eventHub.$emit('showNotification', json.message)
                        }
                        
                    }).catch(err=>[
                      console.log(err)
                    ])
                }  
            }else{
                this.$root.eventHub.$emit('showNotification', '兑换积分高于当前积分')
            }
        }
    },
    //奖金提现
    moneyPage:function(){
        this.show=2;
        this.select=1;
        fetch("http://47.97.153.221:8080/app/user/withdrawTransaction",{
                method:"POST",
                headers:{'Content-Type':'application/x-www-form-urlencoded'},
                credentials: 'include',
                body:"userName="+this.user.userName+"&userId="+this.user.userId+"&page="+this.page+"&pageSize="+this.pageSize
        }).then((response) => {
            if (response.ok) {
              return response.json()
            }
        }).then((json) => {
            ;
            //用户支付宝账户
            
            //提现记录
            this.records=json.resultList;
            this.getAmount();
            
        }).catch(err=>{
            console.log(err)
        })
    },
    //获得支付宝账户
    getAmount:function(){
        
        fetch("http://47.97.153.221:8080/app/user/getZFBAccount",{
            method:"POST",
            headers:{'Content-Type':'application/x-www-form-urlencoded'},
            credentials: 'include',
            body:"userId="+this.user.userId
        }).then((response) => {
            if (response.ok) {
              return response.json()
            }
        }).then((json) => {
            if(json.userZFBAccount){
                this.bind=true;
                this.aliAmount=json.userZFBAccount;
            }
        }).catch(err=>{
            console.log(err)
        })
    },
    //绑定账户
    bindAmount:function(){
        
        if(this.alipay!=''){
            fetch("http://47.97.153.221:8080/app/user/accountBinding",{
                method:"POST",
                headers:{'Content-Type':'application/x-www-form-urlencoded'},
                credentials: 'include',
                body:"userId="+this.user.userId+"&userZFBAccount="+this.alipay
            }).then((response) => {
                if (response.ok) {
                    return response.json()
                }
            }).then((json) => {
                if(json.status==1){
                    this.$root.eventHub.$emit('showNotification', '绑定成功')
                    this.bind=true;
                    this.getAmount();
                } 
            }).catch(err=>{
                console.log(err)
            })
        }
        
    },
    moneyChange:function(){
        let objUser= localStorage.userInfo ? JSON.parse(localStorage.userInfo) : '{}';
        if(this.aliAmount){
            let val=0.00;
            if(this.select==1){
                val=10.00;
            }else if(this.select==2){
                val=20.00;
            }else if(this.select==3){
                val=50.00;
            }
            if(val<=this.nowMoney){
                let result=confirm("确认提现"+val+"元？");
                if(result){
                    fetch("http://47.97.153.221:8080/app/user/applyWithdraw",{
                        method:"POST",
                        headers:{'Content-Type':'application/x-www-form-urlencoded'},
                        credentials: 'include',
                        body:"userId="+this.user.userId+"&withdrawAmount="+val+"&signToken=" + objUser.signToken
                    }).then((response) => {
                        if (response.ok) {
                            return response.json()
                        }
                    }).then((json) => {
                        ;
                        if(json.status==1){
                            this.$root.eventHub.$emit('showNotification', '提交成功，等待审核')
                            this.moneyPage();
                        }else if(json.status==0){
                            this.$root.eventHub.$emit('showNotification', json.message)
                        }
                    }).catch(err=>{
                        console.log(err)
                    })
                }
            }else{
                this.$root.eventHub.$emit('showNotification', '提现金额高于当前金额')
            }
        }else{
             this.$root.eventHub.$emit('showNotification', '请先绑定提现账号')
        } 
    }
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
  margin: 0 10px;
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
    height:110px;
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
    position:absolute;
    padding-top:5px;
    padding-left: 100px;
    display: inline;
    font-size:1.3rem;
}
.level{
  position: absolute;
  top:25px;
  padding-left: 100px;
  display: inline;
}
.user_level {
  margin-top: 6px;
  position: relative;
  padding-left: 1.5rem;
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
    height:80px;
    margin-top: 10px;
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
.row{
    position:absolute;
    width:100%;
    padding-top: 50px;
    display: -webkit-box;
    display: -webkit-flex;
}
.col{
  -webkit-box-flex:1;
  -webkit-flex:1;
  flex:1;
  text-align:center;
  border-right:1px solid #f4f4f4;
}

.col:last-child {
  border-right: 0;
}

.amount{
    font-size: 1rem;
    color: #FA5876;
}
.moneyIcon:before{
    content: '￥';
    font-size: 1rem;
}
.pointitem{
    background-color: #fff;
    margin-top: 10px;
    border-top: 1px solid #f4f4f4;
    text-align: center;

}
.pointitem div {
    height: 50px;
    line-height: 50px;
    padding-left: 10px;
    border-bottom: 1px solid #f4f4f4;
}
.exchange{
    //position: relative;
    height:100%;
}
.item_top{
    position:relative;
    height:5rem;
    background-color:#FA5876;
}
.text{
    position:absolute;
    width:100%;
    //left:-2.5rem;
    line-height:6.5rem;
    text-align:center;
    color:#FFFFFF;
    font-size:1.2rem;
}

// #credit_picture{
//     width:100%;
//     img{
//         width:100%;
//     }
// }
.content{
    position: absolute;
    width: 100%;
    top: 5rem;
    overflow:scroll;
    bottom: 0px; 
    background-color:#FFFFFF;
}
// .item_content{
//     //overflow:scroll;
//     position: absolute;
//     width: 100%;
//     top: 0;
//     bottom: 0;
// }
#creditTop{
    height:150px;
    padding:20px 30px;
    font-size:1.2rem;
    border-bottom:10px solid #f4f4f4;
}
.creditCount{
    margin-bottom:20px;
    span{
        color:#bbb;
    }
    div{
        margin-top:10px;
        //color:black;
        font-size:1.5rem;
    }
}


#credit_rule{
    text-align:center;
    margin:20px 0;
    font-size:.85rem;
    color:rgb(156, 154, 154);
    line-height:1.5rem;
    
}
#credit_change{
    text-align: center;

    span{
        font-size:1.2rem;
        color:#FA5876;
    }
    input{
        font-size:1rem;
        margin-left:10px;
        height:2rem;
        //width:100px;
        padding-left:10px;
        border:3px solid #ddd;
        border-radius:10px;
        outline:none;
    }

    button{
        margin-top:20px;
        font-size:1.3rem;
        background-color:#FA5876;
        outline:none;
        width:90%;
        height:3rem;
        color:#FFFFFF;
        border:1px solid #FA5876;
        border-radius:30px;
    }      
}
#bind_amount{
    text-align:center;
    height:180px;
    border-bottom:10px solid #f4f4f4;
    h3{
        //font-size:1.2rem;
        line-height:4rem;
        color:#FA5876;  
    }
    .account{
        width:100%;
        margin-bottom:15px;
        span{
            display: inline-block;
            font-size:1rem;
            width:80px;
        }

        input{
            font-size:1rem;
            height:2rem;
            width:150px;
            border:1px solid #aaa;
            border-radius:5px;
            outline:none;
            padding-left:8px;
        }
    }
    button{
        width:8rem;
        height:2rem;
        font-size:1rem;
        margin-right:5px;
        border:1px solid #FA5876;
        background-color:#FA5876;
        color:#FFFFFF;
        outline:none;
        border-radius:10px;
    }

}
.deposit{
    text-align:center;
    height:210px;
    border-bottom:10px solid #eee;
    h3{
        line-height: 4rem;
        color:#FA5876;   
    }
    .money{
        //height:50px;
        padding:0 10px 10px;
        display:flex;
        //justify-content:space-between;
        // span{
        //     width:50px;
        //     flex-grow:2;
        //     font-size:1.2rem;
        // }
        div{
            //height:25px;
            padding:5px;
            flex-grow:1;
            margin:0 10px;
            // color: #409eff;
            border:1px solid #c6e2ff;
             //background-color: #ecf5ff;
        }   
    }
    button{
        margin-top:10px;
        font-size:1.3rem;
        background-color:#FA5876;
        outline:none;
        width:90%;
        height:3rem;
        color:#FFFFFF;
        border:1px solid #FA5876;
        border-radius:30px;
    }
}
.active{
    background-color: #409eff;
    //border:1px solid #409eff;
    color: #fff;
}
.records{
    h3{
        text-align:center;
        height:3rem;
        line-height:3rem;
        color:#FA5876;
    }
    .item-record{
        border-bottom:8px solid #eee;
        
        .time{
            height:2rem;
            line-height: 2rem;
            border-bottom:1px solid #ddd;
            font-size:.85rem;
            padding:0 20px;
        }
        .item_msg{
            padding:0 20px;
            height:3rem;
            line-height: 3rem;
            display: flex;
            justify-content:space-between;
        }
    }
}
</style>
