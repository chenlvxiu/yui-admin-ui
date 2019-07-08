<template>
  <el-dialog title="预览" class="mod-guide-info details"
             :close-on-click-modal="false" :visible.sync="visible">
    <div class="details-inner" v-loading="loading">
      <div class="details-title flex-column">
        <h3 class="details-title-text">{{details.title}}</h3>
        <div class="details-title-desc flex-row">
          <p>发表时间：<span>{{details.crtTm|date}}</span></p>
          <p>来源：<span>{{details.source}}</span></p>
          <p>浏览量：<span>{{details.views}}</span>次</p>
        </div>
      </div>
      <div class="details-content" v-html="details.content">
      </div>
      <div class="details-download" v-if="details.fileDtoList&&details.fileDtoList.length">
        <h4 class="title">附件列表</h4>
        <div class="flex-column">
          <a class="details-download-item flex-row" v-for="(item,key) in details.fileDtoList" :key="key" :href="item.fileUrl" :download="item.name">
            <span class="details-download-item-name">{{key+1}}、{{item.name}}</span>
            <el-button size="mini" >下载</el-button>
          </a>

        </div>
      </div> 
    </div>
    <!-- 审核拒绝 -->
    <audit v-if="auditVisible" ref="audit" @refreshDataList="goBack()"></audit>
    <span v-if="details.statCd==='30070.170.110' || details.statCd==='30070.170.120'" slot="footer" class="dialog-footer">
      <el-button @click="auditPass()">审核通过</el-button>
      <el-button @click="auditRefuse()">审核拒绝</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import audit from './guide-audit'
  export default {
    data() {
      return {
        id: null,
        visible: false,
        auditVisible:false,
        details: {},
        loading: true
      }
    },
    components: {
      audit
    },
    methods: {
      init(id) {
        this.id = id
        this.visible = true
        this.$nextTick(() => {
          if (this.id) {
            this.getInfo()
          }
        })
      },
      view(details) {
        this.loading =false
        this.details = details
        this.visible = true
      },
      // 获取职称申报系统-政策文件表信息
      getInfo() {
        this.$http.get('/job/guide/webInfo?id=' + this.id).then(({data: res}) => {
          this.loading = false
          if (res.code !== 0) {
            return this.$message.error(res.msg)
          }
          this.details = res.data
        }).catch((err) => {
          this.loading = false
          this.$message.error(err)
        })
      },
      auditPass () {
      	this.$confirm(`确认审核通过?`, '提示', {
	        confirmButtonText: '确定',
	        cancelButtonText: '取消',
	        type: 'warning'
	      }).then(() => {
	        if(this.details.statCd==='30070.170.110'){
            this.$http.post('/job/guide/audit',{id:this.id,statCd:'30070.170.120'}).then(({data: res}) => {
              if (res && res.code === 0) {
                this.$message({
                  message: '审核成功',
                  type: 'success',
                  duration: 500,
                  onClose: () => {
                    this.visible = false
                    this.$emit('refreshDataList')
                  }
                })
              } else {
                this.$message.error(res.msg)
              }
            })
          } else if(this.details.statCd==='30070.170.120'){
            this.$http.post('/job/guide/audit',{id:this.id,statCd:'30070.170.140'}).then(({data: res}) => {
              if (res && res.code === 0) {
                this.$message({
                  message: '审核成功',
                  type: 'success',
                  duration: 500,
                  onClose: () => {
                    this.visible = false
                    this.$emit('refreshDataList')
                  }
                })
              } else {
                this.$message.error(res.msg)
              }
            })
          }
	      }).catch(() => {})
        
      },
      auditRefuse () {
      	this.auditVisible = true
        this.$nextTick(() => {
           this.$refs.audit.init(this.id)
        })
      },
      goBack() {
      	  this.visible = false
          this.$emit('refreshDataList')
      }
    }
  }
</script>


<style lang="scss" scoped>
  @import "../../../../assets/scss/pages/infoDetails.scss";
  
</style>
<style>
  .el-dialog__header {
    background-color: rgba(242, 242, 242, 1);
    color: white;
    text-align: center;
    font-family: "微软雅黑";
    font-size: 20px;
    font-weight:600;
    margin-bottom: 10px;
  }
  
  .el-dialog__footer {
    text-align:center;
  }
  
  .el-dialog {
    position: absolute;
    top :50%;
    left: 50%;
    margin: 0 !important;
    transform: translate(-50%, -50%);
  }
</style>

