<template>
  <div class="mod-rsjReview">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="listData()">
      <el-form-item>
        <el-input v-model="dataForm.project" placeholder="请输入项目名称" clearable></el-input>
      </el-form-item>
       <el-form-item>
        <el-input v-model="dataForm.batch" placeholder="请输入批次号" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" @click="listData()">查询</el-button>
        <el-button v-if="$hasPerm('job:juryReview:add')" size="small" type="primary" @click="editHandle()">新增</el-button>
        <el-button v-if="$hasPerm('job:juryReview:del')" size="small" type="danger" @click="delHandle()" :disabled="dataListSelections.length <= 0">删除</el-button>
        <el-button v-if="$hasPerm('job:juryReview:expt')" size="small" @click="exptHandle()">导出</el-button>
        <el-button v-if="$hasPerm('job:juryReview:impt')" size="small" @click="imptHandle()">导入</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="dataList" border stripe v-loading="dataListLoading" :max-height="tableHeight" 
            @selection-change="selectionChangeHandle" @sort-change="sortChangeHandle" style="width: 100%;">
      <el-table-column type="index" :index="indexMethod" prop="sort" width="100" label="序号" header-align="center" align="center"></el-table-column>
      <el-table-column prop="project" label="项目名称" header-align="center" align="center"></el-table-column>
      <el-table-column prop="batch" label="批次号" header-align="center" align="center"></el-table-column>
      <el-table-column prop="startTm" label="开始时间" header-align="center" align="center"></el-table-column>
      <el-table-column prop="endTm" label="结束时间" header-align="center" align="center"></el-table-column>   
      <el-table-column prop="statNm" label="审核状态" header-align="center" align="center"></el-table-column>    
      <el-table-column label="操作" fixed="right" header-align="center" align="center" width="140">
        <template slot-scope="scope" >
          <el-button v-if="$hasPerm('job:declare:page')" type="text" size="small" @click="childHandle(scope.row.id,scope.row.juryId,scope.row.batch,scope.row.statCd)" title="查看">查看</el-button>
        </template>
      </el-table-column>
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
        module: '/job/juryReview/',
        gridOptions: {},
        defOrders: [
          {
            k:'crtTm',
            t:'desc'
          }
        ],
        dataForm: {
          //statCd:'30070.130.110'
        },
        dataMode: {
          //statCd:'EQ'
        }
      }
    },
    components: {
    },
    methods: {
      // 每行排序显示
      indexMethod (index) {
        return this.pageSize * (this.pageNo - 1) + index + 1
      },
      childHandle (id,juryId,batch,statCd) {
        var params = {'id': id,'juryId':juryId,'batch': batch,'statCd':statCd}
        return this.$router.push({name: 'rsjReview-user', params: params})
      }
    }
  }
</script>
