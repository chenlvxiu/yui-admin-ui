<template>
  <div class="m-upload flex-row">
    <el-upload
      :ref="option.ref"
      class="avatar-uploader"
      :action="option.action"
      :accept="option.accept"
      :show-file-list="false"
      :on-success="handleSuccess"
      :before-upload="beforeUpload"
      :on-error="handleError"
      :disabled="option.disabled">
      <img v-if="imageUrl" :src="imageUrl" class="avatar width100">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <div class="m-upload-tips">请上传近期免冠2寸<br/><br/>清晰彩色证件照，格式为jpg</div>
  </div>
</template>

<script>
  const twoInch = 413 / 626
  export default {
    name: "m-upload-pic",
    inheritAttrs: false,
    props: ['dateValue', 'opt'],
    computed: {
      option() {
        let obj = {
          ref: '',
          data: {},
          name: '',
          action: `${this.$baseUrl}/general/oss/upload?dir=header`,
          accept: "image/jpeg",
          disabled: false
        }
        return Object.assign({}, obj, this.opt)
      },
      imageUrl: {
        get() {
          return this.dateValue
        },
        set(val) {   // 上传成功返回父组件的值，val
          this.$emit('input', val)
        }
      }
    },
    methods: {
      // 上传图片出错
      handleError(err, file, fileList) {
        this.$message.error(`${file.name}上传失败，请联系管理员`);
      },
      // 上传图片成功
      handleSuccess(res, file) {
        if (res.code == 0) {
          this.imageUrl = URL.createObjectURL(file.raw)
          this.$emit('input', res.data)
        } else {
          this.$message.error(res.msg)
        }
      },
      // 上传图片之前
      beforeUpload(file) {
        let img = new Image(), _this = this, flag = false
        img.src = URL.createObjectURL(file);
        img.onload = function () {
          // 打印判断图片比例是否为二寸照大小
          let width = img.width, height = img.height
          flag = (width / height) == twoInch
          if (!flag) {
            _this.$message.error('请上传二寸照比例(413*626)大小的图片!')
            _this.$refs[_this.option.ref].abort() //停止上传
          }
          return flag
        }
      },

    }
  }
</script>
<style lang="scss" scoped>
  .m-upload {
    align-items: center;

    &-tips {
      color: #bbb;
      font-size: 12px;
      flex: 1;
      margin-left: 10px;
      line-height: 1.2
    }
  }
</style>

<style>
  .avatar-uploader {
    width: 119px;
    height: 180px;
  }

  .avatar-uploader .el-upload {
    border: 1px solid #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 20px;
    height: 180px;
    line-height: 180px;
    text-align: center;

  }

  .avatar {
    /*width: 119px;*/
    /*height: 180px;*/
    display: block;
  }
</style>
