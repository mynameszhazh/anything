const { compilerFn } = require('./core.js')
const schemas = [
  {
    name: '登记人',
    prop: 'djr'
  },
  {
    name: '登记日期',
    prop: 'djrq',
    search: {
      show: true
    }
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
    name: '委托人',
    prop: 'wtr'
  },
  {
    name: '受检单位',
    prop: 'sjdw',
    search: {
      show: true
    }
  },
  {
    name: '受检单位联系人',
    prop: 'sjdwlxr'
  },
  {
    name: '报告检验周期',
    prop: 'bgjyzq'
  },
  {
    name: '检验要求日期',
    prop: 'jyyqrq'
  },
  {
    name: '要求出报告日期',
    prop: 'yqcbgrq'
  },
  {
    name: '流程状态',
    prop: 'lczt'
  },
  {
    name: '样品名称',
    prop: 'ypmc',
    search: {
      show: true
    }
  },
  {
    name: '样品数量',
    prop: 'ypsl'
  },
  {
    name: '检测项目',
    prop: 'jcxm'
  },
  {
    name: '子项目',
    prop: 'zxm'
  },
  {
    name: '标准值',
    prop: 'bzz'
  },
  {
    name: '检测结果',
    prop: 'jcjg'
  },
  {
    name: '单位',
    prop: 'dw'
  },
  {
    name: '单项结论',
    prop: 'dxjl'
  },
  {
    name: '报告结论',
    prop: 'bgjl'
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