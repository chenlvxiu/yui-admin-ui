<template>
  <div class="m-table">
    <div class="m-table-wrapper">
    <el-table class="m-table-inner"
              :data="dataArr"
              stripe
              max-height="300">
      <el-table-column
        type="index"
        label="序号"
        :index="indexMethod" v-if="order">
      </el-table-column>
      <slot></slot>
    </el-table>
    </div>
    <el-pagination v-if="pageOpt.isShow" class="m-table-page"
                   background
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="pageOpt.page"
                   :page-size="pageOpt.pageSize"
                   layout="prev, pager, next"
                   :total="pageOpt.total">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: "m-table",
    props: {
      order: {    // 是否显示序号（默认false）
        type: Boolean,
        default: false
      },
      pageOpt: {
        type: Object,
        default: {
          isShow: false,   // 是否显示
          page: 1,// 当前页
          pageSize: 10,// 每页记录数
          total: 0// 总记录数
        }
      },
      dataArr: {
        type: Array,
        default: []
      }
    },
    methods: {
      indexMethod(index) {
        return index + 1;
      },
      handleSizeChange(val) {
        this.$emit("ChangeSize", val)
      },
      handleCurrentChange(val) {
        this.$emit("ChangePage", val)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .m-table-wrapper{
    height: calc(100% - 40px);
  }
  .m-table-page{
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 40px;
    box-sizing: border-box;
  }
</style>

<style>
  .m-table-inner {
    border: 1px solid #f5f7fa;
    border-bottom: none;
    margin-bottom: 10px;
  }

  .m-table-inner th, .m-table-inner tr {
    font-size: 14px;
  }

  .m-table-inner th, .m-table-inner tr, .m-table-inner td {
    text-align: center;
  }

  .m-table-inner thead {
    color: #333;
  }

  .m-table-inner th {
    background: #E7F2FB;
  }
</style>
