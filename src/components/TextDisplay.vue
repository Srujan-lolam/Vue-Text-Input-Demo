<template>
  <div v-if="text">
    {{ text }}
  </div>
</template>

<script>
export default {
  name: "TextDisplay",
  props: {
    text: {
      type: String,
      default: "",
    },
  },
};
</script>
