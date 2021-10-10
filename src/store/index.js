import Vue from 'vue'
import Vuex from 'vuex'
import {
  setSessionStorageItem,
  getSessionStorageItem
} from '../Storage/storage'

const MUSICDATA = 'MUSICDATA' // 当前播放的歌曲数据（封面，标题，歌手名称）
const USERID = 'USERID'
const USERTOKEN = 'USERTOKEN'
const COOKIE = 'COOKIE'

Vue.use(Vuex)
const store = new Vuex.Store({
  // 包含了store中存储的各个状态
  state: {
    // 播放的歌曲信息
    musicData: getSessionStorageItem(MUSICDATA),
    // 登录id,令牌，cookie
    userId: getSessionStorageItem(USERID),
    userToken: getSessionStorageItem(USERTOKEN),
    cookie: getSessionStorageItem(COOKIE)
  },
  // 同步用mutations,是改变store中状态的执行者，只能是同步操作。
  mutations: {
    // 保存子组件传来的音乐数据
    setMusicData (state, data) {
      state.musicData = data // 保存userToken
      setSessionStorageItem(MUSICDATA, data) // 调用函数用sessionStorage将userToken持久化
    },
    setUserId (state, data) {
      state.userId = data
      setSessionStorageItem(USERID, data)
    },
    setUserToken (state, data) {
      state.userToken = data
      setSessionStorageItem(USERTOKEN, data)
    },
    setCookie (state, data) {
      state.cookie = data
      setSessionStorageItem(COOKIE, data)
    }
  },
  // 异步用actions
  actions: {},
  //   getter: 类似于 Vue 中的计算属性，根据其他 getter 或 state 计算返回值。
  getters: {},
  modules: {}
})

export default store
