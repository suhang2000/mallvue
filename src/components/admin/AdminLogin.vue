<template>
  <body id="poster">
  <el-form class="login-container" label-position="left"
           label-width="0px">
    <h3 class="login_title">管理人员登录</h3>
    <el-form-item>

      <!--需要改动v-model-->
      <el-input type="text" v-model="loginForm.aname"
                auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item>

      <!--需要改动v-model-->
      <el-input type="password" v-model="loginForm.password"
                auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item style="width: 100%">
      <el-button type="primary" style="width: 100%;background: #505458;border: none" v-on:click="login">管理人员登录
      </el-button>
    </el-form-item>
  </el-form>
  </body>
</template>

<script>
// 复制代码后选中多行shift + tab调整格式
export default {
  name: 'admin',
  // 括号前须有空格，否则Missing space before function parentheses报错
  data () {
    return {
      loginForm: {
        aname: '',
        password: ''
      },
      responseResult: []
    }
  },
  methods: {
    login () {
      // '_this' is assigned a value but never used
      // const _this = this

      // console.log(this.$store.state)
      this.$axios
        .post('/login/admin', {
          aname: this.loginForm.aname,
          password: this.loginForm.password
        })
        .then(successResponse => {
          console.log(successResponse.data)

          // 响应码根据后端代码变化
          if (successResponse.data.code === 200) {
            // var data = this.loginForm
            // _this.$store.commit('login', _this.loginForm)
            const path = this.$route.query.redirect
            this.$router.replace({path: path === '/' || path === undefined ? '/hello' : path})
          } else if (successResponse.data.code === 400) {
            alert('账号或密码错误')
          }
        })
        .catch(failResponse => {
          alert('服务器异常')
        })
    }
  }
}
</script>

<style scoped>
  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 90px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }

  .login_title {
    margin: 0 auto 40px auto;
    text-align: center;
    color: #505458;
  }

  #poster {
    /*记得要改文件路径*/
    background: url("../../assets/user.jpg") no-repeat center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }

  body {
    margin: 0;
  }
</style>
