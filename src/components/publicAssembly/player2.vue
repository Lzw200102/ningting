<template>
  <div class="container">
    <!-- 进度条 -->
    <audio src="MusicUrl"></audio>
    <div class="block">
      <audio ref="singeBox"></audio>
      <el-slider
        v-model="sliderVal"
        :format-tooltip="formatTooltip"
        :min="sliderMin"
        :max="sliderMax"
        @change="spliderSelect"
      />
    </div>
    <div class="playMiun">
      <!-- 歌曲头像 -->
      <img :src="musicImg" alt="" />
      <div class="song">
        <span>{{ musicTitle }}</span>
        <p>{{ musicSinger }}</p>
      </div>
      <!-- 播放按钮 -->
      <div class="playtioa">
        <span @click="musicPlay('pre')">
          <p class="iconfont icon-icon-3"></p>
        </span>
        <span @click="musicPlay('play')">
          <p v-if="play == false" class="iconfont icon-icon-8"></p>
          <p v-else class="iconfont icon-icon-4"></p>
        </span>
        <span @click="musicPlay('next')">
          <p class="iconfont icon-icon-1"></p>
        </span>
      </div>
      <!-- 歌曲时间 -->
      <div class="time">
        <p>{{ currentTime }}</p>
        /
        <p>{{ duration }}</p>
      </div>
      <!-- 音量 -->
      <i class="iconfont icon-icon-2"></i>
      <!-- 音量条 -->
      <el-slider class="volume"></el-slider>
      <!-- 播放顺序 -->
      <div class="playOrder"><p class="iconfont icon-icon-6"></p></div>
      <!-- 歌单列表 -->
      <div class="songList">
        <el-popover placement="top" width="28%" trigger="click">
          <!-- 歌单展示  -->
          <el-table :data="audio" stripe style="width: 100%">
            <el-table-column label="" width="40" align="center">
              <template #default="{ row }">
                <span>{{ row.index }}</span>
              </template>
            </el-table-column>
            <el-table-column label="歌曲标题">
              <template #default="{ row }">
                <span>{{ row.title }}</span>
              </template>
            </el-table-column>
            <el-table-column label="时间" align="center">
              <template #default="{ row }">
                <span>{{ row.time }}</span>
              </template>
            </el-table-column>
            <el-table-column label="歌手">
              <template #default="{ row }">
                <span>{{ row.artist }}</span>
              </template>
            </el-table-column>
            <el-table-column label="" align="center">
              <template #default="{ row }">
                <span class="music-btn"
                  ><i
                    :class="
                      player[row.id] && player[row.id].play
                        ? 'iconfont icon-icon-4'
                        : 'iconfont icon-icon-8'
                    "
                    @click="handlerPlay(row.id)"
                  ></i
                ></span>
              </template>
            </el-table-column>
          </el-table>
          <p class="iconfont icon-icon-" slot="reference"></p>
        </el-popover>
      </div>
    </div>
  </div>
</template>
<script>
// import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      player: {}, // 对象控制list谁在播放
      index: 0, // 当前播放的音乐索引
      play: false, // 播放状态，true为正在播放
      sliderVal: 0, // 当前时间，这个对接当前时长。
      sliderMin: 0,
      sliderMax: 0, // 总时间，这个对接总时长。
      duration: undefined, // 音乐总时长
      currentTime: undefined, // 当前播放时长
      box: undefined, // audio对象
      musicPath: 'http://bao.lqjhome.cn:3000', // mp3链接
      coverPath: '', // 封面
      musicTitle: '', // 当前播放标题
      musicSinger: '', // 当前播放的歌手
      musicImg: '', //  当前播放封面
      //
      // 音频数据存放在次
      audio: [{}],
      musicdata: {},
      SongId: null,
      aplayerFlag: false
    }
  },
  created () {
    // 接收音乐数据
    this.$bus.$on('getMusicMessage', val => {
      // 上移音乐组件
      // this.DisplayMusicComponent()
      //  获取得到的音乐数据
      var data = {
        src: val.musicdata.playUrl,
        title: val.musicdata.picname,
        artist: val.musicdata.Singer,
        pic: val.musicdata.picUrl,
        lrc: val.musicdata.lyric,
        id: val.id
      }
      // 保存音乐数据对象 和 当前播放歌曲Id
      this.musicdata = data
      this.SongId = val.id
      // 把接收到的音乐数据添加到audio[0]中  令播放组件获取数据后进入待播放
      // this.$set(this.audio,0,data)
      // 防止重复传入
      if (data.id === this.audio[0].id) {
        return null
      } else {
        this.audio.unshift(data)
        this.init()
      }
    })
  },
  methods: {
    // 上移音乐组件
    // DisplayMusicComponent () {
    //   // 显示音乐图标
    //   setTimeout(() => {
    //     // this.play = true
    //   }, 100)
    //   // 音乐组件做一次上移操作
    //   {
    //     let Aplayer = document.querySelector('.container')
    //     let strat = -90
    //     let end = -5
    //     let timer = setInterval(() => {
    //       if (!this.aplayerFlag) {
    //         Aplayer.setAttribute('style', 'bottom:' + ++strat + 'px')
    //         if (strat == end) {
    //           // 上移操作只会执行一次
    //           this.aplayerFlag = true
    //           // 清空定时器
    //           clearInterval(timer)
    //         }
    //       } else return
    //     }, 1)
    //   }
    // },
    // 监听歌曲
    init () {
      this.box = this.$refs.singeBox
      this.box.src = this.musicdata.src
      // 绑定三个触发方法
      // 当时长有变化时触发，由"NaN"变为实际时长也算
      this.box.ondurationchange = () => {
        console.log('时长发生了变化')
        this.play ? this.box.play() : this.box.pause()
        // 更新时间
        this.updateTime()
      }
      // 当前数据可用是触发
      this.box.oncanplay = () => {
        this.play ? this.box.play() : this.box.pause()
        console.log('已经可以播放了')
        // 播放歌曲
        this.musicPlay('play')
      }
      // 播放位置发送改变时触发。
      this.box.ontimeupdate = () => {
        console.log('播放位置发送了变动')
        this.updateTime()
      }
      // 音频播放完毕
      this.box.onended = () => {
        console.log('播放完毕，谢谢收听')
      }
      // 音频播放完毕
      this.box.onerror = function () {
        console.log('加载出错！')
      }
    },
    // 更新时间、数据
    updateTime () {
      const total = this.formatTime(this.box.duration)
      const current = this.formatTime(this.box.currentTime)
      this.duration = `${total.min}:${total.sec}`
      this.currentTime = `${current.min}:${current.sec}`
      // 将xx.xxx的值取整
      this.sliderVal = Math.floor(this.box.currentTime)
      this.sliderMax = Math.floor(this.box.duration)
      // 更新歌名、歌手、图片
      this.musicTitle = this.musicdata.title
      this.musicSinger = this.musicdata.artist
      this.musicImg = this.musicdata.pic
    },
    // 格式化播放时间
    formatTime (time) {
      // 格式化毫秒，返回String型分秒对象
      // 有可能没获取到，为NaN
      if (!time) return { min: '00', sec: '00' }
      return {
        min: Math.floor(time / 60)
          .toString()
          .padStart(2, '0'),
        sec: Math.floor(time % 60)
          .toString()
          .padStart(2, '0')
      }
    },
    formatTooltip (val) {
      // 格式化毫秒数，由于组件提示为纯数字，所以这里需要将数字转化为我们所需要的的格式，string类型的。'03:45',
      const time = this.formatTime(val)
      return `${time.min}:${time.sec}`
    },
    spliderSelect () {
      // 滑块松动后触发。更新当前时长，
      // 时长发生变动会init里的方法进行更新数据
      this.box.currentTime = this.sliderVal
    },
    // 底部歌单点击事件
    handlerPlay (id) {
      console.log(this.player)
      if (!this.player[id]) {
        // 没值触发新的播放
        const i = this.audio.findIndex(x => x.id === id)
        this.index = i
        this.play = false
      }
      this.musicPlay('play')
    },
    // 上一首，暂停播放，下一首
    musicPlay (flag) {
      switch (flag) {
        case 'pre':
          if (this.audio[this.index - 1]) {
            this.musicdata = this.audio[this.index - 1]
            this.box.src = this.musicdata.src
            this.index -= 1
          } else {
            this.musicdata = this.audio[0]
            this.box.src = this.musicdata.src
            this.index = 0
          }
          break
        case 'play':
          this.play = !this.play
          // 对接控件 同步 列表里的控件
          if (this.player[this.audio[this.index].id]) {
            this.player[this.audio[this.index].id].play = this.play
            console.log('1' + this.player[this.audio[this.index].id].play)
          }
          // 新的歌曲播放
          if (this.play && !this.player[this.audio[this.index].id]) {
            this.musicdata = this.audio[this.index]
            this.init()
            console.log('2' + this.player[this.audio[this.index].id])
          }
          break
        case 'next':
          if (this.audio[this.index + 1]) {
            this.musicdata = this.audio[this.index + 1]
            this.box.src = this.musicdata.src
            this.index += 1
            console.log(this.audio.length + '///')
          } else {
            this.musicdata = this.audio[this.index]
            console.log('最后一首')
          }
          break
      }
      if (this.play && !this.player[this.audio[this.index].id]) {
        this.player = {}
        this.player[this.audio[this.index].id] = {}
        this.player[this.audio[this.index].id].play = true
      } else {
        this.play ? this.box.play() : this.box.pause()
      }
    }
  },
  // mounted 页面进入是完成初始化
  mounted () {
    this.init()
    this.updateTime()
  }
}
</script>
<style lang="less" scoped>
.container {
  width: 100%;
  height: auto;
  position: fixed;
  bottom: 0;
  background-color: rgb(104, 209, 195);
  z-index: 999999;
}
.block {
  /deep/ .el-slider__runway {
    margin: 0;
  }
}
.playMiun {
  height: 65px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  & > *:hover {
    cursor: pointer;
  }
  img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin-right: 10px;
  }
  .song {
    width: 8%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-right: 30px;
  }
  .playtioa {
    width: 9%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    font-size: 45px;
  }
  .time {
    padding-right: 20px;
    font-size: 18px;
    line-height: 60px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    p {
      font-size: 16px;
    }
  }
  .volume {
    padding-right: 20px;
    width: 150px;
  }
  .playOrder {
    padding-right: 10px;
  }
}

// 阿里图片样式
.iconfont {
  font-size: 2rem;
}
.icon-icon-2 {
  padding: 0 10px;
}
</style>
<style>
/* .el-popover弹出框不在app.vue中所以需要全局设置 */
/* .el-popover {
  top: 10px !important;
} */
</style>
