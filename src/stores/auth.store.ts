import { createStore } from 'vuex';
import firebase from 'firebase/app';

const initialState = () => {
  return { user: null, error: null };
};

export default createStore({
  state: initialState(),
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setError(state, payload) {
      state.error = payload;
    }
  },
  actions: {
    // Create a new user using an email address and password.
    registerUserAction({ commit }, payload) {
      // prettier-ignore
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password).then(res => {
        commit('setUser', res.user);
        console.log(`User registration for ${payload.email} successful!`);
      }).catch(err => {
        commit('setError', err.message);
        console.error(`Error while creating user account for ${payload.email}: ${err.message}`);
      })
    },
    // Authenticate a user using an email address and password.
    authenticateUserAction({ commit }, payload) {
      // prettier-ignore
      return firebase.auth().signInWithEmailAndPassword(payload.email, payload.password).catch(err => {
        commit('setError', err.message);
        console.error(`Error while authenticating user ${payload.email} - ${err.message}`);
      })
    },
    // Log the user out
    logOutUser({ commit }) {
      // prettier-ignore
      firebase.auth().signOut().catch(err => {
        commit('setError', err.message);
        console.error(`Eror while logging user out - ${err.message}`)
      })
    },
    // Update the user object whenever the authentication state changes
    authAction({ commit }) {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          commit('setUser', user);
          console.log('Updating user state');
        } else {
          commit('setUser', null);
          console.log('Setting user to null');
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
    getError(state) {
      return state.error;
    }
  }
});
