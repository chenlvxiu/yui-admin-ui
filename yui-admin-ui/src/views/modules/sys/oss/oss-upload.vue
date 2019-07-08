<template>
  <el-dialog title="上传文件"  class="mod-oss-upload"
    :close-on-click-modal="false" @close="closeHandle" :visible.sync="visible">
    <el-upload
      drag
      :action="url"
      :before-upload="beforeUploadHandle"
      :on-success="successHandle"
      multiple
      :file-list="fileList"
      style="text-align: center;">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">不要上传大文件</div>
    </el-upload>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import { baseUrl } from '@/utils/index'
  export default {
    data () {
      return {
        visible: false,
        url: '',
        num: 0,
        successNum: 0,
        fileList: []
      }
    },
    methods: {
      init () {
        this.visible = true
        this.url = baseUrl() + 'general/oss/upload'
      },
      // 上传之前
      beforeUploadHandle (file) {
        // if (file.type !== 'image/jpg' && file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif') {
        //   this.$message.error('只支持jpg、png、gif格式的图片！')
        //   return false
        // }
        this.num++
      },
      // 上传成功
      successHandle (res, file, fileList) {
        this.fileList = fileList
        this.successNum++
        if (res && res.code === 0) {
          if (this.num === this.successNum) {
            this.$confirm('操作成功, 是否继续操作?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).catch(() => {
              this.visible = false
            })
          }
        } else {
          this.$message.error(res.msg)
        }
      },
      // 弹窗关闭时
      closeHandle () {
        this.fileList = []
        this.$emit('refreshDataList')
      }
    }
  }
</script>
