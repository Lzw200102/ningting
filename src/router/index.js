import Vue from 'vue'
import Router from 'vue-router'
import { Message } from 'element-ui'
// 首页
const frontPage = () => import('@/components/discoveryMusic/frontPage.vue')
// 排行榜
const page2 = () => import('@/components/leaderboard/page2.vue')
// 排行榜详情
const leaderboardDetails = () =>
  import('@/components/leaderboard/leaderboardDetails.vue')
// 歌单
const page3 = () => import('@/components/songList/page3.vue')
// 歌单详情
const songListDetails = () =>
  import('@/components/songList/songListDetails.vue')
// MV
const page4 = () => import('@/components/MV/page4.vue')

// MV详情
const MvList = () => import('@/components/MV/MvList.vue')

// 歌手
const page5 = () => import('@/components/singer/page5.vue')

// 歌手详情
const singer = () => import('@/components/singer/singer.vue')

// 歌手作品、MV、专辑、介绍
const hotworks = () => import('@/components/singer/artist/hotworks.vue')
const allMV = () => import('@/components/singer/artist/allMV.vue')
const allAlbum = () => import('@/components/singer/artist/allAlbum.vue')
const artistMessage = () =>
  import('@/components/singer/artist/artistMessage.vue')
// 个人中心
const page6 = () => import('@/components/myMusic/page6.vue')
// 登录页面
const logInPage = () => import('@/components/logIn/logInPage.vue')
// 歌曲详情
const SongDetails = () => import('@/components/publicAssembly/SongDetails.vue')

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
    name: 'page2',
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
    name: 'page3',
    component: page3,
    meta: {
      title: '歌单'
    }
  },
  // 歌单详情
  {
    path: '/songListDetails',
    name: 'songListDetails',
    component: songListDetails,
    meta: {
      title: '歌单详情'
    }
  },
  // 视频
  { path: '/page4', name: 'page4', component: page4 },
  // MV详情
  { path: '/MVList', name: 'MVList', component: MvList },
  // 歌手
  { path: '/page5', name: 'page5', component: page5 },
  // 歌手详情
  {
    path: '/singer/:id',
    name: '/singer',
    component: singer,
    redirect: '/singer/:id/hotworks/:id',
    children: [
      // 歌手介绍
      {
        path: 'artistMessage/:SingerId',
        component: artistMessage,
        meta: {
          title: '歌手介绍'
        }
      },
      // 热门作品
      {
        path: 'hotworks/:SingerId',
        component: hotworks,
        meta: {
          title: '热门作品'
        }
      },
      // 所有专辑
      {
        path: 'allAlbum/:SingerId',
        component: allAlbum,
        meta: {
          title: '所有专辑'
        }
      },
      // 所有MV
      {
        path: 'allMV/:SingerId',
        component: allMV,
        meta: {
          title: '所有MV'
        }
      }
    ]
  },
  // 歌手作品、MV、专辑、介绍
  // { path: '/hotworks', name: '歌手作品', component: hotworks },
  // { path: '/allMV', name: '歌手MV', component: allMV },
  // { path: '/allAlbum', name: '歌手专辑', component: allAlbum },
  // { path: '/artistMessage', name: '歌手介绍', component: artistMessage },
  // 个人中心
  {
    path: '/page6',
    name: 'page6',
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
  },
  // 歌曲详情
  {
    path: '/SongDetails',
    name: 'SongDetails',
    component: SongDetails
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
