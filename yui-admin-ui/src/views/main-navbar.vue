<template>
  <nav class="site-navbar" :class="'site-navbar--' + navbarLayoutType">
    <div class="site-navbar__header">
      <h1 class="site-navbar__brand" @click="$router.push({ name: 'home' })">
        <a class="site-navbar__brand-lg" href="javascript:;">行走的医院管理系统</a>
        <a class="site-navbar__brand-mini" href="javascript:;">行走的医院管理系统</a>
      </h1>
    </div>
    <div class="site-navbar__body clearfix">
      <el-menu
        class="site-navbar__menu"
        mode="horizontal">
        <el-menu-item class="site-navbar__switch" index="1" @click="sidebarFold = !sidebarFold" title="伸缩">
          <icon-svg name="zhedie"></icon-svg>
        </el-menu-item>
        <el-menu-item class="site-navbar__switch" index="2" @click="refresh()" title="刷新">
          <icon-svg name="sync"></icon-svg>
        </el-menu-item>
        <el-menu-item class="site-navbar__switch" index="3" @click="fullscreenHandle()" title="全屏">
          <icon-svg name="fullscreen"></icon-svg>
        </el-menu-item>
      </el-menu>
      <el-menu
        class="site-navbar__menu site-navbar__menu--right "
        mode="horizontal">
        <!-- <el-menu-item class="site-navbar__switch" index="0" @click="fullscreenHandle()" tittle="全屏">
          <icon-svg name="fullscreen"></icon-svg>
        </el-menu-item> -->
        <!-- <el-menu-item index="1" @click="$router.push({ name: 'theme' })">
          <template slot="title">
            <el-badge value="new">
              <icon-svg name="shezhi" class="el-icon-setting"></icon-svg>
            </el-badge>
          </template>
        </el-menu-item> -->
        <!-- <el-menu-item index="2">
          <el-badge value="hot">
            <a href="//www.baidu.com/" target="_blank">百度</a>
          </el-badge>
        </el-menu-item> -->
        <!-- <el-submenu index="3">
          <template slot="title">语言</template>
          <el-menu-item index="2-1"><a href="///www.baidu.com" target="_blank">中文</a></el-menu-item>
          <el-menu-item index="2-2"><a href="///www.baidu.com" target="_blank">英文</a></el-menu-item>
          <el-menu-item index="2-3"><a href="///www.baidu.com" target="_blank">繁体</a></el-menu-item>
        </el-submenu> -->
        <el-menu-item class="site-navbar__avatar" index="4">
            <span class="el-dropdown-link">
              <img v-if="!avatar" src="~@/assets/img/avatar.png" :alt="userName">
              <img v-else :src="avatar">
              	{{ userName }}
            </span>
        </el-menu-item>
        <!-- <el-menu-item class="site-navbar__switch" index="6" title="修改密码"  @click.native="updatePasswordHandle()">
          <icon-svg name="edit" ></icon-svg>
        </el-menu-item>  -->
        <el-menu-item class="site-navbar__switch" index="7" title="注销"  @click.native="logoutHandle()">
          <icon-svg name="poweroff" ></icon-svg>
        </el-menu-item>
      </el-menu>
    </div>
    <!-- 弹窗, 修改密码 -->
    <update-password v-if="updatePassowrdVisible" ref="updatePassowrd"></update-password>
  </nav>
</template>

<script>
  import UpdatePassword from './main-navbar-update-password'
  import screenfull from 'screenfull'
  import { clearLoginInfo } from '@/utils'
  export default {
    inject: ['refresh'],
    data () {
      return {
        updatePassowrdVisible: false
      }
    },
    components: {
      UpdatePassword
    },
    computed: {
      navbarLayoutType: {
        get () { return this.$store.state.common.navbarLayoutType }
      },
      sidebarFold: {
        get () { return this.$store.state.common.sidebarFold },
        set (val) { this.$store.commit('common/updateSidebarFold', val) }
      },
      mainTabs: {
        get () { return this.$store.state.common.mainTabs },
        set (val) { this.$store.commit('common/updateMainTabs', val) }
      },
      userName: {
        get () { return this.$store.state.user.name }
      },
      avatar: {
        get () { return this.$store.state.user.avatar }
      }
    },
    mounted() {
	},
    methods: {

      // 全屏
      fullscreenHandle () {
        if (!screenfull.enabled) {
          return this.$message({
            message: this.$t('fullscreen.prompt'),
            type: 'warning',
            duration: 500
          })
        }
        screenfull.toggle()
      },
      // 修改密码
      updatePasswordHandle () {
        this.updatePassowrdVisible = true
        this.$nextTick(() => {
          this.$refs.updatePassowrd.init()
        })
      },
      // 退出
      logoutHandle () {
        this.$confirm(`确定进行[退出]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.get('/general/access/logout').then(({data: res}) => {
            if (res && res.code === 0) {
              clearLoginInfo()
              this.$router.push({ name: 'login' })
              window.location.href = 'http://zcps.xlylai.com/#/login'
            }
          })
        }).catch(() => {})
      }
    }
  }
</script>
<style>
.audit-ordering .el-badge__content {
  background-color:	#409EFF
}
</style>
