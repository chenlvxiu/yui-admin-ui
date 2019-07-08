<template>
  <div class="page_3">
    <m-title :data-step="3"></m-title>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="m-form m-form-col">
      <div>
        <m-dyn-section v-for="(item,key) in ruleForm.experience" :key="key" :item="item" :title="'专业工作经历'+(key+1)"
                       :disabled="isEdit" :isAdd="false" :isReduce="false">
          <el-col :span="8">
            <el-form-item :label="label.seTime"
                          :prop="'experience.'+key+'.startTm'&&'experience.'+key+'.endTm'"
                          :rules="rules.experience.startTm">
              <m-date-picker-range :start="item.startTm" :end="item.endTm" :opt="{disabled:isEdit}"
                                   @chaStart="changeDate($event,key,'startTm')"
                                   @chaEnd="changeDate($event,key,'endTm')"></m-date-picker-range>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item :label="label.unit" :prop="'experience.'+key+'.unit'" :rules="rules.experience.unit">
              <mm-input v-model="item.unit" :placeholder="`请输入${label.unit}`"
                        :disabled="isEdit"></mm-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item :label="label.work" :prop="'experience.'+key+'.work'" :rules="rules.experience.work">
              <mm-input v-model="item.work" :placeholder="`请输入${label.work}`"
                        :disabled="isEdit"></mm-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item :label="label.duty" :prop="'experience.'+key+'.duty'" :rules="rules.experience.duty">
              <mm-input v-model="item.duty" :placeholder="`请输入${label.duty}`"
                        :disabled="isEdit"></mm-input>
            </el-form-item>
          </el-col>
        </m-dyn-section>
      </div>
      <el-form-item class="m-form-buttons">
        <el-button type="primary" plain class="m-form-buttons-item m-form-buttons-item-plain"
                   @click="submit(2)">上一页
        </el-button>
        <el-button class="m-form-buttons-item m-form-buttons-item-primary" type="primary"
                   @click="submit(4)">下一页
        </el-button>


      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'

  export default {
    name: "page_3",
    props: ["id"],
    data() {
      return {
        ruleForm: {
          delIdList: [],
          experience: [
            {id: '', startTm: '', endTm: '', unit: '', work: '', duty: '', isCan: {isAdd: true, isReduce: false}}
          ],
        },
        label: {
          seTime: '起止时间',
          unit: '单位',
          work: '从事何专业技术工作',
          duty: '职务'
        },
        rules: {
          experience: {
            startTm: [
              {required: true, message: '请选择起止时间', trigger: ['blur', 'change']},
            ],
            endTm: [
              {required: true, message: '请选择结束时间', trigger: 'change'},
            ],
            unit: [
              {required: true, message: '请输入单位', trigger: 'blur'},
            ],
            work: [
              {required: true, message: '请输入从事何专业技术工作', trigger: 'blur'},
            ],
            duty: [
              {required: true, message: '请输入职务', trigger: 'blur'},
            ]
          },
        }
      }
    },
    computed: {
      isEdit() {
        return true
      }
    },
    methods: {
      ...mapActions('declare', ['d_getWorkInfo', 'd_submitWorkInfo']),
      getWorkInfo() {
        let query = {"w": [{"k": "declareId", "v": this.id, "m": "EQ"}]}
        query = this.$method.commonParam(query)
        this.d_getWorkInfo(query).then(res => {
          let OBJ = Object.assign({}, res)
          let len = OBJ.list.length
          this.ruleForm.experience = []
          if (len === 0) {
            let template = {
              id: '',
              startTm: '',
              endTm: '',
              unit: '',
              work: '',
              duty: '',
              isCan: {isAdd: true, isReduce: false}
            }
            this.ruleForm.experience.push(template)
          } else {
            OBJ.list.forEach((item, key) => {
              delete item.declareId
              item.isCan = {isAdd: len == 1 || key == (len - 1), isReduce: len != 1}
              this.ruleForm.experience.push(item)
            })
          }
          this.clearValidate('ruleForm')
        }).catch(err => {
          console.log(err)
        })
      },

      submit(step) {
        this.$emit('change', step)
      },
      // 清除表单验证
      clearValidate(formName) {
        this.$nextTick(() => {
          this.$refs[formName].clearValidate();
        })
      }
    },
    created() {
      this.getWorkInfo()
    }
  }
</script>

<style lang="scss" scoped>
</style>
