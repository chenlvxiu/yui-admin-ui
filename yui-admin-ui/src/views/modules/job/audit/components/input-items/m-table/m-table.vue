<template>
  <section class="m-table">
    <h4 class="subtitle" style="margin-bottom: 29px; font-size:16px; font-family: MicrosoftYaHei-Bold;">{{title}}</h4>
    <div class="table" style="border: 1px solid rgb(235, 238, 245); border-bottom: 0;">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column :prop="item.prop" :label="item.label" :width="item.width" v-for="(item, index) in titleInfo" :key="index + 'title'"></el-table-column>
      </el-table>
    </div>
  </section>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      titleInfo: {
        type: Array,
        default: []// {prop: '', label: '', width: ''}
      },
      tableData: {
        type: Array,
        default: []// {prop: '', label: '', width: ''}
      }
    },
    // computed: {
    //   data () {
    //     console.log('tableData', this.tableData)
    //     return this.tableData
    //   },
    //   list () {
    //     console.log('titleInfo', this.titleInfo)
    //     return this.titleInfo
    //   }
    // },
    mounted () {
      // console.log('titleInfo-mounted', this.titleInfo)
    }
  }
</script>

<style scoped lang="scss">
.m-table {// 样式失效
  .subtitle {margin-bottom: 29px; font-size:16px; font-family: MicrosoftYaHei-Bold;}
  .table{border: 1px solid rgb(235, 238, 245); border-bottom: 0;}
}
</style>
