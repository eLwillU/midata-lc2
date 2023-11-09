<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="midata-fade">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title> MindSchedule </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawerExpanded" show-if-above bordered>
      <q-list>
        <q-item-label header> Menu </q-item-label>

        <q-expansion-item
          clickable
          default-opened
          icon="person"
          label="Midata"
          :content-inset-level="0.5"
        >
          <PageLinks
            v-for="link in midataLinksList"
            :key="link.title"
            v-bind="link"
          />
        </q-expansion-item>
      </q-list>
    </q-drawer>

    <q-page-container class="my-div">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import PageLinks from 'components/PageLinks.vue';
import { ref } from 'vue';

const drawerExpanded = ref(false);

function toggleLeftDrawer() {
  drawerExpanded.value = !drawerExpanded.value;
}

const midataLinksList = [
{
    title: 'Login',
    icon: 'calendar_view_day',
    link: '/midata/login',
  },
  {
    title: 'Tagesansicht',
    icon: 'calendar_view_day',
    link: '/midata/dayView',
  },
  {
    title: 'Wochenansicht',
    icon: 'calendar_view_week',
    link: '/midata/weekView',
  },
  {
    title: 'Termine hinzufügen',
    icon: 'add_to_photos',
    link: '/midata/addAppointment',
  }
];
</script>

<style lang="sass" scoped>
.my-div
  body.screen--xl &
    margin: 5% 10% 5% 10%

  body.screen--lg &
    margin: 5% 10% 5% 10%

  body.screen--md &
    margin: 5% 10% 5% 10%

  body.screen--sm &
    margin: 5% 5% 5% 5%

  body.screen--xs &
    margin: 5% 5% 5% 5%
</style>
