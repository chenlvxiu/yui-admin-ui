import Vue from 'vue'

/**
 * session set
 */
export const setSession = (key, value) => {
  value = JSON.stringify(value)
  sessionStorage.setItem(key, value)
}

/**
 * session get
 */
export const getSession = key => {
  if (key == '') return ''
  let retValue = sessionStorage.getItem(key)
  if (retValue == null) return ''
  return retValue
}

/**
 * session remove
 */
export const delSesssion = key => {
  if (key) {
    sessionStorage.removeItem(key)
  }
}


/**
 * 获取浏览器高度
 */
export function getClientHeight() {
  let winHeight = 0
  if (window.innerHeight) {
    winHeight = window.innerHeight
  } else if ((document.body) && (document.body.clientHeight)) {
    winHeight = document.body.clientHeight
  }
  return winHeight
}

/**
 * 清除登录信息
 */
export function clearLoginInfo() {
  Vue.cookie.delete('zcps-token')
  // store.commit('resetStore')
}


/**
 * 公共参数
 */
export function commonParam(param) {
  let query = {
    "w": [],
    "o": [],
    "p": {}
  }
  return Object.assign({}, query, param)
}

/**
 * 判断是否都有值
 */
export function isBothVal(obj) {
  let flag = true
  Object.keys(obj).find(key => {
    let typeSort = Object.prototype.toString.call(obj[key])
    typeSort = typeSort.substr(0, typeSort.length - 1)
    typeSort = typeSort.substr(1, typeSort.length - 1).split(" ").pop()
    let type = typeSort.split(":").pop()
    switch (type) {
      case 'Null':
        flag = false
        break
      case 'Array':
        if (obj[key].length == '') {
          flag = false
        } else {
          flag = isBothVal(obj[key])
        }
        break
      case 'Object':
        if (JSON.stringify(obj) == "{}") {
          flag = false
        } else {
          flag = isBothVal(obj[key])
        }
        break
      default:
        if (obj[key].toString() == '') flag = false
    }
    return flag == false
  })
  return flag
}


/**
 * 判断是否有值
 */
export function isVal(obj) {
  let flag = false
  Object.keys(obj).find(key => {
    let typeSort = Object.prototype.toString.call(obj[key])
    typeSort = typeSort.substr(0, typeSort.length - 1)
    typeSort = typeSort.substr(1, typeSort.length - 1).split(" ").pop()
    let type = typeSort.split(":").pop()
    switch (type) {
      case 'Null':
        break
      case 'Array':
        if (obj[key].length) flag = isVal(obj[key])
        break
      case 'Object':
        if (JSON.stringify(obj[key]) != "{}") flag = isVal(obj[key])
        break
      default:
        if (obj[key].toString()) flag = true
    }
    return flag == true
  })
  return flag
}

/**
 * 判断动态增减row是否{isCan:{isAdd,isReduce}}
 */

export function DynRow(arr, minNm = 1) {
  let len = arr.length
  arr.forEach((item, key) => {
    item.isCan = {
      isAdd: true,
      isReduce: true
    }
    if (key + 1 < len) {
      item.isCan.isAdd = false
    }
    if (key < minNm && len <= minNm) {
      item.isCan.isReduce = false
    }
  })
  return arr
}

// 根据身份证计算生日（取到月）,取到日（str,14）
export function comBirth(str, end = 12) {
  if (end == 14) {
    return `${str.substring(6, 10)}-${str.substring(10, 12)}-${str.substring(12, end)}`
  } else {
    return `${str.substring(6, 10)}-${str.substring(10, end)}`
  }
}

// 计算日期转化格式
export function dateString(date, type = 'month') {
  if (!date) return ""
  let date1 = new Date(date)
  let y = date1.getFullYear()
  let m = date1.getMonth() + 1 < 10 ? `0${date1.getMonth() + 1}` : date1.getMonth() + 1
  let d = date1.getDate() < 10 ? `0${date1.getDate()}` : date1.getDate()

  switch (type) {
    case 'day':
      return `${y}-${m}-${d}`
    case 'month':
      return `${y}-${m}`
    case 'year':
      return `${y}`
  }
}

// 根据身份证计算性别(倒数第二位 偶数女，奇数男)
export function comSex(str) {
  return str.substring(str.length - 2, str.length - 1) % 2
}


// 验证动态验证码
export function dynCodeValidate(value, correctVal) {
  value = value.toUpperCase(); //获取输入框内验证码并转化为大写
  correctVal = correctVal.toUpperCase(); //获取输入框内验证码并转化为大写
  return value == correctVal
}






