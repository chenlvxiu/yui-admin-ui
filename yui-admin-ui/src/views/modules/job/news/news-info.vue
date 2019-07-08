<template>
  <el-dialog title="详情"  class="mod-news-info"
    :close-on-click-modal="false" :visible.sync="visible">
    <el-form :model="dataForm" ref="dataForm" label-width="120px">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="主键:">
            <label>{{ dataForm.id }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="新闻标题:">
            <label>{{ dataForm.title }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="来源:">
            <label>{{ dataForm.source }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="浏览量:">
            <label>{{ dataForm.views }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="内容:">
            <label>{{ dataForm.content }}</label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="新闻轮播图地址:">
            <label>{{ dataForm.picUrl }}</label>
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
      // 获取职称申报系统-新闻动态表信息
      getInfo () {
        this.$http.get('/job/news/info/' + this.id).then(({data: res}) => {
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
