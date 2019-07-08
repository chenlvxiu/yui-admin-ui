<template>
  <div class="mod-model">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="listData()">
      <el-form-item>
        <el-input v-model="dataForm.name" placeholder="名称" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="dataForm.id" placeholder="id" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="dataForm.deploymentId" placeholder="部署ID" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" @click="listData()">查询</el-button>
        <el-button size="small" type="primary" @click="editSourceHandle()">新建流程</el-button>
        <el-button size="small" type="danger" @click="delHandle()" :disabled="dataListSelections.length <= 0">删除</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="dataList" border stripe v-loading="dataListLoading" :max-height="tableHeight" 
            @selection-change="selectionChangeHandle" @sort-change="sortChangeHandle" style="width: 100%;">
      <el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>
      <el-table-column prop="id" label="ID" header-align="center" align="center"></el-table-column>
      <el-table-column prop="name" label="名称" header-align="center" align="center"></el-table-column>
      <el-table-column prop="revision" label="更新版本" header-align="center" align="center"></el-table-column>
      <el-table-column prop="deploymentId" label="部署ID" header-align="center" align="center"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" header-align="center" align="center"></el-table-column>
      <el-table-column prop="lastUpdateTime" label="更新时间" header-align="center" align="center"></el-table-column>
      <el-table-column label="操作" fixed="right" header-align="center" align="center" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="infoHandle(scope.row.id)" icon="el-icon-document" title="详情"></el-button>
          <el-button type="text" size="small" @click="editSourceHandle(scope.row.id)" icon="el-icon-edit-outline" title="画流程"></el-button>
          <el-button type="text" size="small" @click="deployHandle(scope.row.id)" icon="el-icon-star-on" title="发布"></el-button>
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
    <info v-if="infoVisible" ref="info"></info>
  </div>
</template>

<script>
  import info from './model-info'
  import grid from '@/mixins/grid'
  export default {
    mixins: [grid],
    data () {
      return {
        module: '/act/model/',
        gridOptions: {
          isQuery: false
        },
        dataForm: {}
      }
    },
    components: {
      info
    },
    methods: {
      editSourceHandle (id) {
        if (id) {
          window.open(window.SITE_CONFIG.baseUrl + '/flowable/modeler.html?modelId=' + id)
        } else {
          let config = {
            url: '/act/model/add',
            message: '新建流程',
            params: {},
            success (res) {
              top.location.href = window.SITE_CONFIG.baseUrl + '/flowable/modeler.html?modelId=' + res.data
            }
          }
          this.baseHandle(config)
        }
      },
      deployHandle (id) {
        let config = {
          url: '/act/model/deploy/' + id,
          message: '流程发布'
        }
        this.baseHandle(config)
      }
    }
  }
</script>
