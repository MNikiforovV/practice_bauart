<template>
  <div id="V_Profile">
    <div class="projectss">
      <div class="left">
        <h3>Ваши проекты:</h3>
      <div
        class="authorProject"
        v-for="(project, key) in authorProjects"
        :key="key"
      >
        <p align="left">Название проекта: {{ project.title }}</p>
        <p align="left">Содержание проекта: {{ project.content }}</p>
        <!-- <p align="left">Автор проекта: {{ project.author }}</p> -->
      </div>
      </div>
      <div class="right">
        <h3>Проекты на которые вы подписаны:</h3>
      <div
        class="subscriberProject"
        v-for="(project, key) in subscriberProjects"
        :key="key"
      >
        <p align="left">Название проекта: {{ project.title }}</p>
        <p align="left">Содержание проекта: {{ project.content }}</p>
        <!-- <p align="left">Автор проекта: {{ project.author }}</p> -->
      </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { mapState, mapActions } from 'vuex';
export default {
  computed: {
    ...mapState('project', ['userProjects']),
    authorProjects() {
      if (this.userProjects) {
        return this.userProjects.authorProjects;
      } else {
        return [];
      }
    },
    subscriberProjects() {
      if (this.userProjects) {
        return this.userProjects.subscriberProjects;
      } else {
        return [];
      }
    },
  },
  methods: {
    ...mapActions('project', ['getUserProjects']),
  },
  async mounted() {
    await this.getUserProjects();
  },
};
</script>


<style src=@/style/Profile.css>
</style>
