<template>
  <div style="padding: 1rem 2rem">
      <div v-if="mode === 0">
          <div style="display: flex; flex-direction: column; height: 100vh; justify-content: center; align-items: center">
              Enter Password:
              <b-row style="justify-content: center">
                  <b-col cols="6">
                      <b-input v-model="password" />
                  </b-col>
                  <b-col cols="3">
                      <b-button style="margin: 0 1rem" @click="checkPassword">Submit</b-button>
                  </b-col>
              </b-row>
          </div>
      </div>
      <div v-else>
          <div v-for="tunable in tunables" style="border-bottom: 2px solid white">
              <a :href="'https://drive.google.com/file/d/'+ tunable.driveId +'/view?usp=sharing'" target="_blank">
                  <div style="display: flex;">
                      <div style="margin: .5rem 0">{{tunable.id}}</div>
                      <div style="margin: .5rem 3rem;">{{tunable.md5}}</div>
                      <div style="margin: .5rem 0">{{tunable.date | convertDate('DD.MM.YYYY   HH:mm')}}</div>
                  </div>
              </a>
          </div>
      </div>
  </div>
</template>

<script>
  import axios from "axios";
  import moment from 'moment'

  export default {
    name: "index",
      data: () => ({
          tunables: [],
          mode: 0,
          password: ''
      }),
      methods: {
          checkPassword() {
              if(this.password === 'shift123') {
                  this.mode = 1;
                  this.getTunables()
              };
          },
          getTunables() {
              axios.get('/fetch?method=getTunables').then(res => {
                  this.tunables = res.data
              });
          }
      },
      filters: {
        convertDate(d, format) {
            return moment(d).format(format)
        }
      }
  };
</script>

<style scoped>

</style>
