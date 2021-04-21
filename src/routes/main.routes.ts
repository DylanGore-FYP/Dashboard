import { createWebHistory, createRouter } from 'vue-router';

import Dashboard from '../views/Dashboard.vue';
import VehicleOverview from '../views/VehicleOverview.vue';

import Login from '../components/auth/Login.vue';
import Register from '../components/auth/Register.vue';
import ForgotPassword from '../components/auth/ForgotPassword.vue';

const history = createWebHistory();
const routes = [
  { name: 'home', path: '/', redirect: '/dashboard' },
  { name: 'login', path: '/login', component: Login },
  { name: 'register', path: '/register', component: Register },
  { name: 'forgotPassword', path: '/forgot-password', component: ForgotPassword },
  { name: 'dashboard', path: '/dashboard', component: Dashboard },
  { name: 'vehicleOverview', path: '/vehicle/:vehicleId', component: VehicleOverview }
];

const router = createRouter({ history, routes });
export default router;
