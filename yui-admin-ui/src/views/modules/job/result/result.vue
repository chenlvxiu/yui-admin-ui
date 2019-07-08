<template>
  <div class="mod-result">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="listData()">
      <el-form-item>
        <el-input v-model="dataForm.title" placeholder="请输入标题" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="dataForm.name" placeholder="请输入发布单位" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="dataForm.source" placeholder="请输入来源" clearable></el-input>
      </el-form-item>
      <el-form-item label="" prop="daterange" class="data_input" :class="{ 'is-required': true }">
          <el-date-picker 
            ref="picker"
            v-model="daterange"
            type="daterange"
            size="small"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
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
        <el-button v-if="$hasPerm('job:result:add')" size="small" type="primary" @click="childHandle(null)">新增</el-button>
        <el-button v-if="$hasPerm('job:result:expt')" size="small" @click="exptHandle()">导出</el-button>
        <el-button v-if="$hasPerm('job:result:impt')" size="small" @click="imptHandle()">导入</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="dataList" border v-loading="dataListLoading" :max-height="tableHeight" 
            @selection-change="selectionChangeHandle" @sort-change="sortChangeHandle" style="width: 100%;">  
      <el-table-column prop="title" label="标题" header-align="center" align="center"></el-table-column>
      <el-table-column prop="name" label="发布单位" header-align="center" align="center"></el-table-column>
      <el-table-column prop="source" label="来源" header-align="center" align="center"></el-table-column>
      <el-table-column prop="crtTm" label="发布时间" header-align="center" align="center" width="100"></el-table-column>
      <el-table-column prop="views" label="浏览量" header-align="center" align="center" width="100"></el-table-column>    
      <el-table-column prop="statNm" label="状态" header-align="center" align="center" width="80"></el-table-column>
      <el-table-column label="操作" fixed="right" header-align="center" align="center" width="220">
        <template slot-scope="scope">
          <el-button v-if="$hasPerm('job:result:info')" type="text" size="small" @click="infoHandle(scope.row.id)" title="预览">预览</el-button>
          <!--<el-button v-if="$hasPerm('job:result:audit')" type="text" size="small" @click="infoHandle(scope.row.id)" title="详情">详情</el-button>-->
          <el-button v-if="$hasPerm('job:result:upd') && scope.row.isOwn===1 && scope.row.statCd==='30070.170.130'" type="text" size="small" @click="childHandle(scope.row.id)" title="修改">修改</el-button>
          <el-button v-if="$hasPerm('job:result:info') && scope.row.statCd==='30070.170.130'" type="text" size="small" @click="reasonHandle(scope.row.id)" title="拒绝原因">拒绝原因</el-button>
          <el-button v-if="$hasPerm('job:result:del') && scope.row.isOwn===1" type="text" size="small" @click="delHandle(scope.row.id)" title="删除">删除</el-button>
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
     <!-- 弹窗, 详情 -->
    <edit v-if="editVisible" ref="edit"></edit>
    <!-- 弹窗, 详情 -->
    <info v-if="infoVisible" ref="info" @refreshDataList="listData"></info>
     <!-- 拒绝原因 -->
    <reason v-if="reasonVisible" ref="reason"></reason>
    <!-- 弹窗, 导入 -->
    <impt v-if="imptVisible" ref="impt" @refreshDataList="listData"></impt>
  </div>
</template>

<script>
  import info from './result-info'
  import edit from './result-edit'
  import reason from './result-reason'
  import impt from './result-impt'
  import grid from '@/mixins/grid'
  import query from '@/utils/query'
  export default {
    mixins: [grid],
    data () {
      return {
        module: '/job/result/',
        gridOptions: {},
        reasonVisible:false,
        query:null,
        daterange: [],
        status: [{
          cd: '',
          nm: '——请选择状态——'
        }, {
          cd: '30070.170.110',
          nm: '区人社局待审核'
        }, {
          cd: '30070.170.120',
          nm: '市人社局待审核'
        }, {
          cd: '30070.170.130',
          nm: '不通过'
        }, {
          cd: '30070.170.140',
          nm: '通过'
        }],
        defOrders: [
          {
            k:'crtTm',
            t:'desc'
          }
        ],
        dataForm: {
          statCd:''
        }
      }
    },
    methods: {
      search() {
        this.query = query.new()
        if(this.daterange!=undefined && 2 == this.daterange.length && this.daterange[0]!=undefined && this.daterange[1]!=undefined) {
            query.toW(this.query,'crtTm',this.daterange[0]+' 00:00:00','GE')
            query.toW(this.query,'crtTm',this.daterange[1]+' 23:59:59','LE')
        }
        this.listData();
      },
      reasonHandle (id) {
        this.reasonVisible = true
        this.$nextTick(() => {
          this.$refs.reason.init(id)
        })
      },
      childHandle (id) {
        var params = { 'id': id }
        if(!id)
        {
            return this.$router.push({ name: 'result-add', params: params })
        }
        else 
        {
             return this.$router.push({ name: 'result-edit', params: params })
        }
      }
    },
    components: {
      edit, info, impt, reason
    }
  }
</script>
