<template>
    <ul>
        <li v-for="(docPreview, index) in documents.availableDocuments" v-bind:key="index">
            <span v-on:click="selectDocument(docPreview.id)">{{ docPreview.title }}</span>
            <button v-on:click="(e) => deleteDocumentClicked(e, docPreview.id)" class="deleteButton">Delete</button>
        </li>
    </ul>
</template>

<script>
  import {mapActions, mapState} from 'vuex'

  export default {
    name: 'DocumentsList',
    mounted() {
      this.loadDocumentsList()
    },
    computed: mapState(['documents']),
    methods: {
      ...mapActions(['selectDocument', 'loadDocumentsList', 'deleteDocument']),
      deleteDocumentClicked(e, id) {
        e.stopPropagation();
        this.deleteDocument(id);
      }
    }
  }
</script>

<style scoped>

    ul {
        list-style-type: none;
        padding: 0;
    }

    ul li {
        padding: 20px;
        background: white;
        margin-bottom: 8px;
    }

    .deleteButton {
        float: right;
        border: none;
        padding: 5px;
        text-transform: uppercase;
        font-size: 0.8em;
        background: #ff8b90;
        color: #f9f9f9;
        cursor: pointer;
    }
</style>