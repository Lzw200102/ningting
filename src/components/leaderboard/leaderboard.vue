<template>
  <div class="leaderboard">
    <!-- 排行榜 -->
    <el-aside>
      <h4 class="h4">排行榜单</h4>
      <ui class="ui">
        <li
          class="list"
          v-for="(v, i) in featureRanking"
          :key="i"
          @click="gotolistdetails(v.id, v.playCount)"
        >
          <div class="list-img">
            <img :src="v.coverImgUrl + '?param=150y150'" alt="" />
          </div>
          <div class="list-title">
            <h4>{{ v.name }}</h4>
            <h6>{{ v.updateFrequency }}</h6>
          </div>
        </li>
        <li
          class="list"
          v-for="(v2, i2) in featureRankingglobal"
          :key="'list' + i2"
          @click="gotolistdetails(v2.id, v2.playCount)"
        >
          <div class="list-img">
            <img :src="v2.coverImgUrl + '?param=150y150'" alt="" />
          </div>
          <div class="list-title">
            <h4>{{ v2.name }}</h4>
            <h6>{{ v2.updateFrequency }}</h6>
          </div>
        </li>
      </ui>
    </el-aside>
    <router-view />
  </div>
</template>
<script>
import { getniceSongList } from '../plugins/frontPage'
export default {
  data () {
    return {
      // dynamic: 0,
      // dynamic2: 0,
      // 特色榜(4条）
      featureRanking: [],
      // 全球榜(n-4条）
      featureRankingglobal: []
    }
  },
  methods: {
    // 获取排行榜单
    getniceSongList () {
      getniceSongList().then(res => {
        //   特色榜单
        this.featureRanking = res.list.slice(0, 4)
        //  全球榜单
        this.featureRankingglobal = res.list.slice(4, 29)
      })
    },
    //  去歌单详细
    gotolistdetails (id, playCount) {
      this.$router.push({
        name: 'leaderboardDetails',
        query: {
          id: id
        }
      })
    }
    // getMoney: function (index) {
    //   console.log(index)
    //   // 点击添加字体颜色，其他的删除class名称
    //   this.dynamic = index
    // }
  },
  mounted () {
    this.getniceSongList()
  }
}
</script>
<style scoped>
/* 排行榜样式以乱 */
.el-container {
  width: 1260px;
  padding: 25px 0 85px;
  margin: 0 auto;
}
.el-aside {
  width: 310px;
  background-color: cadetblue;
}
.el-aside .h4 {
  padding: 0 5px 10px;
}
.el-aside .ui :hover {
  background-color: rgb(104, 209, 195);
  cursor: pointer;
}
.el-aside .list {
  display: flex;
  justify-content: flex-start;
  padding: 10px;
}
.el-aside .list-img img {
  height: 50px;
  width: 50px;
  border-radius: 15px;
}
.el-aside .list-title {
  padding: 0 10px 10px;
}
.el-aside .list-title h6 {
  padding: 10px 0 0;
}
.el-main {
  width: 930px;
  padding: 0;
}
.el-main .ranking-list {
  padding: 40px;
}
.el-main .ranking-list-img {
  width: 150px;
  height: 150px;
  border: 2px solid rgb(104, 209, 195);
  border-radius: 10px;
  padding: 3px;
}
.ranking-list-flex {
  display: flex;
  flex-direction: column;
}
.ranking-list-title {
  width: 850px;
  height: 20px;
  margin: 0 auto;
  text-align: center;
  line-height: 20px;
}
.ranking-list-title-row {
  border-bottom: 3px solid skyblue;
}
.ranking-list-row {
  background-color: #f7f7f7;
}
.ranking-list-row div {
  height: 50px;
  line-height: 50px;
}
.list-songName {
  display: flex;
  justify-content: flex-start;
}
/* .colorChange {
  background-color: rgb(104, 209, 195);
} */
</style>
