<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <h1>Vehicle: {{ $route.params.vehicleId }}</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 col-sm-12">
        <div id="chartSpeed" class="vehicleChart"></div>
      </div>
      <div class="col-md-6 col-sm-12">
        <div id="chartRPM" class="vehicleChart"></div>
      </div>
      <div class="col-md-6 col-sm-12">
        <div id="chartCoolantTemp" class="vehicleChart"></div>
      </div>
      <div class="col-md-6 col-sm-12">
        <div id="chartIntakeTemp" class="vehicleChart"></div>
      </div>
      <div class="col-md-6 col-sm-12">
        <div id="chartThrottlePos" class="vehicleChart"></div>
      </div>
      <div class="col-md-6 col-sm-12">
        <div id="chartEngineLoad" class="vehicleChart"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ApexCharts from 'apexcharts';
import { format } from 'date-fns';
import { mapGetters } from 'vuex';

export default defineComponent({
  name: 'VehicleOverview',
  computed: {
    // Get the getter functions from the Vuex store
    ...mapGetters(['getToken'])
  },
  mounted() {
    // Get all of the various data sets on load
    this.generateChart('speed', 'Speed', ' km/h', '#chartSpeed');
    this.generateChart('rpm', 'Engine RPM', ' rpm', '#chartRPM');
    this.generateChart('coolant_temp', 'Coolant Temperature', '°C', '#chartCoolantTemp');
    this.generateChart('intake_temp', 'Intake Temperature', '°C', '#chartIntakeTemp');
    this.generateChart('throttle_pos', 'Throttle Position', '%', '#chartThrottlePos');
    this.generateChart('engine_load', 'Engine Load', '%', '#chartEngineLoad');
  },
  methods: {
    /**
     * Request data from the API and generate a chart
     *
     * name: the metric name used by the API
     * title: the title of the graph
     * unit: the unit of measurement
     * id: the id of the chart container HTML tag
     */
    generateChart(name: string, title: string, unit: string, id: string) {
      // Request the data from the API using the current user's authorization token
      this.axios.get(`http://localhost:5000/vehicles/${this.$route.params.vehicleId}/${name}`, { headers: { authorization: `Bearer ${this.getToken}` } }).then((response) => {
        // Define a list to hold the chart data
        var result = [] as Array<{ x: number; y: number }>;
        // For each entry in the HTTP response add it to the list in a format compatible with the chart
        response.data.forEach((entry: any) => {
          result.push({ x: new Date(entry.time).getTime(), y: entry.value });
        });

        // Configure the chart
        var options = {
          // Set chart size and type
          chart: {
            type: 'line',
            height: '400'
          },
          // Set the dataset
          series: [
            {
              name: title,
              data: result
            }
          ],
          xaxis: {
            // Set the default timeframe
            type: 'datetime',
            min: new Date('2021-01-18T13:40:00').getTime(),
            max: new Date('2021-01-18T13:48:00').getTime()
          },
          yaxis: {
            labels: {
              // Round values in labels
              formatter: function (value: number) {
                return Math.round((value + Number.EPSILON) * 100) / 100 + unit;
              }
            }
          },
          tooltip: {
            x: {
              // Format timestamps in the specified format
              formatter(timestamp: number) {
                return format(new Date(timestamp), 'dd MMM y pp');
              }
            }
          },
          title: {
            text: title
          },
          markers: {
            size: 1
          }
        };

        // Create and render the chart
        var chart = new ApexCharts(document.querySelector(id), options);
        chart.render();
      });
    }
  }
});
</script>

<style scoped>
.vehicleChart {
  height: 120px;
}
</style>
