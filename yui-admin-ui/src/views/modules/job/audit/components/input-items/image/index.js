import image from './image'
var $vm
export default {
  install(Vue, options) {
    if (!$vm) {
      const imagePlugin = Vue.extend(image)
      $vm = new imagePlugin().$mount()//
      document.body.appendChild($vm.$el)//
    }
    Vue.prototype.$showImage = function (url) {
      $vm.showImage(url)
    }
  }
}
