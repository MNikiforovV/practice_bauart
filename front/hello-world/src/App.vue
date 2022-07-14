<template>
  <div>
    <div id="app">
      <Header />
      <router-view />
    </div>
  </div>
</template>

<script>
import Header from '@/components/V_Header.vue';

export default {
  components: {
    Header,
  },
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

a {
  text-decoration: none;
}

</style>
