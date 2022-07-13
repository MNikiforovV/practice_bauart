import V_Project from '../views/V_Project.vue';
import V_UpdateProject from '@/components/V_UpdateProject.vue';
import V_Ideas from '../views/V_Ideas.vue';
import V_Idea from '../views/V_Idea.vue';
import V_IdeasCreate from '../views/V_IdeasCreate.vue';
import V_UpdateIdeas from '@/components/V_UpdateIdeas.vue';

const projectRoutes = [
  {
    path: '/project',
    name: 'Project',
    component: V_Project,
    props: true,
  },
  {
    path: '/project/:slug',
    name: 'UpdateProject',
    component: V_UpdateProject,
    props: true,
  },
  {
    path: '/project/:slug/idea',
    name: 'Ideas',
    component: V_Ideas,
    props: true,
  },
  {
    path: '/project/:slug/idea/create',
    name: 'IdeasCreate',
    component: V_IdeasCreate,
    props: true,
  },
  {
    path: '/project/:slug/idea/:slugIdea',
    name: 'Idea',
    component: V_Idea,
    props: true,
  },
  {
    path: '/project/:slug/idea/:slugIdea/update',
    name: 'UpdateIdea',
    component: V_UpdateIdeas,
    props: true,
  },
];
export default projectRoutes;
