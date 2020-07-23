<template>
  <el-menu
    class="el-menu-admin"
    router
    mode="vertical"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    :collapse="isCollapse">
    <div style="height: 80px;"></div>
    <el-submenu>

    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: 'AdminMenu',
  data () {
    return {

    }
  }
}
</script>

<style scoped>
  .el-menu-admin {
    border-radius: 5px;
    height: 100%;
  }
</style>
