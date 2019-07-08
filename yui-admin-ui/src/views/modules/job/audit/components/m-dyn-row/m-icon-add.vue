<template>
  <i class="m-dyn-row-icon-item el-icon-circle-plus-outline" :class="{'disabled':disabled}" @click="addRow(item)"></i>
</template>

<script>
  export default {
    name: "m-icon-add",
    props: {
      item: {
        type: Object,
        require: true
      },
      isRequire: {
        type: Boolean,
        default: true
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      addRow(item) {

        if (this.disabled) return
        let aaa = Object.assign({}, item)
        delete aaa.id
        if (this.isRequire && !this.$method.isBothVal(this.item)) {
          this.$message.warning('请填写完整的记录')
          return
        }
        let newobj = Object.assign({}, item);
        Object.keys(newobj).forEach(attr => {
          if (attr == 'isCan') {
            newobj[attr].isAdd = true
            newobj[attr].isReduce = true
          } else {
            newobj[attr] = ''
          }
        })
        this.$emit('addRow', newobj)
      },
    }
  }
</script>

<style lang="scss" scoped>
  .m-dyn-row-icon-item {
    cursor: pointer;
    &.disabled {
      cursor: not-allowed;
      color: #ccc !important;
    }
  }
</style>
