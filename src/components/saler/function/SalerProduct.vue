<template>
  <div>
    <el-card>
      <p style="font-size: xx-large;font-family: Arial">商品管理</p>
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
          prop="pid"
          label="商品编号">
        </el-table-column>
        <el-table-column
          label="商品名"
          width="250"
          prop = "pname">
<!--          <template slot-scope="scope">-->
<!--            <router-link tag="a" :to="{path:'/orderDetail',query:{id:scope.row.pid}}"-->
<!--                         style="color:black;text-decoration:none;">{{scope.row.pname}}</router-link>-->
<!--          </template>-->
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
          width="400">
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

      <div style="margin-top: 20px;float:left">
        <el-button type = "primary" icon = "el-icon-plus"
                   size = "medium"   @click="addGoods(scope.row)">
        </el-button>
      </div>
      <div style="margin-top: 20px;float: left;margin-left: 20px">
        <el-button @click="toggleSelection()">取消选择</el-button>
      </div >
      <ProductForm @onSubmit="showGoodsList()" ref="edit"></ProductForm>
    </el-card>

  </div>
</template>

<script>
import ProductForm from './ProductForm'
export default {
  name: 'List',
  components: {ProductForm},
  data () {
    return {
      goodsList: [],
      multipleSelection: [],
      product: {
        pid: 0,
        pname: ''
      }
    }
  },
  created () {
    this.showAllGoodsList()
  },
  methods: {
    // 分页式展示商品信息
    async showAllGoodsList () {
      const _this = this
      console.log(_this.product)
      this.$axios
        .post('/list/product/saler',{
          pname: this.product.pname,
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
    },
    async dropGoods (row) {
      console.log(row)
      // const _this = this
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
          if (resp.data.code === 200) {
            this.$message.info('已删除')
            this.showGoodsList()
          } else {
            this.$alert(resp.data.message, '提示', {
              confirmButtonText: '确定'
            })
          }
        })
    },
    editGoods (item) {
      this.$refs.edit.dialogFormVisible = true
      this.$refs.edit.pid = item.pid
      this.$refs.edit.form = {
        pname: item.pname,
        price: item.price,
        number: item.number,
        description: item.description,
        cover: item.cover
      }
    }
  }
}
</script>

<style scoped>

</style>
