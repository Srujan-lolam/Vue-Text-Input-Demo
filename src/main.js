// src/main.js
import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import BaseButton from "./components/BaseButton.vue";
import BaseInput from "./components/BaseInput.vue";
import "./assets/tailwind.css";

Vue.component("BaseButton", BaseButton);
Vue.component("BaseInput", BaseInput); // importing globally so that his can be used anywhere without importing again

Vue.config.productionTip = false; // keeps the console clean

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");

// the app is mounted to DOM element with id app
//store and router are injected so that we can access store and enable navigation through out our application
