import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
//import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue")
  },
  {
    path: "/signin",
    name: "Signin",
    component: () => import("@/views/Signin")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
