<template>
  <div class="tabfooter" @touchmove.prevent>
    <ul class="bottom">
      <li class="active">
        <router-link to="/index" replace>今日推荐</router-link>
       </li><!-- <li>
        <router-link to="/special" replace>特色栏目</router-link>
      </li> --> <li>
        <router-link to="/profile" replace>个人中心</router-link>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'tabfooter',
  data () {
    return {
      userName:''
    }
  },
  methods: {
    pushToDetail: function (pprop) {
      this.$router.push({name: 'detail'})
    },
    pushToOrderDetail:function (value,item){
      this.$router.push({name: 'order_detail',query: {value: value,item: item}})
    },
    pushToPddDetail:function(pprop){
      this.$router.push({name: 'pdddetail'})
    },
    pushToSearch: function (recommend, recommendIndex) {
      // 有name和query
      this.$router.push({name: 'search', query: {recommend: recommend, recommendIndex: recommendIndex}})
    },
    pushToBrowseRecords: function () {
      this.$router.push({name: 'browse_records'})
    },
    pushToPayRecords: function () {
      this.$router.push({name: 'pay_records'})
    },
    pushToPointPage: function (pointRate) {
      this.$router.push({name: 'point_page', query: {pointRate: pointRate}})
    },
    pushToIncome:function (){
      this.$router.push({name: 'income'})
    },
    pushToSetting: function () {
      this.$router.push({name: 'setting'})
    },
    pushToBuyRecords: function (orderPoint) {
      this.$router.push({name: 'buy_records',query: {orderPoint: orderPoint}})
    },
    pushToOrderMangement:function(){
      this.$router.push({name: 'order_mangement'})
    },
    pushToMyData: function (objUser) {
      this.$router.push({name: 'mydata', query: {objUser: objUser}})
    },
    pushToLogin: function () {
      this.$router.push({name: 'login'})
    },
    pushToProfile: function (val) {
      this.$router.push({name: 'profile', query: {userName:val}})
    },
    pushToMarkRecords: function () {
      this.$router.push({name: 'mark_records'})
    },
    pushToIndex: function () {
      this.$router.push({name: 'index'})
    },
    pushToMyPrentice:function(contributeMoney){
      this.$router.push({name:'my_prentice',query:{contributeMoney:contributeMoney}})
    },
    // pushToRebate:function(user){
    //   this.$router.push({name:'rebate'})
    // },
    pushTotbspecial:function(item){
      this.$router.push({name:'tbspecial',query:{item:item}})
    },
    pushToInvite(){
      this.$router.push({name: 'invite'})
    },
    pushToUserGuide(){
      this.$router.push({name: 'user_guide'})
    },
    pushToCustomService(){
      this.$router.push({name: 'custom_service'})
    },
    pushToVersionInf(){
      this.$router.push({name: 'version_inf'})
    },
  },
  mounted () {
    this.$root.eventHub.$on('pushToIndex', this.pushToIndex)
    this.$root.eventHub.$on('pushToSearch', this.pushToSearch)
    this.$root.eventHub.$on('pushToDetail', this.pushToDetail)
    this.$root.eventHub.$on('pushToOrderDetail', this.pushToOrderDetail)
    this.$root.eventHub.$on('pushToPddDetail', this.pushToPddDetail)
    this.$root.eventHub.$on('pushToBrowseRecords', this.pushToBrowseRecords)
    this.$root.eventHub.$on('pushToPayRecords', this.pushToPayRecords)
    this.$root.eventHub.$on('pushToPointPage', this.pushToPointPage)
    this.$root.eventHub.$on('pushToIncome', this.pushToIncome)
    this.$root.eventHub.$on('pushToSetting', this.pushToSetting)
    this.$root.eventHub.$on('pushToBuyRecords', this.pushToBuyRecords)
    this.$root.eventHub.$on('pushToOrderMangement', this.pushToOrderMangement)
    this.$root.eventHub.$on('pushToMyData', this.pushToMyData)
    this.$root.eventHub.$on('pushToLogin', this.pushToLogin)
    this.$root.eventHub.$on('pushToProfile', this.pushToProfile)
    this.$root.eventHub.$on('pushToMarkRecords', this.pushToMarkRecords)
    this.$root.eventHub.$on('pushToMyPrentice',this.pushToMyPrentice)
    // this.$root.eventHub.$on('pushToRebate',this.pushToRebate)
    this.$root.eventHub.$on('pushTotbspecial',this.pushTotbspecial)
    this.$root.eventHub.$on('pushToInvite',this.pushToInvite)
    this.$root.eventHub.$on('pushToUserGuide',this.pushToUserGuide)
    this.$root.eventHub.$on('pushToCustomService',this.pushToCustomService)
    this.$root.eventHub.$on('pushToVersionInf',this.pushToVersionInf)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tabfooter {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 3rem;
  font-size: 0.875rem;
  z-index: 0;
}

ul {
  margin: 0;
  list-style-type: none;
}
.bottom {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0;
  border-top: 1px solid #EEE;
  background-color: #F8F7F3;
}

li {
  margin: 0;
  width: 33.3%;
  line-height: 3rem;
  display: inline-block;
}

a {
  color: #999;
  text-decoration: none;
}
.router-link-active {
  color: #FA4866;
}
</style>
