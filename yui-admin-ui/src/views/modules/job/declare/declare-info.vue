<template>
  <el-dialog title="详情"  class="mod-declare-info"
    :close-on-click-modal="false" :visible.sync="visible">
    <el-form :model="dataForm" ref="dataForm" label-width="120px">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="主键:">
            <label>{{ dataForm.id }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="所属区县市或主管部门id:">
            <label>{{ dataForm.deptId }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="评委会id:">
            <label>{{ dataForm.juryId }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="主管部门名:">
            <label>{{ dataForm.deptName }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="评委会名:">
            <label>{{ dataForm.juryName }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="二寸照:">
            <label>{{ dataForm.headerUrl }}</label>
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
          <el-form-item label="联系电话:">
            <label>{{ dataForm.mob }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="民族:">
            <label>{{ dataForm.nation }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="户口所在地:">
            <label>{{ dataForm.residence }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="身体健康状况编码:">
            <label>{{ dataForm.healthCd }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="身体健康状况:">
            <label>{{ dataForm.healthNm }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="参加工作时间:">
            <label>{{ dataForm.workTm }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="现工作单位:">
            <label>{{ dataForm.workUnit }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="档案存放单位:">
            <label>{{ dataForm.archUnit }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="从事申报专业工作年限:">
            <label>{{ dataForm.workYear }}</label>
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
          <el-form-item label="毕业时间:">
            <label>{{ dataForm.gradTm }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="所学专业:">
            <label>{{ dataForm.studySpec }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="学校:">
            <label>{{ dataForm.school }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="行政职务:">
            <label>{{ dataForm.duty }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="现从事专业:">
            <label>{{ dataForm.workSpec }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="所在部门:">
            <label>{{ dataForm.depart }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="岗位:">
            <label>{{ dataForm.post }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="现任专业技术职务:">
            <label>{{ dataForm.skillPost }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="现任专业技术职务开始时间(年):">
            <label>{{ dataForm.skillStartYear }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="现任专业技术职务结束时间(年):">
            <label>{{ dataForm.skillEndYear }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="现从事何种专业技术工作:">
            <label>{{ dataForm.specSkillWork }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="现专业技术职务任职资格:">
            <label>{{ dataForm.skillQua }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="现专业技术职务任职资格取得时间:">
            <label>{{ dataForm.skillQuaTm }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="现（兼）任行政职务:">
            <label>{{ dataForm.partDuty }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="近3年考核情况:">
            <label>{{ dataForm.assess }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否破格申报 1-是 0-否:">
            <label>{{ dataForm.mark }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="破格申报说明:">
            <label>{{ dataForm.descr }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="专业工作能力:">
            <label>{{ dataForm.workAble }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="申报年度:">
            <label>{{ dataForm.year }}</label>
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
          <el-form-item label="审核意见:">
            <label>{{ dataForm.opinion }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="主管部门材料审核状态编码:">
            <label>{{ dataForm.deptMatCd }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="主管部门材料审核状态:">
            <label>{{ dataForm.deptMatNm }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="评委会材料审核状态编码:">
            <label>{{ dataForm.juryMatCd }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="评委会材料审核状态:">
            <label>{{ dataForm.juryMatNm }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="人市局材料审核状态编码:">
            <label>{{ dataForm.rsjMatCd }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="人市局材料审核状态:">
            <label>{{ dataForm.rsjMatNm }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="主管部门资格审核状态编码:">
            <label>{{ dataForm.deptQuaCd }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="主管部门资格审核状态:">
            <label>{{ dataForm.deptQuaNm }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="评委会资格审核状态编码:">
            <label>{{ dataForm.juryQuaCd }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="评委会资格审核状态:">
            <label>{{ dataForm.juryQuaNm }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="人市局资格审核状态编码:">
            <label>{{ dataForm.rsjQuaCd }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="人市局资格审核状态:">
            <label>{{ dataForm.rsjQuaNm }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="在职状态编码:">
            <label>{{ dataForm.workCd }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="在职状态编码:">
            <label>{{ dataForm.workNm }}</label>
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
          <el-form-item label="申报状态编码:">
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
      // 获取职称申报系统-人员职称申报主表信息
      getInfo () {
        this.$http.get('/job/declare/info/' + this.id).then(({data: res}) => {
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
