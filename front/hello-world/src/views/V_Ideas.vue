<template>
  <div id="V_Ideas">
    <div  ></div>
    <div class="ideas">
      <button @click="goToCreate" class="btn btn-primary">Создать идею</button>
      <div class="idea">
        <idea v-for="idea in infoIdeas" :key="idea.slug" :idea="idea"> </idea>
      </div>
      <h1>Архив</h1>
      <div class="arch">
        <div v-for="(idea, key) in archivedIdeas()" :key="key">
          <p>{{ idea.title }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import idea from '@/components/Ideas.vue';

export default {
  components: {
    idea,
  },
  computed: {
    ...mapState('idea', ['infoIdeas']),
  },
  methods: {
    ...mapActions('idea', [
      'updateIdea',
      'getIdeaBySlug',
      'getAllIdeas',
      'archiveIdea',
    ]),
    ...mapState('user', ['userInfo']),

    archivedIdeas() {
      if (this.infoIdeas == null) return [];
      const archived = this.infoIdeas.filter(
        (Element) => Element.isArchived == true,
      );
      return archived;
    },
    async goToCreate() {
      const slug = this.$route.params.slug;
      this.$router.push('/project/' + slug + '/idea/create');
    },
  },
  async mounted() {
    const slug = this.$route.params.slug;
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
/* .projects {
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 1rem;
} */

.arch {
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 1rem;
}
</style>
