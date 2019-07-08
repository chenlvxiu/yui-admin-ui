<template>
  <div class="mod-theory">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="listData()">
      <el-form-item>
        <el-input v-model="dataForm.id" placeholder="主键" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" @click="listData()">查询</el-button>
        <el-button v-if="$hasPerm('job:theory:add')" size="small" type="primary" @click="editHandle()">新增</el-button>
        <el-button v-if="$hasPerm('job:theory:del')" size="small" type="danger" @click="delHandle()" :disabled="dataListSelections.length <= 0">删除</el-button>
        <el-button v-if="$hasPerm('job:theory:expt')" size="small" @click="exptHandle()">导出</el-button>
        <el-button v-if="$hasPerm('job:theory:impt')" size="small" @click="imptHandle()">导入</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="dataList" border stripe v-loading="dataListLoading" :max-height="tableHeight" 
            @selection-change="selectionChangeHandle" @sort-change="sortChangeHandle" style="width: 100%;">
      <el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>
      <el-table-column prop="id" label="主键" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="declareId" label="申报id" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="date" label="日期(年月)" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="name" label="名称" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="content" label="内容摘要" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="info" label="出版、登载获奖或在学术会议上交流情况" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="author" label="合（独）著、译" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="url" label="佐证材料地址" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="catCd" label="类型编码" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="catNm" label="类型" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="statCd" label="状态编码" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="statNm" label="状态" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column label="操作" fixed="right" header-align="center" align="center" width="100">
        <template slot-scope="scope">
          <el-button v-if="$hasPerm('job:theory:info')" type="text" size="small" @click="infoHandle(scope.row.id)" icon="el-icon-document" title="详情"></el-button>
          <el-button v-if="$hasPerm('job:theory:upd')" type="text" size="small" @click="editHandle(scope.row.id)" icon="el-icon-edit" title="编辑"></el-button>
          <el-button v-if="$hasPerm('job:theory:del')" type="text" size="small" @click="delHandle(scope.row.id)" icon="el-icon-delete" title="删除"></el-button>
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
  import edit from './theory-edit'
  import info from './theory-info'
  import impt from './theory-impt'
  import grid from '@/mixins/grid'
  export default {
    mixins: [grid],
    data () {
      return {
        module: '/job/theory/',
        gridOptions: {},
        dataForm: {}
      }
    },
    components: {
      edit, info, impt
    }
  }
</script>
