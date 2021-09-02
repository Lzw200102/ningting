<template>
  <div>
    <!-- 主页轮播图 -->
    <div class="content">
      <public-rim></public-rim>
      <!-- 分类标题 -->
      <el-row :gutter="20" class="title">
        <el-col :span="3">
          <div class="grid-content bg-purple"><h2>热门歌单</h2></div></el-col
        >
        <el-col :span="21"
          ><div class="grid-content bg-purple">
            <div class="classification">
              <p
                v-for="(v, i) of popularSongList.style"
                :key="i"
                :class="{ colorChange: i == dynamic }"
                @click="getMoney(i, v)"
              >
                {{ v }}
              </p>
            </div>
          </div></el-col
        >
      </el-row>
      <!-- 歌单 -->
      <song-list></song-list>
      <h3 class="newSong">新歌速递</h3>
      <!-- 新歌速递 -->
      <new-song-express></new-song-express>
    </div>
  </div>
</template>
<script>
// 导入公共传输文件，给兄弟组件传值
import Bus from '../utils/Bus.js'
import publicRim from './publicRim.vue'
import songList from './songList.vue'
import newSongExpress from './newSongExpress.vue'
export default {
  components: {
    publicRim,
    songList,
    newSongExpress
  },
  data () {
    return {
      dynamic: 0,
      popularSongList: {
        style: ['全部', '流行', '华语', '欧美', '韩语', '日语', '电子']
      }
    }
  },
  methods: {
    getMoney (i, v) {
      // 点击添加字体颜色，其他的删除class名称
      this.dynamic = i
      Bus.$emit('gohomeClassification', v)
    }
  }
}
</script>
<style scoped>
.content {
  width: 1260px;
  margin: 30px auto ;
}
.el-row {
  padding-top: 15px;
}
.title {
  height: 30px;
}
.bg-purple h2 {
  text-align: center;
  line-height: 30px;
}
.classification {
  display: flex;
  flex-direction: row;
}
.grid-content .bg-purple,
p {
  text-align: center;
  line-height: 30px;
  margin-right: 10px;
}
.grid-content .bg-purpleb,
p:hover {
  cursor: pointer;
}
.newSong {
  height: 20px;
  line-height: 20px;
  margin-bottom: 10px;
}
.colorChange {
  border-bottom: 1px solid #ff4757;
}
</style>
