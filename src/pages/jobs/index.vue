<template>
    <b-row>
        <b-col cols="12">
            <vu-breadcrumb>
                <vu-breadcrumb-item :to="'/'">Home</vu-breadcrumb-item>
                <vu-breadcrumb-item active>Selected Modded Jobs</vu-breadcrumb-item>
            </vu-breadcrumb>
        </b-col>
        <b-col cols="12"
               md="4"
               class="d-flex"
               v-for="job in jobs"
               :key="job.id">
            <div class="job-card-container d-flex"
                 style="padding: 1rem">
                <a class="d-flex">
                    <a :href="'https://socialclub.rockstargames.com/job/gtav/' + job.id" target="_blank"
                                 class="job-card">
                        <div class="job-image">
                            <img :src="job.image"
                                 width="100%" />
                        </div>
                        <!--<audio controls>
                            <source src="../assets/zaber.mp3" type="audio/mpeg">
                            Your browser does not support the audio tag.
                        </audio>-->
                        <div class="job-card-name">
                            {{job.name | strConvert}}
                        </div>
                        <div class="job-card-desc">
                            {{job.desc | truncrate(150, '...')}}
                        </div>
                        <div>
                            <ps4 class="badge" />
                            <!--<xbox360 class="badge"></xbox360>-->
                        </div>
                        <div class="job-join">
                            <button class="btn-btn locked"
                                    @click.prevent="">
                                <span>Join Job</span>
                            </button>
                            <a class="btn-btn"
                               :href="'https://socialclub.rockstargames.com/job/gtav/' + job.id"
                               target="_blank">
                                <span>Bookmark Job</span>
                            </a>
                        </div>
                    </a>
                </a>
            </div>
        </b-col>
    </b-row>
</template>

<script>
    import axios from "axios";
    import Ps4 from "../../components/badges/ps4";
    import Xbox360 from "../../components/badges/xbox360";

    export default {
        name: "jobs",
        components: {Xbox360, Ps4},
        data () {
            return {
                jobs: []
            };
        },
        mounted () {
            axios.get('/getJobs').then((res) => {
                this.jobs = res.data;
            });
        },
        filters: {
            truncrate (str, symbolsCount, endWith) {
                if (str.length > symbolsCount) return str.substring(0, symbolsCount) + endWith;
                else return str;
            },
            strConvert (str) {
                if (str === undefined) return '';
                str = str.replace(/&#39;/g, "'");
                str = str.replace(/&#228;/g, "ä");
                str = str.replace(/&#252;/g, "ü");
                str = str.replace(/&#246;/g, "ö");
                str = str.replace(/&#220;/g, "Ü");
                str = str.replace(/&amp;/g, "&");
                return str;
            },
        }
    };
</script>

<style scoped>

</style>
