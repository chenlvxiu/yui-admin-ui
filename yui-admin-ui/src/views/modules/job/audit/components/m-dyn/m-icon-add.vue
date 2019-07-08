<template>
  <!--
      m-icon-add 组件说明：
         1.item:Object
  -->
  <i class="m-dyn-icon el-icon-circle-plus-outline" @click="$_handleFun"></i>
</template>

<script>
  export default {
    name: "m-icon-add",
    props: {
      item: {
        type: Object,
        require: true
      }
    },
    methods: {
      $_handleFun() {
        let obj = new Object()
        Object.keys(this.item).forEach(attr => {
          obj[attr] = ""
        })
        this.$emit('addRow', obj, this.item)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "icon";
</style>
