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
    /** Create a new user using an email address and password */
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
    /** Authenticate a user using an email address and password */
    async authenticateUserAction({ commit }, payload) {
      // prettier-ignore
      return firebase.auth().signInWithEmailAndPassword(payload.email, payload.password).catch(err => {
        commit('setAlert', {type: 'error', message: err.message});
        console.error(`Error while authenticating user ${payload.email} - ${err.message}`);
      })
    },
    /** Log the user out */
    logOutUser({ commit }) {
      // prettier-ignore
      firebase.auth().signOut().catch(err => {
        commit('setAlert', {type: 'error', message: err.message});
        console.error(`Error while logging user out - ${err.message}`)
      })
    },
    /** Login using external providers and set the user state */
    externalLogin({ commit }, payload) {
      return new Promise((resolve, reject) => {
        const authProvider = getAuthProvider(payload.provider);
        // If the auth provider is one of the providers defined above, continue
        if (authProvider != null) {
          // prettier-ignore
          firebase.auth().signInWithPopup(authProvider).then(res => {
            resolve(res.user)
            commit('setUser', res.user)
          }).catch(err => {
            commit('setAlert', {type: 'error', message: `Unable to login - ${err.message}`})
            reject(err)
          })
        } else {
          reject(`Authentication provider ${payload.provider} not supported`);
        }
      });
    },
    /** Link an additional login provider to an existing account */
    linkAccount({ commit }, payload) {
      return new Promise((resolve, reject) => {
        const authProvider = getAuthProvider(payload.provider);
        if (firebase.auth().currentUser && authProvider !== null) {
          // prettier-ignore
          firebase.auth().currentUser?.linkWithPopup(authProvider).then(res => {
          resolve(res.user);
        }).catch(err => {
          reject(err);
        })
        } else {
          reject({ message: 'Authentication error!' });
        }
      });
    },
    /** Unlink a currently linked authentication provider */
    unlinkAccount({ commit }, payload) {
      return new Promise((resolve, reject) => {
        const currentUser = firebase.auth().currentUser;
        if (currentUser && payload.provider) {
          // Only continue if the user has multiple providers
          if (currentUser?.providerData && currentUser?.providerData.length > 1) {
            let providerId: string | null = null;
            // Check that the provider the user wants to unlink is in the list of linked providers
            currentUser?.providerData.forEach((provider) => {
              if (provider?.providerId.includes(payload.provider)) {
                providerId = provider.providerId;
              }
            });
            if (providerId !== null) {
              // prettier-ignore
              currentUser?.unlink(providerId).then(res => {
                resolve(res)
              }).catch(err => {
                reject(err)
              });
            } else {
              reject({ message: 'Cannot unlink - no provider ID' });
            }
          } else {
            reject({ message: 'You must have at least one login provider!' });
          }
        } else {
          reject();
        }
      });
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

/** Return a Firebase Authentication Provider that matches the given id */
const getAuthProvider = (provider: string) => {
  if (provider === undefined || provider === null) {
    return null;
  } else {
    switch (provider) {
      case 'google':
        return new firebase.auth.GoogleAuthProvider();
      case 'facebook':
        return new firebase.auth.FacebookAuthProvider();
      case 'twitter':
        return new firebase.auth.TwitterAuthProvider();
      case 'github':
        return new firebase.auth.GithubAuthProvider();
      case 'yahoo':
        return new firebase.auth.OAuthProvider('yahoo.com');
      case 'microsoft':
        return new firebase.auth.OAuthProvider('microsoft.com');
      case 'apple':
        return new firebase.auth.OAuthProvider('apple.com');
      default:
        return null;
    }
  }
};
