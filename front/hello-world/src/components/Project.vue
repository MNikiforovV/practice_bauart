<template>
  <div class="project">
    <p align="left">Название проекта: {{ project.title }}</p>
    <p align="left">Описание проекта: {{ project.content }}</p>
    <p align="left">Автор проекта: {{ project.author.name }}</p>
    <div class="big">
      <div v-if="project.author.email == UserEmail || UserRole == 'Admin'">
        <button class="btn1" type="button" @click="editProject(project.slug)">
          Изменить проект
        </button>
      </div>
      <div v-if="project.author.email != UserEmail">
        <button
          class="btn1"
          v-if="IsSubscribed"
          type="button"
          @click="unSubForProject(project.slug)"
        >
          Отписаться
        </button>
        <button
          class="btn1"
          v-else
          type="button"
          @click="subForProject(project.slug)"
        >
          Подписаться
        </button>
      </div>
      <button class="btn1" type="button" @click="goToIdeas(project.slug)">
        Войти
      </button>
    </div>
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
  border-radius: 30px;
  margin-top: 1rem;
  box-shadow: 0 5px 45px #d5f3ee;
  width: 30%;
  /* padding: 10px; */

  /* justify-content: center; */
}
.project:nth-child(3n - 1){
  margin-right: 5%;
  margin-left: 5%;
} 

.big {
  display: flex;
  flex-direction: row;
  gap: 5px;
  justify-content: space-between;
  max-width: 80%;
  margin: 0 auto;
}

.btn1 {
  padding: 5px;
  background: #D5F3EE;
	border: 1px solid #000000;
  gap: 10px;
  border-radius: 30px;

}
</style>
