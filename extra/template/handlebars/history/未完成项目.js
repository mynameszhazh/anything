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
    name: '任务分配环节',
    prop: 'rwfphj'
  },
  {
    name: '分配的检测员',
    prop: 'fpdjcy'
  },
  {
    name: '检验检测环节',
    prop: 'jyjchj'
  },
  {
    name: '数据审核环节',
    prop: 'sjshhj'
  },
  {
    name: '检测类别',
    prop: 'jclb',
    type: 'select',
    dictName: 'JCLB',
    search: {
      show: true
    }
  },
  {
    name: '检验性质',
    prop: 'jyxz'
  },
  {
    name: '补充更改',
    prop: 'bcgg'
  },
  {
    name: '委托单位',
    prop: 'wtdw',
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
    name: '应收金额',
    prop: 'ysje'
  },
  {
    name: '取报告方式',
    prop: 'qbgfs'
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
    name: '报告检验周期',
    prop: 'bgjyzq'
  },
  {
    name: '要求出报告日期',
    prop: 'yqcbgrq'
  },
  {
    name: '协议备注',
    prop: 'xybz'
  }
]

compilerFn(
  {
    schema: schemas,
    dictArr: [
      {
        name: 'JCLB',
        code: 'JCLB'
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