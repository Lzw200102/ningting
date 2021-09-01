<template>
  <div>
    <!-- 淘汰 -->
    <!-- 创建歌单 -->
    <div class="content">
      <div class="ranking-list">
        <el-row>
          <el-col :span="5"
            ><div class="grid-content bg-purple">
              <img
                class="ranking-list-img"
                src="../images/img8.png"
                alt=""
              /></div
          ></el-col>
          <el-col :span="19"
            ><div class="grid-content bg-purple-light">
              <div class="ranking-list-flex ">
                <h3>我喜欢的音乐</h3>
                <span class="el-icon-time" style="padding:20px 0 0 ">
                  用户名
                </span>
                <h6 style="padding:10px 0 20px ">
                  更新时间：2021：4：7
                </h6>
                <div class="ranking-list-an" style="padding:15px 0 0 ">
                  <el-button>播放</el-button><el-button>添加</el-button
                  ><el-button>收藏(2222222)</el-button
                  ><el-button>分享(11111)</el-button><el-button>下载</el-button
                  ><el-button>留言板(2000070)</el-button>
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
              <h6 style="margin:0;float:left;color:#f888;">歌曲:98首</h6>
            </div></el-col
          >
          <el-col :span="18"
            ><div class="grid-content bg-purple" style=" float: right;">
              播放次数: <span style="color:#f888;">54655261</span> 次
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
          <li v-for="(song, indexsong) in newSongList" :key="indexsong">
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
                      src="../images/img8.png"
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
                  {{ song.time }}
                </div></el-col
              >
              <el-col :span="6"
                ><div class="grid-content bg-purple" style="float:left;">
                  {{ song.author }}
                </div></el-col
              >
            </el-row>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      newSongList: [
        {
          url: require('../images/img3.jpg'),
          name: '温暖',
          time: '3:00',
          author: '作者'
        },
        {
          url: require('../images/img3.jpg'),
          name: '温暖',
          time: '3:00',
          author: '作者'
        },
        {
          url: require('../images/img3.jpg'),
          name: '温暖',
          time: '3:00',
          author: '作者'
        },
        {
          url: require('../images/img3.jpg'),
          name: '温暖',
          time: '3:00',
          author: '作者'
        },
        {
          url: require('../images/img3.jpg'),
          name: '温暖',
          time: '3:00',
          author: '作者'
        }
      ]
    }
  }
}
</script>
<style lang="less" scoped>
.content {
  width: 930px;
  padding: 0;
}
.content .ranking-list {
  padding: 40px;
}
.content .ranking-list-img {
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
