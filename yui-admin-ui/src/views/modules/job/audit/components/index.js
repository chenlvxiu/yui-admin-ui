import Vue from 'vue'
import mUploadPic from './m-upload/m-upload-pic'
import mSelect from './m-select/m-select'
import mSelect1 from './m-select/m-select1'
import mDatePickerRange from './m-datePicker/m-datePicker-range'
import mDatePicker from './m-datePicker/m-datePicker'

import mIcon from './m-icon/m-icon'
import mTitle from './m-title/m-title'
import mTitle1 from './m-title/m-title-1'
import mDynRow from './m-dyn/m-dyn-row'
import mDynSection from './m-dyn/m-dyn-section'

import mTextarea from './m-textarea/m-textarea'
import mTable from './m-table/m-table'
import mTableSelf from './m-table/m-table-self'
import mmInput from './mm-input/mm-input'
///////////基础组件
Vue.component('m-upload-pic', mUploadPic)// 上传文件组件
Vue.component('m-select', mSelect)// 下拉框组件
Vue.component('m-select1', mSelect1)// 下拉框组件
Vue.component('m-date-picker', mDatePicker)// 时间范围组件
Vue.component('m-date-picker-range', mDatePickerRange)// “至今”时间范围组件
Vue.component('m-textarea', mTextarea)// textarea
Vue.component('m-table', mTable)// table
Vue.component('m-table-self', mTableSelf)// table
Vue.component('m-icon', mIcon)// 图标
Vue.component('mm-input', mmInput)//input


Vue.component('m-title', mTitle)  // 申报步骤标题
Vue.component('m-title-1', mTitle1)// 普通标题


///////////功能组件
Vue.component('m-dyn-row', mDynRow) // 动态删减行
Vue.component('m-dyn-section', mDynSection)// 动态删减行section






