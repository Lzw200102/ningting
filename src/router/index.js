import Vue from 'vue'
import Router from 'vue-router'
import { Message } from 'element-ui'
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

const routes = [
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
  {
    path: '/page6',
    name: '个人中心',
    component: page6,
    meta: {
      requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
    }
  },
  // 登录页面
  {
    path: '/logInPage',
    name: 'logInPage',
    component: logInPage
  }
]
const router = new Router({
  mode: 'history',
  routes
})
// 导航守卫
router.beforeEach((to, from, next) => {
  let userToken = window.sessionStorage.getItem('USERTOKEN')
  if (to.meta.requireAuth) {
    // 如果需要跳转 ，往下走（1）
    // 判断是否登录过，如果有登陆过，说明有token,或者token未过期，可以跳过登录（2）
    if (userToken !== null) {
      // 判断下一个路由是否为要验证的路由（3）
      next()
    } else {
      // 如果该路由不需要验证，那么直接往后走
      Message.warning('请登录后再操作')
      next('/logInPage')
    }
  } else {
    // 不需要跳转，直接往下走
    next()
  }
})
export default router
