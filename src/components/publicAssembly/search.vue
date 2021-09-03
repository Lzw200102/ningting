<template>
  <!-- 搜索组件 -->
  <div>
    <el-input
      class="search"
      v-model="keyword"
      placeholder="请输入内容"
      @click="
        GotoSearchDetails(keyword),
          GotoSearchSinger(keyword),
          GotoSearchAlbum(keyword)
      "
    />
  </div>
</template>
<script>
export default {
  data () {
    return {
      // 接受用户输入的数据
      keyword: '',
      // 歌曲data
      searchVal: [],

      // 歌手data
      searchValSinger: [],

      // 专辑
      searchValAlbums: []
    }
  },
  watch: {
    keyword: function (val) {
      console.log('搜索框的值' + val)
      this.GotoSearchDetails(val)
      this.GotoSearchSinger(val)
      this.GotoSearchAlbum(val)
    }
  },
  methods: {
    // 去搜索详情（发送歌曲）   搜索接口 /search?keywords=
    async GotoSearchDetails (keyword) {
      //
      const result = await this.$http.get('/cloudsearch?keywords=' + keyword)
      if (result.status !== 200) {
        return this.$message.error('获取搜索歌曲失败！')
      }
      //  将歌曲数据传给子组件
      this.searchVal = result.data.result.songs
    },

    // 去搜索详情（发送歌手）   搜索接口 /search?keywords=
    async GotoSearchSinger (keyword) {
      //
      const result = await this.$http.get(
        '/cloudsearch?keywords=' + keyword + '&type=100&limit=36'
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

    // 去搜索详情（发送专辑）   搜索接口 /search?keywords=
    async GotoSearchAlbum (keyword) {
      //
      const result = await this.$http.get(
        '/cloudsearch?keywords=' + keyword + '&type=10&limit=36'
      )
      if (result.status !== 200) {
        return this.$message.error('获取搜索歌手失败！')
      }
      this.searchValAlbums = result.data.result.albums
    }
  },
  mounted () {
    if (this.keyword) {
      this.GotoSearchDetails(this.keyword)
      this.GotoSearchSinger(this.keyword)
      this.GotoSearchAlbum(this.keyword)
    }
  }
}
</script>
<style lang="less" scoped>
.search {
  width: 250px;
}
</style>
