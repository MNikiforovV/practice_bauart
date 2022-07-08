<template>
  <div id="V_Idea">
    <div class="idea">
      <p align="left">Название идеи: {{ infoIdeas.title }}</p>
      <p align="left">Описание идеи: {{ infoIdeas.content }}</p>
      <button @click="editIdea" class="btn btn-primary">Изменить</button>
      <button @click="deleteIdeas" class="btn btn-danger">Удалить</button>
    </div>
    <div class="donate"></div>
    <div class="chat"></div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState('idea', ['infoIdeas']),
  },
  methods: {
    ...mapActions('idea', ['getIdeaBySlug']),
    ...mapActions('idea', ['deleteIdea']),
    async editIdea() {
      const slug = this.$route.params.slug;
      const slugIdea = this.$route.params.slugIdea;
      this.$router.push('/project/' + slug + '/idea/' + slugIdea + '/update');
    },
    async deleteIdeas() {
      const slug = this.$route.params.slug;
      const slugIdea = this.$route.params.slugIdea;
      await this.deleteIdea({ slug, slugIdea });
      this.$router.push('/project/' + slug + '/idea/');
    },
  },
  async mounted() {
    const slug = this.$route.params.slug;
    const slugIdea = this.$route.params.slugIdea;
    this.getIdeaBySlug({ slug, slugIdea });
  },
};
</script>

<style>
#V_Idea {
  font-family: 'Avenir', Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 60px auto;
  width: 400px;
}

.idea {
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 1rem;
}
</style>
