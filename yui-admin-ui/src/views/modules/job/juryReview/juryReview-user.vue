<template>
  <div class="mod-juryReview-user">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="listData()">
      {{$route.params.bbstatNm}}
      <el-form-item>
        <el-input v-model="dataForm.name" placeholder="请输入姓名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="dataForm.serCd" @change="serChange()" placeholder="——请选择所属系列——">
          <el-option
            v-for="item in series"
            :key="item.cd"
            :label="item.nm"
            :value="item.cd">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="dataForm.proCd" @change="proChange()" placeholder="——请选择专业名称——">
          <el-option
            v-for="item in pros"
            :key="item.cd"
            :label="item.nm"
            :value="item.cd">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="dataForm.lvlCd" @change="lvlChange()" placeholder="——请选择级别名称——">
          <el-option
            v-for="item in lvls"
            :key="item.cd"
            :label="item.nm"
            :value="item.cd">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="dataForm.quaCd" placeholder="——请选择资格名称——">
          <el-option
            v-for="item in quas"
            :key="item.cd"
            :label="item.nm"
            :value="item.cd">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="dataForm.statCd" placeholder="——请选择状态——">
          <el-option
            v-for="item in status"
            :key="item.cd"
            :label="item.nm"
            :value="item.cd">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button size="small" @click="search()">查询</el-button>
      </el-form-item>
      <el-form-item>
        <!--<el-button size="small" @click="expt()">导出</el-button>-->
        <el-dropdown :hide-on-click="false">
  <span class="el-dropdown-link">
    导出<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="expertAll()">全部导出</el-dropdown-item>
            <el-dropdown-item :disabled="dataListSelections.length <= 0" @click.native="expertPart()">部分导出
            </el-dropdown-item>
          </el-dropdown-menu>

          <!--<el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="expt(id)">全部导出</el-dropdown-item>
            <el-dropdown-item :disabled="dataListSelections.length <= 0" @click.native="expt()">部分导出</el-dropdown-item>
          </el-dropdown-menu>-->
        </el-dropdown>
        <el-dialog
          title="选择导出样表"
          :visible.sync="expertDialog"
          width="30%"
          center>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="expt(1)">评前公示</el-button>
            <el-button type="primary" @click="expt(2)">评后公示</el-button>
            <el-button type="primary" @click="expt(3)">结果公布</el-button>
          </span>
        </el-dialog>
      </el-form-item><!--区县市和终审通过才可以转送-->
      <el-form-item v-if="areaCd!='30060.130.100' && areaCd!='30060.130.105' && statCd=='30070.130.134'">
        <el-button size="small" @click="trans()">转送</el-button>
      </el-form-item>
      <el-form-item
        v-if="$hasPerm('job:juryReview:upd') && $hasPerm('job:declare:isJuryAudit') && ( statCd=='30070.130.100'||statCd=='30070.130.130'||statCd=='30070.130.136')">
        <!--初审中和复审不通过状态才显示-->
        <el-button size="small" @click="submitReview()">提交复审</el-button>
      </el-form-item>
      <el-form-item v-if="$hasPerm('job:juryReview:upd') && statCd=='30070.130.134'"> <!--终审通过状态才显示-->
        <el-button size="small" @click="pubbefHandle()">评前公示</el-button>
      </el-form-item>
      <el-form-item v-if="$hasPerm('job:juryReview:upd') && statCd=='30070.130.150'"> <!--专家评审状态才显示-->
        <el-button size="small" @click="expertReview()">专家评审</el-button>
      </el-form-item>
      <el-form-item v-if="$hasPerm('job:juryReview:upd') && statCd=='30070.130.160'"> <!--评审结束状态才显示 -->
        <el-button size="small" @click="pubaftHandle()">评后公示</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="dataList" border stripe v-loading="dataListLoading" :max-height="tableHeight"
              @selection-change="selectionChangeHandle" @sort-change="sortChangeHandle" style="width: 100%;">
      <el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>
      <el-table-column prop="submitTm" label="提交时间" header-align="center" align="center" width="auto"></el-table-column>
      <el-table-column prop="name" label="姓名" header-align="center" align="center" width="70"></el-table-column>
      <el-table-column prop="oldJury" label="所属评委会" header-align="center" align="center"
                       width="auto"></el-table-column>
      <el-table-column prop="proNm" label="专业名称" header-align="center" align="center" width="auto"></el-table-column>
      <el-table-column prop="quaNm" label="资格名称" header-align="center" align="center" width="auto"></el-table-column>
      <el-table-column prop="lvlNm" label="级别名称" header-align="center" align="center" width="auto"></el-table-column>
      <el-table-column prop="serNm" label="所属系列" header-align="center" align="center" width="auto"></el-table-column>
      <el-table-column prop="mob" label="联系电话" header-align="center" align="center" width="auto"></el-table-column>
      <el-table-column prop="statNm" label="状态" header-align="center" align="center" width="70"></el-table-column>
      <el-table-column label="操作" fixed="right" header-align="center" align="center" width="auto">
        <template slot-scope="scope">
          <el-button v-if="$hasPerm('job:declare:audit')" type="text" size="small"
                     @click="childHandle(scope.row.id,scope.row.juryId)"
                     title="审核">审核
          </el-button>
          <el-button v-if="$hasPerm('job:declare:info') && scope.row.statCd == '30070.100.130'" type="text" size="small"
                     @click="infoHandle(scope.row.id)" title="查看原因">查看原因
          </el-button>
          <el-button v-if="$hasPerm('job:log:page')" type="text" size="small"
                     @click="logHandle(scope.row.id, scope.row.name)" title="记录">记录
          </el-button>
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
    <!-- 查看原因 -->
    <info v-if="infoVisible" ref="info"></info>
    <!-- 评前公示 -->
    <pubbef v-if="pubbefVisible" ref="pubbef" @refreshDataList="refreshStat"></pubbef>
    <!-- 评后公示 -->
    <pubaft v-if="pubaftVisible" ref="pubaft" @refreshDataList="refreshStat"></pubaft>
  </div>
</template>

<script>
  import info from './juryReview-user-info'
  import pubbef from './juryReview-pubbef'
  import pubaft from './juryReview-pubaft'
  import grid from '@/mixins/grid'
  import query from '@/utils/query'
  import * as index from '@/utils/index'

  export default {
    mixins: [grid],
    data() {
      return {
        module: '/job/declare/',
        gridOptions: {
          isAct: false
        },
        id: null,
        query: null,
        expertDialog: false,
        exptAll: true,
        pubbefVisible: false,
        pubaftVisible: false,
        statCd: '',
        areaCd: '',
        series: [{cd: '', nm: '——请选择系列——'}],
        pros: [{cd: '', nm: '——请选择专业——'}],
        lvls: [{cd: '', nm: '——请选择级别——'}],
        quas: [{cd: '', nm: '——请选择资格——'}],
        status: [{
          cd: '30070.100.110',
          nm: '——请选择状态——'
        }, {
          cd: '30070.100.120',
          nm: '待审核'
        }, {
          cd: '30070.100.130',
          nm: '不通过'
        }, {
          cd: '30070.100.140',
          nm: '通过'
        }],
        defOrders: [
          {
            k: 'submitTm',
            t: 'desc'
          }
        ],
        dataForm: {
          statCd: '30070.100.110',
          juryId: '',
          batch: '',
          serCd: '',
          proCd: '',
          lvlCd: '',
          quaCd: ''
        },
        dataMode: {
          statCd: 'GT',
          juryId: 'EQ',
          batch: 'EQ',
          serCd: 'EQ',
          proCd: 'EQ',
          lvlCd: 'EQ',
          quaCd: 'EQ',
        }
      }
    },
    activated() {
      // 通过路由参数pid, 控制列表请求操作
      if (!this.id || (this.$route.params.id != undefined && this.id != this.$route.params.id)) {
        this.id = this.$route.params.id;
        this.dataForm.juryId = this.$route.params.juryId;//评委会id
        this.dataForm.batch = this.$route.params.batch;//批次号
        this.statCd = this.$route.params.statCd;//评委会初审状态
        this.areaCd = this.$route.params.areaCd;//评委会所属区县市
      }

      this.dataForm.serCd = '';
      this.dataForm.proCd = '';
      this.dataForm.lvlCd = '';
      this.dataForm.quaCd = '';
      console.log(this.dataForm.juryId)
      console.log(this.dataForm.batch)
      console.log(this.areaCd)
      this.listData();
      this.getSeries();
    },
    computed: {
      textarea: {
        get() {
          return this.$store.state.user.explain
        },
      }
    },
    methods: {
      search() {
        if (this.dataForm.statCd != '' && this.dataForm.statCd != '30070.100.110')
          this.dataMode.statCd = 'EQ';
        else {
          this.dataForm.statCd = '30070.100.110';
          this.dataMode.statCd = 'GT';
        }
        this.listData()
      },
      // 获取职称申报系统-专业系列
      getSeries() {
        this.series = [{cd: '', nm: '——请选择系列——'}]
        this.$http.get('/sys/cat/listByPrntCd?prntCd=30050').then(({data: res}) => {
          if (res.code !== 0) {
            return this.$message.error(res.msg)
          }

          this.series = this.series.concat(res.data.list)

        }).catch(() => {
        })
      },
      // 获取职称申报系统-专业列表
      getPros() {

        this.pros = [{cd: '', nm: '——请选择专业——'}];
        this.$http.get('/sys/cat/listByPrntCd?prntCd=' + this.dataForm.serCd).then(({data: res}) => {
          if (res.code !== 0) {
            return this.$message.error(res.msg)
          }

          this.pros = this.pros.concat(res.data.list)

        }).catch(() => {
        })
      },
      // 获取职称申报系统-级别列表
      getLvls() {

        this.lvls = [{cd: '', nm: '——请选择级别——'}];
        this.$http.get('/sys/cat/listByPrntCd?prntCd=' + this.dataForm.proCd).then(({data: res}) => {
          if (res.code !== 0) {
            return this.$message.error(res.msg)
          }

          this.lvls = this.lvls.concat(res.data.list)
        }).catch(() => {
        })
      },
      // 获取职称申报系统-资格列表
      getQuas() {

        this.quas = [{cd: '', nm: '——请选择资格——'}];
        this.$http.get('/sys/cat/listByPrntCd?prntCd=' + this.dataForm.lvlCd).then(({data: res}) => {
          if (res.code !== 0) {
            return this.$message.error(res.msg)
          }

          this.quas = this.quas.concat(res.data.list)
        }).catch(() => {
        })
      },
      serChange() {
        this.dataForm.proCd = '';
        this.pros = [{cd: '', nm: '——请选择专业——'}];
        this.dataForm.lvlCd = '';
        this.lvls = [{cd: '', nm: '——请选择级别——'}];
        this.dataForm.quaCd = '';
        this.quas = [{cd: '', nm: '——请选择资格——'}];
        if (this.dataForm.serCd != '')
          this.getPros();
      },
      proChange() {
        this.dataForm.lvlCd = '';
        this.lvls = [{cd: '', nm: '——请选择级别——'}];
        this.dataForm.quaCd = '';
        this.quas = [{cd: '', nm: '——请选择资格——'}];
        if (this.dataForm.proCd != '')
          this.getLvls();
      },
      lvlChange() {
        this.dataForm.quaCd = '';
        this.quas = [{cd: '', nm: '——请选择资格——'}];
        if (this.dataForm.lvlCd != '')
          this.getQuas();
      },
      submitReview() {
        this.$http.get('/job/declare/isJuryAudit?batch=' + this.dataForm.batch).then(({data: res}) => {
          if (res && res.code === 0) {
            if (res.data.result == false)
              return this.$message.error('至少需要1名通过或不通过人员才能提交复审!')
            else {
              this.$confirm(`确认将审核过的人员提交市人社局进行复审?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                // console.log(555555, this.textarea)
                if (this.areaCd === '30060.130.105' || this.areaCd === '30060.130.100') {
                  this.$http.post('/job/juryReview/upd', {
                    id: this.id,
                    statCd: '30070.130.132',
                    exp: this.textarea
                  }).then(({data: res}) => {
                    if (res && res.code === 0) {
                      this.$message({
                        message: '提交复审成功',
                        type: 'success',
                        duration: 500,
                        onClose: () => {
                          this.statCd = '30070.130.132';
                          //this.listData()
                        }
                      })
                    }
                    else {
                      this.$message.error(res.msg)
                    }
                  })
                } else {
                  this.$http.post('/job/juryReview/upd', {
                    id: this.id,
                    statCd: '30070.130.110',
                    exp: this.textarea
                  }).then(({data: res}) => {
                    if (res && res.code === 0) {
                      this.$message({
                        message: '提交复审成功',
                        type: 'success',
                        duration: 500,
                        onClose: () => {
                          this.statCd = '30070.130.110';
                          //this.listData()
                        }
                      })
                    }
                    else {
                      this.$message.error(res.msg)
                    }
                  })
                }

              }).catch(() => {
              })
            }
          }
          else
            return this.$message.error(res.msg)

        }).catch(() => {
        })

      },
      expertAll() {
        this.expertDialog = true;
        this.exptAll = true;
      },
      expertPart() {
        this.expertDialog = true;
        this.exptAll = false;
      },
      expt(type) {
        let ids = this.exptAll ? null : this.dataListSelections.map(item => {
          return item[this.gridOptions.delKey]
        })
        this.query = query.new();
        query.toW(this.query, 'statCd', '30070.100.130', 'GE')
        query.toW(this.query, 'batch', this.dataForm.batch, 'EQ')
        query.toW(this.query, 'juryId', this.dataForm.juryId, 'EQ')
        let url = index.baseUrl() + '/job/declare/expt?type=' + type + '&query=' + encodeURIComponent(query.toJsonStr(this.query));
        if (null != ids) {
          url = index.baseUrl() + '/job/declare/expt?type=' + type + '&ids=' + ids.join(',');
        }
        window.open(url);
        /*this.$confirm(`确定导出?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        }).catch(() => {
        })*/
      },
      trans() {
        var params = {'juryId': this.dataForm.juryId, 'batch': this.dataForm.batch}
        return this.$router.push({name: 'juryReview-trans', params: params})
      },
      //评前公示
      pubbefHandle() {
        this.pubbefVisible = true
        this.$nextTick(() => {
          this.$refs.pubbef.init(this.id)
        })
      },
      //评后公示
      pubaftHandle() {
        this.pubaftVisible = true
        this.$nextTick(() => {
          this.$refs.pubaft.init(this.id)
        })
      },
      // 获取职称申报系统-评委会申报批次评审表信息
      getInfo() {
        this.$http.get('/job/juryReview/info/' + this.id).then(({data: res}) => {
          if (res.code !== 0) {
            return this.$message.error(res.msg)
          }
          this.statCd = res.data.statCd;
        }).catch(() => {
        })
      },
      //评前、评后操作刷新
      refreshStat() {
        if (this.id) {
          this.getInfo();
        }
      },
      //专家评审跳转
      expertReview() {
        return this.$router.push({name: 'juryExpert'})
      },
      logHandle(id, name) {
        var params = {'id': id, 'name': name}
        return this.$router.push({name: 'juryReview-log', params: params})
      },
      childHandle(id) {
        return this.$router.push({name: 'toDeclare', params: {id: id}})
      },

    },
    components: {
      info, pubbef, pubaft
    }
  }
</script>
<style>
  .el-dialog__header {
    background-color: rgba(242, 242, 242, 1);
    color: white;
    text-align: center;
    font-family: "微软雅黑";
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 10px;
  }

  .el-dialog__footer {
    text-align: center;
  }

  .data_input {
    margin-right: 60px !important;
  }

  .el-dialog {
    position: absolute;
    top: 50%;
    left: 50%;
    margin: 0 !important;
    transform: translate(-50%, -50%);
  }

</style>
