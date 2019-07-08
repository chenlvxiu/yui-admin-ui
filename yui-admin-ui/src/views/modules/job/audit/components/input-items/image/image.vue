<template>
  <div class="image-wrap" v-if="isShow">
      <div class="image">
        <el-button type="danger" class="close" size="mini" @click="close">关闭</el-button>
        <img :src="fileUrl" alt="">
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
      showImage (url) {
        this.fileUrl = url
        this.isShow = true
      },
      close () {
        this.isShow = false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .image-wrap {
    background-color: rgba(34, 30, 30, 0.788); position: fixed; width: 100%; height: 100%; top: 0; right: 0; bottom: 0; left: 0; z-index: 10;
    display: flex; justify-content: center; align-items: center;
    .image {
      position: relative;
      .close {position: absolute; right: 20px; top: 15px;}
      &>img {height: 400px;}
    }
  }
</style>
