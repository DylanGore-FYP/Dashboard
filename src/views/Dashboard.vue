<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <h1>Dashboard</h1>
        <h2 v-if="vehicles.length > 0">All Vehicles ({{ vehicles.length }})</h2>
        <h2 v-else>All Vehicles (0)</h2>
      </div>
    </div>
    <div v-if="vehicles.length > 0" class="row">
      <div v-for="vehicle in vehicles" :key="vehicle" class="col-sm-12 col-md-3">
        <div class="card">
          <div class="d-flex justify-content-center pt-4">
            <span class="iconify manufacturerIcon" :data-icon="manufacturerIcon" data-inline="true"></span>
          </div>
          <div class="card-body">
            <hr />
            <h3 class="h5 card-title text-center">{{ vehicle.toUpperCase() }}</h3>
            <ul class="list-unstyled">
              <li>Last Updated: Unknown</li>
              <li>Last Driver: Unknown</li>
              <li>Fault Status: OK</li>
              <li>Current State: Offline</li>
            </ul>
            <div class="d-grid">
              <router-link :to="{ name: 'vehicleOverview', params: { vehicleId: vehicle } }" class="btn btn-primary btn-block">View Details</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="vehicles.length > 0" class="row mt-2">
      <div class="col-sm-12 col-md-6">
        <h2>Map</h2>
        <Map />
      </div>
      <div class="col-sm-12 col-md-6">
        <h2>Alerts</h2>
        No alerts.
      </div>
    </div>
    <div v-else class="row mt-2">
      <div class="col"><p class="lead">No vehicles found</p></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';

import Map from '../components/Map.vue';

export default defineComponent({
  name: 'Dashboard',
  components: {
    Map
  },
  data() {
    return {
      vehicles: [] as Array<string>,
      manufacturerIcon: 'simple-icons:tesla' as string,
      // manufacturerIcon: 'mdi:car' as string,
      map: {
        zoom: 7 as number
      }
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
      });
    }
  }
});
</script>

<style scoped>
.img-container {
  width: 100%;
  height: 100%;
  background: red;
}
.manufacturerIcon {
  width: 10em;
  height: 10em;
}
</style>
