<template>
  <el-dialog :title="!id ? '新增' : '修改'"  class="mod-person-edit"
    :close-on-click-modal="false" :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="120px">
      <el-row :gutter="20">
        <el-col :span="11">
          <el-form-item label="主键" prop="id">
            <el-input v-model="dataForm.id" placeholder="主键"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="用户id" prop="userId">
            <el-input v-model="dataForm.userId" placeholder="用户id"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="当前申报id" prop="declareId">
            <el-input v-model="dataForm.declareId" placeholder="当前申报id"></el-input>
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
          <el-form-item label="民族" prop="nation">
            <el-input v-model="dataForm.nation" placeholder="民族"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="出身地" prop="birthAddr">
            <el-input v-model="dataForm.birthAddr" placeholder="出身地"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="手机号" prop="mob">
            <el-input v-model="dataForm.mob" placeholder="手机号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="现工作单位" prop="workUnit">
            <el-input v-model="dataForm.workUnit" placeholder="现工作单位"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="二寸照" prop="headerUrl">
            <el-input v-model="dataForm.headerUrl" placeholder="二寸照"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="档案存放单位" prop="archUnit">
            <el-input v-model="dataForm.archUnit" placeholder="档案存放单位"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="户口所在地" prop="residence">
            <el-input v-model="dataForm.residence" placeholder="户口所在地"></el-input>
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
          <el-form-item label="学校" prop="school">
            <el-input v-model="dataForm.school" placeholder="学校"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="所学专业" prop="studySpec">
            <el-input v-model="dataForm.studySpec" placeholder="所学专业"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="毕业时间" prop="gradTm">
            <el-input v-model="dataForm.gradTm" placeholder="毕业时间"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="申报批次" prop="year">
            <el-input v-model="dataForm.year" placeholder="申报批次"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="申报进度" prop="step">
            <el-input v-model="dataForm.step" placeholder="申报进度"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="注册证件类型编码" prop="catCd">
            <el-input v-model="dataForm.catCd" placeholder="注册证件类型编码"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="注册证件类型" prop="catNm">
            <el-input v-model="dataForm.catNm" placeholder="注册证件类型"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="申报状态编码" prop="statCd">
            <el-input v-model="dataForm.statCd" placeholder="申报状态编码"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="申报状态" prop="statNm">
            <el-input v-model="dataForm.statNm" placeholder="申报状态"></el-input>
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
          userId: '',
          declareId: '',
          name: '',
          idCard: '',
          birthTm: '',
          sex: '',
          nation: '',
          birthAddr: '',
          mob: '',
          workUnit: '',
          headerUrl: '',
          archUnit: '',
          residence: '',
          education: '',
          degree: '',
          school: '',
          studySpec: '',
          gradTm: '',
          year: '',
          step: '',
          catCd: '',
          catNm: '',
          statCd: '',
          statNm: ''
        },
        dataRule: {
          id: [
            { required: true, message: '主键不能为空', trigger: 'blur' }
          ],
          userId: [
            { required: true, message: '用户id不能为空', trigger: 'blur' }
          ],
          declareId: [
            { required: true, message: '当前申报id不能为空', trigger: 'blur' }
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
          nation: [
            { required: true, message: '民族不能为空', trigger: 'blur' }
          ],
          birthAddr: [
            { required: true, message: '出身地不能为空', trigger: 'blur' }
          ],
          mob: [
            { required: true, message: '手机号不能为空', trigger: 'blur' }
          ],
          workUnit: [
            { required: true, message: '现工作单位不能为空', trigger: 'blur' }
          ],
          headerUrl: [
            { required: true, message: '二寸照不能为空', trigger: 'blur' }
          ],
          archUnit: [
            { required: true, message: '档案存放单位不能为空', trigger: 'blur' }
          ],
          residence: [
            { required: true, message: '户口所在地不能为空', trigger: 'blur' }
          ],
          education: [
            { required: true, message: '最高学历不能为空', trigger: 'blur' }
          ],
          degree: [
            { required: true, message: '最高学位不能为空', trigger: 'blur' }
          ],
          school: [
            { required: true, message: '学校不能为空', trigger: 'blur' }
          ],
          studySpec: [
            { required: true, message: '所学专业不能为空', trigger: 'blur' }
          ],
          gradTm: [
            { required: true, message: '毕业时间不能为空', trigger: 'blur' }
          ],
          year: [
            { required: true, message: '申报批次不能为空', trigger: 'blur' }
          ],
          step: [
            { required: true, message: '申报进度不能为空', trigger: 'blur' }
          ],
          catCd: [
            { required: true, message: '注册证件类型编码不能为空', trigger: 'blur' }
          ],
          catNm: [
            { required: true, message: '注册证件类型不能为空', trigger: 'blur' }
          ],
          statCd: [
            { required: true, message: '申报状态编码不能为空', trigger: 'blur' }
          ],
          statNm: [
            { required: true, message: '申报状态不能为空', trigger: 'blur' }
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
      },
      // 表单提交
      dataFormSubmit: debounce(function () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            let url = !this.id ? '/job/person/add' : '/job/person/upd'
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
