<template>
<div>

  <div class="filter-container">
    <div class="letf-items" style="float: left;">
      <router-link to="/home/order">
        <el-button type="primary" icon="el-icon-back">返回订单管理</el-button></router-link>
      <el-button type = "text" size = "mini" @click="showOrdersList">点击此处展开未支付订单</el-button>
    </div>
  </div>
  <el-table
    :data="orders"
    tooltip-effect="dark"
    style="width: 100%"
    border stripe>
    <el-table-column prop = "0" label="订单号">
    </el-table-column>
    <el-table-column prop="1" label="商品名称">
    </el-table-column>
    <el-table-column prop="2" label="数量">
    </el-table-column>
    <el-table-column prop="3" label="单价">
    </el-table-column>
    <el-table-column prop="4" label="金额">
    </el-table-column>
    <el-table-column prop="5" label="交易时间">
    </el-table-column>
    <el-table-column  label="操作" >
      <template slot-scope="scope">
        <el-button type = "danger" icon = "el-icon-delete" @click="orderDrop(scope.row)"
                   size = "mini" >
        </el-button>
        <el-button type = "primary" size = "mini" @click="orderPay(scope.row)" >支付</el-button>
      </template>
    </el-table-column>
  </el-table>
</div>

</template>

<script>
  import {AxiosInstance as $axios} from "axios";
    export default {
        name: "OrderToPay",
      data() {
        return {
          orders:[]
        }
      },
      created() {
        this.showCartsList()
      },
      methods:{
        showOrdersList() {
          const _this = this
          this.$axios
            .post('/userorder/viewlist')
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
        async orderDrop (row) {
          console.log(row)
          const confirmResult = await
            this.$confirm('是否撤回订单号为' + row[0] + '的订单?', '提示', {
              confirmButtonText: '确认',
              cancelButtonText: '取消',
              type: 'warning'
            }).catch(err => err)

          if (confirmResult !== 'confirm') {
            return this.$message.info('已取消删除')
          }

          console.log('oid为' + row[0])
          this.$axios
            .post('/order/dropUnpaid', {
              oid: row[0]
            })
            .then(resp => {
              if (resp.data.coode === 200) {
                this.$alert(resp.data.message, '提示', {
                  confirmButtonText: '确定'
                })
              } else {
                this.$alert(resp.data.message, '提示', {
                  confirmButtonText: '确定'
                })
              }
            })
        },
        orderPay(row){
          console.log(row)
          console.log('oid为' + row[0])
          const _this = this
          this.$axios
            .post('/order/orderPay', {
              oid: row[0]
            })
            .then(resp => {
              if (resp.data.code === 200) {
                _this.showOrdersList();
                this.$message.info('支付成功！')
              } else {
                this.$alert(resp.data.message, '提示', {
                  confirmButtonText: '确定'
                })
              }
            })
        },
        showDetailedInfo (row) {
          console.log(row)

        }
      }
    }
</script>

<style scoped>

</style>
