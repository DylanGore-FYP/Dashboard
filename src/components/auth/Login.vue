<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h1>Login</h1>
        <div class="card mt-2">
          <div class="card-body">
            <form>
              <div class="mb-3">
                <label for="email" class="form-label">E-mail address</label>
                <input id="email" v-model="email" type="email" autocomplete="username" class="form-control" />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input id="password" v-model="password" type="password" autocomplete="current-password" class="form-control" />
                <router-link to="/forgot-password">Forgot password</router-link>
              </div>
              <button type="submit" class="btn btn-primary" @click.prevent="login()">Login</button>
              &nbsp;
              <router-link to="/register">Create a new account</router-link>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions } from 'vuex';

export default defineComponent({
  data() {
    return {
      email: '' as string,
      password: '' as string,
      errors: []
    };
  },
  methods: {
    ...mapActions(['authenticateUserAction']),
    login() {
      // TODO: Form Validation
      this.authenticateUserAction({ email: this.email, password: this.password });
    }
  }
});
</script>
