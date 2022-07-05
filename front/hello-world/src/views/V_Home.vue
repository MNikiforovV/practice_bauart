<template>
  <div class="position-absolute top-50 start-50 translate-middle">
    <h1>
      <p class="text-center">Добро пожаловать!</p>
    </h1>
  </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios';
export default {
  name: "V_Home",
  methods: {
    beforeMount() {
      axios.get(`${server.baseURL}/user/profile`, this.cookie)
        .then((res) => {
          router.push('/')
        })
    }
  }
}


</script>
<style>
</style>
