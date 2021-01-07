import { createWebHistory, createRouter } from 'vue-router';

import Dashboard from '../views/Dashboard.vue';
import VehicleOverview from '../views/VehicleOverview.vue';

const history = createWebHistory();
const routes = [
  { name: 'home', path: '/', redirect: '/dashboard' },
  { name: 'dashboard', path: '/dashboard', component: Dashboard },
  { name: 'vehicleOverview', path: '/vehicle/:vehicleId', component: VehicleOverview },
];

const router = createRouter({ history, routes });
export default router;
