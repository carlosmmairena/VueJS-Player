<template>
  <v-app>
    <v-container>
      
      <v-row>
        <v-col class="col-12">
          <h2 class="text-center">Encabezado simple para personalizar</h2>
        </v-col>
      </v-row>

      <v-row>

        <v-navigation-drawer app disable-resize-watcher width="360" right>
          <Playlist :playlist="videosJSON"></Playlist>
        </v-navigation-drawer>

        <v-col class="col-12">
          <v-content
              class="d-flex align-center mx-auto fill-height" 
              :style="{ width: '100%' }"
          >
            <Player :source="{ src, type: 'video/mp4' }" />
          </v-content>
        </v-col>
      </v-row>

      <v-footer app>
        <div class="text-center">
          <a href="https://github.com/carlosmmairena/VueJS-Player" target="_blank" >
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="mx-2"
                  fab
                  dark
                  color="teal"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon dark>
                    mdi-github
                  </v-icon>
                </v-btn>
              </template>
              <span>Source code</span>
            </v-tooltip>
          </a>

        </div>
      </v-footer>

    </v-container>
  </v-app>
</template>

<script>

import Player from "@/components/Player";
import { getJsonVideos } from "@/utils/helpers.js";
import Playlist from "@/components/Playlist";

export default {
  name: "App",

  components: {
    Player,
    Playlist
  },

  data: () => ({
    src: require("@/assets/videos/my_video.mp4"),
    videosJSON: [],
  }),

  mounted() {
    this.getVideos();
  },

  provide: function () {
    return {
      setSrc: this.changeSrc
    }
  },

  methods: {

    getVideos() {
      this.videosJSON = getJsonVideos();
    },

    changeSrc(new_src) {
      this.src = require(`@/assets/${new_src}`);
    }

  }

};
</script>
