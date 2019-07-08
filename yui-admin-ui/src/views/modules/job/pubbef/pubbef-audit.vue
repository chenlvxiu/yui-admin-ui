<template>
  <el-dialog :title="'审核不通过'"  class="mod-pubbef-audit"
    :close-on-click-modal="false" :visible.sync="visible" width="30%" :append-to-body="true">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="120px">
      <el-row :gutter="20">
          <el-form-item prop="reason" class="textarea_form">
	           <el-input
	              prop="reason"
				  type="textarea"
				  :rows="5"
				  placeholder="请输入审核不通过原因"
				  v-model="dataForm.reason">
				</el-input>
		 </el-form-item>
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
        visible: false,
        dataForm: {   
          id: null,     
          reason: '',
          statCd:'30070.170.130'
        },
        dataRule: {
         
          reason: [
            { required: true, message: '审核不通过原因不能为空', trigger: 'blur' }
          ]
          
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.id = id
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()

        })
      },
     
      // 表单提交
      dataFormSubmit: debounce(function () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
         		this.$confirm(`确认审核不通过?`, '提示', {
		        confirmButtonText: '确定',
		        cancelButtonText: '取消',
		        type: 'warning'
		      }).then(() => {
		        this.$http.post('/job/pubbef/audit',{...this.dataForm}).then(({data: res}) => {
		          if (res && res.code === 0) {
		            this.$message({
		              message: '审核成功',
		              type: 'success',
		              duration: 500,
		              onClose: () => {
	                   this.visible = false
                       this.$emit('refreshDataList')
		              }
		            })
		          } 
		          else {
		            this.$message.error(res.msg)
		          }
		        })
		      }).catch(() => {})
          }
        })
      }, 1000, { 'leading': true, 'trailing': false })
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

  .data_input {
    margin-right:60px!important;
  }

  .el-dialog {
    position: absolute;
    top :50%;
    left: 50%;
    margin: 0 !important;
    transform: translate(-50%, -50%);
  }

  .textarea_form .el-form-item__content{
  	margin-left:0px!important;
  }

</style>
