<template>
  <div>
    <button
      :disabled="!isValidType"
      :type="resolvedType"
      class="px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-red-100 hover:text-red-700 transition-colors duration-200"
      @click="$emit('click')"
    >
      <slot> Submit </slot>
      <!-- slot is used as a placeholder to display the parent component content -->
      <!-- scoped slot  -->
    </button>
    <BaseMessage
      v-if="!isValidType"
      type="error"
      :message="`Invalid button type: '${type}'. Must be one of: button, submit, reset.`"
    />
  </div>
</template>

<script>
import BaseMessage from "./BaseMessage.vue";
export default {
  name: "BaseButton",
  components: {
    BaseMessage,
  },
  props: {
    type: {
      type: String,
      default: "",
    },
  },
  computed: {
    isValidType() {
      return ["button", "submit", "reset"].includes(this.type);
    },
    resolvedType() {
      // Fallback prevents broken HTML behavior
      return this.isValidType ? this.type : "button";
    },
  },
};
</script>
