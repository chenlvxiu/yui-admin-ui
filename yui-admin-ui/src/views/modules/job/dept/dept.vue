<template>
  <div class="mod-dept">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="listData()">
      <el-form-item>
        <el-input v-model="dataForm.name" placeholder="请输入主管部门名称" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="dataForm.number" placeholder="请输入编号" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" @click="listData()">查询</el-button>
        <el-button v-if="$hasPerm('job:dept:add')" size="small" type="primary" @click="childHandle(null)">新增</el-button>
        <!-- <el-button v-if="$hasPerm('job:dept:del')" size="small" type="danger" @click="delHandle()" :disabled="dataListSelections.length <= 0">删除</el-button>
        <el-button v-if="$hasPerm('job:dept:expt')" size="small" @click="exptHandle()">导出</el-button>
        <el-button v-if="$hasPerm('job:dept:impt')" size="small" @click="imptHandle()">导入</el-button> -->
      </el-form-item>
    </el-form>
    <el-table :data="dataList" border  v-loading="dataListLoading" :max-height="tableHeight" 
            @selection-change="selectionChangeHandle" @sort-change="sortChangeHandle" style="width: 100%;">
      <!-- <el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column> -->
      <el-table-column type="index" :index="indexMethod" prop="sort" width="100" label="序号"  header-align="center" align="center"></el-table-column>
      <el-table-column prop="name" label="主管部门名称" header-align="center" align="center"></el-table-column>
      <el-table-column prop="number" label="编号" header-align="center" align="center"></el-table-column>
      <el-table-column prop="contact" label="联系人" header-align="center" align="center"></el-table-column>
      <el-table-column prop="mob" label="手机号码" header-align="center" align="center"></el-table-column>   
      <el-table-column label="操作" fixed="right" header-align="center" align="center" width="100">
        <template slot-scope="scope">
        <!--  <el-button v-if="$hasPerm('job:dept:info')" type="text" size="small" @click="infoHandle(scope.row.id)" icon="el-icon-document" title="详情"></el-button>-->
          <el-button v-if="$hasPerm('job:dept:upd')" type="text" size="small" @click="childHandle(scope.row.id)" title="编辑">编辑</el-button>
          <el-button v-if="$hasPerm('job:dept:del')" type="text" size="small" @click="delHandle(scope.row.id)" title="删除">删除</el-button>
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
    <!-- 弹窗, 新增 / 修改 -->
    <edit v-if="editVisible" ref="edit" @refreshDataList="listData"></edit>
    <!-- 弹窗, 详情 -->
    <info v-if="infoVisible" ref="info"></info>
    <!-- 弹窗, 导入 -->
    <impt v-if="imptVisible" ref="impt" @refreshDataList="listData"></impt>
  </div>
</template>

<script>
  import edit from './dept-edit'
  import info from './dept-info'
  import impt from './dept-impt'
  import grid from '@/mixins/grid'
  export default {
    mixins: [grid],
    data () {
      return {
        module: '/job/dept/',
        gridOptions: {},
        defOrders: [
          {
            k:'crtTm',
            t:'desc'
          }
        ],
        dataForm: {}
      }
    },
    components: {
      edit, info, impt
    },
    methods:{		
      //每行排序显示
      indexMethod (index) {
	      return this.pageSize*(this.pageNo-1)+index+1
      },
      childHandle (id) {

        var params = { 'id': id }
        if(!id)
        {
            return this.$router.push({ name: 'dept-add', params: params })
        }
        else {
             return this.$router.push({ name: 'dept-edit', params: params })
        }
      }
    }
  }
</script>
