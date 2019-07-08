export const maxlen = {
  phone: 11,
  tel: 8,
  twoHundred: 500,
  password: [6, 12],
  eighteen: 18
}

export const pickOpt = {
  disabledDate: (time) => {
    return time.getTime() > new Date();
  }
}

export const prntCd = {
  zjlx: '30060.100', // 证件类型
  sbxl: '30050',// 申报系列
}

// export const baseUrl = 'http://192.168.1.103'
export const baseUrl = 'http://106.12.22.8'
