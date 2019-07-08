<template>
  <div class="mod-procdef">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="listData()">
      <el-form-item>
        <el-input v-model="dataForm.id" placeholder="定义ID" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="dataForm.name" placeholder="定义名称" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="dataForm.key" placeholder="定义KEY" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="dataForm.resourceName" placeholder="XML资源名称" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" @click="listData()">查询</el-button>
        <el-button size="small" type="primary" @click="deployHandle()">部署流程资源</el-button>
        <el-button size="small" type="danger" @click="delHandle()" :disabled="dataListSelections.length <= 0">删除</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="dataList" border stripe v-loading="dataListLoading" :max-height="tableHeight" 
            @selection-change="selectionChangeHandle" @sort-change="sortChangeHandle" style="width: 100%;">
      <el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>
      <el-table-column prop="id" label="定义ID" header-align="center" align="center"></el-table-column>
      <el-table-column prop="deploymentId" label="部署ID" header-align="center" align="center" width="120"></el-table-column>
      <el-table-column prop="name" label="定义名称" header-align="center" align="center"></el-table-column>
      <el-table-column prop="key" label="定义KEY" header-align="center" align="center" width="120"></el-table-column>
      <el-table-column prop="version" label="版本号" header-align="center" align="center" width="100"></el-table-column>
      <el-table-column prop="diagramResourceName" label="图片资源名称" header-align="center" align="center">
        <template slot-scope="scope">
          <el-button size="small" type="text" @click="diagramResourceHandle(scope.row.id, 'png')">{{ scope.row.diagramResourceName | getFilename }}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="resourceName" label="XML资源名称" header-align="center" align="center">
        <template slot-scope="scope">
          <el-button size="small" type="text" @click="readResourceHandle(scope.row.id, 'xml')">{{ scope.row.resourceName | getFilename }}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="suspended" label="状态" header-align="center" align="center" width="100">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.suspended" size="small" type="warning">暂停</el-tag>
          <el-tag v-else size="small" type="info">正常</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" header-align="center" align="center" width="60">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="delHandle(scope.row.deploymentId)" icon="el-icon-delete" title="删除"></el-button>
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
    <!-- 弹窗, 部署 -->
    <deploy v-if="deployVisible" ref="deploy" @refreshDataList="listData"></deploy>
    <!-- 弹窗, 资源查看 -->
    <resource v-if="resourceVisible" ref="resource"></resource>
  </div>
</template>

<script>
  import deploy from './procdef-deploy'
  import resource from './procdef-resource'
  import grid from '@/mixins/grid'
  import { baseUrl } from '@/utils/index'
  export default {
    mixins: [grid],
    data () {
      return {
        resourceVisible: false,
        deployVisible: false,
        module: '/act/procdef/',
        gridOptions: {
          isQuery: false,
          delKey: 'deploymentId'
        },
        dataForm: {}
      }
    },
    components: {
      deploy, resource
    },
    filters: {
      getFilename (resource) {
        var pos = resource.lastIndexOf('\\')
        if (pos === -1) {
          pos = resource.lastIndexOf('/')
        }
        return resource.substring(pos + 1)
      }
    },
    methods: {
      deployHandle () {
        this.deployVisible = true
        this.$nextTick(() => {
          this.$refs.deploy.init()
        })
      },
      diagramResourceHandle (id, type) {
        this.resourceVisible = true
        this.$nextTick(() => {
          this.$refs.resource.url = baseUrl() + '/act/procdef/readResource?pdId=' + id + '&resType=' + type
          this.$refs.resource.init()
        })
      },
      readResourceHandle (id, type) {
        window.open(baseUrl() + '/act/procdef/readResource?pdId=' + id + '&resType=' + type)
        // this.resourceVisible = true
        // this.$nextTick(() => {
        //   this.$refs.resource.url = baseUrl() + '/act/procdef/readResource?pdId=' + id + '&resType=' + type
        //   this.$refs.resource.init()
        // })
      }
    }
  }
</script>
