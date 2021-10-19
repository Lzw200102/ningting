<template>
  <!-- 歌手分类展示 -->
  <div>
    <div class="content">
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="6">
          <div
            class="grid-content bg-purple"
            v-for="(v, i) of dataShow"
            :key="i"
            @click="getSingerId(v.id)"
          >
            <img  v-lazy="v.img1v1Url" alt="" class="imgs" />
            <h3>{{ v.name }}</h3>
          </div></el-col
        >
      </el-row>
      <!-- 分页 -->
      <div class="PagingBox">
        <div class="paging">
          <el-pagination
            background
            layout=" total,prev,pager,next"
            :total="dataShow.length"
            :key="elementui_page_component_key"
            @current-change="currentChange"
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// 导入公共传输文件，给兄弟组件传值
import Bus from '../utils/Bus.js'
export default {
  data () {
    return {
      // 类型
      type: this.type == null ? -1 : this.type,
      // 种类
      area: this.area == null ? -1 : this.area,
      // 首字母
      initial: this.initial == null ? -1 : this.initial,
      offset: 0,
      // 歌手展示
      dataShow: [],
      // 当前key -> 用于解决当前页码不能手动刷新的问题
      elementui_page_component_key: 1
    }
  },
  watch: {
    // 监听父类传来的值,变化使调用计时器,刷新页面
    area () {
      this.timer()
    },
    type () {
      this.timer()
    },
    initial () {
      this.timer()
    }
  },
  methods: {
    // 获取歌手详情
    async getSingerlist () {
      const result = await this.$http.get(
        '/artist/list?area=' +
          this.area +
          '&type=' +
          this.type +
          '&initial=' +
          this.initial +
          '&limit=30&offset=' +
          this.offset
      )
      this.dataShow = result.data.artists
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
    },
    // 跳转到歌手详情
    getSingerId (id) {
      this.$router.push('/singer/'+id)
    }
  },
  mounted () {
    this.getSingerlist()
    // gosingerList是兄弟组件内的自定义事件，msg就是接收到的值
    Bus.$on('gosingerList', type => {
      this.type = type
      console.log('type' + this.type)
    })
    Bus.$on('gosingerList2', area => {
      this.area = area
      console.log('area' + this.area)
    })
    Bus.$on('gosingerList3', initial => {
      this.initial = initial
      console.log(this.initial)
    })
  },
  // 销毁bus
  beforeDestroy () {
    // 用于解决切换分类当前页码不能刷新的问题
    this.autoIncrasePageComKey()
    Bus.$off('gosingerList')
    Bus.$off('gosingerList2')
    Bus.$off('gosingerList3')
  }
}
</script>
<style scoped>
.content {
  margin-bottom: 130px;
}

.el-col {
  width: 1260px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.bg-purple {
  width: 190px;
  height: 190px;
  margin: 10px;
  background-color: #f8f8f8;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.bg-purple h3 {
  text-align: center;
}
.bg-purple img {
  width: 159px;
  height: 159px;
  border: 0 solid white;
  border-radius: 100px;
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
