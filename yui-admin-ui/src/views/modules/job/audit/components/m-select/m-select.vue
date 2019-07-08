<template>
  <el-select class="m-select" filterable :multiple="option.multiple" :value="value" :placeholder="option.placeholder"
             :disabled="option.disabled || disabled" v-bind="$attrs"
             @change="handleChange" v-if="opt.items" @input="$emit('input', $event)">
    <el-option v-for="item in opt.items" :key="item.cd || item.id"
               :label="item.nm || item.name" :value="item.cd || item.id" :disabled="item.disabled || false"
               :readonly="opt.readonly">
    </el-option>
  </el-select>
</template>

<script>
  export default {
    name: "m-select",
    props: ['opt', 'value','disabled'],
    computed: {
      option() {
        let obj = {
          placeholder: '请选择',
          disabled: false,
          multiple: false
        }
        return Object.assign({}, obj, this.opt)
      }
    },
    methods: {
      handleChange(value) {
        this.$emit('change', value)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .m-select {
    width: 100%;
  }
</style>
