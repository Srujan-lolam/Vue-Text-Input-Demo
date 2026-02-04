// src/mixins/navigationMixin.js
import EventBus from "../eventBus";

export default {
  data() {
    return {
      showConfirmModal: false,
    };
  },
  methods: {
    navigateHomeWithText(text) {
      this.showConfirmModal = false;
      return this.$router.push("/").then(() => {
        return this.$nextTick(() => {
          EventBus.$emit("text-to-add", text);
        });
      });
    },
  },
};
