<template>
  <div class="mod-expertReview">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="listData()">
      <el-form-item>
        <el-input v-model="dataForm.userName" placeholder="请输入姓名" clearable></el-input>
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
    </el-form>
    <el-table :data="dataList" border stripe v-loading="dataListLoading" :max-height="tableHeight"
              @selection-change="selectionChangeHandle" @sort-change="sortChangeHandle" style="width: 100%;">
      <el-table-column type="index" :index="indexMethod" prop="sort" width="100" label="序号" header-align="center"
                       align="center"></el-table-column>
      <el-table-column prop="userName" label="姓名" header-align="center" align="center" width="70"></el-table-column>
      <el-table-column prop="juryName" label="所属评委会" header-align="center" align="center"
                       width="auto"></el-table-column>
      <el-table-column prop="proNm" label="专业名称" header-align="center" align="center" width="auto"></el-table-column>
      <el-table-column prop="quaNm" label="资格名称" header-align="center" align="center" width="auto"></el-table-column>
      <el-table-column prop="lvlNm" label="级别名称" header-align="center" align="center" width="auto"></el-table-column>
      <el-table-column prop="serNm" label="所属系列" header-align="center" align="center" width="auto"></el-table-column>
      <el-table-column prop="mob" label="联系电话" header-align="center" align="center" width="auto"></el-table-column>
      <el-table-column prop="statNm" label="评审状态" header-align="center" align="center" width="90"></el-table-column>
      <el-table-column label="操作" fixed="right" header-align="center" align="center" width="auto">
        <template slot-scope="scope">
          <el-button v-if="$hasPerm('job:expertReview:upd')" type="text" size="small"
                     @click="audit(scope.row.declareId,scope.row.id)"
                     title="审核">审核
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
  </div>
</template>

<script>
  import grid from '@/mixins/grid'

  export default {
    mixins: [grid],
    data() {
      return {
        module: '/job/expertReview/',
        gridOptions: {
          listUrl: '/job/expertReview/pageSelf'
        },
        series: [{cd: '', nm: '——请选择系列——'}],
        pros: [{cd: '', nm: '——请选择专业——'}],
        lvls: [{cd: '', nm: '——请选择级别——'}],
        quas: [{cd: '', nm: '——请选择资格——'}],
        status: [{
          cd: '30070.140.100',
          nm: '——请选择状态——'
        }, {
          cd: '30070.150.100',
          nm: '未审核'
        }, {
          cd: '30070.150.110',
          nm: '弃权'
        }, {
          cd: '30070.150.120',
          nm: '不通过'
        }, {
          cd: '30070.150.130',
          nm: '通过'
        }],
        defOrders: [
          {
            k: 'crtTm',
            t: 'desc'
          }
        ],
        dataForm: {
          statCd: '30070.140.100',
          serCd: '',
          proCd: '',
          lvlCd: '',
          quaCd: ''
        },
        dataMode: {
          statCd: 'GT',
          serCd: 'EQ',
          proCd: 'EQ',
          lvlCd: 'EQ',
          quaCd: 'EQ',
        }
      }
    },
    activated() {
      // 通过路由参数pid, 控制列表请求操作
      this.dataForm.serCd = '';
      this.dataForm.proCd = '';
      this.dataForm.lvlCd = '';
      this.dataForm.quaCd = '';
      this.listData();
      this.getSeries();
    },
    methods: {
      // 每行排序显示
      indexMethod(index) {
        return this.pageSize * (this.pageNo - 1) + index + 1
      },
      search() {
        if (this.dataForm.statCd != '' && this.dataForm.statCd != '30070.140.100')
          this.dataMode.statCd = 'EQ';
        else {
          this.dataForm.statCd = '30070.140.100';
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
      audit(id, reviewId) {
        return this.$router.push({name: 'toDeclare', params: {id: id, reviewId: reviewId}})
      }
    },
    components: {}
  }
</script>
