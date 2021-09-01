<template>
  <div class="content" v-if="update">
    <!-- 排行榜详情 -->
    <el-container>
      <!-- 排行榜 -->
      <leaderboard></leaderboard>
      <!-- 排行榜展示 -->
      <el-main>
        <div class="ranking-list">
          <el-row>
            <el-col :span="5"
              ><div class="grid-content bg-purple">
                <img class="ranking-list-img" :src="rankingPic" alt="" /></div
            ></el-col>
            <el-col :span="19"
              ><div class="grid-content bg-purple-light">
                <div class="ranking-list-flex ">
                  <h3>{{ rankingname }}</h3>
                  <span class="el-icon-time" style="padding:20px 0 0 ">
                    最近更新：{{ updateTime | GetCommonTime() }}
                  </span>
                  <h6 style="padding:10px 0 20px ">
                    ({{ rankingdescription }})
                  </h6>
                  <div class="ranking-list-an" style="padding:15px 0 0 ">
                    <el-button>播放</el-button><el-button>添加</el-button
                    ><el-button>收藏({{ subscribedCount }})</el-button
                    ><el-button>分享({{ SongListSharing }})</el-button
                    ><el-button>下载</el-button
                    ><el-button>留言板({{ song_list_message }})</el-button>
                  </div>
                </div>
              </div></el-col
            >
          </el-row>
        </div>
        <div class="ranking-list-title">
          <el-row :gutter="20" class="ranking-list-title-row">
            <el-col :span="3"
              ><div class="grid-content bg-purple">
                <span>歌曲列表</span>
              </div></el-col
            >
            <el-col :span="3"
              ><div class="grid-content bg-purple">
                <h6 style="margin:0;float:left;color:#f888;">
                  歌曲:{{ trackslength }}首
                </h6>
              </div></el-col
            >
            <el-col :span="18"
              ><div class="grid-content bg-purple" style=" float: right;">
                播放次数: <span style="color:#f888;">{{ playCount }}</span> 次
              </div></el-col
            >
          </el-row>
          <el-row :gutter="20" class="ranking-list-row">
            <el-col :span="4"
              ><div class="grid-content bg-purple">排名</div></el-col
            >
            <el-col :span="10"
              ><div class="grid-content bg-purple" style="float:left;">
                歌曲名称
              </div></el-col
            >
            <el-col :span="4"
              ><div class="grid-content bg-purple">时间</div></el-col
            >
            <el-col :span="6"
              ><div class="grid-content bg-purple" style="float:left;">
                歌手
              </div></el-col
            >
          </el-row>
          <ul>
            <li v-for="(song, indexsong) in Songcontent" :key="indexsong">
              <el-row :gutter="20" class="ranking-list-row">
                <el-col :span="4"
                  ><div class="grid-content bg-purple">
                    {{ indexsong + 1 }}
                  </div></el-col
                >
                <el-col :span="10"
                  ><div class="grid-content bg-purple" style="float:left;">
                    <div class="list-songName">
                      <img
                        :src="song.al.picUrl"
                        alt=""
                        style="height: 45px;width: 45px;border-radius: 10px;"
                      />
                      <div
                        class="el-icon-video-play"
                        style="font-size:20px;margin:0 20px"
                      ></div>
                      <div>
                        <span>{{ song.name }}</span>
                      </div>
                    </div>
                  </div></el-col
                >
                <el-col :span="4"
                  ><div class="grid-content bg-purple">
                    {{ song.dt | GetTime() }}
                  </div></el-col
                >
                <el-col :span="6"
                  ><div
                    class="grid-content bg-purple"
                    style="float:left;"
                    v-for="(v, i) in song.ar"
                    :key="i"
                  >
                    {{ v.name }}
                  </div></el-col
                >
              </el-row>
            </li>
          </ul>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import leaderboard from '../leaderboard/leaderboard.vue'
// 格式化时间
import { GetCommonTime, filtrationTime } from '../images/js/SongTime'
export default {
  components: {
    leaderboard
  },
  // 局部刷新组件要用到的数据
  inject: ['reload'],
  data () {
    return {
      // 利用v-if进行页面刷新
      update: true,
      // 接受动态路由传来的参数
      // id  /当为undefined时将狂飙榜id默认赋值
      rankingId:
        this.$route.query.id === undefined ? 19723756 : this.$route.query.id,
      // 歌单播放数量
      playCount: '',
      // 榜单名称
      rankingname: '',
      // 榜单描述
      rankingdescription: '',
      // 榜单图片
      rankingPic: '',
      // 榜单发布者头像
      rankingavatarUrl: '',
      // 昵称
      nickname: '',
      // 更新时间
      updateTime: '',
      // 收藏的人数
      subscribedCount: '',
      // 歌单留言
      song_list_message: '',
      // 歌单分享
      SongListSharing: '',
      // 收藏这个歌单的人
      getSongCollectorpic: '',

      // 歌单详细内容
      Songcontent: '',
      // 歌曲长度
      trackslength: '',

      // 相关歌单推荐
      playlists: ''
    }
  },
  watch: {
    $route: 'getPath',
    rankingId () {}
  },
  filters: {
    GetPlayCount (val) {
      return val >= 10000 ? Math.floor(val / 10000) + 'w' : val
    }, // 格式化歌曲时间
    GetTime (val) {
      return filtrationTime(val)
    },
    // 格式化更新时间
    GetCommonTime (val) {
      return GetCommonTime(val)
    },
    // 规定图片大小
    GetPic (val) {
      // picUrl 或 coverImgUrl
      return val.picUrl
        ? val.picUrl + '?param=130y130'
        : val.coverImgUrl + '?param=130y130'
    }
  },
  methods: {
    // 路由变化
    getPath () {
      console.log(1111)
      console.log(this.rankingId)

      // 重新渲染当前组件
      this.reload()
    },
    // 获取歌单描述
    async getSongDetails () {
      const result = await this.$http.get(
        '/playlist/detail?id=' + this.rankingId
      )
      if (result.status !== 200) {
        return this.$message.error('获取失败！')
      }
      this.playCount = result.data.playlist.playCount
      this.rankingname = result.data.playlist.name
      this.rankingdescription = result.data.playlist.description
      this.rankingPic = result.data.playlist.coverImgUrl
      this.rankingavatarUrl = result.data.playlist.creator.avatarUrl
      this.nickname = result.data.playlist.creator.nickname
      this.updateTime = result.data.playlist.updateTime
      this.subscribedCount = result.data.playlist.subscribedCount
      this.trackslength = result.data.playlist.tracks.length
      console.log(this.updateTime)
    },
    // 获取歌单留言、分享
    async getsongListSharing () {
      const result = await this.$http.get(
        '/playlist/detail/dynamic?id=' + this.rankingId
      )
      if (result.status !== 200) {
        return this.$message.error('获取失败！')
      }
      this.SongListSharing = result.data.shareCount
      this.song_list_message = result.data.commentCount
    },

    // 获取歌单收藏者
    async getSongCollector () {
      const result = await this.$http.get(
        '/playlist/subscribers?id=' + this.rankingId + '&limit=27'
      )
      if (result.status !== 200) {
        return this.$message.error('获取失败！')
      }
      this.getSongCollectorpic = result.data.subscribers
    },

    // 获取歌单内容
    async getSongcontent () {
      const result = await this.$http.get(
        '/playlist/detail?id=' + this.rankingId
      )
      if (result.status !== 200) {
        return this.$message.error('获取失败！')
      }
      console.log('歌单内容')
      console.log(result.data)
      this.Songcontent = result.data.playlist.tracks
    },

    // 播放歌曲
    // playMisic (id) {
    //   playMisic(id).then(musicdata => {
    //     this.$bus.$emit('getMusicMessage', musicdata)
    //     this.$router.push({
    //       name: 'SongDetails',
    //       query: { id: id, data: musicdata }
    //     })
    //   })
    // },

    // 获取相关歌单  likeness
    async getSongLikeness () {
      const result = await this.$http.get(
        '/related/playlist?id=' + this.rankingId
      )
      this.playlists = result.data.playlists
    },

    // 点击相关推荐
    gotolikeness (id) {
      this.$router.push('/rankingdetails/' + id)
    }
  },
  mounted () {
    console.log('date' + this.rankingId)
    this.getSongDetails()
    this.getsongListSharing()
    this.getSongcontent()
    this.getSongLikeness()
    this.getSongCollector()
  }
}
</script>
<style lang="less" scoped>
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
</style>
