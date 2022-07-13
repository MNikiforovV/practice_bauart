<template>
  <div class="project">
    <p align="left">Название проекта: {{ project.title }}</p>
    <p align="left">Описание проекта: {{ project.content }}</p>
    <p align="left">Автор проекта: {{ project.author.name }}</p>
    <div v-if="project.author.email == UserEmail || UserRole == 'Admin'">
      <button type="button" @click="editProject(project.slug)">
        Изменить проект
      </button>
    </div>
    <div v-if="project.author.email != UserEmail">
      <button v-if="IsSubscribed" type="button" @click="unSubForProject(project.slug)">
        Отписаться
      </button>
      <button v-else type="button" @click="subForProject(project.slug)">
        Подписаться
      </button>
    </div>
    <button type="button" @click="goToIdeas(project.slug)">Войти</button>
  </div>
</template>

<script>
import project from '@/store/modules/project';
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapState('user', ['userInfo']),
    ...mapGetters('project', ['subscribedProjects']),

    IsSubscribed() {
      let status = false;
      this.subscribedProjects.forEach((element) => {
        if (element.slug === this.project.slug) {
          status = true;
        }
      });
      return status;

    },

    UserRole() {
      if (this.userInfo) {
        return this.userInfo.role;
      } else {
        return {};
      }
    },
    UserEmail() {
      if (this.userInfo) {
        return this.userInfo.email;
      } else {
        return {};
      }
    },
  },
  methods: {
    ...mapActions('project', ['subForProject']),
    ...mapActions('project', ['unSubForProject']),
    ...mapActions('project', ['getAuthorAndSubs']),

     async editProject(slug) {
      this.$router.push('/project/' + slug);
    },
    async goToIdeas(slug) {
      this.$router.push('/project/' + slug + '/idea/');
    },
  },
  name: 'Project',
  props: {
    project: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style>
.project {
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 1rem;
}
</style>
