<template>
  <el-dialog :title="!id ? '新增' : '修改'" class="mod-role-edit"
    :close-on-click-modal="false" :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="120px">
      <el-row :gutter="20">
        <el-col :span="20">
          <el-form-item label="编码" prop="cd">
            <el-input v-model="dataForm.cd" placeholder="编码"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="20">
          <el-form-item label="名称" prop="nm">
            <el-input v-model="dataForm.nm" placeholder="名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="20">
          <el-form-item label="备注" prop="rmks">
            <el-input v-model="dataForm.rmks" placeholder="备注"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="14">
          <el-form-item label="资源授权" size="mini">
            <el-tree
              :data="rscoList"
              :props="{ label: 'nm', children: 'children' }"
              node-key="id"
              ref="rscoListTree"
              show-checkbox>
            </el-tree>
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
        rscoList: [],
        dataForm: {
          id: '',
          pid: '',
          cd: '',
          nm: '',
          rmks: '',
          // catCd: '',
          // catNm: '',
          // statCd: '',
          // statNm: '',
          rscoIdList: []
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
        this.rscoList = []
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          this.$refs.rscoListTree.setCheckedKeys([])
          // Promise.all([
          //   this.listRsco()
          // ]).then(() => {
          //   if (this.id) {
          //     this.getInfo()
          //   }
          // })
          this.listRsco()
          if (this.id) {
            this.getInfo()
          }
        })
      },
      listRsco () {
        this.$http.get('/sys/rsco/listPermRtRscoTreeNode', {
          params: {
            subId: this.id
          }
        }).then(({data: res}) => {
          if (res.code !== 0) {
            return this.$message.error(res.msg)
          }
          this.rscoList = res.data.list
          this.$nextTick(() => {
            res.data.checkedKeys.forEach(item => this.$refs.rscoListTree.setChecked(item, true))
          })
        }).catch(() => {})
      },
      // 获取系统角色信息
      getInfo () {
        this.$http.get('/sys/role/info/' + this.id).then(({data: res}) => {
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
            this.dataForm.rscoIdList = [
              ...this.$refs.rscoListTree.getCheckedKeys(),
              ...this.$refs.rscoListTree.getHalfCheckedKeys()
            ]

            let url = !this.id ? '/sys/role/add' : '/sys/role/upd'
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
<style>
.mod-role-edit .el-dialog{
  width: 45%
}
</style>