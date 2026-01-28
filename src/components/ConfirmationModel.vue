<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
  >
    <div class="bg-white rounded-lg shadow-lg p-6 max-w-md">
      <div class="mb-4">
        <h3 class="text-xl font-semibold text-gray-800">{{ title }}</h3>
      </div>

      <div class="mb-6">
        <p class="text-gray-600">{{ message }}</p>
      </div>

      <div class="flex justify-center space-x-4">
        <BaseButton type="button" @click="onConfirm">
          {{ confirmText }}
        </BaseButton>

        <BaseButton type="button" @click="onCancel">
          {{ cancelText }}
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from "./BaseButton.vue";

export default {
  name: "ConfirmationModal",
  components: {
    BaseButton,
  },
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      default: "Confirmation",
    },
    message: {
      type: String,
      default: "Are you sure you want to add the data to store ?",
    },
    confirmText: {
      type: String,
      default: "Yes",
    },
    cancelText: {
      type: String,
      default: "No",
    },
  },
  methods: {
    onConfirm() {
      this.$emit("confirm");
    },
    onCancel() {
      this.$emit("cancel");
    },
  },
};
</script>
