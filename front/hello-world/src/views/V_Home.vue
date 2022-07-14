<template>
  <div id="V_Home">
    <h1>Проекты</h1>
    <Form class="formBtn" @submit.prevent="createbtn">
      <button class="btn">Создать проект</button>
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
import { mapState, mapActions } from 'vuex';
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
  margin: 0 auto;
  max-width: 1600px;
  width: 100%;
}
.projects {
  display: flex;
  flex-wrap: wrap;
  /* gap: calc(10% / 3); */
  /* padding: 5px; */
}

.btn {
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

  width: 341px;
  height: 36px;

  background: #d5f3ee;
  border: 1px solid #000000;
  border-radius: 30px;

  transition: color 0.2s linear;
  margin-bottom: 10px;
}

.formBtn {
  display: flex;
  justify-content: center;
  margin-bottom: 60px;
}


</style>
