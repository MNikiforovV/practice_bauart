import instance from '@/components/Instance.js';

export default {
  namespaced: true,
  state: {
    info: null,
    infoSub: null
  },
  actions: {
    async getInfo({ commit }) {
      const { data } = await instance.get('/user/profile');
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
    async deleteProject({ commit }, payloud) {
      const slug = payloud.slug
      await instance.delete('/project/' + slug); 
      commit('clearInfo');
    },
    async updateProject({ commit }, payloud) {
      const slug = payloud.slug
      const data = payloud.data
      await instance.patch('/project/' + slug, data);
    },
    async getProjectBySlug(store, slug) {
      const { data } = await instance.get('/project/' + slug);
      return data
     
    },
    async subForProject({ commit }, slug) {
      const { data } = await instance.post('/project/subscribe/' + slug);
      commit('subForProj', data);
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
    },
    subForProject(state, infoSub) {
      state.infoSub = infoSub;
    },
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
