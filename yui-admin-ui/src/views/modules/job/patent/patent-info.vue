<template>
  <el-dialog title="详情"  class="mod-patent-info"
    :close-on-click-modal="false" :visible.sync="visible">
    <el-form :model="dataForm" ref="dataForm" label-width="120px">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="主键:">
            <label>{{ dataForm.id }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="申报id:">
            <label>{{ dataForm.declareId }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="专利名称:">
            <label>{{ dataForm.name }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="类别:">
            <label>{{ dataForm.type }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="专利号:">
            <label>{{ dataForm.number }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="授权年月:">
            <label>{{ dataForm.date }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="授权单位:">
            <label>{{ dataForm.unit }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="作者排名:">
            <label>{{ dataForm.rank }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="排名总人数:">
            <label>{{ dataForm.total }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否转让 1-是 0-否:">
            <label>{{ dataForm.mark }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="佐证材料地址:">
            <label>{{ dataForm.url }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="类型编码:">
            <label>{{ dataForm.catCd }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="类型:">
            <label>{{ dataForm.catNm }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="状态编码:">
            <label>{{ dataForm.statCd }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="状态:">
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
      // 获取职称申报系统-人员职称申报获得专利情况表信息
      getInfo () {
        this.$http.get('/job/patent/info/' + this.id).then(({data: res}) => {
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
