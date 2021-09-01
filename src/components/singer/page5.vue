<template>
  <div>
    <div class="content">
      <!-- 歌手分类 -->
      <singer-classification></singer-classification>
      <!-- 歌手分类展示 -->
      <song-list-3></song-list-3>
    </div>
  </div>
</template>
<script>
import singerClassification from './singerClassification.vue'
import songList3 from './songList3.vue'
export default {
  components: { singerClassification, songList3 }
}
</script>
<style scoped>
.content {
  width: 1260px;
  margin: 0 auto;
  margin-top: 30px;
}
</style>
