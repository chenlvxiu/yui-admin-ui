/**
 * 全站路由配置
 *
 * 建议:
 * 1. 代码中路由统一使用name属性跳转(不使用path属性)
 */
import Vue from 'vue'
import Router from 'vue-router'
import http from '@/utils/httpRequest'
import {isURL} from '@/utils/validate'
import {clearLoginInfo} from '@/utils'

Vue.use(Router)

// 开发环境不使用懒加载, 因为懒加载页面太多的话会造成webpack热更新太慢, 所以只有生产环境使用懒加载
const _import = require('./import-' + process.env.NODE_ENV)

// 全局路由(无需嵌套上左右整体布局)
const globalRoutes = [
  {path: '/404', component: _import('common/404'), name: '404', meta: {title: '404未找到'}},
  {path: '/login', component: _import('common/login'), name: 'login', meta: {title: '登录'}},

]

// 主入口路由(需嵌套上左右整体布局)
export const mainRoutes = {
  path: '/',
  component: _import('main'),
  name: 'main',
  redirect: {name: 'home'},
  meta: {title: '主入口整体布局'},
  children: [
    // 通过meta对象设置路由展示方式
    // 1. isTab: 是否通过tab展示内容, true: 是, false: 否
    // 2. iframeUrl: 是否通过iframe嵌套展示内容, '以http[s]://开头': 是, '': 否
    // 提示: 如需要通过iframe嵌套展示内容, 但不通过tab打开, 请自行创建组件使用iframe处理!
    {path: '/home', component: _import('modules/home'), name: 'home', meta: {title: '首页'}},
    // { path: '/theme', component: _import('common/theme'), name: 'theme', meta: { title: '主题' } },
    // { path: '/demo-echarts', component: _import('demo/echarts'), name: 'demo-echarts', meta: { title: 'demo-echarts', isTab: true } },
    // { path: '/demo-ueditor', component: _import('demo/ueditor'), name: 'demo-ueditor', meta: { title: 'demo-ueditor', isTab: true } }
    {
      path: '/job/jury/jury-edit',
      component: _import('modules/job/jury/jury-edit'),
      name: 'jury-add',
      meta: {...window.SITE_CONFIG['contentTabDefault'], title: '评委会新增'}
    },
    {
      path: '/job/jury/jury-edit',
      component: _import('modules/job/jury/jury-edit'),
      name: 'jury-edit',
      meta: {...window.SITE_CONFIG['contentTabDefault'], title: '评委会编辑'}
    },
    {
      path: '/job/notify/notify-add',
      component: _import('modules/job/notify/notify-edit'),
      name: 'notify-add',
      meta: {...window.SITE_CONFIG['contentTabDefault'], title: '通知公告-新增'}
    },
    {
      path: '/job/notify/notify-edit',
      component: _import('modules/job/notify/notify-edit'),
      name: 'notify-edit',
      meta: {...window.SITE_CONFIG['contentTabDefault'], title: '通知公告-修改'}
    },
    {
        path: '/job/policy/policy-add',
        component: _import('modules/job/policy/policy-edit'),
        name: 'policy-add',
        meta: {...window.SITE_CONFIG['contentTabDefault'], title: '政策文件-新增'}
    },
    {
      path: '/job/policy/policy-edit',
      component: _import('modules/job/policy/policy-edit'),
      name: 'policy-edit',
      meta: {...window.SITE_CONFIG['contentTabDefault'], title: '政策文件-修改'}
    },
    {
      path: '/job/pubbef/pubbef-add',
      component: _import('modules/job/pubbef/pubbef-edit'),
      name: 'pubbef-add',
      meta: {...window.SITE_CONFIG['contentTabDefault'], title: '评前公示-新增'}
    },
    {
      path: '/job/pubbef/pubbef-edit',
      component: _import('modules/job/pubbef/pubbef-edit'),
      name: 'pubbef-edit',
      meta: {...window.SITE_CONFIG['contentTabDefault'], title: '评前公示-修改'}
    },
    {
      path: '/job/pubaft/pubaft-add',
      component: _import('modules/job/pubaft/pubaft-edit'),
      name: 'pubaft-add',
      meta: {...window.SITE_CONFIG['contentTabDefault'], title: '评后公示-新增'}
    },
    {
      path: '/job/pubaft/pubaft-edit',
      component: _import('modules/job/pubaft/pubaft-edit'),
      name: 'pubaft-edit',
      meta: {...window.SITE_CONFIG['contentTabDefault'], title: '评后公示-修改'}
    },
    {
      path: '/job/result/result-add',
      component: _import('modules/job/result/result-edit'),
      name: 'result-add',
      meta: {...window.SITE_CONFIG['contentTabDefault'], title: '结果公布-新增'}
    },
    {
      path: '/job/result/result-edit',
      component: _import('modules/job/result/result-edit'),
      name: 'result-edit',
      meta: {...window.SITE_CONFIG['contentTabDefault'], title: '结果公布-修改'}
    },
    {
      path: '/job/guide/guide-add',
      component: _import('modules/job/guide/guide-edit'),
      name: 'guide-add',
      meta: {...window.SITE_CONFIG['contentTabDefault'], title: '申请指南-新增'}
    },
    {
        path: '/job/guide/guide-edit',
        component: _import('modules/job/guide/guide-edit'),
        name: 'guide-edit',
        meta: {...window.SITE_CONFIG['contentTabDefault'], title: '申请指南-修改'}
    },
    {
        path: '/job/problem/problem-add',
        component: _import('modules/job/problem/problem-edit'),
        name: 'problem-add',
        meta: {...window.SITE_CONFIG['contentTabDefault'], title: '常见问题-新增'}
    },
    {
       path: '/job/problem/problem-edit',
       component: _import('modules/job/problem/problem-edit'),
       name: 'problem-edit',
       meta: {...window.SITE_CONFIG['contentTabDefault'], title: '常见问题-修改'}
    },
    {
      path: '/ZCPS_B/toDeclare',
      name: 'toDeclare',
      component: _import('modules/job/audit/index'),
      meta: {...window.SITE_CONFIG['contentTabDefault'], title: '材料申请', isTab: true},
    },
    {
      path: '/job/juryReview/juryReview-user',
      component: _import('modules/job/juryReview/juryReview-user'),
      name: 'juryReview-user',
      meta: {...window.SITE_CONFIG['contentTabDefault'], title: '职称评审-申报人员'}
    },
    {
      path: '/job/juryReview/juryReview-log',
      component: _import('modules/job/juryReview/juryReview-log'),
      name: 'juryReview-log',
      meta: {...window.SITE_CONFIG['contentTabDefault'], title: '职称评审-申报人员-记录'}
    },
    {
        path: '/job/rsjReview/rsjReview-user',
        component: _import('modules/job/rsjReview/rsjReview-user'),
        name: 'rsjReview-user',
        meta: {...window.SITE_CONFIG['contentTabDefault'], title: '复核备案-申报人员'}
    },
    {
      path: '/job/juryExpert/juryExpert',
      component: _import('modules/job/juryExpert/juryExpert'),
      name: 'juryExpert',
      meta: {...window.SITE_CONFIG['contentTabDefault'], menuId:4379761062302720,title: '专家评审'}
    },
    {
      path: '/job/juryExpert/juryExpert-user',
      component: _import('modules/job/juryExpert/juryExpert-user'),
      name: 'juryExpert-user',
      meta: {...window.SITE_CONFIG['contentTabDefault'], title: '专家评审-申报人员'}
    },
    {
      path: '/job/juryExpert/juryExpert-info',
      component: _import('modules/job/juryExpert/juryExpert-info'),
      name: 'juryExpert-info',
      meta: {...window.SITE_CONFIG['contentTabDefault'], title: '专家评审-申报人员-专家评审详情'}
    },
    {
      path: '/job/juryExpert/juryExpert-expert',
      component: _import('modules/job/juryExpert/juryExpert-expert'),
      name: 'juryExpert-expert',
      meta: {...window.SITE_CONFIG['contentTabDefault'], title: '专家评审-专家列表'}
    },
    {
      path: '/job/juryReview/juryReview-trans',
      component: _import('modules/job/juryReview/juryReview-trans'),
      name: 'juryReview-trans',
      meta: {...window.SITE_CONFIG['contentTabDefault'], title: '职称评审-申报人员-转送'}
    },
    {
      path: '/job/juryExpert/juryExpert-add',
      component: _import('modules/job/juryExpert/juryExpert-add'),
      name: 'juryExpert-add',
      meta: {...window.SITE_CONFIG['contentTabDefault'], title: '专家评审-设置专家'}
    }

  ],
  beforeEnter(to, from, next) {
    // let token = Vue.cookie.get('token')
    // if (!token || !/\S/.test(token)) {
    //   clearLoginInfo()
    //   next({ name: 'login' })
    // }
    next()
  }
}

const router = new Router({
  mode: 'hash',
  scrollBehavior: () => ({y: 0}),
  isAddDynamicMenuRoutes: false, // 是否已经添加动态(菜单)路由
  routes: globalRoutes.concat(mainRoutes)
})

router.beforeEach((to, from, next) => {
  // 添加动态(菜单)路由
  // 1. 已经添加 or 全局路由, 直接访问
  // 2. 获取菜单列表, 添加并保存本地存储
  if (router.options.isAddDynamicMenuRoutes || fnCurrentRouteType(to, globalRoutes) === 'global') {
    next()
  } else {
    http.get('/general/menu/listTree').then(({data: res}) => {
      if (res && res.code === 0) {
        fnAddDynamicMenuRoutes(res.data.list)
        router.options.isAddDynamicMenuRoutes = true
        sessionStorage.setItem('menuList', JSON.stringify(res.data.list || '[]'))
        // sessionStorage.setItem('permissions', JSON.stringify(res.permissions || '[]'))
        next({...to, replace: true})
      } else {
        sessionStorage.setItem('menuList', '[]')
        // sessionStorage.setItem('permissions', '[]')
        next()
      }
    }).catch((e) => {
      console.log(`%c${e} 请求菜单列表和权限失败，跳转至登录页！！`, 'color:blue')
      router.push({name: 'login'})
    })

    // http({
    //   url: http.adornUrl('/sys/menu/nav'),
    //   method: 'get',
    //   params: http.adornParams()
    // }).then(({data}) => {
    //   if (data && data.code === 0) {
    //     fnAddDynamicMenuRoutes(data.menuList)
    //     router.options.isAddDynamicMenuRoutes = true
    //     sessionStorage.setItem('menuList', JSON.stringify(data.menuList || '[]'))
    //     sessionStorage.setItem('permissions', JSON.stringify(data.permissions || '[]'))
    //     next({ ...to, replace: true })
    //   } else {
    //     sessionStorage.setItem('menuList', '[]')
    //     sessionStorage.setItem('permissions', '[]')
    //     next()
    //   }
    // }).catch((e) => {
    //   console.log(`%c${e} 请求菜单列表和权限失败，跳转至登录页！！`, 'color:blue')
    //   router.push({ name: 'login' })
    // })
  }
})

/**
 * 判断当前路由类型, global: 全局路由, main: 主入口路由
 * @param {*} route 当前路由
 */
function fnCurrentRouteType(route, globalRoutes = []) {
  var temp = []
  for (var i = 0; i < globalRoutes.length; i++) {
    if (route.path === globalRoutes[i].path) {
      return 'global'
    } else if (globalRoutes[i].children && globalRoutes[i].children.length >= 1) {
      temp = temp.concat(globalRoutes[i].children)
    }
  }
  return temp.length >= 1 ? fnCurrentRouteType(route, temp) : 'main'
}

/**
 * 添加动态(菜单)路由
 * @param {*} menuList 菜单列表
 * @param {*} routes 递归创建的动态(菜单)路由
 */
function fnAddDynamicMenuRoutes(menuList = [], routes = []) {
  var temp = []
  for (var i = 0; i < menuList.length; i++) {
    if (menuList[i].children && menuList[i].children.length >= 1) {
      temp = temp.concat(menuList[i].children)
    } else if (menuList[i].url && /\S/.test(menuList[i].url)) {
      menuList[i].url = menuList[i].url.replace(/^\//, '')
      var route = {
        path: menuList[i].url.replace('/', '-'),
        component: null,
        name: menuList[i].url.replace('/', '-'),
        meta: {
          menuId: menuList[i].id,
          title: menuList[i].nm,
          isDynamic: true,
          isTab: true,
          iframeUrl: ''
        }
      }
      // url以http[s]://开头, 通过iframe展示
      if (isURL(menuList[i].url)) {
        route['path'] = `i-${menuList[i].id}`
        route['name'] = `i-${menuList[i].nm}`
        route['meta']['iframeUrl'] = menuList[i].url
      } else {
        try {
          route['component'] = _import(`modules/${menuList[i].url}`) || null
          console.log(_import(`modules/${menuList[i].url}`))
        } catch (e) {
        }
      }
      routes.push(route)
    }
  }
  if (temp.length >= 1) {
    fnAddDynamicMenuRoutes(temp, routes)
  } else {
    mainRoutes.name = 'main-dynamic'
    mainRoutes.children = routes
    router.addRoutes([
      mainRoutes,
      {path: '*', redirect: {name: '404'}}
    ])
    sessionStorage.setItem('dynamicMenuRoutes', JSON.stringify(mainRoutes.children || '[]'))
    console.log('\n')
    console.log('%c!<-------------------- 动态(菜单)路由 s -------------------->', 'color:blue')
    console.log(mainRoutes.children)
    console.log('%c!<-------------------- 动态(菜单)路由 e -------------------->', 'color:blue')
  }
}

export default router
