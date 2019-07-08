<template>
  <div id="page9">
    <m-title :data-step="8"></m-title>
    <el-form :model="info" status-icon :rules="rules" ref="info" label-width="100px" class="m-form">
      <section class="content">
        <div class="textarea-wrap">
          <el-form-item label="专业工作能力描述" prop="textarea">
            <section class="textarea" style="width: 100%;">
              <el-input
                resize="none"
                :disabled="isEdit"
                type="textarea"
                :rows="6"
                placeholder="请输入专业工作能力描述"
                v-model="info.textarea"
                :maxlength="maxlength">
              </el-input>
            </section>
          </el-form-item>
          <section class="num">{{len}} / {{maxlength}}</section>
        </div>
      </section>
      <el-form-item class="m-form-buttons">
        <el-button type="primary" plain class="m-form-buttons-item m-form-buttons-item-plain"
                   @click="submit(7)">上一页
        </el-button>
        <el-button class="m-form-buttons-item m-form-buttons-item-primary" type="primary"
                   @click="submit(9)">下一页
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    props: ["id"],
    data() {
      return {
        info: {
          textarea: '',
        },
        maxlength: this.$maxlen.twoHundred,
        rules: {
          textarea: [
            {required: true, message: '请输入专业工作能力描述', trigger: 'blur'}
          ]
        },
      }
    },
    methods: {
      getInfo() {
        let declareId = this.id
        let url = `/job/declare/getAbility?declareId=${declareId}`
        this.$axios.get(url).then(res => {
          console.log('res', res)
          if (res && res.workAble) {
            this.info.textarea = res.workAble
          }
        })
      },
      submit(step) {
        this.$emit('change', step)
      }
    },
    computed: {
      isEdit() {
        return true
      },
      len() {
        return this.info.textarea.length;
      },
    },
    activated() {
      this.getInfo()
    }
  }
</script>

<style scoped lang="scss">
  #page9 {
    padding-bottom: 60px;
    .title {
      margin-bottom: 39px;
    }
    .content {
      .subtitle {
        font-size: 14px;
        font-family: MicrosoftYaHei-Bold;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        margin-bottom: 9px;
      }
      .textarea-wrap {
        position: relative;
        .num {
          position: absolute;
          bottom: 10px;
          right: 10px;
          font-size: 12px;
          color: rgba(187, 187, 187, 1);
        }
      }
    }
    .operate-wrap {
      padding-top: 60px;
      display: flex;
      justify-content: center;
      .operate {
        display: flex;
        button.disabled {
          pointer-events: none;
          cursor: no-drop;
          border: none;
          background: rgba(221, 221, 221, 1);
          color: #fff;
        }
        button {
          cursor: pointer;
          text-align: center;
          box-sizing: border-box;
          background: #fff;
          border: 1px solid #b3d8ff;
          color: $primary;
          width: 100px;
          height: 40px;
          margin-right: 10px;
        }
        .btn:hover {
          background: #b3d8ff;
          color: #fff;
        }

        .next {
          background: linear-gradient(150deg, rgba(80, 212, 248, 1), rgba(0, 134, 254, 1));
          color: #fff;
          border: 0;
        }
        .next.el-button {
          background: linear-gradient(150deg, rgba(80, 212, 248, 1), rgba(0, 134, 254, 1));
          color: #fff;
          border: 0;
        }
        .next.el-button:hover {
          background: linear-gradient(150deg, rgba(0, 134, 254, 1), rgba(80, 212, 248, 1));
        }
        .el-button.disabled {
          background: rgba(221, 221, 221, 1)
        }
        .el-button:last-child {
          margin-right: 0;
        }
      }
    }
  }
</style>
