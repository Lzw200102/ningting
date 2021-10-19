<template>
  <div id="app">
    <!-- 顶部导航栏组件 -->
    <div class="container">
      <el-row>
        <!-- logo -->
        <el-col :span="4" :offset="2" class="col1">
          <h1 class="logo">
            <a href="/">柠听</a>
          </h1>
        </el-col>
        <!-- 菜单栏 -->
        <el-col :span="8">
          <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="rgb(104, 209, 195)"
            router
          >
            <el-menu-item index="/">
              <router-link to="/">发现音乐</router-link></el-menu-item
            >
            <el-menu-item index="/page2">
              <router-link to="/page2">排行榜</router-link></el-menu-item
            >
            <el-menu-item index="/page3">
              <router-link to="/page3">歌单</router-link></el-menu-item
            >
            <el-menu-item index="/page4">
              <router-link to="/page4">视频</router-link></el-menu-item
            >
            <el-menu-item index="/page5">
              <router-link to="/page5">歌手</router-link></el-menu-item
            >
            <el-menu-item index="/page6">
              <router-link to="/page6">我的音乐</router-link></el-menu-item
            >
          </el-menu>
        </el-col>
        <!-- 搜索登录 -->
        <el-col :span="9" class="colInput">
          <search></search>
          <div class="login" v-if="isAvatar">
            <router-link to="/logInPage">
              <!-- <div class="el-icon-user">登录</div> -->
              <login-status></login-status>
            </router-link>
          </div>
        </el-col>
      </el-row>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import loginStatus from '../logIn/loginStatus'
import search from '../publicAssembly/search.vue'
export default {
  inject: ['reload'],
  components: {
    loginStatus,
    search
  },
  data () {
    return {
      activeIndex: '1',
      input: '',
      isAvatar: true
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
      this.reload() // 局部刷新
    }
  }
}
</script>
<style scoped>
.container {
  height: 60px;
  background-color: #545c64;
  height: 100%;
  box-shadow: 2px 4px 7px #888888;
}
.logo {
  text-align: center;
  line-height: 60px;
}
.logo a {
  color: rgb(104, 209, 195);
}
.el-menu {
  border-bottom: none;
}
.colInput {
  display: flex;
  /* justify-content: center; */
  align-items: center;
  height: 60px;
}
.search {
  width: 250px;
}
.el-icon-search {
  height: 40px;
  background-color: #fff;
  float: left;
  left: 10px;
  text-align: center;
  line-height: 40px;
}
.login {
  color: rgb(104, 209, 195);
  margin: 0 100px;
}
.login:hover {
  color: #fff;
  cursor: pointer;
}
.router-link {
  width: 96px;
  height: 60px;
}
.el-icon-user {
  color: rgb(104, 209, 195);
}
</style>
