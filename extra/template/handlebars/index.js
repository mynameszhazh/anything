const { compilerFn } = require('./core.js')

const schemas = [
  {
    name: '序号',
    prop: 'xh'
  },
  {
    name: '仪器名称',
    prop: 'yqmc',
    search: {
      show: true
    }
  },
  {
    name: '型号规格',
    prop: 'xhgg'
  },
  {
    name: '使用次数',
    prop: 'sycs'
  },
  {
    name: '使用日期',
    prop: 'syrq'
  },
  {
    name: '测量范围',
    prop: 'clfw'
  },
  {
    name: '生产厂家',
    prop: 'sccj'
  },
  {
    name: '编号',
    prop: 'bh',
    search: {
      show: true
    }
  },
  {
    name: '出厂日期',
    prop: 'ccrq'
  },
  {
    name: '状态',
    prop: 'zt'
  },
  {
    name: '溯源方式',
    prop: 'syfs'
  },
  {
    name: '溯源单位',
    prop: 'sydw'
  },
  {
    name: '校准日期',
    prop: 'xzrq'
  },
  {
    name: '有效日期',
    prop: 'yxrq'
  },
  {
    name: '确认结果',
    prop: 'qrjg'
  },
  {
    name: '存放地点',
    prop: 'cfdd'
  },
  {
    name: '备注',
    prop: 'bz'
  },
  {
    name: '计量要求',
    prop: 'jlyq'
  }
]

compilerFn(
  {
    schema: schemas,
    dictArr: [
      // {
      //   name: 'JYLB',
      //   code: 'JYLB'
      // },
      // {
      //   name: 'JYXZ',
      //   code: 'JYXZ'
      // },
      // {
      //   name: 'BCGG',
      //   code: 'BCGG'
      // },
      // {
      //   name: 'JYZQ',
      //   code: 'JYZQ'
      // },
      // {
      //   name: 'YPDJ',
      //   code: 'YPDJ'
      // },
      // {
      //   name: 'AQDJ',
      //   code: 'AQDJ'
      // },
      // {
      //   name: 'LYFS',
      //   code: 'LYFS'
      // },
      // {
      //   name: 'YYCL',
      //   code: 'YYCL'
      // }
    ],
    opeBtn: [
      // {
      //   name: '登记设备',
      //   method: 'add'
      // },
      // {
      //   name: '删除设备',
      //   method: 'mockdel'
      // }
      // {
      //   name: '报告信息',
      //   method: 'reportInfo'
      // },
      // {
      //   name: '流程卡',
      //   method: 'processCard'
      // }
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
