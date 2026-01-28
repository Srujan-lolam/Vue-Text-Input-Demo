<template>
  <div id="app">
    <Header />
    <main class="container mx-auto">
      <router-view />
    </main>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
export default {
  name: "App",
  components: {
    Header,
  },
};
// all pages and components are redered inside this component only . its a root
// component for the application
</script>
