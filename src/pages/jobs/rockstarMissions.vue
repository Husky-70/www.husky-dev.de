<template>
    <v-row>
<!--        <v-col cols="12">
            <vu-breadcrumb>
                <vu-breadcrumb-item :to="'/'">Home</vu-breadcrumb-item>
                <vu-breadcrumb-item active>Rockstar Missions</vu-breadcrumb-item>
            </vu-breadcrumb>
        </v-col>-->
        <v-col cols="12">
            <v-row style="justify-content: flex-end">
                <v-col cols="12" md="3">
                    <v-select :items="categories" v-model="selected" @input="downloadJobs()" />
                </v-col>
            </v-row>
        </v-col>
        <v-col cols="12" md="4" class="d-flex" v-for="job in jobs" :key="job.id">
            <div class="job-card-container d-flex" style="padding: 1rem">
                <a class="d-flex">
                    <a :href="'https://socialclub.rockstargames.com/job/gtav/' + job.jobId" target="_blank" class="job-card">
                        <div class="job-image">
                            <img :src="job.img" width="100%" />
                        </div>
                        <!--<audio controls>
                            <source src="../assets/zaber.mp3" type="audio/mpeg">
                            Your browser does not support the audio tag.
                        </audio>-->
                        <div class="job-card-name">
                            {{job.jobName}}
                        </div>
                        <div class="job-card-desc">
                            {{job.jobDescription | truncrate(150, '...') | replaceText}}
                        </div>
                        <!--<div>
                            <ps4 class="badge" />
                            <xbox360 class="badge"></xbox360>
                        </div>-->
                        <div class="job-join">
                            <a :href="getPsPath(job.jobId)" class="btn-btn"
                               :class="selected == 453 || selected == 454 ? 'locked':''" @click.prevent="">
                                <span>Join Job</span>
                            </a>
                            <a class="btn-btn" :href="'https://socialclub.rockstargames.com/job/gtav/' + job.jobId"
                               target="_blank">
                                <span>Bookmark Job</span>
                            </a>
                        </div>
                    </a>
                </a>
            </div>
        </v-col>
    </v-row>
</template>

<script>
    import axios from "axios";
    /*import Ps4 from "@/js/components/badges/ps4";
    import Xbox360 from "@/js/components/badges/xbox360";*/
    import _ from 'lodash';

    export default {
        name: "rockstarMissions",
        data () {
            return {
                jobs: [],
                categories: [],
                selected: 453,
                loading: false
            };
        },
        watch: {
            '$i18n.locale' () {
                this.getCategories();
            }
        },
        methods: {
          getCategories(){
            this.$con.jsonRequest('jobs/getAvailableRCategories', {
              l: this.$i18n.locale
            }).then(res => {
              if(res.ok){
                this.categories = [];
                res.categories.forEach((item) => {
                  this.categories.push({value: item.sid, text: item.m + " (" + item.c + ")"});
                });
              }
            });
          },
            downloadJobs () {
                this.loading = true;
                this.$con.jsonRequest('jobs/getRockstarMissions', {
                  type: this.selected
                }).then(res => {
                  if(res.ok) {
                    this.jobs = res.jobs;
                    this.loading = false;
                  }
                });
            },
            getPsPath (id) {
                if (window.navigator.userAgent.indexOf("PlayStation 4") > -1) {
                    axios.post('/misc/joinJob', {
                        ua: window.navigator.userAgent,
                        id
                    }, {withCredentials: true}).then(res => {
                        if (res.data.ok) {
                            return res.data.job;
                            //alert(res.data.ok)
                            //alert(JSON.stringify(res.data))
                        } else {
                            return 'http://google.de';
                        }
                    }).catch(err => {
                        //alert(err)
                    });
                } else {
                    //alert("outside")
                }
            }
        },
        created () {
          this.getCategories();
            let domainName = window.location.hostname;//.split('.')[0]; //ie... google
            //console.log(domainName);
            this.downloadJobs();
        },
        filters: {
            replaceText (str) {
                var elt = document.createElement("span");
                elt.innerHTML = str;
                return elt.innerText;
            },
            truncrate (str, symbolsCount, endWith) {
                //if (str.length > symbolsCount) return str.substring(0, symbolsCount) + endWith;
                //else return str;
                return str;
            }
        }
    };
</script>

<style scoped>
</style>
