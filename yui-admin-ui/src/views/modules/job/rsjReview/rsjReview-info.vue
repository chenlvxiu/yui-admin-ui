<template>
  <el-dialog title="详情"  class="mod-juryReview-info"
    :close-on-click-modal="false" :visible.sync="visible">
    <el-form :model="dataForm" ref="dataForm" label-width="120px">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="主键:">
            <label>{{ dataForm.id }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="评委会账号id:">
            <label>{{ dataForm.userId }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="评委会主表id:">
            <label>{{ dataForm.juryId }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="评委会名称:">
            <label>{{ dataForm.name }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="项目名称:">
            <label>{{ dataForm.project }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="批次号:">
            <label>{{ dataForm.year }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="项目开始时间:">
            <label>{{ dataForm.startTm }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="项目结束时间:">
            <label>{{ dataForm.endTm }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="复审拒绝原因:">
            <label>{{ dataForm.reason }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="评前开始时间:">
            <label>{{ dataForm.pqStarTm }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="评前结束时间:">
            <label>{{ dataForm.pqEndTm }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="评后开始时间:">
            <label>{{ dataForm.phStartTm }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="评后结束时间:">
            <label>{{ dataForm.phEndTm }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="专家评审开始时间:">
            <label>{{ dataForm.zjStartTm }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="专家评审结束时间:">
            <label>{{ dataForm.zjEndTm }}</label>
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
          <el-form-item label="评委会批次审核状态编码:">
            <label>{{ dataForm.statCd }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="评委会批次审核状态:">
            <label>{{ dataForm.statNm }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="专家评审状态编码:">
            <label>{{ dataForm.expCd }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="专家评审状态:">
            <label>{{ dataForm.expNm }}</label>
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
      // 获取职称申报系统-评委会申报批次评审表信息
      getInfo () {
        this.$http.get('/job/juryReview/info/' + this.id).then(({data: res}) => {
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
