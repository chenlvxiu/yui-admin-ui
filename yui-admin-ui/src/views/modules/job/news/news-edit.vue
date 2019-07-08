<template>
  <el-dialog :title="!id ? '新增' : '修改'"  class="mod-news-edit"
    :close-on-click-modal="false" :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="120px">
      <el-row :gutter="20">
        <el-col :span="11">
          <el-form-item label="主键" prop="id">
            <el-input v-model="dataForm.id" placeholder="主键"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="新闻标题" prop="title">
            <el-input v-model="dataForm.title" placeholder="新闻标题"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="来源" prop="source">
            <el-input v-model="dataForm.source" placeholder="来源"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="浏览量" prop="views">
            <el-input v-model="dataForm.views" placeholder="浏览量"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="内容" prop="content">
            <el-input v-model="dataForm.content" placeholder="内容"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="新闻轮播图地址" prop="picUrl">
            <el-input v-model="dataForm.picUrl" placeholder="新闻轮播图地址"></el-input>
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
          title: '',
          source: '',
          views: '',
          content: '',
          picUrl: '',
          catCd: '',
          catNm: '',
          statCd: '',
          statNm: ''
        },
        dataRule: {
          id: [
            { required: true, message: '主键不能为空', trigger: 'blur' }
          ],
          title: [
            { required: true, message: '新闻标题不能为空', trigger: 'blur' }
          ],
          source: [
            { required: true, message: '来源不能为空', trigger: 'blur' }
          ],
          views: [
            { required: true, message: '浏览量不能为空', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '内容不能为空', trigger: 'blur' }
          ],
          picUrl: [
            { required: true, message: '新闻轮播图地址不能为空', trigger: 'blur' }
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
      },
      // 表单提交
      dataFormSubmit: debounce(function () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            let url = !this.id ? '/job/news/add' : '/job/news/upd'
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
