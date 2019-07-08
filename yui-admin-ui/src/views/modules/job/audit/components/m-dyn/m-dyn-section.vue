<template>
  <!--
     m-dyn-row 组件说明：
        1.title：标题
        2.item：{} 数据
        3.disabled：是否 disabled，默认 false
        4.isRequire：新增时是否需要必填，默认true
        5.isConfirm：减少是是否需要提示，默认true
        6.text:减少是提示标题，默认'确认删除，是否继续'

     例：
     <m-dyn-section v-for="(item,key) in dynList" :key="key" :item="item" @addRow="addRow"
                     @reduceRow="reduceRow" :title="'专业工作经历'+(key+1)" :isRequire="isRequire">
        <el-col :span="8">{{item.name}}</el-col>
        <el-col :span="8">{{item.sex}}</el-col>
      </m-dyn-section>
 -->
  <div class="m-dyn-section">
    <el-row class="m-dyn-section-title">
      <el-col :span="23" class="m-dyn-row-sec-title"><h4>{{title}}</h4></el-col>
      <el-col :span="1">
        <m-icon-reduce v-show="isReduce && !disabled" @reduceRow="reduceRow"></m-icon-reduce>
      </el-col>
    </el-row>
    <el-row>
      <slot></slot>
      <el-col class="m-dyn-section-footer" v-show="isAdd && !disabled">
        <m-icon-add class="m-dyn-section-icon" :item="item" @addRow="addRow"></m-icon-add>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import mIconAdd from './m-icon-add'
  import mIconReduce from './m-icon-reduce'

  export default {
    name: "m-dyn-section",
    props: {
      title: {
        type: String,
        require: true
      },
      item: {
        type: Object,
        require: true
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
  .m-dyn-section {
    border-bottom: 1px dashed $border;
    padding: 40px 0;
    &:first-child {
      padding-top: 0;
    }
    &:last-child {
      border-bottom: none;
    }
    &-title {
      margin-bottom: 20px;
      h4{
        margin: 0;
      }
    }
    &-footer {
      text-align: center;
      margin-bottom: 40px;
    }
    &-icon {
      font-size: 40px !important;
      color: $primary !important;
    }
  }
</style>
