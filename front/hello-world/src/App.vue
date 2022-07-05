<template>
  <div>
    <Header />
    <div id="app">
      <div class="user" v-if="info != null">
        <!-- <p>Ваш Email: {{ info.email }}</p>
        <p>Ваш Name: {{ info.name }}</p>
        <p>Ваш Surname: {{ info.surname }}</p> -->
      </div>
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Header from '@/components/V_Header.vue';

export default {
  computed: {
    ...mapState('user', ['info']),
  },
  methods: {
    ...mapActions('user', ['getInfo']),
  },
  async mounted() {
    await this.getInfo();
  },
  components: {
    Header,
  },
};
</script>
<style>
#app {
  margin-top: 70px;
}
</style>
