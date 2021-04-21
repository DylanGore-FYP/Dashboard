<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h1>Forgot Password</h1>
        <p class="lead">Not Yet Implemented</p>
        <div class="card mt-2">
          <div class="card-body">
            <form>
              <div class="mb-3">
                <label for="email" class="form-label">E-mail address</label>
                <input id="email" v-model="email" type="email" class="form-control" />
              </div>
              <button type="submit" class="btn btn-primary" @click.prevent="forgotPassword()">Retrieve Account</button>
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

export default defineComponent({
  data() {
    return {
      email: '' as string
    };
  },
  methods: {
    forgotPassword() {
      // TODO: Implement forgot password and form validation
      console.log('Sending password reset request for ', this.email);
    }
  }
});
</script>
