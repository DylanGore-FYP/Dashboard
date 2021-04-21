<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h1>Login</h1>
        <!-- Show only if the user is not already logged in -->
        <div v-if="!getUser" class="card mt-2">
          <div class="card-body">
            <form>
              <!-- Error Alert -->
              <div v-if="getAlert.message && getAlert.type === 'error'" class="alert alert-danger alert-dismissible fade show" role="alert">
                {{ getAlert.message }}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" @click="clearAlert()"></button>
              </div>
              <!-- Main Form -->
              <div class="mb-3">
                <label for="email" class="form-label">E-mail address</label>
                <input id="email" v-model="email" type="email" autocomplete="username" class="form-control" required />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input id="password" v-model="password" type="password" autocomplete="current-password" class="form-control" required />
                <router-link to="/forgot-password">Forgot password</router-link>
              </div>
              <button type="submit" class="btn btn-primary" @click.prevent="login">Login</button>
              &nbsp;
              <router-link to="/register">Create a new account</router-link>
            </form>
          </div>
        </div>
        <!-- Show if user is already logged in -->
        <div v-else class="card mt-2">
          <div class="card-body">
            <div class="card-text">You are already logged in as {{ getUser.email }}</div>
            <div class="btn-group" role="group">
              <router-link class="btn btn-primary" to="/dashboard" role="button" tag="button">Dashboard</router-link>
              <button class="btn btn-secondary" role="button" @click="logOutUser()">Log Out</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapGetters, mapMutations } from 'vuex';

export default defineComponent({
  data() {
    return {
      email: '' as string,
      password: '' as string
    };
  },
  computed: {
    // Get the getter functions from the Vuex store
    ...mapGetters(['getAlert', 'getUser'])
  },
  mounted() {
    // Clear any previous alerts when the component loads
    this.clearAlert();
  },
  methods: {
    // Get the action and mutation functions from the Vuex store
    ...mapMutations(['clearAlert']),
    ...mapActions(['authenticateUserAction', 'logOutUser']),
    // Log the user in
    login() {
      this.authenticateUserAction({ email: this.email, password: this.password });

      // clear the login form
      this.email = '';
      this.password = '';
    }
  }
});
</script>
