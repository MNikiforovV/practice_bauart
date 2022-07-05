<template>
  <div id="V_Profile">
    <div>
      <ul id="example-1">
        <li v-for="item in items" :key="item.message">
          <p>{{ item.message }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

// !! жду бэк, чтобы проверить !!

import { mapState, mapActions } from 'vuex';
export default {
   data() {
    return {
      items: [info],
    };
  },
  computed: {
    ...mapState('project', ['info'])
  },
  methods: {
    ...mapActions('project', ['getInfo'])
  },
  async mounted() {
    await this.getInfo();
  }
};
</script>

<style></style>


