<template>
  <div>
    <p style="font-size: xx-large;font-family: Arial">订单信息</p><el-container>
    <el-select v-model="value" placeholder="请选择" style="width: 120px">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>

    <el-row :gutter="20">
      <el-col :span="20">
        <el-input placeholder="请输入内容" type="text" auto-complete="off"
                  v-model="product.pname" clearable @clear="clearInput">

          <el-button slot="append" icon="el-icon-search"
                     @click="showGoodsList">
          </el-button>
        </el-input>
      </el-col>
    </el-row>
  </el-container>
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
        order:{
          pname:'苹果',
          oid:0,
          uid:0,
          pid:0,
          trade_time:2000-1-1,
          trade_num:0,
          address:'北京市',
          pay_or_not:0,
          deliver_or_not:0
        },
        options: [{
          value: '选项1',
          label: '搜索商品'
        }, {
          value: '选项2',
          label: '搜索商家'
        }, {
          value: '选项3',
          label: '搜索用户'
        }],
        value: ''
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
              _this.order = successResponse.data
              console.log(_this.order)
              console.log(_this.order.pname)
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
