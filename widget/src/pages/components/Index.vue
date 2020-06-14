<template>
  <div class="index">
    <searchbar :needRefresh="sbNeedRefresh" @sbRefreshed="sbNeedRefresh = false"></searchbar>
    <div class="main-tab">
      <tab :choosen="choosenTabs" :cpntId="mainCpntId" v-if="show"></tab> 
      <!--  :recommend="recommendTabs" -->
    </div>
  </div>
</template>

<script>
import md5 from 'js-md5'
import Searchbar from './Searchbar'
import Tab from './Tab'
export default {
  name: 'index',
  components: {
    Searchbar,
    'tab': Tab
  },
  data () {
    return {
      mainCpntId: 'l11',
      sbNeedRefresh: false,
      domain:'10.0.0.10:8080',
      choosenTabs:[],
      // choosenTabs: [
      //   {index: 1, opt_name: '淘宝', default: false, component: 'taobao', cpntId: 'l21', msg: 'xx'},
      //   {index: 2, opt_name: '拼多多', default: false, component: 'Pdd', cpntId: 'l22', msg: 'hh'}
      // ],
      // recommendTabs: [
      //   {index: 3, opt_name: '唯品会', default: false, component: 'weipinghui', cpntId: 'l23', msg: 'dd'}
      // ],
      show:false,
    }
  },
  created:function(){
    this.fetchPddData();
  },
  mounted() {
    
  },
  methods: {
    
    emitTabInitScrollTop: function () {
      this.$root.eventHub.$emit('tabInitScrollTop')
    },
    fetchPddData:function(){
      var type='pdd.goods.opt.get',
      client_id='8d2b454cedbb47ec8010a1f4cf55be3c',
      timestamp=Math.round(new Date().getTime()/1000),
      // timestamp=1530079220676,
      data_type='JSON',
      parent_opt_id=0,
      client_secret='8c92300bba7e0cfdbe8c8c24879f10d150a486b9';
      var result=client_secret+'client_id'+client_id+'data_type'+data_type+'parent_opt_id'+parent_opt_id+'timestamp'+timestamp+'type'+type+client_secret;
      var sign= md5(result).toUpperCase();
      var data='type='+type+'&data_type='+data_type+'&timestamp='+timestamp+'&client_id='+client_id+'&parent_opt_id='+parent_opt_id+'&sign='+sign
      fetch('http://gw-api.pinduoduo.com/api/router',{
        method:'POST',
        headers:{'Content-type':'application/x-www-form-urlencoded','Accept':'application/json'},
        body:data
      }).then((response)=>{
      if(response.ok){
        return response.json();
      }
      }).then((json)=>{
        this.tempchoosenTabs=json.goods_opt_get_response.goods_opt_list;
        console.log('拼多多获取的数据this.tempchoosenTabs',this.tempchoosenTabs);
        for(var i=0;i<this.tempchoosenTabs.length;i++){
          if(this.tempchoosenTabs[i].opt_name!=='海淘'){
            this.choosenTabs.push(this.tempchoosenTabs[i]);
          } 
        }
        this.choosenTabs.splice(20);
        for(var i=0;i<this.choosenTabs.length;i++){
          this.choosenTabs[i].component='Pddlistview'
        }
        this.show=true;
        console.log('this.choosenTabs',this.choosenTabs);
      })
    },
  },
  //beforeRouterEnter在组件创建之前调用，（在组件beforeCreate之前）所以它无法直接用this来访问组件实例
  beforeRouteEnter (to, from, next) {
    //next的执行在mounted之后
    next(vm => {
      // 每次进入路由重新刷新数据
      vm.sbNeedRefresh = true
      vm.emitTabInitScrollTop()
      // vm.fetchPddData();
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

a {
  color: #42b983;
}

.index {
  position: absolute;
  top: 0;
  bottom: 3rem;
  left: 0;
  width: 100%;
  overflow: hidden;
}

.main-tab {
  position: absolute;
  top: 4.5rem;
  bottom: 0;
  left: 0;
  width: 100%;
}

</style>
