<template>
    <div>
        <b-row v-if="mode === 0"
               style="min-height: calc(100vh - 4rem); display:flex; justify-content: center; align-items: center">
            <spinner v-if="loading" />
            <b-col cols="12" md="3">
                <span>Search user by SC-Name:</span>
            </b-col>
            <b-col cols="12" md="3">
                <vu-input v-model="scname" @keydown="$event.keyCode === 13 ? getUserProfile():''" />
            </b-col>
        </b-row>
        <b-row v-if="mode === 1" style="padding: 1rem; display: flex; justify-content: center">
            <b-col cols="2">
                <img :src="'https://a.rsg.sc/' + acc.AvatarUrl" />
            </b-col>
            <b-col cols="3">
                <div class="display: flex;align-items: center;">
                    <div class="nickname">
                        {{acc.Nickname}}
                    </div>
                    <div class="country">
                        {{acc.CountryName}}
                    </div>
                    <div class="country">
                        Created: {{acc.CreatedDate}}
                    </div>
                </div>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import VuInput from "../components/vu-input";
    import Spinner from "../components/spinner";
    import axios from 'axios';

    export default {
        name: "scusers",
        components: {Spinner, VuInput},
        data () {
            return {
                scname: "",
                loading: false,
                mode: 0,
                acc: {}
            };
        },
        methods: {
            getUserProfile () {
                this.loading = true;
                axios.get('/fetch?method=getUserProfile').then((res) => {
                    this.acc = res.data;
                    this.mode = 1;
                    this.loading = false;
                });
            }
        }
    };
</script>

<style scoped>
    .nickname {
        font-size: 2rem;
    }

    .country {
        font-size: 1.1rem;
    }
</style>
