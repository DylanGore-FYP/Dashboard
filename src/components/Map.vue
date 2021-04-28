<template>
  <LMap ref="map" :min-zoom="7" :zoom="mapConfig.zoom" :center="mapConfig.center" :max-bounds="mapConfig.bounds" style="height: 75vh">
    <LTileLayer v-for="layer in baseLayers" :key="layer.name" :name="layer.name" :visible="layer.visible" :url="layer.url" :attribution="layer.attribution" layer-type="base" />
    <LControlLayers position="topright"></LControlLayers>
    <LMarker v-for="loc in vehicleLocs" :key="loc.vehicle" :lat-lng="[loc.data[0].lat, loc.data[0].lon]">
      <LPopup>
        <p>{{ String(loc.vehicle).toUpperCase() }}</p>
      </LPopup>
    </LMarker>
    <LPolyline v-for="vehicle in vehicleLocs" :key="vehicle.vehicle" :lat-lngs="getLocationsList(vehicle.data)" color="blue"></LPolyline>
  </LMap>

  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <div class="btn-toolbar mt-2" role="toolbar">
          <div class="btn-group" role="group" aria-label="Vehicle Locations">
            <button v-for="vehicle in vehicleLocs" :key="vehicle.vehicle" type="button" class="btn btn-primary" @click="zoomTo(vehicle.data[0].lat, vehicle.data[0].lon, 13)">
              {{ String(vehicle.vehicle).toUpperCase() }}
            </button>
          </div>
          <div class="btn-group" role="gorup" aria-label="Map Controlls">
            <button class="btn btn-secondary" @click="zoomTo()">Reset Map</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
// @ts-ignore
import { LMap, LTileLayer, LMarker, LPopup, LControlLayers, LPolyline } from '@vue-leaflet/vue-leaflet';
import 'leaflet/dist/leaflet.css';
import { apiLocation } from '../helpers/environment';

export default defineComponent({
  name: 'Dashboard',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LControlLayers,
    LPolyline
  },
  data() {
    return {
      vehicles: [] as Array<string>,
      vehicleLocs: [] as Array<any>,
      mapConfig: {
        url: '//{s}.tile.osm.org/{z}/{x}/{y}.png',
        zoom: 7,
        center: [53.1424, -7.6921],
        bounds: [
          [56.1210604250441, -1.7138671875000002],
          [49.94415035164548, -13.666992187500002]
        ]
      },
      baseLayers: [
        {
          name: 'OpenStreetMap',
          visible: true,
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors',
          url: 'https://{s}.tile.osm.org/{z}/{x}/{y}.png'
        },
        {
          name: 'CartoDB Voyager',
          visible: false,
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
        },
        {
          name: 'CartoDB Light',
          visible: false,
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
        },
        {
          name: 'CartoDB Dark',
          visible: false,
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
        },
        {
          name: 'Esri Satellite',
          visible: false,
          attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
          url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
        }
      ]
    };
  },
  computed: {
    // Get the getter functions from the Vuex store
    ...mapGetters(['getToken'])
  },
  mounted() {
    // Get vehicles on load
    this.getVehicles();
    console.log(this.$refs.map);
  },
  methods: {
    // Query the API for the list of vehicles
    getVehicles() {
      // prettier-ignore
      this.axios.get(`${apiLocation}/vehicles/all`, { headers: { authorization: `Bearer ${this.getToken}` } }).then((response) => {
        this.vehicles = response.data as Array<string>;
      }).then(() => {
        this.vehicles.forEach(vehicle => {
          this.getLocations(vehicle)
        })
      });
    },

    // Get Current Vehicle Locations
    getLocations(vehicleId: string) {
      console.log('Getting tracking for ' + vehicleId);
      this.axios.get(`${apiLocation}/vehicles/${vehicleId}/tracking`, { headers: { authorization: `Bearer ${this.getToken}` } }).then((response) => {
        // @ts-ignore
        console.log(response);
        this.vehicleLocs.push({ vehicle: vehicleId, data: response.data });
      });
    },

    getLocationsList(list) {
      console.log(list);
      let result: any[] = [];
      // @ts-ignore
      list.forEach((entry) => {
        // @ts-ignore
        if (entry.lat != 0.0 && entry.lon != 0.0) {
          result.push([entry.lat, entry.lon]);
        }
      });
      return result;
    },

    zoomTo(lat: number = 53.1424, lon: number = -7.6921, zoom: number = 7) {
      // @ts-ignore
      this.mapConfig.center = [lat, lon];
      this.mapConfig.zoom = zoom;
    }
  }
});
</script>
