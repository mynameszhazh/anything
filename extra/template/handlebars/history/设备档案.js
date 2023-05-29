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
    name: '制造国家',
    prop: 'zzgj'
  },
  {
    name: '制造厂商',
    search: {
      show: true
    },
    prop: 'zzcs'
  },
  {
    name: '所属企业',
    prop: 'ssqy'
  },
  {
    name: '设备类型',
    type: 'select',
    dictName: 'SBLX',
    search: {
      show: true
    },
    prop: 'sblx'
  },
  {
    name: '设备状态',
    type: 'select',
    dictName: 'SBZT',
    search: {
      show: true
    },
    prop: 'sbzt'
  },
  {
    name: '设备标签',
    search: {
      show: true
    },
    prop: 'sbbq'
  }
]

compilerFn(
  {
    schema: schemas,
    dictArr: [
      {
        name: 'SBLX',
        code: 'SBLX'
      },
      {
        name: 'SBZT',
        code: 'SBZT'
      }
    ],
    opeBtn: [
      {
        name: '新增',
        method: 'add'
      },
      {
        name: '下载Excel模板',
        method: 'download'
      },
      {
        name: 'Excel批量导入',
        method: 'import'
      }
    ],
    tabBtn: [
      {
        name: '编辑',
        method: 'edit'
      },
      {
        name: '删除',
        method: 'del'
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