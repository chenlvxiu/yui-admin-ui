<template>
  <div class="mod-news">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="listData()">
      <el-form-item>
        <el-input v-model="dataForm.title" placeholder="新闻动态名称" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" @click="listData()">查询</el-button>
        <el-button v-if="$hasPerm('job:news:add')" size="small" type="primary" @click="editHandle()">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="dataList" border stripe v-loading="dataListLoading" :max-height="tableHeight" 
            @selection-change="selectionChangeHandle" @sort-change="sortChangeHandle" style="width: 100%;">
      <el-table-column type="index" :index="indexMethod" prop="sort" width="100" label="序号"  header-align="center" align="center"></el-table-column>
      <el-table-column prop="title" label="新闻动态名称" header-align="center" align="center"></el-table-column>
      <el-table-column prop="source" label="来源" header-align="center" align="center"></el-table-column>
      <<el-table-column prop="crtTm" label="发布时间" header-align="center" align="center"></el-table-column>
      <el-table-column label="操作" fixed="right" header-align="center" align="center" width="100">
        <template slot-scope="scope">
          <!--<el-button v-if="$hasPerm('job:news:info')" type="text" size="small" @click="infoHandle(scope.row.id)" icon="el-icon-document" title="详情"></el-button>-->
          <el-button v-if="$hasPerm('job:news:upd')" type="text" size="small" @click="editHandle(scope.row.id)" icon="el-icon-edit" title="编辑"></el-button>
          <el-button v-if="$hasPerm('job:news:del')" type="text" size="small" @click="delHandle(scope.row.id)" icon="el-icon-delete" title="删除"></el-button>
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
  import edit from './news-edit'
  import info from './news-info'
  import impt from './news-impt'
  import grid from '@/mixins/grid'
  export default {
    mixins: [grid],
    data () {
      return {
        module: '/job/news/',
        gridOptions: {},
        defOrders: [
          {
            k:'crtTm',
            t:'desc'
          }
        ],
        dataForm: {}
      }
    },
    components: {
      edit, info, impt
    },
    methods:{
      //每行排序显示
      indexMethod (index) {
        return this.pageSize*(this.pageNo-1)+index+1
      },
      childHandle (id) {

        var params = { 'id': id }
        if(!id)
        {
          return this.$router.push({ name: 'news-add', params: params })
        }
        else {
          return this.$router.push({ name: 'news-edit', params: params })
        }
      }
    }
  }
</script>
