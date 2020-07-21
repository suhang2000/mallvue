<template>
  <body id="paper">
  <el-form :model="loginForm" :rules="rules" class="login-container" label-position="left"
           label-width="0px" v-loading="loading">
    <h3 class="login_title">管理人员注册</h3>
    <el-form-item>
      <el-input type="text" v-model="loginForm.aid"
                auto-complete="off" placeholder="唯一标识"></el-input>
    </el-form-item>
    <el-form-item prop="username">
      <el-input type="text" v-model="loginForm.aname"
                auto-complete="off" placeholder="真实姓名"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="loginForm.password"
                auto-complete="off" placeholder="登录密码"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input type="text" v-model="loginForm.phone"
                auto-complete="off" placeholder="电话号码"></el-input>
    </el-form-item>
    <el-form-item style="width: 100%">
      <el-button type="primary" style="width: 40%;background: #505458;border: none" v-on:click="register">注册</el-button>
    </el-form-item>
  </el-form>
  </body>
</template>
<script>
export default{
  data () {
    return {
      rules: {
        aid: [{required: true, message: '唯一标识不能为空', trigger: 'blur'}],
        aname: [{required: true, message: '姓名不能为空', trigger: 'blur'}],
        password: [{required: true, message: '密码不能为空', trigger: 'blur'}],
        phone: [{required: true, message: '电话号码不能为空', trigger: 'blur'}]
      },
      checked: true,
      loginForm: {
        aid: '',
        aname: '',
        password: '',
        phone: ''
      },
      loading: false
    }
  },
  methods: {
    register () {
      var _this = this
      this.$axios
        .post('/admin/register', {
          aid: this.loginForm.aid,
          aname: this.loginForm.aname,
          password: this.loginForm.password,
          phone: this.loginForm.phone,
        })
        .then(resp => {
          if (resp.data.code === 200) {
            this.$alert('注册成功', '提示', {
              confirmButtonText: '确定'
            })
            _this.$router.replace('/admin/login')
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
<style>
  #paper {
    background:url("../../assets/admin/loginBG.jpg") no-repeat;
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }
  body{
    margin: -5px 0px;
  }
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
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .login_remember {
    margin: 0px 0px 35px 0px;
    text-align: left;
  }
</style>
