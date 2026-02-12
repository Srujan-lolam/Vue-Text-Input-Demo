<!-- src/components/UserList.vue -->
<template>
  <div class="bg-white rounded-lg shadow-md p-6 mt-4">
    <h2 class="text-xl font-bold mb-4">User Directory</h2>

    <div v-if="loading" class="text-center py-4">
      <p>Loading users...</p>
    </div>

    <div v-else-if="error" class="text-red-500 p-4">
      {{ error }}
    </div>

    <div v-else>
      <div>
        <BaseInput
          v-model="searchTerm"
          placeholder="Search users..."
          class="w-full mb-2"
        />
      </div>
      <BaseButton class="ml-80 mb-2" type="button" @click="loadUsers(true)"
        >Fetch Latest</BaseButton
      >

      <div class="space-y-3">
        <div
          v-for="user in filteredUsers"
          :key="user.id"
          class="border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
        >
          <div class="flex justify-between">
            <div>
              <h3 class="font-bold text-lg">{{ user.name }}</h3>
              <p class="text-gray-600">{{ user.email }}</p>
            </div>
            <div class="flex items-center space-x-2">
              <BaseButton
                type="button"
                size="sm"
                @click="showUserDetails(user)"
              >
                Details
              </BaseButton>
              <BaseButton type="button" @click="confirmSaveUser(user)">
                Save to Store
              </BaseButton>
            </div>
          </div>

          <div
            v-if="selectedUser && selectedUser.id === user.id"
            class="mt-3 pt-3 border-t border-gray-200"
          >
            <p>
              <span class="font-medium">Username:</span> {{ user.username }}
            </p>
            <p><span class="font-medium">Phone:</span> {{ user.phone }}</p>
            <p><span class="font-medium">Website:</span> {{ user.website }}</p>
            <p>
              <span class="font-medium">Company:</span> {{ user.company.name }}
            </p>
            <p>
              <span class="font-medium">Address:</span>
              {{ user.address.street }}, {{ user.address.city }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <ConfirmationModal
      :show="showConfirmModal"
      title="Save to Store"
      :message="`Do you want to save '${
        userToSave ? userToSave.name : ''
      }' to the store?`"
      @confirm="saveUserToStore"
      @cancel="cancelSaveUser"
    />
  </div>
</template>

<script>
import BaseButton from "./BaseButton.vue";
import BaseInput from "./BaseInput.vue";
import ConfirmationModal from "./ConfirmationModel.vue";
import { mapActions, mapGetters } from "vuex";
import NavigationMixin from "../mixins/HomeNavigation";
export default {
  name: "UserList",
  mixins: [NavigationMixin],
  components: {
    BaseButton,
    BaseInput,
    ConfirmationModal,
  },
  data() {
    return {
      selectedUser: null,
      searchTerm: "",
      userToSave: null,
    };
  },
  computed: {
    ...mapGetters("text", ["users", "loading", "error"]),

    filteredUsers() {
      if (!this.searchTerm) return this.users;
      return this.users.filter((u) =>
        u.name.toLowerCase().includes(this.searchTerm.toLowerCase()),
      );
    },
  },

  async mounted() {
    this.fetchUsers(); // initial load
  },
  methods: {
    ...mapActions("text", ["fetchUsers"]),

    loadUsers(forceRefresh = false) {
      this.fetchUsers(forceRefresh);
      this.$store.commit("text/SET_API_LOADED", false);
    },

    showUserDetails(user) {
      this.selectedUser = this.selectedUser?.id === user.id ? null : user;
    },

    confirmSaveUser(user) {
      this.userToSave = user;
      this.showConfirmModal = true;
    },
    saveUserToStore() {
      if (this.userToSave) {
        this.showConfirmModal = false;
        this.navigateHomeWithText(this.userToSave.name);
      }
    },
    cancelSaveUser() {
      this.showConfirmModal = false;
      this.userToSave = null;
    },
  },
};
</script>
