import office from './office'//vue 文件 => 实例对象
var $vm
export default {
  install(Vue, options) {
    if (!$vm) {
      const officePlugin = Vue.extend(office)
      $vm = new officePlugin().$mount()//
      document.body.appendChild($vm.$el)//
    }
    Vue.prototype.$showOffice = function (url) {
      $vm.showOffice(url)
    }
  }
}
