import Vue from 'vue'
import Router from 'vue-router'
// 首页
import frontPage from '../components/discoveryMusic/frontPage.vue'
// 排行榜
import page2 from '../components/leaderboard/page2.vue'
// 排行榜详情
import leaderboardDetails from '../components/leaderboard/leaderboardDetails.vue'
// 歌单
import page3 from '../components/songList/page3.vue'
// 视频
import page4 from '../components/video/page4.vue'
// 歌手
import page5 from '../components/singer/page5.vue'
// 个人中心
import page6 from '../components/myMusic/page6.vue'
// 登录页面
import logInPage from '../components/logIn/logInPage.vue'

Vue.use(Router)

// 解决 NavigationDuplicated: Avoided redundant navigation to current location 报错
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
export default new Router({
  mode: 'history',
  routes: [
    { path: '/', name: '发现音乐', component: frontPage },
    // 排行榜
    {
      path: '/page2',
      name: '排行榜',
      component: page2,
      meta: { keepAlive: true, title: '排行榜' }
    },
    // 排行榜详情
    {
      path: '/leaderboardDetails',
      name: 'leaderboardDetails',
      component: leaderboardDetails,
      meta: { title: '排行榜详情' }
    },
    // 歌单
    {
      path: '/page3',
      name: '歌单',
      component: page3,
      meta: {
        title: '歌单详情'
      }
    },
    // 视频
    { path: '/page4', name: '视频', component: page4 },
    // 歌手
    { path: '/page5', name: '歌手', component: page5 },
    // 个人中心
    { path: '/page6', name: '个人中心', component: page6 },
    // 登录页面
    { path: '/logInPage', name: '登录页面', component: logInPage }
  ]
})
// 导航守卫
// router.beforeEach((to, from, next) => {
//   if (to.path !== "/Login") {
//     if (localStorage.getItem("usr")) {
//       next();
//     } else {
//       next("/Login")
//     }
//   } else {
//     next();
//   }
// }
// )
