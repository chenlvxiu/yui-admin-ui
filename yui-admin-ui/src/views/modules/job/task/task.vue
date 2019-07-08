<template>
  <div class="mod-declare">
    <el-button @click="aaa">11</el-button>
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="listData()">
      <!-- <el-form-item>
        <el-input v-model="dataForm.id" placeholder="主键" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" @click="listData()">查询</el-button>
        <el-button v-if="$hasPerm('job:declare:add')" size="small" type="primary" @click="editHandle()">新增</el-button>
         <el-button v-if="$hasPerm('job:declare:del')" size="small" type="danger" @click="delHandle()" :disabled="dataListSelections.length <= 0">删除</el-button>
        <el-button v-if="$hasPerm('job:declare:expt')" size="small" @click="exptHandle()">导出</el-button>
        <el-button v-if="$hasPerm('job:declare:impt')" size="small" @click="imptHandle()">导入</el-button>
      </el-form-item> -->
    </el-form>
    <el-table :data="dataList" border stripe v-loading="dataListLoading" :max-height="tableHeight"
              @selection-change="selectionChangeHandle" @sort-change="sortChangeHandle" style="width: 100%;">
      <!-- <el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column> -->
      <el-table-column fixed type="index" :index="indexMethod" prop="sort" width="100" label="序号" header-align="center"
                       align="center"></el-table-column>
      <el-table-column fixed prop="busData.name" width="120" label="姓名" header-align="center"
                       align="center"></el-table-column>
      <el-table-column prop="busData.sex" width="120" label="性别" header-align="center" align="center"></el-table-column>
      <el-table-column prop="busData.birthTm" width="120" label="出身年月" header-align="center"
                       align="center"></el-table-column>
      <el-table-column prop="busData.serNm" width="200" label="所属系列" header-align="center"
                       align="center"></el-table-column>
      <el-table-column prop="busData.proNm" width="200" label="专业名称" header-align="center"
                       align="center"></el-table-column>
      <el-table-column prop="busData.lvlNm" width="120" label="级别名称" header-align="center"
                       align="center"></el-table-column>
      <el-table-column prop="busData.quaNm" width="200" label="资格名称" header-align="center"
                       align="center"></el-table-column>
      <el-table-column prop="busData.idCard" width="150" label="身份证号" header-align="center"
                       align="center"></el-table-column>
      <el-table-column prop="busData.workUnit" width="200" label="工作单位" header-align="center"
                       align="center"></el-table-column>
      <el-table-column prop="busData.workNm" width="120" label="在职状态" header-align="center"
                       align="center"></el-table-column>
      <el-table-column prop="busData.educationNm" width="120" label="最高学历" header-align="center"
                       align="center"></el-table-column>
      <el-table-column prop="busData.degreeNm" width="120" label="最高学位" header-align="center"
                       align="center"></el-table-column>
      <el-table-column prop="busData.school" width="200" label="毕业学校" header-align="center"
                       align="center"></el-table-column>
      <el-table-column prop="busData.studySpec" width="150" label="所学专业" header-align="center"
                       align="center"></el-table-column>
      <el-table-column prop="busData.mob" width="120" label="联系方式" header-align="center"
                       align="center"></el-table-column>
      <el-table-column fixed="right" prop="busData.deptMatNm" width="120" label="材料审核状态" header-align="center"
                       align="center"></el-table-column>
      <el-table-column fixed="right" prop="busData.deptQuaNm" width="120" label="资格审核状态" header-align="center"
                       align="center"></el-table-column>

      <!-- <el-table-column prop="deptName" label="主管部门" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="juryName" label="评委会" sortable="custom" header-align="center" align="center"></el-table-column> -->
      <el-table-column label="操作" fixed="right" header-align="center" align="center" width="180">

        <template slot-scope="scope">
          <el-button v-if="scope.row.busData.deptMatCd==='30070.120.100'" type="text" size="small" title="材料审核">材料审核
          </el-button>
          <el-button v-if="scope.row.busData.deptMatCd!=='30070.120.100'" type="text" size="small" title="材料查看"
                     @click="aaa">材料查看
          </el-button>
          <el-button v-if="scope.row.busData.deptQuaCd=='30070.130.100'" type="text" size="small" title="资格通过">资格通过
          </el-button>
          <el-button v-if="scope.row.busData.deptQuaCd=='30070.130.100'" type="text" size="small" title="资格拒绝">资格拒绝
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
        module: '/act/task/',
        gridOptions: {
          isQuery: false,
          listUrl: '/act/task/pageSelf'
        },
        dataForm: {}
      }
    },
    components: {},
    methods: {
      aaa() {
        this.$router.push({name: 'toDeclare'})
      },
      // 每行排序显示
      indexMethod(index) {
        return this.pageSize * (this.pageNo - 1) + index + 1
      }
    }
  }
</script>
