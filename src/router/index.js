import Vue from 'vue';
import VueRouter from 'vue-router';
import * as pg from '@/pages/pages';

Vue.use(VueRouter);
const routes = [
  {
    path: '/',
    name: 'Home',
    component: pg.Home
  },
  {
    path: '/faq',
    name: 'FAQ',
    component: pg.FAQ
  },{
    path: '/jobs',
    name: 'Jobs',
    component: pg.Jobs
  },
  {
    path: '/jobs',
    name: 'Jobs',
    component: pg.Jobs
  },
  {
    path: '/jobs/rockstar-missions',
    name: 'RockstarMissions',
    component: pg.RockstarMissions
  },
  {
    path: '/joinplaylist',
    name: 'JoinPlaylist',
    component: pg.JoinPlaylist
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../pages/About.vue')
  }
];

const router = new VueRouter({
  mode:'history',
  routes
});

export default router;
