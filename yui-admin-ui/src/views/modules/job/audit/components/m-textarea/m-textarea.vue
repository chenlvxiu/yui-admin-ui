<template>
  <div class="m-textarea">
    <el-input class="m-textarea-field"
              type="textarea"
              resize="none"
              :autosize="autosize || {minRows: 3,maxRows: 6 }"
              :placeholder="placeholder || '请输入'"
              :disabled="disabled || false"
              :value="value"
              :maxlength="maxlength || this.$maxlen.twoHundred" @input="$emit('input', $event)">
    </el-input>
    <span class="m-textarea-span">{{value.length}}/{{maxlength||this.$maxlen.twoHundred}}</span>
  </div>
</template>

<script>
  export default {
    name: "m-textarea",
    props: ['value', 'opt', 'placeholder', 'disabled', 'autosize', 'maxlength'],
  }
</script>

<style lang="scss" scoped>
  .m-textarea {
    width: 100%;
    position: relative;
    &-field {
      width: 100%;
    }
    &-span {
      position: absolute;
      right: 10px;
      bottom: 0;
      color: #bbb;
      font-size: 12px;
    }
  }
</style>
