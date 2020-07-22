<template>
  <el-card class="admin-header">
    <a href="/index">
      <!--须得修改文件路径-->
      <img src="../../../assets/admin/admin.jpg" alt="" width="55px" style="float: left;margin-top: -5px;">
    </a>
    <span style="font-size: 32px;font-weight: bold;position:absolute;left: 100px">mall管理</span>
    <i class="el-icon-switch-button" v-on:click="logout" style="font-size: 40px;float: right"></i>
  </el-card>
</template>

<script>

export default {
  name: 'Header',
  methods: {
    logout () {
      var _this = this
      this.$axios
        .get('/admin/logout')
        // 这个api比较特殊！必须在admin/后面加访问地址
        .then(resp => {
          if (resp && resp.data.code === 200) {
            // 完全可以仅用下面两行，而不用前后端交互
            var path = _this.$route.query.redirect
            _this.$router.replace({path: path === '/' || path === undefined ? '/login' : path})
          }
        })
        .catch(failResponse => {})
    }
  }
}
</script>

<style scoped>
  .admin-header {
    height: 80px;
    opacity: 0.85;
    line-height: 40px;
    min-width: 900px;
  }
  .el-icon-switch-button {
    cursor: pointer;
    outline:0;
  }
</style>
