<template>
  <div>
    <p style="font-size: xx-large;font-family: Arial">全部商品</p>
    <el-table
      ref="multipleTable"
      :data="products"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="pname"
        label="商品名"
        width="250">
      </el-table-column>
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
      </el-table-column><el-table-column
      label="操作"
      width="400">
      <el-button class="el-icon-shopping-cart-2" @click.once="加入购物车"></el-button>
    </el-table-column>
    </el-table>
    <div style="margin-top: 20px;float: left">
      <el-button @click="toggleSelection()">取消选择</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'List',
  data () {
    return {
      products: [],
      multipleSelection: []
    }
  },
  created () {
    this.showGoodsList()
  },
  methods: {
    // 分页式展示商品信息
    async showGoodsList () {
      const _this = this
      this.$axios
        .get('/list/product')
        .then(successResponse => {
          // console.log(successResponse)
          // console.log(successResponse.data[0])
          if (successResponse && successResponse.status === 200) {
            _this.products = successResponse.data
            console.log(_this.products)
          }
        })
        .catch(failResponse => {
          alert('服务器异常')
        })
    },
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    }
  }
}
</script>

<style scoped>

</style>
