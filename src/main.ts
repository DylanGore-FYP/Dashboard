import { createApp } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

// @ts-ignore
import App from './App.vue';
import authStore from './stores/auth.store';
import router from './routes/main.routes';

import { firebase } from './plugins/firebase';

import 'bootstrap';

// Define a variable for the app instance
let app = null as any;

// Check authentication status before rendering the app
firebase.auth().onAuthStateChanged((user) => {
  if (!app) {
    // Create the Vue app if it doesn't already exist
    app = createApp(App);

    app.use(authStore);
    app.use(router);
    app.use(VueAxios, axios);

    app.mount('#app');
  }

  authStore.commit('setUser', user);
  authStore.commit('setToken', firebase.auth().currentUser?.getIdToken());
  // prettier-ignore
  firebase.auth().currentUser?.getIdTokenResult().then(idTokenResult => {
    authStore.commit('setRole', idTokenResult.claims.role);
  })
});
