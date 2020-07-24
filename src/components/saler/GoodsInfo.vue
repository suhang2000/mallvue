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
        label="商品编号"
        width="100"
        prop ="1"
      >
      </el-table-column>>
      <el-table-column
        label="商品名"
        width="100"
        prop ="1">
      </el-table-column>
      <el-table-column
        label="下单时间"
        width="100"
        prop="2">
      </el-table-column>
      <el-table-column
      label="下单数量"
      prop = "3"
    >
    </el-table-column>
      <el-table-column
      label="买家地址"
      prop = "4"
    >
    </el-table-column>
      <el-table-column
        label="支付状态"
        prop="5">
      </el-table-column>
      <el-table-column
        label="发货"
        prop = "6"
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
      }
    },
    created() {
      this.showAllOrders()
    },
    methods: {
      async showAllOrders() {
        const _this = this
        this.$axios
          .post("/apple",{
            sid:"123"
          })
          .then(successResponse => {
            if (successResponse && successResponse.status === 200) {
              _this.orders = successResponse.data
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
