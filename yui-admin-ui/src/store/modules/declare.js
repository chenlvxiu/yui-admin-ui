import * as http from '@/libs/axios'

///// 申报步骤接口
const actions = {
  // 1.个人申请-获取详情
  d_getFirstInfo({commit}, params) {
    return new Promise((resolve, reject) => {
      let url = '/job/declare/firstInfo'
      http.get(url, params).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },

  // 1.个人申请-保存，下一步
  d_submitFirst(store, params) {
    const {commit, dispatch, state, rootState, rootCommit} = store
    return new Promise((resolve, reject) => {
      let url = '/job/declare/firstEdit'
      http.post(url, params).then(res => {
        commit('user/setDeclareId', res.declareId, {root: true}) // 申报ID
        commit('user/setStep', res.step, {root: true})   // 最大步骤数目
        commit('user/setNowStep', params.action == 'next' ? 2 : 1, {root: true}) // 当前步骤数(下一步要加1)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },


  // 2.基本信息-获取详情
  d_getSecondInfo(store, params) {
    return new Promise((resolve, reject) => {
      let url = '/job/declare/secondInfo'
      http.get(url, params).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },

  // 2.基本信息-保存，下一步
  d_submitSecond(store, params) {
    const {commit, dispatch, state, rootState, rootCommit} = store
    return new Promise((resolve, reject) => {
      let url = '/job/declare/secondEdit'
      http.post(url, params).then(res => {
        commit('user/setStep', res.step, {root: true})   // 最大步骤数目
        commit('user/setNowStep', params.action == 'next' ? 3 : 2, {root: true}) // 当前步骤数(下一步要加1)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },


  // 3.专业工作经历-获取详情
  d_getWorkInfo(store, params) {
    return new Promise((resolve, reject) => {
      let url = '/job/work/list'
      http.get(url, {}, params).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },

  // 3.专业工作经历-保存/下一步
  d_submitWorkInfo(store, params) {
    const {commit, dispatch, state, rootState, rootCommit} = store
    return new Promise((resolve, reject) => {
      let url = '/job/work/edit'
      http.post(url, params).then(res => {
        commit('user/setStep', res.step, {root: true})   // 最大步骤数目
        commit('user/setNowStep', params.action == 'next' ? 4 : 3, {root: true}) // 当前步骤数
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },


  // 4.任现职前-获取详情
  d_getKbefInfo(store, params) {
    return new Promise((resolve, reject) => {
      let url = '/job/skbef/list'
      http.get(url, {}, params).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })

    })
  },

  // 4.任现职前-保存/下一步
  d_submitSkbefInfo(store, params) {
    const {commit, dispatch, state, rootState, rootCommit} = store
    return new Promise((resolve, reject) => {
      let url = '/job/skbef/edit'
      http.post(url, params).then(res => {
        commit('user/setStep', res.step, {root: true})   // 最大步骤数目
        commit('user/setNowStep', params.action == 'next' ? 5 : 4, {root: true}) // 当前步骤数
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },

  // 5.任现职后-获取详情
  d_getSkaftInfo(store, params) {
    return new Promise((resolve, reject) => {
      let url = '/job/skaft/list'
      http.get(url, {}, params).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })

    })
  },

  // 5.任现职后-保存/下一步
  d_submitSkaftInfo(store, params) {
    const {commit, dispatch, state, rootState, rootCommit} = store
    return new Promise((resolve, reject) => {
      let url = '/job/skaft/edit'
      http.post(url, params).then(res => {
        commit('user/setStep', res.step, {root: true})   // 最大步骤数目
        commit('user/setNowStep', params.action == 'next' ? 6 : 5, {root: true}) // 当前步骤数
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },

  // 6.著作、论文及重要技术报告登记-获取详情
  d_getTheoryInfo(store, params) {
    return new Promise((resolve, reject) => {
      let url = '/job/theory/list'
      http.get(url, {}, params).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },

  // 6.著作、论文及重要技术报告登记-保存/下一步
  d_submitTheoryInfo(store, params) {
    const {commit, dispatch, state, rootState, rootCommit} = store
    return new Promise((resolve, reject) => {
      let url = '/job/theory/edit'
      http.post(url, params).then(res => {
        commit('user/setStep', res.step, {root: true})   // 最大步骤数目
        commit('user/setNowStep', params.action == 'next' ? 7 : 6, {root: true}) // 当前步骤数
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },


  // 13.量化打分-获取详情
  d_getScoreFile(store, params) {
    return new Promise((resolve, reject) => {
      let url = '/job/scoreFile/scoreFileList'
      http.get(url, {}, params).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },

  // 13.量化打分-保存编辑
  d_submitScoreFile(store, params) {
    return new Promise((resolve, reject) => {
      let url = '/job/scoreFile/edit'
      http.post(url, params).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },


  // 提交申请接口
  d_submit(store, params) {
    const {commit, dispatch, state, rootState, rootCommit} = store
    return new Promise((resolve, reject) => {
      let url = '/job/declare/submit'
      http.post(url, {}, params).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },



  /////////////////////////////下拉选项////////////
  // 主管部门列表查询
  getDeptDeclareList({commit}, params) {
    return new Promise((resolve, reject) => {
      let url = '/job/jury/declareList'
      http.get(url, params).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },

  // 通用接口-下拉数据通用接口
  listByPrntCd({commit}, params) {
    return new Promise((resolve, reject) => {
      let url = '/sys/cat/listByPrntCd'
      http.get(url, params).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },


  // 通用接口-上传文件
  ossUpload({commit}, params) {
    return new Promise((resolve, reject) => {
      let url = '/general/oss/upload'
      http.post(url, params).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },

}


export default {
  namespaced: true,
  actions
}
