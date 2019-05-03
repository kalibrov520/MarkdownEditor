import markdownApi from '../api/markdown'
import router from '../router'

export default {
  state: {
    currentDocument: null,
    availableDocuments: [],
    _loadedDocuments: {}
  },
  mutations: {
    SELECT_DOCUMENT: (state, currentDocument) => {
      state.currentDocument = currentDocument;
    },
    ADD_LOADED_DOCUMENT: (state, {id, document}) => {
      state._loadedDocuments[id] = document;
      if (state.currentDocument) {
        state.currentDocument = state._loadedDocuments[state.currentDocument.id]
      }
    },
    LOAD_DOCUMENTS_LIST: (state, documentPreviews) => {
      state.availableDocuments = documentPreviews;
    }
  },
  actions: {
    selectDocument: async ({state, commit}, documentId) => {
      let doc = state._loadedDocuments[documentId];
      if (!doc) {
        const {data, status} = await markdownApi.get(documentId);
        if (status < 300) {
          doc = data;
          commit('ADD_LOADED_DOCUMENT', {id: documentId, document: doc});
        }
      }
      commit('SELECT_DOCUMENT', doc);
      router.push('edit');
    },
    loadDocumentsList: async ({commit}) => {
      const {status, data} = await markdownApi.get();
      if (status < 300) {
        commit('LOAD_DOCUMENTS_LIST', data);
      }
    },
    updateCurrentDocument: async ({commit, dispatch, state}, doc) => {
      const {status} = await markdownApi.patch(state.currentDocument.id, doc);
      if (status < 300) {
        commit('ADD_LOADED_DOCUMENT', {
          id: state.currentDocument.id,
          document: {
            ...state.currentDocument,
            ...doc
          }
        });
        dispatch('loadDocumentsList');
      }
    },
    createNewDocument: async ({dispatch}, doc) => {
      const {status} = await markdownApi.post('', doc);
      if (status < 300) {
        dispatch('loadDocumentsList');
        router.push('new');
      }
    },
    deleteDocument: async ({dispatch, commit, state}, documentId) => {
      const {status} = await markdownApi.delete(documentId);
      if (status < 300) {
        commit('ADD_LOADED_DOCUMENT', {id: documentId, document: undefined});
        if (state.currentDocument && state.currentDocument.id === documentId) {
          commit('SELECT_DOCUMENT', undefined);
        }
        dispatch('loadDocumentsList');
      }
    }
  },
};
