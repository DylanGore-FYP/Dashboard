<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h1>Register</h1>
        <!-- Show only if the user is not already logged in -->
        <div v-if="!getUser" class="card mt-2">
          <div class="card-body">
            <form>
              <!-- Error Alert -->
              <div v-if="getAlert.message && getAlert.type === 'error'" class="alert alert-danger alert-dismissible fade show" role="alert">
                {{ getAlert.message }}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" @click="clearAlert()"></button>
              </div>
              <!-- Success Alert -->
              <div v-if="getAlert.message && getAlert.type === 'success'" class="alert alert-success alert-dismissible fade show" role="alert">
                {{ getAlert.message }}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </div>
              <!-- Main Form -->
              <div class="mb-3">
                <label for="email" class="form-label">E-mail address</label>
                <input id="email" v-model="email" type="email" autocomplete="username" class="form-control" required />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input id="password" v-model="password" type="password" autocomplete="new-password" class="form-control" required />
              </div>
              <div class="mb-3">
                <label for="passwordConfirm" class="form-label">Confirm Password</label>
                <input id="passwordConfirm" v-model="passwordConfirm" type="password" autocomplete="new-password" class="form-control" required />
              </div>
              <button type="submit" class="btn btn-primary" @click.prevent="createAccount()">Create Account</button>
              &nbsp;
              <router-link to="/login">I already have an account</router-link>
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
      password: '' as string,
      passwordConfirm: '' as string
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
    ...mapActions(['registerUserAction', 'logOutUser']),
    ...mapMutations(['clearAlert', 'setAlert']),
    createAccount() {
      if (this.password === this.passwordConfirm) {
        // Register the new user
        this.registerUserAction({ email: this.email, password: this.password });
        // Clear the form
        this.email = this.password = this.passwordConfirm = '';
      } else {
        this.setAlert({ type: 'error', message: 'Your passwords do not match!' });
      }
    }
  }
});
</script>
