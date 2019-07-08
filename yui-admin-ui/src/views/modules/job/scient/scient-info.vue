<template>
  <el-dialog title="详情"  class="mod-scient-info"
    :close-on-click-modal="false" :visible.sync="visible">
    <el-form :model="dataForm" ref="dataForm" label-width="120px">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="主键:">
            <label>{{ dataForm.id }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="申报id:">
            <label>{{ dataForm.declareId }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="项目名称:">
            <label>{{ dataForm.name }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="项目来源:">
            <label>{{ dataForm.source }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="起始时间(年月):">
            <label>{{ dataForm.startTm }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="截止时间(年月):">
            <label>{{ dataForm.endTm }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="金额(万元):">
            <label>{{ dataForm.money }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="本人排名:">
            <label>{{ dataForm.rank }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="排名总人数:">
            <label>{{ dataForm.total }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否结题 1-是 0-否:">
            <label>{{ dataForm.mark }}</label>
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
      // 获取职称申报系统-人员职称申报科研情况表信息
      getInfo () {
        this.$http.get('/job/scient/info/' + this.id).then(({data: res}) => {
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
