<template>
  <!-- 搜索组件 -->
  <div class="content">
    <el-input
      v-model="search"
      @focus="focus"
      @blur="blur"
      @keyup.enter.native="searchHandler"
      aria-placeholder="搜索歌曲或歌手等"
      ><el-button
        slot="append"
        icon="el-icon-search"
        id="search"
        @click="searchHandler"
      ></el-button>
    </el-input>
    <el-card
      @mouseenter="enterSearchBoxHanlder"
      v-if="isSearch"
      class="box-card"
      id="search-box"
      style="  position: absolute;z-index:15"
    >
      <dl v-if="isHistorySearch">
        <dt class="search-title" v-show="history">历史搜索</dt>
        <dt class="remove-history" v-show="history" @click="removeAllHistory">
          <i class="el-icon-delete"></i>清空历史记录
        </dt>
        <!-- 本地存储的搜索记录 -->
        <el-tag
          v-for="search in historySearchList"
          :key="search.id"
          closable
          :type="search.type"
          @close="closeHandler(search)"
          style="margin-right:5px; margin-bottom:5px;"
          >{{ search.name }}</el-tag
        >
        <dt class="search-title">热门搜索</dt>
        <dd v-for="search in hotSearchList" :key="search.id">{{ search }}</dd>
      </dl>
      <!-- 当搜索框有值时直接显示搜索 -->
      <dl v-if="isSearchList">
        <dt class="search-title">歌曲</dt>
        <dd v-for="singer in searchVal" :key="singer.id">{{ singer.name }}</dd>
        <dt class="search-title">歌手</dt>
        <dd v-for="songs in searchValSinger" :key="songs.id">
          {{ songs.name }}
        </dd>
        <dt class="search-title">专辑</dt>
        <dd v-for="album in searchValAlbums" :key="album.id">
          {{ album.name }}
        </dd>
      </dl>
    </el-card>
  </div>
</template>
<script>
// 静态方法，获得随机数
import randomUtil from '../images/js/randomUtil.js'
// 本地localStorage存储搜索记录
import store from '../images/js/store.js'
export default {
  data () {
    return {
      // 歌曲data
      searchVal: [],

      // 歌手data
      searchValSinger: [],

      // 专辑
      searchValAlbums: [],
      search: '', // 当前输入框的值
      isFocus: false, // 是否聚焦
      hotSearchList: ['暂无热门搜索'], // 热门搜索数据
      historySearchList: [], // 历史搜索数据
      searchList: ['暂无数据'], // 搜索返回数据,
      history: false,
      types: ['', 'success', 'info', 'warning', 'danger'] // 搜索历史tag式样
    }
  },
  computed: {
    isSearch () {
      return this.isFocus // 点击搜索框，显示列表，点击其它地方搜索列表消失.
    },
    isHistorySearch () {
      return this.isFocus && !this.search // 获取了焦点并且搜索框内容为空显示热门搜索和历史搜索
    },
    isSearchList () {
      return this.isFocus && this.search // 获取了焦点并且搜索框内容不为空直接显示搜索列表
    }
  },
  watch: {
    search () {
      this.startData()
    }
  },
  methods: {
    // 输入框值发生改变时get数据
    startData () {
      this.GotoSearchDetails(this.search)
      this.GotoSearchSinger(this.search)
      this.GotoSearchAlbum(this.search)
    },
    // 去搜索详情（发送歌曲）   搜索接口 /search?keywords=
    async GotoSearchDetails (search) {
      //
      const result = await this.$http.get(
        '/search?keywords=' + search + '&type=1&limit=5'
      )
      if (result.status !== 200) {
        return this.$message.error('获取搜索歌曲失败！')
      }
      //  将歌曲数据传给子组件
      this.searchVal = result.data.result.songs
    },
    // 去搜索详情（发送专辑）   搜索接口 /search?keywords=
    async GotoSearchAlbum (search) {
      //
      const result = await this.$http.get(
        '/search?keywords=' + search + '&type=10&limit=3'
      )
      if (result.status !== 200) {
        return this.$message.error('获取搜索歌手失败！')
      }
      this.searchValAlbums = result.data.result.albums
    },
    // 去搜索详情（发送歌手）   搜索接口 /search?keywords=
    async GotoSearchSinger (search) {
      //
      const result = await this.$http.get(
        '/search?keywords=' + search + '&type=100&limit=1'
      )
      if (result.status !== 200) {
        return this.$message.error('获取搜索歌手失败！')
      }
      console.log('歌手')
      // console.log(result.data);
      //  将歌手数据传给子组件
      this.searchValSinger = result.data.result.artists
      console.log(this.searchValSinger) // 在需要传值的方法中处理
    },

    // 搜索框方法
    focus () {
      this.isFocus = true
      this.historySearchList =
        store.loadHistory() == null ? [] : store.loadHistory()
      this.history = this.historySearchList.length !== 0
    },
    blur () {
      var self = this
      this.searchBoxTimeout = setTimeout(function () {
        self.isFocus = false
      }, 300)
    },
    enterSearchBoxHanlder () {
      clearTimeout(this.searchBoxTimeout)
    },
    searchHandler () {
      // 随机生成搜索历史tag式样
      let n = randomUtil.getRandomNumber(0, 5)
      let exist =
        this.historySearchList.filter(value => {
          return value.name === this.search
        }).length !== 0
      if (!exist) {
        this.historySearchList.push({ name: this.search, type: this.types[n] })
        store.saveHistory(this.historySearchList)
      }
      this.history = this.historySearchList.length !== 0
    },
    closeHandler (search) {
      this.historySearchList.splice(this.historySearchList.indexOf(search), 1)
      store.saveHistory(this.historySearchList)
      clearTimeout(this.searchBoxTimeout)
      if (this.historySearchList.length === 0) {
        // 历史记录数为0了，将history字段置为false，使得不显示历史记录。
        this.history = false
      }
    },
    removeAllHistory () {
      store.removeAllHistory()
    }
  },
  mounted () {}
}
</script>
<style lang="less" scoped>
.box-card {
  top: 55px;
}
#search {
  background-color: #37a097bd;
  border-radius: 0%;
}
.search-title {
  color: #bdbaba;
  font-size: 15px;
  margin-bottom: 5px;
}
.remove-history {
  color: #bdbaba;
  font-size: 15px;
  float: right;
  margin-top: -22px;
}
#search-box {
  width: 555px;
  height: 300px;
  margin-top: 0px;
  padding-bottom: 20px;
}
</style>
