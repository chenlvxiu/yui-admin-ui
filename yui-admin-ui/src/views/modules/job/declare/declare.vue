<template>
  <div class="mod-declare">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="listData()">
      <el-form-item>
        <el-input v-model="dataForm.id" placeholder="主键" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" @click="listData()">查询</el-button>
        <el-button v-if="$hasPerm('job:declare:add')" size="small" type="primary" @click="editHandle()">新增</el-button>
        <el-button v-if="$hasPerm('job:declare:del')" size="small" type="danger" @click="delHandle()" :disabled="dataListSelections.length <= 0">删除</el-button>
        <el-button v-if="$hasPerm('job:declare:expt')" size="small" @click="exptHandle()">导出</el-button>
        <el-button v-if="$hasPerm('job:declare:impt')" size="small" @click="imptHandle()">导入</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="dataList" border stripe v-loading="dataListLoading" :max-height="tableHeight" 
            @selection-change="selectionChangeHandle" @sort-change="sortChangeHandle" style="width: 100%;">
      <el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>
      <el-table-column prop="id" label="主键" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="deptId" label="所属区县市或主管部门id" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="juryId" label="评委会id" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="deptName" label="主管部门名" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="juryName" label="评委会名" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="headerUrl" label="二寸照" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="name" label="姓名" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="idCard" label="身份证号" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="birthTm" label="出身年月" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="sex" label="性别 1-男 0-女" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="mob" label="联系电话" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="nation" label="民族" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="residence" label="户口所在地" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="healthCd" label="身体健康状况编码" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="healthNm" label="身体健康状况" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="workTm" label="参加工作时间" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="workUnit" label="现工作单位" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="archUnit" label="档案存放单位" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="workYear" label="从事申报专业工作年限" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="education" label="最高学历" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="degree" label="最高学位" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="gradTm" label="毕业时间" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="studySpec" label="所学专业" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="school" label="学校" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="duty" label="行政职务" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="workSpec" label="现从事专业" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="depart" label="所在部门" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="post" label="岗位" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="skillPost" label="现任专业技术职务" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="skillStartYear" label="现任专业技术职务开始时间(年)" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="skillEndYear" label="现任专业技术职务结束时间(年)" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="specSkillWork" label="现从事何种专业技术工作" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="skillQua" label="现专业技术职务任职资格" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="skillQuaTm" label="现专业技术职务任职资格取得时间" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="partDuty" label="现（兼）任行政职务" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="assess" label="近3年考核情况" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="mark" label="是否破格申报 1-是 0-否" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="descr" label="破格申报说明" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="workAble" label="专业工作能力" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="year" label="申报年度" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="serCd" label="申报系列编码" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="serNm" label="申报系列" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="proCd" label="申报专业编码" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="proNm" label="申报专业" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="lvlCd" label="申报级别编码" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="lvlNm" label="申报级别" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="quaCd" label="专业技术资格编码" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="quaNm" label="专业技术资格" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="opinion" label="审核意见" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="deptMatCd" label="主管部门材料审核状态编码" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="deptMatNm" label="主管部门材料审核状态" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="juryMatCd" label="评委会材料审核状态编码" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="juryMatNm" label="评委会材料审核状态" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="rsjMatCd" label="人市局材料审核状态编码" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="rsjMatNm" label="人市局材料审核状态" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="deptQuaCd" label="主管部门资格审核状态编码" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="deptQuaNm" label="主管部门资格审核状态" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="juryQuaCd" label="评委会资格审核状态编码" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="juryQuaNm" label="评委会资格审核状态" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="rsjQuaCd" label="人市局资格审核状态编码" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="rsjQuaNm" label="人市局资格审核状态" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="workCd" label="在职状态编码" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="workNm" label="在职状态编码" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="catCd" label="类型编码" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="catNm" label="类型" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="statCd" label="申报状态编码" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column prop="statNm" label="状态" sortable="custom" header-align="center" align="center"></el-table-column>
      <el-table-column label="操作" fixed="right" header-align="center" align="center" width="100">
        <template slot-scope="scope">
          <el-button v-if="$hasPerm('job:declare:info')" type="text" size="small" @click="infoHandle(scope.row.id)" icon="el-icon-document" title="详情"></el-button>
          <el-button v-if="$hasPerm('job:declare:upd')" type="text" size="small" @click="editHandle(scope.row.id)" icon="el-icon-edit" title="编辑"></el-button>
          <el-button v-if="$hasPerm('job:declare:del')" type="text" size="small" @click="delHandle(scope.row.id)" icon="el-icon-delete" title="删除"></el-button>
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
  import edit from './declare-edit'
  import info from './declare-info'
  import impt from './declare-impt'
  import grid from '@/mixins/grid'
  export default {
    mixins: [grid],
    data () {
      return {
        module: '/job/declare/',
        gridOptions: {},
        dataForm: {}
      }
    },
    components: {
      edit, info, impt
    }
  }
</script>
