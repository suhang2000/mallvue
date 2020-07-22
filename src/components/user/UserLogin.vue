<template>
  <body id="poster">
  <el-form :model="loginForm" :rules="rules" class="login-container" label-position="left"
           label-width="0px">
    <h3 class="login_title">用户登录</h3>
    <el-form-item prop="uname">
      <el-input type="text" v-model="loginForm.uname"
                auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="loginForm.password"
                auto-complete="off" placeholder="密码" show-password></el-input>
    </el-form-item>
    <el-form-item style="width: 100%">
      <el-button type="primary" style="width: 100%;background: #505458;border: none" v-on:click="login">登录</el-button>
    </el-form-item>
  </el-form>
  </body>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      rules: {
        uname: [{required: true, message: '账号不能为空', trigger: 'blur'}],
        password: [{required: true, message: '密码不能为空', trigger: 'blur'}]
      },
      loginForm: {
        uname: '',
        password: ''
      },
      // responseResult: []
      loading: false
    }
  },
  methods: {
    login () {
      // '_this' is assigned a value but never used
      // const _this = this

      // console.log(this.$store.state)
      var _this = this
      this.$axios
        .post('/login/user', {
          uname: this.loginForm.uname,
          password: this.loginForm.password
        })
        // .then(successResponse => {
        //   console.log(successResponse.data)
        //   if (successResponse.data.code === 200) {
        //     // var data = this.loginForm
        //     // _this.$store.commit('login', _this.loginForm)
        //     const path = this.$route.query.redirect
        //     this.$router.replace({path: path === '/' || path === undefined ? '/hello' : path})
        //   } else if (successResponse.data.code === 400) {
        //     alert('账号或密码错误')
        //   }
        // })
        // .catch(failResponse => {
        //   alert('服务器异常')
        // })
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
    background: url("../../assets/admin/normalBG.jpeg") no-repeat center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }
  body{
    margin: 0;
  }
</style>
