<template>
  <el-dialog :title="!id ? '新增' : '修改'"  class="mod-news-edit"
    :close-on-click-modal="false" :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="120px">
      <el-row :gutter="20">
        <el-col :span="11">
          <el-form-item label="名称" prop="nm">
            <el-input v-model="dataForm.nm" placeholder="名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="作者" prop="author">
            <el-input v-model="dataForm.author" placeholder="作者"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="备注" prop="rmks">
            <el-input v-model="dataForm.rmks" placeholder="备注"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="22">
          <el-form-item label="图片" prop="imgUrl">
            <imgUpload :files = "dataForm.imgUrl" @modify="imgUploadHandle" :limit="limit"></imgUpload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="22">
          <el-form-item label="内容" prop="cont">
            <wangeditor ref="wangeditor" :getEditConts="getEditConts" :insertImg="insertImgHandle"></wangeditor>
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
  import imgUpload from '@/components/imgUpload'
  import wangeditor from '@/components/wangeditor'
  export default {
    data () {
      return {
        id: null,
        visible: false,
        limit: 3,
        dataForm: {
          nm: '',
          cont: '',
          author: '',
          imgUrl: '',
          rmks: ''
        },
        dataRule: {
          nm: [
            { required: true, message: '名称不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    components: {
      wangeditor, imgUpload
    },
    methods: {
      init (id) {
        this.id = id
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          this.$refs.wangeditor.init()
          if (this.id) {
            this.getInfo()
          }
        })
      },
      // 获取系统新闻信息
      getInfo () {
        this.$http.get('/sys/news/info/' + this.id).then(({data: res}) => {
          if (res.code !== 0) {
            return this.$message.error(res.msg)
          }
          this.dataForm = {
            ...this.dataForm,
            ...res.data
          }
          this.$refs.wangeditor.setEditorContent(res.data.cont)
        }).catch(() => {})
      },
      imgUploadHandle (val) {
        // console.log(val)
        this.$set(this.dataForm, 'imgUrl', val)
      },
      // 获取编辑器内容 格式为html
      getEditConts (value) {
        this.dataForm.cont = value
      },
      // 插入图片操作
      insertImgHandle (res, insertImg, editor) {
        if (res && res.code === 0) {
          insertImg(res.data)
        }
      },
      // 表单提交
      dataFormSubmit: debounce(function () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            let url = !this.id ? '/sys/news/add' : '/sys/news/upd'
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
