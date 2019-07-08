<template>
  <el-dialog :title="`${text}原因`" :visible.sync="visible" :closeOnClickModal="false">
    <el-form :model="form" ref="form" :rules="rules" class="m-form">
      <el-form-item :label="`${text}原因`" prop="content">
        <m-textarea v-model="form.content" :data-value="form.content" :placeholder="`${text}原因`"></m-textarea>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="doCanel('form')">取消</el-button>
      <el-button type="primary" @click="doSure('form')">提交</el-button>
    </div>
  </el-dialog>
</template>

<script>

  export default {
    name: "m-dialog",
    props: ['visible', 'text'],
    data() {
      return {
        form: {
          content: ''
        },
        rules: {
          content: [
            {required: true, message: `请输入审核不通过原因`, trigger: 'blur'},
          ]
        },
      }
    },
    methods: {
      clearValidate(formName) {
        this.$nextTick(() => {
          this.$refs[formName].clearValidate();
        })
      },
      doCanel(formName) {
        this.$emit('change', false)
      },
      doSure(formName) {
        this.$refs[formName].validate((valid) => {
          if (!valid) return false
          this.$confirm(`是否确认${this.text}?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$emit('change', false, this.form.content)
            // 处理通过/不通过
          }).catch(() => {
            this.$emit('change', false)
          });
        })
      }
    }
  }
</script>

<style scoped>

</style>
