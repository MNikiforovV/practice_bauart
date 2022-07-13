import instance from '@/components/Instance.js';

export default {
  namespaced: true,
  state: {
    userProjects: null,
    allProjects: null,
    subInfo: null,
    unSubInfo: null,
  },
  actions: {
    async getUserProjects({ commit }) {
      const { data } = await instance.get('user/profile/');
      commit('updateUserProjects', data);
    },
    async createProject({}, form) {
      await instance.post('/project/create', form);
    },
    async getAllProject({ commit }) {
      const { data } = await instance.get('/project');
      commit('updateAllProjects', data);
    },
    async deleteProject({}, payloud) {
      const slug = payloud.slug;
      await instance.delete('/project/' + slug);
    },
    async updateProject({ commit }, payloud) {
      const slug = payloud.slug;
      const data = payloud.data;
      await instance.patch('/project/' + slug, data);
    },
    async getProjectBySlug(store, slug) {
      const { data } = await instance.get('/project/' + slug);
      return data;
    },

    async subForProject({ commit, dispatch }, slug) {
      const { data } = await instance.post('/project/subscribe/' + slug);
      dispatch("getUserProjects");
    },
    async unSubForProject({ commit, rootState, dispatch }, slug) {
      const user = rootState.user.userInfo;
      await instance.delete('/project/unsubscribe/' + slug, {
        user
      });
      dispatch("getUserProjects");
    },
  },
  mutations: {
    updateUserProjects(state, userProjects) {
      state.userProjects = userProjects;
    },

    updateAllProjects(state, allProjects) {
      state.allProjects = allProjects;
    },

    subForProject(state, infoSub) {
      state.infoSub = infoSub;
    },
    unSubForProject(state) {
      state.infoUnSub = null;
    },
  },

  getters: {
    subscribedProjects(state) {
      if (state.userProjects) {
        return state.userProjects.subscriberProjects
      }
      return []
    },
  },
};
