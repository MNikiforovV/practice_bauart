import instance from '@/components/Instance.js';

export default {
  namespaced: true,
  state: {
    infoIdeas: null,
    oneIdea: null
  },
  actions: {
    async getIdeaBySlug({commit}, payloud) {
        const slug = payloud.slug
        const slugIdea = payloud.slugIdea
        const { data } = await instance.get('/project/' + slug + '/idea/' + slugIdea);
        // return data    
        commit('updateInfo', data);
    },
    async getIdeaBySlugForUpd({commit}, payloud) {
        const slug = payloud.slug
        const slugIdea = payloud.slugIdea
        const { data } = await instance.get('/project/' + slug + '/idea/' + slugIdea);
        return data    
        // commit('updateInfo', data);
    },
    async updateIdea({ commit }, payloud) {
        const slug = payloud.slug
        const slugIdea = payloud.slugIdea
        const data = payloud.data
        await instance.patch('project/' + slug + '/idea/'+ slugIdea, data);
    },
    async getAllIdeas({ commit }, slug) {
        const route = `/project/${slug}/idea`
        const { data } = await instance.get(route);
        commit('updateInfo', data);
    },
    async createIdea({ commit }, payloud) {
        const slug = payloud.slug
        const form = payloud.form
        const { data } = await instance.post('/project/' + slug + '/idea/create', form);
        commit('updateInfo', data);
    },
    async deleteIdea({ commit }, payloud) {
        const slug = payloud.slug
        const slugIdea = payloud.slugIdea
        await instance.delete('/project/' + slug + '/idea/' + slugIdea); 
        commit('clearInfo');
    },
  
  },
  mutations: {
    updateInfo(state, infoIdeas) {
      state.infoIdeas = infoIdeas;
    },
    clearInfo(state) {
      state.infoIdeas = null;
    },
    oneIdea(state, oneIdea) {
        state.oneIdea = oneIdea;
      },
 
  },

  getters: {
    allInfo(state) {
      return state.infoIdeas;
    },
    oneIdea(state) {
        return state.oneIdea;
    }

    // usersCount(state) {
    //     return state.users.length
    // }
  },
};
