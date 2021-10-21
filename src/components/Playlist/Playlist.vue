<template>
    <div>
        <v-card>
            <v-list shaped>
                <v-subheader>Playlist</v-subheader>

            <v-list-item-group
              v-model="selected_video"
              color="green"
            >
                <v-list-item
                  v-for="(video, id) in playlist"
                  :key="id"
                  three-line
                  @click="onClickChangeSrc(video)"
                >
                    <v-list-item-content>
                        <v-icon v-text="'mdi-video'"></v-icon>
                        <v-list-item-title v-html="video.title"></v-list-item-title>
                        <v-list-item-subtitle v-html="video.description"></v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-action>
                        <v-list-item-action-text v-text="video.created_at"></v-list-item-action-text>
                    </v-list-item-action>
                </v-list-item>
            </v-list-item-group>
        </v-list>
    </v-card>
    </div>
</template>

<script>
export default {

    name: "Playlist",

    inject: ["setSrc"],

    props: {
        playlist: {
            type: Array,
            require: true
        }
    },

    data: () => ({

        selected_video: 1

    }),

    methods: {
        readPlaylist() {
            console.log("Start to read the playlist...");
        },

        onClickChangeSrc(video) {
            
            console.log(video);
            this.setSrc(video.source);
        },

    },

}
</script>
