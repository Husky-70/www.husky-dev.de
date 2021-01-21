<template>

    <b-row>
        <b-col cols="12" xl="6" class="d-flex">
            <div class="categories-container">
                <router-link tag="div" to="/jobs" class="categories-inner">
                    <div class="categories-image">
                        <img src="@/js/assets/peterGriffin.jpg">
                        <div class="categories-text-container">
                            <div class="categories-title">
                                Jobs
                            </div>
                            <div class="categories-description">
                                See all available modded jobs from selected users / Launch jobs from browser (PS4 only)
                            </div>
                        </div>
                    </div>

                </router-link>
            </div>
        </b-col>
        <b-col cols="12" xl="6" class="d-flex">
            <div class="categories-container">
                <router-link tag="div" to="/playlists" class="categories-inner">
                    <div class="categories-image">
                        <img src="@/js/assets/lester.jpg">
                        <div class="categories-text-container">
                            <div class="categories-title">
                                Playlists
                            </div>
                            <div class="categories-description">
                                Browse through available Playlists and launch them from Browser (PS4 Only)
                            </div>
                        </div>
                    </div>

                </router-link>
            </div>
        </b-col>
        <b-col cols="12" xl="6" class="d-flex">
            <div class="categories-container">
                <a :href="freemode" class="categories-inner locked" @click="joinFreemode">
                    <div class="categories-image">
                        <img src="@/js/assets/osiris.jpg">
                        <div v-if="!isPlaystation4" class="categories-locked">
                            <span>{{$t('pages.home.visitPs4')}}</span>
                        </div>
                        <div class="categories-text-container">
                            <div class="categories-title">
                                {{$t('pages.home.joinFreemode')}}
                            </div>
                            <div class="categories-description">
                                {{$t('pages.home.joinFremodeDesc')}}
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        </b-col>
        <b-col cols="12" xl="6" class="d-flex">
            <div class="categories-container">
                <div class="categories-inner locked">
                    <div class="categories-image">
                        <img src="@/js/assets/polCar_low.jpg">
                        <div class="categories-last-check">
                            {{$t('pages.home.lastCheck')}}: {{bg_LastCheck}}
                        </div>
                        <div class="categories-locked">

                        </div>
                        <div class="categories-text-container">
                            <div class="categories-title">
                                Background Scripts
                            </div>
                            <div class="categories-description">
                                Download and compare Background scripts from archive
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </b-col>
        <!--<b-col cols="12" xl="6" class="d-flex">
            <div class="categories-container">
                <div class="categories-inner locked">
                    <div class="categories-image">
                        <img src="@/js/assets/domdom.jpg">
                        <div class="categories-locked">

                        </div>
                        <div class="categories-text-container">
                            <div class="categories-title">
                                Tunables ({{$t('pages.home.hashed')}})
                            </div>
                            <div class="categories-description">
                                {{$t('pages.home.dlHashed')}}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </b-col>
        <b-col cols="12" xl="6" class="d-flex">
            <div class="categories-container">
                <div class="categories-inner locked">
                    <div class="categories-image">
                        <img src="@/js/assets/lazer.jpg">
                        <div class="categories-last-check">
                            {{$t('pages.home.lastCheck')}}: {{tu_LastCheck}}
                        </div>
                        <div class="categories-locked">

                        </div>
                        <div class="categories-text-container">
                            <div class="categories-title">
                                Tunables ({{$t('pages.home.unhashed')}})
                            </div>
                            <div class="categories-description">
                                {{$t('pages.home.dlUnhashed')}}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </b-col>-->
    </b-row>

    <!--<b-container class="d-flex flex-column" fluid style="height: 100vh; overflow: scroll;">
        <b-row style="justify-content: center; height: 100%;margin: 0">
            <b-col lg="10">
                <div class="bg_Container fadeIn" style="position: relative;height: 100%;">
                    <b-row style="text-align: center">
                        <b-col sm="12">
                            <img src="../assets/husky.png" style="width: 100%; height: 100%; max-width: 300px;margin-bottom: 30px; max-height: 300px">
                        </b-col>
                    </b-row>
                    <b-row style="justify-content: center; max-height: 46vh;overflow: scroll;">
                        &lt;!&ndash;<div v-for="i in buttons.titles.length" :key="i.id" class="column-12 column-lg-6 d-flex" style="margin-top: 10px;">
                            <router-link v-if="!isPSN(i-1)" :to="buttons.goTo[i - 1]" tag="div" class="big_button">
                                <div class="_row" style="align-items: center">
                                    <div class="column-3" style="position: relative; height: 80px;">
                                        <transition name="transition_fade">
                                            <component :is="getComponent(i-1)" style="position: absolute; left: 0;width: 100%;height: 100%" />
                                        </transition>
                                    </div>
                                    <div class="column-9">
                                        <div class="_row">
                                            <div class="big_button_header">
                                                {{ buttons.titles[i - 1] }}
                                            </div>
                                        </div>
                                        <div class="_row">
                                            <div class="big_button_desc">
                                                {{ buttons.descriptions[i - 1] }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </router-link>
                            <a v-else :href="!store.getters.isAuthenticated ? '/login':buttons.goTo[i - 1]" class="big_button" style="padding: 20px;display: flex; color: #000; width: 100%; text-decoration: none">
                                <div class="_row" style="align-items: center">
                                    <div class="column-3" style="position: relative; height: 80px;">
                                        <transition name="transition_fade">
                                            <component :is="getComponent(i-1)" style="position: absolute; left: 0;width: 100%;height: 100%" />
                                        </transition>
                                    </div>
                                    <div class="column-9">
                                        <div class="_row">
                                            <div class="big_button_header">
                                                {{ buttons.titles[i - 1] }}
                                            </div>
                                        </div>
                                        <div class="_row">
                                            <div class="big_button_desc">
                                                {{ buttons.descriptions[i - 1] }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>&ndash;&gt;
                    </b-row>
                    <router-link to="icons" style="position: absolute; bottom: 5px; left: 10px;color: white; font-size: 10px">
                        SVG icon authors
                    </router-link>
                    &lt;!&ndash;<b-button @click="testAuth"> TEST </b-button>&ndash;&gt;
                </div>
            </b-col>
        </b-row>
        &lt;!&ndash;<vue-headful title="Home" />&ndash;&gt;
    </b-container>-->
</template>


<script>
    //import store from '../../store'
    var ip = require('ip');

    //require('../../static/global.css')
    import axios from 'axios';
    import Ps4 from "./badges/ps4";
    import moment from 'moment';
    /*import racecar from '../../src/components/racecar.vue'
    import jet from '../../src/components/jet.vue'
    import bike from '../../src/components/bike.vue'
    import coding from '../../src/components/coding.vue'
    import ps4 from '../../src/components/ps4.vue'
    import compare from '../../src/components/svg/compare.vue'
    import playstation from '../../src/components/svg/playstation.vue'
    import sha1 from 'sha1'*/

    export default {
        components: {
            Ps4
            /*jet,
            coding,
            ps4*/
        },
        data () {
            return {
                ip: ip,
                jobs: [],
                bg_LastCheck: "0",
                tu_LastCheck: 0,
                freemode: '#'
                /*isReady: false,
                jetCoding: jet,
                ps4Playstaion: ps4,
                activeItem2: 0,
                store: store,
                buttons: {
                    titles: ['Tunables (hashed)', 'Tunables (unhashed)', 'Background Scripts', 'Go to freemode (PS4)', 'Compare Tunables', 'Join Job'],
                    descriptions: ['Download hashed Tunable files', 'Download unhashed Tunable files', 'Download Background scripts', 'Join freemode via recent activity', 'Compare two tunables online', 'Join Job by recent activity'],
                    goTo: ['download_tunables', 'download-unhashed-tunables', 'download_bgscripts', 'psal:play?id=CUSA00419&arg=-StraightIntoFreemode', 'compare-hashed-tunables', 'psal:play?id=CUSA00419&arg=-StraightIntoFreemode -LiveAreaLoadContent=zvepY9-mJUug-n0ntdvruQ -LiveAreaContentType=UGC_TYPE_GTA5_MISSION_PLAYLIST'],
                }*/
            };
        },

        created () {
            axios.get('/test');
        },

        mounted () {
            axios.get('https://api.husky-dev.de/getJobs').then(res => {
                this.jobs = res.data;
            });
            axios.get('https://api.husky-dev.de/logs/bg_last_checked').then((res) => {
                this.bg_LastCheck = moment(res.data[0].fullDate).format("ddd DD, HH:mm:ss");
            });
            axios.get('https://api.husky-dev.de/logs/tu_last_checked').then((res) => {
                this.tu_LastCheck = moment(res.data[0].fullDate).format("ddd DD, HH:mm:ss");
            });
            if (localStorage.getItem('pageKey') === null || localStorage.getItem('pageKey') !== "true") {
                axios.get('https://api.husky-dev.de/logs/visit').then((res) => {
                    localStorage.setItem('pageKey', "true");
                });
            }
            if (window.navigator.userAgent.indexOf("PlayStation 4") > -1) {
                axios.post('/misc/goToFreemode', {
                    ua: window.navigator.userAgent
                }, {withCredentials: true}).then(res => {
                    if (res.data.ok) {
                        this.freemode = res.data.freemode;
                        //alert(res.data.ok)
                        //alert(JSON.stringify(res.data))
                    } else {
                        //alert(res.data.msg)
                    }
                }).catch(err => {
                    //alert(err)
                });
            } else {
                //alert("outside")
            }

            //http://ipinfo.io/json
        },

        methods: {
            joinFreemode () {
                if (this.isPlaystation4) {
                    axios.get('https://api.husky-dev.de/logs/goToFreemode');
                }
            }
        },
        computed: {
            isPlaystation4 () {
                return window.navigator.userAgent.indexOf("PlayStation 4") > -1;
            }
        }

    };
</script>

<style lang="scss">
    .categories- {
        &container {
            width: 100%;
            padding: 1rem;
        }

        &inner {
            cursor: pointer;
            background-color: #00000080;
            box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.71);
            transition: all .5s;

            &.locked {
                cursor: default;
            }

            &:hover {
                box-shadow: 0 0 15px 10px #0000007a;
            }
        }

        &last-check {
            position: absolute;
            top: 1rem;
            right: 1rem;
        }

        &image {
            img {
                transition: filter .5s;
                filter: brightness(.7);
                width: 100%;
            }

            position: relative;

            .categories-locked {
                position: absolute;
                background: url("/images/lock.svg");
                justify-content: center;
                align-items: center;
                display: flex;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                /* bottom: 0; */
                background-position: center;
                background-size: 5rem;
                background-repeat: no-repeat;

                span {
                    padding: 0 1rem 8rem 1rem;
                    text-align: center;
                }
            }

            .categories-text-container {
                position: absolute;
                bottom: 1rem;
                left: 1rem;
                right: 1rem;
                overflow: hidden;

                .categories-title {
                    font-size: 1.5rem;

                }

                .categories-description {
                    max-height: 0;
                    filter: blur(5px);
                    transition: all .5s;
                }
            }

            &:hover {
                img {
                    filter: brightness(0.3);
                }

                .categories-locked {
                    span {
                        display: none;
                    }
                }

                .categories-text-container {


                    .categories-title {
                        font-size: 1.5rem;

                    }

                    .categories-description {
                        max-height: 3rem;
                        filter: blur(0);
                    }
                }

            }
        }
    }

    .transition_fade-enter-active, .transition_fade-leave-active {
        transition: opacity 2s;
    }

    .transition_fade-enter, .transition_fade-leave-to /* .fade-leave-active below version 2.1.8 */
    {
        opacity: 0;
    }
</style>

