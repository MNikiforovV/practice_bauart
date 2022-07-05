import instance from '@/components/Instance.js';

export default {
  namespaced: true,
  state: {
    info: null,
   
  },
  actions: {
    async getInfo({ commit }) {
      const { data } = await instance.get('/user/profile/');
      commit('updateInfo', data);
    },
    async createProject({ commit }, form) {
      const { data } = await instance.post('/project/create', form);
      commit('updateInfo', data);
    },
    async viewAllProject({ commit }) {
      const { data } = await instance.get('/project');
      commit('updateInfo', data);
    },
    async deleteProject({ commit }) {
      await instance.delete('/project/:slug'); // пока не знаю какой правильный роут
      commit('clearInfo');
    },
  },
  mutations: {
    updateInfo(state, info) {
      state.info = info;
    },
    clearInfo(state) {
        state.info = null;
    }
  },

  getters: {
    allInfo(state) {
      return state.info;
    },

    // usersCount(state) {
    //     return state.users.length
    // }
  },
};
