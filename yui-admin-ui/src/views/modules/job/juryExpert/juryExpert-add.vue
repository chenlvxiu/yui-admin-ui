<template>
  <div>
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
             label-width="120px">
      <el-row :gutter="20">
        <el-form-item label="通过人数：" prop="num">
          <label>{{ passNum || 0 }} 人</label>
        </el-form-item>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="评审时间：" prop="date">
            <el-date-picker v-model="dataForm.date" type="daterange" range-separator="至" start-placeholder="开始日期"
                            end-placeholder="结束日期" @change="changeDate">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-form-item label="专家详情："></el-form-item>
      </el-row>
      <el-row :gutter="20">
        <m-dyn-row v-for="(item,key) in dataForm.jobExpertRoList" :key="key" :span="4" :item="item" @addRow="addRow"
                   @reduceRow="reduceRow">
          <el-col :span="10">
            <el-form-item label="专家姓名：" :prop="'jobExpertRoList.'+key+'.name'" :rules="dataRule.jobExpertRoList.name">
              <mm-input v-model="item.name" placeholder="请输入专家姓名" :maxlength="$maxlen.twoHundred"></mm-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="身份证号：" :prop="'jobExpertRoList.'+key+'.card'" :rules="dataRule.jobExpertRoList.card">
              <mm-input v-model="item.card" placeholder="请输入身份证号" :maxlength="$maxlen.eighteen"></mm-input>
            </el-form-item>
          </el-col>
        </m-dyn-row>
      </el-row>

      <el-row :gutter="20" class="footer" style="text-align: center">
        <el-button type="primary" @click="dataFormSubmit('dataForm')">确认</el-button>
      </el-row>
    </el-form>
  </div>
</template>

<script>
  import debounce from 'lodash/debounce'

  export default {
    data() {
      var validateReapeat = (rule, value, callback) => {
        if (!value) callback()
        let num = 0
        this.dataForm.jobExpertRoList.map((itemm, key) => {
          if (itemm.card === value) num++
        })
        num > 1 ? callback(new Error('请勿填写重复的身份证号码')) : callback()
      }
      return {
        module: '/job/expert/',
        exportNm: 13,
        minExportNm: 3,
        template: {name: '', card: ''},
        id: '', //reviewId
        batch: '', //batch批次号
        juryId: '',//juryId

        passNum: null,

        dataForm: {
          reviewId: '',
          date: '', // 时间范围选择
          startTm: '',
          endTm: '',
          jobExpertRoList: []
        },
        dataRule: {
          date: [
            {required: true, message: '请输入评审时间', trigger: 'change'}
          ],
          jobExpertRoList: {
            name: [
              {message: '请输入专家姓名', trigger: 'blur'},
            ],
            card: [
              {message: '请输入身份证号', trigger: 'blur'},
              {
                pattern: /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|31)|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}([0-9]|x|X)$/,
                message: '请填写正确的身份证号码',
                trigger: 'blur'
              },
              {validator: validateReapeat, trigger: 'blur'},
            ],
          }
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
    methods: {
      getExport() {
        this.dataForm.jobExpertRoList = []
        let aList = []
        for (let i = 0; i < this.exportNm; i++) {
          aList.push({...this.template})
        }
        this.dataForm.jobExpertRoList.push(...this.$method.DynRow(aList))
      },
      // 增加一行
      addRow(e) {
        this.dataForm.jobExpertRoList.push(e)
        this.$method.DynRow(this.dataForm.jobExpertRoList, this.minExportNm)
      },
      // 减少一行
      reduceRow(e) {
        if (this.dataForm.jobExpertRoList.length <= this.minExportNm) {
          this.$message.warning(`专家人数不得少于${this.minExportNm}位`)
          return
        }
        let alertText = ''
        if (e.name) alertText += `专家姓名：${e.name}`
        if (e.card) alertText += `身份证号：${e.card}`
        if (alertText) {
          this.$confirm(`是否删除${alertText}?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {// 确认
            this.reduceItemFun(e)
          }).catch(() => {
            // 取消
          })
        } else {
          this.reduceItemFun(e)
        }
      },
      reduceItemFun(e) {
        let idx = this.dataForm.jobExpertRoList.findIndex((itemm) => {
          return e === itemm
        })
        this.dataForm.jobExpertRoList.splice(idx, 1)
        this.$method.DynRow(this.dataForm.jobExpertRoList, this.minExportNm)
      },
      getPassNum() {
        this.$axios.get('/job/declare/countPass', {batch: this.batch, juryId: this.juryId}).then(res => {
          this.passNum = res.number
        }).catch((err) => {
          console.log(err)
        })
      },
      changeDate(e) {
        this.dataForm.startTm = new Date(e[0]).getTime()
        this.dataForm.endTm = new Date(e[1]).getTime()
      },
      dataFormSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (!valid) return false;
          let list = []
          let flag = false
          this.dataForm.jobExpertRoList.forEach(item => {
            let itemm = Object.assign({}, item)
            delete itemm.isCan
            if (item.name && item.card) list.push(itemm)
            if ((!item.name && item.card) || (item.name && !item.card)) flag = true
          })

          if (flag) {
            this.$message.warning(`请填写完整的数据`)
            return false
          }
          if (list.length < this.minExportNm) {
            this.$message.warning(`专家人数不得少于${this.minExportNm}位`)
            return false
          }
          let {startTm, endTm} = this.dataForm
          let obj = {
            reviewId: this.id,
            startTm: startTm,
            endTm: endTm,
            jobExpertRoList: list
          }
          let loading = this.$$loading()
          this.$http.post('/job/expert/addExpert', obj).then(({data: res}) => {
            if (res && res.code === 0) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  loading.close();
                  this.tabsCloseCurrentHandle()
                }
              })
            } else {
              this.$message.error(res.msg)
            }
          }).catch((err) => {
            loading.close();
            this.$message.error(err)
          })
        });
      },
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
    },
    activated() {
      this.getExport()  // 自动生成13个默认专家（空）

      // 通过路由参数pid, 控制列表请求操作
      if (!this.id && !this.batch && this.$route.name === 'juryExpert-add') {//编辑页面第一次进来获取传过来的id，防止点击tab页异常
        this.id = this.$route.params.id;
        this.batch = this.$route.params.batch;
        this.juryId = this.$route.params.juryId;
      }
      if (this.batch && this.juryId) this.getPassNum()  // 获取统计通过的申报人员
    }
  }
</script>
<style lang="scss">
  .m-dyn-row {
    &-icon {
      top: -14px !important;
      left: 10px;
    }
  }
</style>
