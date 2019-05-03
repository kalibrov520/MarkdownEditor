<template>
    <div id="container">
        <div id="left">
            <DocumentsList/>
            <div id="newDocumentLink">
                <router-link to="/new">New Document</router-link>
            </div>
        </div>
        <div id="right">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
  import DocumentsList from './components/DocumentsList.vue'

  export default {
    name: 'app',
    components: {
      DocumentsList
    },
  }

</script>

<style>

    html {
        height: 100%;
        font-family: 'Helvetica Neue', Arial, sans-serif;
    }

    body {
        background-color: #EFEFEF;
        margin: 0;
        height: 100%;
    }

    #container {
        display: flex;
        height: 100%;
    }

    #left {
        flex: 1;
    }

    #left, #right {
        padding: 10px;
    }

    #right {
        flex: 4 0 0;
        background-color: #E9E9E9;
    }

    #newDocumentLink {
        padding: 20px;
        background: #fbfbfb;
    }
</style>
