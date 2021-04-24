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
        <!-- TODO: Implement click action -->
        <!-- <button v-for="provider in connectedProviders" :key="provider" class="btn providerButton py-0 my-0" @click="updateProvider(provider)"> -->
        <button v-for="provider in connectedProviders" :key="provider" class="btn providerButton py-0 my-0">
          <span class="iconify" :data-icon="getProviderIconName(provider)" data-inline="true"></span>
        </button>
        <!-- Only show if there is additional providers available -->
        <!-- TODO: Implement account linking -->
        <!-- <div v-if="availableProviders.length > 0">
          <h3 class="h5">Available Login Providers</h3>
          <button v-for="provider in availableProviders" :key="provider" class="btn providerButton py-0 my-0" @click="updateProvider(provider)">
            <span class="iconify" :data-icon="getProviderIconName(provider)" data-inline="true"></span>
          </button>
        </div> -->

        <br />
        <router-link v-if="connectedProviders.includes('password')" to="/forgot-password" class="btn btn-primary mt-5" tag="button">Reset Password</router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { enabledLoginProviders } from '../../helpers/environment';

export default defineComponent({
  data() {
    return {
      connectedProviders: [] as Array<string>,
      availableProviders: [] as Array<string>,
      possibleProviders: ['password', ...enabledLoginProviders]
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
    ...mapActions(['linkAccount']),
    /** Populate relevant provider lists */
    getProviders() {
      this.getUser.providerData.forEach((provider: any) => {
        this.possibleProviders.forEach((possible: string) => {
          if (String(provider.providerId).includes(possible)) {
            this.connectedProviders.push(possible);
          }
        });
      });

      this.availableProviders = this.possibleProviders.filter((x) => !this.connectedProviders.includes(x));

      // this.possibleProviders.forEach((possible) => {
      //   if (!this.connectedProviders.includes(possible)) {
      //     this.availableProviders.push(possible);
      //   }
      // });
    },
    /** Return the icon name for the given provider */
    getProviderIconName(provider: string) {
      switch (provider) {
        case 'password':
          return 'mdi:email';
        default:
          return `mdi:${provider}`;
      }
    },
    /** Link/unlink an authentication provider */
    updateProvider(provider: string) {
      if (this.connectedProviders.includes(provider)) {
        console.log('Not yet implemented');
      } else {
        this.linkAccount({ provider: provider });
      }
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

/* Remove glow around provider button */
.providerButton:focus {
  border: none;
  box-shadow: none;
}
</style>
