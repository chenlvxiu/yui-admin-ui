<template>
  <div>
    <!-- 后台管理面包屑-->
    <el-breadcrumb class="m-breadcrumb" separator-class="el-icon-arrow-right" v-if="type==1">
      <el-breadcrumb-item :to="{ name: 'ZCPS_B_Index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-if="item">
        <router-link :to="{name: item.path}">{{item.title}}</router-link>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <!--前台面包屑-->
    <el-breadcrumb class="m-breadcrumb" separator-class="el-icon-arrow-right" v-if="type==0">
      <el-breadcrumb-item :to="{ name: 'ZCPS_F_index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-if="item">
        <router-link :to="{name: item.path}">{{item.title}}</router-link>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
  import {menuList, mainMenu} from '@/libs/menuTree'

  export default {
    name: "m-breadcrumb",
    props: ['type'],
    computed: {
      item() {
        if (this.type == 1) {
          let activeMenu = menuList.find(item => {
            if (item.path == this.$route.fullPath.split('/')[2]) return item
          })
          return activeMenu
        } else {
          let activeMenu = mainMenu.find(item => {
            if (item.path.split('_')[2] == this.$route.fullPath.split('/')[2]) return item
          })
          return activeMenu
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .m-breadcrumb {
    display: flex;
    padding: 20px;
    box-sizing: border-box;
    align-items: center;
    height: 50px;
    background: #fff;
    @include border-1px($border)
  }
</style>
