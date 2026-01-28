<!-- src/components/BaseMessage.vue -->
<template>
  <div>
    <div>{{ type }}</div>
    <div>{{ message }}</div>
  </div>
</template>

<script>
export default {
  name: "BaseMessage",
  props: {
    type: {
      type: String,
      default: "info",
    },
    message: {
      type: String,
      required: true,
    },
  },
};
</script>
