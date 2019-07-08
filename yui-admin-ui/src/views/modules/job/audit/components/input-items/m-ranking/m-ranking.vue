<template>
  <div class="ranking">
    <m-input :value="numerator" :placeholder="placeholder" :contentType="contentType" @input="numeratorHandle" :disabled="disabled"></m-input> <span>/</span>
    <m-input :value="denominator" :placeholder="placeholder" :contentType="contentType" @input="denominatorHandle" :disabled="disabled"></m-input>
  </div>
</template>

<script>
import mInput from '../m-input/m-input.vue'
  export default {
    components: {mInput},
    data() { // numerator / denominator
      return {
        contentType: 'num1_9',
        placeholder: '',
      }
    },
    props: {
      numerator: {
        type: [String, Number],
        default: ''
      },
      denominator: {
        type: [String, Number],
        default: ''
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      numeratorHandle (val) {
        console.log('val1', val)
        this.$emit('numeratorHandle', val)
      },
      denominatorHandle (val) {
        console.log('val2', val)
        this.$emit('denominatorHandle', val)
      }
    },
  }
</script>

<style scoped lang="scss">
.ranking {
  display: flex;
  span {width: 50px; text-align: center; line-height: 28px;}
}
</style>
