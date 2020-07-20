<template>
  <div class="list">
  <body>
    <h1 v-on:click="showGoodsList">显示商品列表</h1>
  </body>
  </div>
</template>

<script>
    export default {
      name: "List",
      data() {
        return {
          //查询属性
          queryInfo:{
            query : '',
            pagenum : 1,
            pagesize :10
          }
        }
      },
      created(){
        this.showGoodsList()
      },
      methods: {
        //分页式展示商品信息
        async showGoodsList() {
          this.$axios
            .get('/list/product')
            .then(successResponse => {
              console.log(successResponse.data)
              if (successResponse.data.code === 400) {
                alert('商品不存在')
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

</style>
