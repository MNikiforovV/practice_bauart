<template>
  <div class="position-absolute top-50 start-50 translate-middle">
    <div>
      <Form @submit.prevent="createbtn">
        <button class="btn btn-primary">
          Создать проект
        </button>
      </Form>
    </div>
    <h1>
      <p class="text-center">{{ info }}</p>
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
    async createbtn() {
      router.push('/project');
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
