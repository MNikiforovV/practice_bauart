import instance from '@/components/Instance.js';

export default {
  namespaced: true,
  state: {
    info: null,
   
  },
  actions: {
    async getInfo({ commit }) {
      const { data } = await instance.get('/profile');
      commit('updateInfo', data);
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
