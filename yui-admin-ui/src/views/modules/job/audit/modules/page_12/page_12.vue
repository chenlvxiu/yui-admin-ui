<template>
  <div id="page13">
    <m-title :data-step="12"></m-title>
    <el-form ref="ruleForm" class="m-form">
      <ul class="material-list">
        <li class="material-item" v-for="(item, index) in dataInfo" :key="index">
          <h3 class="title">{{item[0].title}}</h3>
          <ul>
            <li v-for="(subItem, i) in item" :key="i + 'sub'">
              <section class="sub-item">
                <h4 class="sub-title ellipsis">{{i + 1}}、{{subItem.name}}</h4>
                <div class="sub-con">
                  <div class="lm-wrap">
                    <section class="l-img" :class="!subItem.url? 'isError':''">
                      <input type="file" :id="'eduimg' + index + '-'  + i" style="display:none;"
                             @change="upload($event, index, i)">
                      <label :for="'eduimg' + index + '-' + i" class="img-show" id="img-show"
                             :class="{'disabled': !editAllow}">
                        <div class="init" v-if="!subItem.url">
                          <img src="./img/folder.png" alt="" width="32">
                          <p>点击上传</p>
                          <p>.jpg .png .pdf</p>
                        </div>
                        <div class="has-img" v-if="subItem.url">
                          <img src="./img/jpg.png" v-if="subItem.type == 'jpg' || subItem.type == 'jpeg'" alt=""
                               width="80">
                          <img src="./img/png.png" v-if="subItem.type == 'png'" alt="" width="80">
                          <img src="./img/pdf.png" v-if="subItem.type == 'pdf'" alt="" width="80">
                        </div>
                        <!--<div class="hover-wrap">-->
                        <!--<span class="upload">{{subItem.url ? '重新上传' : '点击上传'}}</span>-->
                        <!--</div>-->
                      </label>
                      <section class="preview-wrap" @mouseenter="mouseenter(index, i)" @mouseleave="mouseleave"
                               v-if="subItem.url">
                        <div class="preview flex-column" id="search-preview" @click="preview($event, index, i)"
                             v-show="previewIndex == index && previewI == i">
                          <img src="./img/preview.png" alt="">
                          <p>点击预览</p>
                        </div>
                      </section>
                    </section>
                  </div>
                  <!--<section class="r-delete">-->
                  <!--<button @click="deleteConfirm($event, index, i)" :class="{'disabled': !editAllow}"></button>-->
                  <!--</section>-->
                </div>
              </section>
            </li>
          </ul>
        </li>
      </ul>
      <!--<section class="operate-wrap">-->
      <!--<div class="operate">-->
      <!--<el-button plain @click="submit(11)" class="btn">上一页</el-button>-->
      <!--<el-button type="primary"  @click="submit(13)">下一页</el-button>-->
      <!--</div>-->
      <!--</section>-->

      <el-form-item class="m-form-buttons">
        <el-button type="primary" plain class="m-form-buttons-item m-form-buttons-item-plain"
                   @click="submit(11)">上一页
        </el-button>
        <el-button class="m-form-buttons-item m-form-buttons-item-primary" type="primary"
                   @click="submit(13)">下一页
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import axios from 'axios'
  import {myInterceptor} from '@/libs/axios'

  export default {
    props: ["id"],
    data() {
      return {
        info: [
          // [
          //   {
          //     url: '',// url
          //     name: "奖励名称",
          //     // id: '',
          //   }
          // ]
        ],
        fileType: {//对应类型--对应方法  打开
          img: ['jpg', 'jpeg', 'png'],
          office: ['doc', 'docx', 'xls', 'xlsx'],
          pdf: ['pdf']
        },
        previewIndex: -1,
        previewI: -1
      }
    },
    computed: {
      editAllow() {// 转化下 全局isEdit 理解方式
        return false
      },
      dataInfo() {
        return this.info.map(item => {
          return item.map(subItem => {
            let url = subItem.url
            if (url) subItem.type = url.split('/').pop().split('.')[1]
            return subItem
          })
        })
      },
    },
    methods: {
      mouseenter(index, i) {
        // console.log(index, i)
        this.previewIndex = index
        this.previewI = i
      },
      mouseleave() {
        this.previewIndex = -1
        this.previewI = -1
      },
      upload($event, index, i) {
        let files = $event.target.files || $event.dataTransfer.files;
        if (!files.length) return;
        let file = files[0];
        console.log(file)
        if (!(/pdf|jpeg|jpg|png/.test(file.type))) {  //file.type => image/jpeg image/png image/x-icon application/pdf
          return this.$message.warning("仅支持 pdf/jpg/png 格式文件");
        }
        if (file.size > 100000 * 1024) {
          $event.target.value = "";
          return this.$message.warning("请上传小于100M的文件");
        }
        let obj = {file}
        // console.log('obj', obj)
        let data = new FormData()
        Object.keys(obj).forEach((target) => {
          data.append(target, obj[target])
        })
        // console.log('data', data)
        console.log('test', data.get('file'));
        let config = {headers: {'Content-Type': 'multipart/form-data;charset=UTF-8'}}
        let url = 'http://106.12.22.8/general/oss/upload?dir=proof'
        axios.interceptors.request.eject(myInterceptor)// 取消总线拦截  防止文件格式转化 ..
        axios.post(url, data, config)
          .then(res => {
            // console.log('res', res)
            this.info[index][i].url = res
            this.autoSave(index, i)
          })
          .catch(err => {
            console.log('err', err)
          })
      },
      outputFormat() {
        let obj = {}
        this.info.forEach((item, i) => {
          let arr = item.map(subItem => {
            let params = {...subItem}
            return params
          })
          obj[arr[0].which] = arr
        })
        return obj
      },
      preview($event, index, i) {

        // return console.log('preview')
        let url = this.info[index][i].url
        let type
        if (url) type = url.split('/').pop().split('.')[1]
        if (type) {
          this.fileType.pdf.indexOf(type) > -1 && (this.$showPDF(url))
          this.fileType.office.indexOf(type) > -1 && (this.$showOffice(url))
          this.fileType.img.indexOf(type) > -1 && (this.$showImage(url))
        }
      },
      deleteHandel($event, index, i) {//http://127.0.0.1/job/theory/del?id=4347293044937938
        let item = this.info[index][i]
        let id = item.id
        if (!id) return console.log('id 不存在')
        let which = item.which //
        let url
        which == 'theoryList' && (url = `/job/theory/del?id=${id}`)
        which == 'patentList' && (url = `/job/patent/del?id=${id}`)
        which == 'honorList' && (url = `/job/honor/del?id=${id}`)
        this.$http.get(url)
          .then(res => {
            this.$message.success('删除成功')
            this.init()
            // if (which == 'theoryList') this.getBookInfo()
            // if (which == 'patentList') this.getPatentInfo()
            // if (which == 'honorList') this.getHonorInfo()
            console.log('res', res)
          })
          .catch(err => {
            console.log('err', err)
          })
      },
      deleteConfirm($event, index, i) {
        let item = this.info[index]
        if (item.length <= 1) {
          return this.$message.warning('注意 必至少保留一份文件资料')
        }
        this.$confirm('是否删除佐证材料文件 此操作将同时删除对应的申报资料', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.deleteHandel($event, index, i)
          })
          .catch(() => {
            this.$message({type: 'info', message: '已取消删除'});
          })
      },
      getBookInfo() {
        let declareId = this.id
        // let declareId = '4350449116009472'
        let query = {'w': [{'k': 'declareId', 'v': declareId, 'm': 'EQ'}], 'o': [], 'p': {}}
        let url = `/job/theory/proofList?query=${encodeURIComponent(JSON.stringify(query))}`

        this.$axios.get(url).then(res => {
          console.log('res', res)
          if (res && res.list && res.list.length > 0) {
            // this.info.list = [...res.list]
            res.list.map(item => {
              item.which = 'theoryList'
              item.title = '论文、论著及评著'
              return item
            })
            this.info.push(res.list)
          }
        }).catch(err => {
          console.log('err', err)
        })
      },
      getPatentInfo() {
        let declareId = this.id
        // let declareId = '4350449116009472'
        let query = {'w': [{'k': 'declareId', 'v': declareId, 'm': 'EQ'}], 'o': [], 'p': {}}
        let url = '/job/patent/proofList'

        this.$axios.get(url, {}, query).then(res => {
          console.log('res', res)
          if (res && res.list && res.list.length > 0) {
            // this.info.list = [...res.list]
            res.list.map(item => {
              item.which = 'patentList'
              item.title = '获得专利情况'
              return item
            })
            this.info.push(res.list)
          }
        }).catch(err => {
          console.log('err', err)
        })
      },
      getHonorInfo() {
        let declareId = this.id
        // let declareId = '4350449116009472'
        let query = {'w': [{'k': 'declareId', 'v': declareId, 'm': 'EQ'}], 'o': [], 'p': {}}
        let url = '/job/honor/proofList'
        this.$axios.get(url, {}, query).then(res => {
          console.log('res', res)
          if (res && res.list && res.list.length > 0) {
            // this.info.list = [...res.list]
            res.list.map(item => {
              item.which = 'honorList'
              item.title = '获奖及取得荣誉等情况'
              return item
            })
            this.info.push(res.list)
          }
        }).catch(err => {
          console.log('err', err)
        })
      },
      autoSave(index, i) {
        let obj = {
          theoryList: '/job/theory/upd',
          patentList: '/job/patent/upd',
          honorList: '/job/honor/upd'
        }
        let {which, id, url: fileUrl} = this.info[index][i]
        let url = obj[which]
        this.$http.post(url, {id, url: fileUrl}).then(({data: res}) => {
          console.log('res', res)
        }).catch(err => {
          console.log('err', err)
        })
      },
      init() {
        this.info = []
        this.getBookInfo()
        this.getPatentInfo()
        this.getHonorInfo()
      },
      hasEmpty() {
        return this.info.every(item => item.every(subItem => subItem.url))
      },
      submit(step) {
        this.$emit('change', step)
      }
    },
    mounted() {
      this.init()
    }
  }
</script>

<style scoped lang="scss">
  #page13 {
    padding-bottom: 60px;
    .title {
      margin-bottom: 39px;
    }
    .material-list {
      & > li {
        margin-bottom: 20px;
        & > ul > li {
          margin-bottom: 10px;
        }
        .title {
          font-size: 16px;
          line-height: 36px;
          margin-bottom: 20px;
        }
        .sub-item {
          height: 244px;
          box-sizing: border-box;
          border: 1px solid #ddd;
          padding: 4px 19px 0;
          .sub-title {
            font-size: 14px;
            line-height: 51px;
            color: rgba(51, 51, 51, 1);
            margin: 0;
          }
          .sub-con {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .lm-wrap {
              display: flex;
              align-items: center;
              .l-img {
                width: 130px;
                height: 158px;
                box-sizing: border-box;
                border: 1px dashed #ddd;
                margin-right: 30px;
                position: relative;
                & > .img-show {
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  width: 130px;
                  height: 158px;
                  position: relative;
                  .init {
                    width: 130px;
                    height: 158px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    & > img {
                      margin-bottom: 14px;
                      cursor: pointer;
                    }
                    p {
                      font-size: 14px;
                      line-height: 22px;
                      cursor: pointer;
                    }
                    & > p:nth-of-type(1) {
                      color: #666;
                    }
                    & > p:nth-of-type(2) {
                      color: #bbb;
                    }
                  }

                  // &>.hover-wrap {width: 130px; height: 158px; position: absolute; left: -1px; top: -1px; background: rgba(17, 17, 17, 0.541); text-align: center; line-height: 158px; color: #fff; font-size: 14px; display: none; z-index: 10;}

                  & > .hover-wrap {
                    width: 130px;
                    height: 158px;
                    position: absolute;
                    left: 134px;
                    top: -1px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    & > .upload {
                      width: 80px;
                      height: 30px;
                      box-sizing: border-box;
                      border: 1px solid #1890ff;
                      padding: 0;
                      font-size: 14px;
                      text-align: center;
                      line-height: 28px;
                      color: #1890ff;
                      cursor: pointer;
                    }
                  }
                }

                .preview-wrap {
                  position: absolute;
                  width: 130px;
                  height: 158px;
                  top: 0;
                  color: #fff;
                  font-size: 14px;
                  .preview {
                    width: 130px;
                    height: 158px;
                    box-sizing: border-box;
                    position: absolute;
                    left: 0px;
                    top: 0;
                    background: rgba(17, 17, 17, 0.541);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    & > p {
                      margin: 0;
                      margin-top: 10px;
                    }
                  }
                }
              }

            }
            .r-delete {
              & > button {
                width: 20px;
                height: 28px;
                background: url('./img/delete.png') no-repeat;
                cursor: pointer;
                border: 0;
              }
            }
          }
        }
      }
    }
    ul {
      padding: 0;
      margin: 0;
      list-style: none;
    }

    .disabled {
      pointer-events: none;
      cursor: not-allowed;
    }
    .ellipsis {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      max-width: 700px;
    }

    .isError {
      border-color: #F56C6C !important;
    }
    .isError-tip {
      font-size: 12px;
      color: #F56C6C;
      padding-top: 2px;
    }
  }
</style>
