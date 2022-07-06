<template>
  <div id="V_Home">
    <div></div>
    <Form @submit.prevent="createbtn">
      <button class="btn btn-primary">Создать проект</button>
    </Form>
    <div class="project" v-for="project in info" :key="project.slug">
      <p align="left">Название проекта: {{ project.title }}</p>
      <p align="left">Описание проекта: {{ project.content }}</p>
      <p align="left">Автор проекта: {{ project.author.name }}</p>

      <!-- <Form @submit.prevent="deletebtn"> -->
      <!-- <button class="btn btn-danger">Удалить проект</button> -->
      <button type="button" @click="deleteProject(project.slug)">
        Удалить проект
      </button>
      <!-- <button type="button" @click="updateProject(project.slug)">Изменить проект</button> -->
      <form @submit.prevent="createbtn">
        <button type="submit">Изменить проект</button>
      </form>
      <!-- </Form> -->
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import router from '@/router';
import axios from 'axios';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'V_Home',
  computed: {
    ...mapState('project', ['info']),
  },
  data() {
    return {
      slug: {},
    };
  },
  methods: {
    ...mapActions('project', ['viewAllProject']),
    ...mapActions('project', ['deleteProject']),
    async createbtn() {
      router.push('/project');
    },
    // async deletebtn() {
    //   await this.deleteProject(this.slug);
    // },
    // beforeMount() {
    //   axios.get(`${server.baseURL}/user/profile`, this.cookie)
    //     .then((res) => {
    //       router.push('/')
    //     })
    // },
  },
  async mounted() {
    await this.viewAllProject();
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

.project {
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 1rem;
}
</style>
