<template>
  <div class="mod-profession">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="listData()">
      <el-form-item>
      </el-form-item>
    </el-form>
    <el-table :data="dataList" border v-loading="dataListLoading" :max-height="tableHeight" 
            @selection-change="selectionChangeHandle" @sort-change="sortChangeHandle" style="width: 100%;">
      <!-- <el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column> -->
      <table-tree-column prop="nm" 
        treeKey="id"
        parentKey="pid"
        levelKey="level"
        childKey="children"
        label="系列->专业->级别->资格" header-align="center" align="left"></table-tree-column>
      <el-table-column prop="cd" label="编码" header-align="center" align="center"></el-table-column>
      <el-table-column prop="seq" label="显示排序" header-align="center" align="center"></el-table-column>
      <el-table-column prop="busSeq" label="业务排序" header-align="center" align="center"></el-table-column>
      <el-table-column v-if="$hasPerm('sys:cat:upd')" label="操作" fixed="right" header-align="center" align="center" width="100">
        <template slot-scope="scope">
          <el-button v-if="$hasPerm('sys:cat:upd')" type="text" size="small" @click="editHandle(scope.row.id)"  title="编辑">编辑</el-button>
          <el-button v-if="$hasPerm('sys:cat:del')" type="text" size="small" @click="delHandle(scope.row.id)" title="删除">删除</el-button>
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
  </div>
</template>

<script>
  import tableTreeColumn from '@/components/table-tree-column'
  import edit from './profession-edit'
  import grid from '@/mixins/grid'
  export default {
    mixins: [grid],
    data () {
      return {
        module: '/sys/cat/',
        gridOptions: {
          isAct: false,
          isQuery: false,
          isPage: false,
          listUrl: '/sys/cat/listItmTableTreeNode'
        },
        pcd: '',
        pid: null,
        pnm: null,
        params: {
          pid: 4337385711965184
        },
        dataForm: {}
      }
    },
    components: {
      tableTreeColumn, edit
    },
    activated () {
      // 通过路由参数pid, 控制列表请求操作

      this.params.pid = 4337385711965184
      
      this.listData()
    },
    methods: {

    }
  }
</script>
