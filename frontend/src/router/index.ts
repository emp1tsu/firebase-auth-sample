import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";

import firebase from "firebase/app";

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeResolve((to, from, next) => {
  if (to.path == "/login") {
    next();
  } else {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("認証中");
        next();
      } else {
        console.log("未認証");
        next({ path: "/login" });
      }
    });
  }
});

export default router;
