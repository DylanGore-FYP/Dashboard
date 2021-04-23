<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col text-center">
        <h1 class="text-center h2 pb-2">Profile</h1>
        <img id="avatar" :src="getUser.photoURL" class="img-responsive rounded-circle" alt="User avatar image" />

        <h2 class="h3">{{ getUser.displayName }}</h2>
        <ul class="list-unstyled">
          <li class="small">{{ getUser.uid }}</li>
          <br />
          <li>{{ getUser.email ? getUser.email : 'No email address found' }}</li>
          <li>{{ getUser.phoneNumber ? getUser.phoneNumber : 'No phone number found' }}</li>
        </ul>
        <p class="small"><em>Click on a login provider to link/unlink your account.</em></p>
        <h3 class="h5">Connected Login Providers</h3>
        <button v-for="provider in enabledProviders" :key="provider" class="btn providerButton py-0 my-0" @click="updateProvider(provider)">
          <span class="iconify" :data-icon="getProviderIconName(provider)" data-inline="true"></span>
        </button>
        <h3 class="h5">Available Login Providers</h3>
        <button v-for="provider in availableProviders" :key="provider" class="btn providerButton py-0 my-0" @click="updateProvider(provider)">
          <span class="iconify" :data-icon="getProviderIconName(provider)" data-inline="true"></span>
        </button>
        <br />
        <router-link to="/forgot-password" class="btn btn-primary mt-5" tag="button">Reset Password</router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters, mapMutations } from 'vuex';

export default defineComponent({
  data() {
    return {
      enabledProviders: [] as Array<string>,
      availableProviders: [] as Array<string>,
      possibleProviders: ['password', 'phone', 'google', 'facebook', 'twitter', 'github', 'yahoo', 'microsoft', 'apple']
    };
  },
  computed: {
    // Get the getter functions from the Vuex store
    ...mapGetters(['getAlert', 'getUser'])
  },
  mounted() {
    // Clear any previous alerts when the component loads
    this.clearAlert();
    this.getProviders();
  },
  methods: {
    // Get the action and mutation functions from the Vuex store
    ...mapMutations(['clearAlert']),
    getProviders() {
      this.getUser.providerData.forEach((provider: any) => {
        this.enabledProviders.push(provider.providerId);
      });
      this.possibleProviders.forEach((possible) => {
        if (!this.enabledProviders.includes(possible)) {
          this.availableProviders.push(possible);
        }
      });
    },
    getProviderIconName(provider: string) {
      switch (provider) {
        case 'password':
          return 'mdi:email';
        default:
          return `mdi:${provider}`;
      }
    },
    updateProvider(provider: string) {
      console.log(`Linking/Unlinking ${provider} as a login provider`);
    }
  }
});
</script>

<style scoped>
#avatar {
  height: 8em;
}
.providerButton {
  font-size: 2.5em;
}
</style>
