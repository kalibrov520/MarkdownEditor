<template>
    <div id="markdownForm">
        <label>
            <input id="titleInput" type="text" v-model="editingTitle">
        </label>
        <div id="editor">
            <div id="markdownEditor">
                <label>
                    <textarea id="markdownInput" v-model="editingMarkdown"></textarea>
                </label>
            </div>
            <div id="markdownPreview">
                <div v-html="compiledMarkdown"></div>
            </div>
        </div>
        <button v-on:click="saveForm" id="submitButton">Submit</button>
    </div>
</template>

<script>
  import marked from 'marked'
  import {mapMutations, mapState} from 'vuex'

  export default {
    name: 'DocumentForm',
    props: ['doc'],
    methods: {
      ...mapMutations(['UPDATE_CONTENT_TEXT', 'UPDATE_TITLE_TEXT']),
      saveForm() {
        this.$emit('submitted', {title: this.editingTitle, content: this.editingMarkdown})
      }
    },
    computed: {
      ...mapState(['form']),
      editingMarkdown: {
        get() {
          return this.form.contentText
        },
        set(value) {
          this.UPDATE_CONTENT_TEXT(value)
        }
      },
      editingTitle: {
        get() {
          return this.form.titleText
        },
        set(value) {
          this.UPDATE_TITLE_TEXT(value)
        }
      },
      compiledMarkdown() {
        return marked(this.form.contentText)
      }
    },
    watch: {
      doc: {
        immediate: true,
        handler(newVal) {
          this.UPDATE_CONTENT_TEXT(newVal.content);
          this.UPDATE_TITLE_TEXT(newVal.title);
        }
      },
    }
  }
</script>

<style scoped>

    #editor {
        display: flex;
        flex-direction: row;
        height: 500px;
    }

    #markdownEditor {
        flex: 1 0 0;
    }

    #markdownPreview {
        background-color: #fefefe;
        padding: 0 12px;
        margin-left: 12px;
        flex: 1 0 0;
        overflow: scroll;
    }

    #markdownInput {
        display: inline-block;
        height: 100%;
        width: 100%;
        vertical-align: top;
        box-sizing: border-box;
        border: none;
        border-right: 1px solid #ccc;
        resize: none;
        outline: none;
        background-color: #f6f6f6;
        font-size: 14px;
        font-family: 'Monaco', courier, monospace;
        padding: 20px;
    }

    #titleInput {
        width: 100%;
        vertical-align: top;
        box-sizing: border-box;
        border: none;
        border-right: 1px solid #ccc;
        resize: none;
        outline: none;
        background-color: #f6f6f6;
        font-size: 1.5em;
        padding: 8px;
        margin-bottom: 12px;
    }

    #submitButton {
        border: none;
        margin-top: 20px;
        padding: 5px;
        text-transform: uppercase;
        font-size: 1.2em;
        background: #1d1d1d;
        color: #f9f9f9;
        cursor: pointer;
    }
</style>