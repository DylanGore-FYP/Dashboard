<template>
  <div class="container">
    <div class="row justify-content-center pt-5">
      <div class="col-sm-12 col-md-8 col-lg-4">
        <h1 class="text-center h2 pb-4">Login</h1>
        <form>
          <!-- Error Alert -->
          <div v-if="getAlert.message && getAlert.type === 'error'" class="alert alert-danger alert-dismissible fade show" role="alert">
            {{ getAlert.message }}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" @click="clearAlert()"></button>
          </div>
          <!-- Main Form -->
          <div class="form-floating mb-3">
            <input id="email" v-model="email" type="email" autocomplete="username" class="form-control" placeholder="User" required />
            <label for="email" class="form-label">Email Address</label>
          </div>
          <div class="form-floating mb-3 text-end">
            <input id="password" v-model="password" type="password" autocomplete="current-password" class="form-control" placeholder="Password" required />
            <label for="password" class="form-label">Password</label>
            <router-link to="/forgot-password">Forgot password?</router-link>
          </div>
          <div class="d-grid gap-2 text-center">
            <button type="submit" class="btn btn-primary" @click.prevent="login">Login</button>
            <router-link v-if="enableUserRegistration" to="/register">Create a new account</router-link>
          </div>
        </form>
        <div v-if="enabledProviders.length > 0" class="text-center">
          <p class="lead mt-5">Or, login using one of the providers below.</p>
          <button v-for="provider in enabledProviders" :key="provider" class="btn m-1 p-2" @click="externalLoginAndRedirect(provider)">
            <span class="iconify" :data-icon="`mdi:${provider}`" data-inline="true"></span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { enabledLoginProviders, enableUserRegistration } from '../../helpers/environment';

export default defineComponent({
  data() {
    return {
      email: '' as string,
      password: '' as string,
      enableUserRegistration: enableUserRegistration as boolean,
      enabledProviders: enabledLoginProviders as Array<string>
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
    ...mapActions(['authenticateUserAction', 'logOutUser', 'externalLogin']),
    /** Log the user in */
    async login() {
      await this.authenticateUserAction({ email: this.email, password: this.password, router: this.$router });
      // If the user is authenticated, redirect to dashboard
      if (this.getUser) {
        this.$router.push({ path: '/dashboard' });
      }

      // clear the login form
      this.email = '';
      this.password = '';
    },
    /** Login using an external provider, redirect the user on successful login */
    externalLoginAndRedirect(provider: string) {
      this.externalLogin({ provider: provider }).then(() => {
        if (this.getUser) {
          this.$router.push({ path: '/dashboard' });
        }
      });
    }
  }
});
</script>

<style scoped>
.iconify {
  font-size: 1.8em;
}
</style>
