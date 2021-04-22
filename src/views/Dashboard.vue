<template>
  <div class="container-fluid">
    <div class="col-12">
      <h1>Dashboard</h1>
    </div>
    <div class="col-4">
      <h2>Vehicles</h2>
      <ul v-if="vehicles.length > 0" class="list-group">
        <router-link v-for="vehicle in vehicles" :key="vehicle" class="list-group-item list-group-item-action" :to="{ name: 'vehicleOverview', params: { vehicleId: vehicle } }">
          {{ vehicle }}
        </router-link>
      </ul>
      <p v-else class="lead">No vehicles found.</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';

export default defineComponent({
  name: 'Dashboard',
  props: {},
  data() {
    return {
      vehicles: [] as Array<string>
    };
  },
  computed: {
    // Get the getter functions from the Vuex store
    ...mapGetters(['getToken'])
  },
  mounted() {
    // Get vehicles on load
    this.getVehicles();
  },
  methods: {
    // Query the API for the list of vehicles
    getVehicles() {
      this.axios.get('http://localhost:5000/vehicles/all', { headers: { authorization: `Bearer ${this.getToken}` } }).then((response) => {
        this.vehicles = response.data as Array<string>;
        console.log(response.data);
      });
    }
  }
});
</script>
