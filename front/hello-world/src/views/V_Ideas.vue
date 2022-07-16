<template>
  <div id="V_Ideas">
    <H1>Идеи</H1>
    <div>
      <div class="ideas">
        <button @click="goToCreate" class="btn2">Создать идею</button>
      </div>
      <div class="idea2">
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
  /* -moz-osx-font-smoothing: grayscale; */
  text-align: center;
  color: #2c3e50;
  margin: 60px auto;
  width: 400px;
}

.idea:nth-child(3n - 1) {
  border: 1px solid #ccc;
  border-radius: 30px;
  box-shadow: 0 5px 45px #d5f3ee;
  margin-right: 5%;
  margin-left: 5%;
}
/* .projects {
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 1rem;
} */

.arch {
  border: 1px solid #ccc;
  border-radius: 30px;
  margin-bottom: 1rem;
  box-shadow: 0 5px 45px #d5f3ee;
  margin-right: 5%;
  margin-left: 5%;
}
.ideas {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
}
.btn2 {
  border: none;
  background: none;
  box-sizing: border-box;
  font-family: 'Inter';
  font-style: normal;
  font-size: 20px;
  line-height: 24.2px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 15px 25px;
  gap: 10px;

  width: 250px;
  height: 36px;

  background: #d5f3ee;
  border: 1px solid #000000;
  border-radius: 30px;

  transition: color 0.2s linear;
}

.btn3 {
  padding: 5px;
  background: #d5f3ee;
  border: 1px solid #000000;
  gap: 10px;
  border-radius: 30px;
  margin-bottom: 10px;
}
</style>
