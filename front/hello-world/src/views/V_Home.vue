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
      <div v-if="project.author.email == UserEmail || UserRole == 'Admin'">
        <button type="button" @click="editProject(project.slug)">
          Изменить проект
        </button>
      </div>
      <button
        v-if="infoUser"
        type="button"
        @click="subForProject(project.slug)"
      >
        Подписаться
      </button>
      <button type="button" @click="unSubForProject(infoUser.subscribed.id)">
        Отписаться
      </button>
      <button type="button" @click="goToIdeas(project.slug)">
        Перейти к идеям
      </button>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'V_Home',
  computed: {
    ...mapState('project', ['info']),
    ...mapState('user', ['infoUser']),
    ...mapState('project', ['infoSub']),
    ...mapState('project', ['infoUnSub']),

    UserRole() {
      if (this.infoUser) {
        return this.infoUser.role;
      } else {
        return [];
      }
    },
    UserEmail() {
      if (this.infoUser) {
        return this.infoUser.email;
      } else {
        return [];
      }
    },
  },

  methods: {
    ...mapActions('project', ['viewAllProject']),
    ...mapActions('user', ['getInfoN']),
    ...mapActions('project', ['subForProject']),
    ...mapActions('project', ['unSubForProject']),

    async createbtn() {
      this.$router.push('/project');
    },
    async editProject(slug) {
      this.$router.push('/project/' + slug);
    },
    async goToIdeas(slug) {
      this.$router.push('/project/' + slug + '/idea/');
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
    await this.getInfoN();
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
