<template>
  <!-- 视频歌单 -->
  <div class="content">
    <el-row type="flex" class="row-bg" justify="space-between">
      <el-col :span="6">
        <div v-for="(v, i) in artists" :key="i" class="infinite-list-item">
          <img :src="v.cover" alt="" class="imgs" />
          <h6>{{ v.name }}</h6>
          <span>{{ v.artistName }}</span>
        </div>
      </el-col>
    </el-row>
    <!-- 分页 -->
    <div class="PagingBox">
      <div class="paging">
        <el-pagination
          background
          layout=" total,prev,pager,next"
          :total="artists.length"
          :key="elementui_page_component_key"
          @current-change="currentChange"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import Bus from '../utils/Bus'
export default {
  watch: {
    // 监听父类传来的值,变化使调用计时器,刷新页面
    area () {
      this.timer()
    },
    type () {
      this.timer()
    }
  },

  data () {
    return {
      // 默认数据
      area: '',
      type: '',
      limit: '50',
      offset: 0,
      // 展示视频
      artists: [],
      // 当前key -> 用于解决当前页码不能手动刷新的问题
      elementui_page_component_key: 1
    }
  },
  methods: {
    async getSingerlist () {
      const result = await this.$http.get(
        '/mv/all?area=' +
          this.area +
          '&type=' +
          this.type +
          '&limit=50' +
          '&offset=' +
          this.offset
      )
      // 解构对象
      this.artists = result.data.data
    },
    // 这是一个定时器
    timer () {
      return setTimeout(() => {
        this.getSingerlist()
      }, 10)
    },
    //  当前页数改变
    currentChange (currentPage) {
      console.log(currentPage)
      this.offset = (currentPage - 1) * 60 // 设置偏移量，一页60个歌单
      this.getSingerlist(this.offset)
    },
    // 用于解决当前页码不能手动刷新的问题
    autoIncrasePageComKey () {
      this.elementui_page_component_key++
    }
  },
  mounted () {
    // 用于解决切换分类当前页码不能刷新的问题
    this.autoIncrasePageComKey()
    this.getSingerlist()
    // goBorther是兄弟组件内的自定义事件，msg就是接收到的值
    Bus.$on('goBorther', area => {
      this.area = area
      console.log(this.area)
    })
    Bus.$on('goBorther2', type => {
      this.type = type
      console.log(this.type)
    })
  },
  // 销毁bus
  beforeDestroy () {
    Bus.$off('goBorther')
    Bus.$off('goBorther2')
  }
}
</script>
<style lang="less" scoped>
.content{
  margin-bottom: 130px;
}
.el-col {
  width: 1260px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  .infinite-list-item {
    width: 210px;
    margin: 0 21px 10px;
    img {
      width: 100%;
      height: 135px;
      border-radius: 10px;
    }
  }
}
/* 分页 */
.PagingBox {
  position: relative;
}
.paging {
  position: absolute;
  right: 50%;
  transform: translateX(50%);
  padding: 10px 0;
}
</style>
