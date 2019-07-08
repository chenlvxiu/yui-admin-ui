<template>
  <el-select :value="value" placeholder="请选择" style="width: 250px;" :size="size" @change="change" :clearable="true" :disabled="disabled">
    <el-option v-for="item in items" :key="item.value" :label="item.label" :value="item.value" ></el-option>
  </el-select>
</template>

<script>
export default {
  data() {
    return {
      // value: ''
    };
  },
  props: {
    size: {
      //优先级 高于 自定义 宽高 medium small mini
      default: "small",
      type: String
    },
    options: {
      default: () => {
        return [
          {
            value: "选项1",
            label: "黄金糕"
          },
          {
            value: "选项2",
            label: "双皮奶"
          }
        ]
      },
      type: Array
    },
    value: {
      //优先级 高于 自定义 宽高 medium small mini
      default: '',
      type: [String, Number]
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    items () {
      console.log('options', this.options, typeof this.value)
      return this.options
    }
  },
  methods: {
    change (val) {
      console.log('val',val)
      this.$emit('input', val)
    },
  }
};
</script>

<style scoped>
</style>
