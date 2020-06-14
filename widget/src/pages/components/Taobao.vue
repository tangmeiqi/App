<template>
  <div class="taobao">
     <slider></slider> 
     <optionlink></optionlink>  
    <tab :choosen="choosenTabs"  :cpntId="cpntId" :scrollable="sonScrollable" :scrollTop="sonScrollTop" v-if="show"></tab>
  </div>
</template>

<script>
import Tab from "./Tab";
import OptionLink from "./OptionLink";
import Slider from "./Slider";

export default {
  name: "taobao",
  props: ["cpntId", "sonScrollable", "sonScrollTop"],
  components: {
    tab: Tab,
    optionlink: OptionLink,
    slider: Slider
  },
  data() {
    return {
      // choosenTabs: [
      //   {index: 11, opt_name: '男装', default: true, component: 'listview', text: '男装', msg: '男装'},
      //   {index: 12, opt_name: '女装', default: false, component: 'listview', text: 'text2', msg: '女装'},
      //   {index: 13, opt_name: '手机', default: false, component: 'listview', text: 'text3', msg: '手机'},
      //   {index: 14, opt_name: '球鞋', default: false, component: 'listview', text: 'text4', msg: '球鞋'},
      //   {index: 15, opt_name: '连衣裙', default: false, component: 'listview', text: 'test3', msg: '连衣裙'}
      // ],
      // recommendTabs: [
      //   {index: 16, opt_name: '风衣', default: false, component: 'listview', text: '风衣', msg: '风衣'},
      //   {index: 17, opt_name: '果干', default: false, component: 'listview', text: '果干', msg: '果干'}
      // ]
      choosenTabs: [],
      show: false,
      domain: "47.97.153.221:8080"
    };
  },
  methods: {
    fetchTabData: function() {
      fetch("http://" + this.domain + "/manage/getCategoryList")
        .then(response => {
          if (response.ok) {
            return response.json();
          }
        })
        .then(json => {
          //下面是将获取到的列表以数组对象的形式发送到子组件中去
          var Category = json.results;
          for (var i = 0; i < Category.length; i++) {
            var tempObj = {};
            tempObj.opt_name = Category[i];
            tempObj.component = "listview";
            this.choosenTabs.push(tempObj);
          }
          this.show = true;
        }).catch(err=>{
            console.log(err)
        })
    }
  },
  created: function() {
    this.fetchTabData();
  },
  mounted: function() {
    this.$root.eventHub.$on("myclick", function(index) {
      ;
    });
  }
};
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
