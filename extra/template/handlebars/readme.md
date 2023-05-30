# handlebars 使用

## quick copy

```js
type: 'select',
dictName: 'YHJB',
```

```js
search: {
  show: true
}
```

## schemas

```js
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
    type: 'select',
    dictName: 'YHJB',
    name: '用户级别',
    isSlot: true,
    prop: 'yhjb',
    search: {
      show: true
    }
  },
  {
    name: '用户地址',
    prop: 'yhdz'
  },
  {
    type: 'number',
    name: '经度',
    prop: 'yhjd'
  },
  {
    type: 'number',
    name: '权益次数',
    prop: 'yhcs'
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
      }
    ],
    apiCodes: {
      search: '114_USER_SEARCH',
      del: '114_USER_DEL',
      add: '114_USER_ADD',
      edit: '114_USER_EDIT',
      view: '114_USER_VIEW'
    }
  },
  './index.vue',
  './user.vue.hbs'
)
gg
```
