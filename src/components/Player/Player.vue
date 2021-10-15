<template>
    <div class="player">
        <div class="player__sizer">
            <video controls>
                <source type="video/mp4" src="@/assets/videos/my_video.mp4"/>
            </video>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Player',
}
</script>
