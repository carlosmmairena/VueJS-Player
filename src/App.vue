<template>
  <v-app>

    <v-main>
      <div class="d-flex align-center mx-auto" :style="{ width: '960px' }">
        <Player />
      </div>
    </v-main>

  </v-app>
</template>

<script>

import Player from './components/Player';

export default {
  name: "App",

  components: {
    Player,
  },

  data: () => ({
    //
  }),
};
</script>
