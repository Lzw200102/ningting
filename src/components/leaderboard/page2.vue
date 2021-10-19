<template>
  <div>
    <div class="content"></div>
    <!-- 排行榜 -->
    <leaderboard-details></leaderboard-details>
    <!-- 回到顶部 -->
    <backtothe-top></backtothe-top>
    <router-view />
  </div>
</template>
<script>
import leaderboardDetails from './leaderboardDetails.vue'
import backToTheTop from '../publicAssembly/backToTheTop.vue'
export default {
  components: { leaderboardDetails, backToTheTop }
}
</script>
<style scoped>
.content {
  margin-top: 15px;
}
</style>
