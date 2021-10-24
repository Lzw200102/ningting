<template>
  <div id="app">
    <!-- 导航栏 -->
    <navigation-bar></navigation-bar
    ><!-- 回到顶部 -->
    <back-to-the-top></back-to-the-top>
    <!-- 底部音乐播放器 -->
    <player></player>
    <!-- 通过v-if来控制容器的出现与消失 -->
    <router-view v-if="isRouterAlive" />
  </div>
</template>

<script>
import navigationBar from './components/publicAssembly/navigationBar.vue'
import player from './components/publicAssembly/player'
import backToTheTop from './components/publicAssembly/backToTheTop.vue'
export default {
  components: { navigationBar, player, backToTheTop },
  data () {
    return {
      ss: false,
      isRouterAlive: true
    }
  },
  // 局部刷新组件要用到的方法
  /*
    provide / inject
    就是父组件中使用provide提供变量(对象或者是一个函数),在子组件中通过inject来注入变量
    不管层级有多深，并在起上下游关系成立的时间始终生效
  */
  provide () {
    return {
      reload: this.reload // 把刷新方法传给子组件
    }
  },
  methods: {
    // 局部刷新组件要用到的方法
    reload () {
      this.isRouterAlive = false
      this.$nextTick(() => {
        this.isRouterAlive = true
        // Vue.nextTick()  在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。
      })
    }
  }
}
</script>

<style>
/* 全局样式 */
body {
  margin: 0 !important;
  background: #e6dada; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to left,
    #274046,
    #e6dada
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to left,
    #274046,
    #e6dada
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
ul,
ol {
  list-style: none;
}

a {
  text-decoration: none;
}

img {
  border: none;
}
/* 滚动条 */
/* 设置滚动条的样式 */
::-webkit-scrollbar {
  width: 2px;
}
/* 滚动槽 */
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.3);
  border-radius: 10px;
}
/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.5);
}
::-webkit-scrollbar-thumb:window-inactive {
  background: rgba(255, 0, 0, 0.4);
}
/* 懒加载 加载中图片样式 */
/* img[lazy="loading"]{
  display:block;
  width:50px !important;
  height:50px !important;
  margin:0 auto;
  } */
/* iocn图标 */
</style>
