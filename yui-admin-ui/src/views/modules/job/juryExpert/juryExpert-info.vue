<template>
  <div class="mod-juryExpert-info">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="listData()">
      <el-form-item>
        <el-input v-model="dataForm.expertName" placeholder="请输入专家姓名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="dataForm.statCd" placeholder="——请选择状态——">
	        <el-option
	          v-for="item in status"
	          :key="item.cd"
	          :label="item.nm"
	          :value="item.cd">
	        </el-option>
	     </el-select>
      </el-form-item> 
      <el-form-item>
        <el-button size="small" @click="search()">查询</el-button>
        <el-button v-if="$hasPerm('job:expertReview:add')" size="small" type="primary" @click="editHandle()">新增</el-button>
        <el-button v-if="$hasPerm('job:expertReview:del')" size="small" type="danger" @click="delHandle()" :disabled="dataListSelections.length <= 0">删除</el-button>
        <el-button v-if="$hasPerm('job:expertReview:expt')" size="small" @click="exptHandle()">导出</el-button>
        <el-button v-if="$hasPerm('job:expertReview:impt')" size="small" @click="imptHandle()">导入</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="dataList" border stripe v-loading="dataListLoading" :max-height="tableHeight" 
            @selection-change="selectionChangeHandle" @sort-change="sortChangeHandle" style="width: 100%;">
      <el-table-column type="index" :index="indexMethod" prop="sort" width="100" label="序号" header-align="center" align="center"></el-table-column>
      <el-table-column prop="expertName" label="专家姓名" header-align="center" align="center"></el-table-column>  
      <el-table-column prop="card" label="身份证号" header-align="center" align="center"></el-table-column>    
      <el-table-column prop="statNm" label="评审结果" header-align="center" align="center"></el-table-column>     
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
        module: '/job/expertReview/',
        gridOptions: {},
        status: [{
          cd: '30070.150.110',
          nm: '——请选择状态——'
        }, {
          cd: '30070.150.120',
          nm: '不通过'
        }, {
          cd: '30070.150.130',
          nm: '通过'
        }],
        defOrders: [
          {
            k:'crtTm',
            t:'desc'
          }
        ],
        dataForm: {
          declareId:null,
          statCd:'30070.150.110'
        },
        dataMode: {
          declareId:'EQ',
          statCd : 'GT'
        }
      }
    },
    activated() {
      // 通过路由参数pid, 控制列表请求操作
      if(!this.dataForm.declareId || (this.$route.params.id!=undefined && this.dataForm.declareId!=this.$route.params.id)) {
            this.dataForm.declareId = this.$route.params.id;
      }
    
      this.listData();
    },
    components: {

    },
     methods: {
      search() {
        if(this.dataForm.statCd != '' &&　this.dataForm.statCd != '30070.150.110')
            this.dataMode.statCd = 'EQ';
        else {
        	this.dataForm.statCd = '30070.150.110';
        	this.dataMode.statCd = 'GT';
        }
      	this.listData()
      },
      // 每行排序显示
      indexMethod (index) {
        return this.pageSize * (this.pageNo - 1) + index + 1
      }
    }
  }
</script>
