<template>
  <!-- 第二版 个人中心 -->
  <div>
    <div class="content">
      <!-- 左侧 -->
      <div class="avatar">
        <img :src="backgroundUrl" alt="" />
        <div class="user">
          <img :src="avatarUrl" alt="" />
          <p class="nickname">{{ nickname }}</p>
          <el-button size="mini" round>修改信息</el-button>
        </div>
        <ul>
          <li><div class="el-icon-bottom-right">等级:</div></li>
          <li><div class="el-icon-bottom-right">年龄:</div></li>
          <li><div class="el-icon-bottom-right">地区:</div></li>
          <li><div class="el-icon-bottom-right">签名:</div></li>
        </ul>
        <div class="personalRecord">
          <div>动态 10</div>
          <div>关注 10</div>
          <div>粉丝 10</div>
        </div>
      </div>
      <!-- 中间 -->
      <div class="history">
        <div class="title">
          <h4>听歌排行</h4>
          <div>
            <a
              :class="{
                colorChange: 0 == currentItim
              }"
              @click="ChangerColor(0)"
              >所有歌曲</a
            >|<a
              :class="{
                colorChange: 1 == currentItim
              }"
              @click="ChangerColor(1)"
              >最近一周</a
            >
          </div>
        </div>
        <div class="duration">
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
          <el-row :gutter="0" v-for="(v, i) of allData" :key="i">
            <el-col :span="3">
              <div class="grid-content bg-purple">
                <p class="p1">{{ i + 1 }}</p>
              </div></el-col
            >
            <el-col :span="6"
              ><div class="grid-content bg-purple special">
                <img :src="v.song.al.picUrl" alt="" class="imgSong" />
                <p class="songName">{{ v.song.name }}</p>
              </div></el-col
            >
            <el-col :span="6"
              ><div
                class="grid-content bg-purple"
                v-for="(v2, i2) of v.song.ar"
                :key="i2"
              >
                <p>{{ v2.name }}</p>
              </div></el-col
            >
            <el-col :span="6"
              ><div class="grid-content bg-purple">
                <p class="theAlbumName">《{{ v.song.al.name }}》</p>
              </div></el-col
            >
            <el-col :span="2"
              ><div class="grid-content bg-purple">
                <p>{{ v.song.dt | GetTime() }}</p>
              </div></el-col
            >
          </el-row>
        </div>
      </div>
      <!-- 右侧 -->
      <div class="songList">
        <div class="songlist-btn">
          <button
            :class="{
              colorButtonChange: 1 == currentButtonItim
            }"
            @click="ChangerButtonColor(1)"
          >
            自建</button
          ><button
            :class="{
              colorButtonChange: 2 == currentButtonItim
            }"
            @click="ChangerButtonColor(2)"
          >
            收藏
          </button>
        </div>
        <!-- 歌单 -->
        <div class="songShow" v-if="currentButtonItim === 1">
          <div class="Show" v-for="(v, i) in songListCollection[0]" :key="i">
            <img :src="v.coverImgUrl" alt="" />
            <p>{{ v.name }}</p>
          </div>
        </div>
        <div class="songShow" v-if="currentButtonItim === 2">
          <div class="Show" v-for="(v, i) in songListCollection[1]" :key="i">
            <img :src="v.coverImgUrl" alt="" />
            <p>{{ v.name }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// 格式化时间
import { filtrationTime } from '../images/js/SongTime'
export default {
  data () {
    return {
      currentItim: 0,
      currentButtonItim: 1,
      // 用户id
      UserId: this.$store.state.userId,
      // 用户姓名
      nickname: '',
      // 用户头像
      avatarUrl: '',
      // 背景图
      backgroundUrl: '',
      // 选择是否是最近一周还是所有
      songHistory: 0,

      // 歌曲
      allData: '',

      // 歌单集合
      songListCollection: ''
    }
  },
  // 监听选择是否是最近一周还是所有
  watch: {
    songHistory () {
      this.getlistenToTheHistoryHistory()
    }
  },
  filters: {
    GetTime (val) {
      return filtrationTime(val)
    }
  },
  methods: {
    // 获取个人信息
    async getpersonalInformation () {
      const result = await this.$http.get('/user/playlist?uid=' + this.UserId)
      if (result.data.code !== 200) {
        return this.$message.error('获取用户信息失败！')
      } else {
        this.nickname = result.data.playlist[0].creator.nickname
        this.avatarUrl = result.data.playlist[0].creator.avatarUrl
        this.backgroundUrl = result.data.playlist[0].creator.backgroundUrl
        // 获取用户歌单
        this.songListCollection = this.FilterData(result.data.playlist)
        console.log(this.songListCollection)
      }
    },
    // 获取用户播放记录
    async getlistenToTheHistoryHistory () {
      const result = await this.$http.get(
        '/user/record?uid=' + this.UserId + '&type=' + this.songHistory
      )
      if (result.data.code !== 200) {
        return this.$message.error('获取用户信息失败！')
      } else {
        this.allData = result.data.allData
      }
    },
    // 判读歌单是自建还是收藏
    FilterData (arr) {
      let array = []
      // 将需要的分类数据过滤，并且保存
      let res0 = arr.filter(function (item) {
        return item.userId === 5142756048
      })
      let res1 = arr.filter(function (item) {
        return item.userId !== 5142756048
      })
      array.push(res0, res1)
      return array
    },
    // 颜色选择器
    ChangerColor (index) {
      this.currentItim = index
      this.songHistory = index
    },
    ChangerButtonColor (index) {
      this.currentButtonItim = index
    }
  },

  mounted () {
    this.getpersonalInformation()
    this.getlistenToTheHistoryHistory()
  }
}
</script>
<style lang="less" scoped>
.content {
  width: 1260px;
  height: 580px;
  margin: 30px auto 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .avatar {
    box-shadow: 2px 4px 7px #888888;
    width: 250px;
    img {
      width: 250px;
      height: 250px;
    }
    .user {
      display: flex;
      flex-direction: row;
      img {
        width: 40px;
        height: 40px;
        margin-left: 5px;
        border-radius: 15px;
      }
      p {
        width: 124px;
        padding-left: 5px;
        line-height: 40px;
        font-size: 14px;
      }
    }
    ul {
      margin-top: 10px;
      .el-icon-right {
        background-color: antiquewhite;
        padding-right: 15px;
      }
    }

    .personalRecord {
      padding-top: 10px;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      div {
        width: 40px;
      }
    }
  }
  .history {
    width: 740px;
    padding-top: 10px;
    margin: 0 10px;
    box-shadow: 2px 4px 7px #888888;
    .title {
      padding: 0 10px;
      display: flex;
      flex-direction: row;
      text-align: center;
      justify-content: space-between;
      a {
        text-align: center;
        font-size: 14px;
        padding: 0 5px;
        &:hover {
          cursor: pointer;
        }
      }
    }
    .duration {
      padding: 10px 0;
      margin: 0 10px;
      div .p1 {
        text-align: center;
      }
      .songName {
        font-size: 12px;
      }
    }
    .play {
      margin: 0 10px;
      line-height: 30px;

      .el-row {
        height: 40px;
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
        }
      }
    }
  }
  .songList {
    width: 250px;
    box-shadow: 2px 4px 7px #888888;
    .songlist-btn {
      width: 140px;
      margin: 5px auto;
      button {
        width: 70px;
        height: 36px;

        border: 1px solid #f6f6f679;
        border-radius: 30px 0 0 30px;
        &:hover {
          cursor: pointer;
        }
        &:last-child {
          border-radius: 0 30px 30px 0;
        }
        // &:last-child:hover {
        //   background-color: rgb(104, 209, 195);
        //   cursor: pointer;
        // }
      }
    }
    .songShow {
      border-top: 2px solid beige;
      display: flex;
      flex-direction: row;
      // justify-content: space-around;
      flex-wrap: wrap;
      .Show {
        width: 125px;
        height: 133px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        &:hover {
          cursor: pointer;
        }
        img {
          margin-top: 10px;
          width: 105px;
          height: 105px;
          border-radius: 10px;
        }
        p {
          width: 105px;
          font-size: 14px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}
.theAlbumName {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.colorChange {
  background-color: #ff4757;
  color: white !important;
  border-radius: 15px;
}
.colorButtonChange {
  background-color: #ff4757;
  color: white !important;
  border-radius: 15px;
}
</style>
