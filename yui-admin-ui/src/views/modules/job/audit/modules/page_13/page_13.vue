<template>
  <div id="page13">
    <m-title :data-step="13"></m-title>
    <el-form ref="ruleForm" class="m-form">
      <ul class="material-list">
        <li class="material-item">
          <h3 class="title">上传量化打分表</h3>
          <m-filePreview :class="!dataInfo.url? 'isError':''" :loading="loading" :data-value="dataInfo"
                         :disabled="isEdit" @upload="upload">
            <p>.doc .pdf</p>
          </m-filePreview>
          <div class="isError-tip" v-show="!dataInfo.url">请上传量化打分表</div>
        </li>
      </ul>
      <el-form-item class="m-form-buttons">
        <el-button type="primary" plain class="m-form-buttons-item m-form-buttons-item-plain"
                   @click="submit(12)">上一页
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import axios from 'axios'
  import {myInterceptor} from '@/libs/axios'
  import {mapActions} from 'vuex'
  import mFilePreview from '../../components/m-filepreview/m-filepreview'

  export default {
    props: ["id"],
    data() {
      return {
        loading: false,
        info: {
          id: '',
          name: '',
          url: '',
        },
        isPreFlag: false,
        fileType: {//对应类型--对应方法  打开
          img: ['jpg', 'jpeg', 'png'],
          office: ['doc', 'docx'],
          pdf: ['pdf']
        },

      }
    },
    computed: {
      dataInfo() {
        let type = ''
        if (this.info.url) type = this.info.url.split('/').pop().split('.')[1]
        return {...this.info, type: type}
      },
      isEdit() {
        return true
      }
    },
    methods: {
      ...mapActions('declare', ['d_getScoreFile', 'd_submitScoreFile', 'd_submit']),
      submit(step) {
        this.$emit('change', step)
      },
      mouseHandle(flag) {
        this.isPreFlag = flag
      },
      upload(file) {
        return false
      },
      // 获取文件
      getScoreFile() {
        let query = {
          "w": [{"k": "declareId", "v": this.id, "m": "EQ"}]
        }
        query = this.$method.commonParam(query)
        this.loading = true
        this.d_getScoreFile(query).then(res => {
          if (res.list.length) this.info = res.list[0]
          this.loading = false
        }).catch(err => {
          this.loading = false
          console.log(err)
        })
      },
      // 预览文件
      preview($event) {
        let url = this.dataInfo.url
        let type = this.dataInfo.type
        if (type) {
          this.fileType.pdf.indexOf(type) > -1 && (this.$showPDF(url))
          // this.fileType.office.indexOf(type) > -1 && ( this.$showOffice(url) )
          this.fileType.img.indexOf(type) > -1 && (this.$showImage(url))
        }
      },

    },
    activated() {
      this.getScoreFile()
    },
    components: {
      mFilePreview
    }
  }
</script>


<style scoped lang="scss">
  .title {
    font-size: 16px;
    line-height: 36px;
    margin-bottom: 20px;
  }

  ul, li {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .material-list {
    margin-bottom: 40px;
    .material-item {
      border: 1px solid $border;
      padding: 20px;
    }
    .isError-tip {
      font-size: 12px;
      color: #F56C6C;
      padding-top: 2px;
    }
  }

</style>

