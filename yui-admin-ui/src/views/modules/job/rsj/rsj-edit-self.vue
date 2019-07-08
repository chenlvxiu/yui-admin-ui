<template>
  <div class="mod-rsj-edit">
    <el-form :model="dataForm" :rules="dataRule" :label-position="labelPosition" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="120px">
      <el-row :gutter="20">
        <el-col :span="11">
          <el-form-item label="人社局名称：" prop="name" :class="{ 'is-required': true }">
            <el-input v-model="dataForm.name" placeholder="请输入人社局名称" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="人社局账号：" :label-position="labelPosition" prop="username" :class="{ 'is-required': true }">
            <el-input v-model="dataForm.username" placeholder="请输入人社局账号" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="密码：" prop="password">
            <el-input type="password" autocomplete="off" v-model="dataForm.password"
                      :placeholder="'请输入密码,不填则不修改密码'"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="确认密码：" prop="checkPass">
            <el-input type="password" autocomplete="off" v-model="dataForm.checkPass"
                      :placeholder="'请再次输入密码,不填则不修改密码'"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="编号：" prop="number" :class="{ 'is-required': true }">
            <el-input v-model="dataForm.number" placeholder="请输入编号" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="联系人：" prop="contact">
            <el-input v-model="dataForm.contact" placeholder="联系人"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="手机号码：" prop="mob">
            <el-input v-model="dataForm.mob" placeholder="手机号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="固定电话：" prop="phone">
            <el-input v-model="dataForm.phone" placeholder="固定电话"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <!--<el-button @click="visible = false">取消</el-button>-->
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </div>
</template>

<script>
  import debounce from 'lodash/debounce'
  import {isMobile, isPhone} from '@/utils/validate'

  export default {
    data () {
      var validatePhone = (rule, value, callback) => {
        if (!/\S/.test(value)) {
          callback(new Error('固定号码不能为空'))
        }
        else if (value && !isPhone(value)) {
          callback(new Error('固定号码格式错误'))
        } else {
          callback()
        }
      }
      var validateMobile = (rule, value, callback) => {
        if (!/\S/.test(value)) {
          callback(new Error('手机号码不能为空'))
        } else if (value && !isMobile(value)) {
          callback(new Error('手机号码格式错误'))
        } else {
          callback()
        }
      }
      var validatePassword = (rule, value, callback) => {

        if (value && /\S/.test(value) && value.length < 6) {
          callback(new Error('密码长度需在 6 到 64 个字符之间'))
        } else {
          callback()
        }
      }
      var validatePass = (rule, value, callback) => {
        if (this.dataForm.password && (this.dataForm.checkPass !== this.dataForm.password)) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        id: null,
        labelPosition: 'top',
        //visible: false,
        dataForm: {
          id: '',
          userId: '',
          username: '',
          name: '',
          number: '',
          contact: '',
          mob: '',
          phone: '',
          areaCd: '',
          areaNm: '',
          catCd: '',
          catNm: '',
          statCd: '',
          statNm: ''
        },
        dataRule: {
          password: [
            {validator: validatePassword, trigger: 'blur'},
            {min: 6, max: 64, message: '密码长度在 6 到 64 个字符', trigger: 'blur'}
          ],
          checkPass: [
            {validator: validatePass, trigger: 'blur'},
            {min: 6, max: 64, message: '密码长度在 6 到 64 个字符', trigger: 'blur'}
          ],
          contact: [
            {min: 1, max: 200, message: '联系人长度在 1 到 200 个字符', trigger: 'blur'}
          ],
          mob: [
            {validator: validateMobile, trigger: 'blur'}
          ],
          phone: [
            {validator: validatePhone, trigger: 'blur'}
          ]
        }
      }
    },
    activated() {
      // 通过路由参数pid, 控制列表请求操作
      //this.id = this.$route.params.id;
      this.$refs['dataForm'].resetFields()
      this.getInfo()
      this.dataForm.password = '';
    },
    methods: {
      init () {
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          this.getInfo()
        })
      },
      // 获取职称申报系统-评委会信息表信息
      getInfo () {
        this.$http.get('/job/rsj/infoSelf').then(({data: res}) => {
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
            let url = '/job/rsj/upd'
            this.$http.post(url, {...this.dataForm}).then(({data: res}) => {
              if (res && res.code === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.$refs['dataForm'].resetFields()
                    this.getInfo()
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
