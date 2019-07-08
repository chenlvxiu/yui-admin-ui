<template>
  <div id="page8">
    <m-title :data-step="7"></m-title>
    <el-form ref="ruleForm" label-width="100px" class="m-form m-form-col">
      <div>
      <div class="m-form-section">
        <section class="area1">
          <my-table :tableData="tableData1" :title="title1" :titleInfo="titleInfo1"></my-table>
        </section>
        <my-table :tableData="tableData2" :title="title2" :titleInfo="titleInfo2"></my-table>
      </div>
      </div>
      <el-form-item class="m-form-buttons">
        <el-button type="primary" plain class="m-form-buttons-item m-form-buttons-item-plain"
                   @click="submit(6)">上一页
        </el-button>
        <el-button class="m-form-buttons-item m-form-buttons-item-primary" type="primary"
                   @click="submit(8)">下一页
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import myTable from '../../components/input-items/m-table/m-table.vue'

  export default {
    props: ["id"],
    data() {
      return {
        title1: '完成的继续教育学时',
        tableData1: [
          {startTime: '2016年', endTime: '2016年', needTime: '60学时', courseTime: '20学时'},
          {startTime: '2017年', endTime: '2017年', needTime: '50学时', courseTime: '23学时'},
        ],
        titleInfo1: [
          {prop: 'startTime', label: '起始时间', width: ''},
          {prop: 'endTime', label: '结束时间', width: ''},
          {prop: 'needTime', label: '公需学时', width: ''},
          {prop: 'courseTime', label: '专业课程学时', width: ''},
        ],
        tableData2: [
          {startTime: '2016年', endTime: '2016年', projectName: '项目名称项目名称项名称', unitName: '海曙区人社局', status: '良好'},
          {startTime: '2017年', endTime: '2017年', projectName: '项目名称项目名称项目名称项目名称', unitName: '鄞州区人社局', status: '良好'},
          {startTime: '2017年', endTime: '2018年', projectName: '项目名称项目名称项目名称名称', unitName: '海曙区人社局', status: '良好'},
        ],
        title2: '继续教育完成情况',
        titleInfo2: [
          {prop: 'startTime', label: '起始时间', width: '100'},
          {prop: 'endTime', label: '结束时间', width: '100'},
          {prop: 'projectName', label: '培训项目', width: '360'},
          {prop: 'unitName', label: '组织单位', width: ''},
          {prop: 'status', label: '情况', width: '100'},
        ]
      }
    },
    components: {
      myTable
    },
    methods: {
      submit(step) {
        this.$emit('change', step)
      }
    },

  }
</script>

<style scoped lang="scss">
  button {
    outline: none;
  }

  #page8 {
    padding-bottom: 60px;
    .title {
      margin-bottom: 39px;
    }
    .area1 {
      margin-bottom: 50px;
    }
    .subtitle {
      margin-bottom: 29px;
      font-size: 16px;
      font-family: MicrosoftYaHei-Bold;
    }
    .table {
      border: 1px solid rgb(235, 238, 245);
      border-bottom: 0;
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
        .next {
          background: linear-gradient(150deg, rgba(80, 212, 248, 1), rgba(0, 134, 254, 1));
          color: #fff;
          border: 0;
        }
        .btn:hover {
          background: #b3d8ff;
          color: #fff;
        }
        .next.el-button:hover {
          background: linear-gradient(150deg, rgba(0, 134, 254, 1), rgba(80, 212, 248, 1));
        }
        .el-button:last-child {
          margin-right: 0;
        }
      }
    }
  }
</style>
