<template>
  <div class="mod-jury-edit">
    <el-form :model="dataForm" :rules="dataRule" :label-position="labelPosition" ref="dataForm"
             @keyup.enter.native="dataFormSubmit()" label-width="120px">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="评委会名称：" prop="name">
            <el-input v-model="dataForm.name" placeholder="请输入评委会名称" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="评委会账号：" :label-position="labelPosition" prop="username" :class="{ 'is-required': true }">
            <el-input v-model="dataForm.username" placeholder="请输入评委会账号" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="密码：" prop="password">
            <el-input type="password" autocomplete="off" v-model="dataForm.password"
                      :placeholder="id?'请输入密码,不填则不修改密码':'请输入密码,不填则初始密码为:111111'"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="确认密码：" prop="checkPass">
            <el-input type="password" autocomplete="off" v-model="dataForm.checkPass"
                      :placeholder="id?'请再次输入密码,不填则不修改密码':'请再次输入密码,不填则初始密码为:111111'"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="编号：" prop="number" :class="{ 'is-required': true }">
            <el-input v-model="dataForm.number" placeholder="请输入编号" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="联系人：" prop="contact">
            <el-input v-model="dataForm.contact" placeholder="请输入联系人"></el-input>
          </el-form-item>
        </el-col>

      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="手机号码：" prop="mob" :class="{ 'is-required': true }">
            <el-input v-model="dataForm.mob" placeholder="请输入手机号码"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="固定号码：" prop="phone" :class="{ 'is-required': true }">
            <el-input v-model="dataForm.phone" placeholder="请输入固定号码"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="所属区县市：" prop="areaCd">
            <m-select v-model="dataForm.areaCd" :opt="{items:area,placeholder:'——请选择所属区县市——'}" :disabled="true"></m-select>
          </el-form-item>
        </el-col>

      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="评审系列：" :class="{ 'is-required': true }" prop="newSeriesRoList">
            <m-select v-model="serCdList" :opt="{items:series,multiple:true,placeholder:'——请选择所属区县市——'}"
                      @change="changeSerCdList" :disabled="true"></m-select>
            <!-- 在chang时nm已经计算到了，但在（编辑）获取已有的还需计算serCdList(这个还得看接口的命名) -->
            <!-- opt 包含:items--option  multiple:是否多选（默认false）placeholder：占位符（默认“请选择”） -->
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20" class="footer">
        <el-button @click="tabsCloseCurrentHandle">返回</el-button>
        <el-button type="primary" @click="dataFormSubmit()">提交</el-button>
      </el-row>
    </el-form>
  </div>
</template>

<script>
  import debounce from 'lodash/debounce'
  import {isMobile, isPhone} from '@/utils/validate'

  export default {
    data() {
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

        if (/\S/.test(value) && value.length < 6) {
          callback(new Error('密码长度需在 6 到 64 个字符之间'))
        } else {
          callback()
        }
      }
      /*var validateUsername = (rule, value, callback) => {
        if (!this.id && !/\S/.test(value)) {
          callback(new Error('评委会账号不能为空'))
        }
        else if (!this.id && value) {
          this.$http.get('/sys/user/isUsernameExist', {
            params: {
              username: value
            }
          }).then(({data: res}) => {
            if (res.code !== 0) {
              callback(new Error('服务器出错'))
            }
            else if (res.data.result == true)
              callback(new Error('账号已存在'))
            else {
              callback()
            }
          }).catch(() => {
          })

        } else {
          callback()
        }
      }*/
      var validateNumber = (rule, value, callback) => {
        if (!this.id && !/\S/.test(value)) {
          callback(new Error('编号不能为空'))
        }
        else if (value.length > 200) {
          callback(new Error('编号需长度在 1 到 200 个字符'))
        }
        else if (!this.id && value.length <= 200 && value.length > 1) {
          this.$http.get('/job/jury/isNumberExist', {
            params: {
              number: value
            }
          }).then(({data: res}) => {
            if (res.code !== 0) {
              callback(new Error('服务器出错'))
            }
            else if (res.data.result == true)
              callback(new Error('编号已存在'))
            else {
              callback()
            }
          }).catch(() => {
          })

        } else {
          callback()
        }
      }
      // 验证设置密码
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

        serCdList: [],   // 评审系列select选中的cd
        dataForm: {
          id: '',
          userId: '',   //主管部门账号id
          name: '',
          username: '',
          mob: '',
          password: '',
          checkPass: '', // 确认密码
          number: '',
          contact: '',
          phone: '',
          areaCd: '',
          areaNm: '',
          newSeriesRoList: [],   // 评审系列选中的{cd,nm}
          oldSeriesRoList: []
        },
        area: [],
        series: [],
        dataRule: {
          /*username: [
            {validator: validateUsername, trigger: 'blur'},
            {min: 1, max: 200, message: '账号长度在 1 到 200 个字符', trigger: 'blur'}
          ],*/
          password: [
            {validator: validatePassword, trigger: 'blur'},
            {min: 6, max: 64, message: '密码长度在 6 到 64 个字符', trigger: 'blur'}
          ],
          checkPass: [
            {validator: validatePass, trigger: 'blur'},
            {min: 6, max: 64, message: '密码长度在 6 到 64 个字符', trigger: 'blur'}
          ],
          name: [
            {required: true, message: '评委会名称不能为空', trigger: 'blur'},
            {min: 1, max: 200, message: '评委会名称长度在 1 到 200 个字符', trigger: 'blur'}
          ],
          number: [
            {validator: validateNumber, trigger: 'blur'}
          ],
          contact: [
            {required: true, message: '联系人不能为空', trigger: 'blur'},
            {min: 1, max: 200, message: '联系人长度在 1 到 200 个字符', trigger: 'blur'}
          ],
          mob: [
            {validator: validateMobile, trigger: 'blur'}
          ],
          phone: [
            {validator: validatePhone, trigger: 'blur'}
          ],
          areaCd: [
            {required: true, message: '请选择所属区县市', trigger: 'blur'}
          ],
          newSeriesRoList: [
            {required: true, message: '请选择评审系列', trigger: 'blur'}
          ]
        }
      }
    },
    computed: {
      menuActiveName: {
        get() {
          return this.$store.state.common.menuActiveName
        },
        set(val) {
          this.$store.commit('common/updateMenuActiveName', val)
        }
      },
      mainTabs: {
        get() {
          return this.$store.state.common.mainTabs
        },
        set(val) {
          this.$store.commit('common/updateMainTabs', val)
        }
      },
      mainTabsActiveName: {
        get() {
          return this.$store.state.common.mainTabsActiveName
        },
        set(val) {
          this.$store.commit('common/updateMainTabsActiveName', val)
        }
      },
    },
    activated() {
      // 通过路由参数pid, 控制列表请求操作
      //this.id = this.$route.params.id;
      this.$refs['dataForm'].resetFields()
      this.getInfo()
      this.dataForm.password = '';
      this.getSeries();
      this.getArea();
    },
    methods: {
      init(id) {
        this.id = id
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          this.getInfo()
        })
      },
      // 获取职称申报系统-专业系列
      getSeries() {
        this.$http.get('/sys/cat/listByPrntCd?prntCd=30050').then(({data: res}) => {
          if (res.code !== 0) {return this.$message.error(res.msg)}
          this.series = res.data.list
        }).catch(() => {
        })
      },
      //区县市列表
      getArea() {
        this.area = [];
        this.$http.get('/sys/cat/listByPrntCd?prntCd=30060.130').then(({data: res}) => {
          if (res.code !== 0) {return this.$message.error(res.msg)}
          this.area = res.data.list
        }).catch(() => {
        })
      },

      areaSelectGet(cd) {
        var obj = this.area;
        for (var i = 0; i < obj.length; i++) {
          if (cd === obj[i].cd) {
            return obj[i];
          }
        }
      },

      // // 下拉改变select
      changeSerCdList(cd) {
        console.log(cd)
        this.dataForm.newSeriesRoList = []
        cd.forEach(item => {
          let active = this.series.find(itemm => {
            if (item === itemm.cd) return itemm
          })
          let newSer = {
            serCd: active.cd,
            serNm: active.nm
          }
          this.dataForm.newSeriesRoList.push(newSer)
        })
      },

      // 获取职称申报系统-评委会信息表信息
      getInfo() {
        this.$http.get('/job/jury/infoSelf').then(({data: res}) => {
          if (res.code !== 0) {
            return this.$message.error(res.msg)
          }
          let {jobJurySeriesDtoList, ...other} = res.data
          jobJurySeriesDtoList.forEach(item => {
            let {serId,...other}=item
            this.dataForm.oldSeriesRoList.push({
              id: serId,
              ...other
            })
            this.dataForm.newSeriesRoList.push({...other})
          })

          this.serCdList = []
          this.dataForm.oldSeriesRoList.forEach(item => {
            this.serCdList.push(item.serCd)
          })

          this.dataForm = {
            ...this.dataForm,
            ...other
          }
          this.id = this.dataForm.id;
          console.log(1111, this.dataForm, jobJurySeriesDtoList, serCdList)
        }).catch(() => {
        })
      },
      cancel() {
        this.$router.go(-1);
      },
      // 表单提交
      dataFormSubmit: debounce(function () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            let areaObj = this.areaSelectGet(this.dataForm.areaCd)
            this.dataForm.areaNm = areaObj.nm;
            let {checkPass, id, userId, oldSeriesRoList, ...other} = this.dataForm
            let OBJ = {...other}
            if (this.id) {
              OBJ = Object.assign(OBJ, {
                oldSeriesRoList: oldSeriesRoList,
                userId: userId,
                id: id
              })
            }
            console.log("数据L：", OBJ)
            let url = '/job/jury/upd'
            this.$http.post(url, {...OBJ}).then(({data: res}) => {
              if (res && res.code === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.tabsCloseCurrentHandle()
                    // this.$router.go(-1);
                  }
                })
              } else {
                this.$message.error(res.msg)
              }
            })
          }
        })
      }, 1000, {'leading': true, 'trailing': false}),

      // tabs, 关闭当前
      tabsCloseCurrentHandle() {
        this.removeTabHandle(this.mainTabsActiveName)
      },
      // tabs, 删除tab
      removeTabHandle(tabName) {
        this.mainTabs = this.mainTabs.filter(item => item.name !== tabName)
        if (this.mainTabs.length >= 1) {
          // 当前选中tab被删除
          if (tabName === this.mainTabsActiveName) {
            this.$router.push({name: this.mainTabs[this.mainTabs.length - 1].name}, () => {
              this.mainTabsActiveName = this.$route.name
            })
          }
        } else {
          this.menuActiveName = ''
          this.$router.push({name: 'home'})
        }
      }

    }
  }
</script>
<style>
  .el-form--label-top .el-form-item__label {
    padding: 0 0 0 !important;
  }

  .el-dialog__header {
    background-color: rgba(242, 242, 242, 1);
    color: white;
    text-align: center;
    font-family: "微软雅黑";
    font-size: 20px;
    font-weight: 400;
    margin-bottom: 10px;
  }

  .footer {
    text-align: center;
  }

  .edit-select {
    width: 100% !important;
  }
</style>
