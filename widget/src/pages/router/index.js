import Vue from 'vue'
import Router from 'vue-router'
// import VueAwesomeSwiper from 'vue-awesome-swiper'

// Vue.use(VueAwesomeSwiper)

Vue.use(Router)
//相当于是在安装Router插件，下面是创建一个Router实例对象

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index',
      component: resolve => require(['@/pages/components/Index.vue'], resolve),
      meta: {keepAlive: true}
    },
    {
      /*path：路由路径*/
      path: '/index',
      /*name：路由名称（路由跳转时用）*/
      name: 'index',
      /*使用懒加载，导入对应组件*/
      component: resolve => require(['@/pages/components/Index.vue'], resolve),
      /*keepAlive：不重复加载。*/
      meta: {keepAlive: true}
    },
    {
      path: '/profile',
      name: 'profile',
      component: resolve => require(['@/pages/components/Profile.vue'], resolve),
      meta: {keepAlive: true}
    },
    {
      path: '/detail',
      name: 'detail',
      component: resolve => require(['@/pages/components/Detail.vue'], resolve)
    },
    {
      path: '/order_detail',
      name: 'order_detail',
      component: resolve => require(['@/pages/components/OrderDetail.vue'], resolve)
    },
    {
      path: '/search',
      name: 'search',
      // component: resolve => require(['@/pages/components/Search.vue'], resolve)
      component: require('@/pages/components/Search.vue')
    },
    {
      path: '/browse_records',
      name: 'browse_records',
      component: resolve => require(['@/pages/components/BrowseRecords.vue'], resolve)
    },
    {
      path: '/pay_records',
      name: 'pay_records',
      component: resolve => require(['@/pages/components/PayRecords.vue'], resolve)
    },
    {
      path: '/point_page',
      name: 'point_page',
      component: resolve => require(['@/pages/components/PointPage.vue'], resolve)
    },
    {
      path: '/income',
      name: 'income',
      component: resolve => require(['@/pages/components/Income.vue'], resolve)
    },
    {
      path: '/setting',
      name: 'setting',
      component: resolve => require(['@/pages/components/Setting.vue'], resolve)
    },
    {
      path: '/buy_records',
      name: 'buy_records',
      component: resolve => require(['@/pages/components/BuyRecords.vue'], resolve)
    },
    {
      path: '/order_mangement',
      name: 'order_mangement',
      component: resolve => require(['@/pages/components/OrderMangement.vue'], resolve)
    },
    {
      path: '/mydata',
      name: 'mydata',
      component: resolve => require(['@/pages/components/Mydata.vue'], resolve)
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['@/pages/components/Login.vue'], resolve)
    },
    {
      path: '/mark_records',
      name: 'mark_records',
      component: resolve => require(['@/pages/components/MarkRecords.vue'], resolve)
    },
    // {
    //   path: '/special',
    //   name: 'special',
    //   component: resolve => require(['@/pages/components/Special.vue'], resolve),
    //   meta: {keepAlive: true}
    // },
    {
      path:'/my_prentice',
      name:'my_prentice',
      component:resolve => require(['@/pages/components/MyPrentice.vue'], resolve),
    },
    {
      path:'/invite',
      name:'invite',
      component:resolve => require(['@/pages/components/Invite.vue'], resolve),
    },
    {
      path:'/custom_service',
      name:'custom_service',
      component:resolve => require(['@/pages/components/CustomService.vue'], resolve),
    },
    {
      path:'/user_guide',
      name:'user_guide',
      component:resolve => require(['@/pages/components/UserGuide.vue'], resolve),
    },
    {
      path:'/version_inf',
      name:'version_inf',
      component:resolve => require(['@/pages/components/VersionInf.vue'], resolve),
    },
    {
      path:'/pdddetail',
      name:'pdddetail',
      component:resolve => require(['@/pages/components/PddDetail.vue'], resolve),
    },
    {
      path:'/tbspecial',
      name:'tbspecial',
      component:resolve => require(['@/pages/components/Tbspecial.vue'], resolve),
    }
  ]
})
