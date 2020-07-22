<template>
  <el-container>
    <el-header>
      <div>
        <h1>
          <router-link to="/home" title="SCU25商城首页">SCU25商城</router-link>
        </h1>
      </div>
      <div>
        <el-menu
          :default-active="activeIndex"
          router
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item :index='/home/'>所有商品</el-menu-item>
          <el-menu-item index="2" disabled>购物车</el-menu-item>
          <el-submenu index="3">
            <template slot="title">信息</template>
            <el-menu-item index="3-1">订单</el-menu-item>
            <el-menu-item index="3-2">选项2</el-menu-item>
            <el-menu-item index="3-3">选项3</el-menu-item>
            <el-submenu index="3-4">选项4</el-submenu>
            <router-link to="/home">刷新首页</router-link>
          </el-submenu>
          <el-menu-item index="4"><a href="http://gitlab.suncaper.net/Lisuhang/mall" target="_blank">GitLab</a></el-menu-item>
        </el-menu>
      </div>
    </el-header>
    <el-main></el-main>
    <el-footer></el-footer>
  </el-container>
</template>

<script>
import Index from './common/Index'
export default {
  name: 'Home',
  components: {Index},
  data () {
    return {
      activeIndex: '1'
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style scoped>

</style>
