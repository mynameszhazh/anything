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
    isSlot: true,
    dictName: 'XZQH',
    prop: 'xzqh'
  },
  {
    name: '使用权益',
    prop: 'syqy'
  },
  {
    name: '服务内容/卡券内容/商品描述',
    prop: 'spnr'
  },
  {
    type: "select",
    name: '商品类型',
    prop: 'splx',
    isSlot: true,
    dictName: 'SPLX',
  },
  {
    name: '服务范围',
    prop: 'spfw'
  },
  {
    type: 'number',
    name: '商品单价',
    prop: 'spdj'
  },
    {
    name: '商家名称',
    prop: 'sjmc'
  },
    {
    name: '商家分类',
    prop: 'sjfl'
  },
    {
    name: '商家地址',
    prop: 'sjdz'
  },
    {
    name: '商家电话',
    prop: 'sjdh'
  },
  {
    type: 'textarea',
    name: '备注',
    prop: 'remark'
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
        name: 'YHJB',
        code: '114_USER_LEVEL'
      },
      {
        name: 'XZQH',
        code: 'NAVBASIC_REGION'
      },
      {
        name: 'SPLX',
        code: 'NAVBASIC_SPLX'
      }
    ],
    apiCodes: {
      search: '114_ORDER_SEARCH',
      del: '114_ORDER_DEL',
      add: '114_ORDER_ADD',
      edit: '114_ORDER_EDIT',
      view: '114_ORDER_VIEW'
    }
  },
  './index.vue',
  './beat/selectTree.vue.hbs'
)
