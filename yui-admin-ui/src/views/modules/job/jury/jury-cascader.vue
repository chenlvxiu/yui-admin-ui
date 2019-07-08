<template>
  <el-cascader style="width: 100%"
               v-model="seriseValue"
               :options="seriesOptions"
               @change="handleItemChange"
               :props="props" change-on-select
  ></el-cascader>
</template>

<script>
  export default {
    name: "jury-cascader",
    props: ['dataObj'],
    data() {
      return {
        props: {
          value: 'cd',
          label: 'nm',
          children: 'children'
        },
        seriesOptions: [],
        seriesObject: {
          serCd: '',
          serNm: '',
          proCd: '',
          proNm: ''
        }
      }
    },
    computed: {
      seriseValue: {
        get() {
          let arr = []
          if (this.dataObj.serCd) arr.push(this.dataObj.serCd)
          if (this.dataObj.proCd) arr.push(this.dataObj.proCd)
          if (arr.length) this.handleItemChange(arr)
          return arr
        },
        set(val) {
          this.$emit('input', this.serEmitValue(val))
        }
      }
    },
    mounted() {
      this.listProv()
    },
    methods: {
      getListData(prntCd) {
        return new Promise((resolve, reject) => {
          this.$http.get('/sys/cat/listByPrntCd?prntCd=' + prntCd).then(({data: res}) => {
            res.code == 0 ? resolve(res.data.list) : reject(res.msg)
          }).catch((err) => {
            reject(err)
          })
        })
      },
      listProv() {
        this.getListData('30050').then(res => {
          this.seriesOptions = res
          for (let item of this.seriesOptions) {
            this.$set(item, 'children', [])
          }
        }).catch(err => {
          this.$message.error(err)
        })
      },

      setValue(cd = '', attrs = [], list = []) {
        list.find(item => {
          if (cd == item.cd) {
            this.seriesObject[attrs[0]] = item.cd
            this.seriesObject[attrs[1]] = item.nm
          }
        })
      },

      serEmitValue(valArr = []) {
        let len = valArr.length
        Object.keys(this.seriesObject).forEach(attr => {
          this.seriesObject[attr] = ""
        })
        if (!len) return
        this.setValue(valArr[0], ['serCd', 'serNm'], this.seriesOptions)
        if (len == 2) {
          let itm = this.seriesOptions.find(item => {
            return valArr[0] == item.cd
          })
          this.setValue(valArr[1], ['proCd', 'proNm'], itm.children)
        }
        this.$emit('modify', this.seriesObject)
        return this.seriesObject
        // console.log("serEmitValue:", this.seriesObject)
      },

      handleItemChange(val) {
        let activeIdx = this.seriesOptions.findIndex(item => {
          return val[0] == item.cd
        })
        // this.serEmitValue(val)
        if (activeIdx == -1) return
        this.getListData(val[0]).then(res => {
          this.seriesOptions[activeIdx].children = res
        }).catch(err => {
          this.$message.error(err)
        })
      }
    }
  }
</script>

<style scoped>

</style>
