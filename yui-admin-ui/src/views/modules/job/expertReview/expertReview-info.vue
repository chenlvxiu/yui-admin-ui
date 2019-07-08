<template>
  <el-dialog title="详情"  class="mod-expertReview-info"
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
            <label>{{ dataForm.expertId }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="申报id:">
            <label>{{ dataForm.declareId }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="用户姓名:">
            <label>{{ dataForm.userName }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="专家姓名:">
            <label>{{ dataForm.expertName }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="所属评委会:">
            <label>{{ dataForm.juryName }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系电话:">
            <label>{{ dataForm.mob }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="专家身份证:">
            <label>{{ dataForm.card }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="申报系列编码:">
            <label>{{ dataForm.serCd }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="申报系列:">
            <label>{{ dataForm.serNm }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="申报专业编码:">
            <label>{{ dataForm.proCd }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="申报专业:">
            <label>{{ dataForm.proNm }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="申报级别编码:">
            <label>{{ dataForm.lvlCd }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="申报级别:">
            <label>{{ dataForm.lvlNm }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="专业技术资格编码:">
            <label>{{ dataForm.quaCd }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="专业技术资格:">
            <label>{{ dataForm.quaNm }}</label>
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
          <el-form-item label="评审状态编码:">
            <label>{{ dataForm.statCd }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="评审状态:">
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
      // 获取职称申报系统-专家评审表信息
      getInfo () {
        this.$http.get('/job/expertReview/info/' + this.id).then(({data: res}) => {
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
