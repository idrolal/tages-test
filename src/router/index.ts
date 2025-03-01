import { createWebHistory, createRouter, type RouteRecordRaw } from 'vue-router';
import MainPage from '@/pages/MainPage.vue';
import { RouterName } from './routesName';
import { CATEGORIES } from './categories';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: RouterName.MAIN_PAGE,
    component: MainPage,
    meta: {
      breadcrumb: [
        {
          name: RouterName.MAIN_PAGE,
          label: 'Главная',
        },
      ],
    },
  },
  CATEGORIES,
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
