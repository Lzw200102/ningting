<template>
  <!-- 登录状态 -->
  <div>
    <div class="icon">
      <el-dropdown @command="handleCommand" v-if="islogin">
        <span class="el-dropdown-link">
          <img src="../images/img8.png" alt="" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="a">{{ nickname }}</el-dropdown-item>

          <el-dropdown-item command="f">请登录账号</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <!-- 登录后的下拉选项 -->
      <el-dropdown @command="handleCommand" v-if="dialogFlag">
        <span class="el-dropdown-link">
          <img  v-lazy="avatarUrls" alt="" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="a">{{ nickname }}</el-dropdown-item>
          <el-dropdown-item command="b" divided>我的主页</el-dropdown-item>
          <el-dropdown-item command="c">我的消息</el-dropdown-item>
          <el-dropdown-item command="d">个人设置</el-dropdown-item>
          <el-dropdown-item command="e">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
export default {
  inject: ['reload'],
  data () {
    return {
      // 从vuex中获取状态
      UserId: this.$store.state.userId,
      userToken: this.$store.state.userToken,
      cookie: this.$store.state.cookie,

      // 导航更换初始化样式
      fontlist: 1,

      // 登录显示/登出隐藏
      islogin: true,
      dialogFlag: false,

      // 用户头像
      avatarUrls: '',
      // 用户昵称
      nickname: ''
    }
  },
  watch: {
    UserId () {
      this.getUserDetails()
      this.judgelogin()
    }
  },
  methods: {
    // 获取用户详情
    async getUserDetails () {
      const result = await this.$http.get('/user/detail?uid=' + this.UserId)
      if (result.status !== 200) {
        return this.$message.error('获取用户详情信息失败！')
      }
      if (result.data.code !== 400) {
        // 保存头像地址
        this.avatarUrls = result.data.profile.avatarUrl
        // 保存用户名称
        this.nickname = result.data.profile.nickname
        let getdataList = {
          avatarUrls: this.avatarUrls,
          nickname: this.nickname
        }
        // 将当前播放的音乐数据传给vuex进行管理
        this.$store.commit('setUserdata', getdataList)
      }
    },
    // 根据token值判断当前页面是否登录了，如果登录则显示头像 隐藏'登录‘
    judgelogin () {
      if (this.userToken) {
        // 显示头像
        this.dialogFlag = true
        // 隐藏登录
        this.islogin = false
      }
    },
    // 下拉选线处理函数
    handleCommand (command) {
      // 退出
      if (command === 'e') {
        // 清空所有的sessionStorage数据
        window.sessionStorage.clear()
        //    跳转到登录页
        this.$router.push('/logInPage')
        this.$message('以退出登录')
        // 再次强制刷新
        location.reload()
      }
      // 个人主页
      if (command === 'b') {
        //    跳转到登录页
        // this.$router.push('/user/' + this.UserId)
      }
      if (command === 'f') {
        //    跳转到登录页
        this.$router.push('/logInPage')
      }
    },
    // 刷新后防止头像数据丢失
    showMsg (val) {
      this.UserId = val
      // UserId更新后又会触发监听器watch: 函数
    }
  },
  created () {
    // 接收来自loglnPage组件的数据
    this.$bus.$on('getUserData', userdata => {
      this.UserId = userdata.id
      this.userToken = userdata.token
      this.cookie = userdata.cookie
    })
  },
  // 生命周期函数  页面刷新(重新渲染)时调用
  mounted () {
    this.getUserDetails()
    this.judgelogin()
    // this.showMsg(window.sessionStorage.getItem('UserId'))
    this.showMsg(this.UserId)
  },
  // 销毁bus
  beforeDestroy () {
    this.$bus.$off('getUserData')
  }
}
</script>
<style lang="less" scoped>
.icon {
  width: 50px;
  height: 50px;
  border-radius: 10px;
  img {
    width: 50px;
    height: 50px;
    border-radius: 10px;
    &:hover {
      border-radius: 50%;
      width: 50px;
      transition-duration: 0.6s;
    }
  }
}
// 下拉样式
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
