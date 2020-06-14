<template>
  <div class="search">
    <div class="search-bar">
      <!--搜索框-->
      <form class="sb-box" @keydown="toSearch">
        <input class="sb-input" type="search"
          :placeholder="recommend[recommendIndex]" v-model="keyword" @keydown="toSearch($event)"
          @focus="done = false"/>
           <!-- @input="fetchData" -->
        <!-- 需求是这页面中，改变input的值，就调用一个事件， -->
        <!--右边的x号图标-->
        <span class="clear" @click="clearKeyword"></span>
      </form>
      <!--取消按钮-->
      <span class="sb-back" @click="goback">取消</span>
    </div>
    <div class="noinput" v-show="keyword.length === 0 && done === false">
      <div class="search-history" v-show="history.length !== 0">
        <h2>搜索历史</h2><span class="clear" @click="clearHistory"></span>
        <span v-for="(item, index) in history" :key="index" class="keyword" @touchend.prevent="searchWith(item)">{{item}}</span>
      </div>
      <div class="search-hot">
        <h2>热门推荐</h2>
        <span v-for="(item, index) in recommend" :key="index" class="keyword" @touchend.prevent="searchWith(item)">{{item}}</span>
      </div>
    </div>
    <div class="oninput" v-show="keyword.length !== 0 || done">
      <!-- <div class="auto-src">
        <span class="auto-src-tab" :style="{width: srcWidth}" :class="{activeSrc: index===curSrc}"
          v-for="(item, index) in src1" :key="index"
          @click="forwardTo(index)">{{item.id}}
        </span>
        <span class="src-indicator" :style="{transform: indicatorLeft, width: srcWidth}"></span>
      </div>    -->
       <!-- <ul class="auto-list" v-show="keyword.length !== 0 && !done">
        <li class="auto-word" v-for="(item, index) in src" :key="index" @touchend.prevent="searchWith(item)">{{item}}
          <span class="auto-but" @touchend.stop.prevent="newKeyword(item)"></span>
        </li>
       </ul>   -->
      <!-- <ul class="auto-list" v-show="keyword.length !== 0 && !done">
        <li class="auto-word" v-for="(item, index) in src[curSrc].auto" :key="index" @touchend="searchWith(item)">{{item}}
          <span class="auto-but" @touchend.stop="newKeyword(item)"></span>
        </li> 
      </ul>    
       <div class="afterinput" v-show="done">
        <div class="result-list" v-for="(item, index) in src1" :key="index" :id="'result-list'+index" :style="{transform: 'translateX(' + 100 * (index - curSrc) + '%)'}">
          <div :is="item.component" :msg="keyword2" :scrollBottom="scrolls[index].scrollBottom"
          :type="getType" ></div>
        </div>
      </div>    -->
      <!-- 上面是原版，由于不需要分类淘宝京东，所以不需要v-for="(item, index) in src这样的东西 -->

        <!-- <ul class="auto-list" v-show="keyword.length !== 0 && !done">
        <li class="auto-word" v-for="(item, index) in src" :key="index" @touchend.prevent="searchWith(item)">{{item}}
          <span class="auto-but" @touchend.stop.prevent="newKeyword(item)"></span>
        </li>
       </ul> -->
       <div class="afterinput" v-show="done">
        <div class="result-list" id="result-list">
          <pddlistview :scrollBottom="scrolls.scrollBottom" :msg="keyword2" :type="getType"></pddlistview>
        </div>  
      </div>  
    </div>
  </div>
</template>

<script>
// import Faker from './Faker'
// import Listview from './Listview'
import Pddlistview from './Pddlistview'
// import Statusbar from './Statusbar'
import elasticsearch from 'elasticsearch';

export default {
  name: 'search',
  props: [],
  components: {
    // 'listview': Listview,
    'pddlistview':Pddlistview
  },
  data () {
    return {
      // 通过this.$route.query获取到recommendIndex和recommend
      recommendIndex: this.$route.query.recommendIndex,
      keyword: '',
      keyword2:'',
      getType:1,
      history: localStorage.searchHistory === undefined ? [] : JSON.parse(localStorage.searchHistory),
      recommend: this.$route.query.recommend,
      auto: ['联想词1', '联想词2', '联想词3', '联想词4', '联想词5'],
      done: false,
      curSrc: 0,
      src1: [{id: '淘宝', component:"listview"}, {id: '拼多多', component:"pddlistview"}],
      // src:[{auto:''}],
      src:[],
      // scrolls: Array.apply(null, Array(2)).map((item, i) => {
      //       return {
      //         pageScrollTop: 0,
      //         scrollBottom: false,
      //         height: 0,
      //         pagingCount:1
      //       }
      //     }),
      scrolls:{
              sonScrollTop: -1,
              scrollBottom: false,
              height: 0,
              pagingCount:1
            },
      esclient:new elasticsearch.Client({
              host: '47.97.153.221:9200',
              log: 'trace'
              }),
    }
  },
  computed: {
    // indicatorLeft: function () {
    //   return 'translateX(' + (this.curSrc * (1 / this.src1.length * document.body.offsetWidth)) + 'px)'
    // },
    // srcWidth: function () {
    //   return 100 / this.src1.length + '%'
    // }
  },
  methods: {
    goback: function () {
      this.keyword = ''
      this.done = false
      window.history.back(-1)
    },
    // fetchData: function () {
    //   // let ret = Faker.prototype.getAuto(this.keyword)
    //   // this.src[this.curSrc].auto = ret
    //   this.esclient.search({
    //         index: 'ssb',
    //         type: 'good',
    //         body: {
    //             "size":0,
    //             "suggest": {
    //                 "search_suggest" : {
    //                     "prefix" : this.keyword, //这里填搜索框的东西
    //                     "completion" : { 
    //                         "field" : "title_suggest" 
    //                     }
    //                 }
    //             }
    //         }
    //       }).then( (resp) => {
    //           var temp = resp.suggest.search_suggest[0].options;
    //           // 数组去重
    //           var temp1=[];
    //           for(var i=0;i<temp.length;i++){
    //             temp1.push(temp[i].text);
    //           }
    //           this.src=Array.from(new Set(temp1));
    //           // 
    //       }, function (err) {
    //           console.trace(err.message);
    //       });  
    // },
    forwardTo: function (index) {
      this.curSrc = index
      // if (this.src[this.curSrc].auto === '') {
      //   this.fetchData()
      // }
    },
    // newKeyword: function (item) {
    //   this.keyword = item
    //   this.fetchData()
    // },

    // searchWith: 通过点击历史标签、推荐标签和联想标签，进入search的方式
    searchWith: function (item) {
      this.keyword = item
      this.search()
    },
    // searchWith: 输入或未输入，直接点击enter，进入search的方式
    toSearch: function (e) {
      if (e.keyCode === 13 || e === undefined) {
        // 13是回车键
        e.preventDefault()
        if (this.keyword.length === 0) {
          this.keyword = this.recommend[this.recommendIndex]
        }
        this.search()
      }
    },
    search: function () {
      //  长度大于10的输入不存储
      if (this.keyword.length <= 15) {
        this.insertIntoHistory()
      }
      this.keyword2=this.keyword;
      this.scrolls.pagingCount=1;
      // for(var i=0;i<2;i++){
      //   this.scrolls[i].pagingCount=1;
      // }
      this.done = true
    },
    // insertIntoHistory: 负责更新history和localstorage
    insertIntoHistory: function () {
      if (localStorage.searchHistory === undefined || localStorage.searchHistory === '') {
        localStorage.searchHistory = '[]'
      }
      if (Object.prototype.toString.call(this.history) !== '[object Array]') {
        this.history = []
      }
      let inHistory = false
      for (let i = 0; i < this.history.length; i++) {
        if (this.history[i] === this.keyword) {
          // 如果搜索词已经在了就换到最前面
          this.history.splice(0, 0, this.history.splice(i, 1)[0])
          inHistory = true
          break
        }
      }
      //  否则插到最前面
      if (!inHistory) {
        this.history.unshift(this.keyword)
        //  history最多存储10个
        if (this.history.length > 10) {
          this.history.pop()
          //pop方法则是从数组末尾移除最后一项，然后返回移除的项
        }
      }
      localStorage.searchHistory = JSON.stringify(this.history)
      //把history转换为JSON字符串
    },
    clearHistory: function () {
      // 删除所有历史
      this.history.splice(0, this.history.length)
      localStorage.searchHistory = JSON.stringify(this.history)
      //把history转换为JSON字符串
    },
    clearKeyword: function () {
      // 清空关键字
      this.keyword = ''
      this.done = false
    },
    updateRecommend: function () {
      // 跟新评论数据
      // 为啥要赋两次值
      // 因为要通过beforeRouteEnter跟新recommend和recommendIndex
      this.recommend = this.$route.query.recommend
      this.recommendIndex = this.$route.query.recommendIndex
    },
    // 跟新Statusbar，但是代码看不懂？
    // updateStatusBar: function (isEnter) {
    //   if (isEnter) {
    //     if (navigator.userAgent.indexOf('Android') !== -1) {
    //       Statusbar.prototype.toGrey()
    //     } else {
    //       Statusbar.prototype.toDefault()
    //       Statusbar.prototype.toWhite()
    //     }
    //   } else {
    //     if (navigator.userAgent.indexOf('Android') === -1) {
    //       Statusbar.prototype.toLight()
    //     }
    //     Statusbar.prototype.toMain()
    //   }
    // },
    scroll:function(e){
      
      // let top = e.target.scrollTop
      // var height=e.target.parentNode.offsetHeight
      // if(e.target.scrollTop>this.scrolls[this.curSrc].pagingCount*2560-height){
      //   this.scrolls[this.curSrc].pagingCount++;
      //   this.scrolls[this.curSrc].scrollBottom=!this.scrolls[this.curSrc].scrollBottom;
      // }
       let top = e.target.scrollTop
        // this.scrolls[this.curPage].pageScrollTop = top
        var height=e.target.parentNode.offsetHeight
      if(e.target.scrollTop>this.scrolls.pagingCount*2560-height){
        this.scrolls.pagingCount++;
        console.log(this.pagingCount);
        this.scrolls.scrollBottom=!this.scrolls.scrollBottom;
      }
    }
  },
  mounted:function(){
    // for(var i=0;i<this.src1.length;i++){
    //   // document.getElementById('result-list'+i).addEventListener('scroll', this.scroll)
    // }
    document.getElementById('result-list').addEventListener('scroll', this.scroll);
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.updateRecommend()
      // vm.updateStatusBar(true)
    })
  },
  beforeRouteLeave (to, from, next) {
    // this.updateStatusBar(false)
    next()
  }
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

.search {
  position: absolute;
  width: 100%;
  top: 1.5rem;
  bottom: 0;
  background-color: white;
  z-index: 1;
}

.search-bar {
  display: flex;
  height: 2rem;
  padding:0.375rem;
  .sb-box {
    position: relative;
    display: inline-block;
    flex: auto;
    height: 100%;
    border-radius: 1rem;
    overflow: hidden;

    .sb-input {
      width: calc(100%);
      height: 100%;
      padding: 0 1rem;
      background-color: #F2F2F2;
      outline: none;
      border: 0;
      font-size: 0.875rem;
      color: #333;
      &::-webkit-search-cancel-button {
        display: none;
      }
    }

    .clear {
      position: absolute;
      right: .5rem;
      top: .5rem;
      width: 1rem;
      height: 1rem;
      background-image: url(./assets/clear.png);
      background-size: contain;
      background-repeat: no-repeat;
    }
  }
  .sb-back {
    width: 3rem;
    line-height: 2rem;
    font-size: 0.875rem;
  }
}
.search-hot, .search-history {
  position: relative;
  text-align: left;

  h2 {
    font-size: 1rem;
    margin: .5rem .875rem;
  }
  .keyword {
    margin: .5rem;
    display: inline-block;
    padding: 0.1875rem 1rem;
    border-radius: 1rem;
    background-color: #F2F2F2;
    font-size: .875rem;
    word-wrap: normal;
  }
}

.search-history .clear {
  position: absolute;
  right: 1rem;
  top: .5rem;
  width: 1rem;
  height: 1rem;
  background-image: url(./assets/dump.png);
  background-size: contain;
  background-repeat: no-repeat;
}

.oninput {
  position: absolute;
  left: 0;
  top: 2.75rem;//下面是修改的
  // top:0.5rem;
  right: 0;
  bottom: 0;
}
.auto-src {
  position: relative;
  height: 2rem;
  border-bottom: 1px solid #DDD;

  .auto-src-tab {
    line-height: 2rem;
    display: inline-block;
  }

  .activeSrc {
    color: #FA5876;
  }

  .src-indicator {
    position: absolute;
    left: 0;
    bottom: 0;
    height: 2px;
    transition: .3s;

    &:before {
      content: '';
      display: block;
      margin: 0 auto;
      width: 61.8%;
      height: 100%;
      background-color: #FA5876;
    }
  }
}
.auto-list {
  text-align: left;
  background-color: #F2F2F2;
  font-size: 0.9375rem;

  .auto-word {
    padding-left: 1rem;
    line-height: 2.5rem;
    border-bottom: 1px solid #EEE;
    background-color: white;
  }

  .auto-but {
    float: right;
    margin: 0.75rem;
    width: 1rem;
    height: 1rem;
    background-image: url(./assets/automate.png);
    background-size: contain;
    background-repeat: no-repeat;
  }
}

.afterinput {
  width:100%;
  box-sizing: border-box;
  position: absolute;
  left: 0;
  top:0rem;
  right: 0;
  bottom: 0;
  overflow: hidden;
  
  .result-list {
    width:100%;
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    transition: transform .3s ease;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
  }
}

</style>
