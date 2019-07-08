<template>
  <!--
      m-date-picker 组件说明：
         1.attr 根据 element(2.8.2) 请查阅说明文档

       m-date-picker 自定义属性：
          relative 和 relativeType 要成对出现，默认都为""
         1. relative 相关联 disabled 的 v-model 值
         2. relativeType：start/end 相关联的是开始时间还是结束时间
  -->
  <el-date-picker :value="value" :type="type" :picker-options="pickerOptions" :format="format" :clearable="clearable"
                  @input="$emit('input',$event)" v-on="$listeners" v-bind="$attrs"></el-date-picker>
</template>

<script>
  export default {
    name: "m-datePicker",
    inheritAttrs: false,
    props: {
      value: {
        type: [String, Date, Boolean],
        default: ''
      },
      type: {    // 输入框类型
        type: [String],
        default: 'month',
        validator(value) {   // 这个值必须匹配下列字符串中的一个
          return ['year', 'month', 'date', 'dates', 'datetime', 'datetimerange', 'daterange', 'monthrange'].indexOf(value) !== -1
        }
      },
      clearable: {
        type: Boolean,
        default: false
      },
      relative: {
        type: [String, Date],
        default: ''
      },
      relativeType: {
        type: [String],
        default: '',
        validator(value) {   // 这个值必须匹配下列字符串中的一个
          return ['', 'start', 'end'].indexOf(value) !== -1
        }
      }
    },
    data() {
      return {
        pickerOptions: {
          disabledDate: (time) => {
            return this.dealDisabledDate(time, this.relative, this.relativeType)
          }
        }
      }
    },
    computed: {
      format() {
        let format = ''
        switch (this.type) {
          case 'date':
            format = 'yyyy-M-d'
            break
          case 'month':
            format = 'yyyy-M'
            break
          case 'year':
            format = 'yyyy'
            break
          default:
            format = 'yyyy-M-d'
        }
        return format
      },
    },
    methods: {
      dealDisabledDate(time, relative = "", relativeType = '') {
        if (!relativeType && !relative) return time.getTime() > new Date()

        relative = new Date(relative)
        let flag = relativeType == 'start' ? -1 : 1
        switch (this.type) {
          case 'date':
            relative.setDate(relative.getDate() + flag)
            break
          case 'month':
            relative.setMonth(relative.getMonth() + flag)
            break
          case 'year':
            relative.setYear(relative.getFullYear() + flag)
            break
        }
        return (flag < 0) ? time.getTime() > new Date() || time.getTime() > relative : time.getTime() < relative || time.getTime() > new Date()
      },
    }
  }
</script>

