<template>
  <div>
    <!-- 播放标签 -->
    <p>总时长：{{ duration }}</p>
    <p>当前时长：{{ currentTime }}</p>
    <audio controls ref="singeBox"></audio>
  </div>
</template>
<script>
export default {
  data () {
    return {
      //
      aa: 0,
      duration: undefined, // 音乐总时长
      currentTime: undefined, // 当前播放时长
      box: undefined, // audio对象
      musicPath: '', // mp3链接
      coverPath: '', // 封面
      musicTitle: '', // 当前播放标题
      musicImg: '', //  当前播放封面
      list: [
        // 数据格式
        {
          id: 1,
          name: '所说的话',
          url:
            'http://m10.music.126.net/20210917171703/31e6c209cbe7c999feb4ea7843fd2dea/ymusic/a9c1/47f7/e72a/eeca0e403e1aa21dc60ca590be3db3f0.mp3',
          cover: '../images/img2.jpg',
          singer: '谌宥',
          time: '04:12'
        }
      ]
    }
  },
  watch: {
    aa () {
      this.updateTime()
    }
  },
  methods: {
    init () {
      this.box = this.$refs.singeBox
      this.box.src = this.list[0].url // 歌曲链接
      // 绑定三个触发方法
      // 当时长有变化时触发，由"NaN"变为实际时长也算
      this.box.ondurationchange = function () {
        console.log('时长发生了变化')
      }
      // 当前数据可用是触发
      this.box.oncanplay = function () {
        console.log('已经可以播放了')
      }
      // 播放位置发送改变时触发。
      this.box.ontimeupdate = function () {
        console.log('播放位置发送了变动')
        this.aa = ++aa
        console.log(this.aa)
      }
      // 音频播放完毕
      this.box.onended = function () {
        console.log('播放完毕，谢谢收听')
      }
      // 音频播放完毕
      this.box.onerror = function () {
        console.log('加载出错！')
      }
    },
    updateTime () {
      // 更新时间
      const total = this.formatTime(this.box.duration)
      const current = this.formatTime(this.box.currentTime)
      this.duration = `${total.min}:${total.sec}`
      this.currentTime = `${current.min}:${current.sec}`
      this.musicTitle =
        this.list[this.index].name + ' - ' + this.list[this.index].singer
      this.musicImg = this.coverPath + this.list[this.index].cover + '.jpg'
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
    }
  },
  // mounted 页面进入是完成初始化
  mounted () {
    this.init()
    this.updateTime()
  }
}
</script>
<style lang="less" scoped></style>
