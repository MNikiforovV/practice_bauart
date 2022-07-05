<template>
  <div class="position-absolute top-50 start-50 translate-middle">
    <div>
      <Form @submit.prevent="createbtn">
        <button class="btn btn-primary">Создать проект</button>
      </Form>
      <Form @submit.prevent="deletebtn" v-if="info.title != null">
        <button class="btn btn-primary">Удалить проект</button>
      </Form>
    </div>
    <h1>
      <p class="text-center">Название проекта: {{ info.title }}</p>
      <p class="text-center">Описание проекта: {{ info.content }}</p>
      <p class="text-center">Автор проекта: {{ info.author.name }}</p>
    </h1>
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
  methods: {
    ...mapActions('project', ['viewAllProject']),
    ...mapActions('project', ['deleteProject']),
    async createbtn() {
      router.push('/project');
    },
    async deletebtn() {
      await this.deleteProject();
    },
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
<style></style>
