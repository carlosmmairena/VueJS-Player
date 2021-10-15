<template>
    <v-container class="player">
        <v-container class="player__sizer">
            <video controls>
                <source type="video/mp4" src="@/assets/videos/my_video.mp4"/>
            </video>
        </v-container>
    </v-container>
</template>

<script>
import "./Player.scss";

export default {
    name: "Player",
}

</script>
