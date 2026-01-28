<!-- src/components/IndexRetriever.vue -->
<template>
  <div>
    <div>
      <BaseInput
        v-model="indexInput"
        placeholder="Enter index number..."
        type="number"
        @input="onIndexChange"
      />
    </div>

    <BaseMessage v-if="message" :type="messageType" :message="message" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import EventBus from "../eventBus.js";
import BaseInput from "./BaseInput.vue";
import BaseMessage from "./BaseMessage.vue";

export default {
  name: "IndexRetriever",
  components: {
    BaseInput,
    BaseMessage,
  },
  data() {
    return {
      indexInput: "",
      message: "",
      messageType: "info",
    };
  },
  computed: {
    ...mapGetters("text", {
      submittedTexts: "getAllTexts",
    }),
  },
  methods: {
    onIndexChange() {
      this.message = "";
      if (!this.indexInput.trim()) {
        return;
      }
      const index = parseInt(this.indexInput);
      if (isNaN(index)) {
        this.message = "Please enter a valid number";
        this.messageType = "error";
        return;
      }
      if (this.submittedTexts.length == 0) {
        (this.message = `The store is empty`), (this.messageType = "info");
        return;
      } else if (index < 1 || index > this.submittedTexts.length) {
        this.message = `Please enter a number between 1 and ${Math.max(
          0,
          this.submittedTexts.length,
        )}`;
        this.messageType = "error";
        return;
      }
      const retrievedText = this.submittedTexts[index - 1];
      EventBus.$emit("text-retrieved", retrievedText);
    },
  },
};
</script>
