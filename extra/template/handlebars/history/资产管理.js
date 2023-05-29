const { compilerFn } = require('./core.js')
const schemas = [
  {
    name: '设备名称',
    prop: 'sbmc',
    search: {
      show: true
    }
  },
  {
    name: '设备编号',
    prop: 'sbbh',
    search: {
      show: true
    }
  },
  {
    name: '生成商',
    prop: 'scs'
  },
  {
    name: '检测项目',
    prop: 'jcxm'
  },
  {
    name: '使用日期',
    prop: 'syrq'
  },
  {
    name: '使用频率',
    prop: 'syps'
  },
  {
    name: '所属科室',
    prop: 'ssks'
  },
  {
    name: '科室负责人',
    prop: 'ksfzr'
  }
]

compilerFn(
  {
    schema: schemas,
    dictArr: [
      // {
      //   name: 'LCZT',
      //   code: 'LCZT'
      // },
      // {
      //   name: 'SFJF',
      //   code: 'SFJF'
      // }
    ],
    opeBtn: [
      // {
      //   name: '登记设备',
      //   method: 'register'
      // },
      // {
      //   name: '删除设备',
      //   method: 'del'
      // }
      // {
      //   name: '原始记录',
      //   method: 'rowRecord'
      // }
    ],
    tabBtn: [
      {
        name: '详情',
        method: 'view'
      },
      // {
      //   name: '编辑',
      //   method: 'edit'
      // },
      // {
      //   name: '查看维保记录',
      //   method: 'lookRecord'
      // }
    ],
    apiCodes: {
      search: 'APPRAISE_SEARCH',
      del: 'APPRAISE_DEL',
      add: 'APPRAISE_ADD',
      edit: 'APPRAISE_EDIT',
      view: 'APPRAISE_VIEW'
    }
  },
  './index.vue',
  './base.hbs'
)