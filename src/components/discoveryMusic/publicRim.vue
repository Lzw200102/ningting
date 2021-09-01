<template>
  <!-- 轮播图 -->
  <div class="rim">
    <el-carousel :height="bannerHeight + 'px'" arrow="never">
      <el-carousel-item v-for="(item, index) in latestAlbum" :key="index">
        <el-row type="flex" class="row-bg" justify="space-around">
          <a :href="item.url"
            ><img :src="item.imageUrl + '?param=661y210'" alt="" class="img" />
          </a>
          <!-- 三图滚动 -->
          <!-- <el-col :span="7" v-for="(imgs, i) in item" :key="i"
            ><div class="grid-content bg-purple">
              <img :src="imgs.url" class="bannerimg" /></div
          ></el-col> -->
        </el-row>
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
  height: 210px;
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
</style>
