<template>
  <div class="detail">
    <div class="dt-head">
      <div class="dt-h-back" @click="goback"></div>
      <span class="dt-h-title">优惠商品</span>
      <div class="dt-h-mark" @click="mark" :class="{markFull: marked}"></div>
    </div>
    <div class="dt-body">
      <div class="dt-item">
        <img class="dt-i-img" v-show="imgLoaded" :src="iprop._source.picUrl" @load="imgLoaded = true">
        <div class="dt-i-name">{{iprop._source.title}}</div>
        <div class="dt-i-price"><span class="dt-i-text">{{iprop._source.zkFinalPrice}}<span class="dt-i-text3">券后价</span></span>
        <span class="dt-i-text1">{{iprop._source.volume}}<span class="dt-i-text2">人已买</span></span>
        </div>
        <!-- <div class="dt-i-directlybuy" @click="go">直接购买</div> -->
      </div>
      
         <!-- <div class="dt-coupon"> 
          <img class="dt-c-img" :src="couponBg">  
         <div class="dt-c-info"> 
           <div class="dt-c-discount">￥
            <span style="fontSize: 1.5rem">{{iprop.discount}}</span><br>满29减{{iprop.discount}}元</div> 
           <div class="dt-c-share">分享<br>优惠券</div> 
           <div @click="openUrl" class="dt-c-purchase">领券<br>去详情</div> 
           <a href="//m.taobao.com" data-type="bc_applink" data-appkey="23082328" data-itemid="44777395102" data-params='{"bc_test":"01"}'>去详情</a> 
         </div> 
         <div class="watermark">{{watermark}}</div> 
       </div>   -->
      <!-- <div class="recommend">
        <div class="r-head">达人推荐</div>
        <advice></advice>
      </div>  -->
    </div>
    <div class="dt-lingquan">
        <a class="dt-lingquan-text" v-if="show1" @click="openUrl">领券购买</a>
        <a   class="dt-lingquan-text" v-if="show2" @click="openUrl" href="javascript:void(0)">去淘宝详情</a>
    </div>
  </div>
</template>

<script>
//import Advice from "./Advice";
//import baichuan from '../html/index/app'

export default {
    name: "detail",
    data() {
        return {
            iprop: JSON.parse(localStorage.tbitem),
            //      iprop: this.$route.query.iprop,
            couponBg: require("./assets/Coupon.png"),
            watermark: "专",
            imgLoaded: false,
            marked: false,
            action: "login",
            show1:null,
            show2:null,
            state:null,
            domain:'47.97.153.221:8080',
            // userId:JSON.parse(localStorage.userInfo)
        };
    },
    components: {
        //advice: Advice
    },
    methods: {
        openUrl: function() {
           //给后台传递用户信息数据
            var userId=localStorage.userInfo?JSON.parse(localStorage.userInfo).userId:'';       
            var goodsId=this.iprop._source.id;
            var data='userId='+userId+'&goodsId='+goodsId;  
            if(userId===''){
                this.$router.push({name: 'login'})
            }else{
                console.log('userId',userId);
                fetch('http://'+this.domain+'/app/good/storeClickRecord',{
                method:'POST',
                headers:{'Content-type':'application/x-www-form-urlencoded'},
                body:data
                }).then((response)=>{
                    if(response.ok){
                    return response.json();
                }
                }).then((json)=>{
                var status=json.status;
                //    console.log('json',json)
                //    alert(status);
                
                })
                if(this.state==1){
                baichuan.showUrlPage({url:this.iprop._source.goodsUrl,openType:1},function(ret){ 
                });
                
               }else if(this.state==2){
                 baichuan.showUrlPage({url:this.iprop._source.couponClickUrl,openType:1},function(ret){ 
               });
            }
            }
            
            //跳转页面
            
            // baichuan.showItemDetailPage(
            //     { itemid: "521376186545", openType: 1 },
            //     function(ret) {
            //         //alert(JSON.stringify(ret));
            //     }
            // );
        },
        mark: function() {
            //marked取反
            this.marked = !this.marked;
            //如果没标记，取反
            if (this.marked) {
                if (
                    localStorage.tbmark === undefined ||
                    localStorage.tbmark === ""
                ) {
                    localStorage.tbmark = "[]";
                }
                let tbmarkAll = JSON.parse(localStorage.tbmark);
                tbmarkAll.unshift(this.iprop);
                localStorage.tbmark = JSON.stringify(tbmarkAll);
                this.$root.eventHub.$emit(
                    "showNotification",
                    "已收藏(๑•ㅂ•́)و✧"
                );
                //如果已经标记，取反
            } else {
                new Promise((resolve, reject) => {
                    let markedAll = JSON.parse(localStorage.tbmark);
                    for (let i = 0; i < markedAll.length; i++) {
                        //如果在收藏中找到对应的item,就把他去掉
                        if (markedAll[i]._source.id === this.iprop._source.id) {
                            //删除第i个item,markedAll被改变
                            markedAll.splice(i, 1);
                            localStorage.tbmark = JSON.stringify(markedAll);
                            resolve(localStorage.tbmark);
                            break;
                        }
                    }
                }).then(mark => {
                    ;
                });
            }
        },
        go: function() {
            let text = "复制这条信息，打开「手机淘宝」领券下单 ￥mkpa02TWO8q￥";
            if (window.co !== undefined) {
                window.co.plugins.clipboard.copy(text);
                location.href = "taobao://";
                setTimeout(function() {
                    alert("超时");
                }, 250);
                setTimeout(function() {
                    location.reload();
                }, 1000);
            }
         
        },
        //历史回退
        goback: function() {
            history.go(-1);
        },
        fetchdata: function() {
            let b = document.getElementsByClassName("dt-body")[0]; 
            if (b !== undefined) {
                document.getElementsByClassName("dt-body")[0].scrollTop = 0;
               // this.iprop = this.$route.query.iprop;
                 this.iprop=JSON.parse(localStorage.tbitem);
                //不需领券
                 if(this.iprop._source.couponClickUrl==null){
                    this.show1=false;
                    this.show2=true;
                    this.state=1;//判断是否需要领券
                    
                    
                }else{
                    //需要领券
                    this.show1=true;
                    this.show2=false;
                    this.state=2;
                    
                }
                // this.addBrowseHistory();
            }
        },
        addBrowseHistory: function() {
            if (this.iprop === null || this.iprop === [null]) {
                return;
            }
            let thisbh = [];  
            let lsbh = localStorage.browseHistory;
            if (lsbh !== undefined && lsbh !== "") {
                // 如果thisbh有了就把它的字符穿改为对象
                thisbh = JSON.parse(lsbh);
            }
            let i = 0;
            for (; i < thisbh.length; i++) {
                var id = thisbh[i]._source.id;
                
                if (id === this.iprop._source.id) {
                    //这里的thisbh.splice(i, 1)[0]就是被删除的商品
                    thisbh.unshift(thisbh.splice(i, 1)[0]);
                    break;
                }
            }
            //全部遍历完之后没有重复商品，就将该商品压入数组的最前边
            if (i === thisbh.length) {
                // 前面fetchdata把this.iprop=JSON.parse(localStorage.item);
                // 而 shop把 localStorage.item= JSON.stringify(this.ownprop)
                thisbh.unshift(this.iprop);
            }
            localStorage.browseHistory = JSON.stringify(thisbh);
        },
        initMark: function() {
            if (localStorage.tbmark !== undefined && localStorage.tbmark !== "") {
                let tbmarkAll = JSON.parse(localStorage.tbmark);
                for (let i = 0; i < tbmarkAll.length; i++) {
                    //如果在收藏找到了对应的item，把它置为已经标记
                    console.log(this.iprop)
                    if (tbmarkAll[i]._source.id === this.iprop._source.id) {
                        this.marked = true;
                    }
                }
            }
        },
        //没用
        assignData: function(item) {
            ;
            if (!this.iprop) {
                this.iprop = item;
            }
        }
    },
    watch:{
        '$route':'fetchdata'
    },
    created() {
    if(this.iprop._source.couponClickUrl==null){
            //不去领券
            this.show1=false;
            //去淘宝详情
            this.show2=true;
            //不需要领券
            this.state=1;
            
        }else{
            //去领券
            this.show1=true;
            //不去去淘宝详情
            this.show2=false;
            //需要领券
            this.state=2;  
        }
        ;
        // if(!this.iprop){
        //    this.$root.eventHub.$on('toDetailDate',this.assignData)
        // }
    },
    updated() {
        //this.iprop=JSON.parse(localStorage.item)
    },
    mounted() {
        // this.addBrowseHistory();
        console.log("mounted item"+localStorage.item);
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.initMark();
           vm.fetchdata();
           vm.addBrowseHistory();
          
        });
    },
    beforeRouteLeave(to, from, next) {
        this.marked = false;
        next();
    }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped rel="stylesheet/scss">
h1,
h2 {
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

a {
    color: #42b983;
}

.detail {
    width:100%;
    position: absolute;
    top:0;
    left: 0;
    right: 0;
    // bottom: 3rem;
    bottom:0;
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
    padding-top:1.5rem;
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
        line-height: 3rem;
        width: 4rem;
        color: white;
        font-size: 1.1rem;
    }

    .dt-h-mark {
        float: right;
        margin-right: 0.5rem;
        width: 1.5rem;
        height: $headTextH;
        background-image: url(./assets/mark-empty.png);
        background-size: contain;
        background-repeat: no-repeat;
    }

    .markFull {
        background-image: url(./assets/mark-full.png);
    }
}

.dt-body {
    position: absolute;
    top: 4.5rem;
    width: 100%;
    bottom: 0;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
}
.dt-item {
    position: relative;
    // height: 8rem;
    height:90%;
    padding: 0.5rem;
    background-color: white;
    text-align: left;
    display:flex;
    flex-flow:column wrap;


    .dt-i-img {
        // margin-right: 0.5rem;
        // width: 8rem;
        // float: left;
        height:65%;
        width:100%;
        display: block;
        background-size: contain;
    }
    .dt-i-name{
        font-size: 1.1rem;
    }
    .dt-i-price {
        font-size: 1.3rem;
        text-align: left;
        color: #fb5776;
        display: flex;
        flex-flow: row nowrap;
        align-items:baseline;
        // justify-content:flex-start;
        
        .dt-i-text{
            width:50%;
            font-size: 1.3rem;
            color: #fb5776;
            &:before {
            content: "￥";
            font-size: 1rem;
            }
           .dt-i-text3{
               font-size: 0.8rem;
               color:#ccc;
           }
        }

        .dt-i-text1{
            width:50%;
            display: flex;
            flex-flow: row nowrap;
            align-items:baseline;
            justify-content:flex-end;
            font-size: 1rem;
            .dt-i-text2{
                font-size: 0.8rem;
                color: #bbb;
            }
        }
    }

    .dt-i-directlybuy {
        position: absolute;
        right: 1.5rem;
        bottom: 0.5rem;
        text-align: right;
        color: #fb5776;

        &:after {
            //&是父亲
            content: "";
            position: absolute;
            width: 1.4rem;
            height: 1.4rem;
            background-image: url(./assets/foward.png);
            background-size: contain;
            background-repeat: no-repeat;
        }
    }
}
.dt-lingquan{
    box-sizing:border-box;
    margin-top: 0.5rem;
    padding: 0.5rem;
     position: fixed;
     left: 0;
     bottom: 0.1rem;
     width: 100%;
     
    //  height:3rem;
    //  border:1px solid black;   
     z-index: 1;
    //  vertical-align: middle;
     background-color:#ddd;
     .dt-lingquan-text{
        display:block;
        position: relative;
        vertical-align: middle;
        line-height:2rem;
        font-size: 1.2rem;
        padding:0.5rem;
        // width:50%;
        height:2rem;
        background-color:#fb5776;
        color:#fff;
        // font-weight:bold;
        border-radius:0.5rem;
        text-decoration:none;
     }
}

// .dt-coupon {
//     // position: relative;
//     margin-top: 0.5rem;
//     padding: 0.5rem 0.5rem;
//     // background-color: white;
//     // color: #908bde;
//      position: fixed;
//      left: 0;
//      bottom: 0.1rem;
//      width: 100%;
//     //  height: 3rem;
//      height:15%;
//      border:1px solid black;
//      font-size: 0.875rem;
//      z-index: 1;
    

//     .dt-c-img {
//         width: 100%;
//         vertical-align: bottom;
//     }

//     .dt-c-info {
//         position: absolute;
//         left: 1rem;
//         right: 1rem;
//         top: 0;
//         bottom: 0;
//         display: flex;
//         flex-flow: row wrap;
//         align-items: center;
//         font-size: 0.875rem;

//         .dt-c-discount {
//             width: 52%;
//         }
//         .dt-c-share {
//             width: 24%;
//         }
//         .dt-c-purchase {
//             width: 24%;
//         }
//     }

//     .watermark {
//         position: absolute;
//         left: 50%;
//         top: 50%;
//         transform: translateX(-50%) translateY(-50%);
//         font-size: 3rem;
//         opacity: 0.5;
//     }
// }

// .loading {
//     position: relative;
//     width: 8rem;
//     height: 8rem;
//     margin-right: 0.5rem;
//     float: left;
//     text-align: center;

//     i {
//         position: absolute;
//         top: calc(50% - 1.75rem);
//         left: calc(50% - 0.75rem);
//         width: 1.5rem;
//         height: 1.5rem;
//         border-radius: 100%;
//         border: 1px solid rgba(0, 0, 0, 0.8);
//         opacity: 0;
//         animation: loading 1.25s 0s infinite cubic-bezier(0.21, 0.53, 0.56, 0.8);
//         -webkit-animation: loading 1.25s 0s infinite
//             cubic-bezier(0.21, 0.53, 0.56, 0.8);
//         &:nth-child(1) {
//             animation-delay: 0s;
//             -webkit-animation-delay: 0s;
//         }
//         &:nth-child(2) {
//             animation-delay: 0.2s;
//             -webkit-animation-delay: 0.2s;
//         }
//         &:nth-child(3) {
//             animation-delay: 0.4s;
//             -webkit-animation-delay: 0.4s;
//         }
//     }
//     @keyframes loading {
//         0% {
//             transform: scale(0.1);
//             opacity: 1;
//         }
//         70% {
//             transform: scale(1);
//             opacity: 0.7;
//         }
//         100% {
//             opacity: 0;
//         }
//     }
// }

// .recommend {
//     margin-top: 0.5rem;

//     .r-head {
//         height: 2rem;
//         padding-left: 0.5rem;
//         line-height: 2rem;
//         text-align: left;
//         background-color: white;
//     }
// }
</style>
