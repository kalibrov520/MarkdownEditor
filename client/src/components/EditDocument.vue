<template>
    <div v-if="documents.currentDocument">
        <DocumentForm :doc="this.documents.currentDocument" @submitted="updateCurrentDocument"/>
    </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import DocumentForm from './DocumentForm.vue'

  export default {
    name: 'EditDocument',
    components: {
      DocumentForm
    },
    computed: {
      ...mapState(['documents'])
    },
    methods: {
      ...mapActions(['updateCurrentDocument'])
    }
  }
</script>

<style scoped>

</style>