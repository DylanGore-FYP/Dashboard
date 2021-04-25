<template>
  <div class="container">
    <div class="row justify-content-center pt-5">
      <div class="col-sm-12 col-md-8 col-lg-4">
        <h1 class="text-center h2 pb-4">Forgot Password</h1>
        <form>
          <!-- Error Alert -->
          <div v-if="getAlert.message && getAlert.type === 'error'" class="alert alert-danger alert-dismissible fade show" role="alert">
            {{ getAlert.message }}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" @click="clearAlert()"></button>
          </div>
          <!-- Success Alert -->
          <div v-if="getAlert.message && getAlert.type === 'success'" class="alert alert-success alert-dismissible fade show" role="alert">
            {{ getAlert.message }}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" @click="clearAlert()"></button>
          </div>
          <!-- Main Form -->
          <div class="form-floating mb-3">
            <input id="email" v-model="email" type="email" class="form-control" placeholder="example@example.com" />
            <label for="email" class="form-label">Email Address</label>
            <p class="form-text text-center">Please enter your email address to request a password reset link be sent to you via email.</p>
          </div>
          <div class="d-grid gap-2 text-center">
            <button type="submit" class="btn btn-primary" @click.prevent="submitForm()">Send Recovery Email</button>
            <!-- Only show the link to the login page if the user isn't already logged in -->
            <router-link v-if="!getUser" to="/login">Return to login</router-link>
            <!-- Show a link to the user's profile if they are logged in -->
            <router-link v-else to="/profile">Return your profile</router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapMutations, mapGetters } from 'vuex';
import firebase from 'firebase/app';

export default defineComponent({
  data() {
    return {
      email: '' as string
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
    // Get the mutation functions from the Vuex store
    ...mapMutations(['setAlert', 'clearAlert']),
    // Validate the e-mail address, if it's valid send the reset request, if not display an error
    submitForm() {
      const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (this.email.match(emailRegex)) {
        this.forgotPassword();
      } else {
        this.setAlert({ type: 'error', message: 'Please enter  a valid e-mail address!' });
      }
    },

    // Attempt to send a password reset request to Firebase and display the result in an alert.
    forgotPassword() {
      // prettier-ignore
      firebase.auth().sendPasswordResetEmail(this.email).then(() => {
        console.log(`Sending password reset request to ${this.email}`);
        this.setAlert({ type: 'success', message: 'A password reset e-mail has been sent. Please check your inbox.'});
        // Clear the form
        this.email = ''
      }).catch((err) => {
        this.setAlert({ type: 'error', message: err.message });
        console.error(`Error while sending a password reset email to ${this.email} - ${err.message}`)
      })
    }
  }
});
</script>
