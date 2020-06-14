<template>
<transition name="slide-up">
  <div class="speciallist">
    <div class="top">
        <div class="back" @click="back"></div>
        <div class="text">{{specialtitle}}</div>
    </div>
     <div class="listview_header"> 
      <span>排序</span>
      <button @click="popularitySort">人气</button>
      <button @click="latestSort">最新</button>
      <button @click="saleSort">销量</button>
      <button @click="priceSort">价格</button>
    </div> 
    <div class="listview-content" id="scrollElement">
     <ul v-for="(listItem, index) in listData" :key="index" 
        is="tbspecialshop" :ownprop="listItem">
    </ul> 
    </div> 
  </div>
</transition>
</template>
<script>
import elasticsearch from "elasticsearch";
import Tbspecialshop from "./Tbspecialshop";
export default {
  name: "Tbspecial",
  props: [],
  components: {
    tbspecialshop: Tbspecialshop
  },
  data() {
    return {
      specialtitle: this.$route.query.item,
      // orderBy:1,
      type: 2,
      listData: [],
      // pagingI:1,
      from: 0,
      pageSize: 15,
      page: 1,
      scrolls: {
        pageScrollTop: 0,
        scrollBottom: false,
        height: 0,
        pagingCount: 1
      },
      query: {
        range: {
          zkFinalPrice: {
            lte: 9.9
          }
        }
      },
      sort: [
        {
          zkFinalPrice: {
            //这里根据要求更改
            order: "asc" //价格升序，其他降序
          }
        }
      ],
      client: new elasticsearch.Client({
        host: "47.97.153.221:9200"
        // log: 'trace'
      })
    };
  },
  computed: {
    size() {
      return this.pageSize * this.page;
    }
  },
  methods: {
    back() {
      history.go(-1);
    },
    getdata: function() {
      this.specialtitle = this.$route.query.item;
    },
    priceSort() {
      this.sort = [
        {
          zkFinalPrice: {
            //这里根据要求更改
            order: "asc" //价格升序，其他降序
          }
        }
      ];
      this.scrollBottomChanged(true);
    },
    saleSort() {
      this.sort = [
        {
          volume: {
            //这里根据要求更改
            order: "desc" //价格升序，其他降序
          }
        }
      ];
      this.scrollBottomChanged(true);
    },
    latestSort() {
      this.sort = [
        {
          createTime: {
            //这里根据要求更改
            order: "desc" //价格升序，其他降序
          }
        }
      ];
      this.scrollBottomChanged(true);
    },
    popularitySort() {
      this.sort = [
        {
          _script: {
            script:
              "def popularity = doc['volume'].value * 0.8 + doc['couponRemainCount'].value * 0.2;return popularity",
            type: "number",
            order: "desc"
          }
        }
      ];
      this.scrollBottomChanged(true);
    },
    scrollBottomChanged: function(init) {
      let type = this.type;
      switch (this.specialtitle) {
        case "9.9特价":
          this.query = {
            range: {
              zkFinalPrice: {
                lte: 9.9
              }
            }
          };
          break;
        case "19.9包邮":
          this.query = {
            range: {
              zkFinalPrice: {
                gt: 9.9,
                lte: 19.9
              }
            }
          };
          break;
        case "每日半价":
          this.query = {
            bool: {
              must: {
                script: {
                  script: {
                    source:
                      "doc['zkFinalPrice'].value * 2 <= doc['originalPrice'].value",
                    lang: "painless"
                  }
                }
              }
            }
          };
          break;
        case "天猫精选":
          this.query = {
            term: {
              platform: 1
            }
          };
          break;
        case "top100":
          this.query = {
            match_all: {}
          };
          break;
      }
      this.client
        .search({
          index: "ssb",
          type: "good",
          body: {
            from: this.from,
            size: this.specialtitle === "top100" ? 100 : this.size,
            query: this.query,
            sort: this.sort
          }
        })
        .then(
          resp => {
            this.listData = resp.hits.hits;
          },
          function(err) {
            console.trace(err.message);
          }
        );
    },
    scroll: function(e) {
      var height = e.target.offsetHeight;

      var top = e.target.scrollTop;
      if (top >= this.size * 128 - height) {
        this.page++;
        this.scrollBottomChanged(true);
      }
    },
    initPage: function() {
      this.page = 1;
    }
  },
  watch: {
    $route: "getdata"
  },
  mounted: function() {
    document
      .getElementById("scrollElement")
      .addEventListener("scroll", this.scroll);
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getdata();
      vm.initPage();
      vm.scrollBottomChanged(true);
    });
  }
};
</script>
<style lang="scss" scoped>
h1,
h2 {
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
// .speciallist{
//   position: relative;
//   height: 100%;
//   z-index: 1;
//   background-color:white;
// }
.top {
  background-color: #fa5876;
  height: 5rem;
  .back {
    position: absolute;
    width: 1.5rem;
    height: 1.5rem;
    left: 1rem;
    top: 2.5rem;
    // z-index: 1;
    background-image: url(./assets/back.png);
    background-size: contain;
    background-repeat: no-repeat;
  }
  .text {
    line-height: 6.5rem;
    font-size: 1.3rem;
    color: #fff;
  }
}
.speciallist {
  position: relative;
  width: 100%;
  background-color: #eeeeee;
  z-index: 1;
  height: 100%;
  .listview_header {
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    margin-top: 0.2rem;
    margin-bottom: 0.2rem;
    span {
      width: 20%;
    }
    button {
      width: 20%;
    }
  }
  .listview-content {
    box-sizing: border-box;
    position: relative;
    display: inline-block;
    padding:0 0.2rem;
    width: 100%;
    height: calc(100vh - 103px);
    vertical-align: top;
    background-color: #fff;
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }
}
button {
  //  border-radius: 0.6rem;
  background-color: #eeeeee;
  //  border-color: #FA5876;
  color: #fa5876;
  border: none;
  padding: 1px 8px;
  font-size: 1rem;
}
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.2s;
}
.slide-up-enter,
.slide-up-leave-to {
  transform: translateX(100%);
}
</style>