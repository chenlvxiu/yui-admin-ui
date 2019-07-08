<template>
  <div class="page_2">
    <m-title :data-step="2"></m-title>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="m-form m-form-col">
      <div>
        <div class="m-form-section">
          <el-row>
            <el-col :span="8">
              <el-form-item :label="label.headerUrl" prop="headerUrl">
                <m-upload-pic :opt="{disabled:isEdit}" v-model="ruleForm.headerUrl"
                              :date-value="ruleForm.headerUrl"></m-upload-pic>
                <!--<m-upload-avatar v-model="ruleForm.headerUrl" :date-value="ruleForm.headerUrl"-->
                <!--:disabled="isEdit"></m-upload-avatar>-->
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-row>
                <el-col :span="12">
                  <el-form-item :label="label.name" prop="name">
                    <mm-input v-model="ruleForm.name" :placeholder="`请输入${label.name}`"
                              :disabled="true"></mm-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="label.idCard" prop="idCard">
                    <mm-input v-model="ruleForm.idCard"
                              :placeholder="`请输入${label.idCard}`"
                              :maxlength="this.$maxlen.eighteen"
                              :disabled="isEdit"></mm-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="12">
                  <el-form-item :label="label.birthTm" prop="birthTm">
                    <m-date-picker v-model="ruleForm.birthTm" type="date" :picker-options="this.$pickOpt"
                                   :placeholder="`请选择${label.birthTm}`"
                                   :disabled="true"></m-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="label.sex" prop="sex">
                    <m-select1 :option="[{cd:0,nm:'女'},{cd:1,nm:'男'}]" :disabled="true"
                               v-model.number="ruleForm.sex" :placeholder="`请输入${label.sex}`"></m-select1>
                  </el-form-item>
                </el-col>
              </el-row>


              <el-row>
                <el-col :span="12">
                  <el-form-item :label="label.mob" prop="mob">
                    <mm-input v-model="ruleForm.mob" :placeholder="`请输入${label.mob}`"
                              :maxlength="this.$maxlen.phone" :disabled="true"></mm-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="label.nationCd" prop="nationCd">
                    <m-select1 :option="optNationCdItem" :disabled="isEdit" :placeholder="`请输入${label.nationCd}`"
                               v-model="ruleForm.nationCd"></m-select1>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="label.residence" prop="residence">
                <mm-input v-model="ruleForm.residence"
                          :placeholder="`请输入${label.residence}`"
                          :disabled="isEdit"></mm-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="label.healthCd" prop="healthCd">
                <m-select1 :option="optHealthCdItem" :disabled="isEdit" :placeholder="`请输入${label.healthCd}`"
                           v-model="ruleForm.healthCd"></m-select1>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="label.workTm" prop="workTm">
                <m-date-picker v-model="ruleForm.workTm" :picker-options="this.$pickOpt"
                               :placeholder="`请选择${label.workTm}`" :disabled="isEdit"></m-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="label.workUnit" prop="workUnit">
                <mm-input v-model="ruleForm.workUnit"
                          :placeholder="`请输入${label.workUnit}`"
                          :disabled="isEdit"></mm-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="label.archUnit" prop="archUnit">
                <mm-input v-model="ruleForm.archUnit"
                          :placeholder="`请输入${label.archUnit}`"
                          :disabled="isEdit"></mm-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="label.workYearCd" prop="workYearCd">
                <m-select1 :option="optWorkYearCdItem" :disabled="isEdit" :placeholder="`请输入${label.workYearCd}`"
                           v-model="ruleForm.workYearCd"></m-select1>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="label.educationCd" prop="educationCd">
                <m-select1 :option="optEducationCdItem" :disabled="isEdit" :placeholder="`请输入${label.educationCd}`"
                           v-model="ruleForm.educationCd"></m-select1>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="label.degreeCd" prop="degreeCd">
                <m-select1 :option="optDegreeCdItem" :disabled="isEdit" :placeholder="`请输入${label.degreeCd}`"
                           v-model="ruleForm.degreeCd"></m-select1>
              </el-form-item>
            </el-col>
            <el-col :span="8">

              <el-form-item :label="label.gradTm" prop="gradTm">
                <m-date-picker v-model="ruleForm.gradTm" type="month" :picker-options="this.$pickOpt"
                               :placeholder="`请选择${label.gradTm}`" :disabled="isEdit"></m-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="label.studySpec" prop="studySpec">
                <mm-input v-model="ruleForm.studySpec"
                          :placeholder="`请输入${label.studySpec}`"
                          :disabled="isEdit"></mm-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="label.school" prop="school">
                <mm-input v-model="ruleForm.school" :placeholder="`请输入${label.school}`"
                          :disabled="isEdit"></mm-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="label.workCd" prop="workCd">
                <m-select1 :option="optWorkCdItem" :disabled="isEdit" :placeholder="`请输入${label.workCd}`"
                           v-model="ruleForm.workCd"></m-select1>
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <div class="m-form-section">
          <el-row>
            <el-col :span="8">
              <el-form-item :label="label.depart" prop="depart">
                <mm-input v-model="ruleForm.depart" :placeholder="`请输入${label.depart}`"
                          :disabled="isEdit"></mm-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="label.specSkillWork" prop="specSkillWork">
                <mm-input v-model="ruleForm.specSkillWork"
                          :placeholder="`请输入${label.specSkillWork}`"
                          :disabled="isEdit"></mm-input>
              </el-form-item>
            </el-col>
            <el-col :span="8"></el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item :label="label.skillQua" prop="skillQua">
                <mm-input v-model="ruleForm.skillQua"
                          :placeholder="`请输入${label.skillQua}`"
                          :disabled="isEdit"></mm-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item :label="label.skillQuaTm" prop="skillQuaTm">
                <m-date-picker v-model="ruleForm.skillQuaTm" type="date" :picker-options="this.$pickOpt"
                               :placeholder="`请选择${label.skillQuaTm}`" :disabled="isEdit"></m-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8"></el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item :label="label.skillPost" prop="skillPost">
                <mm-input v-model="ruleForm.skillPost"
                          :placeholder="`请输入${label.skillPost}`"
                          :disabled="isEdit"></mm-input>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <m-dyn-row v-for="(item,key) in ruleForm.jobSkillRoList" :key="key" :span="24" :item="item"
                         :disabled="isEdit" :isAdd="key==ruleForm.jobSkillRoList.length-1"
                         :isReduce="ruleForm.jobSkillRoList.length>1" @addRow="addRow(arguments,'jobSkillRoList')"
                         @reduceRow="reduceRow(item,key,'delSkillIdList','jobSkillRoList')">
                <el-col :span="24">
                  <el-form-item :label="label.nowPositDate"
                                :prop="'jobSkillRoList.'+key+'.startTm'&&'jobSkillRoList.'+key+'.endTm'"
                                :rules="rules.jobSkillRoList.startTm">
                    <m-date-picker-range :opt="{type:'month',disabled:isEdit}" @chaStart="chStartDate($event,key)"
                                         @chaEnd="chEndDate($event,key)"
                                         :start="item.startTm"
                                         :end="item.endTm"></m-date-picker-range>
                  </el-form-item>
                </el-col>
              </m-dyn-row>
            </el-col>
            <el-col :span="8"></el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item :label="label.partDuty" prop="partDuty">
                <mm-input v-model="ruleForm.partDuty" :placeholder="`请输入${label.partDuty}`"
                          :disabled="isEdit"></mm-input>
              </el-form-item>
            </el-col>
            <el-col :span="16"></el-col>
          </el-row>


          <m-dyn-row v-for="(item,key) in ruleForm.jobSubjectRoList" :key="key" :span="8" :item="item"
                     :disabled="isEdit" :isAdd="key==ruleForm.jobSubjectRoList.length-1"
                     :isReduce="ruleForm.jobSubjectRoList.length>1" @addRow="addRow(arguments,'jobSubjectRoList')"
                     @reduceRow="reduceRow(item,key,'delSubjectIdList','jobSubjectRoList')">
            <el-col :span="8">
              <el-form-item :label="label.jobSubjectRoListTeamName" :prop="'jobSubjectRoList.'+key+'.teamName'"
                            :rules="rules.jobSubjectRoList.teamName">
                <mm-input v-model="item.teamName" :placeholder="`请输入${label.jobSubjectRoListTeamName}`"
                          :disabled="isEdit"></mm-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="label.jobSubjectRoListDuty" :prop="'jobSubjectRoList.'+key+'.duty'"
                            :rules="rules.jobSubjectRoList.duty">
                <mm-input v-model="item.duty" :placeholder="`请输入${label.jobSubjectRoListDuty}`"
                          :disabled="isEdit"></mm-input>
              </el-form-item>
            </el-col>
          </m-dyn-row>

        </div>
        <div class="m-form-section">
          <el-row :span="24">
            <el-form-item :label="label.fstAssess" prop="fstAssess">
              <m-textarea v-model="ruleForm.fstAssess" :placeholder="`请输入${label.fstAssess}`"
                          :disabled="isEdit"></m-textarea>
            </el-form-item>
          </el-row>
          <el-row :span="24">
            <el-form-item :label="label.sndAssess" prop="sndAssess">
              <m-textarea v-model="ruleForm.sndAssess" :placeholder="`请输入${label.sndAssess}`"
                          :disabled="isEdit"></m-textarea>
            </el-form-item>
          </el-row>
          <el-row :span="24">
            <el-form-item :label="label.thdAssess" prop="thdAssess">
              <m-textarea v-model="ruleForm.thdAssess" :placeholder="`请输入${label.thdAssess}`"
                          :disabled="isEdit"></m-textarea>
            </el-form-item>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="label.mark" prop="mark">
                <m-select1 :option="[{cd:0,nm:'否'},{cd:1,nm:'是'}]" :disabled="isEdit"
                           v-model.number="ruleForm.mark" :placeholder="`请输入${label.mark}`"></m-select1>
              </el-form-item>
            </el-col>
          </el-row>
          <transition name="el-fade-in-linear">
            <el-row v-show="ruleForm.mark">
              <el-col :span="24">
                <el-form-item :label="label.descr" :prop="ruleForm.descr"
                              :required="ruleForm.mark?true:false">
                  <m-textarea v-model="ruleForm.descr" :placeholder="`请输入${label.descr}`"
                              :disabled="isEdit"></m-textarea>
                </el-form-item>
              </el-col>
            </el-row>
          </transition>
        </div>
      </div>
      <el-form-item class="m-form-buttons">
        <el-button type="primary" plain class="m-form-buttons-item m-form-buttons-item-plain"
                   @click="submit(1)">上一页
        </el-button>
        <el-button class="m-form-buttons-item m-form-buttons-item-primary" type="primary"
                   @click="submit(3)">下一页
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'

  const ITEMS = ['optNationCdItem', 'optHealthCdItem', 'optEducationCdItem', 'optDegreeCdItem', 'optWorkCdItem', 'optWorkYearCdItem']
  const NNMM = ['nationNm', 'healthNm', 'educationNm', 'degreeNm', 'workNm', 'workYearNm']
  const CCDD = ['nationCd', 'healthCd', 'educationCd', 'degreeCd', 'workCd', 'workYearCd']
  export default {
    name: "page_2",
    props: ["id"],
    data() {
      var validatebreakCon = (rule, value, callback) => {
        if (value == '') {
          this.ruleForm.mark ? callback(new Error('请输入符合破格申报情况')) : callback()
        } else {
          callback()
        }
      }
      var validatePass = (rule, value, callback) => {
        // console.log("开始时间：", this.ruleForm.skillStartYear, "结束时间：", this.ruleForm.skillEndYear)
        if (this.ruleForm.skillStartYear == '') {
          callback(new Error('请输入开始时间'));
        } else if (this.ruleForm.skillEndYear == '') {
          callback(new Error('请输入结束时间'));
        } else {
          callback();
        }
      }
      return {
        // delIdList: [],
        delSubjectIdList: [],
        delSkillIdList: [],
        ruleForm: {
          headerUrl: '',
          name: '',
          idCard: '',
          birthTm: '',
          sex: '',
          mob: '',
          nationCd: '',
          nationNm: '',
          residence: '',
          healthCd: '',
          healthNm: '',
          workTm: '',
          workUnit: '',
          archUnit: '',
          workYearCd: '',
          workYearNm: '',
          educationCd: '',
          educationNm: '',
          degreeCd: '',
          degreeNm: '',
          gradTm: '',
          studySpec: '',
          school: '',
          workCd: '',
          workNm: '',
          // duty: '',
          // workSpec: '',
          depart: '',
          // post: '',


          skillPost: '',
          jobSkillRoList: [
            {id: '', startTm: '', endTm: '', isCan: {isAdd: true, isReduce: false}}
          ],


          specSkillWork: '',
          skillQua: '',
          skillQuaTm: '',
          partDuty: '',
          jobSubjectRoList: [
            {id: '', teamName: '', duty: '', isCan: {isAdd: true, isReduce: false}}
          ],


          fstAssess: '',
          sndAssess: '',
          thdAssess: '',

          mark: '1',
          descr: ''
        },
        label: {
          headerUrl: '二寸照',
          name: '姓名',
          idCard: '身份证号码',
          birthTm: '出生年月',
          sex: '性别',
          mob: '联系电话',
          nationCd: '民族',
          residence: '户口所在地',
          healthCd: '身体状态',
          workTm: '参加工作时间',
          workUnit: '现工作单位（社保缴纳单位）',
          archUnit: '档案存放单位',
          workYearCd: '从事申报专业工作年限',
          educationCd: '最高学历',
          degreeCd: '最高学位',
          gradTm: '毕（肆、结）业时间',
          studySpec: '所学专业',
          school: '学校',
          workCd: '在职状态',
          // duty: '行政职务',
          // workSpec: '现从事专业',
          depart: '所在部门',
          // post: '所在部门岗位',

          skillPost: '现任专业技术职务',
          nowPositDate: '现任专业技术任职时间',

          specSkillWork: '现从事专业技术工作',
          skillQua: '现专业技术职务任职资格',
          skillQuaTm: '现专业技术职务任职资格取得时间',
          partDuty: '现(兼)任行政职务',
          jobSubjectRoListTeamName: '参加的学术团体',
          jobSubjectRoListDuty: '学术团体职务',
          // assess: '近3年考核情况',
          fstAssess: '第一年考核情况',
          sndAssess: '第二年考核情况',
          thdAssess: '第三年考核情况',

          mark: '是否破格申报',
          descr: '符合破格申报情况',
        },
        rules: {
          headerUrl: [
            {required: true, message: '请上传二寸照', trigger: 'blur'}
          ],
          name: [
            {required: true, message: '请输入姓名', trigger: 'blur'},
            {pattern: /^[\u4E00-\u9FA5.]+$/, message: '只允许输入汉字和少数名族"."', trigger: 'blur'},
          ],
          idCard: [
            {required: true, message: '请输入身份证号码', trigger: 'blur'},
            {pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '请输入正确的身份证号码', trigger: 'blur'},
          ],
          birthTm: [
            {required: true, message: '请选择出生年月', trigger: 'blur'}
          ],
          sex: [
            {required: true, message: '请选择性别', trigger: 'change'},
          ],
          mob: [
            {required: true, message: '请输入联系电话', trigger: 'blur'},
            {pattern: /^1[34578]\d{9}$/, message: '请填写正确的联系电话', trigger: 'blur'}
          ],
          nationCd: [
            {required: true, message: '请选择民族', trigger: 'change'}
          ],
          residence: [
            {required: true, message: '请输入户口所在地', trigger: 'blur'}
          ],
          healthCd: [
            {required: true, message: '请选择身体状态', trigger: 'change'}
          ],
          workTm: [
            {required: true, message: '请选择参加工作时间', trigger: 'change'}
          ],
          workUnit: [
            {required: true, message: '请输入现工作单位（社保缴纳单位）', trigger: 'blur'}
          ],
          archUnit: [
            {required: true, message: '请输入档案存放单位', trigger: 'blur'}
          ],
          workYearCd: [
            {required: true, message: '请选择从事申报专业工作年限', trigger: 'change'}
          ],
          educationCd: [
            {required: true, message: '请选择最高学历', trigger: 'change'}
          ],
          degreeCd: [
            {required: true, message: '请选择最高学位', trigger: 'change'}
          ],
          gradTm: [
            {required: true, message: '请选择毕（肆、结）业时间', trigger: 'change'}
          ],
          studySpec: [
            {required: true, message: '请输入所学专业', trigger: 'blur'}
          ],
          school: [
            {required: true, message: '请输入学校', trigger: 'blur'}
          ],
          workNm: [
            {required: true, message: '请选择在职状态', trigger: 'change'}
          ],
          depart: [
            {required: true, message: '请输入所在部门', trigger: 'blur'}
          ],
          skillPost: [
            {required: true, message: '请输入现任专业技术职务', trigger: 'blur'}
          ],
          jobSkillRoList: {
            startTm: [
              {required: true, message: '请选择现任专业技术任职时间', trigger: 'change'}
            ]
          },

          specSkillWork: [
            {required: true, message: '请输入现从事专业技术工作', trigger: 'blur'},
          ],
          skillQua: [
            {required: true, message: '请输入现专业技术职务任职资格', trigger: 'blur'},
          ],
          skillQuaTm: [
            {required: true, message: '请选择现专业技术职务任职资格取得时间', trigger: 'change'},
          ],
          partDuty: [
            {required: true, message: '请输入现(兼)任行政职务', trigger: 'blur'},
          ],
          jobSubjectRoList: {
            teamName: [
              {required: true, message: '请输入参加的学术团体', trigger: 'blur'},
            ],
            duty: [
              {required: true, message: '请输入学术团体职务', trigger: 'blur'},
            ]
          },
          fstAssess: [
            {required: true, message: '请输入第一年考核情况', trigger: 'blur'},
          ],
          sndAssess: [
            {required: true, message: '请输入第二年考核情况', trigger: 'blur'},
          ],
          thdAssess: [
            {required: true, message: '请输入第三年考核情况', trigger: 'blur'},
          ],

          mark: [
            {required: true, message: '请选择是否破格申报', trigger: 'change'},
          ],
          descr: [
            {message: '请输入符合破格申报情况', trigger: 'blur'},
            {validator: validatebreakCon, trigger: 'blur'}
          ]
        },
        optNationCdItem: [],  //民族 select option
        optHealthCdItem: [],  //身体状况 select option
        optEducationCdItem: [],  //学历 select option
        optDegreeCdItem: [],  //学位 select option
        optWorkCdItem: [],  //在职状态 select option
        optWorkYearCdItem: [],  //从事申报专业工作年限 select option
      }
    },
    computed: {
      isEdit() {
        return true
      },
    },
    methods: {
      ...mapActions('declare', ['listByPrntCd', 'd_getSecondInfo', 'd_submitSecond']),

      // 获取下拉数据
      getListByPrntCd(prntCd, arr) {
        this.listByPrntCd({prntCd: prntCd}).then(res => {
          this[arr] = res.list
        }).catch(err => {
          console.log(err)
        })
      },

// 获取基本信息
      getSecondInfo() {
        this.d_getSecondInfo({id: this.id}).then(res => {
          let aaa = Object.assign({}, res)
          Object.keys(aaa).forEach(attr => {
            if (attr == 'id') {
              delete aaa.id
            } else if (attr == 'jobSubjectVoList') {
              let OBJ = []
              this.ruleForm.jobSubjectRoList = []
              let len = aaa[attr].length
              if (len === 0) {
                OBJ.push({id: '', teamName: '', duty: ''})
              } else {
                aaa[attr].forEach(item => {
                  let a = {
                    id: item.subjectId,
                    teamName: item.teamName,
                    duty: item.duty
                  }
                  OBJ.push(a)
                })
              }
              this.ruleForm.jobSubjectRoList = OBJ
            } else if (attr == 'jobSkillVoList') {
              let OBJ = []
              this.ruleForm.jobSkillRoList = []
              let len = aaa[attr].length
              if (len === 0) {
                OBJ.push({id: '', startTm: '', endTm: ''})
              } else {
                aaa[attr].forEach(item => {
                  let a = {
                    id: item.skillId,
                    startTm: item.startTm,
                    endTm: item.endTm
                  }
                  OBJ.push(a)
                })
              }
              this.ruleForm.jobSkillRoList = OBJ
            } else {
              if (aaa[attr] == null) aaa[attr] = ''
              this.ruleForm[attr] = aaa[attr]
            }
          })
          this.ruleForm.birthTm = this.$method.comBirth(this.ruleForm.idCard, 14)
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

    activated() {
      this.getListByPrntCd('30060.170', 'optNationCdItem')   // 获取民族下拉
      this.getListByPrntCd('30060.160', 'optHealthCdItem')   // 获取身体状况下拉
      this.getListByPrntCd('30060.180', 'optWorkYearCdItem')   // 获取从事申报专业工作年限
      this.getListByPrntCd('30060.120', 'optEducationCdItem')   // 获取学历
      this.getListByPrntCd('30060.110', 'optDegreeCdItem')   // 获取学位
      this.getListByPrntCd('30060.140', 'optWorkCdItem')   // 获取在职状态

      this.getSecondInfo()
    }
  }
</script>1

<style lang="scss" scoped>
</style>

