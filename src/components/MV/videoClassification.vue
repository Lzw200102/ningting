<template>
  <!-- 视频分类 -->
  <div>
    <div class="content">
      <div class="classification">地区</div>
      <ul class="classification-host">
        <li
          v-for="(videoStyle, index) in videoClassificationList.style"
          :key="index"
          :class="{ colorChange: index == dynamic }"
          @click="getMoney(index, videoStyle)"
        >
          {{ videoStyle }}
        </li>
      </ul>
      <div class="classification">分类</div>
      <ul class="classification-host">
        <li
          v-for="(videoStyle, index2) in videoClassificationList.style2"
          :key="index2"
          :class="{ colorChange: index2 == dynamic2 }"
          @click="getMoney2(index2, videoStyle)"
        >
          {{ videoStyle }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
// 导入公共传输文件，给兄弟组件传值
import Bus from '../utils/Bus'
export default {
  data () {
    return {
      dynamic: 0,
      dynamic2: 0,
      // 默认值
      videoClassificationList: {
        style: ['全部', '内地', '港台', '欧美', '日本', '韩国'],
        style2: ['全部', '官方版', '原生', '现场版', '网易出品']
      }
    }
  },
  methods: {
    // goBorther是自定义事件
    getMoney (index, videoStyle) {
      // 点击添加字体颜色，其他的删除class名称
      this.dynamic = index
      Bus.$emit('goBorther', videoStyle)
    },
    getMoney2 (index2, videoStyle) {
      // 点击添加字体颜色，其他的删除class名称
      this.dynamic2 = index2
      // 给兄弟组件传值
      Bus.$emit('goBorther2', videoStyle)
    }
  },
}
</script>
<style scoped>
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
  padding: 5px 20px;
  border-radius: 15px;
}
.classification-host li:hover {
  color: #ff4757;
  cursor: pointer;
}
.colorChange {
  background-color: #ff4757;
  color: white !important;
}
</style>
