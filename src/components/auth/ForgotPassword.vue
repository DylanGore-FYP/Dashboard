<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h1>Forgot Password</h1>
        <div class="card mt-2">
          <div class="card-body">
            <form>
              <!-- Error Alert -->
              <div v-if="alert.message && alert.type === 'error'" class="alert alert-danger alert-dismissible fade show" role="alert">
                {{ alert.message }}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </div>
              <!-- Success Alert -->
              <div v-if="alert.message && alert.type === 'success'" class="alert alert-success alert-dismissible fade show" role="alert">
                {{ alert.message }}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </div>
              <!-- Main Form -->
              <div class="mb-3">
                <label for="email" class="form-label">E-mail address</label>
                <input id="email" v-model="email" type="email" class="form-control" />
                <div class="form-text">
                  Please enter your e-mail address above. If it matches an existing account you will receive an e-mail with instuctions to reset your password.
                </div>
              </div>
              <button type="submit" class="btn btn-primary" @click.prevent="submitForm()">Reset Password</button>
              &nbsp;
              <router-link to="/login">Return to login</router-link>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import firebase from 'firebase/app';

export default defineComponent({
  data() {
    return {
      email: '' as string,
      alert: {
        type: 'error' as string,
        message: '' as string
      }
    };
  },
  methods: {
    // Validate the e-mail address, if it's valid send the reset request, if not display an error
    submitForm() {
      const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (this.email.match(emailRegex)) {
        this.forgotPassword();
      } else {
        this.alert = { type: 'error', message: 'Please enter  a valid e-mail address!' };
      }
    },

    // Attempt to send a password reset request to Firebase and display the result in an alert.
    forgotPassword() {
      // prettier-ignore
      firebase.auth().sendPasswordResetEmail(this.email).then(() => {
        console.log(`Sending password reset request to ${this.email}`);
        this.alert = { type: 'success', message: 'A password reset e-mail has been sent. Please check your inbox.'}
      }).catch((err) => {
        this.alert = { type: 'error', message: err.message };
        console.error(`Error while sending a password reset email to ${this.email} - ${err.message}`)
      })
    }
  }
});
</script>