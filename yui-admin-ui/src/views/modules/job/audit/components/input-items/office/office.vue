<template>
  <div class="office-wrap" v-if="isShow">
      <div class="office">
        <el-button type="danger" class="close" size="mini" @click="close">关闭</el-button>
        <iframe :src="fileUrl" width='100%' height='100%' frameborder='1'>
      </iframe>
      </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        isShow: false,
        fileUrl: ''
      }
    },
    methods: {
      showOffice (url) {
        this.fileUrl = `https://view.officeapps.live.com/op/view.aspx?src=${url}`
        this.isShow = true
      },
      close () {
        this.isShow = false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .office-wrap {
    background-color: rgba(34, 30, 30, 0.788); position: fixed; width: 100%; height: 100%; top: 0; right: 0; bottom: 0; left: 0; z-index: 10;
    display: flex; justify-content: center; align-items: center;
    .office {
      position: relative; width: 80%; height: 80%;
      .close {position: absolute; right: 20px; top: 15px;}
    }
  }
</style>
