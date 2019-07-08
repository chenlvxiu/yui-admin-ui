<template>
  <div  class="mod-problem-edit">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" label-width="120px">
      <el-row :gutter="20" class="row_top">
        <el-col :span="8">
          <el-form-item label="标题：" prop="title">
            <el-input v-model="dataForm.title" placeholder="请输入标题"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="来源" prop="source">
            <el-input v-model="dataForm.source" placeholder="请输入来源"></el-input>
          </el-form-item>
        </el-col>
         <el-col :span="8">
          <el-form-item label="初始浏览量：" prop="views">
            <el-input v-model.number="dataForm.views" type="number" placeholder="请输入浏览量"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
          <el-form-item label="详细内容：" prop="content">
	            <wangeditor ref="wangeditor" :getEditConts="getEditConts"  placeholder="请输入详细内容"></wangeditor>
		      </el-form-item>
      </el-row>
      <el-row :gutter="20">
          <el-form-item label="附件上传：" prop="reason">
	             <fileUpload :files="files" @modify="uploadHandle" :acceptFileType = "acceptFileType" :actionUrl = "actionUrl" :multiple = 'multiple' :drag = 'drag' :limit="limit" tip="多文件上传，包含文件预览"></fileUpload>
		      </el-form-item>
      </el-row>
      <el-row :gutter="20" class="footer">
        <el-button @click="cancel()">取消</el-button>
        <el-button @click="dataFormSubmit()">提交</el-button>
        <el-button @click="view()">预览</el-button>
      </el-row>
      <!-- 弹窗, 详情 -->
      <info v-if="infoVisible" ref="info" ></info>
    </el-form>
  </div>
</template>

<script>
  import debounce from 'lodash/debounce'
  import info from './problem-info'
  import fileUpload from '@/components/fileUpload'
  import wangeditor from '@/components/wangeditor'
  export default {
    data () {
      var checkViews = (rule, value, callback) => {
        if (value==undefined || value==="") {
          return callback(new Error('初始浏览量不能为空'));
        }
        if (value < 0) {
          callback(new Error('初始浏览量小于0'));
        } else if(value >= 1000000) {
          callback(new Error('初始浏览量不超过999999'));
        } else {
          callback();
        }
      };
      return {
        id: null,
        infoVisible:false,
        visible: false,
        multiple: true,//开启批量上传
        limit: 10,//最多一次上传10个
        drag: true,//开启拖拽
        actionUrl: 'general/oss/upload?dir=other',
        acceptFileType: ['.pdf','.pdfx','.doc','.docx','.xls','.xlsx'],
        files:[], 
        details: {},
        dataForm: {
          id: '',
          title: '',
          source: '',
          views: '',
          content: '',
          catCd: '',
          catNm: '',
          statCd: '',
          statNm: ''
        },
        dataRule: {
          title: [
            { required: true, message: '标题不能为空', trigger: 'blur' },
            { min: 1, max: 200, message: '标题长度在 1 到 200 个字符', trigger: 'blur' }
          ],
          source: [
            { required: true, message: '来源不能为空', trigger: 'blur' },
            { min: 1, max: 200, message: '来源长度在 1 到 200 个字符', trigger: 'blur' }
          ],
          views: [
            { validator: checkViews, trigger: 'blur' }
          ],
          content: [
            { required: true, message: '内容不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    computed: {
      documentClientHeight: {
        get () { return this.$store.state.common.documentClientHeight }
      },
      menuActiveName: {
        get () { return this.$store.state.common.menuActiveName },
        set (val) { this.$store.commit('common/updateMenuActiveName', val) }
      },
      mainTabs: {
        get () { return this.$store.state.common.mainTabs },
        set (val) { this.$store.commit('common/updateMainTabs', val) }
      },
      mainTabsActiveName: {
        get () { return this.$store.state.common.mainTabsActiveName },
        set (val) { this.$store.commit('common/updateMainTabsActiveName', val) }
      },
      siteContentViewHeight () {
        var height = this.documentClientHeight - 50 - 30 - 2
        if (this.$route.meta.isTab) {
          height -= 40
          return isURL(this.$route.meta.iframeUrl) ? { height: height + 'px' } : { minHeight: height + 'px' }
        }
        return { minHeight: height + 'px' }
      }
    },
    activated () {
        // 通过路由参数pid, 控制列表请求操作
        //console.log(this.$route.path);
        //console.log(this.$route.name);
        if(!this.id && this.$route.name === 'problem-edit')//编辑页面第一次进来获取传过来的id，防止点击tab页异常
          this.id = this.$route.params.id ;
        this.$refs['dataForm'].resetFields()
        if(this.id && this.$route.name === 'problem-edit')//编辑页获取用户信息
        {
           this.getInfo()  
        }
    },
    methods: {
      init (id) {
        this.id = id
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.id) {
            this.getInfo()
          }
          else
          {
              this.$refs.wangeditor.setEditorContent('');
          }
        })
      },
      cancel () {
        this.removeTabHandle(this.mainTabsActiveName);
        //this.$router.go(-1);
      },
      view () {
       this.$refs['dataForm'].validate((valid) => {
          if (valid) {
          	this.infoVisible = true
	      	this.details = {
	            ...this.details,
	            ...this.dataForm
	        }
	        this.details.fileDtoList = this.dataForm.jobProblemFileRoList
	        this.$nextTick(() => {
	          this.$refs.info.view(this.details)
	        })
          }
        })
      	
      },
      // 获取职称申报系统-政策文件表信息
      getInfo () {
        this.$http.get('/job/problem/webInfo?id=' + this.id).then(({data: res}) => {
          if (res.code !== 0) {
            return this.$message.error(res.msg)
          }
          this.dataForm = {
            ...this.dataForm,
            ...res.data
          }
          this.$refs.wangeditor.setEditorContent(res.data.content)
          this.files = this.dataForm.fileDtoList
          this.dataForm.jobProblemFileRoList = this.dataForm.fileDtoList
        }).catch(() => {})
      },
       // 获取编辑器内容 格式为html
      getEditConts (value) {
        this.dataForm.content = value
      },
      uploadHandle (val) {
       	//console.log('val='+JSON.stringify(val));
        this.$set(this.dataForm, 'jobProblemFileRoList', val)
      },
      // tabs, 删除tab
      removeTabHandle (tabName) {
        this.mainTabs = this.mainTabs.filter(item => item.name !== tabName)
        if (this.mainTabs.length >= 1) {
          // 当前选中tab被删除
          if (tabName === this.mainTabsActiveName) {
            this.$router.go(-1);
          }
        } else {
          this.menuActiveName = ''
          this.$router.push({ name: 'home' })
        }
      },
      // 表单提交
      dataFormSubmit: debounce(function () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            let url = !this.id ? '/job/problem/add' : '/job/problem/upd'
            /*if(this.id) {
            	this.dataForm.statCd = '30070.120.100'
            	this.dataForm.statNm = '待审核'
            }*/
            this.$http.post(url, {...this.dataForm}).then(({data: res}) => {
              if (res && res.code === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.removeTabHandle(this.mainTabsActiveName);
                    //this.$router.go(-1);
                    //this.visible = false
                    //this.$emit('refreshDataList')
                  }
                })
              } else {
                this.$message.error(res.msg)
              }
            })
          }
        })
      }, 1000, { 'leading': true, 'trailing': false })
    },
    components: {
      wangeditor,fileUpload,info
    }
  }
</script>
<style>
   .el-form--label-top .el-form-item__label {
    padding: 0 0 0!important;
  }

   .el-dialog__header {
    background-color: rgba(242, 242, 242, 1);
    color: white;
    text-align: center;
    font-family: "微软雅黑";
    font-size: 20px;
    font-weight:400;
    margin-bottom: 10px;
  }

  .footer {
    text-align:center;
  }
 
  .edit-select {
    width:100%!important;
  }

  .row_top .el-col-8 {
    padding-left:0px!important;
    padding-right:0px!important;
  }

  .w-e-text-container {
     z-index: 100!important;
  }
</style>
