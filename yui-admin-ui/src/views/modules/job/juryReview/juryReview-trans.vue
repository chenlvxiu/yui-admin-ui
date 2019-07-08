<template>
  <div class="mod-juryReview-trans">
   <el-form :inline="true" :model="dataForm" >
      <el-form-item label="转送系列：">
        <el-select v-model="dataForm.serCd" @change="serChange()" placeholder="——请选择所属系列——">
	        <el-option
	          v-for="item in series"
	          :key="item.cd"
	          :label="item.nm"
	          :value="item.cd">
	        </el-option>
	     </el-select>
      </el-form-item> 
       <el-form-item label="转送评委会：">
        <el-select v-model="transJuryId" placeholder="——请选择评委会——">
	        <el-option
	          v-for="item in jurys"
	          :key="item.id"
	          :label="item.name"
	          :value="item.id">
	        </el-option>
	     </el-select>
      </el-form-item> 
      <el-form-item >
        <el-button  size="small" @click="trans()">转送</el-button>
      </el-form-item>
   </el-form> 
   <el-form :inline="true" :model="dataForm" @keyup.enter.native="listData()">    
      <el-form-item>
        <el-input v-model="dataForm.name" placeholder="请输入姓名" clearable></el-input>
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
        <el-button size="small" @click="listData()">查询</el-button>
      </el-form-item>
    </el-form> 
    <el-table :data="dataList" border stripe v-loading="dataListLoading" :max-height="tableHeight" 
            @selection-change="selectionChangeHandle" @sort-change="sortChangeHandle" style="width: 100%;">
      <el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>
      <el-table-column prop="submitTm" label="提交时间" header-align="center" align="center" width="auto"></el-table-column>
      <el-table-column prop="name" label="姓名" header-align="center" align="center" width="70"></el-table-column>
      <el-table-column prop="juryName" label="所属评委会" header-align="center" align="center" width="auto"></el-table-column>
      <el-table-column prop="proNm" label="专业名称" header-align="center" align="center" width="auto"></el-table-column>
      <el-table-column prop="quaNm" label="资格名称" header-align="center" align="center" width="auto"></el-table-column>
      <el-table-column prop="lvlNm" label="级别名称" header-align="center" align="center" width="auto"></el-table-column>
      <el-table-column prop="serNm" label="所属系列" header-align="center" align="center" width="auto"></el-table-column>
      <el-table-column prop="mob" label="联系电话" header-align="center" align="center" width="auto"></el-table-column>
      <el-table-column prop="statNm" label="状态" header-align="center" align="center" width="70"></el-table-column>     
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
    data () {
      return {
        module: '/job/declare/',
        gridOptions: {
        	isAct:false
        },
        transJuryId:null,
        //batch:null,
        series:[{cd:'',nm:'——请选择系列——'}],
        pros: [{cd:'',nm:'——请选择专业——'}],
        lvls: [{cd:'',nm:'——请选择级别——'}],
        quas: [{cd:'',nm:'——请选择资格——'}],
        jurys: [{id:null,name:'——请选择评委会——'}],
        //jurys: [],
        defOrders: [
          {
            k:'submitTm',
            t:'desc'
          }
        ],
        dataForm: { 
            statCd:'30070.100.140',
            juryId:'',
            batch:'',
            serCd:'',
            proCd:'',
            lvlCd:'',
            quaCd:''
        },
        dataMode: { 
          statCd : 'EQ',
          juryId : 'EQ',
          batch  : 'EQ',
          serCd  : 'EQ',
          proCd  : 'EQ',
          lvlCd  : 'EQ',
          quaCd  : 'EQ',
        }
      }
    },
    activated() {
      // 通过路由参数pid, 控制列表请求操作
      if(!this.dataForm.juryId) {
          this.dataForm.juryId = this.$route.params.juryId;//评委会id
          this.dataForm.batch = this.$route.params.batch;//批次号
      }

      this.dataForm.serCd = '';
      this.dataForm.proCd = '';
      this.dataForm.lvlCd = '';
      this.dataForm.quaCd = '';
      this.transJuryId=null;
      this.getSeries();
    },
    methods : {
      trans() {
      	if(this.transJuryId==null)
      	   return  this.$message.error('请先选择转送评委会!')
      	if(this.dataListSelections.length <= 0)
           return  this.$message.error('请先选择需要转送的申报用户!')

        var jury = this.jurySelectGet(this.transJuryId);
      	//检验所选评委会对应项目批次当前状态是否为复审通过
      	 this.$http.get('/job/juryReview/isJuryReviewPass?juryId='+this.transJuryId+'&batch='+this.dataForm.batch).then(({data: res}) => {
	          if (res && res.code === 0 ) {
	            if(res.data.result == false)
	               return this.$message.error('转送评委会未完成复审!')
	            else {
	           
	            this.$confirm('确认将选定人员转送到'+jury.name+'?', '提示', {
			        confirmButtonText: '确定',
			        cancelButtonText: '取消',
			        type: 'warning'
			      }).then(() => {
              //或者选择人员的id
              var ids = this.dataListSelections.map(item => {
                return item[this.gridOptions.delKey]
              })
			        this.$http.post('/job/declare/trans',{ids:ids,juryId:this.transJuryId,juryName:jury.name}).then(({data: res}) => {
			          if (res && res.code === 0) {
			            this.$message({
			              message: '转送成功',
			              type: 'success',
			              duration: 500,
			              onClose: () => {
                      //this.statCd = '30070.130.110';
			                this.listData()
			              }
			            })
			          } 
			          else {
			            this.$message.error(res.msg)
			          }
			        })
			      }).catch(() => {})
	            }
	          }
	          else
	             return this.$message.error(res.msg)

        }).catch(() => {})
      },
      // 获取职称申报系统-专业系列
      getSeries() {
        this.series = [{cd:'',nm:'——请选择系列——'}]
        this.$http.get('/sys/cat/listByPrntCd?prntCd=30050').then(({data: res}) => {
          if (res.code !== 0) {
            return this.$message.error(res.msg)
          }

          this.series = this.series.concat(res.data.list)

          }).catch(() => {
        })
      },
      // 获取职称申报系统-专业列表
      getPros () {

        this.pros = [{cd:'',nm:'——请选择专业——'}];
        this.$http.get('/sys/cat/listByPrntCd?prntCd='+this.dataForm.serCd).then(({data: res}) => {
          if (res.code !== 0) {
            return this.$message.error(res.msg)
          }
         
          this.pros = this.pros.concat(res.data.list)

        }).catch(() => {})
      },
      // 获取职称申报系统-级别列表
      getLvls () {

        this.lvls = [{cd:'',nm:'——请选择级别——'}];
        this.$http.get('/sys/cat/listByPrntCd?prntCd='+this.dataForm.proCd).then(({data: res}) => {
          if (res.code !== 0) {
            return this.$message.error(res.msg)
          }
         
          this.lvls = this.lvls.concat(res.data.list)
        }).catch(() => {})
      },
      // 获取职称申报系统-资格列表
      getQuas () {

        this.quas = [{cd:'',nm:'——请选择资格——'}];
        this.$http.get('/sys/cat/listByPrntCd?prntCd='+this.dataForm.lvlCd).then(({data: res}) => {
          if (res.code !== 0) {
            return this.$message.error(res.msg)
          }
         
          this.quas = this.quas.concat(res.data.list)
        }).catch(() => {})
      },
      getJuryList() {
      	this.jurys = [{id:null,name:'——请选择评委会——'}];
      	//this.jurys = [];
        this.$http.get('/job/jurySeries/listTransJury?serCd='+this.dataForm.serCd).then(({data: res}) => {
          if (res.code !== 0) {
            return this.$message.error(res.msg)
          }
         
          this.jurys = this.jurys.concat(res.data.list)
          if(this.jurys.length>1)
             this.transJuryId = this.jurys[1].id
          //if(this.jurys!=undefined && this.jurys.length>0)
             //this.transJuryId = this.jurys[0].id
        }).catch(() => {})
      },
      serChange () {
      	this.dataForm.proCd='';
      	this.pros = [{cd:'',nm:'——请选择专业——'}];
      	this.dataForm.lvlCd='';
      	this.lvls = [{cd:'',nm:'——请选择级别——'}];
      	this.dataForm.quaCd='';
      	this.quas = [{cd:'',nm:'——请选择资格——'}];
      	this.transJuryId = null
      	this.jurys = [{id:null,name:'——请选择评委会——'}];
      	if(this.dataForm.serCd!='')
      	{   
      	    this.getPros();
      	    this.getJuryList();
      	}
      	this.listData();
      },
      proChange() {
      	this.dataForm.lvlCd='';
      	this.lvls = [{cd:'',nm:'——请选择级别——'}];
      	this.dataForm.quaCd='';
      	this.quas = [{cd:'',nm:'——请选择资格——'}];
      	if(this.dataForm.proCd!='')
      	  this.getLvls();
      },
      lvlChange() {
      	this.dataForm.quaCd='';
      	this.quas = [{cd:'',nm:'——请选择资格——'}];
      	if(this.dataForm.lvlCd!='')
      	  this.getQuas();
      },
      jurySelectGet(id){
        var obj = this.jurys;
	    for(var i=0;i < obj.length ; i++) {
	        if(id === obj[i].id)
	        {
	          return obj[i];
	        }
	      }
	  }
    },
    components: {

    }
  }
</script>
