import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      meta: {
        title: "Login"
      },
      path: '/login',
      name: 'login',
      component: () => import('@/views/auth/Login.vue')
    },
    {
      meta: {
        title: "Register"
      },
      path: '/register',
      name: 'register',
      component: () => import('@/views/auth/Register.vue')
    },
    {
      meta: {
        title: "Forgot Password"
      },
      path: '/forgot-password',
      name: 'forgot-password',
      component: () => import('@/views/auth/ForgotPassword.vue')
    },
    {
      meta: {
        title: "Login"
      },
      path: '/',
      name: 'login',
      component: () => import('@/views/auth/Login.vue')
    },
  ]
})

export default router
