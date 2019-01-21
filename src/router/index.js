import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:"/login",
      component:() => import('@/views/login'),
      hidden:true
    },
    {
      path: '/',
      component:() => import('@/views/Home'),
      name: '组件一',
      iconCls: 'fa fa-id-card-o',
      children:
      [
        { path: '/main', component: () => import('@/views/nav1/table'), name: '主页', hidden: true },
        { path: '/table', component: () => import('@/views/nav1/table'), name: 'Table' },
//      { path: '/form', component: () => import('@/views/nav1/table'), name: 'Form' },
//      { path: '/1', component: () => import('@/views/nav1/table'), name: '1' },
      ]
    },
    {
      path: '/',
      component:() => import('@/views/Home'),
      name: '组件二',
      iconCls: 'fa fa-id-card-o',
      children:
      [
        { path: '/1', component: () => import('@/views/nav1/table'), name: '1'},
        { path: '/2', component: () => import('@/views/nav1/table'), name: '2' },
      ]
    },
    {
        path: '/',
        component: () => import('@/views/Home'),
        name: 'charts',
        iconCls: 'fa fa-address-card',
        leaf: false,//只有一个节点true
        children: [
            { path: '/charts', component: () => import('@/views/nav3/charts'), name: 'charts' }
        ]
    },
  ]
})
