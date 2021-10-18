<template>
  <v-app>

    <v-main>
      <v-container 
        class="d-flex align-center mx-auto fill-height" 
        :style="{ width: '60%' }"
      >
        <Player :source="{ src, type: 'video/mp4' }" />

        <v-btn color="primary" @click=" src = require('@/assets/videos/ansible_tutorial.mp4') ">
          Change Video >
        </v-btn>
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
    src: require("@/assets/videos/my_video.mp4"),
  }),
};
</script>
