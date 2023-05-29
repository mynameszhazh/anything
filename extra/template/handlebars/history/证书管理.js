const { compilerFn } = require('./core.js')
const schemas = [
  {
    name: '设备名称',
    search: {
      show: true
    },
    prop: 'sbmc'
  },
  {
    name: '设备型号',
    search: {
      show: true
    },
    prop: 'sbxh'
  },
  {
    name: '设备类型',
    search: {
      show: true
    },
    prop: 'sblx'
  },
  {
    name: '设备标签',
    prop: 'sbbq'
  },
  {
    name: '所属企业',
    search: {
      show: true
    },
    prop: 'ssqy'
  },
  {
    name: '检定日期',
    prop: 'jdrq'
  },
  {
    name: '检定结果',
    type: 'select',
    dictName: 'JDJG',
    search: {
      show: true
    },
    prop: 'jdjg'
  }
]
compilerFn(
  {
    schema: schemas,
    dictArr: [
      {
        name: 'JDJG',
        code: 'JDJG'
      },
    ],
    opeBtn: [
      // {
      //   name: '新增',
      //   method: 'add'
      // },
      // {
      //   name: '下载Excel模板',
      //   method: 'download'
      // },
      // {
      //   name: 'Excel批量导入',
      //   method: 'import'
      // }
    ],
    tabBtn: [
      {
        name: '查看证书',
        method: 'look'
      },
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