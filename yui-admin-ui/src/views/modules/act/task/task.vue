<template>
  <div class="mod-task">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="listData()">
      <el-form-item>
        <el-input v-model="dataForm.taskName" placeholder="任务名称" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="dataForm.taskAssignee" placeholder="办理人" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="dataForm.busKey" placeholder="业务KEY" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" @click="listData()">查询</el-button>
        <el-button size="small" type="danger" @click="delHandle()" :disabled="dataListSelections.length <= 0">删除</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="dataList" border stripe v-loading="dataListLoading" :max-height="tableHeight" 
            @selection-change="selectionChangeHandle" @sort-change="sortChangeHandle" style="width: 100%;">
      <el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>
      <el-table-column prop="id" label="任务ID" header-align="center" align="center"></el-table-column>
      <el-table-column prop="name" label="任务名称" header-align="center" align="center"></el-table-column>
      <el-table-column prop="processInstanceId" label="流程实例ID" header-align="center" align="center"></el-table-column>
      <el-table-column prop="processDefinitionId" label="流程定义ID" header-align="center" align="center"></el-table-column>
      <el-table-column prop="assignee" label="办理人" header-align="center" align="center"></el-table-column>
      <el-table-column prop="createTime" label="任务创建时间" header-align="center" align="center"></el-table-column>
      <el-table-column label="操作" fixed="right" header-align="center" align="center" width="100">
        <template slot-scope="scope">
          <el-button v-if="scope.row.assignee && scope.row.assignee !== ''" type="text" size="small" @click="execHandle(scope.row.id)" icon="el-icon-news" title="办理"></el-button>
          <el-button v-else type="text" size="small" @click="claimHandle(scope.row.id)" icon="el-icon-star-on" title="签收"></el-button>
          <el-button type="text" size="small" @click="delHandle(scope.row.id)" icon="el-icon-delete" title="删除"></el-button>
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
        module: '/act/task/',
        gridOptions: {
          isQuery: false,
          listUrl: '/act/task/pageSelf'

        },
        dataForm: {}
      }
    },
    methods: {
      claimHandle (id) {
        var ids = id ? [id] : this.dataListSelections.map(item => {
          return item[id]
        })
        let config = {
          url: '/act/task/claim',
          message: '签收',
          params: {
            ids: ids.join(',')
          }
        }
        this.baseHandle(config)
      },
      execHandle (id) {
        alert('执触发执行任务')
      }
    }
  }
</script>
