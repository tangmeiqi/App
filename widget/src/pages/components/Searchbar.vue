<template>
  <!--如果你使用了触摸事件，可以调用 event.preventDefault()来阻止鼠标事件被触发。-->
  <!--<searchbar :needRefresh="sbNeedRefresh" @sbRefreshed="sbNeedRefresh = false"></searchbar>-->
  <!-- 阻止事件传播和阻止默认事件（有顺序） -->
  <div class="search" @touchmove.stop.prevent>
    <div class="searchbar">
      <!-- <div class="qscan-entry"></div> -->
      <div class="search-box"><!-- 点击事件不再重载页面 -->
      <div id="search-input" type="text" @click.prevent="linkToSearch">{{recommend[recommendIndex]}}</div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'searchbar',
  props: ['needRefresh'],
  data () {
    return {
      recommendIndex: 0,
      recommend: ['男装', '女装', '妈妈装', '女鞋', '毛衣']
    }
  },
  methods: {
    linkToSearch: function () {
      this.$root.eventHub.$emit('pushToSearch', this.recommend, this.recommendIndex)
    },
    refresh: function () {
      //进入两次，一次是false->true,一次是true变fasle
      if (this.needRefresh) {
        if (this.recommend.length > 0) {
          this.recommendIndex = Math.floor(Math.random() * this.recommend.length)
          this.$emit('sbRefreshed')
        }
      }
    }
  },
  watch: {
    'needRefresh': 'refresh'
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
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

$timeMargin: 0rem;  //时间栏
$barHeight: 2rem;   //除去时间栏的高度
$barMargin: 0.5rem; //搜索框顶距
$barMargin-top:1.5rem; 

.search {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height:3rem;
  background-color: #FA5876;
  padding-top:1.5rem;
  // padding-top:1rem;
}
.searchbar {
  // padding-top:1rem;
  position: relative;
  width: 100%;
  height: $barHeight;
  padding: $barMargin 0 $barMargin 0;
  font-size: 0.9375rem;
  background-color: #FA5876;
}

$scanmargin: 0.3rem;    //扫一扫图标的边距
$imargin: 0.3rem;       //搜索图标（放大镜🔍）的边距
$scansize: 2rem;
$isize: 2rem;

.qscan-entry {
  position: absolute;
  left: 1rem + $scanmargin;
  top: $timeMargin + $barMargin + $scanmargin;
  width: $scansize - 2 * $scanmargin;
  height: $scansize - 2 * $scanmargin;
  background-image: url(./assets/qscan.png);
  background-size: contain;
  background-repeat: no-repeat;
}

.search-box {
  position: relative;
  margin: 0 4rem;
  height: $barHeight;
  width: calc(100% - 8rem);
  border-radius: 1rem;
  overflow: hidden;
  font-size: inherit;

  &:before {
    content: "";
    position: absolute;
    left: $imargin;
    top: $imargin;
    width: $isize - 2 * $imargin;
    height: $isize - 2 * $imargin;
    background-image: url(./assets/searchicon.png);
    background-size: contain;
  }

  #search-input {
    display: inline-block;
    width: calc(100% - 3rem);
    height: 100%;
    line-height: 2rem;
    padding: 0 2rem;
    border: 0;
    color: #888;
    background-color: #F0F0F0;
    outline: none;
    font-size: 0.9375rem;
    text-align: left;
  }
}


</style>
