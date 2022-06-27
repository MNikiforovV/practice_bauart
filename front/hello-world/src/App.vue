<template>
  <div>
    <Header />
    <div class="grid">
      <div id="app">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/V_Header.vue";
export default {
  components: {
    Header
  }
};
</script>
