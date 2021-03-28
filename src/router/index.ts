import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
//import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home")
  },
  {
    path: "/signin",
    name: "Signin",
    component: () => import("@/views/Signin")
  },
  {
    path: "/signup",
    name: "Signup",
    component: () => import("@/views/Signup")
  },
  {
    path: "/you-loser",
    name: "ForgotPassword",
    component: () => import("@/views/ForgotPassword")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
