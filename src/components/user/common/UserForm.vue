<template>
  <div>
<!--    <i class="el-icon-circle-plus-outline"  @click="dialogFormVisible = true"></i>-->
    <el-dialog
      title="修改信息"
      :visible.sync="dialogFormVisible"
      @close="clear">
      <el-form v-model="form" style="text-align: left" ref="dataForm">
        <el-form-item label="昵称" :label-width="formLabelWidth" prop="uname">
          <el-input v-model="form.uname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth" prop="address">
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="头像" :label-width="formLabelWidth" prop="icon">
          <el-input v-model="form.icon" autocomplete="off" placeholder="图片 URL"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth" prop="gender">
          <el-select v-model="form.gender" placeholder="请选择性别">
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生日" :label-width="formLabelWidth" prop="birthday">
          <div class="block">
            <el-date-picker
              v-model="form.birthday"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </div>
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
  name: 'UserForm',
  data () {
    return {
      dialogFormVisible: false,
      form: {
        uname: '',
        phone: '',
        email: '',
        address: '',
        gender: '',
        birthday: '',
        icon: ''
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    clear () {
      this.form = {
        uname: '',
        phone: '',
        email: '',
        address: '',
        gender: '',
        birthday: '',
        icon: ''
      }
    },
    onSubmit () {
      console.log(this.form)
      this.$axios
        .post('/home/user/info', {
          uname: this.form.uname,
          password: 'password',
          phone: this.form.phone,
          email: this.form.email,
          address: this.form.address,
          gender: this.form.gender,
          birthday: this.form.birthday,
          icon: this.form.icon
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
  .el-icon-circle-plus-outline {
    margin: 50px 0 0 20px;
    font-size: 100px;
    float: left;
    cursor: pointer;
  }
</style>
