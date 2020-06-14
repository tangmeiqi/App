<template>
  <div class="pdd">
    <slider></slider>
     <!-- <optionlink></optionlink>  -->
    <tab :choosen="choosenTabs"  :cpntId="cpntId" :scrollable="sonScrollable" :scrollTop="sonScrollTop" v-if="show"></tab>
    <!-- :recommend="recommendTabs" -->
  </div>
</template>

<script>
import Tab from './Tab'
import md5 from 'js-md5'
// import OptionLink from './OptionLink'
import Slider from './Slider'

export default {
  name: 'Pdd',
  props: ['cpntId', 'sonScrollable', 'sonScrollTop'],
  components: {
    'tab':Tab,
    // 'optionlink': OptionLink,
    'slider': Slider
  },
  data () {
    return {
      // choosenTabs: [
      //   {index: 21, name: '精选', default: true, component: 'Pddlistview', text: 'test1'},
      //   {index: 22, name: '女装', default: false, component: 'Pddlistview', text: 'text2'},
      //   {index: 23, name: '家居', default: false, component: 'Pddlistview', text: 'text3'},
      //   {index: 24, name: '数码', default: false, component: 'Pddlistview', text: 'text4'},
      //   {index: 25, name: '运动', default: false, component: 'Pddlistview', text: 'test3'}
      // ],
      show:false,
      choosenTabs:[],
      tempchoosenTabs:[],
      // recommendTabs: [
      //   {index: 26, opt_name: '9块9', default: false, component: 'Pddlistview', text: 'test1'},
      //   {index: 27, opt_name: '绅士', default: false, component: 'Pddlistview', text: 'test2'}
      // ]
    }
  },
  created:function(){
    // this.fetchPddData();
  },
  mounted:function(){
    this.$root.eventHub.$on('myclick',function(index){});
    
  },
  methods:{
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
      for(var i=0;i<this.choosenTabs.length;i++){
        this.choosenTabs[i].component='Pddlistview'
      }
      this.show=true;
			console.log('this.choosenTabs',this.choosenTabs);
		})
	
    },
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
h1,
h2 {
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
</style>
