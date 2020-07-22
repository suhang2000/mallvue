<template>
  <body id="poster">
  <el-form :model="loginForm" :rules="rules" class="login-container" label-position="left"
           label-width="0px">
    <h3 class="login_title">登录</h3>
    <el-form-item prop="name">
      <el-input type="text" v-model="loginForm.name"
                auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="loginForm.password"
                auto-complete="off" placeholder="密码" show-password></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" class="el-icon-user" style="width: 25%;background: #505458;border: none" v-on:click="user_login">用户</el-button>
      <el-button type="primary" class="el-icon-goods" style="width: 25%;background: #505458;border: none" v-on:click="saler_login">商家</el-button>
      <el-button type="primary" class="el-icon-setting" style="width: 25%;background: #505458;border: none" v-on:click="admin_login">管理</el-button>
    </el-form-item>
    <el-link href="http://localhost:8080/#/register/user" icon="el-icon-user-solid" type="primary">注册成为用户</el-link>
    <el-link href="http://localhost:8080/#/register/saler" icon="el-icon-s-goods" type="primary">注册成为商家</el-link>
  </el-form>
  </body>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      rules: {
        name: [{required: true, message: '账号不能为空', trigger: 'blur'}],
        password: [{required: true, message: '密码不能为空', trigger: 'blur'}]
      },
      loginForm: {
        name: '',
        password: ''
      },
      loading: false
    }
  },
  methods: {
    user_login () {
      var _this = this
      this.$axios
        .post('/login/user', {
          uname: this.loginForm.name,
          password: this.loginForm.password
        })
        .then(resp => {
          if (resp.data.code === 200) {
            _this.$store.commit('loginUser', _this.loginForm)
            const path = _this.$route.query.redirect
            _this.$router.replace({path: path === '/' || path === undefined ? '/hello' : path})
          } else {
            this.$alert(resp.data.message, '提示', {
              confirmButtonText: '确定'
            })
          }
        })
        .catch(failResponse => {
          this.$message('服务器异常')
        })
    },
    saler_login () {
      var _this = this
      this.$axios
        .post('/login/saler', {
          sname: this.loginForm.name,
          password: this.loginForm.password
        })
        .then(resp => {
          if (resp.data.code === 200) {
            _this.$store.commit('loginSaler', _this.loginForm)
            const path = _this.$route.query.redirect
            _this.$router.replace({path: path === '/' || path === undefined ? '/hello' : path})
          } else {
            this.$alert(resp.data.message, '提示', {
              confirmButtonText: '确定'
            })
          }
        })
        .catch(failResponse => {
          this.$message('服务器异常')
        })
    },
    admin_login () {
      var _this = this
      this.$axios
        .post('/login/admin', {
          aname: this.loginForm.name,
          password: this.loginForm.password
        })
        .then(resp => {
          if (resp.data.code === 200) {
            _this.$store.commit('loginAdmin', _this.loginForm)
            const path = _this.$route.query.redirect
            _this.$router.replace({path: path === '/' || path === undefined ? '/admin/dashboard' : path})
          } else {
            this.$alert(resp.data.message, '提示', {
              confirmButtonText: '确定'
            })
          }
        })
        .catch(failResponse => {
          this.$message('服务器异常')
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
    background: url("../assets/admin/normalBG.jpeg") no-repeat center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }
  body{
    margin: 0;
  }
</style>
