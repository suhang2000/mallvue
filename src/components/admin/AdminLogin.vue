<template>
  <body id="poster">
  <el-form class="login-container" label-position="left"
           label-width="0px">
    <h3 class="login_title">管理人员登录</h3>
    <el-form-item>
      <el-input type="text" v-model="loginForm.aname"
                auto-complete="off" placeholder="姓名"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input type="password" v-model="loginForm.password"
                auto-complete="off" placeholder="密码" show-password></el-input>
    </el-form-item>
    <el-form-item style="width: 100%">
      <el-button type="primary" style="width: 100%;background: #505458;border: none" v-on:click="login">管理人员登录</el-button>
    </el-form-item>
  </el-form>
  </body>
</template>

<script>
// 复制代码后选中多行shift + tab调整格式
export default {
  name: 'AdminLogin',
  // 括号前须有空格，否则Missing space before function parentheses报错
  data () {
    return {
      rules: {
        aname: [{required: true, message: '姓名不能为空', trigger: 'blur'}],
        password: [{required: true, message: '密码不能为空', trigger: 'blur'}]
      },
      // checked: true,
      loginForm: {
        aname: '',
        password: ''
      }
      // loading: false
    }
  },
  methods: {
    login () {
      var _this = this
      this.$axios
        .post('/admin/login', {
          aname: this.loginForm.aname,
          password: this.loginForm.password
        })
        .then(resp => {
          if (resp.data.code === 200) {
            // var data = resp.data.result
            // _this.$store.commit('login', data)
            var path = _this.$route.query.redirect
            _this.$router.replace({path: path === '/' || path === undefined ? '/admin/dashboard' : path})
          } else {
            this.$alert(resp.data.message, '提示', {
              confirmButtonText: '确定'
            })
          }
        })
        .catch(failResponse => {})
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
    background: url("../../assets/admin/loginBG.jpg") no-repeat center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }

  body {
    margin: 0;
  }
</style>
