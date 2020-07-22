<template>
  <div>
    <p style="font-size: xx-large;font-family: Arial">订单信息</p>
    <el-table
      ref="multipleTable"
      :data="products"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      border stripe>

      <el-table-column
        label="商品名"
        width="250"
        prop = "pname"
      >
        <template slot-scope="scope">
          <router-link tag="a" :to="{path:'/orderDetail',query:{id:scope.row.pid}}"
                       style="color:black;text-decoration:none;">{{scope.row.pname}}</router-link>
        </template>
      </el-table-column>>
      <el-table-column
        prop="price"
        label="价格"
        width="250">
      </el-table-column>
      <el-table-column
        prop="number"
        label="数量"
        width="250">
      </el-table-column>
      <el-table-column
        prop="description"
        label="描述"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        label="状态"
        width="400"
        prop = "商品状态"
      >
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
  export default {
    name: 'List',
    data() {
      return {
      }
    },
    created() {
      this.showGoodsInfo()
    },
    methods: {
      // 分页式展示商品信息
      async showGoodsList() {
        const _this = this
        this.$axios
          .post('/list/product')
          .then(successResponse => {
            if (successResponse && successResponse.status === 200) {
              _this.products = successResponse.data
              console.log(_this.products)
            }
          })
          .catch(failResponse => {
            alert('服务器异常')
          })
      },
      async dropGoods(row) {
        const confirmResult = await
          this.$confirm("是否删除"+row.pname+"?","提示",{
            confirmButtonText:"确认",
            cancelButtonText:"取消",
            type:'warning'
          }).catch(err => err)

        if(confirmResult !== 'confirm'){
          return this.$message.info("已取消删除")
        }

        console.log("pid为"+row.pid)
        var _this = this
        this.$axios
          .post('/list/dropGoodsById', {
            pid : row.pid,
          })
          .then(resp => {
            if (resp.data.code === 200) {
              this.$alert(resp.data.message, '提示', {
                confirmButtonText: '确定'
              })
            } else {
              this.$alert(resp.data.message, '提示', {
                confirmButtonText: '确定'
              })
            }
          })

        this.showGoodsInfo()
      }
    },
  }
</script>

<style scoped>


</style>
