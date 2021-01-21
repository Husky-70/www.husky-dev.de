<template>
    <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; min-height: 90vh">
        <a :href="'psal:play?id=CUSA00419&arg=-FromLiveArea -LiveAreaContentType=UGC_TYPE_GTA5_MISSION -LiveAreaLoadContent='+ $route.query.jobId + ' 13'"
           v-if="$route.query.jobId">
            <b-button>
                Join Job
            </b-button>
        </a>
        <span v-else>You did not provide a job ID</span>
    </div>
</template>

<script>
    export default {
        name: "join-job"
    };
</script>

<style scoped>

</style>
