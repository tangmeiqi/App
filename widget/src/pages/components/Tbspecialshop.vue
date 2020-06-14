<template>
  <div class="shop">
    <div class="shop-box" @click="linktoItem">
      <img class="shop-avt" :src="ownprop._source.picUrl" />
      <div class="shop-info">
        <div class="shop-name">{{ownprop._source.title}}</div>
        <div class="shop-assess">
          <div class="shop-assess-row row1" ><span class="price">￥{{ownprop._source.zkFinalPrice}}<span class="pricetext">&nbsp;折后价</span></span></div>
          <div class="shop-assess-row row2"><span class="sale">销量 </span><span class="sale">{{ownprop._source.volume}}</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Tbspecialshop',
  props: ['ownprop'],
  components: {
  },
  data () {
    return {
      // frontStarUrl: require('./assets/frontstar.png'),
      // backStarUrl: require('./assets/backstar.png')
    }
  },
  methods: {
    linktoItem: function () {
      this.$root.eventHub.$emit('pushToDetail', this.ownprop)
      //把this.ownprop赋值给localStorage.item
      localStorage.tbitem= JSON.stringify(this.ownprop)
      //本来就注释的this.$root.eventHub.$emit('toAppDate',this.ownprop)
    }
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

.shop {
  width: 50%;
  padding: 0.125rem 0.2rem;
  box-sizing: border-box;
  float:left;
  
  .shop-box {
    $imgh: 15rem;
    $imgp: 0.5rem;
    position: relative;
    width: 100%;
    height: $imgh + 2 * $imgp;
    background-color: white;

    .shop-avt {
      position: absolute;
      width: 100%;
      height:65%;
      // left: $imgp;
      left:0px;
      top: $imgp;
    }

    .shop-info {
    //   margin-left: $imgh + 2 * $imgp;
      padding: $imgp 0rem;
      height: $imgh;
      text-align: left;
      position:relative;

      .shop-name {
        overflow:hidden;
        text-overflow:ellipsis;
        -webkit-line-clamp:2;
        display:-webkit-box;
        -webkit-box-orient:vertical;

        color: #444;
        width:92%;
        // height:$imgh/3;
        text-overflow:ellipsis; 
        position: absolute;
        // left: $imgp;
        left:0px;
        top:($imgh + 2 * $imgp+2*$imgp)*0.65;//表示名字紧挨着图片
      
      }
      .shop-assess {
        display: inline-block;
        // margin-top: 3rem;
        color: #bbb;
        font-size: 0.875rem;
        line-height: 0.875rem;
        width:100%;

        .shop-assess-row {
          margin-bottom: 0.5rem;
          
          
          .price{
            display: inline-block;
            font-size:1.3rem;
            color:#FA5876;
            .pricetext{
              font-size: 0.8rem;
            }
          }
          .sale{
            font-size:1rem;
          } 
        }
         .row1{
           position:absolute;
           bottom:0rem;
           left:0rem;
          }
          .row2{
           position:absolute;
           bottom:0rem;
           right:0.5rem;
          }
      }
    }
  }
}

</style>