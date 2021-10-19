<template>
  <!-- 全部歌单 -->
  <div class="content">
    <el-row type="flex" class="row-bg" justify="space-between">
      <el-col :span="6">
        <div
          class="grid-content bg-purple"
          v-for="(v, i) in SongListData"
          :key="i"
          @click="songListDetails(v.id)"
        >
          <img  v-lazy="v.coverImgUrl" alt="" class="imgs" />
          <h6>{{ v.name }}</h6>
          <span>{{ v.creator.nickname }}</span>
        </div></el-col
      >
    </el-row>
  </div>
</template>
<script>
export default {
  props: {
    // 当前展示的数据
    SongListData: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {}
  },

  methods: {
    // 去歌单详情
    songListDetails (id) {
      this.$router.push({
        name: 'songListDetails',
        query: {
          id: id
        }
      })
    }
  }
}
</script>
<style scoped>
.el-col {
  width: 1260px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.bg-purple {
  width: 20%;
  margin-bottom: 10px;
}
.bg-purple:hover {
  cursor: pointer;
}
.bg-purple img {
  width: 230px;
  height: 220px;
  border: 0 solid white;
  border-radius: 10px;
}

.footage {
  margin-top: 20;
  text-align: center;
}
.el-pagination {
  font-weight: 700;
}
</style>
