import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Admin from '../views/Admin.vue'
import Dashboard from '../views/admin/Dashboard.vue'
import NewsManager from '../views/admin/NewsManager.vue'
import CurriculumManager from '../views/admin/CurriculumManager.vue'
import type { NavigationGuardNext } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/admin',
      component: Admin,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          component: Dashboard
        },
        {
          path: 'news',
          component: NewsManager
        },
        {
          path: 'curriculum',
          component: CurriculumManager
        }
      ]
    }
  ]
})

router.beforeEach((to, _from, next: NavigationGuardNext) => {
  const authStore = useAuthStore()
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router