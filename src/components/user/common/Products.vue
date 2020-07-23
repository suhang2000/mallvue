<template>
  <div>
    <el-row style="height: 800px;">
      <el-tooltip effect="dark" placement="right"
                  v-for="item in products.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                  :key="item.pid">
        <p slot="content" style="font-size: 14px;margin-bottom: 6px;">{{item.bname}}</p>
        <el-card :body-style="{ padding: '0px' }">
<!--          在此将图片src改为item.cover-->
          <img src="" alt="没有图片" class="image">
          <div style="padding: 14px;">
            <span>{{item.pname}}</span>
            <div class="bottom clearfix">
<!--              <time class="time">{{ currentDate }}</time>-->
              <div class="price">{{item.price}}</div>
              <el-button type="text" class="el-icon-shopping-cart-2" @click="addCart"></el-button>
            </div>
          </div>
        </el-card>
      </el-tooltip>
    </el-row>
    <el-row>
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
      pageSize: 10,
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
      this.$axios.get('/products/').then(resp => {
        if (resp && resp.status === 200) {
          _this.products = resp.data
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
              // _this.addBookNumber()
              // _this.loadBooks()
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
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .image {
    width: 100%;
    display: block;
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
