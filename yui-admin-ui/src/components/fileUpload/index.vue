<template>
  <div>
    <el-upload class="el-upload-files"
      ref = "upload"
      :action = "actionUrl"
      :file-list = "urlComputed"
      :multiple = "multiple"
      :drag = "drag"
      :limit = "limit"
      :http-request = "upload"
      :on-preview = "handleFilePreview"
      :on-exceed = "handleExceed"
      :on-remove = "handleRemove"
      :before-remove="beforeRemove"
      :before-upload="beforeUploadHandle"
      :on-success="successHandle">
      <div v-if="drag">
        <i v-if="drag" class="el-icon-upload"></i>
        <div v-if="drag" class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div v-if="drag" class="el-upload__tip" slot="tip">只能上传pdf,doc,docx,xls,xlsx格式的文件，且不超过100M</div>
      </div>
      <div v-else>
        <el-button size="small" type="primary">点击上传</el-button>
        <div class="el-upload__tip" slot="tip">{{ tip }}</div> 
      </div>
    
    </el-upload>
  </div>
</template>
<script>
  import Viewer from 'viewerjs'
  import 'viewerjs/dist/viewer.min.css'
  export default{
    name: 'fileUpload',
    props: {
      actionUrl: {
        type: String,
        default: 'general/oss/upload'
      },
      files: {
        type: [Array, String],
        default: function () {
          return []
        }
      },
      acceptFileType: {
        type: Array,
        default: function () {
          return []
        }
      },
      drag: {
        type: Boolean,
        default: false
      },
      multiple: {
        type: Boolean,
        default: false
      },
      tip: {
        type: String,
        default: ''
      },
      /*outPut: {
        type: String,
        default: 'string'   // 可以选择string, array  string 逗号分隔
      },*/
      outPut: {
        type: Array,
        default: function () {
          return []
        }
      },
      postData: {
        type: Object,
        default: null
      },
      max: {
        type: Number,
        default: 1024 * 1024 * 100
      },
      limit: {
        type: Number,
        default: 999
      }
    },
    data () {
      return {
          fileList: []
      }
    },
    computed: {
      filesArray () {
        let urls = []
        if (Object.prototype.toString.apply(this.files) === '[object Array]') {
          urls = this.files
          return urls
        } else if (Object.prototype.toString.apply(this.files) === '[object String]' && this.files.length > 0) {
          urls = this.files.split(',')
        }
        return urls.map(function (value, index, array) {
          return value
        })
      },
      urlComputed () {
        if (this.files === '') {
          return []
        }
        let urls = []
        if (Object.prototype.toString.apply(this.files) === '[object Array]') {
          urls = this.files
          return urls.map(function (value, index, array) {
	          return {     
	             name: value.name,
	             url: value.fileUrl
	           }
	        })
        } else if (Object.prototype.toString.apply(this.files) === '[object String]') {
          urls = this.files.split(',')
        }
                
        return urls.map(function (value, index, array) {
          return {
            name: value.slice(value.indexOf('_') + 1),
            url: value
          }
        })
         
      }
    },
    methods: {
      handleExceed (file, fileList) {
        this.$message.error(`上传文件数量不能超过 ${this.limit} 个!`)
      },
      handleRemove (file, fileList) {
        console.log('file='+JSON.stringify(file))
        console.log('fileList='+JSON.stringify(fileList))
        let urlMap = fileList.map(item => {
          return item.url
        })
        //this.submitModifyHandle(urlMap)
        //this.files.push({name:file.name,url:res.url})
        this.submitModifyHandle(fileList)
      },
      handleFilePreview (file) {
        // var src = file.url
        // this.showImage(file.url)
        // console.log(file)
        var src = file.url
        if ((/.pdf$/).test(src)) {
          window.open(src, '_blank')
        } else if ((/.(doc|docx|docm|dot|ppt|pptx|pptm)$/).test(src)) {
          window.open('http://view.officeapps.live.com/op/view.aspx?src=' + encodeURIComponent(src), '_blank')
        } else if ((/.(xls|xlsx|xlsb|xlsm)$/).test(src)) {
          window.open('http://view.officeapps.live.com/op/view.aspx?src=' + encodeURIComponent(src), '_blank')
        } else if ((/.(jpg|jpeg|png|gif)$/).test(src)) {
          this.showImage(src)
        } else {
          this.downLoadFile(src)
        }
      },
      // 图片预览
      showImage (url) {
        let divNode = document.createElement('div')
        divNode.style.display = 'none'
        let imageNode = document.createElement('img')
        imageNode.setAttribute('src', url)
        imageNode.setAttribute('alt', '图片')
        divNode.appendChild(imageNode)
        document.body.appendChild(divNode)
        let viewer = new Viewer(divNode, {
          zIndex: 99999,
          hidden () {
            viewer.destroy()
            divNode.remove()
          }
        })
        imageNode.click()
      },
      // 下载非doc,excel,图片的其他类型文件
      downLoadFile (url) {
        // console.log(url)
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        let fileName = url.slice(url.lastIndexOf('/') + 1)
        let fileType = url.slice(url.lastIndexOf('.') + 1)
        link.setAttribute(
          'download',
          `${fileName}.${fileType}`
        )
        document.body.appendChild(link)
        link.click()
        link.remove()
      },
      // 文件格式和大小验证
      validateFileHandle (file) {
        //验证文件大小
        let isOverMax = file.size < this.max
        if (!isOverMax) {
          this.$message.error(`上传文件大小不能超过 ${this.max / (1024 * 1024)} M!`)
          return false
        }
        //验证文件格式
        let accept = this.acceptFileType
        let type = file.name.substring(file.name.lastIndexOf('.'));
        for (var i in accept) { 
             if(type==accept[i]) {             
             	 return true
             }      
        }
        this.$message.error('只支持pdf,doc,docx,xls,xlsx格式的文件！')
        return false
      },
      // 自定义上传
      upload (item) {
        let _this = this
        let file = item.file
        let formData = new FormData()

        // 判断文件格式
        let isValidate = this.validateFileHandle(file)
        if (!isValidate) {
          item.onError()
          return false
        }

        formData.append('file', file, file.name)
        if (this.postData) {
          Object.keys(this.postData).forEach(key => {
            formData.append('key', _this.postData.key)
          })
        }
        this.$http['post'](this.actionUrl, formData).then(({data: res}) => {
          if (res && res.code === 0) {
            //_this.addFileUrl(res.data) //注释，去success里面实现
            item.onSuccess({msg:'上传成功',url:res.data})
          } else {
            _this.$message({
              message: res.msg,
              type: 'error'
            })
            item.onError({msg:'上传失败'})
          }
        }).catch(error => {
          item.onError({msg:'上传失败'})
          console.log(error)
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log('配时文件上传失败(' + error.response.status + ')，' + error.response.data)
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log('配时文件上传失败，服务器端无响应')
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('配时文件上传失败，请求封装失败')
          }
        })
      },
      // 图片url
      addFileUrl (url) {
       if (!url) return
        this.submitModifyHandle(this.filesArray.concat([url]))
        //return this.submitModifyHandle(this.files)
      },
      // 上传之前
      beforeUploadHandle (file) {
        /*if (file.type !== 'image/jpg' && file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif') {
           this.$message.error('只支持jpg、png、gif格式的图片！')
           return false
         }*/
         /*
         console.log('file.name='+file.name.substring(file.name.lastIndexOf('.')))
         let accept = this.acceptFileType
         let type = file.name.substring(file.name.lastIndexOf('.'));
         for (var i in accept) { 
              if(type==accept[i])
                return true
         }
         this.$message.error('只支持pdf,doc,docx,xls,xlsx格式的文件！')
         return false
         */
         
         return true
      },
      //上传成功
      successHandle (res, file, fileList) {
        //this.files.push({index:this.files.length,name:file.name,url:res.url})
        //console.log('SUCCESS_RES='+JSON.stringify(res));
        //console.log('SUCCESS_file='+JSON.stringify(file));
        console.log('SUCCESS_LIST='+JSON.stringify(fileList));
        return this.submitModifyHandle(fileList)
      },
      beforeRemove(file, fileList) {
        let accept = this.acceptFileType
        let type = file.name.substring(file.name.lastIndexOf('.'));
        for (var i in accept) {
              if(type==accept[i])
                 return this.$confirm(`确定移除 ${ file.name }？`);
         }
        return true;
      },
      // 向父组件提交证件修改信息，触发父组件方法
      submitModifyHandle (dataArr) {
         //console.log(JSON.stringify(this.files))
         //console.log(JSON.stringify(this.filesArray))
         //console.log(JSON.stringify(dataArr))
        //console.log('dataArr='+JSON.stringify(dataArr))
        
        this.$nextTick(() => {
          if (this.outPut === 'string') {
            this.$emit('modify', dataArr.join(','))
          } else {
            let fileList = []
            for(var i=0;i < dataArr.length ;i++) {
              let file = {}
              let url = dataArr[i].url
              let res = dataArr[i].response
              file.name = dataArr[i].name
              if(url!=undefined)
                 file.fileUrl = dataArr[i].url
              else 
                 file.fileUrl = res.url
              fileList.push(file)
            }
            this.$emit('modify', fileList)
          }
        })
      }
    }
  }
</script>
