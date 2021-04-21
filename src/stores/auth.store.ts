import { createStore } from 'vuex';
import firebase from 'firebase/app';

// Define the default state for each item in the store
const initialState = () => {
  return { user: null, alert: { type: 'error', message: '' } };
};

export default createStore({
  state: initialState(),
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setAlert(state, payload) {
      state.alert = payload;
    },
    clearAlert(state, _payload) {
      state.alert = initialState().alert;
    }
  },
  actions: {
    // Create a new user using an email address and password.
    registerUserAction({ commit }, payload) {
      // prettier-ignore
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password).then(res => {
        commit('setUser', res.user);
        if (res.user){
          res.user.updateProfile({
            displayName: payload.name
          })
        }
        commit('setAlert', {type: 'success', message: 'New user created successfully!'});
        console.log(`User registration for ${payload.email} successful!`);
      }).catch(err => {
        commit('setAlert', {type: 'error', message: err.message});
        console.error(`Error while creating user account for ${payload.email}: ${err.message}`);
      })
    },
    // Authenticate a user using an email address and password.
    authenticateUserAction({ commit }, payload) {
      // prettier-ignore
      return firebase.auth().signInWithEmailAndPassword(payload.email, payload.password).catch(err => {
        // commit('setAlertType', 'error');
        // commit('setAlertMessage', err.message);
        commit('setAlert', {type: 'error', message: err.message});
        console.error(`Error while authenticating user ${payload.email} - ${err.message}`);
      })
    },
    // Log the user out
    logOutUser({ commit }) {
      // prettier-ignore
      firebase.auth().signOut().catch(err => {
        commit('setAlert', {type: 'error', message: err.message});
        console.error(`Eror while logging user out - ${err.message}`)
      })
    },
    // Update the user object whenever the authentication state changes
    authAction({ commit }) {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          commit('setUser', user);
          console.log('Setting user');
        } else {
          commit('setUser', null);
          console.log('Clearing User');
        }
      });
    }
  },
  getters: {
    // Get the user object
    getUser(state) {
      return state.user;
    },
    // Check if the user object exists, it will only exist if the user is authenticated.
    isUserAuthenticated(state) {
      return !!state.user;
    },
    // Get the authentication error object
    getAlert(state) {
      return state.alert;
    }
  }
});
