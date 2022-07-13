import instance from '@/components/Instance.js';

export default {
  namespaced: true,
  state: {
    info: null,
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
    },
    async loginUser({ commit }, form) {
      const { data } = await instance.post('auth/login', form);
      commit('updateInfo', data);
    },
  },
  mutations: {
    updateInfo(state, info) {
      console.log(info)
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
