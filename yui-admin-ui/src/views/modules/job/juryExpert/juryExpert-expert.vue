<template>
  <div class="mod-expert">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="listData()">
      <el-form-item>
        <el-input v-model="dataForm.name" placeholder="请输入专家姓名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" @click="listData()">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="dataList" border stripe v-loading="dataListLoading" :max-height="tableHeight" 
            @selection-change="selectionChangeHandle" @sort-change="sortChangeHandle" style="width: 100%;">
      <el-table-column type="index" :index="indexMethod" prop="sort" width="100" label="序号" header-align="center" align="center"></el-table-column>
      <el-table-column prop="name" label="专家姓名" header-align="center" align="center"></el-table-column>
      <el-table-column prop="card" label="身份证号" header-align="center" align="center"></el-table-column>
      <el-table-column prop="username" label="专家账号" header-align="center" align="center"></el-table-column>
      <el-table-column prop="pwd" label="密码" header-align="center" align="center"></el-table-column>
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
        module: '/job/expert/',
        gridOptions: {
          isAct:false
        },
        id:null,
        dataForm: {
          reviewId: ''
        },
        dataMode: {
          reviewId : 'EQ',
        }
      }
    },
    components: {
    },
    activated() {
      // 通过路由参数pid, 控制列表请求操作
      if(!this.id || (this.$route.params.id!=undefined && this.id!=this.$route.params.id)) {
        this.id = this.$route.params.id;
      }

      this.dataForm.reviewId = this.id;
      console.log(this.dataForm.reviewId)
      this.listData();
    },
    methods: {
      indexMethod (index) {
        return this.pageSize * (this.pageNo - 1) + index + 1
      },
    }
  }
</script>
