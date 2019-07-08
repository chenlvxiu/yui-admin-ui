<template>
  <div class="sub-con">
    <div class="lm-wrap">
      <section class="l-img" v-loading="loading">
        <input type="file" id="eduimg" style="display:none;" @change="upload($event)">
        <label for="eduimg" class="img-show" id="img-show" :class="{'disabled': disabled}">
          <div class="init" v-if="!dataValue.url">
            <img src="./img/folder.png" alt="" width="32">
            <p>点击上传</p>
            <slot></slot>
          </div>
          <div class="has-img" v-else>
            <img src="./img/doc.png" v-if="dataValue.type == 'doc'|| dataValue.type == 'docx'" alt="" width="80">
            <img src="./img/jpg.png" v-if="dataValue.type == 'jpg' || dataValue.type == 'jpeg'" alt="" width="80">
            <img src="./img/pdf.png" v-if="dataValue.type == 'pdf'" alt="" width="80">
          </div>
          <div class="hover-wrap" v-if="!disabled">
            <span class="upload">{{dataValue.url ? '重新上传' : '点击上传'}}</span>
          </div>
        </label>
        <section class="preview-wrap" v-if="dataValue.url" @mouseenter="mouseHandle(true)"
                 @mouseleave="mouseHandle(false)">
          <div class="preview flex-column" id="search-preview" v-show="isPreFlag" @click="preview($event)">
            <img src="./img/preview.png" alt="">
            <p>点击预览</p>
          </div>
        </section>
      </section>
    </div>
  </div>
</template>

<script>
  export default {
    name: "m-filepreview",
    props: ['loading', 'dataValue', 'disabled'],
    data() {
      return {
        isPreFlag: false,
        fileType: {//对应类型--对应方法  打开
          img: ['jpg', 'jpeg', 'png'],
          office: ['doc', 'docx'],
          pdf: ['pdf']
        },
      }
    },
    methods: {
      mouseHandle(flag) {
        this.isPreFlag = flag
      },
      upload($event) {
        let files = $event.target.files || $event.dataTransfer.files;
        if (!files.length) return;
        let file = files[0];
        this.$emit('upload', file)
      },
      // 预览文件
      preview() {
        let url = this.dataValue.url
        let type = this.dataValue.type
        if (type) {
          this.fileType.pdf.indexOf(type) > -1 && (this.$showPDF(url))
          this.fileType.office.indexOf(type) > -1 && (this.$showOffice(url))
          this.fileType.img.indexOf(type) > -1 && (this.$showImage(url))
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  .disabled {
    pointer-events: none;
    cursor: not-allowed;
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
          cursor: pointer;
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

  .isError{
    .l-img{
      border-color: #F56C6C !important;
    }
  }
</style>
