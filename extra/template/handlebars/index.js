const { compilerFn } = require('./core.js')
const schemas = [
  {
    name: '用户姓名',
    prop: 'yhxm',
    search: {
      show: true
    }
  },
  {
    name: '用户电话',
    prop: 'yhdh',
    search: {
      show: true
    }
  },
  {
    name: '用户设备',
    prop: 'yhsb'
  },
  {
    type: 'select',
    name: '用户级别',
    isSlot: true,
    prop: 'yhjb',
    dictName: 'YHJB',
    search: {
      show: true
    }
  },
  {
    name: '用户地址',
    prop: 'yhdz'
  },
  {
    type: 'selectTree',
    name: '行政区划',
    prop: 'xzqh'
  }

  // {
  //   type: 'textarea',
  //   name: '备注',
  //   prop: 'remark'
  // },
  // {
  //   type: 'action',
  //   name: '操作',
  //   prop: 'details'
  // }
]

compilerFn(
  {
    schema: schemas,
    dictArr: [
      {
        name: 'YHJB',
        code: '114_USER_LEVEL'
      }
    ],
    apiCodes: {
      search: 'CONSUMER_RIGHT_SEARCH',
      del: 'CONSUMER_RIGHT_DEL',
      add: 'CONSUMER_RIGHT_ADD',
      edit: 'CONSUMER_RIGHT_EDIT',
      view: 'CONSUMER_RIGHT_VIEW'
    }
  },
  './index.vue',
  './all.vue.hbs'
)
