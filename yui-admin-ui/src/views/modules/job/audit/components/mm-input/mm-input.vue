<template>
  <el-input :value="value" :type="type" :placeholder="placeholder" :disabled="disabled"
            :maxlength="maxlength ||  this.$maxlen.twoHundred" @input="$emit('input', $event)" v-on="$listeners"></el-input>
</template>

<script>
  export default {
    name: "mm-input",
    props: {
      value: {
        default: '',
        type: [String, Number]
      },
      maxlength: {
        type: Number,
      },
      placeholder: {
        type: String,
        default: '请输入'
      },
      disabled: {
        type: Boolean,
        default: false
      },
      type: {
        type: String,
        default: 'text'
      }
    }
  }
</script>

<style scoped>

</style>
