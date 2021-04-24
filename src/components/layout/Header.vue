<template>
  <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-primary">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">Vehicle Dashboard</router-link>
      <!-- prettier-ignore -->
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavbar" aria-controls="mainNavbar" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <!-- Authenticated -->
      <div v-if="getUser" id="mainNavbar" class="collapse navbar-collapse">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/dashboard">Dashboard</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/map">Map</router-link>
          </li>
        </ul>
        <ul class="navbar-nav mb-2 mb-lg-0">
          <li v-if="getRole === 'admin'" class="nav-item">
            <router-link class="nav-link" to="/admin">Admin</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/profile">{{ getUser.displayName }}</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="" @click="logOutUser()">
              <span class="iconify" data-icon="mdi:logout-variant" data-inline="true"></span>
              Log Out
            </a>
          </li>
        </ul>
      </div>
      <!-- Unauthenticated -->
      <div v-else id="mainNavbar" class="collapse navbar-collapse">
        <!-- Empty left list to keep other list on the right -->
        <ul class="navbar-nav me-auto mb-2 mb-lg-0"></ul>
        <ul class="navbar-nav mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/login">
              <span class="iconify" data-icon="mdi:login-variant" data-inline="true"></span>
              Log In
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';

export default defineComponent({
  name: 'Header',
  computed: {
    // Get the getter functions from the Vuex store
    ...mapGetters(['getUser', 'isUserAuthenticated', 'getRole'])
  },
  methods: {
    // Get the action functions from the Vuex store
    ...mapActions(['logOutUser'])
  }
});
</script>
