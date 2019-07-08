<template>
  <div class="mod-project">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="listData()">
      <el-form-item>
        <el-input v-model="dataForm.name" placeholder="请输入项目名称" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="dataForm.batch" placeholder="请输入批次号" clearable></el-input>
      </el-form-item>
      <!--<el-form-item>
        <el-date-picker v-model="dataForm.startTm" placeholder="请选择开始时间" clearable></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-date-picker v-model="dataForm.endTm" placeholder="请选择结束时间" clearable></el-date-picker>
      </el-form-item>-->
      <el-form-item>
        <el-select v-model="dataForm.statNm" clearable  placeholder="状态">
          <el-option v-for="item in statList" :value="item.nm" :key="item.nm">{{ item.nm }}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button size="small" @click="listData()">查询</el-button>
        <el-button v-if="$hasPerm('job:project:add')" size="small" type="primary" @click="editHandle()">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="dataList" border stripe v-loading="dataListLoading" :max-height="tableHeight"
            @selection-change="selectionChangeHandle" @sort-change="sortChangeHandle" style="width: 100%;">
      <!--<el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>-->
      <el-table-column prop="name" label="项目名称" header-align="center" align="center"></el-table-column>
      <el-table-column prop="batch" label="批次号" header-align="center" align="center"></el-table-column>
      <el-table-column prop="startTm" label="起始时间(年月日)" header-align="center" align="center"></el-table-column>
      <el-table-column prop="endTm" label="截止时间(年月日)" header-align="center" align="center"></el-table-column>
      <el-table-column prop="statNm" label="当前状态" header-align="center" align="center"></el-table-column>
      <el-table-column label="操作" fixed="right" header-align="center" align="center" width="100">
        <template slot-scope="scope">
          <el-button v-if="$hasPerm('job:project:upd') && scope.row.statCd === '30070.110.100'" type="text" size="small" @click="editHandle(scope.row.id)" title="编辑">编辑</el-button>
          <el-button v-if="$hasPerm('job:project:del') && scope.row.statCd === '30070.110.100'" type="text" size="small" @click="delHandle(scope.row.id)" title="删除">删除</el-button>
          <el-button v-if="$hasPerm('job:project:end') && scope.row.statCd === '30070.110.110'" type="text" size="small" @click="endHandle(scope.row.id)" title="结束">结束</el-button>
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
  import edit from './project-edit'
  import info from './project-info'
  import impt from './project-impt'
  import grid from '@/mixins/grid'
  export default {
    mixins: [grid],
    data () {
      return {
        module: '/job/project/',
        gridOptions: {},
        dataForm: {},
        statList: []
      }
    },
    components: {
      edit, info, impt
    },
    mounted() {
      this.getStat()
    },
    methods: {
      getStat () {
        this.$http.get(`/sys/cat/listByPrntCd?prntCd=30070.110`).then(({data: res}) => {
          this.statList = res.data.list
        }).catch(() => {})
      },
      endHandle (id) {
        this.$confirm(`确定结束?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.get(`/job/project/end?id=${id}`).then(({data: res}) => {
            location.reload()
          }).catch(() => {})
        }).catch(() => {})
      }
    }
  }
</script>
