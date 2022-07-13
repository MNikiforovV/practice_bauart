<template>


  <header class="header">
    <div class="container_head">
      <div class="header-inner">

        <router-link class="logo active" to="/">
          <div class="logo">Foedus</div>
        </router-link>

        <nav class="nav">
          <router-link class="nav-link" to="/register">
            <a class="nav-link" href="">Регистрация</a>
          </router-link>
          <router-link class="nav-link" v-if="isLoggedIn" to="/register">
            <a class="nav-link" href="#">Личный кабинет</a>
          </router-link>
          <router-link class="nav-link" v-if="!isLoggedIn" to="/auth">
            <a class="nav-link" href="#">Авторизация</a>
          </router-link>
          <div class="nav-link" v-if="isLoggedIn" @click="logout">
            <a class="nav-link" href="#">Выйти</a>
          </div>

        </nav>

      </div>
    </div>

  </header>

</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters('user', ['isLoggedIn']),
  },

  methods: {
    ...mapActions('user', ['logoutUser']),
    async logout() {
      await this.logoutUser();
      this.$router.push('/auth');
    },
  },
};
</script>

<style src=@/style/header.css >
</style>


