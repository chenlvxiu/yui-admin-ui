<template>
  <el-dialog :title="!id ? '新增' : '修改'"  class="mod-localClinic-edit"
    :close-on-click-modal="false" :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="120px">
      <el-row :gutter="20">
        <el-col :span="11">
          <el-form-item label="" prop="id">
            <el-input v-model="dataForm.id" placeholder=""></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="挂号记录外键" prop="regdId">
            <el-input v-model="dataForm.regdId" placeholder="挂号记录外键"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="患者ID" prop="patientId">
            <el-input v-model="dataForm.patientId" placeholder="患者ID"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="" prop="patientName">
            <el-input v-model="dataForm.patientName" placeholder=""></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="接诊医生ID" prop="doctorId">
            <el-input v-model="dataForm.doctorId" placeholder="接诊医生ID"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="医生姓名" prop="doctorName">
            <el-input v-model="dataForm.doctorName" placeholder="医生姓名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="主诉" prop="complaint">
            <el-input v-model="dataForm.complaint" placeholder="主诉"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="诊断" prop="diagnoseResults">
            <el-input v-model="dataForm.diagnoseResults" placeholder="诊断"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="分类编码" prop="catCd">
            <el-input v-model="dataForm.catCd" placeholder="分类编码"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="分类名称" prop="catNm">
            <el-input v-model="dataForm.catNm" placeholder="分类名称"></el-input>
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
          regdId: '',
          patientId: '',
          patientName: '',
          doctorId: '',
          doctorName: '',
          complaint: '',
          diagnoseResults: '',
          catCd: '',
          catNm: '',
          statCd: '',
          statNm: ''
        },
        dataRule: {
          id: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          regdId: [
            { required: true, message: '挂号记录外键不能为空', trigger: 'blur' }
          ],
          patientId: [
            { required: true, message: '患者ID不能为空', trigger: 'blur' }
          ],
          patientName: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          doctorId: [
            { required: true, message: '接诊医生ID不能为空', trigger: 'blur' }
          ],
          doctorName: [
            { required: true, message: '医生姓名不能为空', trigger: 'blur' }
          ],
          complaint: [
            { required: true, message: '主诉不能为空', trigger: 'blur' }
          ],
          diagnoseResults: [
            { required: true, message: '诊断不能为空', trigger: 'blur' }
          ],
          catCd: [
            { required: true, message: '分类编码不能为空', trigger: 'blur' }
          ],
          catNm: [
            { required: true, message: '分类名称不能为空', trigger: 'blur' }
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
      },
      // 表单提交
      dataFormSubmit: debounce(function () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            let url = !this.id ? '/xzyy/localClinic/add' : '/xzyy/localClinic/upd'
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
