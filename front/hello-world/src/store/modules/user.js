import instance from '@/components/Instance.js';

export default {
  namespaced: true,
  state: {
    info: null,
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    infoUser: null,
  },
  actions: {
    async getInfoN({ commit }) {
      const { data } = await instance.get('user/user/');
      commit('infoUser', data);
    },
    async getInfo({ commit }) {
      const { data } = await instance.get('user/profile/');
      commit('updateInfo', data);
    },
    async logoutUser({ commit }) {
      await instance.post('auth/logout');
      commit('clearInfo');
      localStorage.removeItem('isLoggedIn');
    },
    async loginUser({ commit }, form) {
      const { data } = await instance.post('auth/login', form);
      commit('updateInfo', data);
      localStorage.setItem('isLoggedIn', true);
    },
  },
  mutations: {
    updateInfo(state, info) {
      state.info = info;
    },
    clearInfo(state) {
      state.info = null;
    },
    infoUser(state, infoUser) {
      state.infoUser = infoUser;
    },
  },

  getters: {
    allInfo(state) {
      return state.info;
    },
    isLoggedIn(state) {
      return !!state.info;
    },
    infoUser(state) {
      return state.infoUser;
    },
    // usersCount(state) {
    //     return state.users.length
    // }
  },
};
