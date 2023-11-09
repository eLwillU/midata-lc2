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
  <q-card>
    <q-tab-panels v-model="proxyDate" animated>
      <q-tab-panel name="10.02.2023">
        <div class="text-h4 q-mb-md">Termin 1</div>
        Einzeltherapie
      </q-tab-panel>
      <q-tab-panel name="05.02.2023">
        <div class="text-h4 q-mb-md">Termin 2</div>
        Einzeltherapie
      </q-tab-panel>
      <q-tab-panel name="06.02.2023">
        <div class="text-h4 q-mb-md">Termin 3</div>
        Gruppentherapie
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>

<script setup>
import { ref } from 'vue';
const date = new Date().toLocaleDateString('de-De');
const proxyDate = ref(date);

// const date = new Date();
const events = ['2023/02/01', '2023/02/05', '2023/02/06', '2023/02/10'];
</script>
