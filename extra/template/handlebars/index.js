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
    name: '通知类型',
    type: 'select',
    dictName: 'TZLX',
    isSlot: true,
    prop: 'tzlx',
    search: {
      show: true
    }
  },
  {
    name: '是否推送',
    type: 'select',
    dictName: 'SFTZ',
    isSlot: true,
    prop: 'sfts',
    search: {
      show: true
    }
  },
  {
    name: '备注',
    prop: 'remark'
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
      {
        name: 'TZLX',
        code: 'VIDEO_NOTICE_TYPE'
      },
      {
        name: 'SFTZ',
        code: 'VIDEO_EVENT_SFTZ'
      }
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
      {
        name: '添加',
        method: 'add'
      },
      {
        name: '删除',
        method: 'del'
      }
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
        name: '修改',
        method: 'edit'
      },
      {
        name: '详情',
        method: 'view'
      }
      // {
      //   name: '预览',
      //   method: 'mockView'
      // }
    ],
    apiCodes: {
      search: 'CAMERA_SMS_NOTICE_SEARCH',
      del: 'CAMERA_SMS_NOTICE_DEL',
      add: 'CAMERA_SMS_NOTICE_ADD',
      edit: 'CAMERA_SMS_NOTICE_EDIT',
      view: 'CAMERA_SMS_NOTICE_VIEW'
    }
  },
  './index.vue',
  './all.vue.hbs'
  // './beat/xj2_mock.hbs'
  // './beat/xj2_mockOnlyTable.hbs'
)
