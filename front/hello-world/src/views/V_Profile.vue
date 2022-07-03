<template>
  <div class="position-absolute top-50 start-50 translate-middle">
    <h1>
      <p class="text-center">Профиль</p>
    </h1>
  </div>
</template>

<script>
/* eslint-disable */
import router from '@/router/index.js';
import instance from '../components/Instance.js';
export default {
  name: 'V_Profile',
  methods: {},
  mounted() {
    try {
      instance.get('auth/isloggedin');
    } catch (error) {
      console.log(error);
      this.$router.push('/auth');
    }
  },
};
</script>
<style></style>
