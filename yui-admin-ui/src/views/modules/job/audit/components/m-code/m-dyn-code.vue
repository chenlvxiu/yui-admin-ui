<template>
  <div class="dyn-code" @click="createCode"><span>{{dynCode}}</span></div>
</template>

<script>
  export default {
    name: "m-dyn-code",
    data() {
      return {
        dynCode: ''
      }
    },
    methods: {
      createCode() {
        let code = "";
        let codeLength = this.$maxlen.four; //验证码的长度
        let random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
          'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'); //随机数
        for (let i = 0; i < codeLength; i++) { //循环操作
          let index = Math.floor(Math.random() * 36); //取得随机数的索引（0~35）
          code += random[index]; //根据索引取得随机数加到code上
        }
        this.dynCode = code; //把code值赋给验证码
        this.$emit('change', this.dynCode)
      }
    },
    created() {
      this.createCode()
    }
  }
</script>

<style lang="scss" scoped>
  .dyn-code {
    width: 90px;
    background: #EBD3D0;
    margin-left: 10px;
    cursor: pointer;
    text-align: center;
    span {
      font-size: 14px;
      font-family: Arial;
      font-style: italic;
      font-weight: bold;
      border: 0;
      letter-spacing: 2px;
      color: blue;
      background-image: -webkit-linear-gradient(left, #3498db, #f47920 10%, #d71345 20%, #f7acbc 30%,
        #ffd400 40%, #3498db 50%, #f47920 60%, #d71345 70%, #f7acbc 80%, #ffd400 90%, #3498db);
      color: transparent; /*文字填充色为透明*/
      -webkit-text-fill-color: transparent;
      -webkit-background-clip: text; /*背景剪裁为文字，只将文字显示为背景*/
      background-size: 200% 100%; /*背景图片向水平方向扩大一倍，这样background-position才有移动与变化的空间*/
      animation: masked-animation 4s infinite linear;
    }
  }

  @keyframes masked-animation {
    0% {
      background-position: 0 0; /*background-position 属性设置背景图像的起始位置。*/
    }
    100% {
      background-position: -100% 0;
    }
  }
</style>
