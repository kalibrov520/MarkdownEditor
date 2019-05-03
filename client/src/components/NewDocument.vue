<template>
    <DocumentForm :doc="{title: '', content: ''}" @submitted="onSubmitted"/>
</template>

<script>
  import {mapActions} from 'vuex'
  import DocumentForm from './DocumentForm.vue'

  export default {
    name: 'NewDocument',
    components: {
      DocumentForm
    },
    methods: {
      ...mapActions(['createNewDocument', 'resetForm']),
      onSubmitted(doc) {
        this.createNewDocument(doc);
        this.resetForm();
      }
    }
  }
</script>

<style scoped>

</style>