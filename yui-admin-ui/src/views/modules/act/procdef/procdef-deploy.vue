<template>
  <el-dialog title="部署流程资源"  class="mod-procdef-deploy"
    :close-on-click-modal="false" :visible.sync="visible">
    <el-form label-width="120px">
      <el-row :gutter="20">
        <el-col :span="11">
          <el-form-item label="流程资源上传">
            <el-upload
              class="upload-demo"
              :action="actionUrl"
              :on-change="changeHandle"
              :limit="limit"
              :on-exceed="exceedHandle"
              :file-list="fileList">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false, $emit('refreshDataList')">取消</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import { baseUrl } from '@/utils/index'
  export default {
    data () {
      return {
        visible: false,
        actionUrl: '/act/procdef/deploy',
        limit: 1,
        multiple: false,
        fileList: []
      }
    },
    methods: {
      init () {
        this.visible = true
        this.actionUrl = baseUrl() + '/act/procdef/deploy'
        this.fileList = []
      },
      changeHandle (files, fileList) {},
      exceedHandle (files, fileList) {
        this.$message.warning(`当前限制选择 ${this.limit} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
      }
    }
  }
</script>
