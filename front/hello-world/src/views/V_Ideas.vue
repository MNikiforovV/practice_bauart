<template>
  <div id="V_Ideas">
    <div class="projects">

    </div>
    <div class="ideas">
      <button @click="goToCreate" class="btn btn-primary">Создать идею</button>
      <div class="idea" v-for="idea in infoIdeas" :key="idea.slug">
        <p align="left">Название идеи: {{ idea.title }}</p>
        <!-- <router-link class="navbar-brand" to="/project/:slug/ideas/:slug">{{ idea.title }}</router-link> -->
        <button type="button" @click="goInIdea(idea.slug)">Войти</button>
      </div>
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
      const disId = this.$route.params.disId;
      console.log(disId);
      // const info1 = await this.getIdeaBySlug({slug, slugIdea});
      this.$router.push('/project/' + slug + '/idea/' + slugIdea, disId);
    },
  },

  async mounted() {
    const slug = this.$route.params.slug;
    console.log(slug);
    this.getAllIdeas(slug);
  },
};
</script>

<style>
#V_Ideas {
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
.projects {
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 1rem;
}
</style>
