const { compilerFn } = require('./core.js')
const schemas = [
  {
    name: '登记人',
    prop: 'djr',
    search: {
      show: true
    }
  },
  {
    name: '登记日期',
    prop: 'djrq'
  },
  {
    name: '检测类别',
    prop: 'jclb'
  },
  {
    name: '检验性质',
    prop: 'jyxz',
    search: {
      show: true
    }
  },
  {
    name: '补充更改',
    prop: 'bcgg'
  },
  {
    name: '单号',
    search: {
      show: true
    },
    prop: 'dh'
  },
  {
    name: '委托单位',
    prop: 'wtdw'
  },
  {
    name: '受检单位',
    prop: 'sjdw'
  },
  {
    name: '是否缴费',
    type: 'select',
    dictName: 'SFJF',
    search: {
      show: true
    },
    prop: 'sfjf'
  },
  {
    name: '取报告方式',
    prop: 'qbgfs'
  },
  {
    name: '取报告人',
    prop: 'qbgr'
  },
  {
    name: '邮件编号',
    prop: 'yjbh'
  },
  {
    name: '发报告人',
    prop: 'fbgr'
  },
  {
    name: '发报告日期',
    prop: 'fbgrq'
  },
  {
    name: '委托人',
    prop: 'wtr'
  },
  {
    name: '委托单位地址',
    prop: 'wtdwdz'
  },
  {
    name: '委托单位联系电话',
    prop: 'wtdwlxdh'
  },
  {
    name: '受检单位联系人',
    prop: 'sjdwlxr'
  },
  {
    name: '受检单位地址',
    prop: 'sjdwdz'
  },
  {
    name: '受检单位电话',
    prop: 'sjdwdh'
  },
  {
    name: '缴费单位',
    prop: 'jfdw'
  },
  {
    name: '缴费人',
    prop: 'jfr'
  },
  {
    name: '检测依据',
    prop: 'jcyj'
  },
  {
    name: '其它说明',
    prop: 'qtsm'
  },
  {
    name: '报告结论',
    prop: 'bgjl'
  },
  {
    name: '报告检验周期',
    prop: 'bgjyzq'
  },
  {
    name: '要求出报告日期',
    prop: 'yqcbgrq'
  },
  {
    name: '检测备注',
    prop: 'jcbz'
  },
  {
    name: '原检编号',
    prop: 'yjbh'
  },
  {
    name: '流程状态',
    type: 'select',
    dictName: 'LCZT',
    prop: 'lczt'
  }
]

compilerFn(
  {
    schema: schemas,
    dictArr: [
      {
        name: 'LCZT',
        code: 'LCZT'
      },
      {
        name: 'SFJF',
        code: 'SFJF'
      }
    ],
    opeBtn: [
      {
        name: '刷新',
        method: 'refresh'
      },
      {
        name: '流程卡',
        method: 'processCard'
      },
      // {
      //   name: '原始记录',
      //   method: 'rowRecord'
      // }
    ],
    tabBtn: [
      // {
      //   name: '查看证书',
      //   method: 'look'
      // }
      // {
      //   name: '删除',
      //   method: 'del'
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