<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <h1>Vehicle: {{ $route.params.vehicleId }}</h1>
      </div>
    </div>
    <div class="row">
      <!-- <div class="col-md-6 col-sm-12">
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
              <td>{{ parseDate(entry.time) }}</td>
              <td>{{ entry.field }}</td>
              <td>{{ entry.value }}</td>
            </tr>
          </tbody>
        </table>
      </div> -->
      <div class="col-md-6 col-sm-12">
        <div id="chart"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ApexCharts from 'apexcharts';
import { format } from 'date-fns';

export default defineComponent({
  name: 'VehicleOverview',
  data() {
    return {
      data: []
    };
  },
  computed: {
    chartSpeed() {
      return result;
    }
  },
  mounted() {
    this.getVehicleData();
    this.$nextTick(() => {});
  },
  methods: {
    getVehicleData() {
      console.log(this.$route.params.vehicleId);
      this.axios.get(`http://localhost:5000/vehicles/${this.$route.params.vehicleId}/speed`).then((response) => {
        this.data = response.data;

        var result = [];
        this.data.forEach((entry) => {
          result.push({ x: new Date(entry.time).getTime(), y: entry.value });
        });

        console.log(result);

        var options = {
          chart: {
            type: 'line'
          },
          series: [
            {
              name: 'Speed',
              data: result
            }
          ],
          xaxis: {
            type: 'datetime',
            min: new Date('2021-01-05T14:30:00').getTime(),
            max: new Date('2021-01-05T14:40:00').getTime()
          },
          yaxis: {
            labels: {
              formatter: function (value) {
                return value + ' km/h';
              }
            }
          },
          tooltip: {
            x: {
              formatter(timestamp) {
                return format(new Date(timestamp), 'dd MMM y pp');
              }
            }
          },
          title: {
            text: 'Speed'
          },
          markers: {
            size: 1
          }
        };

        var chart = new ApexCharts(document.querySelector('#chart'), options);

        chart.render();
      });
    },
    parseDate(date: string) {
      return new Date(date);
    }
  }
});
</script>
