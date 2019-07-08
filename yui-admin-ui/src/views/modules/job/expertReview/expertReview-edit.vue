<template>
  <el-dialog :title="!id ? '新增' : '修改'"  class="mod-expertReview-edit"
    :close-on-click-modal="false" :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="120px">
      <el-row :gutter="20">
        <el-col :span="11">
          <el-form-item label="主键" prop="id">
            <el-input v-model="dataForm.id" placeholder="主键"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="专家账号id" prop="expertId">
            <el-input v-model="dataForm.expertId" placeholder="专家账号id"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="申报id" prop="declareId">
            <el-input v-model="dataForm.declareId" placeholder="申报id"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="用户姓名" prop="userName">
            <el-input v-model="dataForm.userName" placeholder="用户姓名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="专家姓名" prop="expertName">
            <el-input v-model="dataForm.expertName" placeholder="专家姓名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="所属评委会" prop="juryName">
            <el-input v-model="dataForm.juryName" placeholder="所属评委会"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="联系电话" prop="mob">
            <el-input v-model="dataForm.mob" placeholder="联系电话"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="专家身份证" prop="card">
            <el-input v-model="dataForm.card" placeholder="专家身份证"></el-input>
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
          <el-form-item label="评审状态编码" prop="statCd">
            <el-input v-model="dataForm.statCd" placeholder="评审状态编码"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="评审状态" prop="statNm">
            <el-input v-model="dataForm.statNm" placeholder="评审状态"></el-input>
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
          expertId: '',
          declareId: '',
          userName: '',
          expertName: '',
          juryName: '',
          mob: '',
          card: '',
          serCd: '',
          serNm: '',
          proCd: '',
          proNm: '',
          lvlCd: '',
          lvlNm: '',
          quaCd: '',
          quaNm: '',
          catCd: '',
          catNm: '',
          statCd: '',
          statNm: ''
        },
        dataRule: {
          id: [
            { required: true, message: '主键不能为空', trigger: 'blur' }
          ],
          expertId: [
            { required: true, message: '专家账号id不能为空', trigger: 'blur' }
          ],
          declareId: [
            { required: true, message: '申报id不能为空', trigger: 'blur' }
          ],
          userName: [
            { required: true, message: '用户姓名不能为空', trigger: 'blur' }
          ],
          expertName: [
            { required: true, message: '专家姓名不能为空', trigger: 'blur' }
          ],
          juryName: [
            { required: true, message: '所属评委会不能为空', trigger: 'blur' }
          ],
          mob: [
            { required: true, message: '联系电话不能为空', trigger: 'blur' }
          ],
          card: [
            { required: true, message: '专家身份证不能为空', trigger: 'blur' }
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
          catCd: [
            { required: true, message: '类型编码不能为空', trigger: 'blur' }
          ],
          catNm: [
            { required: true, message: '类型不能为空', trigger: 'blur' }
          ],
          statCd: [
            { required: true, message: '评审状态编码不能为空', trigger: 'blur' }
          ],
          statNm: [
            { required: true, message: '评审状态不能为空', trigger: 'blur' }
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
      },
      // 表单提交
      dataFormSubmit: debounce(function () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            let url = !this.id ? '/job/expertReview/add' : '/job/expertReview/upd'
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
