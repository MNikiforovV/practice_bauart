<template>
  <div>
    <Header />
    <div id="app">
      <div class="user" v-if="info != null">
        <p>Ваш Email: {{ info.email }}</p>
        <p>Ваш Name: {{ info.name }}</p>
        <p>Ваш Surname: {{ info.surname }}</p>
      </div>
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import Header from '@/components/V_Header.vue';

export default {
  computed: {
    // mapGetters(['allInfo'])
    ...mapState('user', ['info']),
  },
  methods: {
    ...mapActions('user', ['getInfo']),
  },

 
  async mounted() {
    // this.$store.dispatch('fetchUsers');
    await this.getInfo();

    // await instance
    //   .get('user/profile/')
    //   .then((response) => (this.info = response.data));
  },
  components: {
    Header,
  },
};
</script>
<style>
#app{margin-top: 70px;}
</style>