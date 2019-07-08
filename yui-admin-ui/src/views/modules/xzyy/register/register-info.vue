<template>
  <el-dialog title="详情"  class="mod-register-info"
    :close-on-click-modal="false" :visible.sync="visible">
    <el-form :model="dataForm" ref="dataForm" label-width="120px">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label=":">
            <label>{{ dataForm.id }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="注册姓名:">
            <label>{{ dataForm.name }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="身份证号:">
            <label>{{ dataForm.identityCard }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="手机号:">
            <label>{{ dataForm.phone }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="机构地址:">
            <label>{{ dataForm.orgaAddr }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="机构名称:">
            <label>{{ dataForm.orgaName }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="证书编号:">
            <label>{{ dataForm.certNum }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="证件类型:">
            <label>{{ dataForm.certType }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="分类编码:">
            <label>{{ dataForm.catCd }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="分类:">
            <label>{{ dataForm.catNm }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="注册状态编码:">
            <label>{{ dataForm.statCd }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="注册状态:">
            <label>{{ dataForm.statNm }}</label>
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
      }
    }
  }
</script>
