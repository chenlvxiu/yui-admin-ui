<template>
  <el-dialog :title="!id ? '新增' : '修改'"  class="mod-rsj-edit"
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
          <el-form-item label="评委会账号" prop="username">
            <el-input v-model="dataForm.username" placeholder="评委会账号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="评委会名称" prop="name">
            <el-input v-model="dataForm.name" placeholder="评委会名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="编号" prop="number">
            <el-input v-model="dataForm.number" placeholder="编号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="联系人" prop="contact">
            <el-input v-model="dataForm.contact" placeholder="联系人"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="手机号" prop="mob">
            <el-input v-model="dataForm.mob" placeholder="手机号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="座机" prop="phone">
            <el-input v-model="dataForm.phone" placeholder="座机"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="区县市编码" prop="areaCd">
            <el-input v-model="dataForm.areaCd" placeholder="区县市编码"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="区县市" prop="areaNm">
            <el-input v-model="dataForm.areaNm" placeholder="区县市"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="人社局类型编码" prop="catCd">
            <el-input v-model="dataForm.catCd" placeholder="人社局类型编码"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="人社局类型" prop="catNm">
            <el-input v-model="dataForm.catNm" placeholder="人社局类型"></el-input>
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
          userId: '',
          username: '',
          name: '',
          number: '',
          contact: '',
          mob: '',
          phone: '',
          areaCd: '',
          areaNm: '',
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
            { required: true, message: '评委会账号id不能为空', trigger: 'blur' }
          ],
          username: [
            { required: true, message: '评委会账号不能为空', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '评委会名称不能为空', trigger: 'blur' }
          ],
          number: [
            { required: true, message: '编号不能为空', trigger: 'blur' }
          ],
          contact: [
            { required: true, message: '联系人不能为空', trigger: 'blur' }
          ],
          mob: [
            { required: true, message: '手机号不能为空', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '座机不能为空', trigger: 'blur' }
          ],
          areaCd: [
            { required: true, message: '区县市编码不能为空', trigger: 'blur' }
          ],
          areaNm: [
            { required: true, message: '区县市不能为空', trigger: 'blur' }
          ],
          catCd: [
            { required: true, message: '人社局类型编码不能为空', trigger: 'blur' }
          ],
          catNm: [
            { required: true, message: '人社局类型不能为空', trigger: 'blur' }
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
      // 获取职称申报系统-评委会信息表信息
      getInfo () {
        this.$http.get('/job/rsj/info/' + this.id).then(({data: res}) => {
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
            let url = !this.id ? '/job/rsj/add' : '/job/rsj/upd'
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
