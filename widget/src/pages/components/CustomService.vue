<!--  -->
<template>
  <div class="custom-service">
    <div id="top">
   
        <div
        id="back"
        @click="back"
      ></div>

      
      <div class="invite-wrapper">
        <div
          class="invite active"
          style="width: 100%;"
        >联系我们</div>
      </div>
    </div>
    <section>
      <p >省省帮官方客服(qq)</p>
      <p> 点击保存二维码</p>
      <!-- <a href="./assets/qqcode.png" @click="func" download="testImg.jpg" > -->
      <img
        id="testImg"
        src="./assets/qqcode.png"
        width="50%"
        alt=""
        @click="save"
      >
      <!-- </a> -->

    </section>
  </div>
</template>

<script>
export default {
  components: {},

  data() {
    return {};
  },

  methods: {
    back() {
      window.history.go(-1);
    },
    download() {
      api.download(
        {
          url: "https://i.loli.net/2019/01/07/5c32329048f0e.png",
          savePath: "fs://qq.code.png",
          report: true,
          cache: true,
          allowResume: true
        },
        function(ret, err) {
          if (ret.state == 1) {
            //下载成功
          } else {
          }
        }
      );
    },
    save() {
      // var img = document.getElementById("testImg");
      // var alink = document.createElement("a");
      // alink.href = img.src;
      // alink.download = "testImg.jpg";
      // document.body.appendChild(alink);
      // alink.target = '_self';
      // console.log(1)
      // alink.click()
      // let timer = setTimeout(()=>{
      //   this.$root.eventHub.$emit("showNotification","图片已成功保存到相册");
      // },1000)

      api.saveMediaToAlbum(
        {
          path: "fs://qq.code.png"
        },
        function(ret, err) {
          if (ret && ret.status) {
            alert("二维码已成功保存到相册");
          } else {
            alert("保存失败");
          }
        }
      );
    },
    savePicture() {
      // 创建下载任务
      console.log(1);
      let picurl = "./assets/qqcode.png";
      //图片保存到手机后的路径
      let picname = "_downloads/erwei.png";
      var dtask = plus.downloader.createDownload(picurl, {}, function(
        d,
        status
      ) {
        // 下载完成
        if (status == 200) {
          //	alert( "Download success: " + d.filename );
          plus.gallery.save(
            picname,
            function() {
              //保存到相册方法
              mui.toast("已保存到手机相册");
            },
            function() {
              mui.toast("保存失败，请重试！");
            }
          );
        } else {
          //	alert( "Download failed: " + status );
        }
      });
      //dtask.addEventListener( "statechanged", onStateChanged, false );
      dtask.start(); //开始下载
    }
  },

  computed: {},

  watch: {},

  created() {
    this.download();
  },

  mounted() {},

  destroyed() {}
};
</script>
<style lang='scss' scoped>
.custom-service {
  position: relative;
  height: 100%;
  background-color: #f4f4f4;
  text-align: left;
  z-index: 10;
  background: url("./assets/haibao.jpg") no-repeat center center / cover;
  background-position: 50% 75%;
  // z-index:-1;
  #top {
    position: relative;
    height: 6rem;
    background: #fff;
    #back {
      position: absolute;
      width: 3.5rem;
      height: 1.5rem;
      top: 2.2rem;
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
      line-height: 6rem;
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
    img {
      position: absolute;
      top: 63%;
      left: 50%;
      transform: translateX(-50%);
      webkit-touch-callout: default;
    }
    & > p:nth-child(1) {
      text-align: center;
      position: absolute;
      top: 52%;
      width: 100%;
      font-size: 20px;
    }
    & > p:nth-child(2) {
      text-align: center;
      position: absolute;
      top: 93%;
      width: 100%;
      font-size: 14px;
    }
  }
}
</style>