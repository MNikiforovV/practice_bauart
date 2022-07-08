<template>
  <div id="V_Ideas">
    <button @click="goToCreate" class="btn btn-primary">Создать идею</button>
    <div class="idea" v-for="idea in infoIdeas" :key="idea.slug">
      <p align="left">Название идеи: {{ idea.title }}</p>
      <!-- <router-link class="navbar-brand" to="/project/:slug/ideas/:slug">{{ idea.title }}</router-link> -->
      <button type="button" @click="goInIdea(idea.slug)">
        Войти
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  computed: {
    ...mapState('idea', ['infoIdeas']),
  },
  methods: {
    ...mapActions('idea', ['updateIdea']),
    ...mapActions('idea', ['getIdeaBySlug']),
    ...mapActions('idea', ['getAllIdeas']),

    async goToCreate() {
      const slug = this.$route.params.slug;
      this.$router.push('/project/' + slug + '/idea/create');
    },
     async goInIdea(slugIdea) {
      const slug = this.$route.params.slug;
      console.log(slugIdea)
      // const info1 = await this.getIdeaBySlug({slug, slugIdea});
      this.$router.push('/project/' + slug + '/idea/' + slugIdea);
    },
    
  },

  async mounted() {
    const slug = this.$route.params.slug;
    console.log(slug);
    // const info1 = await this.getIdeaBySlug(slug);
    // this.getAllIdeas(info1);
    this.getAllIdeas(slug);
    // if (info1) {
    //   this.info = info1;
    // }
  },
};
</script>

<style>
#V_Ideas   {
  font-family: 'Avenir', Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
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
