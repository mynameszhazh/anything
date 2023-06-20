const { compilerFn } = require('./core.js')

const schemas = [
  {
    name: '报警时间',
    prop: 'startTime'
  },
  {
    name: '报警设备',
    prop: 'deviceId'
  },
  {
    name: '报警类型',
    prop: 'alarmType'
  },
  {
    name: '报警内容',
    prop: 'alarmPriority',
    search: {
      show: true
    }
  }
]
// 是否需要操作
schemas.push({
  name: '操作',
  // name: '信用得分',
  prop: 'details'
})

compilerFn(
  {
    schema: schemas,
    dictArr: [
      // {
      //   name: 'QYLX',
      //   code: 'QYLX'
      // }
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
      //   name: '登记',
      //   method: 'register'
      // }
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
      {
        name: '上传',
        method: 'upload'
      },
      {
        name: '删除',
        method: 'mockDel'
      }
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
  './lts/base.hbs'
  // './beat/xj2_mock.hbs'
  // './beat/xj2_mockOnlyTable.hbs'
)
