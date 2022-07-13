<template>
  <div id="V_Profile">
    <div>
      <p>Ваши проекты: </p>
      <div class="project" v-for="(project, key) in authorProjects" :key="key">
        <p align="left">Название проекта: {{ project.title }}</p>
        <p align="left">Содержание проекта: {{ project.content }}</p>
        <!-- <p align="left">Автор проекта: {{ project.author }}</p> -->
      </div>
      <p>Проекты на которые вы подписаны:</p> 
      <div class="project" v-for="(project, key) in subscriberProjects" :key="key">
        <p align="left">Название проекта: {{ project.title }}</p>
        <p align="left">Содержание проекта: {{ project.content }}</p>
        <!-- <p align="left">Автор проекта: {{ project.author }}</p> -->
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { mapState, mapActions } from 'vuex';
export default {
  computed: {
    ...mapState('project', ['projectInfo']),
    authorProjects() {
      if (this.info) {
        return this.info.authorProjects;
      } else {
        return [];
      }
    },
    subscriberProjects() {
      if (this.info) {
        return this.info.subscriberProjects;
      } else {
        return [];
      }
    },
  },
  methods: {
    ...mapActions('project', ['getProjectsInfo']),
  },
  async mounted() {
    await this.getInfo();
  },
};
</script>

<style>
#V_Profile {
  font-family: 'Avenir', Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 60px auto;
  width: 400px;
}

.project {
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 1rem;
}
</style>
