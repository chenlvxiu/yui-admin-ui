<template>
  <div class="mod-jury-edit">
    <el-form :model="dataForm" :rules="dataRule" :label-position="labelPosition" ref="dataForm"
             @keyup.enter.native="dataFormSubmit()" label-width="120px">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="评委会名称：" prop="name">
            <el-input v-model="dataForm.name" placeholder="请输入评委会名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="评委会账号：" :label-position="labelPosition" prop="username" :class="{ 'is-required': true }">
            <el-input v-model="dataForm.username" placeholder="请输入评委会账号" :disabled="id > 0?true:false"></el-input>
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
            <el-input v-model="dataForm.number" placeholder="请输入编号" :disabled="id > 0?true:false"></el-input>
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
            <!--<m-select v-model="dataForm.areaCd" :option="area" placeholder="——请选择所属区县市——"-->
            <!--@change="changeSelect($event,'areaNm','area')"></m-select>-->


            <m-select v-model="dataForm.areaCd" :opt="{items:area,placeholder:'——请选择所属区县市——'}"
                      @change="changeSelect($event,'areaNm','area')"></m-select>
          </el-form-item>
        </el-col>

      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="级别：" prop="lvlCd">
            <!--<m-select v-model="dataForm.lvlCd" :option="level" placeholder="——请选择级别——"-->
            <!--@change="changeSelect($event,'lvlNm','level')"></m-select>-->
            <m-select v-model="dataForm.lvlCd" :opt="{items:level,placeholder:'——请选择级别——'}"
                      @change="changeSelect($event,'lvlNm','level')"></m-select>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="评审系列：" :class="{ 'is-required': true }">
            <m-dyn-row v-for="(item,key) in dataForm.newSeriesRoList" :key="key" :span="8" :item="item"
                       :isAdd="key==dataForm.newSeriesRoList.length-1" :isRequire="false"
                       :isReduce="dataForm.newSeriesRoList.length>1" @addRow="addRow" @reduceRow="reduceRow(item,key)">
              <jury-cascader :data-obj="item" @modify="modifyCascader($event,key)"></jury-cascader>
            </m-dyn-row>


            <!--<m-dyn-row class="m-dyn-row" v-for="(item,key) in dataForm.newSeriesRoList" :key="key" :item="item"-->
            <!--:span="8"-->
            <!--:isRequire="false"-->
            <!--@addRow="addRow" @reduceRow="reduceRow">-->
            <!--<jury-cascader :data-obj="item" @modify="modifyCascader($event,key)"></jury-cascader>-->
            <!--</m-dyn-row>-->

            <!--<m-select v-model="serCdList" :opt="{items:series,multiple:true,placeholder:'——请选择所属评审系列——'}"-->
            <!--@change="changeSerCdList"></m-select>-->
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
  import juryCascader from './jury-cascader'

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
      var validateUsername = (rule, value, callback) => {
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
      }
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
        // serCdList: [],   // 评审系列select选中的cd
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
          newSeriesRoList: [{
            id: '',
            serCd: '',
            serNm: '',
            proCd: '',
            proNm: ''
          }],   // 评审系列选中的{cd,nm}
          oldSeriesRoList: [],
          lvlCd: '',  // 级别
          lvlNm: ''
        },
        area: [],
        series: [],
        level: [],
        dataRule: {
          username: [
            {validator: validateUsername, trigger: 'blur'},
            {min: 1, max: 200, message: '账号长度在 1 到 200 个字符', trigger: 'blur'}
          ],
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
          newSeriesRoList: {
            serCd: [
              {required: true, message: '请选择评审系列', trigger: 'change'}
            ],
          },
          // newSeriesRoList: {
          //   {required: true, message: '请选择评审系列', trigger: 'change'}
          // },
          lvlCd: [
            {required: true, message: '请选择级别', trigger: 'change'}
          ],
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
      this.id = this.$route.params.id;
      this.$refs['dataForm'].resetFields()
      if (this.id) {
        this.getInfo()
        this.dataForm.password = '';
      }
      this.getSelect('30050', 'series') // 获取职称申报系统-专业系列
      this.getSelect('30060.130', 'area')  //区县市列表
      this.getSelect('30060.190', 'level')  //级别列表
    },
    methods: {
      modifyCascader($event, idx) {
        this.dataForm.newSeriesRoList[idx] = Object.assign({}, this.dataForm.newSeriesRoList[idx], $event)
        console.log(8888, $event, idx, this.dataForm.newSeriesRoList)
      },

      addRow(newItem, oldItem) {
        this.dataForm.newSeriesRoList.push(newItem)
        // this.dataForm.newSeriesRoList.push(e)
        // this.$method.DynRow(this.dataForm.newSeriesRoList)
      },
      reduceRow(item, idx) {
        // if (item.id) this.ruleForm.delIdList.push(item.id)
        this.dataForm.newSeriesRoList.splice(idx, 1)
        // this.dataForm.newSeriesRoList.find((itemm, idx) => {
        //   console.log(e, itemm, e === itemm)
        //   if (e == itemm) this.dataForm.newSeriesRoList.splice(idx, 1)
        // })
        // this.$method.DynRow(this.dataForm.newSeriesRoList)
      },

      init(id) {
        this.id = id
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.id) {
            this.getInfo()
          }
        })
      },

      getSelect(prntCd, listName) {
        this.$http.get('/sys/cat/listByPrntCd?prntCd=' + prntCd).then(({data: res}) => {
          if (res.code !== 0) {
            return this.$message.error(res.msg)
          }
          this[listName] = res.data.list
        }).catch(() => {
        })
      },
      changeSelect(cd, nm, listName) {
        let activeItem = this[listName].find(item => {
          return item.cd == cd
        })
        this.dataForm[nm] = activeItem.nm
      },

      // // // 下拉改变select
      // changeSerCdList(cd) {
      //   this.dataForm.newSeriesRoList = []
      //   cd.forEach(item => {
      //     let active = this.series.find(itemm => {
      //       if (item === itemm.cd) return itemm
      //     })
      //     let newSer = {
      //       serCd: active.cd,
      //       serNm: active.nm
      //     }
      //     this.dataForm.newSeriesRoList.push(newSer)
      //   })
      // },

      // 获取职称申报系统-评委会信息表信息
      getInfo() {
        this.$http.get('/job/jury/info/' + this.id).then(({data: res}) => {
          if (res.code !== 0) {
            return this.$message.error(res.msg)
          }
          let {jobJurySeriesDtoList, ...other} = res.data
          this.dataForm.newSeriesRoList = []
          jobJurySeriesDtoList.forEach(item => {
            let {serId, ...other} = item
            this.dataForm.oldSeriesRoList.push({
              id: serId,
              proCd: other.proCd || '',
              proNm: other.proNm || '',
              serCd: other.serCd || '',
              serNm: other.serNm || ''
            })
            this.dataForm.newSeriesRoList.push({...other})
            // this.$method.DynRow(this.dataForm.newSeriesRoList)
          })

          this.dataForm = {
            ...this.dataForm,
            ...other
          }
          // console.log(1111, this.dataForm)
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
            let {checkPass, id, userId, oldSeriesRoList, newSeriesRoList, ...other} = this.dataForm
            let OBJ = {...other}
            let arr = []
            newSeriesRoList.forEach(itemm => {
              let item = Object.assign({}, itemm)
              delete item.isCan
              arr.push(item)
            })

            let flag = false
            for (let i = 0; i < arr.length; i++) {
              let serCd = arr[i].serCd
              let isSerCdAll = false
              if (!arr[i].proCd) isSerCdAll = true
              for (let j = i + 1; j < arr.length; j++) {
                if (isSerCdAll) {
                  if (arr[j].serCd == arr[i].serCd) flag = true
                } else {
                  if (arr[j].serCd == arr[i].serCd && !arr[j].proCd) flag = true
                }
              }
              if (flag) break
            }

            if (flag) {
              this.$message.warning("请不要重复添加评审系列")
              return
            }
            OBJ = Object.assign(OBJ, {
              newSeriesRoList: arr
            })
            if (this.id) {
              OBJ = Object.assign(OBJ, {
                oldSeriesRoList: oldSeriesRoList,
                // newSeriesRoList: arr,
                userId: userId,
                id: id
              })
            }
            let url = this.id ? '/job/jury/upd' : '/job/jury/add'
            // console.log("表单要提交了", url, OBJ)
            let loading = this.$$loading()
            this.$http.post(url, {...OBJ}).then(({data: res}) => {
              if (res && res.code === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    loading.close()
                    this.tabsCloseCurrentHandle()
                  }
                })
              } else {
                loading.close()
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
      },

    },
    components: {
      juryCascader
    }
  }
</script>
<style scoped>
  .m-dyn-row {
    margin-bottom: 10px;
  }

  .m-dyn-row:last-child {
    margin-bottom: 0;
  }
</style>
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
