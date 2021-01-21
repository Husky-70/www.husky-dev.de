<template>
  <div style="padding: 1rem 2rem">
      <div v-if="mode === 0">
          <div style="display: flex; flex-direction: column; height: 100vh; justify-content: center; align-items: center">
              Enter Password:
              <v-row style="justify-content: center">
                  <v-col cols="6">
                      <v-input v-model="password" />
                  </v-col>
                  <v-col cols="3">
                      <v-btn style="margin: 0 1rem" @click="checkPassword">Submit</v-btn>
                  </v-col>
              </v-row>
          </div>
      </div>
      <div v-else>
          <div v-for="tunable in tunables" style="border-bottom: 2px solid white" :key="tunable.id">
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
  import moment from 'moment';

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
                  this.getTunables();
              }
          },
          getTunables() {
              axios.get('/fetch?method=getTunables').then(res => {
                  this.tunables = res.data;
              });
          }
      },
      filters: {
        convertDate(d, format) {
            return moment(d).format(format);
        }
      }
  };
</script>

<style scoped>

</style>
