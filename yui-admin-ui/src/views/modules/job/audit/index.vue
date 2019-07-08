<template>
  <div class="wH100">
    <div class="toDelare flex-row" :style="siteContentViewHeight">
      <m-menu class="toDelare-menu" @change="change" :data-index="idx"></m-menu>
      <div class="toDelare-panel flex-1 wH100">
        <keep-alive>
          <component :is="menuList2[idx-1].path" @change="change" :id="$route.params.id"></component>
        </keep-alive>
      </div>
    </div>
    <!-- 评委会 -->
    <div class="footer flex-row" v-if="$hasPerm('job:declare:audit')&&(thxgFlag||passOrFlag)">
      <el-button v-if="thxgFlag" size="small"
                 @click="showDialog(1)">
        退回修改
      </el-button>

      <el-button v-if="passOrFlag"
                 size="small" @click="dosomething('确认审核通过?','30070.100.140')">审核通过
      </el-button>

      <el-button v-if="passOrFlag"
                 size="small" @click="showDialog(2)">审核不通过
      </el-button>
    </div>

    <!-- 专家 -->
    <div class="footer flex-row" v-if="$hasPerm('job:expertReview:upd')">
      <el-button size="small" @click="dosomething('确认审核通过?','30070.150.130')">审核通过</el-button>
      <el-button size="small" @click="dosomething('确认审核不通过?','30070.150.120')">审核不通过</el-button>
      <el-button size="small" @click="dosomething('确认弃权?','30070.150.110')">弃权</el-button>
    </div>
    <m-dialog :visible="visible" :text="text" @change="changeDialog"></m-dialog>
  </div>
</template>

<script>
  import mMenu from '@/views/modules/job/audit/components/m-menu/m-declare-menu'
  import mDialog from '@/views/modules/job/audit/components/m-dialog/m-dialog-passno.vue'
  import page_1 from './modules/page_1/page_1'
  import page_2 from './modules/page_2/page_2'
  import page_3 from './modules/page_3/page_3'
  import page_4 from './modules/page_4/page_4'
  import page_5 from './modules/page_5/page_5'
  import page_6 from './modules/page_6/page_6'
  import page_7 from './modules/page_7/page_7'
  import page_8 from './modules/page_8/page_8'
  import page_9 from './modules/page_9/page_9'
  import page_10 from './modules/page_10/page_10'
  import page_11 from './modules/page_11/page_11'
  import page_12 from './modules/page_12/page_12'
  import page_13 from './modules/page_13/page_13'
  import {menuList2} from '@/libs/menuTree'

  export default {
    components: {
      mDialog,
      mMenu,
      page_1,
      page_2,
      page_3,
      page_4,
      page_5,
      page_6,
      page_7,
      page_8,
      page_9,
      page_10,
      page_11,
      page_12,
      page_13
    },
    data() {
      return {
        statNm: '',
        dialogType: 0,     // 1退回修改，2审核不通过
        visible: false,
        idx: 1,
        menuList2: menuList2
      }
    },
    computed: {
      thxgFlag() {  // 退回修改：只有在初审中/复审不通过才有这个按钮
        let arrCon = ['初审中', '复审不通过']
        return arrCon.indexOf(this.statNm) !== -1
      },
      passOrFlag() {  // 通过/不通过：复审中、专家评审、结果公布 时不会有这两个按钮
        let arrCon = ['初审中', '复审通过', '复审不通过', '评前公示', '评审结束', '评后公示']
        return arrCon.indexOf(this.statNm) !== -1
      },
      text() {
        if (!this.dialogType) return '弹窗'
        if (this.dialogType == 1) return '退回修改'
        if (this.dialogType == 2) return '审核不通过'
      },
      documentClientHeight: {
        get() {
          return this.$store.state.common.documentClientHeight
        }
      },
      siteContentViewHeight() {
        let height = this.documentClientHeight - 50 - 30 - 2 - 80
        if ((this.$hasPerm('job:declare:audit') && (this.thxgFlag || this.passOrFlag)) || this.$hasPerm('job:expertReview:upd')) height = height - 50
        return {height: height + 'px'}
      },
      iframUrl() {
        return menuList2[this.idx - 1].path
      },
      menuActiveName: {
        get() {
          return this.$store.state.common.menuActiveName
        },
        set(val) {
          this.$store.commit('common/updateMenuActiveName', val)
        }
      },
      mainTabs: {
        get() {
          return this.$store.state.common.mainTabs
        },
        set(val) {
          this.$store.commit('common/updateMainTabs', val)
        }
      },
      mainTabsActiveName: {
        get() {
          return this.$store.state.common.mainTabsActiveName
        },
        set(val) {
          this.$store.commit('common/updateMainTabsActiveName', val)
        }
      },
    },
    methods: {
      change(e) {
        this.idx = e
      },
      dosomething(text, catCd) {
        this.$confirm(text, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //// 请求接口
          this.result(catCd)
        }).catch(() => {
        });
      },
      changeDialog(flag, content = '') {
        this.visible = flag
        // 这里请求不通过接口（不通过的内容是：content）
        let statCd = ''
        if (this.dialogType == 1) statCd = '30070.100.110'
        if (this.dialogType == 2) statCd = '30070.100.130'
        if (content) this.result(statCd, content)
      },
      showDialog(type) {
        this.dialogType = type
        this.visible = true
      },
      result(statCd, content = '') {
        let obj = {
          id: this.$hasPerm('job:declare:audit') ? this.$route.params.id : this.$route.params.reviewId,
          statCd: statCd
        }
        if (this.$hasPerm('job:declare:audit')) obj = Object.assign({}, obj, {opinion: content})
        let url = this.$hasPerm('job:declare:audit') ? '/job/declare/juryAudit' : '/job/expertReview/upd'
        console.log(url,obj)
        let loading = this.$$loading()
        this.$http.post(url, {...obj}).then(({data: res}) => {
          loading.close();
          if (res && res.code === 0) {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.tabsCloseCurrentHandle()
              }
            })
          } else {
            this.$message.error(res.msg)
          }
        }).catch(err => {
          loading.close();
          this.$message.error(err)
        })
      },
      // tabs, 关闭当前
      tabsCloseCurrentHandle() {
        this.removeTabHandle(this.mainTabsActiveName)
      },
      // tabs, 删除tab
      removeTabHandle (tabName) {
        this.mainTabs = this.mainTabs.filter(item => item.name !== tabName)
        if (this.mainTabs.length >= 1) {
          // 当前选中tab被删除
          if (tabName === this.mainTabsActiveName) {
            this.$router.push({ name: this.mainTabs[this.mainTabs.length - 1].name }, () => {
              this.mainTabsActiveName = this.$route.name
            })
          }
        } else {
          this.menuActiveName = ''
          this.$router.push({ name: 'home' })
        }
      },
    },
    mounted() {
      this.statNm = sessionStorage.getItem('juryStatNm')
    }

  }
</script>

<style lang="scss" scoped>
  .toDelare {
    border: 1px solid $border;
    &-menu {
      width: 170px;
    }
    &-panel {
      overflow: auto;
      padding: 0 20px;
    }
  }

  .footer {
    align-items: center;
    justify-content: center;
    height: 50px;
  }
</style>
