<template>
  <!--
      m-dyn-row 组件说明：
         1.span：列宽（0-24）默认8
         2.item：{} 数据
         3.disabled：是否 disabled，默认 false
         4.isRequire：新增时是否需要必填，默认true
         5.isConfirm：减少是是否需要提示，默认true
         6.text:减少是提示标题，默认'确认删除，是否继续'


       例：
       <m-dyn-row v-for="(item,key) in dynList" :key="key" :item="item" @addRow="addRow"
                   @reduceRow="reduceRow">
          <el-col :span="8">{{item.name}}</el-col>
          <el-col :span="8">{{item.sex}}</el-col>
        </m-dyn-row>
  -->
  <el-row class="m-dyn-row">
    <slot></slot>
    <el-col class="m-dyn-row-icon flex-row" :span="span">
      <el-form-item>
        <m-icon-add class="m-dyn-row-icon-item" v-show="isAdd && !disabled" :item="item" @addRow="addRow"></m-icon-add>
        <m-icon-reduce class="m-dyn-row-icon-item" v-show="isReduce && !disabled"
                       @reduceRow="reduceRow"></m-icon-reduce>
      </el-form-item>
    </el-col>
  </el-row>
</template>

<script>
  import mIconAdd from './m-icon-add'
  import mIconReduce from './m-icon-reduce'

  export default {
    name: "m-dyn-row",
    props: {
      item: {
        type: Object,
        require: true
      },
      span: {
        type: [String, Number],
        default: 8
      },
      disabled: {
        type: Boolean,
        default: false
      },
      isAdd: {
        type: Boolean,
        default: false
      },
      isReduce: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      addRow(newItem, oldItem) {
        this.$emit('addRow', newItem, oldItem)
      },
      reduceRow(item) {
        this.$emit('reduceRow', item)
      }
    },
    components: {
      mIconReduce, mIconAdd
    }
  }
</script>

<style lang="scss" scoped>
  .m-dyn-row {
    display: flex;
    align-items: center;
    &-icon {
      &-item {
        margin-right: 10px;
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
</style>
<style>
  .m-dyn-row-icon .el-form-item__content {
    margin-left: 10px !important;
    display: flex;
  }

  .m-dyn-row-icon .el-form-item {
    margin-bottom: 0 !important;
  }
</style>
