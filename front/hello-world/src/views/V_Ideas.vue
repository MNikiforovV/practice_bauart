<template>
  <div id="V_Ideas">
    <div class="projects"></div>
    <div class="ideas">
      <button @click="goToCreate" class="btn btn-primary">Создать идею</button>
      <div class="idea" v-for="idea in infoIdeas" :key="idea.slug">
        <p align="left">Название идеи: {{ idea.title }}</p>
        <button type="button" @click="goInIdea(idea.slug)">Войти</button>
        <button
          v-if="idea.isArchived == false"
          @click="archiveIde(idea.slug)"
          type="button"
        >
          Архивировать
        </button>
        <button
          v-if="idea.isArchived == true"
          @click="archiveIde(idea.slug)"
          type="button"
        >
          Разархивировать
        </button> <!-- нет бэка -->
      </div>
      <h1>Архив</h1>
      <div class="arch">
        <div v-for="(idea, key) in archivedIdeas" :key="key">
          <p>{{ idea.title }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  computed: {
    ...mapState('idea', ['infoIdeas']),

    UserRole() {
      if (this.infoUser) {
        return this.infoUser.role;
      } else {
        return [];
      }
    },
    archivedIdeas() {
      if (this.infoIdeas == null) return [];
      const archived = this.infoIdeas.filter(
        (Element) => Element.isArchived == true,
      );
      return archived;
    },
  },
  methods: {
    ...mapActions('idea', ['updateIdea', 'getIdeaBySlug', 'getAllIdeas', 'archiveIdea']),
    ...mapState('user', ['infoUser']),

    async goToCreate() {
      const slug = this.$route.params.slug;
      this.$router.push('/project/' + slug + '/idea/create');
    },
    async archiveIde(slugIdea) {
      const slug = this.$route.params.slug;
      // const slugIdea = this.$route.params.slugIdea;
      await this.archiveIdea({ slug, slugIdea });
      const idea = this.infoIdeas.find((element) => slugIdea === element.slug);
      idea.isArchived = true;
      // this.$router.push('/project/' + slug + '/idea/' + slugIdea);
    },

    async goInIdea(slugIdea) {
      const slug = this.$route.params.slug;
      // const info1 = await this.getIdeaBySlug({slug, slugIdea});
      this.$router.push('/project/' + slug + '/idea/' + slugIdea);
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

.arch {
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 1rem;
}
</style>
