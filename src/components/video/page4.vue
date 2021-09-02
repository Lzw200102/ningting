<template>
  <div>
    <div class="content">
      <!-- 视频分类 -->
      <video-classification></video-classification>
      <!-- 视频头标 -->
      <div class="h2-label"><h2>全部视频</h2></div>
      <!-- 视频歌单 -->
      <video-collection></video-collection>
    </div>
  </div>
</template>
<script>
import videoClassification from './videoClassification.vue'
import videoCollection from './videoCollection.vue'
export default {
  components: { videoClassification, videoCollection }
}
</script>
<style scoped>
.content {
  width: 1260px;
  margin: 30px auto 0;
}
.h2-label {
  margin-top: 30px;
  padding: 10px;
}
</style>
