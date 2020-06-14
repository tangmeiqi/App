<template>
  <div class="markrecords">
    <div id="top">
        <div id="back" @click="back"></div>
        <div id="text">我的收藏</div>
        <div id="clear" @click="manage">{{manageWord}}</div>
    </div>
    <div id="content" :class="{inManage: !manageMode}">
        <div id="goods" v-show="show === 1">
          <div class="goods_records" v-for="(item, index) in data" :key="item.title"  >
            <div class="select"><button :class="{selected: !isSelected(index)}" @click="select(index)"></button></div>
            <div id="goods_item" @click="linktoItem(item)">
              <div class="img_goods"><img id="img1" :src="img(item,index)"></div>
              <div class="goods_msg">
                  <div class="goods_name">{{item.title}}</div>
                  <div class="price">{{item.zkFinalPrice}}<span>&nbsp;券后</span></div>
                  <div class="sales">月销：{{item.volume}}</div>
              </div>
            </div>
          </div>
          <!-- <ul v-for="(listItem, index) in data" :key="index"
                is="Shop" :ownprop="listItem">
          </ul> -->
        </div>
    </div>
    <div class="no-record" v-show="show === 0">啊哦，这里空空如也,<br>快去收藏吧~</div>
    <transition name="slide-up">
      <div class="bottom" v-show="manageMode">
        <!-- allSelected一开始是false感觉不对？ -->
        <button class="select-all" :class="{selected: !allSelected}" @click="selectAll"></button><span>{{selectLabel}}</span>
        <button class="select-submit" :class="{submitAble: submitable}" @click="unMark">取消收藏</button>
      </div>
    </transition>
  </div>
</template>

<script>
import Shop from './Shop'
export default {
  name: 'markrecords',
  props: [],
  components: {
    'Shop':Shop
  },
  data () {
    return {
      datatb: [],
      datapdd: [],
      data:[],
      show: 0,
      manageMode: false,
      selectSet: new Set(),
      selectArray: [],
      allSelected: false,
      frontStar: require('./assets/frontstar.png'),
      backStar: require('./assets/backstar.png'),
       defaultimg:require('./assets/defaultimg.jpg'),
    }
  },
  computed: {
    
    indicatorLeft: function () {
      return 'calc(' + (this.show * 50 + 25) + '% - 2rem)'
    },
    selectLabel: function () {
      return this.allSelected ? '全不选' : '全选'
    },
    submitable: function () {
      return this.selectArray.length !== 0
    },

    manageWord: function () {
      return this.manageMode ? '完成' : '编辑'
    }
  },
  methods: {
    img:function(item){
          return item.picUrl ? item.picUrl:this.defaultimg
      },
    back: function () {
      window.history.back(-1)
    },
    linktoItem: function (item) {
      if(item.avg_desc!==undefined){
        localStorage.pdditem= JSON.stringify(item)
        this.$root.eventHub.$emit('pushToPddDetail')
      }else{
        localStorage.tbitem= JSON.stringify(item)
        this.$root.eventHub.$emit('pushToDetail')
      }
      //跳到detail,并赋值item给localStorage
      
      //
      
      // localStorage.item= JSON.stringify(item)
      //
      //this.$root.eventHub.$emit('toAppDate',this.ownprop)
    },
    fetchData: function () {
      //  this.datatb=[]
      //  this.datapdd=[]
      //  this.data=[]
      //  localStorage.tbmark = ''
      //  localStorage.pddmark = ''
      // debugger
      // console.log(typeof localStorage.tbmark)
      // console.log(JSON.parse(localStorage.tbmark))
      // console.log(typeof localStorage.tbmark)
      this.datatb = localStorage.tbmark?JSON.parse(localStorage.tbmark):[];
      // console.log(localStorage.pddmark)
      // console.log(this.datatb)
      this.datapdd = localStorage.pddmark?JSON.parse(localStorage.pddmark):[];
      
      this.data=this.datatb!==[]?this.datatb.concat(this.datapdd):this.datapdd
      if(this.data!==[]){
        for(let i=0;i<this.data.length;i++){
        if(this.data[i].avg_desc!==undefined){
          console.log('pdd')
          this.data[i].picUrl = this.data[i].goods_thumbnail_url
          this.data[i].title = this.data[i].goods_name
          this.data[i].volume = this.data[i].sold_quantity
          this.data[i].zkFinalPrice = ((this.data[i].min_group_price-this.data[i].coupon_discount)/100).toFixed(1)
        }else{
          console.log('tb')
          console.log(this.data[i]._source)
          console.log(this.data[i]._source.title )
          this.data[i].picUrl = this.data[i]._source.picUrl
          this.data[i].title = this.data[i]._source.title
          this.data[i].volume = this.data[i]._source.volume
          this.data[i].zkFinalPrice = this.data[i]._source.zkFinalPrice
          // this.data[i].zkFinalPrice = ((this.data[i].min_group_price-this.data[i].coupon_discount)/100).toFixed(1)
        }
      }
      }
      
      

      if(this.data.length==0){  
        this.show=0;
      }else{
        this.show=1
      }
      //清空数据，不知道要干嘛？
      this.manageMode = false
      this.selectSet.clear()
      this.selectArray = []
    },
    manage: function () {
      this.manageMode = !this.manageMode
      // this.data = []
      // localStorage.mark = '[]'
    },
    select: function (index) {
      //set唯一的对象，已经选中就删除，没有就加上
      if (this.selectSet.has(index)) {
        this.selectSet.delete(index)
        this.allSelected = false
      } else {
        this.selectSet.add(index)
      }
      //把对象便数组
      this.selectArray = Array.from(this.selectSet)
    },
    isSelected: function (index) {
      //已经选中就返回true
      for (let i = 0; i < this.selectArray.length; i++) {
        if (this.selectArray[i] === index) {
          return true
        }
      }
    },
    selectAll: function () {
      
      //如果没全选，就添加所有
      if (!this.allSelected) {
        for (let i = 0; i < this.data.length; i++) {
          this.selectSet.add(i)
        }
        this.selectArray = Array.from(this.selectSet)
      } else {
        //如果已经全选，那么就清除所有
        this.selectSet.clear()
        this.selectArray = Array.from(this.selectSet)
      }
      //取反
      this.allSelected = !this.allSelected
    },
    //取消收藏
    unMark: function () {
      for (let i = this.data.length - 1; i >= 0; i--) {
        if (this.selectSet.has(i)) {
          //删除数据
          this.data.splice(i, 1)
          this.selectSet.delete(i)
        }
      }
      this.datatb = []
      this.datapdd = []
      for(let i=0;i<this.data.length;i++){
        if(this.data[i].avg_desc!==undefined){
          console.log('tb')
          console.log(this.data[i])
          this.datapdd.push(this.data[i])
        }else{
          console.log('pdd')
          console.log(this.data[i])
         this.datatb.push(this.data[i])
        }
      }
      localStorage.pddmark=JSON.stringify(this.datapdd)
      localStorage.tbmark = JSON.stringify(this.datatb)
      // localStorage.mark = JSON.stringify(this.data)
      this.selectArray = Array.from(this.selectSet)
      if(this.data.length==0){
        this.show=0;
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.fetchData()
    })
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
.markrecords {
  position: relative;
  height: 100%;
  z-index: 1;
  text-align: left;
}
.no-record {
  position: absolute;
  top: 30%;
  width: 100%;
  color: #AAA;
  text-align: center;
}
a {
  color: #42b983;
}
#top{
    position: relative;
    background-color:#FA5876;
    height: 5rem;
}
#back{
    position: absolute;
    width: 1.5rem;
    height: 1.5rem;
    left: 1rem;
    top: 2.5rem;
    z-index: 1;
    background-image: url(./assets/back.png);
    background-size: contain;
    background-repeat: no-repeat;
}
#text{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 6.4rem;
    line-height: 6.5rem;
    font-size:1.2rem;
    color: #FFFFFF;
    text-align: center;
}
#clear {
    position: absolute;
    right: 0.5rem;
    top: 2.5rem;
    width: 2rem;
    height: 1.75rem;
    line-height: 1.75rem;
    font-size: .875rem;
    background-size: contain;
    background-repeat: no-repeat;
    color: white;
}
#content{
    position: absolute;
    top: 5rem;
    left: 0;
    right: -2.5rem;
    bottom: 0px;
    background-color: #F4F4F4;
    overflow: scroll;
    transition: .2s;
}
#goods{
    position: absolute;
    top: 0;
    left: 2.5rem;
    right: 0;
    bottom: 0;
    z-index: 1;
}
.goods_records {
    position: relative;
    width: 100%;
    height: 128px;
    background-color:#FFFFFF;
    border-bottom: 2px #eee solid;
}

.select {
  position: absolute;
  left: -2.5rem;
  top: 0;
  width: 2.5rem;
  height: 100%;
  background-color: #FFFFFF;

  button {
    padding: 0;
    position: absolute;
    left: .625rem;
    top: calc(50% - .625rem);
    width: 1.25rem;
    height: 1.25rem;
    background-image: url(./assets/select.png);
    background-size: cover;
    background-repeat: no-repeat;
    background-color: white;
    border-radius: 50%;
    border: none;
    outline: none;
  }
}

#goods_item{
  height:125px;
  
}
.img_goods{
    position: absolute;
    left:8px;
    top:8px;
    width:112px;
    height: 112px;
}
#img1{
    width: 100%;
    height: 100%;
}
.goods_msg{
  // width:100%;
  position:relative;
  margin-left:128px;
  height:100%;

}
.goods_name{
    position: absolute;
    //left:128px;
    top:8px;
    width:92%;
    //white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
    -webkit-line-clamp:2;
    display:-webkit-box;
    -webkit-box-orient:vertical;
}
.price{
    position: absolute;
    //left:128px;
    bottom: .5rem;
    color: #FA5876;
    font-size: 1.25rem;
    
    &:before {
        content: '￥';
        font-size: 1rem;
    }
    
    span{
      font-size:.875rem;
      color:#BBB;
    }
}
.sales{
    position: absolute;
    right: 1rem;
    bottom: .5rem;
    color: #BBB;
    font-size: .875rem;
}
.inManage {
  //在上面content上写了transition: .2s;
  transform: translateX(-2.5rem);
}
.selected {
  background-image: url(./assets/select-empty.png) !important;
}
.bottom {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 3rem;
  background-color: white;
  border-top:2px solid #eee;
  transition: .2s;
  z-index: 1;

  .select-all {
    padding: 0;
    position: absolute;
    left: .625rem;
    top: calc(50% - .625rem);
    width: 1.25rem;
    height: 1.25rem;
    background-image: url(./assets/select.png);
    background-size: cover;
    background-repeat: no-repeat;
    background-color: white;
    border-radius: 50%;
    border: none;
    outline: none;
  }

  span {
    margin-left: 2.5rem;
    line-height: 3rem;
    color: #888;
  }

  .select-submit {
    width: 6rem;
    height: 100%;
    float: right;
    background-color: #CCC;
    border: 0;
    outline: none;
    color: white;
    font-size: .875rem;
  }

  .submitAble {
    background-color: #FA5876;
  }
}

.slide-up-enter-active, .slide-up-leave-active {
  transition: .3s;
}
.slide-up-enter, .slide-up-leave-to {
  //进入向上移动10rem,返回是相反即向下10rem
  transform: translateY(3rem);
}
</style>
