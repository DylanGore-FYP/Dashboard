<template>
  <LMap ref="map" :min-zoom="7" :zoom="mapConfig.zoom" :center="mapConfig.center" :max-bounds="mapConfig.bounds" style="height: 75vh">
    <LTileLayer v-for="layer in baseLayers" :key="layer.name" :name="layer.name" :visible="layer.visible" :url="layer.url" :attribution="layer.attribution" layer-type="base" />
    <LControlLayers position="topright"></LControlLayers>
    <LMarker :lat-lng="[53.1424, -7.6291]">
      <LPopup>
        <p>Hello, world!</p>
      </LPopup>
    </LMarker>
  </LMap>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';

// @ts-ignore
import { LMap, LTileLayer, LMarker, LPopup, LControlLayers } from '@vue-leaflet/vue-leaflet';
import 'leaflet/dist/leaflet.css';

export default defineComponent({
  name: 'Dashboard',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LControlLayers
  },
  data() {
    return {
      vehicles: [] as Array<string>,
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
    // this.getVehicles();
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
