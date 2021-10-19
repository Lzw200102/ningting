<template>
  <!-- 个人信息展示 -->
  <div>
    <div class="content">
      <el-row :gutter="20">
        <el-col :span="8" class="letf"
          ><div class="grid-content bg-purple">
            <div class="personal-left">
              <el-collapse v-model="activeNames" @change="handleChange">
                <div @click="shouSingerList">
                  <el-collapse-item title="我收藏的歌手" name="1">
                  </el-collapse-item>
                </div>
                <el-collapse-item title="我新建的歌单" name="2">
                  <div
                    class="collect"
                    v-for="(v, i) of testData"
                    :key="i"
                    @click="slideListOne = !slideListOne"
                  >
                    <img  v-lazy="v.url" alt="" />
                    <p>
                      {{ v.name }}
                    </p>
                  </div>
                </el-collapse-item>
                <el-collapse-item title="我收藏的歌曲" name="3">
                  <div
                    class="collect"
                    v-for="(v, i) of testData"
                    :key="i"
                    @click="slideListTow = !slideListTow"
                  >
                    <img  v-lazy="v.url" alt="" />
                    <p>
                      {{ v.name }}
                    </p>
                  </div>
                </el-collapse-item>
                <el-collapse-item title="待定" name="4">
                  <div>
                    待定
                  </div>
                </el-collapse-item>
              </el-collapse>
            </div>
          </div></el-col
        >
        <el-col :span="16"
          ><div class="grid-content bg-purple">
            <!-- 收藏歌手 -->
            <div class="piece" v-if="rightInfoLoading && !slideSinger">
              <div class="exhibit-title">歌手列表2</div>
              <div class="personal-right">
                <div class="exhibit-singer">
                  <img src="../images/img1.jpg" alt="" />
                  <div class="exhibit-singer-title">
                    <p>作者</p>
                    <span>
                      <p>专辑2</p>
                      <p>mv2</p>
                    </span>
                  </div>
                </div>
                <div class="exhibit-singer">
                  <img src="../images/img1.jpg" alt="" />
                  <div class="exhibit-singer-title">
                    <p>作者</p>
                    <span>
                      <p>专辑2</p>
                      <p>mv2</p>
                    </span>
                  </div>
                </div>
                <div class="exhibit-singer">
                  <img src="../images/img1.jpg" alt="" />
                  <div class="exhibit-singer-title">
                    <p>作者</p>
                    <span>
                      <p>专辑2</p>
                      <p>mv2</p>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <!-- 新建歌单 -->
            <create-a-song-list
              v-if="slideListOne && !leftLoading"
            ></create-a-song-list>
            <!-- 收藏歌单 -->
            <collection-song-list
              v-if="slideListTow && !leftLoading"
            ></collection-song-list></div
        ></el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import collectionSongList from './collectionSongList.vue'
import CreateASongList from './createASongList.vue'
export default {
  components: { collectionSongList, CreateASongList },
  data () {
    return {
      slideSinger: true, // 显示我收藏的歌手列表
      slideListOne: true, // 展开创建歌单
      slideListTow: false, // 展开收藏歌单
      // 辅助右边是否显示
      leftLoading: false,
      rightInfoLoading: true,
      activeNames: ['0'],
      testData: [
        { singer: '周慧敏', url: require('../images/img8.png'), name: '测试' },
        { singer: '周慧敏', url: require('../images/img8.png'), name: '测试' },
        { singer: '周慧敏', url: require('../images/img8.png'), name: '测试' }
      ]
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.getMyMusicData()
    this.getSubscribedSinger()
  },
  methods: {
    handleChange (val) {
      console.log(val)
    },
    // 获取创建歌单
    getMyMusicData () {
      if (this.slideListOne) {
        this.slideListOne = false
      } else {
        this.slideListOne = true
      }
    },
    // 获取收藏歌单详情
    changeToprank () {
      if (this.slideListTow) {
        this.slideListTow = false
      } else {
        this.slideListTow = true
      }
    },
    // 显示歌手列表页并清除歌单列表激活状态
    shouSingerList () {
      if (this.slideSinger) {
        this.slideSinger = false
      } else {
        this.slideSinger = true
      }
      console.log(this.leftLoading)
    }
  }
}
</script>
<style lang="less" scoped>
.sss {
  width: 100px;
  height: 100px;
  background-color: aquamarine;
}
.content {
  width: 1260px;
  margin: 0 auto;
  margin-top: 30px;
}
.letf {
  width: 310px;
}
.personal-left {
  width: 310px;
  padding: 0 10px;
}
.el-collapse {
  border-top: 0 solid snow;
}
.collect {
  padding-top: 10px;
  display: flex;
  flex-flow: row;
  &:hover {
    cursor: pointer;
    background-color: #f6f6f6a9;
  }
  img {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    margin-right: 10px;
  }
  p {
    line-height: 40px;
  }
}
/* 由于 /deep/ 别名 >>> ;由于为加预编译sccs或lang=less规则导致规范错误*/
/deep/ .el-collapse-item__content {
  padding-bottom: 10px;
}
.exhibit-title {
  font-size: 14px;
  padding-left: 10px;
}
.personal-right {
  margin: 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  .exhibit-singer {
    display: flex;
    flex-direction: row;
    margin-top: 10px;
    margin-right: 10px;
    img {
      width: 80px;
      height: 80px;
      border-radius: 15px;
    }
    .exhibit-singer-title {
      width: 181px;
      padding-left: 10px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      span {
        margin-top: 10px;
        display: flex;
        flex-direction: row;
      }
    }
  }
}
</style>
