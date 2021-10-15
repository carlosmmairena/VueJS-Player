<template>
  <v-app>

    <v-main>
      <v-container class="d-flex align-center mx-auto fill-height" :style="{ width: '70%' }">
        <!-- <Player /> -->
        <slider />
      </v-container>
    </v-main>

  </v-app>
</template>

<script>

import Slider from './components/Slider/Slider.vue';
//import Player from './components/Player';

export default {
  name: "App",

  components: {
    //Player,
    Slider,
  },

  data: () => ({
    //
  }),
};
</script>
