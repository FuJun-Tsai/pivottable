import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  // {
  //   path: '/test',
  //   name: 'test',
  //   component: () => import('../views/TestView.vue')
  // },
  {
    path: '/pivotTable',
    name: 'pivotTable',
    component: () => import('../views/PivotTableView.vue')
  },
  {
    path: '/pivotTableUi',
    name: 'pivotTableUi',
    component: () => import('../views/PivotTableUiView.vue')
  },
  {
    path: '/CreatePageView',
    name: 'CreatePageView',
    component: () => import('../views/CreatePageView.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
