<template>
  <!-- 登录页面 -->
  <div class="content" v-cloak>
    <div class="a">
      <div class="b">
        <img src="../images/img8.png" alt="" />
      </div>
      <div class="c">
        <el-form class="d" ref="loginFormRef" :model="ruleForm" :rules="rules">
          <h1>登录界面</h1>
          <!-- autofocus 页面加载优先获取焦点 -->
          <el-form-item prop="phone">
            <el-input
              type="text"
              class="e"
              placeholder="输入网易云音乐手机号"
              prefix-icon="el-icon-user-solid"
              autofocus
              v-model="ruleForm.phone"
              @keyup.enter.native="login"
            />
          </el-form-item>
          <el-form-item prop="password"
            ><el-input
              type="password"
              class="e"
              placeholder="输入密码"
              prefix-icon="el-icon-unlock"
              v-model="ruleForm.password"
              @keyup.enter.native="login"
          /></el-form-item>
          <el-button class="f" title="无法使用">忘记密码?</el-button>
          <el-button class="f" title="无法使用">注册</el-button>
          <el-button class="g" @click="login" > 登录 </el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      // 规则表单
      ruleForm: {
        phone: '',
        password: ''
      },
      id: '',
      rules: {
        // element-ui判断规则验证
        phone: [
          { required: true, message: '请输入登录手机号', trigger: 'change' },
          { min: 11, max: 11, message: '请输入11位手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          {
            min: 6,
            max: 20,
            message: '密码长度在 6 到 20 个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.loginFormRef.validate(async valid => {
        //    表单预验证，通过则valid返回true
        if (!valid) return
        const result = await this.$http.get(
          '/login/cellphone?phone=' +
            this.ruleForm.phone +
            '&password=' +
            this.ruleForm.password
        )
        if (result.data.code === 502) {
          return this.$message.error('密码错误，请重新输入！')
        }
        if (result.data.code === 200) {
          this.$message.success('登录成功！')
          // 保存用户id
          this.id = result.data.account.id
          // 获取后端返回的token
          var token = result.data.token
          // 保存 cookie (大部分需要登录的接口都要用到)
          var cookie = result.data.cookie

          // 存放userTokenb
          this.$store.commit('setUserToken', token)

          // 存放userid
          this.$store.commit('setUserId', this.id)
          // 存放cookie
          this.$store.commit('setCookie', cookie)
        } else return this.$message.error('登录失败')

        // 跳转到首页
        this.$router.push('/')
        // 将三种信息存入
        let userdata = {
          token,
          cookie,
          id: this.id,
        }
        // 使用事件总线
        this.$bus.$emit('getUserData', userdata)
      })
    }
  }
}
</script>
<style lang="less" scoped>
// 输入框图片位置
.el-input__icon {
  width: 40px;
}
/* 防止页面闪烁 */
[v-cloak] {
  display: none !important;
}
.content {
  height: 100%;
  padding: 135px 0;
  /*设置背景渐变*/
  background: #ddd6f3; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #faaca8,
    #ddd6f3
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #faaca8,
    #ddd6f3
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  display: flex;
  /* 居中排列 */
  justify-content: center;
}
.a {
  /*设置背景渐变*/
  background: #ddd6f3; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #faaca8,
    #ddd6f3
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #faaca8,
    #ddd6f3
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  /* 跟随屏幕改变大小，将px换为em或% */
  width: 1100px;
  height: 550px;
  /* width: 70%;
            height: 40%; */
  /* 添加边框阴影 横 纵 模糊度 颜色(不设置颜色默认为黑色)*/
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.8);
  display: flex;
  border: 0 solid white;
  /* 使用圆角化需要设置盒子边框 */
  border-radius: 30px;
}
.b {
  width: 750px;
  height: 550px;
  // background-image: url(../images/img8.png);
  // // /* 让图片自适应 */
  // background-size: cover;

  border: 0px solid white;
  border-radius: 30px 0 0 30px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 30px 0 0 30px;
  }
}
.c {
  width: 350px;
  height: 550px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0px solid white;
  border-radius: 0 30px 30px 0;
}
.d {
  width: 250px;
  height: 500px;
}
.d h1 {
  font: 900 30px '';
}
.e {
  width: 230px;
  margin: 20px 0;
  outline: none;
  border: 0;
  padding: 10px;
  border-bottom: 3px solid rgb(16, 120, 180);
  font: 900 16px '';
}
.f {
  float: right;
  margin: 10px 5px;
  color: #28aadd7e;
}
.g {
  position: relative;
  top: 10%;
  left: 5%;
  display: block;
  width: 200px;
  height: 60px;
  font: 900 30px '';
  text-decoration: none;
  /* 设置多行元素的空间量，如多行文本的间距 */
  line-height: 30px;
  /* 设置外边框圆角 */
  border-radius: 30px;
  background-image: linear-gradient(to left, #faaca8, #ddd6f3);
  /* 文本居中 */
  text-align: center;
  color: #28aadd7e;
}
</style>
