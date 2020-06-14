<template>
  <div class="optionlink">
     <!-- <ul class="ol-box">
      <li class="ol-item"><div class="ol-bg" :style="{backgroundImage: 'url(' +bg1 + ')'}"></div></li>
    </ul>  -->
     <ul class="ol-box">
      <li class="ol-item" v-for="(item,index) in specialData" :key="index" @click="linkerTo(item.title)" >
         <div class="ol-bg"> 
          <svg class="icon" >
            <use :xlink:href="item.img"></use>
          </svg>
          </div>
          <div class="ol-text">{{item.title}}</div> 
      </li>
    </ul> 
    
  </div>
</template>

<script>
// import Dummy from './Dummy'

export default {
  name: 'optionlink',
  props: ['cpntId'],
  components: {
  },
  data () {
    return {
      // bg1: Dummy.prototype.get(),
      specialData:[ 
        {title:'9.9特价',img:'#icon-9-copy-copy'},
        {title:'19.9包邮',img:'#icon-baoyou-copy-copy'},
        {title:'每日半价',img:'#icon-banjia'},
        {title:'天猫精选',img:'#icon-tianmao'},
        {title:'top100',img:'#icon-shishi'},
      ]
    }
  },
  methods:{
    linkerTo:function(item){
      this.$root.eventHub.$emit('pushTotbspecial',item)
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
.icon {
       width: 60%; 
       height: 100%;
       vertical-align: -0.15rem;
       fill: currentColor;
       overflow: hidden;
    }
.optionlink {
  margin-bottom: 0.1rem;
}

.ol-box {
  display: flex;
  display: -webkit-flex;
  flex-wrap: wrap;
  padding-bottom: 1px;
  overflow: hidden;
  background-color: white;
}

.ol-item {
  // flex: 0 0 calc(33.33% - 1px);
  flex:0 0 calc(20%);
  margin-right: -1px;
  margin-bottom: -1px;
  $borderColor: #EEE;
  // border: 1px solid $borderColor;
  position: relative;
  vertical-align: middle;
  
  &::before {
    content: "";
    display: inline-block;
    padding-bottom: 100%;
    width: .1px;
    vertical-align: middle;
  }

  .ol-bg {
    position: absolute;
    left: 0;
    top: 0.8rem;
    width: 100%;
    height: 60%;
    background-size: contain;
    background-repeat: no-repeat;
    
  }
  .ol-text{
    font-size:0.8rem;
    color:#999;
    margin-bottom:5px;
  }
}
</style>
