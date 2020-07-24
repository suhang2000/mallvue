<template>
  <div>
  <div class="line"></div>
  <el-menu
    default-active="1"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">
    <el-menu-item index="1" @click="showOrdersList">全部订单查询</el-menu-item>
    <el-submenu index="2" >
      <template slot="title">未支付订单</template>
      <el-menu-item index="2-1" @click="showOrdersList1">订单查看</el-menu-item>
      <router-link to="/home/orderToPay">
      <el-menu-item index="2-2" >订单撤回/支付</el-menu-item></router-link>
      </el-submenu>
    <el-submenu index="3" >
      <template slot="title">待发货订单</template>
      <el-menu-item index="3-1" @click="showOrdersList2">订单查看</el-menu-item>
      <router-link to="/home/orderToSend">
        <el-menu-item index="3-2" >订单撤回</el-menu-item></router-link>
    </el-submenu>
    <el-menu-item index="4" @click="showOrdersList3">已发货订单</el-menu-item>
  </el-menu>

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
      <el-table-column prop="8" label="订单状态">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// import {AxiosInstance as $axios} from 'axios'

export default {
  name: 'Order',
  data () {
    return {
      orders: []
    }
  },
  created () {
    this.showCartsList()
  },
  methods: {
    // 分页式展示商品信息
    showOrdersList () {
      const _this = this
      this.$axios
        .post('/userorder/view', {
          cid: this.orders.cid,
          pname: this.orders.pname
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
    showOrdersList1 () {
      const _this = this
      this.$axios
        .post('/userorder/view1')
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
    showOrdersList2 () {
      const _this = this
      this.$axios
        .post('/userorder/view2')
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
    showOrdersList3 () {
      const _this = this
      this.$axios
        .post('/userorder/view3')
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
    showDetailedInfo (row) {
      console.log(row)
    }
  }
}
</script>

<style scoped>

</style>
