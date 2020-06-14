<template>
  <div class="listview">
  <div class="listview_header"> 
    <span>排序</span>
    <button class="button2" :class="{button1:active1==active}" @click="latestSort(1)">最新</button>
    <button class="button2" :class="{button1:active2==active}" @click="saleSort(2)">销量</button>
    <button class="button2" :class="{button1:active3==active}" @click="priceSort(3)">价格</button>
    <button class="button2" :class="{button1:active4==active}" @click="popularitySort(4)">佣金</button>
  </div>
    <ul  v-for="(listItem, index) in listData" :key="index"
        is="item" :ownprop="listItem">
    </ul>
  </div>
</template>

<script>
  import Item from './Item'
  import md5 from 'js-md5'
  // import Dummy from './Dummy'

  export default {
    name: 'Pddlistview',
    props: ['scrollBottom', 'msg','index','currentPage'],
    components: {
      'item': Item,
    },
    data () {
      return {
        start: 0,
        i: 0,
        tag: this.msg,
        active:1,
        active1:1,
        active2:2,
        active3:3,
        active4:4,
        // listData: [
        //    {price1: 6,sale:5,popularity:2,latest:1,type: 'item', shopId:1,name: '店铺名长长长长长长长长长长长长', imgUrl:"https://dummyimage.com/337x337/c1b1b8/7137d1", assess: [3, 5, 4.4], shopUrl: 'dianpuURL'},
        //    {price1: 5,sale:4,popularity:3,latest:3,ype: 'item', shopId:2,name: '店铺名长长', imgUrl: "https://dummyimage.com/272x272/7b30e/a788b", assess: [3.5, 4.3, 2.1], shopUrl: 'dianpuURL'},
        //    {price1: 4,sale:3,popularity:6,latest:5,type: 'item', shopId:3,name: '水果手机专卖店', imgUrl: "https://dummyimage.com/292x292/612eb7/bdeec9", assess: [5, 4.6, 3.9], shopUrl: 'dianpuURL'},
        //    {price1: 3,sale:6,popularity:4,latest:6,type: 'item', itemId:1, name: '商品名长长长长长长长长长长长长', imgUrl: "https://dummyimage.com/221x221/4da67e/26ef6", price: 6.66, itemUrl: 'dianpuURL', volume: 5, discount: 10},
        //    {price1: 2,sale:1,popularity:5,latest:2,type: 'item', itemId:2,name: '商品名长长', imgUrl: "https://dummyimage.com/567x567/d65016/143ea8", price: 23.33, itemUrl: 'dianpuURL', volume: 780, discount: 10},
        //    {price1: 1,sale:2,popularity:1,latest:4,type: 'item', itemId:3,name: '商品名长', imgUrl: require('./assets/S.png'), price: 8088.00, itemUrl: 'dianpuURL', volume: 123102, discount: 10,}
        // ]
        listData:[],
        sort_type:0,
        page:1,
      }
    },
    computed: {
      listDataShow: function () {
        return this.listData.slice(this.start, this.end)
      }
    },
    methods: {
       changeTextColor(index){
        this.active=index; 
      },
      priceSort (index) {
         //将点击的分类文字变成红色
         this.changeTextColor(index);
         this.sort_type=3;
         this.page=1;
         this.listData=[];
         this.scrollBottomChanged(true);
      },
      saleSort (index) {
         //将点击的分类文字变成红色
         this.changeTextColor(index);
         this.sort_type=5;
         this.page=1;
         this.listData=[];
         this.scrollBottomChanged(true);
      },
      popularitySort (index) {
        //将点击的分类文字变成红色
         this.changeTextColor(index);
         this.sort_type=14;
         this.page=1;
         this.listData=[];
         this.scrollBottomChanged(true);
      },
      latestSort (index) {
        //将点击的分类文字变成红色
         this.changeTextColor(index);
         this.sort_type=12;
         this.page=1;
         this.listData=[];
         this.scrollBottomChanged(true);
      },
      regetdata () {
          this.page++;
          this.scrollBottomChanged(true);
      },
      reSearch (){
          this.page=1;
          this.listData=[];
          this.scrollBottomChanged(true);
      },
      firstLoadData(){
        if(this.index==this.currentPage){
          this.scrollBottomChanged(true)
        }
      },
      scrollBottomChanged: function (init) {
        if (init) {
          var list;
          var type='pdd.ddk.goods.search',
          keyword=this.msg,
          page=this.page,
          page_size=20,
          sort_type=this.sort_type,
          with_coupon=true,
          // timestamp='1530167765757',
          timestamp=Math.round(new Date().getTime()/1000),
          data_type='JSON',
          client_id='8d2b454cedbb47ec8010a1f4cf55be3c',
          client_secret='8c92300bba7e0cfdbe8c8c24879f10d150a486b9';
          var pwdStr=client_secret+'client_id'+client_id+'data_type'+data_type+'keyword'+keyword+'page'+page+'page_size'+page_size+'sort_type'+sort_type+'timestamp'+timestamp+'type'+type+'with_coupon'+with_coupon+client_secret;
          var sign=md5(pwdStr).toUpperCase();
      //		var sign='018AB408B3A1D504A1B94581C8F3DCD8';

          var data='type='+type+'&data_type='+data_type+'&timestamp='+timestamp+'&client_id='+client_id+'&keyword='+keyword+'&page='+page+'&page_size='+page_size+'&sort_type='+sort_type+'&with_coupon='+with_coupon+'&sign='+sign;
          fetch('http://gw-api.pinduoduo.com/api/router',{
          method:'POST',
          headers:{'Content-type':'application/x-www-form-urlencoded','Accept':'application/json'},
      //			headers:{'Content-Type':'application/json'},
          body:data
          }).then((response)=>{
          if(response.ok){
            return response.json();
          }
          }).then((json)=>{
            var getdata=json.goods_search_response.goods_list;
            this.listData=this.listData.concat(getdata);
            console.log('this.listData.length'+this.listData.length);
            // console.log('this.listData'+this.listData);
          }).catch(err=>{
            console.log(err)
          })
        }
      }
    },
    watch: {
      'scrollBottom': 'regetdata',
      'msg':'reSearch',
      'currentPage':'firstLoadData'
    },
    mounted () {
      this.firstLoadData();
    },

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  li {
    margin: 0;
  }

  a {
    color: #42b983;
  }

  .listview {
    position: relative;
    width: 100%;
    background-color: #EEEEEE;
    .listview_header{
      width: 100%;
      display: flex;
      flex-flow:row nowrap;
      align-items: center;
      // justify-content:space-between;
      margin-top:0.2rem;
      margin-bottom: 0.2rem;
      
      span{
        width:20%;
      }
      button{
        width:20%;
      }
    }
  }
   button{
      //  border-radius: 0.6rem;
       background-color: #EEEEEE;
      //  border-color: #FA5876;
       
       border:none;
       padding:1px 8px;
       font-size:1rem;
  }

  .button2{
    color:#000;
  }
    .button1{
   color:#FA5876;
  }
</style>