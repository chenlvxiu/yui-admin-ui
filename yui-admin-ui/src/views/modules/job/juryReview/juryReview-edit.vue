<template>
  <el-dialog :title="!id ? '新增' : '修改'"  class="mod-juryReview-edit"
    :close-on-click-modal="false" :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="120px">
      <el-row :gutter="20">
        <el-col :span="11">
          <el-form-item label="主键" prop="id">
            <el-input v-model="dataForm.id" placeholder="主键"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="评委会账号id" prop="userId">
            <el-input v-model="dataForm.userId" placeholder="评委会账号id"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="评委会主表id" prop="juryId">
            <el-input v-model="dataForm.juryId" placeholder="评委会主表id"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="评委会名称" prop="name">
            <el-input v-model="dataForm.name" placeholder="评委会名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="项目名称" prop="project">
            <el-input v-model="dataForm.project" placeholder="项目名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="批次号" prop="year">
            <el-input v-model="dataForm.year" placeholder="批次号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="项目开始时间" prop="startTm">
            <el-input v-model="dataForm.startTm" placeholder="项目开始时间"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="项目结束时间" prop="endTm">
            <el-input v-model="dataForm.endTm" placeholder="项目结束时间"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="复审拒绝原因" prop="reason">
            <el-input v-model="dataForm.reason" placeholder="复审拒绝原因"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="评前开始时间" prop="pqStarTm">
            <el-input v-model="dataForm.pqStarTm" placeholder="评前开始时间"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="评前结束时间" prop="pqEndTm">
            <el-input v-model="dataForm.pqEndTm" placeholder="评前结束时间"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="评后开始时间" prop="phStartTm">
            <el-input v-model="dataForm.phStartTm" placeholder="评后开始时间"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="评后结束时间" prop="phEndTm">
            <el-input v-model="dataForm.phEndTm" placeholder="评后结束时间"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="专家评审开始时间" prop="zjStartTm">
            <el-input v-model="dataForm.zjStartTm" placeholder="专家评审开始时间"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="专家评审结束时间" prop="zjEndTm">
            <el-input v-model="dataForm.zjEndTm" placeholder="专家评审结束时间"></el-input>
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
          <el-form-item label="评委会批次审核状态编码" prop="statCd">
            <el-input v-model="dataForm.statCd" placeholder="评委会批次审核状态编码"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="评委会批次审核状态" prop="statNm">
            <el-input v-model="dataForm.statNm" placeholder="评委会批次审核状态"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="专家评审状态编码" prop="expCd">
            <el-input v-model="dataForm.expCd" placeholder="专家评审状态编码"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="专家评审状态" prop="expNm">
            <el-input v-model="dataForm.expNm" placeholder="专家评审状态"></el-input>
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
          juryId: '',
          name: '',
          project: '',
          year: '',
          startTm: '',
          endTm: '',
          reason: '',
          pqStarTm: '',
          pqEndTm: '',
          phStartTm: '',
          phEndTm: '',
          zjStartTm: '',
          zjEndTm: '',
          catCd: '',
          catNm: '',
          statCd: '',
          statNm: '',
          expCd: '',
          expNm: ''
        },
        dataRule: {
          id: [
            { required: true, message: '主键不能为空', trigger: 'blur' }
          ],
          userId: [
            { required: true, message: '评委会账号id不能为空', trigger: 'blur' }
          ],
          juryId: [
            { required: true, message: '评委会主表id不能为空', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '评委会名称不能为空', trigger: 'blur' }
          ],
          project: [
            { required: true, message: '项目名称不能为空', trigger: 'blur' }
          ],
          year: [
            { required: true, message: '批次号不能为空', trigger: 'blur' }
          ],
          startTm: [
            { required: true, message: '项目开始时间不能为空', trigger: 'blur' }
          ],
          endTm: [
            { required: true, message: '项目结束时间不能为空', trigger: 'blur' }
          ],
          reason: [
            { required: true, message: '复审拒绝原因不能为空', trigger: 'blur' }
          ],
          pqStarTm: [
            { required: true, message: '评前开始时间不能为空', trigger: 'blur' }
          ],
          pqEndTm: [
            { required: true, message: '评前结束时间不能为空', trigger: 'blur' }
          ],
          phStartTm: [
            { required: true, message: '评后开始时间不能为空', trigger: 'blur' }
          ],
          phEndTm: [
            { required: true, message: '评后结束时间不能为空', trigger: 'blur' }
          ],
          zjStartTm: [
            { required: true, message: '专家评审开始时间不能为空', trigger: 'blur' }
          ],
          zjEndTm: [
            { required: true, message: '专家评审结束时间不能为空', trigger: 'blur' }
          ],
          catCd: [
            { required: true, message: '类型编码不能为空', trigger: 'blur' }
          ],
          catNm: [
            { required: true, message: '类型不能为空', trigger: 'blur' }
          ],
          statCd: [
            { required: true, message: '评委会批次审核状态编码不能为空', trigger: 'blur' }
          ],
          statNm: [
            { required: true, message: '评委会批次审核状态不能为空', trigger: 'blur' }
          ],
          expCd: [
            { required: true, message: '专家评审状态编码不能为空', trigger: 'blur' }
          ],
          expNm: [
            { required: true, message: '专家评审状态不能为空', trigger: 'blur' }
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
      },
      // 表单提交
      dataFormSubmit: debounce(function () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            let url = !this.id ? '/job/juryReview/add' : '/job/juryReview/upd'
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
