<template>
<div>
  <search-bar @onSearch="searchResult" ref="searchBar"></search-bar>
  商品首页
</div>
</template>

<script>
import SearchBar from './SearchBar'
export default {
  name: 'Index',
  components: {SearchBar},
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

</style>
