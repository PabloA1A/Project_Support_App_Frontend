import { createRouter, createWebHistory } from 'vue-router';
import WelcomePage from '../views/WelcomePage.vue';
import RequestListView from '@/views/RequestListView.vue';
import NewRequestView from '@/views/NewRequestView.vue';
import EditRequestView from '@/views/EditRequestView.vue';

const routes = [
  {
    path: '/',
    name: 'WelcomePage',
    component: WelcomePage
  },
  {
    path: '/requests',
    name: 'RequestListView',
    component: RequestListView
  },
  {
    path: '/new-request',
    name: 'NewRequestView',
    component: NewRequestView
  },
  {
    path: '/edit-request/:id',
    name: 'EditRequestView',
    component: EditRequestView
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;