import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      redirect: "/home/article",
      children: [
        {
          path: 'category',
          name: 'category',
          component: () => import('../views/Category.vue'),
        },
        {
          path: 'article',
          name: 'article',
          component: () => import('../views/Article/index.vue'),
        },
        {
          path: 'userInfo',
          name: 'userInfo',
          component: () => import('../views/UserInfo.vue'),
        }
      ]
    }
  ]
});

export default router;
