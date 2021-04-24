import { createStore } from 'vuex';
import firebase from 'firebase/app';
import gravatar from 'gravatar';

// Define the default state for each item in the store
const initialState = () => {
  return { user: null, token: null, role: null, alert: { type: 'error', message: '' } };
};

export default createStore({
  state: initialState(),
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setToken(state, payload) {
      state.token = payload;
    },
    setRole(state, payload) {
      state.role = payload;
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
            displayName: payload.name,
            // Get user's avatar using their email address, if it doesn't exist with Gravatar, use default
            photoURL: gravatar.url(payload.email, { size: '64', default: 'mp' }, true)
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
    async authenticateUserAction({ commit }, payload) {
      // prettier-ignore
      return firebase.auth().signInWithEmailAndPassword(payload.email, payload.password).catch(err => {
        commit('setAlert', {type: 'error', message: err.message});
        console.error(`Error while authenticating user ${payload.email} - ${err.message}`);
      })
    },
    // Log the user out
    logOutUser({ commit }) {
      // prettier-ignore
      firebase.auth().signOut().catch(err => {
        commit('setAlert', {type: 'error', message: err.message});
        console.error(`Error while logging user out - ${err.message}`)
      })
    }
  },
  getters: {
    // Get the user object
    getUser(state) {
      return state.user;
    },
    // Get the user's authentication token
    getToken(state) {
      // @ts-ignore
      return state.token?.i;
    },
    // Get the user's role
    getRole(state) {
      // @ts-ignore
      return state.role;
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
