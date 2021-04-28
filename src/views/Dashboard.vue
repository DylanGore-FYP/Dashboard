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
            <span class="iconify manufacturerIcon" :data-icon="vehicleDetails[vehicle].icon ? vehicleDetails[vehicle].icon : 'mdi:car'" data-inline="true"></span>
          </div>
          <div class="card-body">
            <hr />
            <h3 class="h5 card-title text-center">{{ vehicle.toUpperCase() }}</h3>
            <ul class="list-unstyled">
              <li>Last Updated: {{ vehicleDetails[vehicle] && vehicleDetails[vehicle]._time ? vehicleDetails[vehicle]._time : 'Unknown' }}</li>
              <li>Make: {{ vehicleDetails[vehicle] && vehicleDetails[vehicle].vehicle_manufacturer ? vehicleDetails[vehicle].vehicle_manufacturer : 'Unknown' }}</li>
              <li>Model: {{ vehicleDetails[vehicle] && vehicleDetails[vehicle].vehicle_model ? vehicleDetails[vehicle].vehicle_model : 'Unknown' }}</li>
              <li>Name: {{ vehicleDetails[vehicle] && vehicleDetails[vehicle].vehicle_name ? vehicleDetails[vehicle].vehicle_name : 'Unknown' }}</li>
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
        {{ vehicleDetails }}
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
import { apiLocation } from '../helpers/environment';

import Map from '../components/Map.vue';

export default defineComponent({
  name: 'Dashboard',
  components: {
    Map
  },
  data() {
    return {
      vehicles: [] as Array<string>,
      vehicleDetails: {},
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
    // prettier-ignore
    getVehicles() {
      this.axios.get(`${apiLocation}/vehicles/all`, { headers: { authorization: `Bearer ${this.getToken}` } }).then((response) => {
        if (String(response.headers['content-type']).includes('application/json')) this.vehicles = response.data as Array<string>;
      }).then(() => {
        this.vehicles.forEach(vehicle => {
          this.axios.get(`${apiLocation}/vehicles/${vehicle}`, { headers: { authorization: `Bearer ${this.getToken}` } }).then(res => {
            if (String(res.headers['content-type']).includes('application/json')){
              // @ts-ignore
              this.vehicleDetails[vehicle] = res.data

              if (res.data.vehicle_manufacturer){
                // @ts-ignore
                this.vehicleDetails[vehicle].icon = 'simple-icons:' + String(res.data.vehicle_manufacturer).toLowerCase();
              }else{
                // @ts-ignore
                this.vehicleDetails[vehicle].icon = 'mdi:car';
              }
            }
          })
        })
      });
    },
    getVehicleIcon(vehicle: string) {
      // @ts-ignore
      if (this.vehicleDetails[vehicle] && this.vehicleDetails[vehicle].vehicle_manufacturer) {
        // @ts-ignore
        return 'simple-icons:' + String(this.vehicleDetails[vehicle].vehicle_manufacturer).toLowerCase();
      } else {
        return 'mdi:car';
      }
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
