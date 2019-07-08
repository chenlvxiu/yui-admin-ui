<template>
  <el-row class="m-dyn-row">
    <slot></slot>
    <el-col class="m-dyn-row-icon flex-row" :span="span">
      <m-icon-add @addRow="addRow" :item="item" v-show="item.isCan.isAdd" :disabled="disabled"
                  :isRequire="isRequire"></m-icon-add>
      <m-icon-reduce @reduceRow="reduceRow(item)" :item="item" v-show="item.isCan.isReduce"
                     :disabled="disabled"></m-icon-reduce>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: "m-dyn-row",
    props: {
      item: {
        type: Object,
        require: true
      },
      disabled: {
        type: Boolean,
        default: false
      },
      span: {
        type: [String, Number],
        default: 8
      },
      isRequire: {
        type: Boolean,
        default: true
      },
    },
    methods: {
      addRow(item) {
        this.$emit('addRow', item)
      },
      reduceRow(item) {
        this.$emit('reduceRow', item)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .m-dyn-row {
    display: flex;
    align-items: center;
    &-icon {
      position: relative;
      top: 4px;
      &-item {
        /*cursor: pointer;*/
        font-size: 20px;
        color: $fontColor9;
        margin-right: 10px;
        &:last-child {
          margin-right: 0;
        }
        /*&.disabled {*/
        /*cursor: not-allowed;*/
        /*color: #ccc !important;*/
        /*}*/
      }
    }
  }
</style>
