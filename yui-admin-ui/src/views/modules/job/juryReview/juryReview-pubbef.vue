<template>
  <el-dialog :title="'评前公示'"  class="mod-pubbef"
    :close-on-click-modal="false" :visible.sync="visible" width="30%">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="120px">
      
      <el-row :gutter="20" >
          <el-form-item label="时间范围：" prop="daterange" class="data_input" :class="{ 'is-required': true }">
              <el-date-picker 
                ref="picker"
                v-model="dataForm.daterange"
                type="daterange"
                size="small"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
          </el-form-item>
      </el-row>     
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import debounce from 'lodash/debounce'

  export default {
    data () {
      var validateTimer = (rule, value, callback) => {

        if (!/\S/.test(value)) {
          callback(new Error('评前公示时间范围不能为空'))
        } else if(Date.parse(new Date()) >= Date.parse(value[1])){
          callback(new Error('评前公示结束时间必须大于今天日期!'))
        }
        else {
           callback()
        }
      }

      return {
        visible: false,
        dataForm: {
          id: '',
          daterange: [],
          pqStartTm:'',
          pqEndTm:''
        },
        dataRule: {        
          daterange: [
            { validator: validateTimer,  trigger: 'blur' }
          ]
        }
      }
    },
    components: {

    },
    methods: {
      init (id) {
        this.dataForm.id = id
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.getInfo()
          }
          
        })
      },
       // 获取职称申报系统-评委会申报批次评审表信息
      getInfo () {
        this.$http.get('/job/juryReview/info/' + this.dataForm.id).then(({data: res}) => {
          if (res.code !== 0) {
            return this.$message.error(res.msg)
          }
          this.dataForm = {
            ...this.dataForm,
            ...res.data
          }
          this.dataForm.daterange = [this.dataForm.pqStartTm, this.dataForm.pqEndTm]
        }).catch(() => {})
      },
      // 表单提交
      dataFormSubmit: debounce(function () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.dataForm.pqStartTm =  Date.parse(this.dataForm.daterange[0])
            this.dataForm.pqEndTm =  Date.parse(this.dataForm.daterange[1])
            //开始日期小于等于当前日期
            if(Date.parse(new Date()) >= Date.parse(this.dataForm.daterange[0])) {
                 this.dataForm.statCd = '30070.130.140';
            }

            let url = '/job/juryReview/upd' 
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

</style>