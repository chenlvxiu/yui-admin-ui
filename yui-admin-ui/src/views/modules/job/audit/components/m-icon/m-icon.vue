<template>
  <div class="icon" :class="iconClass">
    <img :src="icons[type]" alt="" class="width100">
  </div>
</template>

<script>
  export default {
    name: "m-icon",
    props: ['type'],
    data() {
      return {
        icons: {
          arrow: require('./images/icon-arrow-left@2x.png'),
          arrowActive: require('./images/icon-arrow-left-active@2x.png'),
          switch: require('./images/icon-switch@2x.png'),
          checked: require('./images/icon-checked@2x.png')
        }
      }
    },
    computed: {
      iconClass() {
        return `icon-${this.type}`
      }
    }
  }
</script>

<style lang="scss" scoped>
  .icon {
    &-arrow {
      width: 4px;
      height: 10px;
    }
    &-arrowActive {
      width: 4px;
      height: 10px;
    }
    &-switch {
      width: 14px;
      height: 14px;
    }
    &-checked{
      width: 20px;
      height: 20px;
    }
  }
</style>
