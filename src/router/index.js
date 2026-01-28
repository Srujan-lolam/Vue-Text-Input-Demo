// src/router/index.js
import Vue from "vue";
import VueRouter from "vue-router";
import TextInputPage from "../views/TextInputPage.vue";
import CompareTextPage from "../views/CompareTextPage.vue";
import UserDirectory from "../views/UserDirectory.vue";
Vue.use(VueRouter);
//registers vuerouter as a plugin so that we can use access routing features across our app

const routes = [
  {
    path: "/",
    name: "Home",
    component: TextInputPage,
  },
  {
    path: "/compare",
    name: "Compare",
    component: CompareTextPage,
  },
  {
    path: "*",
    redirect: "/",
  },
  {
    path: "/users",
    name: "Users",
    component: UserDirectory,
  },
];

const router = new VueRouter({
  mode: "history", //use HTML5 history api - removes # from urls
  routes,
});

export default router;
