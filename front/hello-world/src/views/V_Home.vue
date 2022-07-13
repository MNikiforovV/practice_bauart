<template>
  <div id="V_Home">
    <Form @submit.prevent="createbtn">
      <button class="btn btn-primary">Создать проект</button>
    </Form>
    <div class="projects">
      <Project
        v-for="project in allProjects"
        :key="project.slug"
        :project="project"
      >
      </Project>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { mapState, mapActions, mapGetters } from 'vuex';
import Project from '@/components/Project.vue';

export default {
  name: 'V_Home',
  components: {
    Project,
  },
  computed: {
    ...mapState('project', ['allProjects']),

  },

  methods: {
    ...mapActions('project', ['getAllProject', 'getUserProjects']),
    async createbtn() {
      this.$router.push('/project');
    },
   
  },
  async mounted() {
    await this.getAllProject();
    await this.getUserProjects();
  },
};
</script>
<style>
#V_Home {
  font-family: 'Avenir', Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 60px auto;
  width: 400px;
}


</style>
