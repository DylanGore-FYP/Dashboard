<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h1>Register</h1>
        <div class="card mt-2">
          <div class="card-body">
            <form>
              <div class="mb-3">
                <label for="email" class="form-label">E-mail address</label>
                <input id="email" v-model="email" type="email" autocomplete="username" class="form-control" />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input id="password" v-model="password" type="password" autocomplete="new-password" class="form-control" />
              </div>
              <div class="mb-3">
                <label for="passwordConfirm" class="form-label">Confirm Password</label>
                <input id="passwordConfirm" v-model="passwordConfirm" type="password" autocomplete="new-password" class="form-control" />
              </div>
              <button type="submit" class="btn btn-primary" @click.prevent="createAccount()">Create Account</button>
              &nbsp;
              <router-link to="/login">I already have an account</router-link>
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
      passwordConfirm: '' as string
    };
  },
  methods: {
    ...mapActions(['registerUserAction']),
    createAccount() {
      // TODO: Form validation
      this.registerUserAction({ email: this.email, password: this.password });
    }
  }
});
</script>
