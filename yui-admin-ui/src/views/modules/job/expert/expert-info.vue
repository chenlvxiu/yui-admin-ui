<template>
  <el-dialog title="详情"  class="mod-expert-info"
    :close-on-click-modal="false" :visible.sync="visible">
    <el-form :model="dataForm" ref="dataForm" label-width="120px">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="主键:">
            <label>{{ dataForm.id }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="专家账号id:">
            <label>{{ dataForm.userId }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="专家账号所属评委会id:">
            <label>{{ dataForm.juryId }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="评委会评审id:">
            <label>{{ dataForm.reviewId }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="专家账号:">
            <label>{{ dataForm.username }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="专家账号密码:">
            <label>{{ dataForm.pwd }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="专家姓名:">
            <label>{{ dataForm.name }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="专家身份证:">
            <label>{{ dataForm.card }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="类型编码:">
            <label>{{ dataForm.catCd }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="类型:">
            <label>{{ dataForm.catNm }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="状态编码:">
            <label>{{ dataForm.statCd }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="状态:">
            <label>{{ dataForm.statNm }}</label>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        id: null,
        visible: false,
        dataForm: {}
      }
    },
    methods: {
      init (id) {
        this.id = id
        this.visible = true
        this.$nextTick(() => {
          if (this.id) {
            this.getInfo()
          }
        })
      },
      // 获取职称申报系统-评委会专家表信息
      getInfo () {
        this.$http.get('/job/expert/info/' + this.id).then(({data: res}) => {
          if (res.code !== 0) {
            return this.$message.error(res.msg)
          }
          this.dataForm = {
            ...this.dataForm,
            ...res.data
          }
        }).catch(() => {})
      }
    }
  }
</script>
