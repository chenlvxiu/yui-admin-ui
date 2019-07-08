<template>
  <el-dialog title="详情"  class="mod-model-info"
    :close-on-click-modal="false" :visible.sync="visible">
    <el-form :model="dataForm" ref="dataForm" label-width="120px">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="ID:">
            <label>{{ dataForm.id }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="名称:">
            <label>{{ dataForm.name }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="部署id:">
            <label>{{ dataForm.deploymentId }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="更新版本:">
            <label>{{ dataForm.revision }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="创建时间:">
            <label>{{ dataForm.createTime }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="更新时间:">
            <label>{{ dataForm.lastUpdateTime }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="编辑源id:">
            <label>{{ dataForm.editorSourceValueId }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="编辑源额外id:">
            <label>{{ dataForm.editorSourceExtraValueId }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="元信息:">
            <label>{{ dataForm.metaInfo }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="key:">
            <label>{{ dataForm.ke }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="类别:">
            <label>{{ dataForm.category }}</label>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        id: null,
        visible: false,
        dataForm: {}
      }
    },
    methods: {
      init (id) {
        this.id = id
        this.visible = true
        this.$nextTick(() => {
          if (this.id) {
            this.getInfo()
          }
        })
      },
      // 获取系统角色信息
      getInfo () {
        this.$http.get('/act/model/info/' + this.id).then(({data: res}) => {
          if (res.code !== 0) {
            return this.$message.error(res.msg)
          }
          this.dataForm = {
            ...this.dataForm,
            ...res.data
          }
        }).catch(() => {})
      }
    }
  }
</script>
