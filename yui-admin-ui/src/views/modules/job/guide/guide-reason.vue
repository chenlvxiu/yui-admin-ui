<template>
  <el-dialog title="拒绝原因详情"  class="mod-guide-reason"
    :close-on-click-modal="false" :visible.sync="visible" width="30%">
    <el-form :model="dataForm" ref="dataForm" label-width="120px">
      <el-row :gutter="20">  
        <el-col :span="12">
            <label>{{ dataForm.reason }}</label>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">确定</el-button>
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
      // 获取职称申报系统-评委会申报批次评审表信息
      getInfo () {
        this.$http.get('/job/guide/info/' + this.id).then(({data: res}) => {
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
<style>
   .el-dialog__header {
    background-color: rgba(242, 242, 242, 1);
    color: white;
    text-align: center;
    font-family: "微软雅黑";
    font-size: 20px;
    font-weight:600;
    margin-bottom: 10px;
  }
  
  .el-dialog__footer {
    text-align:center;
  }
</style>
<style>
   .el-dialog__header {
    background-color: rgba(242, 242, 242, 1);
    color: white;
    text-align: center;
    font-family: "微软雅黑";
    font-size: 20px;
    font-weight:600;
    margin-bottom: 10px;
  }
  
  .el-dialog__footer {
    text-align:center;
  }

  .el-dialog {
    position: absolute;
    top :50%;
    left: 50%;
    margin: 0 !important;
    transform: translate(-50%, -50%);
  }

</style>
