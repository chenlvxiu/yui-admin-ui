<template>
  <div class="page_4">
    <m-title :data-step="4"></m-title>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="m-form m-form-col">
      <div>
        <m-dyn-section v-for="(item,key) in ruleForm.experience" :key="key" :item="item" :title="'工作业绩'+(key+1)"
                       :disabled="isEdit" :isAdd="false" :isReduce="false">
          <el-row>
            <el-col :span="8">
              <el-form-item :label="label.seTime"
                            :prop="'experience.'+key+'.startTm'&&'experience.'+key+'.endTm'"
                            :rules="rules.experience.startTm">
                <m-date-picker-range :start="item.startTm" :end="item.endTm"
                                     :opt="{disabled:isEdit}" @chaStart="changeDate($event,key,'startTm')"
                                     @chaEnd="changeDate($event,key,'endTm')"></m-date-picker-range>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item :label="label.name" :prop="'experience.'+key+'.name'" :rules="rules.experience.name">
                <mm-input v-model="item.name" :placeholder="`请输入${label.name}`"
                          :disabled="isEdit"></mm-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item :label="label.content" :prop="'experience.'+key+'.content'"
                            :rules="rules.experience.content">
                <m-textarea v-model="item.content"
                            :placeholder="`请输入${label.content}`" :disabled="isEdit"></m-textarea>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item :label="label.result" :prop="'experience.'+key+'.result'"
                            :rules="rules.experience.result">
                <m-textarea v-model="item.result"
                            :placeholder="`请输入${label.result}`" :disabled="isEdit"></m-textarea>
              </el-form-item>
            </el-col>
          </el-row>
        </m-dyn-section>
      </div>
      <el-form-item class="m-form-buttons">
        <el-button type="primary" plain class="m-form-buttons-item m-form-buttons-item-plain"
                   @click="submit(3)">上一页
        </el-button>
        <el-button class="m-form-buttons-item m-form-buttons-item-primary" type="primary"
                   @click="submit(5)">下一页
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {mapState, mapMutations, mapActions} from 'vuex'

  export default {
    name: "page_3",
    props: ["id"],
    data() {
      return {
        // template: {startTime: '', endTime: '', unit: '', job: '', pos: ''},
        ruleForm: {
          delIdList: [],
          experience: [
            {id: '', startTm: '', endTm: '', name: '', content: '', result: '', isCan: {isAdd: true, isReduce: false}}
          ],
        },
        label: {
          seTime: '起止时间',
          name: '专业技术工作名称（项目、课题、成果）',
          content: '工作内容、本人起何作用（主持、参加、独立）',
          result: '完成情况及效果（获何奖励效益或专利）',
        },
        rules: {
          experience: {
            startTm: [
              {required: true, message: '请选择起止时间', trigger: 'change'},
            ],
            endTm: [
              {required: true, message: '请选择结束时间', trigger: 'change'},
            ],
            name: [
              {required: true, message: '请输入专业技术工作名称（项目、课题、成功）', trigger: 'blur'},
            ],
            content: [
              {required: true, message: '请输入工作内容、本人起何作用（主持、参加、独立）', trigger: 'blur'},
            ],
            result: [
              {required: true, message: '请输入完成情况及效果（获何奖励效益或专利）', trigger: 'blur'},
            ],
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
      ...mapActions('declare', ['d_getKbefInfo', 'd_submitSkbefInfo']),
      getKbefInfo() {
        let query = {
          "w": [{"k": "declareId", "v": this.id, "m": "EQ"}]
        }
        query = this.$method.commonParam(query)
        this.d_getKbefInfo(query).then(res => {
          let OBJ = Object.assign({}, res)
          let len = OBJ.list.length
          this.ruleForm.experience = []
          if (len === 0) {
            this.toAddOneTemplate()
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
      toAddOneTemplate() {
        let template = {
          id: '',
          startTm: '',
          endTm: '',
          name: '',
          content: '',
          result: '',
          isCan: {isAdd: true, isReduce: false}
        }
        this.ruleForm.experience.push(template)
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
      ,
    },
    created() {
      this.getKbefInfo()
    }
  }
</script>

<style lang="scss" scoped>
</style>
