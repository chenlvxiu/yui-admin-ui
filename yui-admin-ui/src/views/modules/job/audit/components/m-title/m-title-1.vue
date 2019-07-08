<template>
  <div class="m-title flex-row">
    <h4 class="m-title-text">{{text}}</h4>
    <p class="m-title-extra" v-if="this.$slots.extra">
      <slot name="extra"></slot>
    </p>
  </div>
</template>

<script>
  import {menuList2} from '@/libs/menuTree'

  export default {
    name: "m-title",
    data() {
      return {
        text: ''
      }
    },
    created() {
      this.text = `${this.$route.meta.title}`
    }
  }
</script>

<style lang="scss" scoped>
  .m-title {
    margin-bottom: 30px;
    &-text {
      color: $fontColor3;
      font-weight: bold;
      font-size: 16px;
    }
    &-extra {
      color: $fontColor6;
      font-size: 12px;
      margin-left: 10px;
    }
  }
</style>
