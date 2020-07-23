<template>
  <div>
    <el-row style="margin: 18px 0px 0px 18px ">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/admin/dashboard' }">管理中心</el-breadcrumb-item>
        <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <edit-form @onSubmit="loadProducts()" ref="edit"></edit-form>
    <el-card style="margin: 18px 2%;width: 95%">
      <el-table
        :data="products"
        stripe
        style="width: 100%"
        :max-height="tableHeight">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline>
              <el-form-item>
                <span>{{ props.row.description }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="名称（展开查看简介）"
          fit>
        </el-table-column>
        <el-table-column
          prop="saler"
          label="商家"
          fit>
        <el-table-column
          prop="price"
          label="价格"
          width="100">
        </el-table-column>
        </el-table-column>
        <el-table-column
          prop="number"
          label="余量"
          width="120">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="120">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="editProduct(scope.row)"
              type="text"
              size="small">
              编辑
            </el-button>
            <el-button
              @click.native.prevent="deleteProduct(scope.row.pid)"
              type="text"
              size="small">
              移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin: 20px 0 20px 0;float: left">
        <el-button>取消选择</el-button>
        <el-button>批量删除</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import ProductEditForm from './ProductEditForm'
export default {
  name: "ProductManage",
  components: {ProductEditForm},
  data () {
    return {
      products: []
    }
  },
  mounted() {
    this.loadProducts()
  },
  computed: {
    tableHeight () {
      return window.innerHeight-320
    }
  },
  methods: {
    loadProducts () {
      var _this = this
      this.$axios.get('/product/load').then(resp => {
        if (resp && resp.data.code === 200) {
          _this.products = resp.data.result
        }
      })
    },
    editProduct (item) {
      this.$refs.edit.dialogFormVisible = true
      this.$refs.edit.form = {
        pid: item.pid,
        name: item.name,
        saler: item.saler,
        price: item.price,
        number: item.number,
        description: item.description,
        cover: item.cover,
      }
    },
    deleteProduct (pid) {
      this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
          this.$axios
            .post('/product/delete', {pid: pid}).then(resp => {
            if (resp && resp.data.code === 200) {
              this.loadProducts()
            }
          })
        }
      ).catch(() => {
        this.$message({
          type: 'info',
          message: '取消删除'
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
