<template>
  <div class="m-dyn-row-sec">
    <el-row>
      <el-col :span="23" class="m-dyn-row-sec-title"><h4>{{title}}</h4></el-col>
      <el-col :span="1">
        <!--<i class="m-dyn-row-sec-icon el-icon-remove-outline" :class="{'disabled':disabled}" @click="reduceRow(item)"-->
           <!--v-show="item.isCan.isReduce || (isReduce || false)"></i>-->
        <m-icon-reduce @reduceRow="reduceRow" :item="item" v-show="item.isCan.isReduce || (isReduce || false)" :disabled="disabled"></m-icon-reduce>
      </el-col>
    </el-row>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "m-dyn-row-sec",
    props: ['item', 'title', 'disabled','isReduce'],
    methods: {
      // addRow(item) {
      //   if (!item.name || !item.job) {
      //     this.$$message('请填写完整的记录', 'warning')
      //     return
      //   }
      //   let newobj = Object.assign({}, item);
      //   Object.keys(newobj).forEach(attr => {
      //     if (attr == 'isCan') {
      //       newobj[attr].isAdd = true
      //       newobj[attr].isReduce = true
      //     } else {
      //       newobj[attr] = ''
      //     }
      //   })
      //   this.$emit('addRow', newobj)
      // },
      reduceRow(item) {
        // if (this.disabled) return
        this.$emit('reduceRow', item)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .m-dyn-row-sec-title {
    margin-bottom: 20px;
  }

  .m-dyn-row-sec-icon {
    font-size: 20px;
    color: #bbb;
    /*cursor: pointer;*/
    /*&.disabled {*/
      /*cursor: not-allowed;*/
      /*color: #ccc !important;*/
    /*}*/
  }
</style>
