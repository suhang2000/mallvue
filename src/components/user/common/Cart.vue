<template>
  <div>
      <p style="font-size: xx-large;font-family: Arial">购物车情况</p>

        <el-table ref="multipleTable"
                  :data="carts"
                  tooltip-effect="dark"
                  style="width: 100%"
                  @selection-change="handleSelectionChange"
                  border stripe>
          <el-table-column prop="0" label="编号">
          </el-table-column>
          <el-table-column prop="1" label="商品名称">
          </el-table-column>
          <el-table-column prop="2" label="单价" >
          </el-table-column>
          <el-table-column prop="3" label="商品数量">
          </el-table-column>

          <el-table-column  label="数量操作" width="150">
            <template slot-scope="scope">
              <el-button type = "danger" icon = "el-icon-circle-plus"
                         size = "mini" @click="plusGoods(scope.row)">
              </el-button>
              <el-button type = "danger" icon = "el-icon-remove"
                         size = "mini" @click="removeGoods(scope.row)">
              </el-button>
            </template>
          </el-table-column>
          <el-table-column prop="4" label="小计">
          </el-table-column>
          <el-table-column label="操作" width="400">
            <template slot-scope="scope">
              <el-button type = "danger" icon = "el-icon-delete"
                         size = "mini" @click="dropGoods(scope.row)">
              </el-button>
              <el-button type="primary">确认支付</el-button>

            </template>
          </el-table-column>
        </el-table>
  </div >
</template>


<script>
export default {
  name: 'Cart',
  data () {
    return {
      carts: [],
      multipleSelection: []
    }
  },
  created () {
    this.showCartsList()
  },
  methods: {
    // 分页式展示商品信息
    showCartsList () {
      const _this = this
      this.$axios
        .post('/cart/view')
        .then(successResponse => {
          if (successResponse && successResponse.status === 200) {
            _this.carts = successResponse.data
            console.log(_this.carts)
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

    plusGoods (row) {
      const _this = this
      this.$axios
        .post('/cart/addGoods', {
          cid: row[0]
        })
        .then(resp => {
          if (resp.data.code === 200) {
            // System.out.println('增加成功')
            // this.$alert(resp.data.message, '提示', {
            //   confirmButtonText: '确定'
            // })
            _this.showCartsList()
          } else {
            this.$alert(resp.data.message, '提示', {
              confirmButtonText: '确定'
            })
          }
        })
    },

    removeGoods (row) {
      const _this = this
      this.$axios
        .post('/cart/removeGoods', {
          cid: row[0]
        })
        .then(resp => {
          if (resp.data.code === 200) {
            // System.out.println('删减成功')
            // this.$alert(resp.data.message, '提示', {
            //   confirmButtonText: '确定'
            // })
            _this.showCartsList()
          } else {
            this.$alert(resp.data.message, '提示', {
              confirmButtonText: '确定'
            })
          }
        })
      this.showCartsList()
    },

    async dropGoods (row) {
      console.log(row)
      const _this = this
      const confirmResult = await
      this.$confirm('是否删除' + row[1] + '?', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)

      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }

      console.log('cid为' + row[0])
      this.$axios
        .post('/cart/dropGoods', {
          cid: row[0]
        })
        .then(resp => {
          if (resp.data.code === 200) {
            this.$message(resp.data.message)
            _this.showCartsList()
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
