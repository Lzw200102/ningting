<template>
  <!-- 歌手分类 -->
  <div>
    <div class="content">
      <div class="singerClassification">
        <a
          v-for="(item1, index) in types"
          :key="index"
          :class="{ colorChange: index == dynamic }"
          @click="getMoney(index, item1)"
          >{{ item1.name }}</a
        >
      </div>
      <div class="singerClassification">
        <a
          v-for="(item2, index2) in areas"
          :key="index2"
          @click="getMoney2(index2, item2)"
          :class="{ colorChange: index2 == dynamic2 }"
          >{{ item2.name }}</a
        >
      </div>
      <div class="singerClassification">
        <a
          v-for="(item, index3) in initials"
          :key="index3"
          @click="getMoney3(index3, item)"
          :class="{ colorChange: index3 == dynamic3 }"
          >{{ item === -1 ? '全部' : item }}</a
        >
      </div>
    </div>
  </div>
</template>
<script>
// 导入公共传输文件，给兄弟组件传值
import Bus from '../utils/Bus.js'
export default {
  data () {
    return {
      dynamic: 0,
      dynamic2: 0,
      dynamic3: 0,
      types: [
        { name: '全部', value: -1 },
        { name: '男歌手', value: 1 },
        { name: '女歌手', value: 2 },
        { name: '乐队', value: 3 }
      ],
      areas: [
        { name: '全部', value: -1 },
        { name: '华语', value: 7 },
        { name: '欧美', value: 96 },
        { name: '日本', value: 8 },
        { name: '韩国', value: 16 },
        { name: '其他', value: 0 }
      ],
      initials: [
        -1,
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z'
      ]
    }
  },
  methods: {
    // gosingerList是自定义事件
    getMoney (index, item1) {
      // 点击添加字体颜色，其他的删除class名称
      this.dynamic = index
      Bus.$emit('gosingerList', item1.value)
    },
    getMoney2 (index2, item2) {
      // 点击添加字体颜色，其他的删除class名称
      this.dynamic2 = index2
      // 给兄弟组件传值
      Bus.$emit('gosingerList2', item2.value)
    },
    getMoney3 (index3, item) {
      // 点击添加字体颜色，其他的删除class名称
      this.dynamic3 = index3
      // 给兄弟组件传值
      Bus.$emit('gosingerList3', item)
    }
  },
  // beforeCreate () {
  //   this.getMoney()
  //   this.getMoney2()
  //   this.getMoney3()
  // }
}
</script>
<style scoped>
.content {
  width: 1260px;
  margin: 0 auto;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
}
.singerClassification {
  display: flex;
  flex-direction: row;
  padding-bottom: 20px;
}
.singerClassification a {
  display: inline-block;
  color: #000;
  padding: 0 0.8em;
  font-size: 14px;
  border-radius: 26px;
  text-align: center;
  line-height: 26px;
}
.singerClassification a:hover {
  color: #ff4757;
  cursor: pointer;
}
.colorChange {
  background-color: #ff4757;
  color: white !important;
}
</style>
