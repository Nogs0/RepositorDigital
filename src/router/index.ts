/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { useAuthStore } from '@/stores/auth';
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/AuthLayout.vue'),
      meta: { requiresAuth: false },
      children: [
        {
          path: '',
          redirect: '/login'
        },
        {
          path: '/login',
          name: 'login',
          component: () => import('@/pages/LoginPage.vue'),
        },
        {
          path: '/register',
          name: 'register',
          component: () => import('@/pages/RegisterPage.vue'),
        },
      ]
    },
    {
      path: '/app',
      component: () => import("@/layouts/default.vue"),
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          redirect: '/dashboard'
        },
        {
          path: '/dashboard',
          name: 'dashboard',
          component: () => import("@/pages/Dashboard.vue")
        },
        {
          path: '/produtos',
          name: 'produtos',
          component: () => import("@/pages/Produtos.vue")
        },
        {
          path: '/perfil',
          name: 'perfil',
          component: () => import("@/pages/PerfilPage.vue")
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/pages/NotFoundPage.vue'),
    },
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const isLoggedIn = authStore.isAuthenticated;

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isLoginPage = to.path == '/login' || to.path == '/register' || to.path == '/';

  if (requiresAuth && !isLoggedIn) {
    next('/login');
  } else if (isLoginPage && isLoggedIn) {
    next('/app');
  } else {
    next();
  }
});

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (localStorage.getItem('vuetify:dynamic-reload')) {
      console.error('Dynamic import error, reloading page did not fix it', err)
    } else {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
