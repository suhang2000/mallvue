<template>
  <div>
    <el-card >
    <p style="font-size: xx-large;font-family: Arial">全部商品</p>

      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" type="text" auto-complete="off"
          v-model="product.pname" clearable @clear="clearInput">
              <el-button slot="append" icon="el-icon-search"
                     @click="showGoodsList">
              </el-button>
          </el-input>
        </el-col>
      </el-row>
    <el-table
      ref="multipleTable"
      :data="goodsList"
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
      </el-table-column>
      <el-table-column
      label="操作"
      width="200">
        <template slot-scope="scope">
            <el-button type = "danger" icon = "el-icon-delete"
                 size = "mini" @click="dropGoods(scope.row)">
            </el-button>
            <el-button type = "primary" icon = "el-icon-edit"
                 size = "mini" @click="editGoods(scope.row)">
            </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 3px">
      <el-button type = "primary" icon = "el-icon-plus"
                 size = "mini"   @click="addGoods()">
      </el-button>
    </div>
    </el-card>

  </div>
</template>

<script>
export default {
  name: 'List',
  data () {
    return {
      goodsList: [],
      multipleSelection: [],
      product: {
        pid: 0,
        pname: ''
      },
      testProductData: {
        sid: 1,
        pname: '帽子',
        price: 20,
        number: 20,
        description: '这是一顶帽子',
        cover: ''
      }
    }
  },
  created () {
    this.showGoodsList()
  },
  methods: {
    // 分页式展示商品信息
    async showGoodsList () {
      const _this = this
      console.log(_this.product)
      this.$axios
        .post('/list/product', {
          pname: this.product.pname
        })
        .then(successResponse => {
          if (successResponse && successResponse.status === 200) {
            _this.goodsList = successResponse.data
            console.log(_this.goodsList)
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
    clearInput () {
    },
    addGoods () {
      const _this = this
      this.$axios
        .post('/list/addGoods', {
          sid: _this.testProductData.sid,
          pname: _this.testProductData.pname,
          price: _this.testProductData.price,
          number: _this.testProductData.number,
          description: _this.testProductData.description,
          cover: _this.testProductData.cover
        })
        .then(resp => {
          this.$alert('添加成功', '提示', {
            confirmButtonText: '确定'
          })
        })
      // 刷新有问题，不能自动刷新
      this.showGoodsList()
    },
    async dropGoods (row) {
      console.log(row)
      const confirmResult = await
      this.$confirm('是否删除' + row.pname + '?', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)

      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }

      console.log('pid为' + row.pid)
      this.$axios
        .post('/list/dropGoodsById', {
          pid: row.pid
        })
        .then(resp => {
          if (resp.data.code === 200) {
            this.$alert('删除成功', '提示', {

              confirmButtonText: '确定'
            })
          } else {
            this.$alert('删除失败', '提示', {
              confirmButtonText: '确定'
            })
          }
        })
      // 刷新有问题，不能自动刷新
      this.showGoodsList()
    }
  }
}
</script>

<style scoped>

</style>
