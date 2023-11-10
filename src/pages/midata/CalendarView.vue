<template>
  <div class="q-pa-md">
    <!--
    <q-date v-model="date" :events="events" event-color="orange" />
  --></div>

  <q-card>
    <div>Datum auswählen:</div>
    <q-btn color="primary">
      {{ proxyDate }}
      <q-popup-proxy
        @before-show="updateProxy"
        cover
        transition-show="scale"
        transition-hide="scale"
      >
        <q-date
          v-model="proxyDate"
          mask="DD.MM.YYYY"
          :events="events"
          event-color="orange"
        >
          <div class="row items-center justify-end q-gutter-sm">
            <q-btn label="Cancel" color="primary" flat v-close-popup />
            <q-btn
              label="OK"
              color="primary"
              flat
              @click="save"
              v-close-popup
            />
          </div>
        </q-date> </q-popup-proxy
    ></q-btn>
  </q-card>

  <div v-for="event in events" :key="event">
    <appointment-card></appointment-card>
  </div>
</template>

<script setup>
import AppointmentCard from 'src/components/AppointmentCard.vue';
import { ref } from 'vue';
const date = new Date().toLocaleDateString('de-De');
const proxyDate = ref(date);

const events = ['2023/11/10', '2023/11/17', '2023/11/13', '2023/11/12'];
</script>
