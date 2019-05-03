export default {
  state: {
    titleText: '',
    contentText: '',
  },
  mutations: {
    UPDATE_TITLE_TEXT: (state, text) => {
      state.titleText = text;
    },
    UPDATE_CONTENT_TEXT: (state, text) => {
      state.contentText = text;
    },
  },
  actions: {
    resetForm: ({commit}) => {
      commit('UPDATE_TITLE_TEXT', '');
      commit('UPDATE_CONTENT_TEXT', '');
    }
  }
};
