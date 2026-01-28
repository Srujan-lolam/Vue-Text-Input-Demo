<template>
  <input
    :type="type"
    class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
    :value="value"
    :placeholder="placeholder"
    @input="$emit('input', $event.target.value)"
    @keyup="$emit('keyup', $event)"
  />
</template>
<!-- User types → triggers @input
    $emit('input', value) → sends value to parent
    Parent’s v-model updates its variable (inputText) -->
<script>
export default {
  name: "BaseInput",
  props: {
    type: {
      type: String,
      default: "text",
    },
    value: {
      type: String,
      default: "", //for two way data binding
    },
    // v-model sends inputText → value prop
    placeholder: {
      type: String,
      default: "Type Somethings",
    },
  },
};
</script>
