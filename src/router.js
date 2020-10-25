import Vue from 'vue'
import Router from 'vue-router'
import Timer from './views/Timer.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'timer',
      component: Timer
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/settings',
      name: 'settings',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Settings.vue')
    }
  ]
})
