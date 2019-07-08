<template>
  <el-dialog :title="!id ? '新增' : '修改'"  class="mod-declare-edit"
    :close-on-click-modal="false" :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="120px">
      <el-row :gutter="20">
        <el-col :span="11">
          <el-form-item label="主键" prop="id">
            <el-input v-model="dataForm.id" placeholder="主键"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="所属区县市或主管部门id" prop="deptId">
            <el-input v-model="dataForm.deptId" placeholder="所属区县市或主管部门id"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="评委会id" prop="juryId">
            <el-input v-model="dataForm.juryId" placeholder="评委会id"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="主管部门名" prop="deptName">
            <el-input v-model="dataForm.deptName" placeholder="主管部门名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="评委会名" prop="juryName">
            <el-input v-model="dataForm.juryName" placeholder="评委会名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="二寸照" prop="headerUrl">
            <el-input v-model="dataForm.headerUrl" placeholder="二寸照"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="dataForm.name" placeholder="姓名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="身份证号" prop="idCard">
            <el-input v-model="dataForm.idCard" placeholder="身份证号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="出身年月" prop="birthTm">
            <el-input v-model="dataForm.birthTm" placeholder="出身年月"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="性别 1-男 0-女" prop="sex">
            <el-input v-model="dataForm.sex" placeholder="性别 1-男 0-女"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="联系电话" prop="mob">
            <el-input v-model="dataForm.mob" placeholder="联系电话"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="民族" prop="nation">
            <el-input v-model="dataForm.nation" placeholder="民族"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="户口所在地" prop="residence">
            <el-input v-model="dataForm.residence" placeholder="户口所在地"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="身体健康状况编码" prop="healthCd">
            <el-input v-model="dataForm.healthCd" placeholder="身体健康状况编码"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="身体健康状况" prop="healthNm">
            <el-input v-model="dataForm.healthNm" placeholder="身体健康状况"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="参加工作时间" prop="workTm">
            <el-input v-model="dataForm.workTm" placeholder="参加工作时间"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="现工作单位" prop="workUnit">
            <el-input v-model="dataForm.workUnit" placeholder="现工作单位"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="档案存放单位" prop="archUnit">
            <el-input v-model="dataForm.archUnit" placeholder="档案存放单位"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="从事申报专业工作年限" prop="workYear">
            <el-input v-model="dataForm.workYear" placeholder="从事申报专业工作年限"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="最高学历" prop="education">
            <el-input v-model="dataForm.education" placeholder="最高学历"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="最高学位" prop="degree">
            <el-input v-model="dataForm.degree" placeholder="最高学位"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="毕业时间" prop="gradTm">
            <el-input v-model="dataForm.gradTm" placeholder="毕业时间"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="所学专业" prop="studySpec">
            <el-input v-model="dataForm.studySpec" placeholder="所学专业"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="学校" prop="school">
            <el-input v-model="dataForm.school" placeholder="学校"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="行政职务" prop="duty">
            <el-input v-model="dataForm.duty" placeholder="行政职务"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="现从事专业" prop="workSpec">
            <el-input v-model="dataForm.workSpec" placeholder="现从事专业"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="所在部门" prop="depart">
            <el-input v-model="dataForm.depart" placeholder="所在部门"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="岗位" prop="post">
            <el-input v-model="dataForm.post" placeholder="岗位"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="现任专业技术职务" prop="skillPost">
            <el-input v-model="dataForm.skillPost" placeholder="现任专业技术职务"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="现任专业技术职务开始时间(年)" prop="skillStartYear">
            <el-input v-model="dataForm.skillStartYear" placeholder="现任专业技术职务开始时间(年)"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="现任专业技术职务结束时间(年)" prop="skillEndYear">
            <el-input v-model="dataForm.skillEndYear" placeholder="现任专业技术职务结束时间(年)"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="现从事何种专业技术工作" prop="specSkillWork">
            <el-input v-model="dataForm.specSkillWork" placeholder="现从事何种专业技术工作"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="现专业技术职务任职资格" prop="skillQua">
            <el-input v-model="dataForm.skillQua" placeholder="现专业技术职务任职资格"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="现专业技术职务任职资格取得时间" prop="skillQuaTm">
            <el-input v-model="dataForm.skillQuaTm" placeholder="现专业技术职务任职资格取得时间"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="现（兼）任行政职务" prop="partDuty">
            <el-input v-model="dataForm.partDuty" placeholder="现（兼）任行政职务"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="近3年考核情况" prop="assess">
            <el-input v-model="dataForm.assess" placeholder="近3年考核情况"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="是否破格申报 1-是 0-否" prop="mark">
            <el-input v-model="dataForm.mark" placeholder="是否破格申报 1-是 0-否"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="破格申报说明" prop="descr">
            <el-input v-model="dataForm.descr" placeholder="破格申报说明"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="专业工作能力" prop="workAble">
            <el-input v-model="dataForm.workAble" placeholder="专业工作能力"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="申报年度" prop="year">
            <el-input v-model="dataForm.year" placeholder="申报年度"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="申报系列编码" prop="serCd">
            <el-input v-model="dataForm.serCd" placeholder="申报系列编码"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="申报系列" prop="serNm">
            <el-input v-model="dataForm.serNm" placeholder="申报系列"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="申报专业编码" prop="proCd">
            <el-input v-model="dataForm.proCd" placeholder="申报专业编码"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="申报专业" prop="proNm">
            <el-input v-model="dataForm.proNm" placeholder="申报专业"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="申报级别编码" prop="lvlCd">
            <el-input v-model="dataForm.lvlCd" placeholder="申报级别编码"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="申报级别" prop="lvlNm">
            <el-input v-model="dataForm.lvlNm" placeholder="申报级别"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="专业技术资格编码" prop="quaCd">
            <el-input v-model="dataForm.quaCd" placeholder="专业技术资格编码"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="专业技术资格" prop="quaNm">
            <el-input v-model="dataForm.quaNm" placeholder="专业技术资格"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="审核意见" prop="opinion">
            <el-input v-model="dataForm.opinion" placeholder="审核意见"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="主管部门材料审核状态编码" prop="deptMatCd">
            <el-input v-model="dataForm.deptMatCd" placeholder="主管部门材料审核状态编码"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="主管部门材料审核状态" prop="deptMatNm">
            <el-input v-model="dataForm.deptMatNm" placeholder="主管部门材料审核状态"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="评委会材料审核状态编码" prop="juryMatCd">
            <el-input v-model="dataForm.juryMatCd" placeholder="评委会材料审核状态编码"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="评委会材料审核状态" prop="juryMatNm">
            <el-input v-model="dataForm.juryMatNm" placeholder="评委会材料审核状态"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="人市局材料审核状态编码" prop="rsjMatCd">
            <el-input v-model="dataForm.rsjMatCd" placeholder="人市局材料审核状态编码"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="人市局材料审核状态" prop="rsjMatNm">
            <el-input v-model="dataForm.rsjMatNm" placeholder="人市局材料审核状态"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="主管部门资格审核状态编码" prop="deptQuaCd">
            <el-input v-model="dataForm.deptQuaCd" placeholder="主管部门资格审核状态编码"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="主管部门资格审核状态" prop="deptQuaNm">
            <el-input v-model="dataForm.deptQuaNm" placeholder="主管部门资格审核状态"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="评委会资格审核状态编码" prop="juryQuaCd">
            <el-input v-model="dataForm.juryQuaCd" placeholder="评委会资格审核状态编码"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="评委会资格审核状态" prop="juryQuaNm">
            <el-input v-model="dataForm.juryQuaNm" placeholder="评委会资格审核状态"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="人市局资格审核状态编码" prop="rsjQuaCd">
            <el-input v-model="dataForm.rsjQuaCd" placeholder="人市局资格审核状态编码"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="人市局资格审核状态" prop="rsjQuaNm">
            <el-input v-model="dataForm.rsjQuaNm" placeholder="人市局资格审核状态"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="在职状态编码" prop="workCd">
            <el-input v-model="dataForm.workCd" placeholder="在职状态编码"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="在职状态编码" prop="workNm">
            <el-input v-model="dataForm.workNm" placeholder="在职状态编码"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="类型编码" prop="catCd">
            <el-input v-model="dataForm.catCd" placeholder="类型编码"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="类型" prop="catNm">
            <el-input v-model="dataForm.catNm" placeholder="类型"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="申报状态编码" prop="statCd">
            <el-input v-model="dataForm.statCd" placeholder="申报状态编码"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="状态" prop="statNm">
            <el-input v-model="dataForm.statNm" placeholder="状态"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import debounce from 'lodash/debounce'

  export default {
    data () {
      return {
        id: null,
        visible: false,
        dataForm: {
          id: '',
          deptId: '',
          juryId: '',
          deptName: '',
          juryName: '',
          headerUrl: '',
          name: '',
          idCard: '',
          birthTm: '',
          sex: '',
          mob: '',
          nation: '',
          residence: '',
          healthCd: '',
          healthNm: '',
          workTm: '',
          workUnit: '',
          archUnit: '',
          workYear: '',
          education: '',
          degree: '',
          gradTm: '',
          studySpec: '',
          school: '',
          duty: '',
          workSpec: '',
          depart: '',
          post: '',
          skillPost: '',
          skillStartYear: '',
          skillEndYear: '',
          specSkillWork: '',
          skillQua: '',
          skillQuaTm: '',
          partDuty: '',
          assess: '',
          mark: '',
          descr: '',
          workAble: '',
          year: '',
          serCd: '',
          serNm: '',
          proCd: '',
          proNm: '',
          lvlCd: '',
          lvlNm: '',
          quaCd: '',
          quaNm: '',
          opinion: '',
          deptMatCd: '',
          deptMatNm: '',
          juryMatCd: '',
          juryMatNm: '',
          rsjMatCd: '',
          rsjMatNm: '',
          deptQuaCd: '',
          deptQuaNm: '',
          juryQuaCd: '',
          juryQuaNm: '',
          rsjQuaCd: '',
          rsjQuaNm: '',
          workCd: '',
          workNm: '',
          catCd: '',
          catNm: '',
          statCd: '',
          statNm: ''
        },
        dataRule: {
          id: [
            { required: true, message: '主键不能为空', trigger: 'blur' }
          ],
          deptId: [
            { required: true, message: '所属区县市或主管部门id不能为空', trigger: 'blur' }
          ],
          juryId: [
            { required: true, message: '评委会id不能为空', trigger: 'blur' }
          ],
          deptName: [
            { required: true, message: '主管部门名不能为空', trigger: 'blur' }
          ],
          juryName: [
            { required: true, message: '评委会名不能为空', trigger: 'blur' }
          ],
          headerUrl: [
            { required: true, message: '二寸照不能为空', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '姓名不能为空', trigger: 'blur' }
          ],
          idCard: [
            { required: true, message: '身份证号不能为空', trigger: 'blur' }
          ],
          birthTm: [
            { required: true, message: '出身年月不能为空', trigger: 'blur' }
          ],
          sex: [
            { required: true, message: '性别 1-男 0-女不能为空', trigger: 'blur' }
          ],
          mob: [
            { required: true, message: '联系电话不能为空', trigger: 'blur' }
          ],
          nation: [
            { required: true, message: '民族不能为空', trigger: 'blur' }
          ],
          residence: [
            { required: true, message: '户口所在地不能为空', trigger: 'blur' }
          ],
          healthCd: [
            { required: true, message: '身体健康状况编码不能为空', trigger: 'blur' }
          ],
          healthNm: [
            { required: true, message: '身体健康状况不能为空', trigger: 'blur' }
          ],
          workTm: [
            { required: true, message: '参加工作时间不能为空', trigger: 'blur' }
          ],
          workUnit: [
            { required: true, message: '现工作单位不能为空', trigger: 'blur' }
          ],
          archUnit: [
            { required: true, message: '档案存放单位不能为空', trigger: 'blur' }
          ],
          workYear: [
            { required: true, message: '从事申报专业工作年限不能为空', trigger: 'blur' }
          ],
          education: [
            { required: true, message: '最高学历不能为空', trigger: 'blur' }
          ],
          degree: [
            { required: true, message: '最高学位不能为空', trigger: 'blur' }
          ],
          gradTm: [
            { required: true, message: '毕业时间不能为空', trigger: 'blur' }
          ],
          studySpec: [
            { required: true, message: '所学专业不能为空', trigger: 'blur' }
          ],
          school: [
            { required: true, message: '学校不能为空', trigger: 'blur' }
          ],
          duty: [
            { required: true, message: '行政职务不能为空', trigger: 'blur' }
          ],
          workSpec: [
            { required: true, message: '现从事专业不能为空', trigger: 'blur' }
          ],
          depart: [
            { required: true, message: '所在部门不能为空', trigger: 'blur' }
          ],
          post: [
            { required: true, message: '岗位不能为空', trigger: 'blur' }
          ],
          skillPost: [
            { required: true, message: '现任专业技术职务不能为空', trigger: 'blur' }
          ],
          skillStartYear: [
            { required: true, message: '现任专业技术职务开始时间(年)不能为空', trigger: 'blur' }
          ],
          skillEndYear: [
            { required: true, message: '现任专业技术职务结束时间(年)不能为空', trigger: 'blur' }
          ],
          specSkillWork: [
            { required: true, message: '现从事何种专业技术工作不能为空', trigger: 'blur' }
          ],
          skillQua: [
            { required: true, message: '现专业技术职务任职资格不能为空', trigger: 'blur' }
          ],
          skillQuaTm: [
            { required: true, message: '现专业技术职务任职资格取得时间不能为空', trigger: 'blur' }
          ],
          partDuty: [
            { required: true, message: '现（兼）任行政职务不能为空', trigger: 'blur' }
          ],
          assess: [
            { required: true, message: '近3年考核情况不能为空', trigger: 'blur' }
          ],
          mark: [
            { required: true, message: '是否破格申报 1-是 0-否不能为空', trigger: 'blur' }
          ],
          descr: [
            { required: true, message: '破格申报说明不能为空', trigger: 'blur' }
          ],
          workAble: [
            { required: true, message: '专业工作能力不能为空', trigger: 'blur' }
          ],
          year: [
            { required: true, message: '申报年度不能为空', trigger: 'blur' }
          ],
          serCd: [
            { required: true, message: '申报系列编码不能为空', trigger: 'blur' }
          ],
          serNm: [
            { required: true, message: '申报系列不能为空', trigger: 'blur' }
          ],
          proCd: [
            { required: true, message: '申报专业编码不能为空', trigger: 'blur' }
          ],
          proNm: [
            { required: true, message: '申报专业不能为空', trigger: 'blur' }
          ],
          lvlCd: [
            { required: true, message: '申报级别编码不能为空', trigger: 'blur' }
          ],
          lvlNm: [
            { required: true, message: '申报级别不能为空', trigger: 'blur' }
          ],
          quaCd: [
            { required: true, message: '专业技术资格编码不能为空', trigger: 'blur' }
          ],
          quaNm: [
            { required: true, message: '专业技术资格不能为空', trigger: 'blur' }
          ],
          opinion: [
            { required: true, message: '审核意见不能为空', trigger: 'blur' }
          ],
          deptMatCd: [
            { required: true, message: '主管部门材料审核状态编码不能为空', trigger: 'blur' }
          ],
          deptMatNm: [
            { required: true, message: '主管部门材料审核状态不能为空', trigger: 'blur' }
          ],
          juryMatCd: [
            { required: true, message: '评委会材料审核状态编码不能为空', trigger: 'blur' }
          ],
          juryMatNm: [
            { required: true, message: '评委会材料审核状态不能为空', trigger: 'blur' }
          ],
          rsjMatCd: [
            { required: true, message: '人市局材料审核状态编码不能为空', trigger: 'blur' }
          ],
          rsjMatNm: [
            { required: true, message: '人市局材料审核状态不能为空', trigger: 'blur' }
          ],
          deptQuaCd: [
            { required: true, message: '主管部门资格审核状态编码不能为空', trigger: 'blur' }
          ],
          deptQuaNm: [
            { required: true, message: '主管部门资格审核状态不能为空', trigger: 'blur' }
          ],
          juryQuaCd: [
            { required: true, message: '评委会资格审核状态编码不能为空', trigger: 'blur' }
          ],
          juryQuaNm: [
            { required: true, message: '评委会资格审核状态不能为空', trigger: 'blur' }
          ],
          rsjQuaCd: [
            { required: true, message: '人市局资格审核状态编码不能为空', trigger: 'blur' }
          ],
          rsjQuaNm: [
            { required: true, message: '人市局资格审核状态不能为空', trigger: 'blur' }
          ],
          workCd: [
            { required: true, message: '在职状态编码不能为空', trigger: 'blur' }
          ],
          workNm: [
            { required: true, message: '在职状态编码不能为空', trigger: 'blur' }
          ],
          catCd: [
            { required: true, message: '类型编码不能为空', trigger: 'blur' }
          ],
          catNm: [
            { required: true, message: '类型不能为空', trigger: 'blur' }
          ],
          statCd: [
            { required: true, message: '申报状态编码不能为空', trigger: 'blur' }
          ],
          statNm: [
            { required: true, message: '状态不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.id = id
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
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
      },
      // 表单提交
      dataFormSubmit: debounce(function () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            let url = !this.id ? '/job/declare/add' : '/job/declare/upd'
            this.$http.post(url, {...this.dataForm}).then(({data: res}) => {
              if (res && res.code === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false
                    this.$emit('refreshDataList')
                  }
                })
              } else {
                this.$message.error(res.msg)
              }
            })
          }
        })
      }, 1000, { 'leading': true, 'trailing': false })
    }
  }
</script>
