import instance from '@/components/Instance.js';

export default {
  namespaced: true,
  state: {
    userInfo: null,
  },
  actions: {
    async getUserInfo({ commit }) {
      const { data } = await instance.get('user/user/');
      commit('updateUserInfo', data);
    },
    async logoutUser({ commit }) {
      await instance.post('auth/logout');
      commit('clearUserInfo');
    },
    async loginUser({ commit }, form) {
      const { data } = await instance.post('auth/login', form);
      commit('updateUserInfo', data);
    },
  },
  mutations: {
    clearUserInfo(state) {
      state.userInfo = null;
    },
    updateUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
  },

  getters: {
    isLoggedIn(state) {
      return !!state.userInfo;
    },
  },
};
