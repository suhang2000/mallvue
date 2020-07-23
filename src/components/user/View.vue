<template>
  <div>
    <p style="font-size: xx-large;font-family: Arial">全部商品</p>
    <i class="el-icon-shopping-cart-2" style="margin-right: 15px" font-size="30">
      <router-link to="cart">查看购物车</router-link></i>
    <el-table
      ref="multipleTable"
      :data="products"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      border stripe>
      <el-table-column
        type="selection"
        width="55">
      </el-table-column >

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
        label="操作"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-circle-plus" @click="addcart(scope.row)">加入购物车</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div style="margin-top: 20px;float: left">
      <el-button @click="toggleSelection()">取消选择</el-button>
    </div >





  </div>
</template>

<script>
  export default {
    name: 'View',
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
        console.log(val)
      },
      showDetailedInfo (row) {
        console.log(row)
        //  var path = _this.$route.query.redirect
        // _this.$router.replace({path: path === '/' || path === undefined ? '/hello' : path})
      },
      addcart(row) {
        this.$axios
          .post('/list/addCart', {
            pid: row.pid
          })
          .then(resp => {
            if (resp.data.code === 200) {
              System.out.println("增加成功");
              this.$alert(resp.data.message, '提示', {
                confirmButtonText: '确定'
              })
            } else {
              this.$alert(resp.data.message, '提示', {
                confirmButtonText: '确定'
              })
            }
          })
      }
    }
  }
</script>

<style scoped>

</style>
