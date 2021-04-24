import { createWebHistory, createRouter } from 'vue-router';
import store from '../stores/auth.store';

const history = createWebHistory();
const routes = [
  { name: 'home', path: '/', redirect: '/dashboard' },
  // @ts-ignore
  { name: 'dashboard', path: '/dashboard', meta: { requiresAuth: true }, component: () => import('../views/Dashboard.vue') },
  // @ts-ignore
  { name: 'vehicleOverview', path: '/vehicle/:vehicleId', meta: { requiresAuth: true }, component: () => import('../views/VehicleOverview.vue') },
  // @ts-ignore
  { name: 'map', path: '/map', meta: { requiresAuth: true }, component: () => import('../components/Map.vue') },
  // @ts-ignore
  { name: 'login', path: '/login', meta: { requiresGuest: true }, component: () => import('../components/auth/Login.vue') },
  // @ts-ignore
  { name: 'register', path: '/register', meta: { requiresGuest: true }, component: () => import('../components/auth/Register.vue') },
  // @ts-ignore
  { name: 'forgotPassword', path: '/forgot-password', component: () => import('../components/auth/ForgotPassword.vue') },
  // @ts-ignore
  { name: 'profile', path: '/profile', meta: { requiresAuth: true }, component: () => import('../components/auth/Profile.vue') }
];

const router = createRouter({ history, routes });

router.beforeEach((to, _from, next) => {
  // If the route requires authentication
  if (to.matched.some((rec) => rec.meta.requiresAuth)) {
    // Check the user's authentication state
    if (store.getters.getUser) {
      // If user is logged in, continue
      next();
    } else {
      // User is not logged in, redirect to login page
      next({ name: 'login' });
    }
  } else {
    // The route doesn't have any relevant meta tags, continue
    next();
  }
});

router.beforeEach((to, _from, next) => {
  // If the route requires authentication
  if (to.matched.some((rec) => rec.meta.requiresGuest)) {
    // Check the user's authentication state
    if (store.getters.getUser) {
      // If user is logged in, redirect them to the dashboard
      next({ name: 'dashboard' });
    } else {
      // User is not logged in, continue
      next();
    }
  } else {
    // The route doesn't have any relevant meta tags, continue
    next();
  }
});

export default router;
