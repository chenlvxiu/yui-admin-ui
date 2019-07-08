<template>
  <el-dialog :title="!id ? '新增' : '修改'"  class="mod-honor-edit"
    :close-on-click-modal="false" :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="120px">
      <el-row :gutter="20">
        <el-col :span="11">
          <el-form-item label="主键" prop="id">
            <el-input v-model="dataForm.id" placeholder="主键"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="申报id" prop="declareId">
            <el-input v-model="dataForm.declareId" placeholder="申报id"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="专利名称" prop="project">
            <el-input v-model="dataForm.project" placeholder="专利名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="获奖、荣誉名称和等级" prop="honor">
            <el-input v-model="dataForm.honor" placeholder="获奖、荣誉名称和等级"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="授权单位" prop="unit">
            <el-input v-model="dataForm.unit" placeholder="授权单位"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="获奖时间(年月)" prop="date">
            <el-input v-model="dataForm.date" placeholder="获奖时间(年月)"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="本人排名" prop="rank">
            <el-input v-model="dataForm.rank" placeholder="本人排名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="排名总人数" prop="total">
            <el-input v-model="dataForm.total" placeholder="排名总人数"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="佐证材料" prop="url">
            <el-input v-model="dataForm.url" placeholder="佐证材料"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="类型编码" prop="catCd">
            <el-input v-model="dataForm.catCd" placeholder="类型编码"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="类型" prop="catNm">
            <el-input v-model="dataForm.catNm" placeholder="类型"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="状态编码" prop="statCd">
            <el-input v-model="dataForm.statCd" placeholder="状态编码"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="状态" prop="statNm">
            <el-input v-model="dataForm.statNm" placeholder="状态"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import debounce from 'lodash/debounce'

  export default {
    data () {
      return {
        id: null,
        visible: false,
        dataForm: {
          id: '',
          declareId: '',
          project: '',
          honor: '',
          unit: '',
          date: '',
          rank: '',
          total: '',
          url: '',
          catCd: '',
          catNm: '',
          statCd: '',
          statNm: ''
        },
        dataRule: {
          id: [
            { required: true, message: '主键不能为空', trigger: 'blur' }
          ],
          declareId: [
            { required: true, message: '申报id不能为空', trigger: 'blur' }
          ],
          project: [
            { required: true, message: '专利名称不能为空', trigger: 'blur' }
          ],
          honor: [
            { required: true, message: '获奖、荣誉名称和等级不能为空', trigger: 'blur' }
          ],
          unit: [
            { required: true, message: '授权单位不能为空', trigger: 'blur' }
          ],
          date: [
            { required: true, message: '获奖时间(年月)不能为空', trigger: 'blur' }
          ],
          rank: [
            { required: true, message: '本人排名不能为空', trigger: 'blur' }
          ],
          total: [
            { required: true, message: '排名总人数不能为空', trigger: 'blur' }
          ],
          url: [
            { required: true, message: '佐证材料不能为空', trigger: 'blur' }
          ],
          catCd: [
            { required: true, message: '类型编码不能为空', trigger: 'blur' }
          ],
          catNm: [
            { required: true, message: '类型不能为空', trigger: 'blur' }
          ],
          statCd: [
            { required: true, message: '状态编码不能为空', trigger: 'blur' }
          ],
          statNm: [
            { required: true, message: '状态不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.id = id
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.id) {
            this.getInfo()
          }
        })
      },
      // 获取职称申报系统-人员职称申报获奖及荣誉表信息
      getInfo () {
        this.$http.get('/job/honor/info/' + this.id).then(({data: res}) => {
          if (res.code !== 0) {
            return this.$message.error(res.msg)
          }
          this.dataForm = {
            ...this.dataForm,
            ...res.data
          }
        }).catch(() => {})
      },
      // 表单提交
      dataFormSubmit: debounce(function () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            let url = !this.id ? '/job/honor/add' : '/job/honor/upd'
            this.$http.post(url, {...this.dataForm}).then(({data: res}) => {
              if (res && res.code === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false
                    this.$emit('refreshDataList')
                  }
                })
              } else {
                this.$message.error(res.msg)
              }
            })
          }
        })
      }, 1000, { 'leading': true, 'trailing': false })
    }
  }
</script>
