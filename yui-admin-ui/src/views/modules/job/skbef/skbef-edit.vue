<template>
  <el-dialog :title="!id ? '新增' : '修改'"  class="mod-skbef-edit"
    :close-on-click-modal="false" :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="120px">
      <el-row :gutter="20">
        <el-col :span="11">
          <el-form-item label="主键" prop="id">
            <el-input v-model="dataForm.id" placeholder="主键"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="申报id" prop="declareId">
            <el-input v-model="dataForm.declareId" placeholder="申报id"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="起始时间(年月)" prop="startTm">
            <el-input v-model="dataForm.startTm" placeholder="起始时间(年月)"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="截止时间(年月)" prop="endTm">
            <el-input v-model="dataForm.endTm" placeholder="截止时间(年月)"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="专业技术工作名称" prop="name">
            <el-input v-model="dataForm.name" placeholder="专业技术工作名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="工作内容、本人起何作用" prop="content">
            <el-input v-model="dataForm.content" placeholder="工作内容、本人起何作用"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="完成情况及效果" prop="result">
            <el-input v-model="dataForm.result" placeholder="完成情况及效果"></el-input>
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
          <el-form-item label="状态编码" prop="statCd">
            <el-input v-model="dataForm.statCd" placeholder="状态编码"></el-input>
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
          declareId: '',
          startTm: '',
          endTm: '',
          name: '',
          content: '',
          result: '',
          catCd: '',
          catNm: '',
          statCd: '',
          statNm: ''
        },
        dataRule: {
          id: [
            { required: true, message: '主键不能为空', trigger: 'blur' }
          ],
          declareId: [
            { required: true, message: '申报id不能为空', trigger: 'blur' }
          ],
          startTm: [
            { required: true, message: '起始时间(年月)不能为空', trigger: 'blur' }
          ],
          endTm: [
            { required: true, message: '截止时间(年月)不能为空', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '专业技术工作名称不能为空', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '工作内容、本人起何作用不能为空', trigger: 'blur' }
          ],
          result: [
            { required: true, message: '完成情况及效果不能为空', trigger: 'blur' }
          ],
          catCd: [
            { required: true, message: '类型编码不能为空', trigger: 'blur' }
          ],
          catNm: [
            { required: true, message: '类型不能为空', trigger: 'blur' }
          ],
          statCd: [
            { required: true, message: '状态编码不能为空', trigger: 'blur' }
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
      // 获取职称申报系统-人员职称申报任现职前主要专业技术工作业绩登记表信息
      getInfo () {
        this.$http.get('/job/skbef/info/' + this.id).then(({data: res}) => {
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
            let url = !this.id ? '/job/skbef/add' : '/job/skbef/upd'
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
