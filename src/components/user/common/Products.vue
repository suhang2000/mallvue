<template>
  <div>
    <el-row style="position: absolute;left: 350px">
      <el-tooltip effect="dark" placement="right"
                  v-for="item in products.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                  :key="item.pid">
        <p slot="content" style="font-size: 14px;margin-bottom: 6px;">详情：{{item.description}}</p>
        <p slot="content" style="font-size: 14px;margin-bottom: 6px;">剩余数量：{{item.number}}</p>
        <el-card style="margin-bottom: 20px;float: left;margin-right: 15px;height: 300px;width: 300px"
                 bodyStyle="padding:0px" shadow="hover">
<!--          在此将图片src改为item.cover-->
<!--          <img src="item.cover" alt="没有图片" class="image">-->
          <el-image :src="item.cover" class="cover">
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
          <div style="padding: 14px;">
            <span>{{item.pname}}</span>
            <div class="bottom clearfix">
<!--              <time class="time">{{ currentDate }}</time>-->
              <div class="price">
                <i class="el-icon-price-tag"></i>
                ￥{{item.price}}
                <el-button type="text" class="el-icon-shopping-cart-2" @click="addCart" style="font-size: 20px"></el-button>
              </div>
            </div>
          </div>
        </el-card>
      </el-tooltip>
    </el-row>
    <el-row style="position:absolute;bottom:-400px;">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="products.length">
      </el-pagination>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Products',
  data () {
    return {
      products: [],
      currentPage: 1,
      pageSize: 8,
      uname: ''
    }
  },
  mounted: function () {
    if (this.$store.state.user.uname) {
      this.uname = this.$store.state.user.uname
    }
    this.loadProducts()
  },
  methods: {
    loadProducts () {
      const _this = this
      this.$axios.get('/home/products').then(resp => {
        if (resp && resp.status === 200) {
          _this.products = resp.data
          console.log(_this.products)
        }
      })
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
      console.log(this.currentPage)
    },
    subProductNumber (item) {
      this.$refs.edit.form = {
        pid: item.pid,
        sid: item.sid,
        pname: item.pname,
        price: item.price,
        description: item.description,
        cover: item.cover,
        number: Number(item.number) - 1
      }
      // this.$refs.edit.onSubmit()
    // 提交修改至后端，调用一个保存的函数
    },
    deleteProduct (product) {
      // const _this = this
      this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios
          .post('/delete', {pid: product.pid}).then(resp => {
            if (resp && resp.status === 200) {
              // _this.addProductNumber()
              // _this.loadProducts()
            // 重新加载
            }
          })
      }
      ).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 加入购物车这个方法的pid我是真的不会传5555
    addCart (product) {
      const _this = this
      this.$axios
        .post('/list/addCart', {
          pid: _this.product.pid
        })
        .then(resp => {
          if (resp.data.code === 200) {
            // System.out.println('增加成功')
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
    // searchResult () {
    //   const _this = this
    //   console.log(_this.$refs.searchBar.keywords)
    //   this.$axios
    //     .get('/search?keywords=' + this.$refs.searchBar.keywords, {}).then(resp => {
    //       if (resp && resp.status === 200) {
    //         _this.products = resp.data
    //       }
    //     })
    // },
  }
}
</script>

<style scoped>
  img {
    width: 115px;
    height: 172px;
    /*margin: 0 auto;*/
  }
  a {
    text-decoration: none;
  }
  a:link, a:visited, a:focus {
    color: #3377aa;
  }
  .price {
    font-size: 20px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .cover {
    /*width: 50%;*/
    /*display: block;*/
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
</style>
