<template>
  <div class="m-table flex-column">
    <div class="m-table-wrapper">
      <!--<h4 class="m-table-header">-->
        <!--&lt;!&ndash;关于2019年职称申报通知文件&ndash;&gt;-->
      <!--</h4>-->
      <div class="m-table-body">
        <div class="m-table-tips" v-if="!dataArr.length">暂无数据</div>
        <div v-else class="m-table-tr flex-row" v-for="item in dataArr" :key="item.id"
             @click="$router.push({name:routerName,query:{id:item.id}})">
          <p class="m-table-tr-title flex-1">{{item.title}}</p>
          <span class="m-table-tr-date" v-if="item.crtTm">{{item.crtTm.split(' ')[0]}}</span>
        </div>
      </div>
    </div>
    <el-pagination v-if="pageOpt.isShow" class="m-table-page"
                   background
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="pageOpt.page"
                   layout="prev, pager, next"
                   :page-size="pageOpt.size"
                   :total="pageOpt.total">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: "m-table",
    props: {
      routerName: {
        type: String
      },
      pageOpt: {
        type: Object,
        default: {
          isShow: false,   // 是否显示
          page: 1,// 当前页
          total: 0,// 总记录数
          size: 10
        }
      },
      dataArr: {
        type: Array,
        default: []
      }
    },
    methods: {
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
  $table-border: 1px solid #f5f7fa; //el-table 一致
  .m-table {
    .m-table-wrapper {
      font-size: 14px;
      height: calc(100% - 40px);
      .m-table-header {
        font-weight: normal;
        border: $table-border;
        padding: 10px 30px;
        color: $fontColor3;
      }
      .m-table-body {
        height: calc(100% - 60px);
        overflow: auto;
        .m-table-tr {
          cursor: pointer;
          padding: 10px 30px;
          justify-content: space-between;
          align-items: center;
          border: $table-border;
          &:first-child {
            border-top: none;
          }
          &:nth-child(2n) {
            background-color: #fff;
          }
          &:nth-child(2n+1) {
            background-color: #F4F4F4;
          }
          &-title {
            color: $fontColor3;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            transition: all .3s;
            margin-right: 10px;
          }
          &-date {
            font-size: 13px;
            color: $fontColor6;
            transition: all .3s;
          }
          &:hover {
            .m-table-tr-title, .m-table-tr-date {
              color: $primary;
            }
          }
        }
        .m-table-tips {
          padding: 40px 0;
          text-align: center;
          border: $table-border;
          border-top: none;
          color: $fontColor9;
        }
      }
    }
    .m-table-page {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      height: 40px;
    }
  }
</style>
