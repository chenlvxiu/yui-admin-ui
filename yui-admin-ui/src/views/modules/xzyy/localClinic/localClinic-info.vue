<template>
  <el-dialog title="详情"  class="mod-localClinic-info"
    :close-on-click-modal="false" :visible.sync="visible">
    <el-form :model="dataForm" ref="dataForm" label-width="120px">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label=":">
            <label>{{ dataForm.id }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="挂号记录外键:">
            <label>{{ dataForm.regdId }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="患者ID:">
            <label>{{ dataForm.patientId }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label=":">
            <label>{{ dataForm.patientName }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="接诊医生ID:">
            <label>{{ dataForm.doctorId }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="医生姓名:">
            <label>{{ dataForm.doctorName }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="主诉:">
            <label>{{ dataForm.complaint }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="诊断:">
            <label>{{ dataForm.diagnoseResults }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="分类编码:">
            <label>{{ dataForm.catCd }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="分类名称:">
            <label>{{ dataForm.catNm }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="申报状态编码:">
            <label>{{ dataForm.statCd }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="申报状态:">
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
      // 获取行走的医院——本地记录表信息
      getInfo () {
        this.$http.get('/xzyy/localClinic/info/' + this.id).then(({data: res}) => {
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
