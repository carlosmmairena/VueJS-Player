<template>
    <div class="player">
        <div class="player__sizer">
            <video 
                @play="onVideoPlay"
                @pause="onVideoPause"
                @volumechange="onVideoVolumeChange"
                @click="togglePlay"
                @loadedmetadata="onVideoLoadedMetaData"
                @timeupdate="onTimeUpdated"
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
                        {{ is_playing ? "mdi-pause" : "mdi-play" }}
                    </v-icon>
                </v-btn>

                <v-btn color="white" 
                    icon 
                    @click="toggleSound"
                >
                    <v-icon>
                        {{ is_muted ? "mdi-volume-off" : "mdi-volume-high" }}
                    </v-icon>
                </v-btn>

                <Slider 
                    class="player__sound-slider"
                    :style="{ width: '96px' }"
                    :current_value="is_muted ? 0 : volume"
                    @input="onVolumeSliderChange"
                />

                <div class="player__time ml-4">
                    {{ currentTimeFormatted }} / {{ durationFormatted }}
                </div>

                <v-spacer />

                <v-btn color="white" icon @click="toggleFullScreen">
                    <v-icon>
                        {{ is_fullscreen ? 'mdi-fullscreen-exit' : 'mdi-fullscreen' }}
                    </v-icon>
                </v-btn>
            </v-toolbar>
        </div>
    </div>
</template>

<script>
import "./Player.scss";
import Slider from "@/components/Slider";
const TimeFormat = require('hh-mm-ss');
const screenfull = require('screenfull');

export default {
    name: "Player",
    
    components: {
        Slider
    },

    data: () => ({
        value: 1,
        is_playing: false,
        is_muted: false,
        volume: 1,
        duration: 0,
        current_time: 0,
        is_fullscreen: false,
    }),

    computed: {
        currentTimeFormatted() {
            return TimeFormat.fromS(Math.round(this.current_time), 'hh:mm:ss');
        },

        durationFormatted() {
            return TimeFormat.fromS(Math.round(this.duration), 'hh:mm:ss');
        }
    },

    mounted() {
        document.addEventListener('keyup', this.documentKeyUp);
        screenfull.onchange(this.onFullscreeChange);
    },

    methods: {
        onVideoPlay() {
            this.is_playing = true;
        },

        onVideoPause() {
            this.is_playing = false;
        },

        onVideoVolumeChange() {
            const { video } = this.$refs;
            this.is_muted = video.muted;
            this.volume  = video.volume
        },

        onVolumeSliderChange(value) {
            const { video } = this.$refs;

            if(value <= 0) {
                video.muted = true;
            }

            if(!video.muted || value > 0) {
                video.muted = false;
            }

            video.volume = value;
        },

        documentKeyUp(ev) {
            if (ev.keyCode == 32) {
                this.togglePlay();
            }
        },

        onVideoLoadedMetaData() {
            const { video } = this.$refs;

            this.duration     = video.duration;
            this.current_time = video.currentTime;
        },

        onTimeUpdated() {
            const { video } = this.$refs;

            this.current_time = video.currentTime;
        },

        onFullscreeChange() {
            this.is_fullscreen = this.$el == screenfull.element;
        },

        togglePlay() {
            const { video } = this.$refs;

            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
        },

        toggleSound() {
            const { video } = this.$refs;
            video.muted = !video.muted;
        },

        toggleFullScreen() {
            if (!screenfull.isEnabled) {
                return;
            }

            const { $el } = this;
            
            if (screenfull.element == $el) {
                screenfull.exit();
            } else {
                screenfull.request($el);
            }
        }

    },

}

</script>
