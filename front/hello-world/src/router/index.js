import Vue from 'vue';
import VueRouter from 'vue-router';
import V_Auth from '../views/V_Auth.vue';
import V_Register from '../views/V_Register.vue';
import V_Home from '../views/V_Home.vue';
import V_Profile from '../views/V_Profile.vue';
import instance from '../components/Instance.js';
import store from '@/store';
import { mapGetters } from 'vuex';
import PageNotFound from '@/components/PageNotFound.vue';
import V_Project from '../views/V_Project.vue';
import V_UpdateProject from '@/components/V_UpdateProject.vue';


Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: V_Home,
  },
  {
    path: '/auth',
    name: 'Auth',
    component: V_Auth,
    props: true,
    meta: { notRequireAuth: true },
  },
  {
    path: '/register',
    name: 'Register',
    component: V_Register,
    props: true,
    meta: { notRequireAuth: true },
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
  {
    path: '/project',
    name: 'Project',
    component: V_Project,
    props: true,
    
  },
  {
    path: '/project/:slug',
    name: 'V_UpdateProject',
    component: V_UpdateProject,
    props: true,
    
  },
  
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

// const requireAuth = ['/profile', '/'] // авторизированный
// const notRequireAuth = ['/auth', '/register'] // неавторизированный

router.beforeEach((to, from, next) => {
  
  const isLoggedIn = localStorage.getItem('isLoggedIn') || false
  console.log(isLoggedIn)
  if (!to.meta.notRequireAuth) {
    if (isLoggedIn) {
      next();
    } else {
      next({ name: 'Auth' });
    }
  } else {
    if (!isLoggedIn) next();
    else {
      next({ name: 'Profile' });
    }
  }

  // console.log(notRequireAuth.includes(to.path))
  // console.log(requireAuth.includes(to.path))

  // try {

  //   await instance.get('auth/isloggedin')

  //   if (requireAuth.includes(to.path)) {
  //     next()
  //   } else {
  //     router.push('/profile')
  //   }

  // } catch (error) {
  //   if (notRequireAuth.includes(to.path)) {
  //     next()
  //   }
  //   else {
  //     router.push('/auth')
  //   }
  // }
});

export default router;
