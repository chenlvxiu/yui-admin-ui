import Vue from "vue"

// 获取日期 "2019-04-24 12:00:00"=>"2019-04-24"
Vue.filter('date', function (value) {
  if (!value) return ''
  return value.split(' ')[0]
})
// 获取时间 "2019-04-24 12:00:00"=>"12:00:00"
Vue.filter('time', function (value) {
  if (!value) return ''
  return value.split(' ')[1]
})
