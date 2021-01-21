<template>
    <b-row style="position: relative; min-height: calc(100vh - 4rem)">
        <spinner v-if="loading" :label="'Detailed job-fetching has been removed!'" />

        <b-col cols="12">
            <div class="job-container" v-if="!loading">
                <b-row>
                    <b-col cols="12">
                        <vu-breadcrumb style="margin-bottom:1rem">
                            <vu-breadcrumb-item :to="'/'">Home</vu-breadcrumb-item>
                            <vu-breadcrumb-item :to="{name: 'rockstarMissions'}">R* Missions</vu-breadcrumb-item>
                            <vu-breadcrumb-item active>{{job.name | strConvert}}</vu-breadcrumb-item>
                        </vu-breadcrumb>
                    </b-col>
                    <b-col cols="12" md="6">
                        <img :src="job.thumbnail" width="100%" style="padding: 1rem" />
                    </b-col>
                    <b-col cols="12" md="6">
                        <div class="job-content">
                            <div class="job-title">
                                <span>{{job.name | strConvert}}</span>
                            </div>
                            <div class="job-creator">
                                {{$t('pages.jobs.job.createdBy')}}
                                <span>{{job.cat === "rstar" ? 'Rockstar' : job.nickname}}</span>
                            </div>
                            <div class="job-description">
                                <span>{{job.desc | strConvert}}</span>
                            </div>
                        </div>
                    </b-col>
                    <b-col cols="12" v-if="job.data">
                        <div class="job-detailed-container">
                            <b-row>
                                <b-col md="4">
                                    <div class="job-stats">
                                        <span>{{$t('pages.jobs.job.ratings')}}</span>
                                        <div class="job-stats-container">
                                            <div class="job-stat">
                                                {{$t('pages.jobs.job.posRatings')}}: {{formatNumber(ratings.rt_pos)}}
                                                ({{(ratings.rt_pos_pct * 100).toFixed(2)}}%)
                                            </div>
                                            <div class="job-stat">
                                                {{$t('pages.jobs.job.negRatings')}}: {{formatNumber(ratings.rt_neg)}}
                                                ({{(ratings.rt_neg_pct * 100).toFixed(2)}}%)
                                            </div>
                                            <div class="job-stat">
                                                {{$t('pages.jobs.job.bookmarked')}}: {{ formatNumber(ratings.bkmk_unq)}}
                                            </div>
                                            <div class="job-stat">
                                                {{$t('pages.jobs.job.average')}}: {{ (ratings.rt_avg *
                                                100).toFixed(2)}}%
                                            </div>
                                        </div>
                                    </div>
                                </b-col>
                                <b-col md="4">
                                    <div class="job-stats">
                                        <span>{{$t('pages.jobs.job.mode')}}</span>
                                        <div class="job-stats-container">
                                            <div class="job-stat">
                                                {{$t('pages.jobs.job.type')}}: {{job.data.mission.gen.type}}
                                            </div>
                                            <div class="job-stat">
                                                {{$t('pages.jobs.job.jobtype')}}: {{job.data.mission.gen.mode}}
                                            </div>
                                            <div class="job-stat">
                                                {{$t('pages.jobs.job.minPlayers')}}: {{ job.data.mission.gen.min}}
                                            </div>
                                            <div class="job-stat">
                                                {{$t('pages.jobs.job.maxPlayers')}}: {{ job.data.mission.gen.num}}
                                            </div>
                                            <div class="job-stat">
                                                {{$t('pages.jobs.job.openAtRank')}}: {{ job.data.mission.gen.rank}}
                                            </div>
                                        </div>
                                    </div>
                                </b-col>
                                <b-col md="4">
                                    <div class="job-stats">
                                        <span>{{$t('pages.jobs.job.statistics')}}</span>
                                        <div class="job-stats-container">
                                            <!--<div class="job-stat">
                                                Date created: {{job.cdate | formatDate('DD-MM-YYYY HH:MM')}}
                                            </div>-->
                                            <div class="job-stat">
                                                Date last updated: {{job.pdate | formatDate('DD-MM-YYYY HH:MM')}}
                                            </div>
                                            <div class="job-stat">
                                                Version: {{ job.ver}}
                                            </div>
                                            <div class="job-stat">
                                                Players total: {{formatNumber(stats.pt)}}
                                            </div>
                                            <div class="job-stat">
                                                Players unique: {{formatNumber(stats.pu)}}
                                            </div>
                                            <div class="job-stat">
                                                Quits total: {{formatNumber(stats.qt)}}
                                            </div>
                                            <div class="job-stat">
                                                Quits unique: {{formatNumber(stats.qu)}}
                                            </div>
                                            <div class="job-stat">
                                                Officially created on: {{ job.plat.toUpperCase()}}
                                            </div>
                                        </div>
                                    </div>
                                </b-col>
                            </b-row>
                        </div>
                    </b-col>
                </b-row>

                <b-row>
                    <b-col cols="12">
                        <span style="font-size:2rem; padding-left:1rem; font-weight: lighter">
                            More Jobs:
                        </span>
                    </b-col>
                    <b-col cols="12" md="4" class="d-flex" v-for="i in 3" :key="i.id">
                        <div class="job-card-container d-flex" style="padding: 1rem">
                            <a class="d-flex">
                                <router-link :to="{ name: 'job', params: { id: job.id }}" class="job-card">
                                    <div class="job-image">
                                        <img :src="job.thumbnail" width="100%" />
                                    </div>
                                    <!--<audio controls>
                                        <source src="../assets/zaber.mp3" type="audio/mpeg">
                                        Your browser does not support the audio tag.
                                    </audio>-->
                                    <div class="job-card-name">
                                        {{job.name | strConvert}}
                                    </div>
                                    <div class="job-card-desc">
                                        {{job.desc | truncrate(150, '...') | strConvert}}
                                    </div>
                                    <div>
                                        <ps4 class="badge" />
                                        <xbox360 class="badge"></xbox360>
                                    </div>
                                    <div class="job-join">
                                        <button class="btn-btn locked" @click.prevent="">
                                            <span>Join Job</span>
                                        </button>
                                        <a class="btn-btn"
                                           :href="'https://socialclub.rockstargames.com/job/gtav/' + job.id"
                                           target="_blank">
                                            <span>Bookmark Job</span>
                                        </a>
                                    </div>
                                </router-link>
                            </a>
                        </div>
                    </b-col>
                </b-row>
            </div>
        </b-col>
    </b-row>
</template>

<script>
    import axios from "axios";
    import Ps4 from "@/js/components/badges/ps4";
    import Xbox360 from "@/js/components/badges/xbox360";
    import moment from 'moment';
    import Spinner from "../../components/spinner";
    import _ from 'lodash'

    export default {
        name: "job",
        components: {Spinner, Xbox360, Ps4},
        data () {
            return {
                loading: true,
                loadingLabel: this.$t('global.fetchJob'),
                job: {},
                userdata: {},
                stats: {},
                ratings: {}
            };
        },
        watch: {
            '$i18n.locale' () {
                this.loadingLabel = this.$t('global.updatingLang');
                this.loading = true;
                axios.get('/fetch?method=getExtendedMeta&jobId=' + this.$route.params.rid + '&l=' + this.$i18n.locale).then(res => {
                    this.loading = false;
                    this.job = res.data.Content.Metadata;
                    this.stats = res.data.Content.stats;
                    this.ratings = res.data.Content.ratings;
                    this.loadingLabel = this.$t('global.fetchJob');
                });
            }
        },
        created () {
            window.scrollTo(0, 0);
            axios.get('/fetch?method=getExtendedMeta&jobId=' + this.$route.params.rid + '&l=' + this.$i18n.locale).then(res => {
                this.loading = false;
                this.job = res.data.Content.Metadata;
                this.stats = res.data.Content.stats;
                this.ratings = res.data.Content.ratings;
            });
        },
        methods: {
            formatNumber (num) {
                if (num === undefined) return '';
                let locale;
                switch (this.$i18n.locale) {
                    case 'en':
                        locale = 'en-EN';
                        break;
                    case 'de':
                        locale = 'de-DE';
                        break;
                    default:
                        locale = 'en-EN';
                }
                return num.toLocaleString(locale);
            },
        },
        filters: {
            strConvert (str) {
                var elt = document.createElement("span");
                elt.innerHTML = str;
                return elt.innerText;
            },
            truncrate (str, symbolsCount, endWith) {
                if (str === undefined) return '';
                if (str.length > symbolsCount) return str.substring(0, symbolsCount) + endWith;
                else return str;
            },
            formatDate (date, format) {
                return moment(date).format(format);
            }
        }
    };
</script>

<style lang="scss">

    .container {
        padding-bottom: 0 !important;
    }

    .job-detailed-container {
        padding: 1rem;

        .job-stats {
            font-size: 1.5rem;
            font-weight: lighter;

            .job-stats-container {
                margin-top: .5rem;
                padding-left: 1rem;
                font-size: 1rem;
            }

            span {
                padding-bottom: .1rem;
                margin-bottom: .5rem;
                position: relative;

                &::after {
                    content: '';
                    position: absolute;
                    left: 0;
                    right: 0;
                    bottom: -5px;
                    height: 3px;
                    width: 100%;
                    transition: max-width .5s;
                    background: linear-gradient(135deg, rgba(255, 126, 0, 1) 0%, rgba(255, 0, 16, 1) 100%);
                }
            }
        }
    }

    .job-container {
        background-color: #191919;

        .job-content {
            position: sticky;
            top: 4rem;
            padding: .5rem 1rem .8rem 1rem;

            .job-title, .job-stats {
                font-size: 2rem;
                font-weight: lighter;

                span {
                    position: relative;

                    &::after {
                        content: '';
                        position: absolute;
                        left: 0;
                        right: 0;
                        bottom: -5px;
                        height: 3px;
                        width: 100%;
                        max-width: 0;
                        transition: max-width .5s;
                        background: linear-gradient(135deg, rgba(255, 126, 0, 1) 0%, rgba(255, 0, 16, 1) 100%);
                    }
                }
            }

            .job-stats {
                font-size: 1.5rem;
                font-weight: lighter;
                margin-top: 1rem;

                .job-stats-container {
                    padding-left: 1rem;
                    font-size: 1rem;
                }
            }

            .job-description {
                font-weight: lighter;
                margin-left: 1rem;
                padding-left: .5rem;
                margin-top: 2rem;

                span {
                    position: relative;

                    &::after {
                        content: '';
                        position: absolute;
                        left: -8px;
                        bottom: 0;
                        top: 0;
                        width: 3px;
                        height: 100%;
                        transition: max-width .5s;
                        background: linear-gradient(135deg, rgba(255, 126, 0, 1) 0%, rgba(255, 0, 16, 1) 100%);
                    }
                }
            }
        }

        &:hover {
            .job-title {
                span {
                    &::after {
                        max-width: 100%;
                    }
                }
            }
        }
    }
</style>
