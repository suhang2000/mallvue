<template>
  <div>
    <el-container>
      <el-aside>
        <div>
          <el-image
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            style="float: right;margin-right: 50px;margin-top: 50px">
          </el-image>
        </div>
      </el-aside>
      <el-main>
        <p class="user" align="left">uid: {{user.uid}}</p>
        <br>
        <p class="user" align="left">昵称: {{user.uname}}</p>
        <br>
        <p class="user" align="left">电话: {{user.phone}}</p>
        <br>
        <p class="user" align="left">邮箱: {{user.email}}</p>
        <br>
        <p class="user" align="left">地址: {{user.address}}</p>
        <br>
        <p class="user" align="left">性别: {{user.gender}}</p>
        <br>
        <p class="user" align="left">生日: {{user.birthday}}</p>
        <br>
        <p class="user" align="left">注册时间: {{user.register_time}}</p>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'UserInfo',
  data () {
    return {
      user: []
    }
  },
  methods: {
    loadUser () {
      const _this = this
      this.$axios.get('/home/user/' + _this.$store.state.user.name + '/').then(resp => {
        if (resp && resp.status === 200) {
          _this.user = resp.data
          // console.log(_this.user)
        }
      }).catch(failResponse => {
        _this.$message('加载失败')
      })
    }
  },
  mounted () {
    this.loadUser()
  }
}
</script>

<style scoped>
  .user {
    font-size: x-large;
    /*margin: auto;*/
    font-family: 华文行楷;
  }
</style>
