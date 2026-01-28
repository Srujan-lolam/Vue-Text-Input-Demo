<template>
  <div>
    <TextInput :initial-text="textToAdd" />
  </div>
</template>

<script>
import TextInput from "../components/TextInput.vue";
// import IndexRetriever from "../components/IndexRetriever.vue";
export default {
  name: "TextInputPage",
  components: {
    TextInput,
    // IndexRetriever,
  },
  data() {
    return {
      textToAdd: "",
    };
  },
  //appraoch - 1
  // created() {
  //   if (this.$route.query.textToAdd) {
  //     this.textToAdd = this.$route.query.textToAdd;
  //   }
  // },
  // why created instead of other lifecycle hooks ?
  // if we don't use any lifecycle hook , the data will not be ready , initially textToAdd will be empty
  // and that empty value will be passed to child component TextInput - We want to read route data and
  // initialize component state as soon as the page is created, before the child component (TextInput) renders.
  // if we don't use created lifecycle hook
  // Component loads
  // textToAdd stays ""
  // <TextInput :initial-text="textToAdd" /> receives ""
  // Query param is ignored
  // In created() :
  //   data() will be initialized
  //   this.$route available
  //   props, methods, computed ready
  //   DOM not mounted yet - not requried for us

  // Vue creates TextInputPage --> data() runs → textToAdd = "" --> created() runs
  // --> Vue Router has already injected $route --> textToAdd is updated from query
  // --> <TextInput> receives the correct initial-text

  // we can do this in mounted(),mounted() waits for DOM rendering which is too late for simple
  // data setup.
};
</script>
