<template>
    <div class="player">
        <div class="player__sizer">
            <video 
                @play="onVideoPlay"
                @pause="onVideoPause"
                @click="togglePlay"
                ref="video"
            >
                <source type="video/mp4" src="@/assets/videos/my_video.mp4"/>
            </video>
        </div>

        <div class="player__gradient" />

        <div class="player__controls">
            <v-toolbar dense color="transparent" flat class="player__toolbar">
                <v-btn color="white" icon @click="togglePlay">
                    <v-icon>
                        {{ isPlaying ? "mdi-pause" : "mdi-play" }}
                    </v-icon>
                </v-btn>

                <v-btn color="white" icon>
                    <v-icon>mdi-volume-high</v-icon>
                </v-btn>

                <Slider 
                    class="player__sound-slider"
                    :style="{ width: '96px' }"
                    :current_value="value"
                    @input="val => (value = val)"
                />

                <div class="player__time ml-4">
                    00:00:00
                </div>

                <v-spacer />

                <v-btn color="white" icon>
                    <v-icon>mdi-fullscreen</v-icon>
                </v-btn>
            </v-toolbar>
        </div>
    </div>
</template>

<script>
import "./Player.scss";
import Slider from "@/components/Slider";

export default {
    name: "Player",
    
    components: {
        Slider
    },

    data: () => ({
        value: 1,
        isPlaying: false,
    }),

    mounted() {
        document.addEventListener('keyup', this.documentKeyUp);
    },

    methods: {
        onVideoPlay() {
            this.isPlaying = true;
        },

        onVideoPause() {
            this.isPlaying = false;
        },

        documentKeyUp(ev) {
            if (ev.keyCode == 32) {
                this.togglePlay();
            }
        },

        togglePlay() {
            const { video } = this.$refs;

            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
        },

    },

}

</script>
