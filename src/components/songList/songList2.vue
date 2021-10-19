<template>
  <!-- 歌单分类 -->
  <div>
    <div class="content">
      <div class="classification">热门歌单</div>
      <ul class="classification-host">
        <!-- 热门标签 -->
        <li
          v-for="(songStyle, index) of tags"
          :key="index"
          :class="{ colorChange: index === currentItim }"
          @click="ChangeColor(index)"
        >
          {{ songStyle.name }}
        </li>
      </ul>
      <div class="classification-vice">
        <!-- 具体歌单一级标题 ：语言、情感 -->
        <div
          class="classification-vice-vice"
          v-for="(song, index) of ArrayData"
          :key="index"
        >
          <div class="style">{{ categories[index] }}</div>
          <ul class="style-ul">
            <!-- 二级标题：一级标题下的分类 -->
            <li
              class="style-li"
              v-for="(song2, index) of song"
              :key="index"
              :class="{ colorChange: song2.name == currentAllItem }"
              @click="ChangeData(song2.name)"
            >
              {{ song2.name }}
            </li>
          </ul>
        </div>
      </div>
      <!-- 歌单展示标题 -->
      <div class="songlist">
        <h2>全部歌单</h2>
        <div class="songlist-btn">
          <button
            :class="{
              colorChange: 1 == currentRightItim
            }"
            @click="ChangerRightColor(1)"
          >
            热门</button
          ><button
            :class="{
              colorChange: 2 == currentRightItim
            }"
            @click="ChangerRightColor(2)"
          >
            最新
          </button>
        </div>
      </div>
      <!-- 歌单展示 -->
      <all-song-list :SongListData="SongListData"></all-song-list>
    </div>
  </div>
</template>
<script>
import allSongList from './allSongList.vue'
export default {
  components: { allSongList },
  props: {
    // 热门歌单标签
    tags: {
      type: Array,
      default () {
        return []
      }
    },
    // 全部歌单分类的名称
    categories: {
      type: Object,
      default () {
        return {}
      }
    },
    // 具体歌单分类
    ArrayData: {
      type: Array,
      default () {
        return []
      }
    },
    // 当前展示的数据
    SongListData: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      currentItim: '',
      currentRightItim: 1,

      // 所有分类
      currentAllItem: ''
    }
  },
  methods: {
    // 给父组件中的GetSongType函数返回index,
    ChangeColor (index) {
      this.currentItim = index
      this.currentAllItem = null
      this.$emit('GetSongType', index)
    },
    // 与上同理，一级标题
    ChangeData (data) {
      this.currentItim = null
      this.currentAllItem = data
      this.$emit('GetAllSongType', data)
    },
    // 与上同理，热门或最新
    ChangerRightColor (index) {
      this.currentRightItim = index
      this.$emit('GetHotOrNew', index)
    }

    // 与上同理，返回分页偏移量
    // returnChange (currentPage) {
    //   this.$emit('currentChange', currentPage)
    // }
  }
}
</script>
<style scoped>
li:hover {
  color: #ff4757;
  cursor: pointer;
}
.content {
  width: 1260px;
  margin: 0 auto;
}
.classification {
  color: #999999;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 16px;
}
.classification-host {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.classification-host li {
  padding: 0 20px;
}
.classification-vice {
  height: 152px;
  display: flex;
  flex-direction: row;
}
.classification-vice-vice {
  width: 252px;
  border-right: 1px dotted rgb(126, 120, 73);
  margin: 5px 0 0;
  overflow: hidden;
}
.classification-vice-vice:last-child {
  border-right: 0;
}
.classification-vice-vice .style {
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #999999;
}
.classification-vice-vice .style ul,
li {
  list-style: none;
}
/* 点击显示 */
.style-ul {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.style-li {
  width: 83px;
  height: 35px;
  text-align: center;
  line-height: 35px;
}
.songlist {
  padding: 10px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.songlist-btn {
  width: 160px;
}
.songlist-btn button {
  width: 80px;
  height: 36px;

  border: 1px solid #f6f6f679;
  border-radius: 30px 0 0 30px;
}
.songlist-btn button:hover {
  cursor: pointer;
}
.songlist-btn button:last-child {
  border-radius: 0 30px 30px 0;
}
.colorChange {
  background-color: #ff4757;
  color: white !important;
  border-radius: 15px;
}
</style>
