<template>
  <el-dialog :title="!id ? '新增主管部门' : '修改主管部门'"  class="mod-dept-edit"
    :close-on-click-modal="false" :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" :label-position="labelPosition"  ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="120px">
      <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="主管部门名称：" prop="name">
              <el-input v-model="dataForm.name" placeholder="请输入主管部门名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="主管部门账号：" :label-position="labelPosition" prop="username" :class="{ 'is-required': true }">
              <el-input v-model="dataForm.username" placeholder="请输入主管部门账号" :disabled="id"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="密码：" prop="password">
              <el-input v-if="!id" v-model="dataForm.password" placeholder="请输入密码,不填则初始密码为:111111"></el-input>
              <el-input v-else v-model="dataForm.password" placeholder="请输入密码,不填则不修改密码"></el-input>
            </el-form-item>
          </el-col>
     </el-row>
     <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="编号：" prop="number" :class="{ 'is-required': true }">
            <el-input v-model="dataForm.number" placeholder="请输入编号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="联系人：" prop="contact">
            <el-input v-model="dataForm.contact" placeholder="请输入联系人"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="手机号码：" prop="mob" :class="{ 'is-required': true }">
            <el-input v-model="dataForm.mob" placeholder="请输入手机号码"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="固定号码：" prop="phone" :class="{ 'is-required': true }">
            <el-input v-model="dataForm.phone" placeholder="请输入固定号码"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="主管系列：" prop="serCd">
              <el-select v-model="dataForm.serCd" @change="serChange()" placeholder="——请选择主管系列——">
                <el-option
                  v-for="item in series"
                  :key="item.cd"
                  :label="item.nm"
                  :value="item.cd">
                </el-option>
              </el-select>
            </el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="主管专业：" prop="proCd">
              <el-select v-model="dataForm.proCd" placeholder="——请选择主管专业——">
                <el-option
                  v-for="item in profession"
                  :key="item.cd"
                  :label="item.nm"
                  :value="item.cd">
                </el-option>
              </el-select>
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
  import query from '@/utils/query'
  import { isEmail, isMobile ,isPhone} from '@/utils/validate'
  export default {
    data () {
       var validatePhone = (rule, value, callback) => {
        if (value && !isPhone(value)) {
          callback(new Error('固定号码格式错误'))
        } else {
          callback()
        }
       }
       var validateMobile = (rule, value, callback) => {
        if (value && !isMobile(value)) {
          callback(new Error('手机号码格式错误'))
        } else {
          callback()
        }
       }
       var validatePassword = (rule, value, callback) => {
         
        if (/\S/.test(value) && value.length < 6) {
          callback(new Error('密码长度需在 6 到 64 个字符之间'))
        } else {
          callback()
        }
       }
       var validateUsername= (rule, value, callback) => {
        if (!this.id && !/\S/.test(value)) {
          callback(new Error('主管部门账号不能为空'))
        } 
        else if (!this.id && value)  {
          this.$http.get('/sys/user/isUsernameExist', {
		    params: {
		      username: value
		    } 
		  }).then(({data: res}) => {
		    if (res.code !== 0) {
		      callback(new Error('服务器出错'))
		    }
		    else if(res.data.result==true)
		       callback(new Error('账号已存在'))
		    else {
	          callback()
	        }
		  }).catch(() => {})
          
        } else {
          callback()
        }
      }
      var validateNumber= (rule, value, callback) => {
        if (!this.id && !/\S/.test(value)) {
          callback(new Error('编号不能为空'))
        } 
        else if(value.length > 200)
        {
             callback(new Error('编号长度在 1 到 200 个字符'))
        }
        else if(value.length <= 200 && value.length >1){
          this.$http.get('/job/dept/isNumberExist', {
		    params: {
		      number: value
		    } 
		  }).then(({data: res}) => {
		    if (res.code !== 0) {
		      callback(new Error('服务器出错'))
		    }
		    else if(res.data.result==true)
		       callback(new Error('编号已存在'))
		    else {
	          callback()
	        }
		  }).catch(() => {})
          
        } else {
          callback()
        }
      }
      return {
        id: null,
        labelPosition: 'right',
        visible: false,
        dataForm: {
          id: '',
          roleId: '4311839982048256',
          userId: '',
          username: '',
          password: '',
          name: '',
          number: '',
          contact: '',
          mob: '',
          phone: '',
          serCd: '',
          serNm: '',
          proCd: '',
          proNm: '',
          catCd: '',
          catNm: '',
          statCd: '',
          statNm: ''
        },
        profession: [],
        series: [],
        dataRule: {
          username: [
            { validator: validateUsername, trigger: 'blur' },
            { min: 1, max: 200, message: '账号长度在 1 到 200 个字符', trigger: 'blur' }
          ],
          password: [
            { validator: validatePassword, trigger: 'blur' },
            { min: 6, max: 64, message: '密码长度在 6 到 64 个字符', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '主管部门名称不能为空', trigger: 'blur' },
            { min: 1, max: 200, message: '主管部门长度在 1 到 200 个字符', trigger: 'blur' }
          ],
          number: [
            { validator: validateNumber, trigger: 'blur' }
          ],
          contact: [
            { required: true, message: '联系人不能为空', trigger: 'blur' },
            { min: 1, max: 200, message: '联系人长度在 1 到 200 个字符', trigger: 'blur' }
          ],
          mob: [
            { validator: validateMobile, trigger: 'blur' }
          ],
          phone: [
            { validator: validatePhone, trigger: 'blur' }
          ],
          proCd: [
            { required: true, message: '主管专业不能为空', trigger: 'blur' }
          ],
          serCd: [
            { required: true, message: '主管系列不能为空', trigger: 'blur' }
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
        
          this.getSeries();

        })
      },
      // 获取职称申报系统-专业系列
      getSeries () {
        let qryUrl = '/sys/cat/list';
        let qry = query.new();
        query.toO(qry, 'crtTm', 'desc');
        query.toW(qry, 'arg1','职称系列','EQ');
       
        qryUrl += '?query=' + encodeURIComponent(query.toJsonStr(qry))
        this.$http.get(qryUrl).then(({data: res}) => {
          if (res.code !== 0) {
            return this.$message.error(res.msg)
          }
          this.series = {
            ...this.series,
            ...res.data.list
          }
          if(this.dataForm.serCd!=undefined &&　this.dataForm.serCd!=null && this.dataForm.serCd!='')
              this.getProfession();
        }).catch(() => {})
      },
      serChange () {
      	this.dataForm.proCd='';
      	this.getProfession();
      },
      // 获取职称申报系统-专业列表
      getProfession () {

        this.profession = [];
        this.$http.get('/sys/cat/listByPrntCd?prntCd='+this.dataForm.serCd).then(({data: res}) => {
          if (res.code !== 0) {
            return this.$message.error(res.msg)
          }
          this.profession = {
            ...this.profession,
            ...res.data.list
          }
        }).catch(() => {})
      },
      // 获取职称申报系统-主管部门信息表信息
      getInfo () {
        this.$http.get('/job/dept/info/' + this.id).then(({data: res}) => {
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
            let url = !this.id ? '/job/dept/add' : '/job/dept/upd'
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
/*
   .el-form--label-top .el-form-item__label {
    padding: 0 0 0!important;
  }

   .el-dialog__header {
    background-color: rgba(242, 242, 242, 1);
    color: white;
    text-align: center;
    font-family: "微软雅黑";
    font-size: 20px;
    font-weight:400;
    margin-bottom: 10px;
  }
*/
  .el-dialog__footer {
    text-align:center;
  }
 
</style>
