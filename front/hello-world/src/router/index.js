import Vue from 'vue';
import VueRouter from 'vue-router';
import V_Auth from '../views/V_Auth.vue';
import V_Register from '../views/V_Register.vue';
import V_Home from '../views/V_Home.vue';
import V_Profile from '../views/V_Profile.vue';
import instance from '../components/Instance.js';

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
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

// const requireAuth = ['/profile', '/'] // авторизированный
// const notRequireAuth = ['/auth', '/register'] // неавторизированный

router.beforeEach(async (to, from, next) => {
  let isAuth = false;
  try {
    await instance.get('auth/isloggedin');
    isAuth = true;
  } catch (error) {}
  
  if (!to.meta.notRequireAuth) {
    if (isAuth) {
      next();
    } else {
      next({ name: 'Auth' });
    }
  } else {
    if (!isAuth) next();
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
