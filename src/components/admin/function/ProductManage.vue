<template>
  <div>
    <el-row style="margin: 0px 0px 0px 0px ">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/admin/dashboard' }">管理中心</el-breadcrumb-item>
        <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-input placeholder="请输入商品名" type="text" auto-complete="off"
                  v-model="product.pname" clearable @clear="clearInput">
          <el-button slot="append" icon="el-icon-search"
                     @click="findProduct">
          </el-button>
        </el-input>
      </el-col>
    </el-row>
    <el-table ref="multipleTable" :data="productList" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" border stripe>
      <el-table-column type="selection" width="55"></el-table-column >
      <el-table-column label="商品名" width="200" prop = "pname">
        <template slot-scope="scope">
          <router-link tag="a" :to="{path:'/orderDetail',query:{id:scope.row.pid}}" style="color:black;text-decoration:none;">{{scope.row.pname}}</router-link>
        </template>
      </el-table-column>
      <el-table-column prop="price" label="价格" width="100"></el-table-column>
      <el-table-column prop="number" label="数量" width="100"></el-table-column>
      <el-table-column prop="description" label="描述" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" width="400">
        <template slot-scope="scope">
          <el-button type = "danger" icon = "el-icon-delete" size = "mini" @click="dropGoods(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px;float:left">
      <el-button type = "primary" icon = "el-icon-plus" size = "mini"  @click="addGoods(scope.row)"></el-button>
    </div>
    <div style="margin-top: 20px;float: left"><el-button @click="toggleSelection()">取消选择</el-button></div >
  </div>
</template>

<script>
export default {
  name: "ProductManage",
  data () {
    return {
      productList:[],
      multipleSelection: [],
      product:{
        pid:0,
        pname:'',
      }
    }
  },
  created() {
    this.findProduct()
  },
  methods: {
    async findProduct () {
      const _this = this
      this.$axios
        .post('/list/product',{
          pname: this.product.pname,
        })
        .then(successResponse => {
          if (successResponse && successResponse.status === 200) {
            _this.productList= successResponse.data
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
    async deleteProduct (row) {
      const confirmResult = await
      this.$confirm('是否删除' + row.pname + '?', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }
      this.$axios
        .post('/list/dropGoodsById', {
          pid: row.pid
        })
        .then(resp => {
          if (resp.data.code !== 200) {
            this.$alert(resp.data.message, '提示', {
              confirmButtonText: '确定'
            })
          }
        })
      this.findProduct()
    }
  }
}
</script>

<style scoped>

</style>
