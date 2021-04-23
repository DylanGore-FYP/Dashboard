<template>
  <div class="container">
    <div class="row justify-content-center pt-5">
      <div class="col-4">
        <h1 class="text-center h2 pb-4">Create a New Account</h1>
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
          <div class="form-floating mb-3">
            <input id="name" v-model="name" type="text" autocomplete="name" class="form-control" placeholder="Name" required />
            <label for="name" class="form-label">Name</label>
          </div>
          <div class="form-floating mb-3">
            <input id="email" v-model="email" type="email" autocomplete="username" class="form-control" placeholder="example@example.com" required />
            <label for="email" class="form-label">Email Address</label>
          </div>
          <div class="form-floating mb-3">
            <input id="password" v-model="password" type="password" autocomplete="new-password" class="form-control" placeholder="Password" required @input="checkPassword()" />
            <label for="password">Password</label>
          </div>
          <div class="form-floating mb-3">
            <input id="passwordConfirm" v-model="passwordConfirm" type="password" autocomplete="new-password" class="form-control" placeholder="Password" required />
            <label for="passwordConfirm">Confirm Password</label>
          </div>
          <div class="mb-3">
            <label for="passwordStrength" class="form-label">Password Strength ({{ passwordStrength.value }})</label>
            <div id="passwordStrength" class="progress">
              <div :class="progressClasses" role="progressbar" :aria-valuenow="passwordStrength.id" :style="passwordStrengthPB" :aria-valuemin="0" :aria-valuemax="4"></div>
            </div>
          </div>
          <div class="d-grid gap-2 text-center">
            <button type="submit" class="btn btn-primary" @click.prevent="createAccount()">Create Account</button>
            <router-link to="/login">I already have an account</router-link>
          </div>
        </form>
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
    // Runs whenever the password value changes
    checkPassword() {
      // Calculate the password strength
      this.passwordStrength = passwordStrength(this.password);
      // Set the progress bar width based on the password strength
      this.passwordStrengthPB = `width: ${this.passwordStrength.id * 25 + 25}%;`;
      // Set the progress bar colour based on the password strength
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
    // Validate the registration form and create a new user
    createAccount() {
      // If both passwords match
      if (this.password === this.passwordConfirm) {
        // If the password strength is not considered 'Too weak'
        if (this.passwordStrength.id < 1) {
          this.setAlert({ type: 'error', message: 'Your password is not strong enough!' });
        } else {
          // If the name is not set
          if (this.name !== '') {
            // Register the new user
            this.registerUserAction({ name: this.name, email: this.email, password: this.password });
            // Clear the form
            this.name = this.email = this.password = this.passwordConfirm = '';
            // Calculate the password strength using the empty password to reset the progress bar
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
