<template>
  <div class="shop">
    <div class="shop-box" @click="linktoItem">
      <div class="shop-avt" :style="{backgroundImage:img}"></div>
      <div class="shop-info">
        <div class="shop-name">{{ownprop.goods_name}}</div>
        <div class="shop-rebat">
           <span class="msg2-text1"><span class="msg2-img2"></span><span class="msg2-account">￥{{(ownprop.coupon_discount/100).toFixed(1)}}</span></span>
          <span class="msg2-text">返利￥<span class="msg2-account">{{rebate}}&nbsp;&nbsp;</span></span>
         
        </div>
        <div class="shop-assess">
          <div class="shop-assess-row row1" >
            <span class="price">￥{{price}}</span>&nbsp;
            <!-- <span class="pricetext">&nbsp;折后价</span> -->
            <span  style="text-decoration:line-through;">￥{{(ownprop.min_group_price/100).toFixed(1)}}&nbsp;</span>
          </div>
          <!-- <div class="shop-assess-row row2"><span class="pricetext">返利</span><span class="price">￥{{rebate}}</span></div> -->
          
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
      defaultimg:require('./assets/defaultimg.jpg'),
    }
  },
  computed:{
    img:function(){
      return 'url('+this.ownprop.goods_thumbnail_url+')';
      //  return this.ownprop.goods_image_url ? 'url('+this.ownprop.goods_image_url+')':'url('+this.ownprop.goods_thumbnail_url+')'
      // return this.ownprop.goods_image_url ? 'url('+this.ownprop.goods_image_url+')':'url('+this.defaultimg+')'
    },
    price:function(){
      return ((this.ownprop.min_group_price-this.ownprop.coupon_discount)/100).toFixed(1)
    },
    rebate:function(){
      var total=((this.ownprop.min_group_price-this.ownprop.coupon_discount)/100).toFixed(2)
      return (total*(this.ownprop.promotion_rate/1000)*0.4).toFixed(2)
    }
  },
  methods: {
    linktoItem: function () {
      
      
      this.$root.eventHub.$emit('pushToPddDetail', this.ownprop)
      //把this.ownprop赋值给localStorage.item
      localStorage.pdditem= JSON.stringify(this.ownprop)
      // console.log(localStorage.item)
      //本来就注释的this.$root.eventHub.$emit('toAppDate',this.ownprop)
    }
  },
  created:function(){
   
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
      left: $imgp;
      top: $imgp;
      width:$imgh;
      height:$imgh;
      background-repeat: no-repeat;
      background-size:100% 100%;
     
    }
    
    .shop-info {
      margin-left: $imgh + 2 * $imgp;
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
        width:96%;
        // height:$imgh/3;
      
      }
      .shop-rebat{
        width:100%;
        height: 2rem;
        line-height:2rem;
        display: flex;
        display: -webkit-flex; /* Safari */
        flex-flow:row nowrap;
        font-size:1rem;
        margin-top:1rem;
        color: #FA5876;
        .msg2-text{
            flex-grow:1;
             display: flex;
            display: -webkit-flex; /* Safari */
            flex-flow:row nowrap;
            // align-items:baseline;
            justify-content:flex-end;
        }
        .msg2-text1{
            flex-grow:1;
             display: flex;
            display: -webkit-flex; /* Safari */
            flex-flow:row nowrap;
            
            padding-right:0.8rem;
        }
        .msg2-img2{
            display:inline-block;
            width:3rem;
            height:2rem;
            background:url(./assets/quan.png) no-repeat;
            background-size:100% 100%;
        }
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
          }
           .pricetext{
              font-size: 0.8rem;
              color:#FA5876;
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
