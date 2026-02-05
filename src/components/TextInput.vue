<template>
  <div class="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 mt-12">
    <div class="text-center mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Text Input Demo</h1>
      <!-- <p class="text-gray-600">Enter text and store it in Vuex</p> -->
    </div>

    <!-- Retrieve Text by Index - commented out as requested -->
    <div class="mb-6">
      <IndexRetriever />
    </div>

    <div>
      <div class="space-y-4">
        <div class="relative">
          <BaseInput
            v-model="inputText"
            placeholder="Type something..."
            @keyup.enter="submitText"
          />

          <!-- Recommendations dropdown -->
          <ul
            v-if="filteredRecommendations.length > 0 && showRecommendations"
            class="absolute z-10 w-full bg-white border border-gray-200 rounded shadow-md mt-1 max-h-40 overflow-auto"
          >
            <li
              v-for="(rec, index) in filteredRecommendations"
              :key="index"
              @click="selectRecommendation(rec)"
              class="px-3 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {{ rec }}
            </li>
          </ul>
        </div>

        <!-- Buttons in horizontal layout with spacing -->
        <div class="flex space-x-4 justify-center">
          <BaseButton type="button" @click="submitText"> Enter </BaseButton>

          <BaseButton type="button" @click="goToComparePage"
            >Compare Text</BaseButton
          >
        </div>

        <!-- Text display -->
        <TextDisplay :text="inputText" class="mt-4" />
      </div>

      <!-- Submitted texts list -->
      <div v-if="submittedTexts.length > 0" class="mt-6">
        <h3 class="text-lg font-medium mb-2">Submitted Texts</h3>
        <ul class="space-y-2">
          <li
            v-for="(text, index) in submittedTexts"
            :key="index"
            class="flex justify-between items-center p-2 bg-gray-50 rounded"
          >
            <span>{{ text }}</span>
            <BaseButton type="button" @click="deleteText(index)">
              Delete
            </BaseButton>
          </li>
        </ul>
      </div>
    </div>
    <ConfirmationModal
      :show="showConfirmModal"
      :title="'Confirmation'"
      :message="`The text '${inputText}' is already present in the store. Do you still want to add it?`"
      @confirm="handleConfirmAdd"
      @cancel="handleCancelAdd"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import BaseButton from "./BaseButton.vue";
import BaseInput from "./BaseInput.vue";
import TextDisplay from "./TextDisplay.vue";
import EventBus from "../eventBus.js";
import IndexRetriever from "./IndexRetriever.vue";
import ConfirmationModal from "./ConfirmationModel.vue";
import { fetchCachedUsers } from "../utilities/users";
// shub patel

export default {
  name: "TextInput",
  components: {
    BaseButton,
    BaseInput,
    TextDisplay,
    IndexRetriever,
    ConfirmationModal,
  },
  props: {
    initialText: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      inputText: this.initialText,
      showConfirmModal: false,
      loading: false,
      error: null,
      showRecommendations: false,
    };
  },
  //beforeMount also works , but beforeMount is used when we need to tweek data right before
  // rendering  , but we are performing side effects and changing the component state by
  // listening to gloabl events .
  async created() {
    EventBus.$on("text-to-add", (text) => {
      this.inputText = text;
    });
    EventBus.$on("text-retrieved", (text) => {
      this.inputText = text;
    });
    try {
      this.users = await fetchCachedUsers();
    } catch (e) {
      console.log("error");
    }
    this.users.forEach((user) => {
      if (user?.name) {
        this.addText(user.name);
      }
    });
  },
  watch: {
    inputText() {
      this.showRecommendations = true; // show dropdown when typing
    },
  },

  // Whenever the store's state changes, this computed property will automatically update
  computed: {
    ...mapGetters("text", {
      submittedTexts: "getAllTexts",
    }),
    filteredRecommendations() {
      if (!this.inputText) return [];
      const inputLower = this.inputText.toLowerCase();
      return this.submittedTexts.filter(
        (text) => text.toLowerCase().includes(inputLower),
        // text.toLowerCase() !== inputLower,
      );
    },

    // submittedTexts(){
    //   return this.$store.getters.getAllTexts()
    // }
  },

  // Reactivity to External Changes:  we are using watcher here bcoz we need side effetc when the prop
  //  value changes , computed don't perform side effects , methods don't even run when the props changes
  // we need to explicity run the methods
  //approach - 1 - query params
  // watch: {
  //   initialText(newValue) {
  //     this.inputText = newValue;
  //   },
  // },
  methods: {
    ...mapActions("text", ["addText", "removeText"]),
    ...mapMutations("text", ["REMOVE_TEXT"]),
    goToComparePage() {
      this.$router.push("/compare");
    },
    selectRecommendation(rec) {
      this.inputText = rec;
      this.showRecommendations = false;
    },
    submitText() {
      if (this.inputText.trim()) {
        const textExists = this.submittedTexts.some(
          (text) => text.toLowerCase() === this.inputText.toLowerCase(),
        );
        if (textExists) {
          // Text already exists
          this.showConfirmModal = true;
        }
        // this.$store.dispatch("text/addText", this.inputText);
        // this.$store.commit('ADD_TEXT', this.inputText);
        // performing direct mutation directly  - not recommended due to code redundancy ,
        //  no central logic , code maintance becomes tough as application grows
        else {
          this.addText(this.inputText);
          this.inputText = "";
        }
      }
    },
    deleteText(index) {
      //commiting mutations directly
      this.REMOVE_TEXT(index);
      // this.$store.commit("text/REMOVE_TEXT", index);
      // - using mapActions keeps the code clean
      // this.removeText(index);
      // this.$store.dispatch("text/removeText", index);
    },
    handleConfirmAdd() {
      this.addText(this.inputText);
      this.inputText = "";
      this.showConfirmModal = false;
    },
    handleCancelAdd() {
      (this.showConfirmModal = false),
        (this.resultMessage = "Storing to store operation was canceled"),
        (this.messageType = "info");
    },
  },
  beforeDestroy() {
    // Clean up the event listener when the component is destroyed
    EventBus.$off("text-to-add");
    EventBus.$off("text-retrieved");
  },
};
</script>
