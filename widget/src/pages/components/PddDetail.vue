<template>
  <div class="detail">
    <div class="dt-head">
      <div class="dt-h-back" @click="goback"></div>
      <span class="dt-h-title">优惠商品</span>
      <div class="dt-h-mark" @click="mark" :class="{markFull: marked}"></div>
    </div>
    <div class="dt-body">
      <div class="dt-item">
        <div class="dt-i-img">
            <swiper class="slider-box" :options="swiperOption" ref="mySwiper" style="width:100%">
                <swiper-slide v-for="(item, index) in lblist" :key="index" class="slider-item" style="width:100%">   
                    <div class="slider-item" :style="{backgroundImage:'url(' + item + ')',width:'100%'}"></div> 
                </swiper-slide>
            <div class="slider-pagination swiper-pagination"  slot="pagination"></div>
            </swiper>
        </div>
        <!-- <img class="dt-i-img" v-show="imgLoaded" :src="img" @load="imgLoaded = true"> -->
        <div class="dt-i-name">{{iprop.goods_name}}</div>
        <div class="dt-i-msg1">
            <span class="dt-i-text">{{iprop.sold_quantity}}<span class="dt-i-text3">人已买</span></span>
            <!-- <span class="dt-i-text1">{{iprop.sold_quantity}}<span class="dt-i-text2">人已买</span></span> -->
        </div>
        <div class="dt-i-msg2">
            <span class="msg2-text">￥{{price}}&nbsp;<span class="msg2-account" style="text-decoration:line-through;">￥{{(iprop.min_group_price/100).toFixed(1)}}&nbsp;</span></span>
            <span class="msg2-text1"><span class="msg2-rebate">预估赚￥{{rebate}}</span></span>
        </div>
        <div class="dt-i-msg3">
            <div class="msg3-text">
                 <span class="msg3-text1">{{(iprop.coupon_discount/100).toFixed(1)}}元优惠券</span>
                 <!-- <span>优惠券时间范围&nbsp;<span>{{new Date(iprop.coupon_start_time).toLocaleString()}}</span>至<span>{{new Date(iprop.coupon_end_time).toLocaleString()}}</span></span> -->
                 <span class="msg3-text2" @click="openUrl('buy')">立即领券</span>
            </div>
        </div> 
        <div class="dt-i-msg4">
            <div class="msg4">描述评分{{(list.avg_desc/100).toFixed(2)}}</div>
            <div class="msg4">物流评分{{(list.avg_lgst/100).toFixed(2)}}</div>
            <div class="msg4">服务评分{{(list.avg_serv/100).toFixed(2)}}</div>
        </div>
        <div class="dt-i-msg5">
            <div class="msg5-text">商品详情</div>
            <div v-for="(item, index) in lblist" :key="index" class="msg5">
                <div class="msg5-item" :style="{backgroundImage:'url(' + item + ')',width:'100%'}"></div> 
            </div>
        </div>
      </div>
    </div>
    <div class="dt-lingquan">
        <div class="dt-lingquan-share" >
            <div class="share3">分享</div>
            <div class="share1" @click="openUrl('sharefriend')"></div>
            <div class="share2" @click="openUrl('sharequan')"></div>
        </div>
        <div class="dt-lingquan-text" id="voucher" @click="openUrl('buy')">购买立赚{{rebate}}元</div>
        <!-- <a class="dt-lingquan-text" v-if="show1" @click="openUrl">领券购买</a> -->
        <!-- <a  id="voucher" class="dt-lingquan-text" v-if="show2" @click="openUrl" href="javascript:void(0)">去淘宝详情</a> -->
    </div>
  </div>
</template>

<script>
//import Advice from "./Advice";
//import baichuan from '../html/index/app'
  import md5 from 'js-md5'
export default {
    name: "detail",
    data() {
        return {
            iprop: JSON.parse(localStorage.pdditem),
            //      iprop: this.$route.query.iprop,
            couponBg: require("./assets/Coupon.png"),
            watermark: "专",
            imgLoaded: false,
            marked: false,
            action: "login",
            lianjie:null,
            defaultimg:require('./assets/defaultimg.jpg'),
            swiperOption: {
                notNextTick: true,
                direction: 'horizontal',
                loop: true,//设置为true 则开启loop模式。loop模式：会在原本slide前后复制若干个slide(默认一个)并在合适的时候切换，让Swiper看起来是循环的。
                pagination: '.swiper-pagination',//分页器容器的css选择器或HTML标签
                paginationClickable: true,//此参数设置为true时，点击分页器的指示点分页器会控制Swiper切换。
                autoplay: 2000,
                speed: 500,
                autoplayDisableOnInteraction: false,
                // observer:true,
                // observeParents:true,
            },
            list: [
                // {url: require('./assets/1.jpg')},
                // {url: require('./assets/2.jpg')},
                // {url: require('./assets/3.jpg')},
                // {url: require('./assets/4.jpg')},
                // {url: Dummy.prototype.get()}
            ],
            lblist:[],
        };
    },
    components: {
        //advice: Advice
    },
    computed:{
        img:function(){
            return this.iprop.goods_image_url ? this.iprop.goods_image_url:this.defaultimg
        },
        price:function(){
            return ((this.iprop.min_group_price-this.iprop.coupon_discount)/100).toFixed(1)
        },
        rebate:function(){
        var total=((this.iprop.min_group_price-this.iprop.coupon_discount)/100).toFixed(2)
        return (total*(this.iprop.promotion_rate/1000)*0.4).toFixed(2)
        },
         swiper () {
        return this.$refs.mySwiper.swiper
        }
    },
    methods: {
        openUrl: function(param) {
        var Voucher=document.getElementById("voucher");
        var userId=localStorage.userInfo?JSON.parse(localStorage.userInfo).userId:'';
        console.log('userId',localStorage.userInfo)
        if(userId===''){ 
            this.$router.push({name: 'login'})
        }else{
            this.makeHref(userId,param); 
        }
        //  this.makeHref(userId,param);
        // baichuan.showItemDetailPage(
        //     { itemid: "521376186545", openType: 1 },
        //     function(ret) {
        //         //alert(JSON.stringify(ret));
        //     }
        // );
        },
        makeHref:function(userId,param){
            console.log('this.iprop.goods_id',this.iprop.goods_id)
            var type='pdd.ddk.goods.promotion.url.generate',
            data_type='JSON',
            client_id='8d2b454cedbb47ec8010a1f4cf55be3c',
            client_secret='8c92300bba7e0cfdbe8c8c24879f10d150a486b9',
            p_id='8312071_73034914',
            goods_id_list='['+this.iprop.goods_id+']',
            generate_short_url=false,
            multi_group=false,
            timestamp='1530172082186';
            //给推广链接打上自定义标签，如果是分享给朋友或者朋友圈，自定义标签是userId+'-share'，如果是自己买的，自定义标签是userId+'-mine'
            if(param=='sharefriend'){
              var custom_parameters=userId+'-share';
            }else if(param=='sharequan'){
              var custom_parameters=userId+'-share';
            }else if(param=='buy'){
              var custom_parameters=userId+'-mine'
            }
            var pwdStr=client_secret+'client_id'+client_id+'custom_parameters'+custom_parameters+'data_type'+data_type+'generate_short_url'+generate_short_url+'goods_id_list'+goods_id_list+'multi_group'+multi_group+'p_id'+p_id+'timestamp'+timestamp+'type'+type+client_secret;
            var sign=md5(pwdStr).toUpperCase();
            // console.log('推广链接'+sign);
            var data='type='+type+'&data_type='+data_type+'&timestamp='+timestamp+'&client_id='+client_id+'&p_id='+p_id+'&goods_id_list='+goods_id_list+'&generate_short_url='+generate_short_url+'&multi_group='+multi_group+'&sign='+sign+'&custom_parameters='+custom_parameters;
            console.log('data',data);
            fetch('http://gw-api.pinduoduo.com/api/router',{
            method:'POST',
            headers:{'Content-type':'application/x-www-form-urlencoded','Accept':'application/json'},
            body:data
            }).then((response)=>{
            // console.log('tangmeiqi生成链接');
            // console.log(response);
            if(response.ok){
            return response.json();
            }
            }).then((json)=>{
            this.lianjie=json.goods_promotion_url_generate_response.goods_promotion_url_list[0].mobile_url;
            //  baichuan.showUrlPage({url:this.lianjie,openType:1},function(ret){ 
            //   });
            console.log('自定义推广链接',param,this.lianjie);
            if(param=='sharefriend'){
               wx.shareWebpage({
                    apiKey: 'wxb531b503239f2ee0',
                    scene: 'session',
                    title: this.iprop.goods_name,
                  
                    contentUrl: this.lianjie
                }, function(ret, err) {
                    if (ret.status) {
                        alert('分享成功');
                    } else {
                        alert(err.code);
                    }
                });
            }else if(param=='sharequan'){
                 wx.shareWebpage({
                    apiKey: 'wxb531b503239f2ee0',
                    scene: 'timeline',
                    title: this.iprop.goods_name,
                   
                    contentUrl: this.lianjie
                }, function(ret, err) {
                    if (ret.status) {
                        alert('分享成功');
                    } else {
                        alert(err.code);
                    }
                });
            }else if(param=='buy'){
                api.openWin({
                name: 'pdd',
                url: this.lianjie,
                });
            } 
           
            })
        },
        mark: function() {
            //marked取反
            this.marked = !this.marked;
            //如果没标记，取反
            if (this.marked) {
                if (
                    localStorage.pddmark === undefined ||
                    localStorage.pddmark === ""
                ) {
                    localStorage.pddmark = "[]";
                }
                let pddmarkAll = JSON.parse(localStorage.pddmark);
                pddmarkAll.unshift(this.iprop);
                localStorage.pddmark = JSON.stringify(pddmarkAll);
                this.$root.eventHub.$emit(
                    "showNotification",
                    "已收藏(๑•ㅂ•́)و✧"
                );
                //如果已经标记，取反
            } else {
                //这里为什么要用promise?
                new Promise((resolve, reject) => {
                    let markedAll = JSON.parse(localStorage.pddmark);
                    for (let i = 0; i < markedAll.length; i++) {
                        //如果在收藏中找到对应的item,就把他去掉
                        if (markedAll[i].goods_id === this.iprop.goods_id) {
                            //删除第i个item,markedAll被改变
                            markedAll.splice(i, 1);
                            localStorage.pddmark = JSON.stringify(markedAll);
                            resolve(localStorage.pddmark);
                            break;
                        }
                    }
                }).then(mark => {});
            }
        },
        //直接购买,但是看不懂代码？
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
            // var ifr = document.createElement('iframe')
            // ifr.src = 'taobao://'
            // ifr.style.display = 'none'
            // document.body.appendChild(ifr)
            // var openTime = +new Date()
            // window.setTimeout(function () {
            //   document.body.removeChild(ifr)
            //   if ((+new Date()) - openTime > 2500) {
            //     window.location = ''
            //   }
            // }, 2000)
        },
        //历史回退
        goback: function() {
            this.lblist=['./assets/defaultimg.jpg'];
            history.go(-1);
        },
        fetchdata: function() {      
            let b = document.getElementsByClassName("dt-body")[0];
            if (b !== undefined) {
                document.getElementsByClassName("dt-body")[0].scrollTop = 0;
                this.lblist=['./assets/defaultimg.jpg'];
                this.iprop=JSON.parse(localStorage.pdditem);
                console.log('pddDetail',this.iprop);
                this.getGoodsDetail();
                this.addBrowseHistory();
            }
        },
        getGoodsDetail:function(){
          var type='pdd.ddk.goods.detail',
            timestamp=Math.round(new Date().getTime()/1000),
            data_type='JSON',
            client_id='8d2b454cedbb47ec8010a1f4cf55be3c',
            client_secret='8c92300bba7e0cfdbe8c8c24879f10d150a486b9',
            goods_id_list='['+this.iprop.goods_id+']';
          var pwdStr=client_secret+'client_id'+client_id+'data_type'+data_type+'goods_id_list'+goods_id_list+'timestamp'+timestamp+'type'+type+client_secret;
          var sign=md5(pwdStr).toUpperCase();
          var data='type='+type+'&data_type='+data_type+'&timestamp='+timestamp+'&client_id='+client_id+'&goods_id_list='+goods_id_list+'&sign='+sign;
            fetch('http://gw-api.pinduoduo.com/api/router',{
            method:'POST',
            headers:{'Content-type':'application/x-www-form-urlencoded','Accept':'application/json'},
            body:data
            }).then((response)=>{
            if(response.ok){

                return response.json();
            }
            }).then((json)=>{
                console.log('获取拼多多商品详细信息json:',json)
                this.list=json.goods_detail_response.goods_details[0];
                this.lblist=json.goods_detail_response.goods_details[0].goods_gallery_urls;
                console.log('this.list'+this.list);
            }).catch(err=>{
                console.log(err)
            })
        },
        addBrowseHistory: function() {
             if (this.iprop === null || this.iprop === [null]) {
                return;
            }
            let thisbh = [];
            let lsbh = localStorage.pddbrowseHistory;
            if (lsbh !== undefined && lsbh !== "") {
                thisbh = JSON.parse(lsbh);
            }
            let i = 0;
            for (; i < thisbh.length; i++) {
                let id = thisbh[i].goods_id;
                if (id === this.iprop.goods_id) {
                    thisbh.unshift(thisbh.splice(i, 1)[0]);
                    break;
                }
            }
            if (i === thisbh.length) {
                thisbh.unshift(this.iprop);
            }
            localStorage.pddbrowseHistory = JSON.stringify(thisbh);
            // console.log('localStorage.pddbrowseHistory',localStorage.pddbrowseHistory)
        },
        initMark: function() {
          console.log(localStorage.pddmark)
            if (localStorage.pddmark !== undefined && localStorage !== "") {
                let pddmarkAll = JSON.parse(localStorage.pddmark);
                for (let i = 0; i < pddmarkAll.length; i++) {
                    if (pddmarkAll[i].goods_id === this.iprop.goods_id) {
                        this.marked = true;
                    }
                }
            }
        },
        //没用
        assignData: function(item) {
            if (!this.iprop) {
                this.iprop = item;
            }
        }
    },
    watch:{
        '$route':'fetchdata'
    },
    created() { 
       
    },
    updated() {
        //this.iprop=JSON.parse(localStorage.item)
    },
    mounted() {
        console.log('拼多多mounted里面的localStorage',localStorage);
        this.swiper.width="375px";
        api.addEventListener({
            name: 'keyback'
        }, function(ret, err) {
            alert('按了返回键');
            api.historyBack({
                frameName: '',
            }, function(ret, err) {
                if (!ret.status) {
                    api.closeWin();
                }
                });
        });
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.initMark();
            // vm.makeHref('t');
           vm.fetchdata();
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
        background-position:50% 50%;
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
    left: 0;
    right:0;
    bottom:4rem;
    min-height:400px;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
}
.dt-item {
    position: relative;
    // height: 8rem;
    // height:90%;
    // padding: 0.5rem;
    background-color: white;
    text-align: left;
    display:flex;
    flex-flow:column wrap;
    //  overflow: scroll;
    // -webkit-overflow-scrolling: touch;

    .dt-i-img {
        // height:60%;
        height:350px;
        width:100%;
        display: block;
        background-size: contain;
        .slider-box{
            position: relative;
            width: 100%;
            height: 100%;
        }
        .slider-item {
            width: 100%;
            height: 100%;

            .slider-item {
                width: 100%;
                height: 100%;
                background-size:cover;
                background-repeat: no-repeat;
                background-size: 100% 100%;
            }
        }
        .slider-pagination {
            position: absolute;
            bottom: 0;
        }

        .swiper-pagination-bullet {
            background-color: white !important;
        }
        .swiper-pagination-bullet-active {
            background-color: red !important;
        }
    }
    .dt-i-name{
        box-sizing: border-box;
        font-size: 1.1rem;
        padding:0.5rem;
    }
    .dt-i-msg1 {
        box-sizing: border-box;
        padding: 0 0.8rem;
        height:1.5rem;
        line-height:1.5rem;
        font-size: 1.3rem;
        text-align: left;
        color: #fb5776;
        display: flex;
        flex-flow: row nowrap;
        align-items:baseline;
        // justify-content:flex-start;
        .dt-i-text{
            width:50%;
            font-size: 0.9rem;
            color: #666;
            // &:before {
            // content: "￥";
            // font-size: 1rem;
            // }
           .dt-i-text3{
               font-size: 0.8rem;
               color:#666;
           }
        }
    }
    .dt-i-msg2{
        width:100%;
        height: 2rem;
        box-sizing: border-box;
        padding: 0 0.5rem;
        line-height:2rem;
        display: flex;
        display: -webkit-flex; /* Safari */
        flex-flow:row nowrap;
        font-size:1.3rem;
        justify-content: flex-start;
        color: #bbb;
        .msg2-text{
            flex-grow:1;
             display: flex;
            display: -webkit-flex; /* Safari */
            flex-flow:row nowrap;
            color:#fb5776;
            align-items:baseline;
            font-weight: bold;
            .msg2-account{
                color: #ccc;
                font-size:0.9rem;
            }
        }
        .msg2-text1{
            flex-grow:1;
            display: flex;
            display: -webkit-flex; /* Safari */
            flex-flow:row nowrap;
            align-items:baseline; 
            justify-content:flex-end;
            padding-right: 0.5rem;
            .msg2-rebate{
              color:#fff;
            //   width:60%;
              padding:0px 5px;
              font-size:1rem;
              text-align: center;
              height: 1.5rem;
              line-height:1.5rem;
              border-radius:5px;
              background: -webkit-linear-gradient(left, red , #fb5776); /* Safari 5.1 - 6.0 */
              background: -o-linear-gradient(right, red, #fb5776); /* Opera 11.1 - 12.0 */  
              background: -moz-linear-gradient(right, red, #fb5776); /* Firefox 3.6 - 15 */ 
              background: linear-gradient(to right, red , #fb5776); /* 标准的语法 */ 
              
            }
        }
        
    }
    .dt-i-msg3{
        width:100%;
        box-sizing: border-box;
        font-size:1rem;
        padding:0.4rem 0;
        background-color:rgba(204,204,204,0.5);
        .msg3-text{
            height:100px;
            background:url(./assets/quan.jpg);
            background-size: 100% 100%;
            display: flex;
            display: -webkit-flex; /* Safari */
            flex-flow:row nowrap;
            align-items:baseline; 
            color:#fff;
            text-align:center;
            .msg3-text1{
                display:inline-block;
                width:65%;
                margin:auto;
            }
            .msg3-text2{
                display:inline-block;
                width:35%;
                margin:auto;
            }
        }
    }
    .dt-i-msg4{
        width:100%;
        height:2rem;
        line-height:2rem;
        box-sizing: border-box;
        padding: 0 0.5rem;
        display: flex;
        display: -webkit-flex; /* Safari */
        flex-flow:row nowrap;
        align-items:baseline; 
        border-bottom:1px solid #ccc;
        .msg4{
            text-align:center;
            flex:1;
        }
    }
    .dt-i-msg5{
       width:100%; 
       box-sizing: border-box;
       padding: 0.5rem;
       .msg5-text{
           height: 2rem;
           text-align:center;
           line-height:2rem;
       }
       .msg5-item{
           width:100%;
           height:350px;
           background-size: 100% 100%;
           margin-bottom:5px;
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
    margin-top: 0.2rem;
    //  padding: 0.5rem;
     position: fixed;
     left: 0;
     bottom: 0.1rem;
     width: 100%;
     display: flex;
     z-index: 1;
     background-color:#ddd;
     .dt-lingquan-share,.dt-lingquan-text{
        width:50%;
        height:2rem;
        line-height:2rem;
        font-size: 1.2rem;
        padding:0.5rem;
        color:#fff;
     }
     .dt-lingquan-share{
        // background: -webkit-linear-gradient(left, orange , orange); /* Safari 5.1 - 6.0 */
        // background: -o-linear-gradient(right, orange, orange); /* Opera 11.1 - 12.0 */  
        // background: -moz-linear-gradient(right, orange, orange); /* Firefox 3.6 - 15 */ 
        // background: linear-gradient(to right, orange , orange); /* 标准的语法 */ 
         display: -webkit-flex; /* Safari */
         flex-flow:row nowrap;
        .share3{
            height:2rem;
            line-height:2rem;
            flex:1.5;
            color:#000;
        }
        .share1,.share2{
            flex:1;
            height:2rem;
            line-height:2rem;
            background-size: 100% 100%;
            margin:0 0.5rem;
        }
        .share1{
            background-image: url(./assets/wx.png);
        }
        .share2{
            background-image: url(./assets/wxpen.png);
        }
     }
     .dt-lingquan-text{
        background: -webkit-linear-gradient(left, #fb5776 , red); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(right, #fb5776, red); /* Opera 11.1 - 12.0 */  
        background: -moz-linear-gradient(right, #fb5776, red); /* Firefox 3.6 - 15 */ 
        background: linear-gradient(to right, #fb5776 , red); /* 标准的语法 */ 
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