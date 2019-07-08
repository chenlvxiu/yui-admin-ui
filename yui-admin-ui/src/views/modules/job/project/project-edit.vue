<template>
  <el-dialog :title="!id ? '新增' : '修改'"  class="mod-project-edit"
    :close-on-click-modal="false" :visible.sync="visible" width="50%">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="120px">
      <el-row :gutter="20">

        <el-col :span="10">
          <el-form-item label="项目名称" prop="name" :class="{ 'is-required': true }">
            <el-input v-model="dataForm.name" placeholder="项目名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="批次号" prop="batch" :class="{ 'is-required': true }">
            <el-input v-model="dataForm.batch" placeholder="批次号"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" >
        <el-col :span="20">
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
      var validateBatch= (rule, value, callback) => {
        if (!/\S/.test(value)) {
          callback(new Error('批次号不能为空'))
        }
        else if(!/^[a-zA-Z0-9]{1,20}$/.test(value))
        {
          callback(new Error('批次号只能输入数字或字母，且长度不超过20位'))
        }
        else if(value.length <= 200 && value.length >1){
          this.$http.get('/job/project/isBatchExist', {
            params: {
              id: this.id,
              batch: value
            }
          }).then(({data: res}) => {
            if (res.code !== 0) {
              callback(new Error('服务器出错'))
            }
            else if(res.data.result==true)
              callback(new Error('批次号已存在'))
            else {
              callback()
            }
          }).catch(() => {})

        } else {
          callback()
        }
      };
      var validateTimer = (rule, value, callback) => {

        if (!/\S/.test(value)) {
          callback(new Error('时间范围不能为空'))
        } else if(Date.parse(new Date()) >= Date.parse(value[1])){
          callback(new Error('结束时间必须大于今天日期!'))
        }
        else {
          callback()
        }
      };
      return {
        startTimeOptions: {}, //开始日期设置
        endTimeOptions: {}, //结束日期设置
        id: null,
        visible: false,
        dataForm: {
          id: '',
          name: '',
          batch: '',
          startTm: '',
          endTm: '',
          catCd: '',
          catNm: '',
          statCd: '',
          statNm: '',
          daterange: []
        },
        dataRule: {
          name: [
            { required: true, message: '项目名称不能为空', trigger: 'blur' }
          ],
          batch: [
            { validator: validateBatch, trigger: 'blur' }
          ],
          daterange: [
            { validator: validateTimer,  trigger: 'blur' }
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
      // 获取职称申报系统-项目管理表信息
      getInfo () {
        this.$http.get('/job/project/info/' + this.id).then(({data: res}) => {
          if (res.code !== 0) {
            return this.$message.error(res.msg)
          }
          this.dataForm = {
            ...this.dataForm,
            ...res.data
          }
        }).catch(() => {})
        this.dataForm.daterange = [this.dataForm.startTm, this.dataForm.endTm]
      },
      // 表单提交
      dataFormSubmit: debounce(function () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.dataForm.startTm =  Date.parse(this.dataForm.daterange[0])
            this.dataForm.endTm =  Date.parse(this.dataForm.daterange[1])
            let url = !this.id ? '/job/project/add' : '/job/project/upd'
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
      }, 1000, { 'leading': true, 'trailing': false }),
      startTimeChange: function(e) { //设置开始时间
        this.dataForm.startTm = e;
        this.endTimeOptions = {
          disabledDate: date => {
            let startTm = this.dataForm.startTm ? new Date(this.dataForm.startTm).valueOf() : '';
            return date && (date.valueOf() < startTm);
          }
        }
      },
      endTimeChange: function(e) { //设置结束时间
        this.dataForm.endTm = e;
        let endTm = this.dataForm.endTm ? new Date(this.dataForm.endTm).valueOf() - 1 * 24 * 60 * 60 * 1000 : '';
        this.startTimeOptions = {
          disabledDate(date) {
            return date && date.valueOf() > endTm;
          }
        }
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
