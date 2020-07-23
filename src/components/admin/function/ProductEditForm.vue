<template>
  <div style="text-align: left">
    <el-button class="add-button" type="success" @click="dialogFormVisible = true">添加商品</el-button>
    <el-dialog
      title="修改商品"
      :visible.sync="dialogFormVisible"
      @close="clear">
      <el-form v-model="form" style="text-align: left" ref="dataForm">
        <el-form-item label="名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off" placeholder="不加《》"></el-input>
        </el-form-item>
        <el-form-item label="商家" :label-width="formLabelWidth" prop="saler">
          <el-input v-model="form.saler" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" :label-width="formLabelWidth" prop="price">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="余量" :label-width="formLabelWidth" prop="number">
          <el-input v-model="form.number" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" :label-width="formLabelWidth" prop="cover">
          <el-input v-model="form.cover" autocomplete="off" placeholder="图片 URL"></el-input>
          <img-upload @onUpload="uploadImg" ref="imgUpload"></img-upload>
        </el-form-item>
        <el-form-item label="简介" :label-width="formLabelWidth" prop="description">
          <el-input type="textarea" v-model="form.description" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="pid" style="height: 0">
          <el-input type="hidden" v-model="form.pid" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import ImgUpload from './ImgUpload'
export default {
  name: 'ProductEditForm',
  // components: {ImgUpload},
  data () {
    return {
      dialogFormVisible: false,
      form: {
        pid: '',
        name: '',
        saler: '',
        price: '',
        number: '',
        description: '',
        cover: ''
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    clear () {
      this.$refs.imgUpload.clear()
      this.form = {
        id: '',
        pid: '',
        name: '',
        saler: '',
        price: '',
        number: '',
        description: '',
        cover: ''
      }
    },
    onSubmit () {
      this.$axios
        .post('/product/edit', {
          pid: this.form.pid,
          name: this.form.name,
          saler: this.form.saler,
          price: this.form.price,
          number: this.form.number,
          description: this.form.description,
          cover: this.form.cover,
        }).then(resp => {
        if (resp && resp.data.code === 200) {
          this.dialogFormVisible = false
          this.$emit('onSubmit')
        }
      })
    },
    uploadImg () {
      this.form.cover = this.$refs.imgUpload.url
    }
  }
}
</script>

<style scoped>
  .add-button {
    margin: 18px 0 0 10px;
  }
</style>
