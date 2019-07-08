<template>
  <el-select class="m-select" :value="value" v-bind="$attrs" v-on="$listeners" @input="$emit('input', $event)">
    <el-option v-for="item in option" :key="flag ? item.cd:item.id" :label="flag ? item.nm:item.name"
               :value="flag ? item.cd:item.id" :disabled="item.disabled || false">
    </el-option>
  </el-select>
</template>

<script>
  export default {
    name: "m-select",
    props: {
      value: {
        default: '',
        type: [String, Number, Array, Boolean]
      },
      option: {
        default: [],
        required: true,
        type: Array,
      },
      type: {
        type: String,
        default: 'cd',
        validator(value) {   // 这个值必须匹配下列字符串中的一个
          return ['cd', 'id'].indexOf(value) !== -1
        }
      }
    },
    computed: {
      flag() {
        return this.type == 'cd'
      }
    }
  }
</script>

<style lang="scss" scoped>
  .m-select {
    width: 100%;
  }
</style>
