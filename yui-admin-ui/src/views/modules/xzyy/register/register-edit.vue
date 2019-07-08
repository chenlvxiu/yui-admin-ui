<template>
  <el-dialog :title="!id ? '新增' : '修改'"  class="mod-register-edit"
    :close-on-click-modal="false" :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="120px">
      <el-row :gutter="20">
        <el-col :span="11">
          <el-form-item label="" prop="id">
            <el-input v-model="dataForm.id" placeholder=""></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="注册姓名" prop="name">
            <el-input v-model="dataForm.name" placeholder="注册姓名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="身份证号" prop="identityCard">
            <el-input v-model="dataForm.identityCard" placeholder="身份证号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="dataForm.phone" placeholder="手机号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="机构地址" prop="orgaAddr">
            <el-input v-model="dataForm.orgaAddr" placeholder="机构地址"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="机构名称" prop="orgaName">
            <el-input v-model="dataForm.orgaName" placeholder="机构名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="证书编号" prop="certNum">
            <el-input v-model="dataForm.certNum" placeholder="证书编号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="证件类型" prop="certType">
            <el-input v-model="dataForm.certType" placeholder="证件类型"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="分类编码" prop="catCd">
            <el-input v-model="dataForm.catCd" placeholder="分类编码"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="分类" prop="catNm">
            <el-input v-model="dataForm.catNm" placeholder="分类"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="注册状态编码" prop="statCd">
            <el-input v-model="dataForm.statCd" placeholder="注册状态编码"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="注册状态" prop="statNm">
            <el-input v-model="dataForm.statNm" placeholder="注册状态"></el-input>
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
          name: '',
          identityCard: '',
          phone: '',
          orgaAddr: '',
          orgaName: '',
          certNum: '',
          certType: '',
          catCd: '',
          catNm: '',
          statCd: '',
          statNm: ''
        },
        dataRule: {
          id: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '注册姓名不能为空', trigger: 'blur' }
          ],
          identityCard: [
            { required: true, message: '身份证号不能为空', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '手机号不能为空', trigger: 'blur' }
          ],
          orgaAddr: [
            { required: true, message: '机构地址不能为空', trigger: 'blur' }
          ],
          orgaName: [
            { required: true, message: '机构名称不能为空', trigger: 'blur' }
          ],
          certNum: [
            { required: true, message: '证书编号不能为空', trigger: 'blur' }
          ],
          certType: [
            { required: true, message: '证件类型不能为空', trigger: 'blur' }
          ],
          catCd: [
            { required: true, message: '分类编码不能为空', trigger: 'blur' }
          ],
          catNm: [
            { required: true, message: '分类不能为空', trigger: 'blur' }
          ],
          statCd: [
            { required: true, message: '注册状态编码不能为空', trigger: 'blur' }
          ],
          statNm: [
            { required: true, message: '注册状态不能为空', trigger: 'blur' }
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
      // 获取注册状态表信息
      getInfo () {
        this.$http.get('/xzyy/register/info/' + this.id).then(({data: res}) => {
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
            let url = !this.id ? '/xzyy/register/add' : '/xzyy/register/upd'
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
