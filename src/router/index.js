import Vue from 'vue'
import VueRouter from 'vue-router'
import Upload from '../views/excel/upload.vue'
import { parseRoutes } from '../utils/paser'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'excel/home',
  },
  {
    path: '/excel',
    name: 'excel',
    component: () => import(/* webpackChunkName: "Main" */ '../views/Layout.vue'),
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import(/* webpackChunkName: "Main" */ '../views/excel/home.vue')
      },
      {
        path: 'upload',
        name: 'upload',
        component: Upload
      },
    ]
  },
  {
    path: '/fileUpload',
    name: 'fileUpload',
    component: () => import(/* webpackChunkName: "Main" */ '../views/Layout.vue'),
    children: [
      {
        path: 'big',
        name: 'big',
        component: () => import(/* webpackChunkName: "Main" */ '../views/fileUpload/big.vue')
      },
    ]
  },
  {
    path: '/extra',
    name: 'extra',
    component: () => import(/* webpackChunkName: "Main" */ '../views/Layout.vue'),
    children: [
      {
        // 高性能渲染数据
        path: 'HPrenderData',
        name: 'HPrenderData',
        component: () => import(/* webpackChunkName: "Main" */ '../views/extra/HPrenderData.vue')
      },
    ]
  }, {
    path: '/directive',
    name: 'directive',
    component: () => import(/* webpackChunkName: "Main" */ '../views/Layout.vue'),
    children: [
      {
        // 高性能渲染数据
        path: 'copy',
        name: 'copy',
        component: () => import(/* webpackChunkName: "Main" */ '../views/directive/copy.vue')
      }, {
        path: 'longpress',
        name: 'longpress',
        component: () => import(/* webpackChunkName: "Main" */ '../views/directive/longpress.vue')
      }, {
        path: 'debounce',
        name: 'debounce',
        component: () => import(/* webpackChunkName: "Main" */ '../views/directive/debounce.vue')
      }, {
        path: 'emoji',
        name: 'emoji',
        component: () => import(/* webpackChunkName: "Main" */ '../views/directive/emoji.vue')
      }, {
        path: 'lazyLoad',
        name: 'lazyLoad',
        component: () => import(/* webpackChunkName: "Main" */ '../views/directive/lazyLoad.vue')
      }, {
        path: 'waterMarker',
        name: 'waterMarker',
        component: () => import(/* webpackChunkName: "Main" */ '../views/directive/waterMarker.vue')
      }, {
        path: 'graggable',
        name: 'graggable',
        component: () => import(/* webpackChunkName: "Main" */ '../views/directive/draggable.vue')
      },
    ]
  },
  {
    path: '/components',
    name: 'components',
    component: () => import(/* webpackChunkName: "Main" */ '../views/Layout.vue'),
    children: [
      {
        path: 'elementform',
        name: 'elementform',
        component: () => import(/* webpackChunkName: "Main" */ '../views/components/index.vue')
      },
    ]
  },
  {
    path: '/test',
    name: 'test',
    component: () => import(/* webpackChunkName: "Main" */ '../views/Layout.vue'),
    children: [
      {
        path: 'test1',
        name: 'test1',
        component: () => import(/* webpackChunkName: "Main" */ '../views/test/test.vue')
      }, {
        path: 'cssMoudle',
        name: 'cssMoudle',
        component: () => import(/* webpackChunkName: "Main" */ '../views/test/cssMoudle.vue')
      }, {
        path: 'routerTest',
        name: 'routerTest',
        component: () => import(/* webpackChunkName: "Main" */ '../views/test/routerTest.vue')
      }
    ]
  },
]

export const routesMeaus = []
parseRoutes(routesMeaus, routes)

const router = new VueRouter({
  routes
})

export default router
