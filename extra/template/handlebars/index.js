const { compilerFn } = require('./core.js')
const schemas = [
  {
    name: '用户id',
    prop: 'yhid',
    search: {
      show: true
    }
  },
  {
    type: 'number',
    name: '权益次数',
    prop: 'qycs'
  },
  {
    name: '用户权益',
    prop: 'yhqx'
  }
]

compilerFn(
  {
    schema: schemas,
    apiCodes: {
      search: 'CONSUMER_RIGHT_SEARCH',
      del: 'CONSUMER_RIGHT_DEL',
      add: 'CONSUMER_RIGHT_ADD',
      edit: 'CONSUMER_RIGHT_EDIT',
      view: 'CONSUMER_RIGHT_VIEW'
    }
  },
  './index.vue',
  './lts/base.hbs'
)
