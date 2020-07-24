<template>
  <div>
    <!--    <i class="el-icon-circle-plus-outline"  @click="dialogFormVisible = true"></i>-->
    <el-dialog
      title="修改信息"
      :visible.sync="dialogFormVisible"
      @close="clear">
      <el-form v-model="form" style="text-align: left" ref="dataForm">
        <el-form-item label="收货地址" :label-width="formLabelWidth" prop="address">
          <el-input v-model="form.uname" autocomplete="off"></el-input>
        </el-form-item>
        <!--        <el-form-item prop="bookid" style="height: 0">-->
        <!--          <el-input type="hidden" v-model="form.bookid" autocomplete="off"></el-input>-->
        <!--        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    name: 'CartForm',
    data () {
      return {
        dialogFormVisible: false,
        form: {
          address:''
        },
        formLabelWidth: '120px'
      }
    },
    methods: {
      clear () {
        this.form = {
          address:''
        }
      },
      onSubmit () {
        this.$axios
          .post('/home/user/info', {
            address: this.form.address
          }).then(resp => {
          if (resp && resp.status === 200) {
            this.dialogFormVisible = false
            this.$emit('onSubmit')
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
