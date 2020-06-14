<!--  -->
<template>
  <div class="version-inf">
    <div id="top">
      <div
        id="back"
        @click="back"
      ></div>
      <div class="invite-wrapper">
        <div
          class="invite active"
          style="width: 100%;"
        >版本信息</div>
      </div>
    </div>
    <section>
      <p>当前版本 <span>V1.0.0</span></p>
      <p>新版更新 <span>暂无更新</span></p>
    </section>
  </div>
</template>

<script>
export default {
  components: {},

  data () {
    return {
    };
  },

  methods: {
    back() {
      window.history.go(-1);
    }
  },

  computed: {},

  watch: {},

  created () {},

  mounted () {},

  destroyed () {}

}

</script>
<style lang='scss' scoped>
.version-inf {
    position: relative;
    height: 100%;
    background-color: #f4f4f4;
    text-align: left;
    z-index: 1000;
    text-align: center;
    #top {
      position: relative;
      height: 5rem;
      background: #fff;
      #back {
        position: absolute;
        width: 3rem;
        height: 1.5rem;
        top: 1.75rem;
        left: 1rem;
        z-index: 1;
        background-image: url(./assets/bback.png);
        background-size: contain;
        background-repeat: no-repeat;
      }
      .invite-wrapper {
        position: absolute;
        left: 3rem;
        width: calc(100% - 3rem);
        line-height: 5rem;
        font-size: 1.2rem;
        // color: #bbb;
        display: flex;
        .invite {
          text-align: center;
          margin-left: -24px;
        }
      }
    }
    section {
      margin-top: 20px;
      background:#fff;
      text-align: left;
      p {
        line-height: 40px;
        height: 40px;
        position:relative;
        margin-left: 10px;
        span {
          color:#ddd;
          position: absolute;
          right:5px;
          top:50%;
          transform: translateY(-50%)
        }
      }
      & > p:nth-child(1) {
        margin-bottom: 0;
      }
      & > p:nth-child(2) {
        margin-top: 0;
      }
    }
}
</style>