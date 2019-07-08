<template>
  <div id="page10">
    <m-title :data-step="9"></m-title>
    <el-form :model="info" status-icon :rules="rules" ref="info" label-width="100px" class="m-form">
      <section class="content-wrap">
        <ul>
          <li class="content-item" v-for="(item, index) in info.list" :key="index">
            <div class="subtitle">
              <h4>
                科研情况 {{index + 1}}
              </h4>
              <!--<img src="./img/reduce.png" alt="" class="reduce" @click="sliceInfo(index)" v-if="info.list.length > 1">-->
            </div>
            <ul class="content">
              <li class="item-wrap">
                <!-- <h4 class="item-title">项目名称：</h4> -->
                <div class="wrap">
                  <el-form-item label="项目名称" :prop="'list.'+ index +'.name'" :rules="rules.list.name">
                    <m-input v-model="item.name" :disabled="!editAllow"></m-input>
                  </el-form-item>
                </div>
              </li>
              <li class="item-wrap">
                <!-- <h4 class="item-title">项目来源：</h4> -->
                <div class="wrap">
                  <el-form-item label="项目来源" :prop="'list.' + index+'.source'" :rules="rules.list.source">
                    <m-select v-model="item.source" :options="projectList" :disabled="!editAllow"></m-select>
                  </el-form-item>
                </div>
              </li>
              <li class="item-wrap">
                <!-- <h4 class="item-title">起止年月：</h4> -->
                <div class="wrap">
                  <el-form-item label="起止年月" :prop="'list.' + index + '.startTm' && 'list.' + index + '.endTm'"
                                :rules="rules.list.startTm">
                    <m-date-picker-range
                      :opt="{'disabled': !editAllow}"
                      :start="item.startTm"
                      :end="item.endTm"
                      @chaStart="startTimeHandle($event,index)"
                      @chaEnd="endTimeHandle($event,index)">
                    </m-date-picker-range>
                  </el-form-item>
                </div>
              </li>
              <li class="item-wrap">
                <!-- <h4 class="item-title">金额（万元）:</h4> -->
                <div class="wrap">
                  <el-form-item label="金额（万元）" :prop="'list.'+ index + '.money'" :rules="rules.list.money">
                    <m-input v-model="item.money" :disabled="!editAllow" :contentType="contentType"></m-input>
                  </el-form-item>
                </div>
              </li>
              <li class="item-wrap">
                <!-- <h4 class="item-title">本人排名：</h4> -->
                <div class="wrap">
                  <el-form-item label="本人排名" :prop="'list.' + index + '.rank' && 'list.' + index + '.total'"
                                :rules="rules.list.rank && rules.list.total">
                    <m-ranking
                      :disabled="!editAllow"
                      :numerator="item.rank"
                      :denominator="item.total"
                      @numeratorHandle="numeratorHandle($event, index)"
                      @denominatorHandle="denominatorHandle($event, index)"
                    ></m-ranking>
                  </el-form-item>
                </div>
              </li>
              <li class="item-wrap">
                <!-- <h4 class="item-title">是否结题：</h4> -->
                <div class="wrap">
                  <el-form-item label="是否结题" :prop="'list.'+ index +'.mark'" :rules="rules.list.mark">
                    <m-select v-model="item.mark" :options="endOrNot" :disabled="!editAllow"></m-select>
                  </el-form-item>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </section>
      <!--<section class="btn-wrap">-->
        <!--<div class="btn-add" @click="add"><img src="./img/add.png" alt=""></div>-->
      <!--</section>-->
      <el-form-item class="m-form-buttons">
        <el-button type="primary" plain class="m-form-buttons-item m-form-buttons-item-plain"
                   @click="submit(8)">上一页
        </el-button>
        <el-button class="m-form-buttons-item m-form-buttons-item-primary" type="primary"
                   @click="submit(10)">下一页
        </el-button>
      </el-form-item>
      <!--<section class="operate-wrap">-->
        <!--<div class="operate">-->
          <!--<el-button @click="submit(8)" class="btn">上一页</el-button>-->
          <!--<el-button type="primary" class="next" @click="submit(10)">下一页</el-button>-->
        <!--</div>-->
      <!--</section>-->
    </el-form>
  </div>
</template>

<script>
  import axios from 'axios'
  import mInput from '../../components/input-items/m-input/m-input.vue'
  import mSelect from '../../components/input-items/m-select/m-select.vue'
  import mRanking from '../../components/input-items/m-ranking/m-ranking.vue'
  import {mapState, mapMutations} from 'vuex'

  export default {
    props: ["id"],
    components: {mInput, mSelect, mRanking},
    data() {
      const rankingValidate = (rule, value, callback) => {
        // console.log('rankingValidate', rule, value) // 若 期中一个为空不会执行
        let re = /\d+/;
        let index = rule.field.match(re)[0]
        let {rank, total} = this.info.list[index]
        if (rank == '') return callback(new Error('请输入个人排名'))
        if (total == '') return callback(new Error('请输入排名总人数'))
        if (rank * 1 > total * 1) return callback(new Error('排名不得大于总人数'))
        callback()
      }
      const moneyValidate = (rule, value, callback) => {
        // console.log('moneyValidate', rule, value)
        let re = /(.){2-}/
        let result = re.test(value)
        // console.log('result', result)
      }
      return {
        info: {
          list: [
            // {
            //   // id: '', //新增不传  编辑需传
            //   name: '',// 项目名称
            //   source: '',// 项目来源
            //   money: '',// 金额,保留2位小数
            //   mark: '',// 是否结题 1-是 0-否
            //   startTm: '',
            //   endTm: '',
            //   rank: '',// 本人排名
            //   total: '',// 排名总人数
            // }
          ]
        },
        delIdList: [],
        rules: {
          list: {
            name: [
              {required: true, message: '请输入项目名称', trigger: 'blur'}
            ],
            source: [
              {required: true, message: '请输入项目来源', trigger: 'change'}
            ],
            money: [
              {required: true, message: '请输入金额（万元）', trigger: 'blur'},
              // { required: true, validator: moneyValidate, trigger: 'blur'}
            ],
            mark: [
              {required: true, message: '请选择是否结题', trigger: 'change'}
            ],
            startTm: [
              {required: true, message: '请选择起止时间', trigger: 'change'},
            ],
            endTm: [
              {required: true, message: '请选择结束时间', trigger: 'change'},
            ],
            rank: [
              // { required: true, message: '请输入排名', trigger: 'blur' },
              {required: true, validator: rankingValidate, trigger: 'blur'}
            ],
            total: [
              // { required: true, message: '请输入排名总人数', trigger: 'blur' },
              {required: true, validator: rankingValidate, trigger: 'blur'}
            ],
          }
        },
        projectList: [
          {
            value: "xm1",
            label: "项目1"
          },
          {
            value: "xm2",
            label: "项目2"
          }
        ],
        endOrNot: [
          {
            value: '1',
            label: "是"
          },
          {
            value: '0',
            label: "否"
          }
        ],
        contentType: 'Float'
      }
    },
    methods: {
      ...mapMutations('user', ['setNowStep', 'setStep']), // 设置当前步骤 设置最大步骤
      numeratorHandle(ev, index) {// ev ? = val   //??
        console.log('numeratorHandle', ev, index)
        this.info.list[index].rank = ev
      },
      denominatorHandle(ev, index) {
        console.log('denominatorHandle', ev, index)
        this.info.list[index].total = ev
      },
      startTimeHandle(ev, index) {// ev ? = val   //??
        console.log('startTime', ev)
        // ev = this.formatDate(ev) //时间obj 格式化
        this.info.list[index].startTm = ev

      },
      endTimeHandle(ev, index) {
        console.log('endTime', ev)
        // ev == '至今' && ( ev = new Date() )        //时间obj 格式化
        // ev != '' && ( ev = this.formatDate(ev) )   //时间obj 格式化
        this.info.list[index].endTm = ev
        console.log('endTime -- ', ev)
      },
      add() {
        if (!this.editAllow) return this.$message.warning('查看状态下无法新增')
        this.info.list.push(
          {
            name: '',
            source: '',
            money: '',
            mark: '',
            startTm: '',
            endTm: '',
            rank: '',
            total: '',
          }
        )
      },
      formatDate(time) {
        // console.log('time', time)
        let year = time.getFullYear()
        let month = time.getMonth() + 1
        month = month < 10 ? ('0' + month) : month
        return year + '-' + month
      },

      getInfo() {
        let declareId = this.id
        // let declareId = 4350449116009472
        let url = `/job/scient/list`
        let query = {'w': [{'k': 'declareId', 'v': declareId, 'm': 'EQ'}], 'o': [], 'p': {}}

        this.$axios.get(url, {}, query).then(res => {
          console.log('res', res)
          if (res.list && res.list.length == 0) return this.add()
          if (res && res.list && res.list.length > 0) {

            this.info.list = res.list.map(item => {
              item.mark += ''
              return item
            })
          }

        }).catch(err => {console.log('err', err)})
      },
      submit(step) {
        this.$emit('change', step)
      }
    },
    computed: {
      editAllow() {// 转化下 全局isEdit 理解方式
        return false
      },
    },
    mounted() {
      this.getInfo()
    }
  }
</script>

<style scoped lang="scss">
  #page10 {
    padding-bottom: 60px;
    .title {
      margin-bottom: 39px;
    }
    .content-wrap {
      margin-bottom: 17px;
      .content-item {
        border-bottom: 1px dashed #ddd;
        margin-bottom: 50px;
        padding-bottom: 13px;
      }
      .content-item:last-child {
        border-bottom: 0;
        margin-bottom: 0px;
      }
      .subtitle {
        font-size: 16px;
        font-family: MicrosoftYaHei-Bold;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        margin-bottom: 21px;
        position: relative;
        .reduce {
          position: absolute;
          right: 25px;
          top: -1px;
        }
      }
      .content {
        display: flex;
        flex-wrap: wrap;
        .item-wrap {
          width: 250px;
          margin-right: 20px;
          margin-bottom: 5px;
          .item-title {
            font-size: 14px;
            font-family: MicrosoftYaHei-Bold;
            font-weight: bold;
            color: rgba(51, 51, 51, 1);
            margin-bottom: 9px;
          }
        }
        .item-wrap:nth-child(3n) {
          /*margin-right: 0;*/
        }
      }
    }
    .btn-wrap {
      display: flex;
      justify-content: center;
      .btn-add {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
    }
    .operate-wrap {
      padding-top: 60px;
      display: flex;
      justify-content: center;
      .operate {
        display: flex;
        button.disabled {
          pointer-events: none;
          cursor: no-drop;
          border: none;
          background: rgba(221, 221, 221, 1);
          color: #fff;
        }
        button {
          cursor: pointer;
          text-align: center;
          box-sizing: border-box;
          background: #fff;
          border: 1px solid #b3d8ff;
          color: $primary;
          width: 100px;
          height: 40px;
          margin-right: 10px;
        }
        .next {
          background: linear-gradient(150deg, rgba(80, 212, 248, 1), rgba(0, 134, 254, 1));
          color: #fff;
          border: 0;
        }
        .next.el-button {
          background: linear-gradient(150deg, rgba(80, 212, 248, 1), rgba(0, 134, 254, 1));
          color: #fff;
          border: 0;
        }
        .next.el-button:hover {
          background: linear-gradient(150deg, rgba(0, 134, 254, 1), rgba(80, 212, 248, 1));
        }
        .el-button:last-child {
          margin-right: 0;
        }
        .btn:hover {
          background: #b3d8ff;
          color: #fff;
        }
        .el-button.disabled {
          background: rgba(221, 221, 221, 1)
        }
      }
    }

  }

  ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .ranking {
    display: flex;
    span {
      width: 50px;
      text-align: center;
      line-height: 28px;
    }
  }
</style>
