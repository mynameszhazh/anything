const { compilerFn } = require('./core.js')
const schemas = [
  {
    name: '登记人',
    prop: 'djr'
  },
  {
    name: '登记日期',
    prop: 'djrq'
  },

  {
    name: '检测性质',
    prop: 'jcxz'
  },
  {
    name: '补充更改',
    prop: 'bcgg'
  },
  {
    name: '单号',
    prop: 'dh'
  },
  {
    name: '委托单位',
    prop: 'wtdw',
    search: {
      show: true
    }
  },
  {
    name: '样品类别',
    prop: 'yplb',
    type: 'select',
    dictName: 'YPLB',
    search: {
      show: true
    }
  },
  {
    name: '检测类别',
    type: 'select',
    prop: 'jclb',
    dictName: 'JCLB',
    search: {
      show: true
    }
  },
    {
    name: '样品名称',
    prop: 'ypmc',
    search: {
      show: true
    }
  },
  {
    name: '受检单位',
    prop: 'sjdw',
    search: {
      show: true
    }
  },
  {
    type: 'select',
    name: '检验周期',
    prop: 'jyzq',
    dictName: 'JYZQ'
  },
  {
    type: 'action',
    name: '操作',
    prop: 'details'
  }
]

compilerFn(
  {
    schema: schemas,
    dictArr: [
      {
        name: 'JCLB',
        code: 'JCLB'
      },
      {
        name: 'YPLB',
        code: 'YPLB'
      },
      {
        name: 'JYZQ',
        code: 'JYZQ'
      }
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