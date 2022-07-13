import instance from '@/components/Instance.js';

export default {
  namespaced: true,
  state: {
    infoFund: null,
  },
  actions: {
    async getOneFund({ commit }, payloud) {
        const slug = payloud.slug
        const slugIdea = payloud.slugIdea
        const { data } = await instance.get('/project/' + slug + '/idea/' + slugIdea + '/fundraising/');
        commit('infoFundM', data);
    },
    async createFund({ commit }, payloud) {
      const slug = payloud.slug
      const slugIdea = payloud.slugIdea
      const form = payloud.form
      const { data } = await instance.post('/project/' + slug + '/idea/' + slugIdea + '/fundraising/create', form);
      commit('infoFundM', data);
    },
    async getFund({ commit }, payloud) {
      const slug = payloud.slug
      const slugIdea = payloud.slugIdea
      const { data } = await instance.get('/project/' + slug + '/idea/' + slugIdea + '/fundraising');
      commit('infoFundM', data);
    },
  },
  mutations: {
    infoFundM(state, infoFund) {
      state.infoFund = infoFund;
    },
   
  },
  getters: {
    infoFundG(state, infoFund) {
      state.infoFund = infoFund;
    },
  },
};
