// src/router/index.js
import Vue from "vue";
import VueRouter from "vue-router";
import TextInputPage from "../views/TextInputPage.vue";
import CompareTextPage from "../views/CompareTextPage.vue";
import UserDirectory from "../views/UserDirectory.vue";
import AboutUs from "../components/AboutUs";
import SignUp from "../components/SignUp";
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
  {
    path: "/about",
    component: AboutUs,
  },
  {
    path: "/signUp",
    component: SignUp,
  },
];

const router = new VueRouter({
  mode: "history", //use HTML5 history api - removes # from urls
  routes,
});

export default router;
