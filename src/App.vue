<template>
    <v-app dark>
      <div id="app" style="position: relative">
        <NavBar />
        <v-container style="background-color: rgb(24, 24, 24); min-height: 100vh; padding: 4rem 1rem 3rem 1rem; box-shadow: 0 0 15px 0px #000000e3;">
          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </v-container>
      </div>
    </v-app>
</template>

<script>
    import NavBar from "@/components/NavBar";

    export default {
        name: "App",
        components: {NavBar}
    };
</script>

<style lang="scss">
    .fade-enter-active, .fade-leave-active {
        transition: opacity .3s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
    @import "@/assets/scss/app";
</style>
