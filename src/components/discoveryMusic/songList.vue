<template>
  <!-- 歌单-全部歌单 -->
  <div class="content">
    <el-row type="flex" class="row-bg" justify="space-between">
      <el-col :span="6">
        <div
          class="grid-content bg-purple"
          v-for="(v, i) of Recommendresult"
          :key="i"
        >
          <img :src="v.coverImgUrl" alt="" class="imgs" />
          <h6>{{ v.name }}</h6>
          <p>{{ v.nickname }}</p>
        </div></el-col
      >
    </el-row>
  </div>
</template>
<script>
// 导入公共传输文件，给兄弟组件传值
import Bus from '../utils/Bus.js'
import { GetPlaylistContent } from '../plugins/frontPage.js'
export default {
  data () {
    return {
      // 歌单分类 默认值

      order: 'hot',
      cat: '全部',
      limit: '48',
      // 推荐歌单
      Recommendresult: []
    }
  },
  watch: {
    cat () {
      this.timer()
    }
  },
  methods: {
    // 获取推荐歌单
    GetPlaylistContent () {
      GetPlaylistContent(this.order, this.cat, this.limit).then(res => {
        this.Recommendresult = res.playlists
      })
    },
    // 这是一个定时器
    timer () {
      return setTimeout(() => {
        this.GetPlaylistContent()
      }, 10)
    }
  },
  mounted () {
    this.GetPlaylistContent()
    // gosingerList是兄弟组件内的自定义事件，msg就是接收到的值
    Bus.$on('gohomeClassification', cat => {
      this.cat = cat
      console.log('cat' + this.cat)
    })
  },
  // 销毁bus
  beforeDestroy () {
    Bus.$off('gohomeClassification')
  }
}
</script>
<style lang="less" scoped>
.el-col {
  width: 1260px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.bg-purple {
  margin: 10px 10px 0 10px;
  width: 190px;
  height: auto;
}
.bg-purple img {
  width: 190px;
  height: 190px;
  border: 0 solid white;
  border-radius: 10px;
}
</style>
