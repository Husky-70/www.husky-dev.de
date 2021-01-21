<template>
    <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; min-height: 90vh">
        <a :href="'psal:play?id=CUSA00419&arg=-FromLiveArea -LiveAreaContentType=UGC_TYPE_GTA5_MISSION_PLAYLIST -LiveAreaLoadContent='+ $route.query.playlistId + ' 13'"
           v-if="$route.query.playlistId">
            <b-button>
                Join Playlist
            </b-button>
        </a>
        <span v-else>You did not provide a playlist ID</span>
    </div>
</template>

<script>
    export default {
        name: "join-playlist"
    };
</script>

<style scoped>

</style>
