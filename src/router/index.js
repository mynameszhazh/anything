import Vue from 'vue'
import VueRouter from 'vue-router'
import Upload from '../views/excel/upload.vue'
import { parseRoutes } from '../utils/paser'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/index.vue')
  },
  {
    path: '/excel',
    name: 'excel',
    component: () =>
      import(/* webpackChunkName: "Main" */ '../views/Layout.vue'),
    children: [
      {
        path: 'home',
        name: 'home',
        component: () =>
          import(/* webpackChunkName: "Main" */ '../views/excel/home.vue')
      },
      {
        path: 'upload',
        name: 'upload',
        component: Upload
      }
    ]
  },
  {
    path: '/fileUpload',
    name: 'fileUpload',
    component: () =>
      import(/* webpackChunkName: "Main" */ '../views/Layout.vue'),
    children: [
      {
        path: 'big',
        name: 'big',
        component: () =>
          import(/* webpackChunkName: "Main" */ '../views/fileUpload/big.vue')
      }
    ]
  },
  {
    path: '/extra',
    name: 'extra',
    component: () =>
      import(/* webpackChunkName: "Main" */ '../views/Layout.vue'),
    children: [
      {
        // 高性能渲染数据
        path: 'HPrenderData',
        name: 'HPrenderData',
        component: () =>
          import(
            /* webpackChunkName: "Main" */ '../views/extra/HPrenderData.vue'
          )
      },
      {
        // 拖拉
        path: 'Draggable',
        name: 'Draggable',
        component: () =>
          import(
            /* webpackChunkName: "Main" */ '../views/extra/Draggable/Draggable.vue'
          )
      }
    ]
  },
  {
    path: '/directive',
    name: 'directive',
    component: () =>
      import(/* webpackChunkName: "Main" */ '../views/Layout.vue'),
    children: [
      {
        // 高性能渲染数据
        path: 'copy',
        name: 'copy',
        component: () =>
          import(/* webpackChunkName: "Main" */ '../views/directive/copy.vue')
      },
      {
        path: 'longpress',
        name: 'longpress',
        component: () =>
          import(
            /* webpackChunkName: "Main" */ '../views/directive/longpress.vue'
          )
      },
      {
        path: 'debounce',
        name: 'debounce',
        component: () =>
          import(
            /* webpackChunkName: "Main" */ '../views/directive/debounce.vue'
          )
      },
      {
        path: 'emoji',
        name: 'emoji',
        component: () =>
          import(/* webpackChunkName: "Main" */ '../views/directive/emoji.vue')
      },
      {
        path: 'lazyLoad',
        name: 'lazyLoad',
        component: () =>
          import(
            /* webpackChunkName: "Main" */ '../views/directive/lazyLoad.vue'
          )
      },
      {
        path: 'waterMarker',
        name: 'waterMarker',
        component: () =>
          import(
            /* webpackChunkName: "Main" */ '../views/directive/waterMarker.vue'
          )
      },
      {
        path: 'graggable',
        name: 'graggable',
        component: () =>
          import(
            /* webpackChunkName: "Main" */ '../views/directive/draggable.vue'
          )
      }
    ]
  },
  {
    path: '/components',
    name: 'components',
    component: () =>
      import(/* webpackChunkName: "Main" */ '../views/Layout.vue'),
    children: [
      {
        path: 'elementform',
        name: 'elementform',
        component: () =>
          import(/* webpackChunkName: "Main" */ '../views/components/index.vue')
      },
      {
        path: 'swiper',
        name: 'swiper',
        component: () =>
          import(
            /* webpackChunkName: "Main" */ '../views/components/swiper/index.vue'
          )
      }
    ]
  },
  {
    path: '/css',
    name: 'css',
    component: () =>
      import(/* webpackChunkName: "Main" */ '../views/Layout.vue'),
    children: [
      // {
      //   path: "css",
      //   name: "css",
      //   component: () =>
      //     import(
      //       /* webpackChunkName: "Main" */ "../views/css/index.vue"
      //     ),
      // },
    ]
  },
  {
    path: '/test',
    name: 'test',
    component: () =>
      import(/* webpackChunkName: "Main" */ '../views/Layout.vue'),
    children: [
      // {
      //   path: "test1",
      //   name: "test1",
      //   component: () =>
      //     import(
      //       /* webpackChunkName: "Main" */ "../views/test/test.vue"
      //     ),
      // },
      // {
      //   path: "cssMoudle",
      //   name: "cssMoudle",
      //   component: () =>
      //     import(
      //       /* webpackChunkName: "Main" */ "../views/test/cssMoudle.vue"
      //     ),
      // },
      // {
      //   path: "routerTest",
      //   name: "routerTest",
      //   component: () =>
      //     import(
      //       /* webpackChunkName: "Main" */ "../views/test/routerTest.vue"
      //     ),
      // },
    ]
  },
  {
    path: '/webRTC',
    name: 'webRTC',
    component: () =>
      import(/* webpackChunkName: "Main" */ '../views/Layout.vue'),
    children: [
      {
        path: 'chat',
        name: 'chat',
        component: () =>
          import(/* webpackChunkName: "Main" */ '../views/webRtc/chat.vue')
      }
    ]
  },
  {
    path: '/web3',
    name: 'web3',
    component: () =>
      import(/* webpackChunkName: "Main" */ '../views/Layout.vue'),
    children: [
      {
        path: 'test',
        name: 'test',
        component: () =>
          import(/* webpackChunkName: "Main" */ '../views/web3/index.vue')
      }
    ]
  },
  {
    path: '/system',
    name: 'System',
    component: () =>
      import(/* webpackChunkName: "Main" */ '../views/Layout.vue'),
    children: [
      {
        path: 'role',
        name: 'role',
        component: () =>
          import(
            /* webpackChunkName: "Main" */ '../views/system/role/index.vue'
          )
      },
      {
        path: 'user',
        name: 'user',
        component: () =>
          import(
            /* webpackChunkName: "Main" */ '../views/system/user/index.vue'
          )
      }
    ]
  }
]

export const routesMeaus = []
parseRoutes(routesMeaus, routes)

const router = new VueRouter({
  routes
})

export default router
