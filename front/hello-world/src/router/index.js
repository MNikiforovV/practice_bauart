import Vue from 'vue'
import VueRouter from "vue-router";
import V_Auth from "../views/V_Auth.vue";
import V_Register from "../views/V_Register.vue";
import V_Home from "../views/V_Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: V_Home
  },
  {
    path: "/auth",
    name: "Auth",
    component: V_Auth,
    props: true
  },
  {
    path: "/register",
    name: "Register",
    component: V_Register,
    props: true
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
