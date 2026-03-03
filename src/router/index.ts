import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '@/views/IndexView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'cosmos',
      component: () => import('@/views/Version1View.vue')
    },
    {
      path: '/versions',
      name: 'index',
      component: IndexView
    },
    {
      path: '/1',
      redirect: '/'
    },
    {
      path: '/2',
      name: 'terminal',
      component: () => import('@/views/Version2View.vue')
    },
    {
      path: '/3',
      name: 'neon-grid',
      component: () => import('@/views/Version3View.vue')
    },
    {
      path: '/4',
      name: 'bold',
      component: () => import('@/views/Version4View.vue')
    },
    {
      path: '/5',
      name: 'stealth',
      component: () => import('@/views/Version5View.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
