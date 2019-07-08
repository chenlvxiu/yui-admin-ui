<template>
  <div id="page12">
    <m-title :data-step="11"></m-title>
    <el-form :model="info" status-icon :rules="rules" ref="info" label-width="100px" class="m-form">
      <section class="content-wrap">
        <ul>
          <li class="content-item" v-for="(item, index) in info.list" :key="index">
            <div class="subtitle">
              <h4>
                荣誉情况 {{index + 1}}
              </h4>
              <!--<img src="./img/reduce.png" alt="" class="reduce" @click="sliceInfo(index)" v-if="info.list.length > 1">-->
            </div>
            <ul class="content">
              <li class="item-wrap">
                <!-- <h4 class="item-title">获奖项目：</h4> -->
                <div class="wrap">
                  <div class="wrap">
                    <el-form-item label="获奖项目" :prop="'list.'+ index +'.project'" :rules="rules.list.project">
                      <m-input v-model="item.project" :disabled="!editAllow"></m-input>
                    </el-form-item>
                  </div>
                </div>
              </li>
              <li class="item-wrap">
                <!-- <h4 class="item-title">奖项、荣誉名称和等级：</h4> -->
                <div class="wrap">
                  <el-form-item label="奖项、荣誉名称和等级" :prop="'list.'+ index +'.honor'" :rules="rules.list.honor">
                    <m-input v-model="item.honor" :disabled="!editAllow"></m-input>
                  </el-form-item>
                </div>
              </li>
              <li class="item-wrap">
                <!-- <h4 class="item-title">授予单位：</h4> -->
                <div class="wrap">
                  <el-form-item label="授予单位" :prop="'list.'+ index +'.unit'" :rules="rules.list.unit">
                    <m-input v-model="item.unit" :disabled="!editAllow"></m-input>
                  </el-form-item>
                </div>
              </li>
              <li class="item-wrap">
                <!-- <h4 class="item-title">获奖时间：</h4> -->
                <div class="wrap">
                  <el-form-item label="获奖时间" :prop="'list.'+ index +'.date'" :rules="rules.list.date">
                    <m-date-picker v-model="item.date" :disabled="!editAllow"></m-date-picker>
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
            </ul>
          </li>
        </ul>
      </section>
      <!--<section class="btn-wrap">-->
      <!--<div class="btn-add" @click="add">-->
      <!--<img src="./img/add.png" alt="">-->
      <!--</div>-->
      <!--</section>-->
      <!--<section class="operate-wrap">-->
      <!--<div class="operate">-->
      <!--<el-button v-if="editAllow" @click="previous" class="btn">上一步</el-button>-->
      <!--<el-button @click="submitForm('info')" v-if="editAllow && saveAllow" class="btn">保存</el-button>-->
      <!--<el-button v-if="editAllow" class="next" @click="submitNext('info')" :class="{'disabled': !pass}">下一步</el-button>-->
      <!--<el-button type="primary" class="next"  @click="next" v-else>下一页</el-button>-->
      <!--</div>-->
      <!--</section>-->
      <el-form-item class="m-form-buttons">
        <el-button type="primary" plain class="m-form-buttons-item m-form-buttons-item-plain"
                   @click="submit(10)">上一页
        </el-button>
        <el-button class="m-form-buttons-item m-form-buttons-item-primary" type="primary"
                   @click="submit(12)">下一页
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

  import mInput from '../../components/input-items/m-input/m-input.vue'
  import mSelect from '../../components/input-items/m-select/m-select.vue'
  import mDatePicker from '../../components/input-items/m-date-picker/m-date-picker.vue'
  import mRanking from '../../components/input-items/m-ranking/m-ranking.vue'

  export default {
    props: ["id"],
    components: {mInput, mSelect, mDatePicker, mRanking},
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
            //   project: '',
            //   honor: '', //获奖、荣誉名称和等级
            //   unit: '', //授权单位
            //   date: '', //获奖时间(年月)
            //   rank: '', //本人排名
            //   total: '',//排名总人数
            // }
          ]
        },
        delIdList: [],
        rules: {
          list: {
            project: [
              {required: true, message: '请输入专利名称', trigger: 'blur'}
            ],
            honor: [
              {required: true, message: '请输入专利类别', trigger: 'blur'}
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
            ]
          }
        },
      }
    },
    methods: {
      numeratorHandle(ev, index) {
        this.info.list[index].rank = ev
      },
      denominatorHandle(ev, index) {
        this.info.list[index].total = ev
      },
      add() {
        if (!this.editAllow) return this.$message.warning('查看状态下无法新增')
        this.info.list.push(
          {
            project: '',
            honor: '',
            unit: '',
            date: '',
            rank: '',
            total: '',
          }
        )
      },
      delHandle(i) {
        this.$confirm('是否删除该条记录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.delete(i)
        }).catch(() => {
          this.$message({type: 'info', message: '已取消删除'})
        })
      },
      getInfo() {
        let declareId = this.id
        // let declareId = '4350449116009472'
        let query = {'w': [{'k': 'declareId', 'v': declareId, 'm': 'EQ'}], 'o': [], 'p': {}}
        this.$axios.get('/job/honor/list', {}, query).then(res => {
          console.log('res', res)
          if (res.list && res.list.length == 0) return this.add()
          if (res && res.list && res.list.length > 0) {
            this.info.list = [...res.list]
          }
        }).catch(err => {console.log('err', err)})
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

  #page12 {
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
          margin-bottom: 23px;
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
