<template>
    <input type="text" placeholder="搜索订单编号" v-model="value" @keyup.enter="submit">
</template>
<script>
// import Tab from './Tab'

export default {
  name: 'Ordersearch',
  props: ['item'],
  components: {
    // Tab
  },
  data () {
    return {
       value:'',
    }
  },
  methods:{
    submit:function(){
      // this.value =做判断
      // alert(this.item)
      var reg = /\d{1,100}/g
      if(reg.test(this.value)){
          this.$root.eventHub.$emit('pushToOrderDetail',this.value,this.item)
          this.value = ''
          }else{
                this.$root.eventHub.$emit('showNotification', '订单编号格式错误')
            }
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
input{
      display: block;
      margin: 0 auto;
      width:70%;
      height:2rem;
      padding-left:30px;
      border:2px solid #bbb;
      border-radius:8px;
      font-size:1rem;
      background: url(./assets/searchicon.png) no-repeat;
      background-size:1.5rem;
      background-color: #fff;
}
</style>
