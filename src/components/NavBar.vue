<template>
    <div class="navb" :style="{maxHeight: expanded ? ((6 * 3) + 4) + 'rem': '4rem' }" >
        <div class="nav-item-main">
            <router-link tag="div" to="/" class="nav-image">
                <img src="@/js/assets/husky.png" />
            </router-link>
            <div class="burger">
                <button @click="expanded = !expanded">
                    <div></div>
                    <div></div>
                    <div></div>
                </button>
            </div>
        </div>
        <router-link to="/" tag="div" class="nav-item" :class="$route.name === 'home' ? 'active':''"><span>Home</span></router-link>
        <router-link to="/jobs" tag="div" class="nav-item"><span>Modded Jobs</span></router-link>
        <router-link :to="{name: 'rockstarMissions'}" tag="div" class="nav-item"><span>R* Missions</span></router-link>
        <router-link to="/playlists" tag="div" class="nav-item"><span>Playlists</span></router-link>
        <!--<router-link to="/scaccounts" tag="div" class="nav-item"><span>SC-Accounts</span></router-link>-->
        <router-link to="/faq" tag="div" class="nav-item"><span>FAQ</span></router-link>
        <div class="nav-item" style="position: relative; padding: .5rem">

            <img :class="rollOut ? 'roll-out':''" :src="'/images/'+ oldFlag + '.png'"
                 style="position: absolute"
                 @click="startLanguageAnim">
            <img :class="rollOut ? 'fade-in':''" :src="'/images/'+ newFlag + '.png'"
                 style="position: absolute"
                 @click="startLanguageAnim">
        </div>
        <!--<router-link to="/bc" tag="div" class="nav-item">BROWSER_CHECK</router-link>-->
        <!--<router-link to="/about" tag="div" class="nav-item">Log-in</router-link>-->
    </div>
</template>

<script>
    export default {
        name: "NavBar",
        data () {
            return {
                flagNew: '',
                flagOld: 'en',
                expanded: false,
                rollOut: false
            };
        },
        created () {
            if (localStorage.getItem('main') == null) localStorage.setItem('main', JSON.stringify({
                _lang: 'en'
            }));
            else this.$i18n.locale = this.flagOld = JSON.parse(localStorage.getItem('main'))._lang;
        },
        computed: {
            newFlag () {
                return this.$i18n.locale;
            },
            oldFlag () {
                return this.flagOld;
            }
        },
        watch: {
            '$route.path'() {
                this.expanded = false
            }
        },
        methods: {
            startLanguageAnim () {
                if (this.rollOut) return;
                if (this.$i18n.locale === 'de') this.$i18n.locale = 'en';
                else this.$i18n.locale = 'de';

                let storage = JSON.parse(localStorage.getItem('main'));
                storage._lang = this.$i18n.locale;
                localStorage.setItem('main', JSON.stringify(storage));

                this.rollOut = true;
                setTimeout(() => {
                    this.flagOld = this.$i18n.locale;
                    this.rollOut = false;
                }, 1000);
            },

        }
    };
</script>


<style lang="scss">
    .navb {
        max-height: 4rem;
        background: #414141f0;
        display: flex;
        overflow: hidden;
        flex-wrap: nowrap;
        z-index: 9999;
        position: fixed;
        width: 100vw;
        transition: max-height .5s;
        height: 100%;
        font-weight: lighter;
        &::after {
            content: "";
            background: linear-gradient(135deg, #ff7e00 0%, #ff0010 100%);
            height: 3px;
            width: 100%;
            position: absolute;
            bottom: 0;
        }

        .nav-image {
            padding: .5rem;
            width: 4rem;
            height: 4rem;
            cursor: pointer;

            img {
                height: 100%;
            }
        }

        .nav-item {
            color: white;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background-color .5s;
            padding: .5rem;
            min-width: 6rem;
            min-height: 3rem;
            height: 100%;

            img {
                height: 100%;
                padding: .5rem;
            }

            span {
                position: relative;
                &::after {
                    content: "";
                    background: linear-gradient(135deg, #ff7e00 0%, #ff0010 100%);
                    height: 3px;
                    width: 100%;
                    max-width: 0;
                    position: absolute;
                    left: 0;
                    bottom: -5px;
                    transition: max-width .3s;
                }
            }
            &.active {
                span {
                    &::after {
                        max-width: 100%;
                    }
                }
            }

            &:hover {
                background: rgba(43, 43, 43, 0.3);
                span {
                    &::after {
                        max-width: 100%;
                    }
                }
            }
        }

        .nav-item-main {
            min-height: 4rem;
            display: flex;

            .burger {
                display: none;
                margin-left: auto;
                width: 4rem;
                height: 4rem;
                padding: .6rem;

                button {
                    width: 100%;
                    height: 100%;
                    border: 1px solid grey;
                    background: transparent;
                    border-radius: 3px;
                    padding: 0 7px;

                    :nth-child(n) {
                        background-color: white;
                        height: 2px;
                    }

                    :nth-child(1), :nth-child(2) {
                        margin-bottom: .5rem;
                    }
                }

            }
        }
    }

    @media screen and (max-width: 992px) {
        .navb {
            flex-direction: column;

            .nav-item-main {
                .burger {
                    display: block;
                }
            }
        }
    }

    @media screen and (min-width: 993px) {
        .navb {
            align-items: center;
            justify-content: center;
        }
    }

    .roll-out {
        opacity: 1;
        animation: roll-out 1s;
    }

    .fade-in {
        opacity: 0;
        transform: scale(0);
        animation: fade-in .8s forwards;
    }

    @keyframes roll-out {
        to {
            transform: translateX(5rem) rotate(360deg);
            opacity: 0;
        }

    }

    @keyframes fade-in {
        20% {
            transform: scale(0);
            opacity: 0;
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }

    }
</style>
