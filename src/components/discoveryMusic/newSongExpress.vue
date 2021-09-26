<template>
  <!-- 新歌速递 -->
  <div class="content-newSongleft">
    <div class="newSongleft" v-for="(item, i) in latestsong" :key="i">
      <!-- 播放按钮 -->
      <div
        class="el-icon-video-play"
        id="playButton"
        @click="playSong(item.id)"
      ></div>
      <!-- 歌曲图片、歌名、歌手 -->
      <div class="song">
        <img :src="item.picUrl + '?param=45y45'" alt="" />
        <div class="writing">
          <p class="writing-p">{{ item.name }}</p>
          <p>{{ item.song.artists[0].name }}</p>
        </div>
      </div>
      <!-- 专辑名称 -->
      <div class="album">《{{ item.song.album.name }}》</div>
      <!-- 歌曲时间 -->
      <div class="time">{{ item.song.duration | GetTime() }}</div>
    </div>
  </div>
</template>
<script>
import { GetLatestSong, GetGotSinger } from '../plugins/frontPage.js'
// 播放音乐的js
import { playMisic } from '../plugins/PlayMisic.js'
// 格式化时间
import { filtrationTime } from '../images/js/SongTime'
export default {
  data () {
    return {
      // 推荐歌曲
      latestsong: '',
      Singer: '',
      // 热门歌手
      hotSinger: [],
      SongUrlid: ''
    }
  },

  filters: {
    GetTime (val) {
      return filtrationTime(val)
    },
    // 播放数量格式化
    GetPlayCount (val) {
      return val >= 10000 ? Math.floor(val / 10000) + 'w' : val
    }
  },
  methods: {
    /*
     *
     * 以下是网络请求相关的方法
     *
     */
    // 获取最新音乐
    GetLatestSong () {
      GetLatestSong().then(res => {
        this.latestsong = res.result
        console.log(this.latestsong)
      })
    },
    // 播放音乐
    playSong (id) {
      playMisic(id).then(musicdata => {
        // 通过事件总线把歌曲数据传给根组件
        this.$bus.$emit('getMusicMessage', { musicdata, id })
        let newsData = {
          picUrl: musicdata.picUrl,
          Singer: musicdata.Singer,
          picname: musicdata.picname
        }
        // 将当前播放的音乐数据传给vuex进行管理
        this.$store.commit('setMusicData', newsData)
        // 路由跳转到歌曲详情并携带相关参数
        // this.$router.push({
        //   name: 'SongDetails',
        //   query: { id: id, data: newsData }
        // })
      })
    },
    // 热门歌手
    gethotSinger () {
      GetGotSinger().then(res => {
        this.hotSinger = res.artists
      })
    }
  },
  // 生命周期函数  页面刷新时调用
  mounted () {
    this.GetLatestSong()
  }
}
</script>
<style lang="less" scoped>
.content-newSongleft {
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
  margin-bottom: 80px;
}
.newSongleft {
  width: 590px;
  height: 60px;
  margin: 10px 20px;
  border-radius: 20px;
  background-color: rgba(49, 49, 41, 0.295);
  display: flex;
  flex-direction: row;
  .el-icon-video-play {
    line-height: 60px;
    padding-left: 20px;
    font-size: 25px;
  }
  .song {
    width: 305px;
    padding-left: 45px;
    display: flex;
    flex-direction: row;
    align-items: center;
    img {
      margin-top: 10px;
      border-radius: 15px;
    }
    .writing {
      padding-left: 10px;
      .writing-p {
        width: 200px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      p:last-child {
        font-size: 12px;
      }
    }
  }
  .album {
    width: 180px;
    line-height: 60px;
    left: 20px;
    font-size: 80%;
    // 多余的
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .time {
    line-height: 60px;
  }
}
// 新歌速递的播放按钮
#playButton {
  &:hover {
    cursor: pointer;
  }
}
</style>
