<template>
  <!--
    m-icon-reduce 组件说明：
       1.isConfirm：新增时是否需要必填，默认true
       2.text:减少是提示标题，默认'确认删除，是否继续'
   -->
  <i class="m-dyn-icon el-icon-remove-outline" @click="$_handleFun"></i>
</template>

<script>
  export default {
    name: "m-icon-reduce",
    methods: {
      $_handleFun() {
        this.$emit('reduceRow')
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "icon";
</style>

