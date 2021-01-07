<template>
  <div class="container-fluid">
    <div class="col-12">
      <h1>Vehicle: {{ $route.params.vehicleId }}</h1>
    </div>
    <div class="col-md-6 col-sm-12">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Time</th>
            <th scope="col">Field</th>
            <th scope="col">Value</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="entry in data" :key="entry.time">
            <td>{{ entry.time }}</td>
            <td>{{ entry.field }}</td>
            <td>{{ entry.value }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'VehicleOverview',
  data() {
    return {
      data: {}
    };
  },
  mounted() {
    this.getVehicleData();
  },
  methods: {
    getVehicleData() {
      this.axios.get('http://localhost:5000/vehicles/${$route.params.vehicleId}/speed').then((response) => {
        this.data = response.data;
        console.log(response.data);
      });
    }
  }
});
</script>

<style></style>
