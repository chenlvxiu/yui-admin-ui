<template>
  <div class="page_4">
    <m-title :data-step="6"></m-title>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="m-form m-form-col">
      <div>
        <m-dyn-section v-for="(item,key) in ruleForm.experience" :key="key" :item="item" :title="'工作业绩'+(key+1)"
                       :disabled="isEdit" :isAdd="false" :isReduce="false">
          <el-row>
            <el-col :span="8">
              <el-form-item :label="label.date"
                            :prop="'experience.'+key+'.date'"
                            :rules="rules.experience.date">
                <m-date-picker v-model="item.date" :disabled="isEdit"
                               type="month" :picker-options="$pickOpt"
                               :placeholder="`请选择${label.date}`" @change="chDate($event,key)">>
                </m-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="label.name" :prop="'experience.'+key+'.name'" :rules="rules.experience.name">
                <mm-input v-model="item.name" :placeholder="`请输入${label.name}`"
                          :disabled="isEdit"></mm-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="label.content" :prop="'experience.'+key+'.content'"
                            :rules="rules.experience.content">
                <mm-input v-model="item.content" :placeholder="`请输入${label.content}`"
                          :disabled="isEdit"></mm-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item :label="label.info" :prop="'experience.'+key+'.info'"
                            :rules="rules.experience.info">
                <m-textarea v-model="item.info"
                            :placeholder="`请输入${label.info}`" :disabled="isEdit"></m-textarea>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item :label="label.author" :prop="'experience.'+key+'.author'"
                            :rules="rules.experience.author">
                <m-textarea v-model="item.author"
                            :placeholder="`请输入${label.author}`" :disabled="isEdit"></m-textarea>
              </el-form-item>
            </el-col>
          </el-row>
        </m-dyn-section>
      </div>
      <el-form-item class="m-form-buttons">
        <el-button type="primary" plain class="m-form-buttons-item m-form-buttons-item-plain"
                   @click="submit(5)">上一页
        </el-button>
        <el-button class="m-form-buttons-item m-form-buttons-item-primary" type="primary"
                   @click="submit(7)">下一页
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'

  export default {
    name: "page_6",
    props: ["id"],
    data() {
      return {
        // template: {startTime: '', endTime: '', unit: '', job: '', pos: ''},
        ruleForm: {
          delIdList: [],
          experience: [
            {id: '', date: '', name: '', content: '', info: '', author: '', isCan: {isAdd: true, isReduce: false}}
          ],
        },
        label: {
          date: '日期',
          name: '名称',
          content: '内容摘要',
          info: '出版、登载获奖或学术会议上交流情况',
          author: '合（独）著、译',
        },
        rules: {
          experience: {
            date: [
              {required: true, message: '请选择起止时间', trigger: 'change'},
            ],
            name: [
              {required: true, message: '请输入名称', trigger: 'blur'},
            ],
            content: [
              {required: true, message: '请输入内容摘要', trigger: 'blur'},
            ],
            info: [
              {required: true, message: '请输入出版、登载获奖或学术会议上交流情况', trigger: 'blur'},
            ],
            author: [
              {required: true, message: '请输入合（独）著、译', trigger: 'blur'},
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
      ...mapActions('declare', ['d_getTheoryInfo', 'd_submitTheoryInfo']),
      getTheoryInfo() {
        let query = {
          "w": [{"k": "declareId", "v": this.id, "m": "EQ"}]
        }
        query = this.$method.commonParam(query)
        this.d_getTheoryInfo(query).then(res => {
          let OBJ = Object.assign({}, res)
          let len = OBJ.list.length
          this.ruleForm.experience = []

          if (len === 0) {
            let template = {
              id: '',
              date: '',
              name: '',
              content: '',
              info: '',
              author: '',
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
      this.getTheoryInfo()
    }
  }
</script>

<style lang="scss" scoped>
</style>
