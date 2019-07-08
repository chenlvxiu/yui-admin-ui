<template>
  <div class="mod-log">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="listData()">
      <el-form-item>
        <el-col>姓名：{{ name }}</el-col>
      </el-form-item>
    </el-form>
    <el-table :data="dataList" border stripe v-loading="dataListLoading" :max-height="tableHeight" 
            @selection-change="selectionChangeHandle" @sort-change="sortChangeHandle" style="width: 100%;">
      <el-table-column type="index" :index="indexMethod" prop="sort" width="100" label="序号" header-align="center" align="center"></el-table-column>
      <el-table-column prop="crtTm" label="时间" header-align="center" align="center"></el-table-column>
      <el-table-column prop="object" label="操作对象" header-align="center" align="center"></el-table-column>
      <el-table-column prop="operate" label="操作" header-align="center" align="center"></el-table-column>
      <el-table-column prop="reason" label="原因" header-align="center" align="center"></el-table-column>
    </el-table>
    <el-pagination v-if="this.gridOptions.isPage"
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageNo"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      :total="total"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
  </div>
</template>

<script>
  import grid from '@/mixins/grid'
  export default {
    mixins: [grid],
    data () {
      return {
        module: '/job/log/',
        gridOptions: {
          isAct:false
        },
        id: null,
        name: '',
        dataForm: {
          declareId: ''
        },
        dataMode: {
          declareId: 'EQ'
        }
      }
    },
    activated() {
      // 通过路由参数pid, 控制列表请求操作
      if(!this.id || (this.$route.params.id!=undefined && this.id!=this.$route.params.id)) {
        this.id = this.$route.params.id;
        this.name = this.$route.params.name;
      }

      this.dataForm.declareId = this.id;
      //console.log(22222,"finiall:",this.dataForm.declareId)
      this.listData();
    },
    components: {
    },
    methods: {
      // 每行排序显示
      indexMethod (index) {
        return this.pageSize * (this.pageNo - 1) + index + 1
      }
    }
  }
</script>
