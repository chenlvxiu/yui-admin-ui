<template>
  <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
           label-width="120px">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="通过人数" prop="num">
          <el-input v-model="dataForm.num" placeholder="主键"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="评审时间" prop="id">
          <el-date-picker v-model="value1" type="daterange" range-separator="至" start-placeholder="开始日期"
                          end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-form-item label="专家详情">
        <m-dyn-row v-for="(item,key) in dataForm.exportRolist" :key="key" :span="8" :item="item" @addRow="addRow"
                   @reduceRow="reduceRow">
          <el-col :span="12">
            <el-form-item label="专家姓名" :prop="'exportRolist.'+key+'.name'" :rules="dataRule.exportRolist.name">
              <mm-input v-model="item.name" placeholder="请输入专家姓名"></mm-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="身份证号" :prop="'exportRolist.'+key+'.idCard'" :rules="dataRule.exportRolist.idCard">
              <mm-input v-model="item.idCard" placeholder="请输入身份证号"></mm-input>
            </el-form-item>
          </el-col>
        </m-dyn-row>
      </el-form-item>
    </el-row>
  </el-form>
</template>

<script>
  import debounce from 'lodash/debounce'

  export default {
    data() {
      return {
        value1: '',
        exportNm: 4,
        minExportNm: 3,
        template: {id: '', name: '', idCard: ''},

        dataForm: {
          num: '',
          startTm: '',
          endTm: '',
          delExportList: [],
          exportRolist: [
            {id: '', name: '', idCard: '', isCan: {isAdd: false, isReduce: true}},
            {id: '', name: '', idCard: '', isCan: {isAdd: true, isReduce: true}}
          ]
        },
        dataRule: {
          num: [
            {required: true, message: '通过人数', trigger: 'blur'}
          ],
          startTm: [
            {required: true, message: '开始时间', trigger: 'change'}
          ],
          endTm: [
            {required: true, message: '结束时间', trigger: 'change'}
          ],
          exportRolist: {
            name: [
              {required: true, message: '请输入专家姓名', trigger: 'blur'},
            ],
            idCard: [
              {required: true, message: '请输入身份证号', trigger: 'blur'},
            ],
          }
        }
      }
    },
    methods: {
      getExport() {
        this.dataForm.exportRolist = []
        let aList = []
        for (let i = 0; i < this.exportNm; i++) {
          aList.push({...this.template})
        }
        this.dataForm.exportRolist.push(...this.$method.DynRow(aList))
      },
      // 增加一行
      addRow(e) {
        this.dataForm.exportRolist.push(e)
        this.$method.DynRow(this.dataForm.exportRolist)
      },
      // 减少一行
      reduceRow(e) {
        console.log("减", e, this.dataForm.exportRolist.length, this.minExportNm, this.dataForm.exportRolist.length <= this.minExportNm)
        if (this.dataForm.exportRolist.length <= this.minExportNm) {
          this.$message.warning(`专家人数不得少于${ this.minExportN}位哦`)
          return
        }
        let alertText = ''
        if (e.name) alertText += `专家姓名：${e.name}`
        if (e.idCard) alertText += `身份证号：${e.idCard}`
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
        if (e.id) this.dataForm.delExportList.push(e.id)
        let idx = this.dataForm.exportRolist.findIndex((itemm) => {
          return e === itemm
        })
        this.dataForm.exportRolist.splice(idx, 1)
        this.$method.DynRow(this.dataForm.exportRolist)
      }
    },
    created() {
      this.getExport()
    }
  }
</script>
<style lang="scss" scoped>
  .m-dyn-row {
    margin-bottom: 20px;
  }
</style>
