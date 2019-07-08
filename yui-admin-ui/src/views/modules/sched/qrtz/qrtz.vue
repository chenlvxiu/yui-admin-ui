<template>
  <div class="mod-qrtz">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="listData()">
      <el-form-item>
        <el-button size="small" @click="listData()">查询</el-button>
        <el-button v-if="$hasPerm('sched:qrtz:add')" size="small" type="primary" @click="editHandle()">添加任务</el-button>
        <!-- <el-button size="small" @click="triggerJobBtn" :disabled="dataListSelections.length <= 0 || dataListSelections.length >1">立即运行一次</el-button>
        <el-button size="small" type="warning" @click="updJobBtn" :disabled="dataListSelections.length <= 0 || dataListSelections.length >1">更新任务</el-button>
        <el-button size="small" type="success" @click="updJobBtn" :disabled="dataListSelections.length <= 0 || dataListSelections.length >1">恢复任务</el-button>
        <el-button size="small" type="warning" @click="updJobBtn" :disabled="dataListSelections.length <= 0 || dataListSelections.length >1">暂停任务</el-button>
        <el-button size="small" type="danger" @click="deleteJobBtn" :disabled="dataListSelections.length <= 0">删除任务</el-button> -->
      </el-form-item>
    </el-form>
    <el-table :data="dataList" border stripe v-loading="dataListLoading" :max-height="tableHeight" 
            @selection-change="selectionChangeHandle" @sort-change="sortChangeHandle" style="width: 100%;">
      <el-table-column prop="jobName" label="任务编码" header-align="center" align="center"></el-table-column>
      <el-table-column prop="jobDesc" label="任务URL" header-align="center" align="center" width="300"></el-table-column>
      <el-table-column prop="cronExpression" label="时间表达式" header-align="center" align="center" width="100"></el-table-column>
      <el-table-column prop="triggerDesc" label="描述" header-align="center" align="center"></el-table-column>
      <el-table-column prop="triggerState" label="状态" header-align="center" align="center" width="80">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.triggerState === 'PAUSED'" size="small" type="warning">暂停</el-tag>
          <el-tag v-else-if="scope.row.triggerState === 'NORMAL'" size="small" type="success">正常</el-tag>
          <el-tag v-else size="small" type="info">{{scope.row.triggerState}}</el-tag>
        </template>

      </el-table-column>
      <el-table-column prop="nextFireTime" label="下次触发时间" header-align="center" align="center" width="140"></el-table-column>
      <el-table-column prop="previousFireTime" label="上次触发时间" header-align="center" align="center" width="140"></el-table-column>
      <el-table-column label="操作" fixed="right" header-align="center" align="center" width="180">
        <template slot-scope="scope">
          <el-button v-if="$hasPerm('sched:qrtz:info')" type="text" size="small" @click="infoHandle(scope.row.jobName, scope.row.jobGroup)" icon="el-icon-document" title="详情"></el-button>
          <el-button v-if="$hasPerm('sched:qrtz:exec')" type="text" size="small" @click="triggerHandle(scope.row.jobName, scope.row.jobGroup)" icon="el-icon-news" title="立刻运行一次"></el-button>
          <el-button v-if="$hasPerm('sched:qrtz:upd')" type="text" size="small" @click="editHandle(scope.row.jobName, scope.row.jobGroup)" icon="el-icon-edit" title="编辑"></el-button>
          <el-button v-if="$hasPerm('sched:qrtz:del')" type="text" size="small" @click="delHandle(scope.row.jobName, scope.row.jobGroup)" icon="el-icon-delete" title="删除"></el-button>
          <el-button v-if="$hasPerm('sched:qrtz:resume')" type="text" size="small" @click="resumeHandle(scope.row.jobName, scope.row.jobGroup)" icon="el-icon-star-on" title="恢复任务"></el-button>
          <el-button v-if="$hasPerm('sched:qrtz:pause')" type="text" size="small" @click="pauseHandle(scope.row.jobName, scope.row.jobGroup)" icon="el-icon-star-off" title="暂定任何"></el-button>
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
  </div>
</template>

<script>
  import edit from './qrtz-edit'
  import info from './qrtz-info'
  import grid from '@/mixins/grid'
  export default {
    mixins: [grid],
    data () {
      return {
        module: '/sched/qrtz/',
        gridOptions: {
          isQuery: false,
          isPage: false,
          listUrl: '/sched/qrtz/listJobs'
        }
      }
    },
    components: {
      edit, info
    },
    methods: {
      // 新增 / 修改
      editHandle (jobName, jobGroup) {
        this.editVisible = true
        this.$nextTick(() => {
          this.$refs.edit.init(jobName, jobGroup)
        })
      },
      // 详情
      infoHandle (jobName, jobGroup) {
        this.infoVisible = true
        this.$nextTick(() => {
          this.$refs.info.init(jobName, jobGroup)
        })
      },
      delHandle (jobName, jobGroup) {
        let config = {
          url: '/sched/qrtz/deleteJob',
          message: '删除',
          params: {
            jobName: jobName,
            jobGroup: jobGroup
          }
        }
        this.baseHandle(config)
      },
      triggerHandle (jobName, jobGroup) {
        let config = {
          url: '/sched/qrtz/triggerJob',
          message: '立刻运行一次',
          params: {
            jobName: jobName,
            jobGroup: jobGroup
          }
        }
        this.baseHandle(config)
      },
      resumeHandle (jobName, jobGroup) {
        let config = {
          url: '/sched/qrtz/resumeJob',
          message: '恢复任务',
          params: {
            jobName: jobName,
            jobGroup: jobGroup
          }
        }
        this.baseHandle(config)
      },
      pauseHandle (jobName, jobGroup) {
        let config = {
          url: '/sched/qrtz/pauseJob',
          message: '暂停任务',
          params: {
            jobName: jobName,
            jobGroup: jobGroup
          }
        }
        this.baseHandle(config)
      }
    }
  }
</script>
