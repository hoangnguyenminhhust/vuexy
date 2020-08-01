/*=========================================================================================
  File Name: router.js
  Description: Routes for vue-router. Lazy loading is enabled.
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
async function checkAuthetication(to, from, next) {
  await store.dispatch('auth/checkToken', 'Router');
  if (store.state.auth.token) {
    next()
    return;
  }
  console.log(1)
  next('/login')
}

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return {
      x: 0,
      y: 0
    }
  },
  routes: [
    {
      path: '',
      component: () => import('./layouts/main/Main.vue'),
      beforeEnter: checkAuthetication(),
      children: [

        {
          path: '/',
          name: 'home',
          component: () => import('./views/Home.vue')
        },
        {
          path: '/page2',
          name: 'page-2',
          component: () => import('./views/Page2.vue')
        }
      ]
    },

    {
      path: '',
      component: () => import('@/layouts/full-page/FullPage.vue'),
      children: [

        {
          path: '/login',
          name: 'page-login',
          component: () => import('@/views/main/Login.vue')
        },
        {
          path: '/error-404',
          name: 'page-error-404',
          component: () => import('@/views/main/Error404.vue')
        },
        {
          path: '/register',
          name: 'page-register',
          component: () => import('@/views/main/Register.vue')
        }
      ]
    },
    {
      path: '*',
      redirect: '/pages/error-404'
    }
  ]
})

router.afterEach(() => {
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

export default router
