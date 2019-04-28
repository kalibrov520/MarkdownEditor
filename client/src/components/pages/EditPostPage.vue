<template lang="pug">
  section.edit
    h1
      | edit post
    form( @submit.prevent="editPost()" )
      div
        input( type="text", name="title", id="title", placeholder="Title", v-model.trim="post.title" )
      div
        input( type="text", name="description", id="description", placeholder="Description", v-model.trim="post.description" )
      div
        button( type="submit", name="editPost" )
          | edit post
    div
      router-link( :to="{ name: 'Posts' }" )
        | go to list of posts
</template>

<script>
/* eslint-disable */
import PostsService from "@/services/PostsService";
export default {
  name: "EditPostPage",
  data() {
    return {
      post: {
        title: "",
        description: ""
      }
    };
  },
  methods: {
    async getPost() {
      const response = await PostsService.getPost({
        id: this.$route.params.id
      });
      this.post.title = response.data.title;
      this.post.description = response.data.description;
    },
    async editPost() {
      if (this.post.title !== "" && this.post.description !== "") {
        await PostsService.updatePost({
          id: this.$route.params.id,
          title: this.post.title,
          description: this.post.description
        });
        this.$router.push({ name: "Posts" });
      }
    }
  },
  mounted() {
    this.getPost();
  }
};
</script>
