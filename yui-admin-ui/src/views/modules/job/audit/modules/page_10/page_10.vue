<template>
  <div id="page11">
    <m-title :data-step="10"></m-title>
    <el-form :model="info" status-icon :rules="rules" ref="info" label-width="100px" class="m-form">
      <section class="content-wrap">
        <ul>
          <li class="content-item" v-for="(item, index) in info.list" :key="index">
            <div class="subtitle">
              <h4>
                获得专利 {{index + 1}}
              </h4>
              <!--<img src="./img/reduce.png" alt="" class="reduce" @click="sliceInfo(index)" v-if="info.list.length > 1">-->
            </div>
            <ul class="content">
              <li class="item-wrap">
                <!-- <h4 class="item-title">专利名称：</h4> -->
                <div class="wrap">
                  <el-form-item label="专利名称" :prop="'list.'+ index +'.name'" :rules="rules.list.name">
                    <m-input v-model="item.name" :disabled="!editAllow"></m-input>
                  </el-form-item>
                </div>
              </li>
              <li class="item-wrap">
                <!-- <h4 class="item-title">类别：</h4> -->
                <div class="wrap">
                  <el-form-item label="专利类别" :prop="'list.'+ index +'.type'" :rules="rules.list.type">
                    <m-input v-model="item.type" :disabled="!editAllow"></m-input>
                  </el-form-item>
                </div>
              </li>
              <li class="item-wrap">
                <!-- <h4 class="item-title">专利号：</h4> -->
                <div class="wrap">
                  <el-form-item label="专利号" :prop="'list.'+ index +'.number'" :rules="rules.list.number">
                    <m-input v-model="item.number" :disabled="!editAllow" contentType="en-num"></m-input>
                  </el-form-item>
                </div>
              </li>
              <li class="item-wrap">
                <!-- <h4 class="item-title">授权年月：</h4> -->
                <div class="wrap">
                  <el-form-item label="授权年月" :prop="'list.'+ index +'.date'" :rules="rules.list.date">
                    <m-date-picker v-model="item.date" :disabled="!editAllow"></m-date-picker>
                  </el-form-item>
                </div>
              </li>
              <li class="item-wrap">
                <!-- <h4 class="item-title">授权单位：</h4> -->
                <div class="wrap">
                  <el-form-item label="授权单位" :prop="'list.'+ index +'.unit'" :rules="rules.list.unit">
                    <m-input v-model="item.unit" :disabled="!editAllow"></m-input>
                  </el-form-item>
                </div>
              </li>
              <li class="item-wrap">
                <!-- <h4 class="item-title">作者排名：</h4> -->
                <div class="wrap">
                  <el-form-item label="作者排名" :prop="'list.' + index + '.rank' && 'list.' + index + '.total'"
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
                <!-- <h4 class="item-title">是否转让：</h4> -->
                <div class="wrap">
                  <el-form-item label="是否转让" :prop="'list.'+ index +'.mark'" :rules="rules.list.mark">
                    <m-select v-model="item.mark" :options="transferOrNot" :disabled="!editAllow"></m-select>
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
                   @click="submit(9)">上一页
        </el-button>
        <el-button class="m-form-buttons-item m-form-buttons-item-primary" type="primary"
                   @click="submit(11)">下一页
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

  import mInput from '../../components/input-items/m-input/m-input.vue'
  import mSelect from '../../components/input-items/m-select/m-select.vue'
  import mRanking from '../../components/input-items/m-ranking/m-ranking.vue'
  import mDatePicker from '../../components/input-items/m-date-picker/m-date-picker.vue'

  export default {
    props: ["id"],
    components: {mInput, mSelect, mRanking, mDatePicker},
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
      return {
        info: {
          list: [
            // {
            //   // id: '', //新增不传  编辑需传 记录id
            //   //declareId: '', // 申报id
            //   name: '',  //专利名称
            //   type: '',   //类别
            //   number: '', //专利号
            //   date: '', //授权年月
            //   unit: '', //授权单位
            //   rank: '', //作者排名
            //   total: '', //排名总人数
            //   mark: '' //是否转让 1-是 0-否
            // }
          ]
        },
        delIdList: [],
        rules: {
          list: {
            name: [
              {required: true, message: '请输入专利名称', trigger: 'blur'}
            ],
            type: [
              {required: true, message: '请输入专利类别', trigger: 'blur'}
            ],
            number: [
              {required: true, message: '请输入专利号', trigger: 'blur'}
            ],
            date: [
              {required: true, message: '请输入授权年月', trigger: 'blur'}
            ],
            unit: [
              {required: true, message: '请输入授权单位', trigger: 'blur'}
            ],
            rank: [
              {required: true, validator: rankingValidate, trigger: 'blur'}
            ],
            total: [
              {required: true, validator: rankingValidate, trigger: 'blur'}
            ],
            mark: [
              {required: true, message: '请选择是否转让', trigger: 'change'}
            ]
          }
        },
        transferOrNot: [{value: '1', label: '是'}, {value: '0', label: '否'}],

      }
    },
    methods: {
      add() {
        if (!this.editAllow) return this.$message.warning('查看状态下无法新增')
        this.info.list.push(
          {
            name: '',
            type: '',
            number: '',
            date: '',
            unit: '',
            rank: '',
            total: '',
            mark: ''
          }
        )
      },
      numeratorHandle(ev, index) {
        this.info.list[index].rank = ev
      },
      denominatorHandle(ev, index) {
        this.info.list[index].total = ev
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.save()
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      submitNext(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.save(true)
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      getInfo() {
        let declareId = this.id
        let url = `/job/patent/list`
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
      formatDate(time) {
        let year = time.getFullYear()
        let month = time.getMonth() + 1
        month = month < 10 ? ('0' + month) : month
        return year + '-' + month
      },
      sliceInfo(i) {
        if (!this.editAllow) return this.$message.warning('查看状态下无法删除')
        let {id} = this.info.list.splice(i, 1)[0]
        console.log('id', id)
        this.delIdList.push(id)
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

  #page11 {
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
</style>
