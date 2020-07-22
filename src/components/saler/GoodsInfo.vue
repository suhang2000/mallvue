<template>
  <div>
    <p style="font-size: xx-large;font-family: Arial">订单信息</p>
    <el-table
      ref="multipleTable"
      :data="orders"
      tooltip-effect="dark"
      style="width: 100%"
      border stripe>

      <el-table-column
        label="商品名"
        width="100"
        prop = "pname"
      >
      </el-table-column>>
      <el-table-column
        prop="price"
        label="售出价格"
        width="100">
      </el-table-column>
      <el-table-column
        prop="number"
        label="售出数量"
        width="100">
      </el-table-column>
      <el-table-column
      label="下单时间"
      prop = "商品状态"
    >
    </el-table-column>
      <el-table-column
      label="买家地址"
      prop = "商品状态"
    >
    </el-table-column>
      <el-table-column
        prop="description"
        label="买家备注"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        label="发货状态"
        width="100"
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
        orders : [],
        order:{
          uid:1,
        }
      }
    },
    created() {
      this.showAllOrders()
    },
    methods: {
      // 分页式展示商品信息
      async showAllOrders() {
        const _this = this
        this.$axios
          .post("/apple",{
            uid: this.order.uid
          })
          .then(successResponse => {
            if (successResponse && successResponse.status === 200) {
              _this.orders = successResponse.data
              console.log(_this.orders)
            }
          })
          .catch(failResponse => {
            alert('服务器异常')
          })
      },
    },
  }
</script>

<style scoped>


</style>
