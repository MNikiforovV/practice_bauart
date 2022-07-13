import V_Auth from '../views/V_Auth.vue';
import V_Register from '../views/V_Register.vue';

const authRouters = [
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
]
export default authRouters;
