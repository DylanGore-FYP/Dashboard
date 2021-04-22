import { createApp } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

// @ts-ignore
import App from './App.vue';
import authStore from './stores/auth.store';
import router from './routes/main.routes';

import './plugins/firebase';

import 'bootstrap';

const app = createApp(App);

app.use(authStore);
app.use(router);
app.use(VueAxios, axios);

app.mount('#app');
