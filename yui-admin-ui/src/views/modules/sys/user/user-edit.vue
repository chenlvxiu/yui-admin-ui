<template>
  <el-dialog
    :title="!id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="120px">
      <el-row :gutter="20">
        <el-col :span="11">
          <el-form-item label="登录帐号" prop="username">
            <el-input v-model="dataForm.username" placeholder="登录帐号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="密码" prop="password" :class="{ 'is-required': !id }">
            <el-input v-model="dataForm.password" type="password" placeholder="密码"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="11">
          <el-form-item label="昵称" prop="nickname">
            <el-input v-model="dataForm.nickname" placeholder="昵称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="确认密码" prop="comfirmPassword" :class="{ 'is-required': !id }">
            <el-input v-model="dataForm.comfirmPassword" type="password" placeholder="确认密码"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="11">
          <el-form-item label="手机号" prop="mob">
            <el-input v-model="dataForm.mob" placeholder="手机号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="dataForm.email" placeholder="邮箱"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="角色" size="mini" prop="roleIdList">
            <el-checkbox-group v-model="roleIdList">
              <el-checkbox v-for="role in roleList" :key="role.id" :label="role.id">{{ role.nm }}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="组织机构" size="mini">
            <el-tree
              :data="orgList"
              :props="{ label: 'nm', children: 'children' }"
              node-key="id"
              ref="orgListTree"
              show-checkbox>
            </el-tree>
          </el-form-item>
        </el-col>
      </el-row> -->
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import debounce from 'lodash/debounce'
  import { isEmail, isMobile } from '@/utils/validate'
  export default {
    data () {
      var validatePassword = (rule, value, callback) => {
        if (!this.id && !/\S/.test(value)) {
          callback(new Error('密码不能为空'))
        } else {
          callback()
        }
      }
      var validateComfirmPassword = (rule, value, callback) => {
        if (!this.id && !/\S/.test(value)) {
          callback(new Error('确认密码不能为空'))
        } else if (this.dataForm.password !== value) {
          callback(new Error('确认密码与密码输入不一致'))
        } else {
          callback()
        }
      }
      var validateEmail = (rule, value, callback) => {
        if (value && !isEmail(value)) {
          callback(new Error('邮箱格式错误'))
        } else {
          callback()
        }
      }
      var validateMobile = (rule, value, callback) => {
        if (value && !isMobile(value)) {
          callback(new Error('手机号格式错误'))
        } else {
          callback()
        }
      }
      return {
        id: null,
        visible: false,
        roleIdList: [],
        roleList: [],
        // orgIdList: [],
        // orgList: [],
        dataForm: {
          username: '',
          password: '',
          comfirmPassword: ''
        },
        dataRule: {
          username: [
            { required: true, message: '用户名不能为空', trigger: 'blur' }
          ],
          password: [
            { validator: validatePassword, trigger: 'blur' }
          ],
          comfirmPassword: [
            { validator: validateComfirmPassword, trigger: 'blur' }
          ],
          email: [
            { validator: validateEmail, trigger: 'blur' }
          ],
          mob: [
            { validator: validateMobile, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.id = id
        this.visible = true
        this.roleIdList = []
        this.roleList = []
        // this.orgIdList = []
        // this.orgList = []
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.id) {
            this.getInfo()
          }
          this.listRole()
          // this.listOrg()
        })
      },
      // 获取用户信息
      getInfo () {
        this.$http.get('/sys/user/info/' + this.id).then(({data: res}) => {
          if (res.code !== 0) {
            return this.$message.error(res.msg)
          }
          this.dataForm = {
            ...this.dataForm,
            ...res.data
          }
        }).catch(() => {})
      },
      // listOrg () {
      //   let pk = this.id ? this.id : 0
      //   this.$http.get('/sys/userOrg/listUserRtOrgTree/' + pk).then(({data: res}) => {
      //     if (res.status !== '200') {
      //       return this.$message.error(res.message)
      //     }
      //     this.orgList = res.data.list
      //     this.orgIdList = res.data.checkedKeys
      //     this.$refs.orgListTree.setCheckedKeys(this.orgIdList)
      //   }).catch(() => {})
      // },
      listRole () {
        this.$http.get('/sys/role/listUserRoleRtRoleNode', {
          params: {
            userId: this.id
          }
        }).then(({data: res}) => {
          if (res.code !== 0) {
            return this.$message.error(res.msg)
          }
          this.roleList = res.data.list
          this.roleIdList = res.data.checkedKeys
        }).catch(() => {})
      },
      // 表单提交
      dataFormSubmit: debounce(function () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            // this.dataForm.orgIdList = [
            //   // ...this.$refs.orgListTree.getHalfCheckedKeys(),
            //   ...this.$refs.orgListTree.getCheckedKeys()
            // ]
            this.dataForm.roleIdList = [
              ...this.roleIdList
            ]
            console.log(this.dataForm)
            this.$http.post(!this.dataForm.id ? '/sys/user/add' : '/sys/user/upd', {...this.dataForm}).then(({data: res}) => {
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
