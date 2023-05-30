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
    name: '检验类别',
    prop: 'jylb',
    type: 'select',
    isSlot: true,
    dictName: 'JYLB'
  },
  {
    name: '检验性质',
    prop: 'jyxz',
    type: 'select',
    isSlot: true,
    dictName: 'JYXZ'
  },
  {
    name: '补充更改',
    prop: 'bcgg',
    type: 'select',
    isSlot: true,
    dictName: 'BCGG'
  },
  {
    name: '登记单号',
    prop: 'djdh'
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
    name: '委托单位联系人',
    prop: 'wtdwlxr'
  },
  {
    name: '委托单位地址',
    prop: 'wtdwdz'
  },
  {
    name: '委托单位电话',
    prop: 'wtdwdh'
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
    name: '缴费单位联系人',
    prop: 'jfdwlxr'
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
    name: '其他说明',
    prop: 'qtsm'
  },
  {
    name: '报告结论',
    prop: 'bgjl'
  },
  {
    name: '报告签发人',
    prop: 'bgqfr'
  },
  {
    name: '报告签发日期',
    prop: 'bgqfrq'
  },
  {
    name: '检验周期',
    prop: 'jyzq',
    isSlot: true,
    type: 'select',
    dictName: 'JYZQ'
  },
  {
    name: '要求出报告日期',
    prop: 'yqcbgrq'
  },
  {
    name: '检验备注',
    prop: 'jybz'
  },
  {
    name: '原检编号',
    prop: 'yjbh'
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
    name: '样品描述',
    prop: 'ypms'
  },
  {
    name: '样品等级',
    type: 'select',
    isSlot: true,
    dictName: 'YPDJ',
    prop: 'ypdj'
  },
  {
    name: '抽验基数',
    prop: 'cyjs'
  },
  {
    name: '型号规格',
    prop: 'xhgg'
  },
  {
    name: '商标',
    prop: 'sb'
  },
  {
    name: '来样方式',
    prop: 'lyfs',
    dictName: 'LYFS',
    type: 'select',
    isSlot: true,
  },
  {
    name: '余样处理',
    prop: 'yycl',
    dictName: 'YYCL',
    type: 'select',
    isSlot: true,
  },
  {
    name: '生产单位',
    prop: 'scdw'
  },
  {
    name: '生产日期',
    prop: 'scrq'
  },
  {
    name: '抽样人',
    prop: 'cyr'
  },
  {
    name: '安全等级',
    prop: 'aqdj',
    dictName: 'AQDJ',
    type: 'select',
    isSlot: true,
  },
  {
    name: '生产单位电话',
    prop: 'scdwdh'
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
        name: 'JYLB',
        code: 'JYLB'
      },
      {
        name: 'JYXZ',
        code: 'JYXZ'
      },
      {
        name: 'BCGG',
        code: 'BCGG'
      },
      {
        name: 'JYZQ',
        code: 'JYZQ'
      },
      {
        name: 'YPDJ',
        code: 'YPDJ'
      },
      {
        name: 'AQDJ',
        code: 'AQDJ'
      },

      {
        name: 'LYFS',
        code: 'LYFS'
      },
      {
        name: 'YYCL',
        code: 'YYCL'
      },
    ],
    opeBtn: [
      {
        name: '新增等级',
        method: 'addLevel'
      },
      {
        name: '登记单',
        method: 'registerForm'
      },
      {
        name: '报告信息',
        method: 'reportInfo'
      },
      {
        name: '流程卡',
        method: 'processCard'
      }

    ],
    tabBtn: [
      // {
      //   name: '上传',
      //   method: 'upload'
      // },
      // {
      //   name: '编辑',
      //   method: 'mockEdit'
      // },
      // {
      //   name: '预览',
      //   method: 'mockView'
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
  './beat/xj2_mock.hbs'
)
