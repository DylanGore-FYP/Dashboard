<template>
  <Header />
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions } from 'vuex';
import Header from './components/layout/Header.vue';

export default defineComponent({
  name: 'App',
  components: { Header },
  mounted() {
    this.authAction();
  },
  methods: {
    ...mapActions(['authAction'])
  }
});
</script>

<style lang="scss">
@import 'assets/scss/custom.scss';
</style>
