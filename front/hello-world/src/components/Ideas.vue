<template>
  <div>
    <div class="idea">
      <p align="left">Название идеи: {{ idea.title }}</p>
      <button class="btn3"
        v-if="idea.isArchived == false"
        @click="archiveIde(idea.slug)"
        type="button"
      >
        Архивировать
      </button>
      <button class="btn1" type="button" @click="goInIdea(idea.slug)">Войти</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState('idea', ['infoIdeas']),

    UserRole() {
      if (this.userInfo) {
        return this.userInfo.role;
      } else {
        return {};
      }
    },
   
    
  },
  methods: {
    ...mapActions('idea', [
      'updateIdea',
      'getIdeaBySlug',
      'getAllIdeas',
      'archiveIdea',
    ]),
    ...mapState('user', ['userInfo']),

    async archiveIde(slugIdea) {
      const slug = this.$route.params.slug;
      await this.archiveIdea({ slug, slugIdea });
      const idea = this.infoIdeas.find((element) => slugIdea === element.slug);
      idea.isArchived = true;
    },
    async goInIdea(slugIdea) {
      const slug = this.$route.params.slug;
      console.log(1, slugIdea)
      this.$router.push('/project/' + slug + '/idea/' + slugIdea);
    },
  },


  name: 'Ideas',
  props: {
    idea: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style>

</style>
