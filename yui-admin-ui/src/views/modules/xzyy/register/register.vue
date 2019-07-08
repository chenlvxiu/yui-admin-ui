<template>
  <div class="mod-register">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="listData()">
      <el-form-item>
        <el-input v-model="dataForm.id" placeholder="主键" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" @click="listData()">查询</el-button>
        <el-button v-if="$hasPerm('xzyy:register:add')" size="small" type="primary" @click="editHandle()">新增</el-button>
        <el-button v-if="$hasPerm('xzyy:register:del')" size="small" type="danger" @click="delHandle()" :disabled="dataListSelections.length <= 0">删除</el-button>
        <el-button v-if="$hasPerm('xzyy:register:expt')" size="small" @click="exptHandle()">导出</el-button>
        <el-button v-if="$hasPerm('xzyy:register:impt')" size="small" @click="imptHandle()">导入</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="dataList" border stripe v-loading="dataListLoading" :max-height="tableHeight"
            @selection-change="selectionChangeHandle" @sort-change="sortChangeHandle" style="width: 100%;">
      <el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>

      <el-table-column prop="name" label="注册姓名" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="identityCard" label="身份证号" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="phone" label="手机号" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="orgaAddr" label="机构地址" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="orgaName" label="机构名称" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="certNum" label="证书编号" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="certType" label="证件类型" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="catCd" label="分类编码" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="catNm" label="分类" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="statCd" label="注册状态编码" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="statNm" label="注册状态" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column label="操作" fixed="right" header-align="center" align="center" width="100">
        <template slot-scope="scope">
          <el-button v-if="$hasPerm('xzyy:register:info')" type="text" size="small" @click="infoHandle(scope.row.id)" icon="el-icon-document" title="详情"></el-button>
          <el-button v-if="$hasPerm('xzyy:register:upd')" type="text" size="small" @click="editHandle(scope.row.id)" icon="el-icon-edit" title="编辑"></el-button>
          <el-button v-if="$hasPerm('xzyy:register:del')" type="text" size="small" @click="delHandle(scope.row.id)" icon="el-icon-delete" title="删除"></el-button>
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
  import edit from './register-edit'
  import info from './register-info'
  import impt from './register-impt'
  import grid from '@/mixins/grid'
  export default {
    mixins: [grid],
    data () {
      return {
        module: '/xzyy/register/',
        gridOptions: {},
        dataForm: {}
      }
    },
    components: {
      edit, info, impt
    }
  }
</script>
