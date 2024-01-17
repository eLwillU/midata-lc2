<template>
  <login-card v-if="!$midata.isLoggedIn()"></login-card>

  <template v-if="$midata.isLoggedIn()">
    <q-btn-group>
      <q-btn @click="toggleBscl" color="primary" outline :disable="bscl">
        BSCL</q-btn
      >
      <q-btn @click="toggleZupaz" color="primary" outline :disable="zupaz">
        Züpaz</q-btn
      >
    </q-btn-group>

    <div v-if="zupaz">
      <QuestionnairePage title="Zupaz V4"></QuestionnairePage>
    </div>

    <div v-if="bscl">
      <QuestionnairePage title="BSCL V1"></QuestionnairePage>
    </div>
  </template>
</template>

<script setup>
import QuestionnairePage from './QuestionnairePage.vue';
import LoginCard from '../components/LoginCard.vue';

import { ref } from 'vue';

const zupaz = ref(false);
const bscl = ref(false);

function toggleZupaz() {
  zupaz.value = true;
  bscl.value = false;
  console.log('Zupaz: ', zupaz.value);
}

function toggleBscl() {
  bscl.value = true;
  zupaz.value = false;
  console.log('Bscl: ', bscl.value);
}
</script>
