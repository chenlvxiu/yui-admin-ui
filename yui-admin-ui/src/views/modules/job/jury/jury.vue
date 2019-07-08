<template>
  <div class="mod-jury">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="listData()">
      <el-form-item>
        <el-input v-model="dataForm.name" placeholder="请输入评为会名称" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="dataForm.number" placeholder="请输入编号" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="dataForm.contact" placeholder="联系人" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="dataForm.areaCd" placeholder="——请选择所属区县市——">
          <el-option
            v-for="item in statList"
            :key="item.cd"
            :label="item.nm"
            :value="item.cd">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="dataForm.lvlCd" placeholder="——请选择所属级别——">
          <el-option
            v-for="item in lvlList"
            :key="item.cd"
            :label="item.nm"
            :value="item.cd">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button size="small" @click="listData()">查询</el-button>
        <el-button v-if="$hasPerm('job:jury:add')" size="small" type="primary" @click="childHandle(null)">新增</el-button>
        <!--
        <el-button v-if="$hasPerm('job:jury:del')" size="small" type="danger" @click="delHandle()" :disabled="dataListSelections.length <= 0">删除</el-button>
        <el-button v-if="$hasPerm('job:jury:expt')" size="small" @click="exptHandle()">导出</el-button>
        <el-button v-if="$hasPerm('job:jury:impt')" size="small" @click="imptHandle()">导入</el-button>
      	-->
      </el-form-item>
    </el-form>
    <el-table :data="dataList" border v-loading="dataListLoading" :max-height="tableHeight"
              @selection-change="selectionChangeHandle" @sort-change="sortChangeHandle" style="width: 100%;">
      <!--<el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>-->
      <el-table-column type="index" :index="indexMethod" prop="sort" width="100" label="序号" header-align="center"
                       align="center"></el-table-column>
      <el-table-column prop="name" label="评委会名称" header-align="center" align="center"></el-table-column>
      <el-table-column prop="number" label="编号" header-align="center" align="center"></el-table-column>
      <el-table-column prop="contact" label="联系人" header-align="center" align="center"></el-table-column>
      <el-table-column prop="mob" label="手机号码" header-align="center" align="center"></el-table-column>
      <el-table-column prop="areaNm" label="所属区（县）市" header-align="center" align="center"></el-table-column>
      <el-table-column prop="lvlNm" label="级别" header-align="center" align="center"></el-table-column>
      <el-table-column label="操作" fixed="right" header-align="center" align="center" width="100">
        <template slot-scope="scope">
          <!--<el-button v-if="$hasPerm('job:jury:info')" type="text" size="small" @click="infoHandle(scope.row.id)" icon="el-icon-document" title="详情"></el-button>-->
          <el-button v-if="$hasPerm('job:jury:upd')" type="text" size="small" @click="childHandle(scope.row.id)"
                     title="编辑">编辑
          </el-button>
          <el-button v-if="$hasPerm('job:jury:del')" type="text" size="small" @click="delHandle(scope.row.id)"
                     title="删除">删除
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
    <!-- 弹窗, 新增 / 修改 -->
    <edit v-if="editVisible" ref="edit" @refreshDataList="listData"></edit>
    <!-- 弹窗, 详情 -->
    <info v-if="infoVisible" ref="info"></info>
    <!-- 弹窗, 导入 -->
    <impt v-if="imptVisible" ref="impt" @refreshDataList="listData"></impt>
  </div>
</template>

<script>
  import edit from './jury-edit'
  import info from './jury-info'
  import impt from './jury-impt'
  import grid from '@/mixins/grid'

  export default {
    mixins: [grid],
    data() {
      return {
        module: '/job/jury/',
        gridOptions: {},
        defOrders: [
          {
            k: 'crtTm',
            t: 'desc'
          }
        ],
        statList: [{cd: '', nm: '——请选择所属区县市——'}],
        lvlList: [{cd: '', nm: '——请选择级别——'}],
        dataForm: {}
      }
    },
    components: {
      edit, info, impt
    },
    activated() {
      this.statList = [{cd: '', nm: '——请选择所属区县市——'}]
      this.lvlList = [{cd: '', nm: '——请选择级别——'}]
      this.getStat();
      this.getLvl();
    },
    methods: {
      getStat() {
        this.$http.get('/sys/cat/listByPrntCd?prntCd=30060.130').then(({data: res}) => {
          if (res.code !== 0) {
            return this.$message.error(res.msg)
          }
          this.statList = this.statList.concat(res.data.list)

        }).catch(() => {
        })
      },
      getLvl() {
        this.$http.get('/sys/cat/listByPrntCd?prntCd=30060.190').then(({data: res}) => {
          if (res.code !== 0) {
            return this.$message.error(res.msg)
          }
          this.lvlList = this.lvlList.concat(res.data.list)
        }).catch(() => {
        })
      },
      // 每行排序显示
      indexMethod(index) {
        return this.pageSize * (this.pageNo - 1) + index + 1
      },
      childHandle(id) {
        var params = {'id': id}
        if (!id) {
          return this.$router.push({name: 'jury-add', params: params})
        } else {
          return this.$router.push({name: 'jury-edit', params: params})
        }
      }
    }
  }
</script>
