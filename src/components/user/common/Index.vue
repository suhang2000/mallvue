<template>
<div>
  <search-bar @onSearch="searchResult" ref="searchBar"></search-bar>
  <el-carousel :interval="3000" type="card" id="carousel">
    <el-carousel-item v-for="item in carousel" :key="item">
      <div class="demo-image">
        <el-image :src="item"></el-image>
      </div>
    </el-carousel-item>
  </el-carousel>
</div>
</template>

<script>
import SearchBar from './SearchBar'
export default {
  name: 'Index',
  components: {SearchBar},
  data () {
    return {
      carousel: [
        'https://aecpm.alicdn.com/simba/img/TB1XotJXQfb_uJkSnhJSuvdDVXa.jpg',
        'https://aecpm.alicdn.com/simba/img/TB1JNHwKFXXXXafXVXXSutbFXXX.jpg',
        'https://aecpm.alicdn.com/simba/img/TB183NQapLM8KJjSZFBSutJHVXa.jpg',
        'https://img.alicdn.com/tfs/TB18NsRcsVl614jSZKPXXaGjpXa-520-280.jpg_q90_.webp'],
      products: []
    }
  },
  methods: {
    searchResult () {
      const _this = this
      console.log(_this.$refs.searchBar.keywords)
      // this.$axios
      //   .get('/search?keywords=' + this.$refs.searchBar.keywords, {
      //   }).then(resp => {
      //     if (resp && resp.status === 200) {
      //       _this.books = resp.data
      //     }
      //   })
      this.$message('待整合')
    }
  }
}
</script>

<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: auto;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  #carousel {
    margin-left: 440px;
    margin-right: 440px;
    margin-bottom: 100px;
  }
</style>
