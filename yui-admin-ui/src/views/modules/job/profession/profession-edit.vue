<template>
  <el-dialog :title="!id ? '新增' : '修改'"  class="mod-cat-edit"
    :close-on-click-modal="false" :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="120px">
      <el-row :gutter="20">
        <el-col :span="11">
          <el-form-item label="编码" prop="cd">
            <el-input v-model="dataForm.cd" placeholder="编码"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="名称" prop="nm">
            <el-input v-model="dataForm.nm" placeholder="名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="显示排序" prop="seq">
            <el-input-number v-model="dataForm.seq" :min="1" :max="100000" label="显示排序"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="业务排序" prop="busSeq">
            <el-input-number v-model="dataForm.busSeq" :min="1" :max="100000" label="业务排序"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="备注" prop="rmks">
            <el-input v-model="dataForm.rmks" placeholder="备注"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="参数1" prop="arg1">
            <el-input v-model="dataForm.arg1" placeholder="参数1"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="参数2" prop="arg2">
            <el-input v-model="dataForm.arg2" placeholder="参数2"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="参数3" prop="arg3">
            <el-input v-model="dataForm.arg3" placeholder="参数3"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="参数4" prop="arg4">
            <el-input v-model="dataForm.arg4" placeholder="参数4"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="参数5" prop="arg5">
            <el-input v-model="dataForm.arg5" placeholder="参数5"></el-input>
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
          cd: '',
          nm: '',
          pid: '',
          seq: '',
          busSeq: '',
          rmks: '',
          arg1: '',
          arg2: '',
          arg3: '',
          arg4: '',
          arg5: '',
          statCd: '',
          statNm: ''
        },
        dataRule: {
          cd: [
            { required: true, message: '编码不能为空', trigger: 'blur' }
          ],
          nm: [
            { required: true, message: '名称不能为空', trigger: 'blur' }
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
      // 获取系统字典信息
      getInfo () {
        this.$http.get('/sys/cat/info/' + this.id).then(({data: res}) => {
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
            let url = !this.id ? '/sys/cat/add' : '/sys/cat/upd'
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
