import { createRouter, createWebHistory } from 'vue-router';
import BoardView from '../views/BoardView.vue';
import TaskView from '../views/TaskView.vue';
import NotFoundView from '../views/NotFoundView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'board',
      component: BoardView,
      children: [{ path: 'task/:id', name: 'task', component: TaskView }],
    },
    {
      path: '/:pathMatch(.*)',
      name: 'notFound',
      component: NotFoundView,
    },
  ],
});

export default router;
