<template>
  <el-date-picker style="width: 250px;" placeholder="请选择"
    v-model="calcuValue"
    :type="typeInfo.type"
    :format="typeInfo.format"
    :value-format="typeInfo.valueFormat"
    :size="size"
    :disabled="disabled"
     :picker-options="pickerOpt"
  ></el-date-picker>
</template>

<script>
export default {
  data() {
    return {
      date: "",
      pickerOpt: {// 限制时间
        disabledDate (time) {
          return time.getTime() > Date.now();
        }
      }
    };
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
          type: 'month',
          format: "yyyy-M",
          valueFormat: "yyyy-M"
        }
      },
      type: Object
    },
    value: {
      default: '',
      type: String
    },
    disabled: {
        type: Boolean,
        default: false
      }
  },
  computed: {
    calcuValue: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  }
};
</script>

<style scoped>
</style>
