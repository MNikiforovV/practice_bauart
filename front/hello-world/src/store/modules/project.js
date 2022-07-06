import instance from '@/components/Instance.js';

export default {
  namespaced: true,
  state: {
    info: null,
    currentProject: {}
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
    async deleteProject({ commit }, slug) {
      await instance.delete('/project/' + slug); // пока не знаю какой правильный роут
      commit('clearInfo');
    },
    async updateProject({ commit }, slug) {
      const { data } = await instance.patch('/project/' + slug);
      commit('updateProject', data);
    },
  },
  mutations: {
    updateInfo(state, info) {
      state.info = info;
    },
    clearInfo(state) {
      state.info = null;
    },
    updateProject(state, project) {
      state.currentProject = project;
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
