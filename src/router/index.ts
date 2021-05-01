import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
//import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home")
  },
  {
    path: "/signin",
    name: "Signin",
    component: () => import("../views/oauth/Signin")
  },
  {
    path: "/signup",
    name: "Signup",
    component: () => import("../views/oauth/Signup")
  },
  {
    path: "/you-loser",
    name: "ForgottenPassword",
    component: () => import("../views/oauth/ForgottenPassword")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
