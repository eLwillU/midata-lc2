import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/midata/login',
  },
  {
    path: '/midata/introduction',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/midata/MidataIntroduction.vue'),
      },
    ],
  },
  {
    path: '/midata/myFirstApp',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/midata/MidataMyFirstApp.vue'),
      },
    ],
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
    path: '/midata/addAppointment',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('src/pages/AddAppointment.vue'),
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
        component: () => import('pages/midata/DayView.vue'),
        children: [],
      },
    ],
  },
  {
    path: '/midata/weekView',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/midata/WeekView.vue'),
        children: [],
      },
    ],
  },
  {
    path: '/midata/calendar',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/midata/CalendarView.vue'),
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
  {
    path: '/midata/questionnaire',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/QuestionnairePage.vue'),
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
];

export default routes;
