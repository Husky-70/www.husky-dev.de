<template>
    <b-row>
        <b-col cols="12">
            <vu-breadcrumb>
                <vu-breadcrumb-item :to="'/'">Home</vu-breadcrumb-item>
                <vu-breadcrumb-item active>Playlists</vu-breadcrumb-item>
            </vu-breadcrumb>
        </b-col>
        <b-col cols="12">
            <b-row style="justify-content: flex-end">
                <b-col cols="3">
                    <vu-input label="Search for:" v-model="searchString"
                              @input="[searchString = $event,updateStringRoute()]" />
                </b-col>
                <b-col cols="3">
                    <vu-select :items="dates" v-model="date"
                               @input="[date = $event,$router.push({ query: Object.assign({}, $route.query, { d: date }) })]"
                               label="Sort by:" />
                </b-col>
                <!--<b-col cols="3">
                    <vu-select :items="dates" label="Sort by Date:" />
                </b-col>-->
            </b-row>
        </b-col>
        <b-col cols="12" md="4" class="d-flex"
               v-for="(job, index) in playlists.l" :key="job.id">
            <div class="job-card-container xyxxx d-flex w-100"
                 :style="{animationDelay: (index * 130) + 'ms', padding: '1rem'}">
                <a class="d-flex w-100">
                    <div class="job-card w-100">
                        <div class="job-image" v-if="job.missions.Missions.length > 0">
                            <img :src="job.missions.Missions[0].Content.Metadata.thumbnail" width="100%" />
                        </div>
                        <!--<audio controls>
                            <source src="../assets/zaber.mp3" type="audio/mpeg">
                            Your browser does not support the audio tag.
                        </audio>-->
                        <div class="job-card-name">
                            {{job.Name}}
                        </div>
                        <div class="job-card-desc">
                            <!--{{job.desc | truncrate(150, '...')}}-->
                        </div>
                        <div class="playlist-count">
                            Creator: {{job.nickname ? job.nickname : 'Rockstar'}}
                        </div>
                        <div class="playlist-count">
                            Jobs in Playlist: {{job.Items.length}}
                        </div>
                        <div class="playlist-player-count">
                            Played: {{job.stats.pu}}
                        </div>
                        <div>
                            <ps4 class="badge" v-if="job.plat == 'Ps4' && job.cat !== 'rstar'" />
                            <xbox360 class="badge" v-if="job.plat == 'XBox' && job.cat !== 'rstar'"></xbox360>
                            <rcreated class="badge" v-if="job.cat === 'rstar'"
                                      style="width: 100px; height: 35px;"></rcreated>
                        </div>
                        <div class="job-join">
                            <button class="btn-btn locked" @click.prevent="">
                                <span>Join Playlist</span>
                            </button>
                            <a class="btn-btn"
                               :href="'https://socialclub.rockstargames.com/games/gtav/playlists/playlist/' + job.Id"
                               target="_blank">
                                <span>Bookmark Playlist</span>
                            </a>
                        </div>
                    </div>
                </a>
            </div>

        </b-col>
        <b-col cols="12">
            <div class="button-row" style="justify-content:center; margin: 1rem 0;">
                <button v-if="page > 1" class="btn-btn" style="margin: 1rem;"
                        @click.prevent="[page--,$router.push({ query: Object.assign({}, $route.query, { p: page }) })]">
                    <span>Previous Page</span>
                </button>
                <button v-if="(page * 20) < this.playlists.totalPlaylistsFound" class="btn-btn" style="margin: 1rem;"
                        @click.prevent="[page++,$router.push({ query: Object.assign({}, $route.query, { p: page }) })]">
                    <span>Next Page</span>
                </button>
            </div>
        </b-col>
    </b-row>
</template>

<script>
    import axios from "axios";
    import Ps4 from "../components/badges/ps4";
    import Xbox360 from "../components/badges/xbox360";
    import Rcreated from "../components/badges/rcreated";
    import VuSelect from "../components/vu-select";
    import VuInput from "../components/vu-input";
    import Spinner from "../components/spinner";

    var _ = require('lodash');

    export default {
        name: "playlists",
        components: {Spinner, VuInput, VuSelect, Rcreated, Xbox360, Ps4},
        data () {
            return {
                playlists: [],
                page: 1,
                dates: [
                    {text: "Any Date", value: 0},
                    {text: "Today", value: 1},
                    {text: "Last 7 days", value: 2},
                    {text: "Last month", value: 3},
                ],
                searchString: this.$route.query.s ?? "",
                date: this.$route.query.d ?? 0,
                fetching: false
            };
        },
        watch: {
            '$route' () {
                this.getPlaylists();
            }
        },
        mounted () {
            this.page = this.$route.query.p ?? 1;
            this.date = this.$route.query.d ?? 0;
            this.searchString = this.$route.query.s ?? "";
            this.getPlaylists();
        },


        methods: {
            getPlaylists () {
                this.playlists = [];
                let base = '/getPlaylists?lang=' + this.$i18n.locale;
                if (this.$route.query.p) base += '&p=' + this.$route.query.p;
                if (this.$route.query.d) base += '&d=' + this.$route.query.d;
                if (this.$route.query.s) base += '&s=' + this.$route.query.s;

                axios.get(base).then((res) => {
                    this.playlists = res.data;
                });
            },
            updateStringRoute: _.debounce(function () {
                this.$router.push({query: Object.assign({}, this.$route.query, {s: this.searchString})});
            }, 1500),
        },
        filters: {
            truncrate (str, symbolsCount, endWith) {
                if (str.length > symbolsCount) return str.substring(0, symbolsCount) + endWith;
                else return str;
            }
        }
    };
</script>

<style scoped>
    .playlist-player-count, .playlist-count {
        font-size: .8rem;
        padding-left: .5rem;
        padding-right: .5rem;
        padding-bottom: .5rem;
    }

    .xyxxx {
        transform: scale(0);
        opacity: 0;
        animation: fin .5s forwards;
    }

    .w-100 {
        width: 100%;
    }

    .button-row {
        display: flex;
    }

    @keyframes fin {
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
</style>
