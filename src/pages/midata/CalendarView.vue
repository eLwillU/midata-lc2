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

  <q-card v-if="proxyDate === '10.11.2023'">
    <q-card-section>
      <div class="text-h4 q-mb-md">Termin 1</div>
      Einzeltherapie
    </q-card-section>
  </q-card>

  <q-card v-if="proxyDate === '05.11.2023'">
    <q-card-section>
      <div class="text-h4 q-mb-md">Termin 2</div>
      Einzeltherapie
    </q-card-section>
  </q-card>

  <q-card v-if="proxyDate === '06.11.2023'">
    <q-card-section>
      <div class="text-h4 q-mb-md">Termin 3</div>
      Gruppentherapie
    </q-card-section>
  </q-card>

  <q-card v-if="proxyDate === '06.11.2023'">
    <q-card-section>
      <div class="text-h4 q-mb-md">Termin 3</div>
      Gruppentherapie
    </q-card-section>
  </q-card>

  <q-card v-if="proxyDate === '07.11.2023'">
    <q-card-section>
      <div class="text-h4 q-mb-md">Termin 4</div>
      Einzeltherapie
    </q-card-section>
  </q-card>

  <q-card v-if="proxyDate === '08.11.2023'">
    <q-card-section>
      <div class="text-h4 q-mb-md">Termin 5</div>
      Paartherapie
    </q-card-section>
  </q-card>

  <q-card v-if="proxyDate === '09.11.2023'">
    <q-card-section>
      <div class="text-h4 q-mb-md">Termin 6</div>
      Musiktherapie
    </q-card-section>
  </q-card>

  <q-card v-if="proxyDate === '10.11.2023'">
    <q-card-section>
      <div class="text-h4 q-mb-md">Termin 7</div>
      Kunsttherapie
    </q-card-section>
  </q-card>

  <q-card v-if="proxyDate === '11.11.2023'">
    <q-card-section>
      <div class="text-h4 q-mb-md">Termin 8</div>
      Beratungsgespräch
    </q-card-section>
  </q-card>

  <q-card v-if="proxyDate === '12.11.2023'">
    <q-card-section>
      <div class="text-h4 q-mb-md">Termin 9</div>
      Verhaltenstherapie
    </q-card-section>
  </q-card>

  <q-card v-if="proxyDate === '13.11.2023'">
    <q-card-section>
      <div class="text-h4 q-mb-md">Termin 10</div>
      Ernährungsberatung
    </q-card-section>
  </q-card>

  <q-card v-if="proxyDate === '14.11.2023'">
    <q-card-section>
      <div class="text-h4 q-mb-md">Termin 11</div>
      Sporttherapie
    </q-card-section>
  </q-card>

  <q-card v-if="proxyDate === '15.11.2023'">
    <q-card-section>
      <div class="text-h4 q-mb-md">Termin 12</div>
      Achtsamkeitstraining
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref } from 'vue';
const date = new Date().toLocaleDateString('de-De');
const proxyDate = ref(date);

const events = ['2023/11/10', '2023/11/17', '2023/11/13', '2023/11/12'];
</script>
