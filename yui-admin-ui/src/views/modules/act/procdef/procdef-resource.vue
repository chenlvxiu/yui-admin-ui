<template>
  <el-dialog title="流程资源查看"  class="mod-procdef-resource"
    :close-on-click-modal="false" :visible.sync="visible">
    <div>
      <iframe  :src="url" height="500" width="100%"></iframe>
    </div>

    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="diagramResourceHandle()">新窗口查看</el-button>
      <el-button @click="visible = false">取消</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        visible: false,
        url: '',
        dataForm: {}
      }
    },
    methods: {
      init () {
        this.visible = true
      },
      diagramResourceHandle () {
        window.open(this.url)
      }
    }
  }
</script>
