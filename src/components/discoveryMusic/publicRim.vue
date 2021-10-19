<template>
  <!-- 轮播图 -->
  <div class="layoutBox">
      <el-carousel :interval="4000" type="card" height="245px">
        <el-carousel-item v-for="(item, index) in latestAlbum" :key="index">
          <a :href="item.url">
            <img
               v-lazy="item.imageUrl + '?param=661y245'"
              alt="../images/为加载.jpg"
              class="img-row-2"
            />
          </a>
        </el-carousel-item>
      </el-carousel>
  </div>
</template>
<script>
import { GetLatestAlbum } from '../plugins/frontPage.js'
export default {
  data () {
    return {
      bannerHeight: 200,
      // 最近专辑
      latestAlbum: ''
    }
  },
  methods: {
    // 轮播图图片的大小适配
    setSize () {
      this.bannerHeight = document.body.clientWidth / 4
    },
    /*
     *
     * 以下是网络请求相关的方法
     *
     */
    // 获取轮播图
    GetLatestAlbum () {
      GetLatestAlbum().then(res => {
        this.latestAlbum = res.banners
      })
    }
  },
  // 生命周期函数  页面刷新时调用
  mounted () {
    this.setSize()
    window.addEventListener(
      'resize',
      () => {
        this.setSize()
      },
      false
    )
    this.GetLatestAlbum()
  }
}
</script>

<style lang="less" scoped>
.el-carousel {
  height: 270px;
  overflow: hidden;
}

.bannerimg {
  width: 100%;
  height: inherit;
  border-radius: 15px;
}
.img {
  border-radius: 15px;
}
//
.img-row-2 {
  height: 100%;
  margin-right: 10px;
}
</style>
