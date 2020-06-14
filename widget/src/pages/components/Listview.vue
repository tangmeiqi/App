<template>
  <div class="listview">
     <!-- <slider></slider>    -->
   <div v-show="isFind">
      <div class="listview_header"> 
      <span>排序</span>
      <button @click="popularitySort">人气</button>
      <button @click="latestSort">最新</button>
      <button @click="saleSort">销量</button>
      <button @click="priceSort">价格</button>
    </div>
    <ul  v-for="(listItem, index) in listData" :key="index" 
        is="shop" :ownprop="listItem">
    </ul>
   </div>
    <div class="noticeMes" v-show="noFind">
      <div class="noticeText">没有收到相关商品，点击拼多多去看看</div>
    </div>
  </div>
</template>

<script>
  // import Item from './Item'
  import Shop from './Shop'
  import elasticsearch from 'elasticsearch';
  // import Slider from './Slider'

  export default {
    name: 'listview',
    props: ['scrollBottom', 'msg','type','index','currentPage'],
    components: {
      // 'item': Item,
      'shop': Shop,
      // 'slider': Slider
    },
    
    data () {
      return {
        start: 0,
        i: 0,
        tag: this.msg,
        // orderBy:1,
        listData: [],
        isFind:false,
        noFind:true,
        pagingI:1,
        from:0,
        query: {},
        sort: [{
          "zkFinalPrice":{ //这里根据要求更改
            "order":"asc"//价格升序，其他降序
          }
        }],
        esclient:new elasticsearch.Client({
                  host: '47.97.153.221:9200',
                }),
        
      }
    },
    computed: {
      listDataShow: function () {
        return this.listData.slice(this.start, this.end)
      },
       size () {
        return this.pagingI*20;
      }
    },
    methods: {
      priceSort () {
        this.sort=[
          {
            "zkFinalPrice":{ //这里根据需求更改
              "order":"asc"
            }
          }
        ];
        this.scrollBottomChanged(true);
      },
      saleSort () {
        this.sort=[
          {
            "volume":{ //这里根据需求更改
              "order":"desc"
            }
          }
        ];
        this.scrollBottomChanged(true);
      },
      popularitySort () {
         this.sort=[
            {
              "_script":{
                  "script":"def popularity = doc['volume'].value * 0.8 + doc['couponRemainCount'].value * 0.2;return popularity",
                  "type":"number",
                  "order":"desc"
              }
            }
          ]
        this.scrollBottomChanged(true);
          // this.listData.sort((a, b)=>{
          //  return a.popularity - b.popularity
          // });
      },
      latestSort () {
        this.sort=[
          {
            "createTime":{ //这里根据需求更改
              "order":"desc"
            }
          }
        ];
        this.scrollBottomChanged(true);
          // this.listData.sort((a, b)=>{
          //  return a.latest - b.latest
          // });
      },
      reSearch(){
        if(this.type==7){
          this.query={
              "term":{
                "category":this.msg //这里填分类参数
              }
            };
        }else if(this.type==1){
          this.query={
            "bool":{
              "should":[
                {
                  "match_phrase":{
                    "title":this.msg 	//这里填搜索框的词
                  }
                },
                {
                  "match_phrase":{
                    "shopTitle":this.msg 	//这里填搜索框的词
                  }
                },
                {
                  "term":{
                    "category":this.msg	//这里填搜索框的词
                  }
                },
                {
                  "match":{
                    "title":this.msg	//这里填搜索框的词
                  }
                }
              ]
            }
          }
        }
        this.scrollBottomChanged(true);
      },
      sendpaging(){
        this.pagingI++;
        this.scrollBottomChanged(true);
      },
      firstLoadData(){
        if(this.index==this.currentPage){
            this.query={
            "term":{
              "category":this.msg //这里填分类参数
            }
          },
          this.scrollBottomChanged(true)
            }
      },
      scrollBottomChanged: function (init) {
        // if (this.scrollBottom || init) {
          if (init) {
          this.esclient.search({
            index: 'ssb',
            type: 'good',
            body: {
                "from":this.from,
                "size":this.size,
                "query":this.query,
                "sort":this.sort,
            }
          }).then( (resp) => {
              this.listData = resp.hits.hits;
              console.log('listData.length',this.listData.length)
              // if(this.listData.length==0){
              //   this.isFind=false;
              //   this.noFind=true;
              // }else {
              //   this.isFind=true;
              //   this.noFind=false;
              // } 
          }, function (err) {
              console.trace(err.message);
          });
          // fetch('http://47.97.153.221:8080/app/good/getGoodList', {
          //   method: 'POST',
          //   headers: {'Content-Type':'application/x-www-form-urlencoded'},
          //   body: 'type='+this.type+'&page='+this.pagingI+'&pageSize=10&orderBy='+this.orderBy+'&keyword='+this.msg
          // }).then((response)=>{
          //   if(response.ok){
          //     return response.json();}
          // }).then((json) => {

          //     this.listData=json.result.goodsList;
          //       })
        }
      }
    },
    watch: {
      'scrollBottom': 'sendpaging',
      'msg':'reSearch',
      'currentPage':'firstLoadData'
    },
    mounted () {
      // console.log('index',this.index);
      // console.log('currentPage',this.currentPage);
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
       color:#FA5876;
       border:none;
       padding:1px 8px;
       font-size:1rem;
  }
  .noticeMes{
    width: 100%;
  }
  .noticeText{
    width: 100%;
    text-align: center;
    color:#FA5876;
    min-height:400px;
    background-color:#fff;
    padding-top:50px;
  }
</style>
