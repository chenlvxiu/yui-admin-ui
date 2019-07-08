<template>
    <el-input :value='value' :placeholder="placeholder" @input="inputHandle" :clearable="clearable" :type="type" :show-password="password" :size="size" :maxlength="maxlength" :style="styles" :readonly="readonly" @blur="blurHandle" :disabled="disabled"></el-input>
</template>

<script>
  export default {
    data () {
      return {
        limit: {
          numberAllow: val => val.replace(/[^\d]/g, ''), //
          enNum: val => val.replace(/[^\w]/g, ''),
          num1_9: val => val.replace(/^0/g, ''),
        },
      }
    },
    props: {
      value: {
        default: '',
        type: [String, Number]
      },
      clearable: {
        default: false,
        type: Boolean
      },
      readonly: {
        default: false,
        type: Boolean
      },
      password: {
        default: false,
        type: Boolean
      },
      type: {//text textarea ...other input type
        default: 'text',
        type: String
      },
      placeholder: {
        default: '请输入',
        type: String
      },
      maxlength: {
        default: 200,
        type: Number
      },
      size: {//优先级 高于 自定义 宽高 medium small mini
        default: 'small',
        type: String
      },
      width: {//优先级 高于 自定义 宽高 medium small mini
        default: '',
        type: [Number,String],
      },
      contentType: {//配合 data中对象字段对应的 正则方法  method.inputHandle 筛选限制  el-input
        default: '',
        type: String
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      styles () {
        return {
          width: `${this.width}px`
        }
      }
    },
    methods: {
      inputHandle (val) {
        let type = this.contentType
        if (type) {
          if (type == 'Number') {
            val = this.limit.numberAllow(val)
          } else if (type == 'Float') {
            val = this.floatHandle(val)
          } else if (type == 'en-num') {
            val = this.limit.enNum(val)
          } else if (type == 'num1_9') {
            val = this.limit.numberAllow(val)
            val = this.limit.num1_9(val)
          }
        }
        // console.log('emit', val, typeof(val))
        this.$emit('input', val)
      },
      blurHandle () {
        this.$emit('blur')
      },
      floatHandle (val) {
        val = val.replace(/[^(\d|.)]/g,'')
        let arr = val.split('.')
        // console.log('arr',arr)
        if (arr.length == 2) {
          if (!arr[0] && !arr[1]) {
            val = '0.'
          } else if (arr[1].length < 2) {
            val = arr[0] + '.' + arr[1]
          } else {
            val = arr[0] + '.' + arr[1].substring(0,2)
          }
        } else if (arr.length > 2) {
          val = arr[0] + '.' + arr[1]
        }
        return val
      }
    },
  }
</script>

<style lang="scss" scoped>
</style>
