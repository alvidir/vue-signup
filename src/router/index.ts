import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginView.vue"),
  },
  {
    path: "/logout",
    name: "logout",
    component: () => import("../views/LogoutView.vue"),
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import("../views/SignupView.vue"),
  },
  {
    path: "/reset",
    name: "reset",
    component: () => import("../views/ResetView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
