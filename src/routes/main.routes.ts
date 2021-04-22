import { createWebHistory, createRouter } from 'vue-router';
import firebase from 'firebase/app';

// General Components
// @ts-ignore
import Dashboard from '../views/Dashboard.vue';
// @ts-ignore
import VehicleOverview from '../views/VehicleOverview.vue';

// Auth-Related Components
// @ts-ignore
import Login from '../components/auth/Login.vue';
// @ts-ignore
import Register from '../components/auth/Register.vue';
// @ts-ignore
import ForgotPassword from '../components/auth/ForgotPassword.vue';

const history = createWebHistory();
const routes = [
  { name: 'home', path: '/', redirect: '/dashboard' },
  { name: 'login', path: '/login', component: Login },
  { name: 'register', path: '/register', component: Register },
  { name: 'forgotPassword', path: '/forgot-password', component: ForgotPassword },
  { name: 'dashboard', path: '/dashboard', meta: { requiresAuth: true }, component: Dashboard },
  { name: 'vehicleOverview', path: '/vehicle/:vehicleId', meta: { requiresAuth: true }, component: VehicleOverview }
];

const router = createRouter({ history, routes });

router.beforeEach((to, _from, next) => {
  // If the route requires authentication
  if (to.matched.some((rec) => rec.meta.requiresAuth)) {
    // Check the user's authentication state
    if (firebase.auth().currentUser) {
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

export default router;
