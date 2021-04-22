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
                <label for="name" class="form-label">Name</label>
                <input id="name" v-model="name" type="text" autocomplete="name" class="form-control" required />
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">E-mail address</label>
                <input id="email" v-model="email" type="email" autocomplete="username" class="form-control" required />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input id="password" v-model="password" type="password" autocomplete="new-password" class="form-control" required @input="checkPassword()" />
              </div>
              <div class="mb-3">
                <label for="passwordConfirm" class="form-label">Confirm Password</label>
                <input id="passwordConfirm" v-model="passwordConfirm" type="password" autocomplete="new-password" class="form-control" required />
              </div>
              <div class="mb-3">
                <label for="passwordStrength" class="form-label">Password Strength ({{ passwordStrength.value }})</label>
                <div id="passwordStrength" class="progress">
                  <div :class="progressClasses" role="progressbar" :aria-valuenow="passwordStrength.id" :style="passwordStrengthPB" aria-valuemin="0" aria-valuemax="4"></div>
                </div>
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
            <div class="card-text">You are logged in as {{ getUser.displayName }} ({{ getUser.email }})</div>
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
// @ts-ignore
import { passwordStrength } from 'check-password-strength';

export default defineComponent({
  data() {
    return {
      name: '' as string,
      email: '' as string,
      password: '' as string,
      passwordConfirm: '' as string,
      passwordStrength: {
        id: 0 as number,
        contains: [],
        length: 0 as number,
        value: 'Too weak' as string
      },
      passwordStrengthPB: 'width: 25%;' as string,
      progressClasses: ['progress-bar', 'bg-danger']
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
    checkPassword() {
      this.passwordStrength = passwordStrength(this.password);
      this.passwordStrengthPB = `width: ${this.passwordStrength.id * 25 + 25}%;`;
      switch (this.passwordStrength.id) {
        case 0:
          this.progressClasses[1] = 'bg-danger';
          break;
        case 1:
          this.progressClasses[1] = 'bg-warning';
          break;
        case 2:
          this.progressClasses[1] = 'bg-info';
          break;
        case 3:
          this.progressClasses[1] = 'bg-success';
          break;
      }
    },
    createAccount() {
      if (this.password === this.passwordConfirm) {
        if (this.passwordStrength.id < 1) {
          this.setAlert({ type: 'error', message: 'Your password is not strong enough!' });
        } else {
          if (this.name !== '') {
            // Register the new user
            this.registerUserAction({ name: this.name, email: this.email, password: this.password });
            // Clear the form
            this.name = this.email = this.password = this.passwordConfirm = '';
            this.checkPassword();
          } else {
            this.setAlert({ type: 'error', message: 'Please enter your name' });
          }
        }
      } else {
        this.setAlert({ type: 'error', message: 'Your passwords do not match!' });
      }
    }
  }
});
</script>
