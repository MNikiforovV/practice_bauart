 import Vue from 'vue'
 import Vuex from 'vuex'
 import user from './modules/user' 
 import project from './modules/project' 
 import idea from './modules/idea' 
 import fundraising from './modules/fundraising' 


 Vue.use(Vuex)

 export default new Vuex.Store({

    modules: {
        user,
        project,
        idea,
        fundraising
    }
 })