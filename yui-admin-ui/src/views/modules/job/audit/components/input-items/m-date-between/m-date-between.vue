<template>
    <el-date-picker
      v-model="value"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
</template>

<script>
  /**
   * output [item1, item2] => ["2019-02", "2019-04"]
   */
  export default {
    data () {
      return {
        // value: ''
      }
    },
    props: {
      size: {
        //优先级 高于 自定义 宽高 medium small mini
        default: "small",
        type: String
      },
      typeInfo: {
        default: () => {  // {type: 'date', format: 'yyyy 年 MM 月 dd 日'} {type: 'year', format: 'yyyy'}...
          // yy MM WW dd  HH H hh h mm m ss s
          return {
            // type: 'month',  // 该选项替换成
            type: 'monthrange', // daterange monthrange
            format: "yyyy-MM",
            valueFormat: "yyyy-MM"
          }
        },
        type: Object
      },
      value: {
        //优先级 高于 自定义 宽高 medium small mini
        default: [],
        type: Array
      },
      startTime: {
        default: '',
        type: String
      },
      endTime: {
        default: '',
        type: String
      },
    },
    computed: {
      calcuValue: {
        get () {
          return this.value
        },
        set (val) {
          console.log('val',val)// 此处为何执行2次
          this.$emit('input', val)
        }
      }
    }
  }
</script>

<style scoped>

</style>
