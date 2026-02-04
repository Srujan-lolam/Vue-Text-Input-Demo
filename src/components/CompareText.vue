<template>
  <div class="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 mt-8">
    <div class="text-center mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Compare Text</h1>
    </div>

    <div class="space-y-4">
      <div>
        <BaseInput
          v-model="compareText"
          placeholder="Enter text to compare..."
          @keyup.enter="compareAndSaveText"
        />
      </div>

      <div class="flex justify-center">
        <BaseButton type="button" @click="compareAndSaveText">
          Compare
        </BaseButton>
      </div>

      <!-- Result Message -->
      <BaseMessage
        v-if="resultMessage"
        :type="messageType"
        :message="resultMessage"
        class="mt-4 p-3 rounded"
      />
    </div>

    <ConfirmationModal
      :show="showConfirmModal"
      :title="'New Text'"
      :message="`The text '${compareText}' is not present in the store. Do you want to add it?`"
      @confirm="handleConfirmAdd"
      @cancel="handleCancelAdd"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import BaseButton from "./BaseButton.vue";
import BaseInput from "./BaseInput.vue";
import BaseMessage from "./BaseMessage.vue";
import ConfirmationModal from "./ConfirmationModel.vue";
import NavigationMixin from "../mixins/HomeNavigation";
export default {
  name: "CompareText",
  components: {
    BaseButton,
    BaseInput,
    BaseMessage,
    ConfirmationModal,
  },
  mixins: [NavigationMixin],
  data() {
    return {
      compareText: "",
      resultMessage: "",
      messageType: "info",
      showConfirmModal: false,
    };
  },
  computed: {
    ...mapGetters("text", {
      submittedTexts: "getAllTexts",
    }),
  },
  methods: {
    goToHomePage() {
      this.$router.push("/");
    },
    compareAndSaveText() {
      if (!this.compareText.trim()) {
        this.resultMessage = "Please Enter some text to compare";
        return;
      }

      // Check if the text already exists in the store
      const textExists = this.submittedTexts.some(
        (text) => text.toLowerCase() === this.compareText.toLowerCase(),
      );

      if (textExists) {
        // Text already exists
        this.resultMessage = "String already exists in the store!";
        this.messageType = "error";
      } else {
        // Text doesn't exist, add it to the store
        this.showConfirmModal = true;
        // this.$store.dispatch("text/addText", this.compareText);
        // this.resultMessage = "Text added to the store successfully!";
        // this.compareText = "";
      }
    },
    handleConfirmAdd() {
      this.showConfirmModal = false;
      //approach - 1 - query params
      // const textToAdd = this.compareText;
      // this.$router.push({
      //   path: "/",
      //   query: { textToAdd },
      // });

      //approach - 2
      // this.$router.push("/");
      // setTimeout(() => {
      //   EventBus.$emit("text-to-add", textToAdd);
      // }, 100);
      this.navigateHomeWithText(this.compareText);

      // nextTick
      // Vue-specific method that waits for the next DOM update cycle
      // waits for Vue to finish updating the DOM after a state change
      // other approaches
      // 1) use Store , create a temp vairable and create mutations and actions .
      // 2) use route params - encodeURIComponent , decodeURIComponent
      // 3) use event bus
    },
    handleCancelAdd() {
      this.showConfirmModal = false;
      this.resultMessage = "Storing to store operation was canceled.";
      this.messageType = "info";
    },
  },
};
</script>
