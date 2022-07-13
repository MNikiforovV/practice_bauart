import Vue from 'vue';
import VueRouter from 'vue-router';
import V_Home from '../views/V_Home.vue';
import V_Profile from '../views/V_Profile.vue';
import PageNotFound from '@/components/PageNotFound.vue';
import authRouters from '../router/authRoute.js';
import projectRoutes from '../router/projectRoutes.js';
import { mapActions, mapState } from 'vuex';
import instance from '@/components/Instance';
import store from '../store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: V_Home,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: V_Profile,
    props: true,
  },
  {
    path: '*',
    name: 'PageNot',
    component: PageNotFound,
    props: true,
    meta: { notRequireAuth: true },
  },
  ...projectRoutes,
  ...authRouters,
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  let isLoggedIn;
  try {
    const { data } = await instance.get('user/user');
    store.commit('user/updateInfo', data)
    isLoggedIn = true;
  } catch (error) {
    isLoggedIn = false
  }
  if (!to.meta.notRequireAuth) {
    if (isLoggedIn) {
      next();
    } else {
      next({ name: 'Auth' });
    }
  } else {
    if (!isLoggedIn) next();
    else {
      next({ name: 'Home' });
    }
  }
});

export default router;
