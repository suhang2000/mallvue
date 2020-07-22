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
      userName: ''
    }
  },
  mounted: function () {
    this.loadBooks()
    this.autoBorrow()
  },
  methods: {
    loadBooks () {
      const _this = this
      this.$axios.get('/books/').then(resp => {
        if (resp && resp.status === 200) {
          _this.products = resp.data
        }
      })
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
      console.log(this.currentPage)
    },
    editBook (item) {
      // alert(typeof item)
      this.$refs.edit.dialogFormVisible = true
      this.$refs.edit.form = {
        bookid: item.bookid,
        call_number: item.call_number,
        bname: item.bname,
        image: item.image,
        summary: item.summary,
        author: item.author,
        isbn: item.isbn,
        price: item.price,
        publisher: item.publisher,
        number: item.number,
        borrowed_number: item.borrowed_number,
        reserved_number: item.reserved_number,
        category: {
          id: item.category.cid.toString(),
          name: item.category.name
        }
      }
    },
    subBookNumber (item) {
      this.$refs.edit.form = {
        bookid: item.bookid,
        call_number: item.call_number,
        bname: item.bname,
        image: item.image,
        summary: item.summary,
        author: item.author,
        isbn: item.isbn,
        price: item.price,
        publisher: item.publisher,
        number: Number(item.number) - 1,
        borrowed_number: Number(item.borrowed_number) + 1,
        reserved_number: item.reserved_number,
        category: {
          cid: item.category.cid.toString(),
          name: item.category.name
        }
      }
      this.$refs.edit.onSubmit()
    },
    // eslint-disable-next-line camelcase
    deleteBook (book) {
      const _this = this
      this.$confirm('此操作将永久删除该书籍, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios
          .post('/delete', {bookid: book.bookid}).then(resp => {
            if (resp && resp.status === 200) {
              // _this.addBookNumber()
              _this.loadBooks()
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
    searchResult () {
      const _this = this
      console.log(_this.$refs.searchBar.keywords)
      this.$axios
        .get('/search?keywords=' + this.$refs.searchBar.keywords, {}).then(resp => {
          if (resp && resp.status === 200) {
            _this.products = resp.data
          }
        })
    },
    autoBorrow () {
      const _this = this
      this.$axios
        .post('/borrow/auto-borrow/' + _this.userName + '/').then(resp => {
          if (resp && resp.status === 200) {
            _this.$message('您的预约有余量的已经成功转为借阅', '消息', {
              confirmButtonText: '确定'
            })
          }
        })
    },
    rentBook (item) {
      const _this = this
      this.$confirm('确认是否借阅此书, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (item.number <= 0) {
          this.$confirm('目前该书籍没有副本, 是否预约?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$axios
              .post('/borrow/reserve/' + _this.userName + '/' + item.bookid + '/').then(resp => {
                // console.log(resp)
                if (resp.data === '') {
                  _this.$alert('您已借阅了或者预约过此书，不能二次借阅', '消息', {
                    confirmButtonText: '确定'
                  })
                } else if (resp && resp.status === 200) {
                  _this.$alert('您已经成功预约该图书', '消息', {
                    confirmButtonText: '确定'
                  })
                  _this.subBookNumber(item)
                  this.loadBooks()
                }
              })
          }
          ).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消预约'
            })
          })
        } else {
          this.$axios
            .post('/borrow/rent/' + _this.userName + '/' + item.bookid + '/').then(resp => {
              // console.log(resp)
              if (resp.data === '') {
                _this.$alert('您已借阅了此书，不能二次借阅', '消息', {
                  confirmButtonText: '确定'
                })
              } else if (resp && resp.status === 200) {
                _this.$alert('借书成功', '消息', {
                  confirmButtonText: '确定'
                })
                _this.subBookNumber(item)
                this.loadBooks()
              }
            })
        }
      }
      ).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消借阅'
        })
      })
    }
  }
}
</script>

<style scoped>
  .cover {
    width: 155px;
    height: 212px;
    margin-bottom: 7px;
    overflow: hidden;
    cursor: pointer;
  }
  img {
    width: 115px;
    height: 172px;
    /*margin: 0 auto;*/
  }
  .bname {
    font-size: 14px;
    text-align: left;
  }
  .author {
    color: #333;
    width: 102px;
    font-size: 13px;
    margin-bottom: 6px;
    text-align: left;
  }
  .summary {
    display: block;
    line-height: 25px;
  }
  .el-icon-delete {
    cursor: pointer;
    float: right;
  }
  .switch {
    display: flex;
    position: absolute;
    left: 780px;
    top: 25px;
  }
  a {
    text-decoration: none;
  }
  a:link, a:visited, a:focus {
    color: #3377aa;
  }
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
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
