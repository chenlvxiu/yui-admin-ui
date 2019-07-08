<template>
  <i class="m-dyn-row-icon-item el-icon-remove-outline" :class="{'disabled':disabled}" @click="reduceRow(item)" v-show="item.isCan.isReduce"></i>
</template>

<script>
  export default {
    name: "m-icon-reduce",
    props: ['item', 'disabled'],
    methods:{
      reduceRow(item) {
        if (this.disabled) return
        this.$emit('reduceRow', item)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .m-dyn-row-icon-item {
    cursor: pointer;
    color: $fontColor9;
    &.disabled {
      cursor: not-allowed;
      color: #ccc !important;
    }
  }
</style>
