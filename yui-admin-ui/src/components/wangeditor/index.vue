<template>
  <div id="wangeEitor">
    <div ref="wangeditor"></div>
  </div>
</template>
<script>
  import E from 'wangeditor'
  export default{
    name: 'wangeditor',
    data () {
      return {
        editorContents: '',
        editor: null
      }
    },
    props: ['getEditConts', 'insertImg'],
    mounted () {
      let _this = this
      this.editor = new E(this.$refs.wangeditor)
      // 开启上传base64
      // this.editor.customConfig.uploadImgShowBase64 = true
      // editor.customConfig.onchangeTimeout = 500;
      this.editor.customConfig.onchange = (html) => {
        this.editorContents = html
        this.getEditConts(html)
      }

      // this.editor.customConfig.uploadImgServer = `${window.SITE_CONFIG['baseUrl']}/general/file/upload?token=zcps-sid-d925b0fa-16c6-46df-9d01-da948868fcde`
      let baseUrl = process.env.NODE_ENV !== 'production' && process.env.OPEN_PROXY ? '/proxyApi/' : window.SITE_CONFIG.baseUrl
      this.editor.customConfig.uploadImgServer = baseUrl + '/general/file/upload'
      // editor.customConfig.uploadFileName = '自定义的文件名'
      // editor.customConfig.uploadImgHeaders = {
      //   'Accept': '*/*',
      //   'Authorization':'Bearer ' + token    // 头部token
      // }

      this.editor.customConfig.menus = [          // 菜单配置
        'head',  // 标题
        'bold',  // 粗体
        'fontSize',  // 字号
        'fontName',  // 字体
        'italic',  // 斜体
        'underline',  // 下划线
        //'strikeThrough',  // 删除线
        'foreColor',  // 文字颜色
        //'backColor',  // 背景颜色
        //'link',  // 插入链接
        //'list',  // 列表
        'justify',  // 对齐方式
        //'quote',  // 引用
        //'emoticon',  // 表情
        //'image',  // 插入图片
        //'table',  // 表格
        //'video',  // 插入视频
        //'code',  // 插入代码
        'undo',  // 撤销
        //'redo'  // 重复
      ]

      this.editor.customConfig.uploadImgHooks = {
        before: function (xhr, editor, files) {
        // 图片上传之前触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件

        // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
        // return {
        //     prevent: true,
        //     msg: '放弃上传'
        // }
        },
        success: function (xhr, editor, result) {
          // 图片上传并返回结果，图片插入成功之后触发
          // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
        },
        fail: function (xhr, editor, result) {
          // 图片上传并返回结果，但图片插入错误时触发
          // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
        },
        error: function (xhr, editor) {
          // 图片上传出错时触发
          // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
        },
        timeout: function (xhr, editor) {
          // 图片上传超时时触发
          // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
        },

        // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
        // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
        customInsert: function (insertImg, result, editor) {
          // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
          // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果

          // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
          if (Object.prototype.toString.call(_this.insertImg) === '[object Function]') {
            _this.insertImg(result, insertImg, editor)
          }
          // result 必须是一个 JSON 格式字符串！！！否则报错
        }
      }

      // 创建编辑器
      this.editor.create()
    },
    methods: {
      init () {
        this.editorContents = ''
        this.editor.txt.html('')
      },
      setEditorContent (value) {
        this.editorContents = value
        this.editor.txt.html(value)
      },
      setEditorDisable () {
        this.editor.$textElem.attr('contenteditable', false)
      },
      setEditorEnable () {
        this.editor.$textElem.attr('contenteditable', true)
      }
    }
  }
</script>
