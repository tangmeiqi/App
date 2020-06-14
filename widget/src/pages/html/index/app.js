import App from "./app.vue";
import Vue from "vue";
import vTap from "v-tap";
import router from "../../router";
import VueClipboard from 'vue-clipboard2'


import VueAwesomeSwiper from "vue-awesome-swiper";
import elasticsearch from "elasticsearch";
import "../../../../static/css/reset.css";
import vuex from "vuex";
Vue.use(vuex);

Vue.use(VueAwesomeSwiper);

Vue.use(vTap); //添加vue tap事件
VueClipboard.config.autoSetContainer = true // add this line
Vue.use(VueClipboard)

new Vue({
    el: "#app",
    render: h => h(App),
    router,
    template: "<App/>",
    components: { App },
    data: {
        eventHub: new Vue()
    }
});
var client = new elasticsearch.Client({
    host: "47.97.153.221:9200"
});
window.apiready = function() {
    window.wx = api.require("wx");
    window.trans = api.require('trans');
    // wx.isInstalled(function(ret, err) {
    //     if (ret.installed) {
    //         // alert("当前设备已安装微信客户端");
    //     } else {
    //         alert("当前设备未安装微信客户端");
    //     }
    // });

    window.baichuan = api.require("baichuan");
    var params = {
        pid: "mm_127684292_39798431_159408002",
        openType: 1,
        taokeyAppkey: "39798431"
    };

    window.baichuan.init(params, function(ret) {
        // alert(JSON.stringify(ret));
    });
    // window.baichuan.set_config(params, function (ret) {
    //     alert(JSON.stringify(ret));
    // });
};
