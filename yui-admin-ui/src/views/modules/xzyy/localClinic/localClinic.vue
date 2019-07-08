<template>
  <div class="mod-localClinic">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="listData()">
      <el-form-item>
        <el-input v-model="dataForm.id" placeholder="主键" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" @click="listData()">查询</el-button>
        <el-button v-if="$hasPerm('xzyy:localClinic:add')" size="small" type="primary" @click="editHandle()">新增</el-button>
        <el-button v-if="$hasPerm('xzyy:localClinic:del')" size="small" type="danger" @click="delHandle()" :disabled="dataListSelections.length <= 0">删除</el-button>
        <el-button v-if="$hasPerm('xzyy:localClinic:expt')" size="small" @click="exptHandle()">导出</el-button>
        <el-button v-if="$hasPerm('xzyy:localClinic:impt')" size="small" @click="imptHandle()">导入</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="dataList" border stripe v-loading="dataListLoading" :max-height="tableHeight" 
            @selection-change="selectionChangeHandle" @sort-change="sortChangeHandle" style="width: 100%;">
      <el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>
      <el-table-column prop="id" label="" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="regdId" label="挂号记录外键" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="patientId" label="患者ID" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="patientName" label="" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="doctorId" label="接诊医生ID" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="doctorName" label="医生姓名" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="complaint" label="主诉" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="diagnoseResults" label="诊断" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="catCd" label="分类编码" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="catNm" label="分类名称" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="statCd" label="申报状态编码" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="statNm" label="申报状态" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column label="操作" fixed="right" header-align="center" align="center" width="100">
        <template slot-scope="scope">
          <el-button v-if="$hasPerm('xzyy:localClinic:info')" type="text" size="small" @click="infoHandle(scope.row.id)" icon="el-icon-document" title="详情"></el-button>
          <el-button v-if="$hasPerm('xzyy:localClinic:upd')" type="text" size="small" @click="editHandle(scope.row.id)" icon="el-icon-edit" title="编辑"></el-button>
          <el-button v-if="$hasPerm('xzyy:localClinic:del')" type="text" size="small" @click="delHandle(scope.row.id)" icon="el-icon-delete" title="删除"></el-button>
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
  import edit from './localClinic-edit'
  import info from './localClinic-info'
  import impt from './localClinic-impt'
  import grid from '@/mixins/grid'
  export default {
    mixins: [grid],
    data () {
      return {
        module: '/xzyy/localClinic/',
        gridOptions: {},
        dataForm: {}
      }
    },
    components: {
      edit, info, impt
    }
  }
</script>
