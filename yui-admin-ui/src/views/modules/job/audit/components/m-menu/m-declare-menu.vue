<template>
  <div class="m-menu flex-column">
    <router-link to="" tag="div" class="m-menu-item" :class="{'active':index==menu.id}"
                 v-for="menu in menuList"
                 :key="menu.id" @click.native="doChange(menu)">
      {{menu.id}}.{{menu.title}}
    </router-link>
  </div>
</template>

<script>
  import {menuList2} from '@/libs/menuTree'

  export default {
    name: "m-menu",
    props: ['dataIndex'],
    data() {
      return {
        menuList: menuList2
      }
    },
    computed: {
      index() {
        return this.dataIndex
      }
    },
    methods: {
      doChange(item) {
        this.$emit("change", item.id)
      }
    }
  }
</script>

<style lang="scss" scoped>

  .m-menu {
    height: 100%;
    font-size: 14px;
    background: #f7f7f7;
    text-align: right;
    overflow: auto;
    &-item {
      cursor: pointer;
      padding: 13px 20px;
      color: $fontColor6;
      transition: all .3s;
      &.active {
        color: #fff;
        background: $--color-primary;
        position: relative;
        &:after {
          width: 0;
          height: 0;
          content: "";
          border-width: 8px 8px 8px 0;
          border-style: solid;
          border-color: transparent #fff transparent transparent; /*透明 灰 透明 透明 */
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
</style>
