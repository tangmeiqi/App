<template>
<!--1. 如果轮播不需要分类，则直接在后台传输数据到这个页面，如果需要分类，
就需要在index.vue里面传数据的时候把轮播数据传过来，然后通过父组件传递数据给子组件
 2. 存在问题，轮播滑动之后就不能自动轮播了-->
  <div class="slider">
    <swiper class="slider-box" :options="swiperOption" ref="mySwiper" style="width:100%">
      <swiper-slide v-for="(item, index) in list" :key="index" class="slider-item" style="width:100%">
        <!-- <a :href="item.url" > -->
           <div class="slider-item" :style="{backgroundImage:'url(' + item.url + ')',width:'100%'}"></div> 
        <!-- </a> -->
      </swiper-slide>
      <div class="slider-pagination swiper-pagination"  slot="pagination">
      </div>
    </swiper>
  </div>
</template>

<script>
// import Dummy from './Dummy'

export default {
  name: 'slider',
  // props: ['cpntId'],
  data () {
    return {
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
        {url: require('./assets/1.jpg')},
        {url: require('./assets/2.jpg')},
        {url: require('./assets/3.jpg')},
        {url: require('./assets/4.jpg')},
        // {url: Dummy.prototype.get()}
      ]
    }
  },
  computed: {
    // last: function () {
    //   return this.cur === 0 ? this.list.length - 1 : this.cur - 1
    // },
    // next: function () {
    //   return this.cur === this.list.length - 1 ? 0 : this.cur + 1
    // },
    swiper () {
      return this.$refs.mySwiper.swiper
    }
  },
  methods: {
  },
  mounted () {
    
    this.swiper.width="375px";
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

.slider {
  position: relative;
  // position:absolute;//自己改的
  width: 100%;
  height: 8rem;
  text-align: center;
  overflow: hidden;
  // margin-bottom: 0.5rem;
}

.slider-box {
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
    // background-size: 100% 100%;
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

</style>
