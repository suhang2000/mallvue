<template>
  <div>
    <p style="font-size: xx-large;font-family: Arial">全部商品</p>
    <el-card>
      <el-row :gutter="20">
      <el-col :span="8">
        <el-input placeholder="请输入内容"
        v-model="queryInfo.query" clearable @clear="clearInput">
          <el-button slot="append" icon="el-icon-search"
                     @click="showGoodsList">
          </el-button>
        </el-input>
      </el-col>
      </el-row>
    </el-card>

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
        label="描述"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
      label="操作"
      width="400">
        <template slot-scope="scope">
            <el-button type = "danger" icon = "el-icon-delete"
                 size = "mini" @click="dropGoods(scope.row)">
            </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div style="margin-top: 20px;float:left">
      <el-button type = "primary" icon = "el-icon-plus"
                 size = "mini"   @click="addGoods(scope.row)">
      </el-button>
    </div>
    <div style="margin-top: 20px;float: left">
      <el-button @click="toggleSelection()">取消选择</el-button>
    </div >


  </div>
</template>

<script>
export default {
  name: 'List',
  data() {
    return {
      products: [],
      url: "www.baidu.com",
      multipleSelection: []
    }
  },
  created() {
    this.showGoodsList()
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

    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      console.log(val)
    },
    showDetailedInfo (row) {
      console.log(row)
      //  var path = _this.$route.query.redirect
      // _this.$router.replace({path: path === '/' || path === undefined ? '/hello' : path})
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

      this.showGoodsList()
    }
  },
}
</script>

<style scoped>


</style>
