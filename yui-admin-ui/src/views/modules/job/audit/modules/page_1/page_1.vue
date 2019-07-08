<template>
  <div class="page_1">
    <div class="page_1-inner">
      <m-title :data-step="1"></m-title>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="m-form">
        <el-form-item :label="label.serCd" prop="serCd">
          <m-select1 :option="optSerCdItem" :disabled="isEdit" v-model="ruleForm.serCd"
                    :placeholder="`请输入${label.serCd}`"></m-select1>
        </el-form-item>

        <el-form-item :label="label.proCd" prop="proCd">

          <m-select1 :option="optProCdItem" :disabled="isEdit" v-model="ruleForm.proCd"
                    :placeholder="`请输入${label.proCd}`"></m-select1>
        </el-form-item>

        <el-form-item :label="label.lvlCd" prop="lvlCd">
          <m-select1 :option="optLvlCdItem" :disabled="isEdit" v-model="ruleForm.lvlCd"
                    :placeholder="`请输入${label.lvlCd}`"></m-select1>
        </el-form-item>

        <el-form-item :label="label.quaCd" prop="quaCd">
          <m-select1 :option="optQuaCdItem" :disabled="isEdit" v-model="ruleForm.quaCd"
                    :placeholder="`请输入${label.quaCd}`"></m-select1>
        </el-form-item>

        <el-form-item :label="label.juryId" prop="juryId">
          <m-select1 :option="optJuryIdItem" :disabled="isEdit" v-model="ruleForm.juryId" :type="'id'"
                    :placeholder="`请输入${label.juryId}`"></m-select1>
        </el-form-item>

        <el-form-item class="m-form-buttons">
          <el-button class="m-form-buttons-item m-form-buttons-item-primary" type="primary"
                     @click="submitForm('ruleForm')">下一页
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import {menuList2} from '@/libs/menuTree'

  const ITEMS = ['optSerCdItem', 'optProCdItem', 'optLvlCdItem', 'optQuaCdItem', 'optJuryIdItem']
  const NNMM = ['serNm', 'proNm', 'lvlNm', 'quaNm', 'juryName']
  const CCDD = ['serCd', 'proCd', 'lvlCd', 'quaCd', 'juryId']
  export default {
    name: 'page_1',
    props: ["id"],
    data() {
      return {
        visible: false,
        ruleForm: {
          serCd: '',
          proCd: '',
          lvlCd: '',
          quaCd: '',
          juryId: '',
          serNm: '',
          proNm: '',
          lvlNm: '',
          quaNm: '',
          juryName: ''
        },
        label: {
          serCd: '申报系列',
          proCd: '申报专业',
          lvlCd: '申报级别',
          quaCd: '申报专业技术资格',
          juryId: '所属区（县）市或主管部门'
        },
        rules: {
          serCd: [
            {required: true, message: `请选择申报系列`, trigger: 'change'},
          ],
          proCd: [
            {required: true, message: '请选择申报专业', trigger: 'change'},
          ],
          lvlCd: [
            {required: true, message: '请选择申报级别', trigger: 'change'}
          ],
          quaCd: [
            {required: true, message: '请选择申报专业技术资格', trigger: 'change'}
          ],
          juryId: [
            {required: true, message: '请选择所属区（县）市或主管部门', trigger: 'change'}
          ]
        },
        optSerCdItem: [],  //申报系列 select option
        optProCdItem: [],//申报专业 select option
        optLvlCdItem: [],//申报级别 select option
        optQuaCdItem: [],//申报专业技术资格 select option
        optJuryIdItem: [],//所属区县市或主管部门 select option
      }
    },
    computed: {
      isEdit() {   // 此页面‘退回修改’也不可编辑
        return true
      }
    },
    methods: {
      ...mapActions('declare', ['listByPrntCd', 'getDeptDeclareList', 'd_getFirstInfo', 'd_submitFirst']),
      // 提交表单
      submitForm(formName) {
        this.$emit('change', 2)
      },

      // 获取下拉数据
      getListByPrntCd(prntCd, arr) {
        this.listByPrntCd({prntCd: prntCd}).then(res => {
          this[arr] = res.list
        }).catch(err => {
          console.log(err)
        })
      },

      // 获取所属区县市或主管部门
      getDepartList(arr) {
        this.$nextTick(() => {
          this.getDeptDeclareList({proCd: this.ruleForm.proCd}).then(res => {
            this[arr] = res.list
          }).catch(err => {
            console.log(err)
          })
        })
      },

      // 如果已经提交过了获取个人申请信息
      getFirstInfo() {
        this.d_getFirstInfo({id: this.id}).then(res => {
          let aaa = Object.assign({}, res)
          Object.keys(aaa).forEach(attr => {
            if (attr == 'id') {
              delete aaa.id
            } else {
              if (aaa[attr] == null) aaa[attr] = ''
              this.ruleForm[attr] = aaa[attr]
              let cd = attr.substring(attr.length - 2, attr.length)
              if ((cd == 'Cd' || cd == 'Id') && aaa[attr]) {
                let idx = CCDD.findIndex(function (item) {
                  return item == attr
                });
                if (cd == 'Cd' && idx < 3) {
                  this.getListByPrntCd(aaa[attr], ITEMS[idx + 1])
                } else if (cd == 'Cd' && idx == 3) {
                  this.getDepartList(ITEMS[idx + 1])
                } else if (cd == 'Id') {
                  this.getDepartList(ITEMS[idx])
                }
              }
            }
          })
          this.clearValidate('ruleForm')
        }).catch(err => {
          console.log(err)
        })
      },
      // 清除表单验证
      clearValidate(formName) {
        this.$nextTick(() => {
          this.$refs[formName].clearValidate();
        })
      },
    },
    activated() {
      this.getFirstInfo()
      this.getListByPrntCd(this.$prntCd.sbxl, 'optSerCdItem')
    }
  }
</script>

<style lang="scss" scoped>
  .page_1 {
    &-inner {
      width: 250px;
      margin: 0 auto;
    }
  }
</style>
