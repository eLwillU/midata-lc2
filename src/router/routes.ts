import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/midata/login',
  },
  {
    path: '/midata/demo',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/midata/MidataDemo.vue'),
        children: [],
      },
    ],
  },

  {
    path: '/midata/login',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/midata/LoginPage.vue'),
        children: [],
      },
    ],
  },
  {
    path: '/midata/dayView',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/DayView.vue'),
        children: [],
      },
    ],
  },

  {
    path: '/midata/weekly',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/WeeklyView.vue'),
        children: [],
      },
    ],
  },
  {
    path: '/midata/questionnairesOverview',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/QuestionnairesOverview.vue'),
        children: [],
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorPage.vue'),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorPage.vue'),
  },
];

export default routes;
