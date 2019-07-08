import Vue from 'vue'
import App from '@/App'
import router from '@/router'                 // api: https://github.com/vuejs/vue-router
import store from '@/store'                   // api: https://github.com/vuejs/vuex
import VueCookie from 'vue-cookie'            // api: https://github.com/alfhen/vue-cookie
import '@/element-ui'                         // api: https://github.com/ElemeFE/element
import '@/icons'                              // api: http://www.iconfont.cn/
import '@/element-ui-theme'
import '@/assets/scss/index.scss'
import httpRequest from '@/utils/httpRequest' // api: https://github.com/axios/axios
import { isAuth, hasPermission } from '@/utils'
import cloneDeep from 'lodash/cloneDeep'
import '@/views/modules/job/audit/components'
import {maxlen, pickOpt, prntCd, baseUrl} from '@/libs/constant'
import * as method from '@/libs/index'
import * as validate from '@/libs/validate'
import md5 from 'js-md5'
import '@/libs/filter'   // 过滤器
import * as mAxios from '@/libs/axios'

import pdf from '@/views/modules/job/audit/components/input-items/pdf'
import image from '@/views/modules/job/audit/components/input-items/image'
import office from '@/views/modules/job/audit/components/input-items/office'   // office预览
Vue.use(pdf)
Vue.use(image)
Vue.use(office)

Vue.use(VueCookie)
Vue.config.productionTip = false

// 挂载全局
Vue.prototype.$http = httpRequest // ajax请求方法
Vue.prototype.$axios = mAxios // mAxios请求方法
Vue.prototype.$isAuth = isAuth     // 权限方法
Vue.prototype.$hasPerm = hasPermission     // 权限方法

Vue.prototype.$maxlen = maxlen // 表单限制字符
Vue.prototype.$valid = validate // 正则
Vue.prototype.$pickOpt = pickOpt // 表单时间限制选择今日之前
Vue.prototype.$prntCd = prntCd // 证件类型
Vue.prototype.$baseUrl = baseUrl // 请求Url

Vue.prototype.$method = method // 公用方法
Vue.prototype.$md5 = md5;

// 保存整站vuex本地储存初始状态
window.SITE_CONFIG['storeState'] = cloneDeep(store.state)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
