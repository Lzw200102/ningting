<template>
  <!-- 加载对应歌单歌曲 -->
  <div>
    <!-- 来自用户的歌曲数据 -->
    <div class="content" v-if="SongData">
      <div class="content-list">
        <el-row :gutter="0">
          <el-col :span="3"
            ><div class="grid-content bg-purple">
              <p class="p1">序号</p>
            </div></el-col
          >
          <el-col :span="6"
            ><div class="grid-content bg-purple">
              <p>歌曲</p>
            </div></el-col
          >
          <el-col :span="6"
            ><div class="grid-content bg-purple"><p>歌手</p></div></el-col
          >
          <el-col :span="5"
            ><div class="grid-content bg-purple"><p>专辑</p></div></el-col
          >
          <el-col :span="2"
            ><div class="grid-content bg-purple"><p>时长</p></div></el-col
          >
        </el-row>
      </div>
      <div class="play">
        <el-row :gutter="0" v-for="(v, i) of SongData" :key="i" >
          <div @click="playMusic(v.song.id)" >
            <el-col :span="3">
              <div class="grid-content bg-purple">
                <p class="p1">{{ i + 1 }}</p>
              </div></el-col
            >
            <el-col :span="6"
              ><div class="grid-content bg-purple special">
                <img  v-lazy="v.song.al.picUrl" alt="" class="imgSong" />
                <p class="songName">{{ v.song.name }}</p>
              </div></el-col
            >
            <el-col :span="5"
              ><div class="grid-content bg-purple">
                <p class="singer">{{ v.song.ar[0].name }}</p>
              </div></el-col
            >
            <el-col :span="6"
              ><div class="grid-content bg-purple">
                <p class="theAlbumName">{{ v.song.al.name }}</p>
              </div></el-col
            >
            <el-col :span="2"
              ><div class="grid-content bg-purple">
                <p>{{ v.song.dt | GetTime() }}</p>
              </div></el-col
            >
          </div>
        </el-row>
      </div>
    </div>
    <!-- 来自搜索、歌单的歌曲数据 -->
    <div class="content" v-if="SearchSongData">
      <div class="content-list">
        <el-row :gutter="0">
          <el-col :span="3"
            ><div class="grid-content bg-purple">
              <p class="p1">序号</p>
            </div></el-col
          >
          <el-col :span="6"
            ><div class="grid-content bg-purple">
              <p>歌曲</p>
            </div></el-col
          >
          <el-col :span="6"
            ><div class="grid-content bg-purple"><p>歌手</p></div></el-col
          >
          <el-col :span="5"
            ><div class="grid-content bg-purple"><p>专辑</p></div></el-col
          >
          <el-col :span="2"
            ><div class="grid-content bg-purple"><p>时长</p></div></el-col
          >
        </el-row>
      </div>
      <div class="play">
        <el-row :gutter="0" v-for="(v, i) of SearchSongData" :key="i">
          <div @click="playMusic(v.id)">
            <el-col :span="3">
              <div class="grid-content bg-purple">
                <p class="p1">{{ i + 1 }}</p>
              </div></el-col
            >
            <el-col :span="6"
              ><div class="grid-content bg-purple special">
                <img  v-lazy="v.al.picUrl" alt="" class="imgSong" />
                <p class="songName">{{ v.name }}</p>
              </div></el-col
            >
            <el-col :span="5"
              ><div class="grid-content bg-purple">
                <p class="singer">{{ v.ar[0].name }}</p>
              </div></el-col
            >
            <el-col :span="6"
              ><div class="grid-content bg-purple">
                <p class="theAlbumName">{{ v.al.name }}</p>
              </div></el-col
            >
            <el-col :span="2"
              ><div class="grid-content bg-purple">
                <p>{{ v.dt | GetTime() }}</p>
              </div></el-col
            >
          </div>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
import { filtrationTime } from '../utils/SongTime'
// 播放音乐的js
import { playMisic } from '../plugins/PlayMisic.js'
export default {
  props: ['SongData', 'SearchSongData'], 
  data () {
    return {}
  },
  filters: {
    GetTime (val) {
      return filtrationTime(val)
    }
  },
  methods: {
    playMusic (id) {
      playMisic(id).then(musicdata => {
        // 通过事件总线发送事件并传入数据 -> 歌曲数据和歌曲id
        this.$bus.$emit('getMusicMessage', { musicdata, id })
        let newsData = {
          picUrl: musicdata.picUrl,
          Singer: musicdata.Singer,
          picname: musicdata.picname
        }
        // 将当前播放的音乐数据传给vuex进行管理
        this.$store.commit('setMusicData', newsData)
        // 跳转到评论区
        this.$router.push({ name: 'SongDetails', query: { id: id } })
      })
    }
  }
}
</script>
<style lang="less" scoped>
.content {
  width: 100%;
  padding: 10px 0;

  .content-list {
    padding: 10px 0;
    margin: 0 10px;
    div .p1 {
      text-align: center;
    }
  }
  .play {
    margin: 0 10px;
    line-height: 40px;
    .play-click:hover {
      cursor: pointer;
    }
    .el-row:hover {
      cursor: pointer;
    }
    .el-row {
      height: 40px;
      width: 100%;
      background-color: antiquewhite;
      border-radius: 10px;
      margin-bottom: 10px;
      div .p1 {
        text-align: center;
      }
      div p {
        line-height: 40px;
      }
      .special {
        height: 40px;
        display: flex;
        flex-direction: row;
        .imgSong {
          margin: 5px 10px 0 0;
          width: 30px;
          height: 30px;
          border-radius: 5px;
        }
        .songName {
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
      }
    }
  }
}
.singer {
  font-size: 12px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.theAlbumName {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
</style>
