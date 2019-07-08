<template>
  <el-dialog title="详情"  class="mod-person-info"
    :close-on-click-modal="false" :visible.sync="visible">
    <el-form :model="dataForm" ref="dataForm" label-width="120px">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="主键:">
            <label>{{ dataForm.id }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="用户id:">
            <label>{{ dataForm.userId }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="当前申报id:">
            <label>{{ dataForm.declareId }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="姓名:">
            <label>{{ dataForm.name }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="身份证号:">
            <label>{{ dataForm.idCard }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="出身年月:">
            <label>{{ dataForm.birthTm }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="性别 1-男 0-女:">
            <label>{{ dataForm.sex }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="民族:">
            <label>{{ dataForm.nation }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="出身地:">
            <label>{{ dataForm.birthAddr }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="手机号:">
            <label>{{ dataForm.mob }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="现工作单位:">
            <label>{{ dataForm.workUnit }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="二寸照:">
            <label>{{ dataForm.headerUrl }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="档案存放单位:">
            <label>{{ dataForm.archUnit }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="户口所在地:">
            <label>{{ dataForm.residence }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="最高学历:">
            <label>{{ dataForm.education }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="最高学位:">
            <label>{{ dataForm.degree }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="学校:">
            <label>{{ dataForm.school }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="所学专业:">
            <label>{{ dataForm.studySpec }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="毕业时间:">
            <label>{{ dataForm.gradTm }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="申报批次:">
            <label>{{ dataForm.year }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="申报进度:">
            <label>{{ dataForm.step }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="注册证件类型编码:">
            <label>{{ dataForm.catCd }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="注册证件类型:">
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
      // 获取职称申报系统-人员信息表信息
      getInfo () {
        this.$http.get('/job/person/info/' + this.id).then(({data: res}) => {
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
