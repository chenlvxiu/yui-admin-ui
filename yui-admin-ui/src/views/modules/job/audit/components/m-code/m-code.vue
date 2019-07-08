<template>
  <el-button class="m-code button-plain" :disabled="getCodeFlag" @click="getCode" type="primary" plain>{{text}}</el-button>
</template>

<script>
  export default {
    name: "m-code",
    props: {
      duration: {
        type: Number,
        default: 60
      },
      canSendCode: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        textArr: ['获取验证码', '已发送'],
        getCodeFlag: false,
        time: this.duration
      }

    },
    computed: {
      text() {
        return this.getCodeFlag ? `${this.textArr[1]} ${this.time}s` : this.textArr[0]
      },
    },
    methods: {
      getCode() {
        if (!this.canSendCode) {
          this.$$message('请填写正确的手机号','warning')
          return false
        }
        this.getCodeFlag = !this.getCodeFlag
        let auth_timetimer = setInterval(() => {
          this.time--;
          if (this.time < 0) {
            this.time = this.duration
            this.getCodeFlag = !this.getCodeFlag
            clearInterval(auth_timetimer);
          }
        }, 1000);
        this.$emit("getCode", this.getCodeFlag)
        // 请求验证码api
      }
    }
  }
</script>

<style lang="scss" scoped>
  .m-code {
    margin-left: 10px;
  }
</style>
