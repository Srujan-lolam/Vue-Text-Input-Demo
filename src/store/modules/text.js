export default {
  namespaced: true,

  state: {
    submittedTexts: [],
  },

  mutations: {
    ADD_TEXT(state, text) {
      state.submittedTexts.push(text);
    },
    REMOVE_TEXT(state, index) {
      state.submittedTexts.splice(index, 1);
    },
  },

  actions: {
    addText({ commit }, text) {
      commit("ADD_TEXT", text);
    },

    // removeText({ commit }, index) {
    //   commit("REMOVE_TEXT", index);
    // },
  },

  getters: {
    getAllTexts: (state) => state.submittedTexts,
  },
};
