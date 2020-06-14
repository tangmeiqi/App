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
  name: 'shop',
  props: ['ownprop'],
  components: {
  },
  data () {
    return {
      // backStarUrl: require('./assets/backstar.png')
    }
  },
  methods: {
    linktoItem: function () {
      this.$root.eventHub.$emit('pushToDetail')
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
  width: 100%;
  padding: 0.125rem 0;
  box-sizing: border-box;
  
  .shop-box {
    $imgh: 7rem;
    $imgp: 0.5rem;
    position: relative;
    width: 100%;
    height: $imgh + 2 * $imgp;
    background-color: white;

    .shop-avt {
      position: absolute;
      width: $imgh;
      left: $imgp;
      top: $imgp;
    }

    .shop-info {
      margin-left: $imgh + 2 * $imgp;
      padding: $imgp 0rem;
      // hei
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
            font-size:.9rem;
          }
         
        
          // .shop-star {
          //   $starH: 0.875rem;

          //   display: inline-block;
          //   position: relative;
          //   margin-left: 2rem;
          //   width: 5 * $starH;
          //   height: $starH;
          //   background-size: contain;
          //   background-repeat: no-repeat;

          //   .shop-star-front {
          //     position: absolute;
          //     left: 0;
          //     top: 0;
          //     height: 100%;
          //     background-size: cover;
          //     background-repeat: no-repeat;
          //   }
          // }
          // .shop-value {
          //   margin-left: 0.5rem;
          // }
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
