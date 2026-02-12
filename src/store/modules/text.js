import { fetchCachedUsers } from "../../utilities/users";
export default {
  namespaced: true,

  state: {
    submittedTexts: [],
    apiDataLoaded: false,
    users: [],
    loading: false,
    error: null,
  },

  mutations: {
    ADD_TEXT(state, text) {
      state.submittedTexts.push(text);
    },
    REMOVE_TEXT(state, index) {
      state.submittedTexts.splice(index, 1);
    },
    UPDATE_TEXT(state, { index, newValue }) {
      state.submittedTexts.splice(index, 1, newValue);
    },
    SET_API_LOADED(state, value) {
      state.apiDataLoaded = value;
    },
    SET_USERS(state, users) {
      state.users = users;
    },

    SET_LOADING(state, value) {
      state.loading = value;
    },

    SET_ERROR(state, error) {
      state.error = error;
    },
  },

  actions: {
    addText({ commit }, text) {
      commit("ADD_TEXT", text);
    },

    async fetchUsers({ commit }, forceRefresh = false) {
      commit("SET_LOADING", true);
      commit("SET_ERROR", null);

      try {
        const users = await fetchCachedUsers(forceRefresh);
        commit("SET_USERS", users);
      } catch (e) {
        commit("SET_ERROR", "Failed to load users");
      } finally {
        commit("SET_LOADING", false);
      }
    },

    // removeText({ commit }, index) {
    //   commit("REMOVE_TEXT", index);
    // },
  },

  getters: {
    getAllTexts: (state) => state.submittedTexts,
    isApiDataLoaded: (state) => state.apiDataLoaded,
    users: (state) => state.users,
    loading: (state) => state.loading,
    error: (state) => state.error,
  },
};
