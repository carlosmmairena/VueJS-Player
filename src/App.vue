<template>
  <v-app>

    <v-main>
      <v-container 
        class="d-flex align-center mx-auto fill-height" 
        :style="{ width: '60%' }"
      >
        <Player />
        <!-- <slider :current_value="value" @input="val => (value = val)" /> -->
      </v-container>
    </v-main>

  </v-app>
</template>

<script>

import Player from '@/components/Player';

export default {
  name: "App",

  components: {
    Player,
  },

  data: () => ({
    value: 0.5,
  }),
};
</script>
