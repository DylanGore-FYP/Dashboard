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
  data() {
    return {
      data: []
    };
  },
  computed: {
    // Get the getter functions from the Vuex store
    ...mapGetters(['getToken'])
  },
  mounted() {
    this.getSpeedData();
    this.getRPMData();
    this.getCoolantTempData();
    this.getIntakeTempData();
    this.getThrottlePosData();
    this.getEngineLoadData();
  },
  methods: {
    getSpeedData() {
      console.log(this.$route.params.vehicleId);
      this.axios.get(`http://localhost:5000/vehicles/${this.$route.params.vehicleId}/speed`, { headers: { authorization: `Bearer ${this.getToken}` } }).then((response) => {
        this.data = response.data;

        var result: any = [];
        this.data.forEach((entry) => {
          result.push({ x: new Date(entry.time).getTime(), y: entry.value });
        });

        console.log(result);

        var options = {
          chart: {
            type: 'line',
            height: '400'
          },
          series: [
            {
              name: 'Speed',
              data: result
            }
          ],
          xaxis: {
            type: 'datetime',
            min: new Date('2021-01-18T13:40:00').getTime(),
            max: new Date('2021-01-18T13:48:00').getTime()
          },
          yaxis: {
            labels: {
              formatter: function (value) {
                return Math.round((value + Number.EPSILON) * 100) / 100 + ' km/h';
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

        var chart = new ApexCharts(document.querySelector('#chartSpeed'), options);

        chart.render();
      });
    },
    getRPMData() {
      console.log(this.$route.params.vehicleId);
      this.axios.get(`http://localhost:5000/vehicles/${this.$route.params.vehicleId}/rpm`, { headers: { authorization: `Bearer ${this.getToken}` } }).then((response) => {
        var result: any = [];
        response.data.forEach((entry) => {
          result.push({ x: new Date(entry.time).getTime(), y: entry.value });
        });

        console.log(result);

        var options = {
          chart: {
            type: 'line',
            height: '400'
          },
          series: [
            {
              name: 'RPM',
              data: result
            }
          ],
          xaxis: {
            type: 'datetime',
            min: new Date('2021-01-18T13:40:00').getTime(),
            max: new Date('2021-01-18T13:48:00').getTime()
          },
          yaxis: {
            labels: {
              formatter: function (value) {
                return Math.round((value + Number.EPSILON) * 100) / 100 + ' rpm';
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
            text: 'Engine RPM'
          },
          markers: {
            size: 1
          }
        };

        var chart = new ApexCharts(document.querySelector('#chartRPM'), options);

        chart.render();
      });
    },
    getCoolantTempData() {
      console.log(this.$route.params.vehicleId);
      this.axios.get(`http://localhost:5000/vehicles/${this.$route.params.vehicleId}/coolant_temp`, { headers: { authorization: `Bearer ${this.getToken}` } }).then((response) => {
        var result = [];
        response.data.forEach((entry) => {
          result.push({ x: new Date(entry.time).getTime(), y: entry.value });
        });

        console.log(result);

        var options = {
          chart: {
            type: 'line',
            height: '400'
          },
          series: [
            {
              name: 'Coolant Temperature',
              data: result
            }
          ],
          xaxis: {
            type: 'datetime',
            min: new Date('2021-01-18T13:40:00').getTime(),
            max: new Date('2021-01-18T13:48:00').getTime()
          },
          yaxis: {
            labels: {
              formatter: function (value) {
                return Math.round((value + Number.EPSILON) * 100) / 100 + ' °C';
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
            text: 'Coolant Temperature'
          },
          markers: {
            size: 1
          }
        };

        var chart = new ApexCharts(document.querySelector('#chartCoolantTemp'), options);

        chart.render();
      });
    },
    getIntakeTempData() {
      console.log(this.$route.params.vehicleId);
      this.axios.get(`http://localhost:5000/vehicles/${this.$route.params.vehicleId}/intake_temp`, { headers: { authorization: `Bearer ${this.getToken}` } }).then((response) => {
        var result = [];
        response.data.forEach((entry) => {
          result.push({ x: new Date(entry.time).getTime(), y: entry.value });
        });

        console.log(result);

        var options = {
          chart: {
            type: 'line',
            height: '400'
          },
          series: [
            {
              name: 'Intake Temperature',
              data: result
            }
          ],
          xaxis: {
            type: 'datetime',
            min: new Date('2021-01-18T13:40:00').getTime(),
            max: new Date('2021-01-18T13:48:00').getTime()
          },
          yaxis: {
            labels: {
              formatter: function (value) {
                return Math.round((value + Number.EPSILON) * 100) / 100 + ' °C';
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
            text: 'Intake Temperature'
          },
          markers: {
            size: 1
          }
        };

        var chart = new ApexCharts(document.querySelector('#chartIntakeTemp'), options);

        chart.render();
      });
    },
    getThrottlePosData() {
      console.log(this.$route.params.vehicleId);
      this.axios.get(`http://localhost:5000/vehicles/${this.$route.params.vehicleId}/throttle_pos`, { headers: { authorization: `Bearer ${this.getToken}` } }).then((response) => {
        var result = [];
        response.data.forEach((entry) => {
          result.push({ x: new Date(entry.time).getTime(), y: entry.value });
        });

        console.log(result);

        var options = {
          chart: {
            type: 'line',
            height: '400'
          },
          series: [
            {
              name: 'Throttle Position',
              data: result
            }
          ],
          xaxis: {
            type: 'datetime',
            min: new Date('2021-01-18T13:40:00').getTime(),
            max: new Date('2021-01-18T13:48:00').getTime()
          },
          yaxis: {
            labels: {
              formatter: function (value) {
                return Math.round((value + Number.EPSILON) * 100) / 100 + '%';
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
            text: 'Throttle Position'
          },
          markers: {
            size: 1
          }
        };

        var chart = new ApexCharts(document.querySelector('#chartThrottlePos'), options);

        chart.render();
      });
    },
    getEngineLoadData() {
      console.log(this.$route.params.vehicleId);
      this.axios.get(`http://localhost:5000/vehicles/${this.$route.params.vehicleId}/engine_load`, { headers: { authorization: `Bearer ${this.getToken}` } }).then((response) => {
        var result = [];
        response.data.forEach((entry) => {
          result.push({ x: new Date(entry.time).getTime(), y: entry.value });
        });

        console.log(result);

        var options = {
          chart: {
            type: 'line',
            height: '400'
          },
          series: [
            {
              name: 'Engine Load',
              data: result
            }
          ],
          xaxis: {
            type: 'datetime',
            min: new Date('2021-01-18T13:40:00').getTime(),
            max: new Date('2021-01-18T13:48:00').getTime()
          },
          yaxis: {
            labels: {
              formatter: function (value) {
                return Math.round((value + Number.EPSILON) * 100) / 100 + '%';
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
            text: 'Engine Load'
          },
          markers: {
            size: 1
          }
        };

        var chart = new ApexCharts(document.querySelector('#chartEngineLoad'), options);

        chart.render();
      });
    },
    parseDate(date: string) {
      return new Date(date);
    }
  }
});
</script>

<style scoped>
.vehicleChart {
  height: 120px;
}
</style>
