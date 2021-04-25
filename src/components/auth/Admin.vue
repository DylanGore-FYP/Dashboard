<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col text-center">
        <h1 class="text-center h2 pb-2">Admin Dashboard</h1>
      </div>
    </div>
    <!-- Display the list of users -->
    <div v-if="users.length > 0" class="row">
      <div v-for="user in users" :key="user" class="col-sm-12 col-md-6 col-lg-4">
        <div class="card">
          <div class="d-flex justify-content-center pt-4">
            <img id="avatar" :src="user.photoURL" class="img-responsive rounded-circle" alt="User avatar image" />
          </div>
          <div class="card-body">
            <h3 class="h5 card-title text-center">
              {{ user.displayName }}
              <span v-if="isAdmin(user)" class="badge bg-primary">Admin</span>
              <span v-if="user.uid === getUser.uid" class="badge bg-info">You</span>
            </h3>
            <ul class="list-unstyled text-center">
              <li class="small">{{ user.uid }}</li>
              <li>{{ user.email ? user.email : 'No email address found' }}</li>
              <li>{{ user.phoneNumber ? user.phoneNumber : 'No phone number found' }}</li>
              <br />
              <li>Last Login: {{ user.metadata.lastSignInTime }}</li>
              <li>User Since: {{ user.metadata.creationTime }}</li>
            </ul>
            <div class="d-grid gap-2">
              <button class="btn btn-danger" :disabled="user.uid === getUser.uid" @click="deleteUser(user)">Delete User</button>
              <button class="btn btn-warning" :disabled="user.uid === getUser.uid" @click="promoteDemoteAdmin(user)">
                {{ isAdmin(user) ? 'Revoke' : 'Grant' }} Admin Privileges
              </button>
              <button class="btn btn-success" :disabled="user.uid === getUser.uid" @click="setUserStatus(user)">{{ checkUserStatus(user) }}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Show if no users found -->
    <div v-else class="row">
      <div class="col">
        <p class="lead">No Users Found!</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import { apiLocation } from '../../helpers/environment';

export default defineComponent({
  data() {
    return {
      users: [] as Array<any>
    };
  },
  computed: {
    // Get the getter functions from the Vuex store
    ...mapGetters(['getAlert', 'getUser', 'getToken', 'getRole'])
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    /** Get the list of users */
    getUsers() {
      this.axios.get(`${apiLocation}/auth/users`, { headers: { authorization: `Bearer ${this.getToken}` } }).then((response) => {
        if (String(response.headers['content-type']).includes('application/json')) this.users = response.data;
      });
    },
    /** Check if a user is an admin */
    isAdmin(user: any) {
      if (user.customClaims) {
        if (user.customClaims.role) {
          if (user.customClaims.role === 'admin') {
            return true;
          }
        }
      }
      return false;
    },
    /** Check if the user is disable/enabled/approved */
    checkUserStatus(user: any) {
      if (user.disabled) {
        return 'Enable User';
      } else if (!user.customClaims || !user.customClaims.role) {
        return 'Approve User';
      } else {
        return 'Disable User';
      }
    },
    /** Send an API request to delete a user */
    deleteUser(user: any) {
      console.log(`Deleting user: ${user.uid}`);
      this.axios.delete(`${apiLocation}/auth/users/${user.uid}`, { headers: { authorization: `Bearer ${this.getToken}` } });
      setTimeout(() => {
        this.getUsers();
      }, 2000);
    },
    /** If the user has the admin role, remove it, if not, add it */
    promoteDemoteAdmin(user: any) {
      if (user.uid === this.getUser.uid) {
        console.log('You cannot promote/demote yourself!');
      } else {
        let mode = this.isAdmin(user) ? 'revoke' : 'grant';
        this.axios.put(`${apiLocation}/auth/roles/${mode}/admin/${user.uid}`, {}, { headers: { authorization: `Bearer ${this.getToken}` } }).then(() => {
          this.getUsers();
        });
      }
    },
    /** Send an API request to set the user status to enabled/disabled/approved */
    setUserStatus(user: any) {
      let route = '';
      console.log(user);
      if (user.customClaims && user.customClaims.role && !user.disabled) {
        // Disable
        route = `${apiLocation}/auth/users/${user.uid}/disable`;
      } else if (user.disabled) {
        // Enable
        route = `${apiLocation}/auth/users/${user.uid}/enable`;
      } else {
        // Approve
        route = `${apiLocation}/auth/roles/grant/user/${user.uid}`;
      }
      if (route.length > 0) {
        // prettier-ignore
        this.axios.put(route, {}, { headers: { authorization: `Bearer ${this.getToken}` } }).then(() => {
          this.getUsers();
        }).catch(err => {
          console.error(err)
        });
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
</style>
