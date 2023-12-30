<template>
  <q-card :class="['q-mb-sm', color]" bordered>
    <q-card-section horizontal>
      <q-card-section class="col-10">
        <div>
          <div class="texttext-subtitle1 text-weight-bold">
            {{ props.title }}
          </div>
          <div class="text-body2">
            <div>
              <q-icon name="schedule"></q-icon> {{ fromTime }} - {{ toTime }}
              <q-icon name="location_on"></q-icon>
              {{ props.location }}
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-section
        ><q-btn
          round
          icon="info"
          color="blue-6"
          @click="popup = true"
          size="xs"
        ></q-btn
      ></q-card-section>
    </q-card-section>
  </q-card>

  <q-dialog v-model="popup">
    <q-card>
      <q-card-section>
        <div class="text-h6">{{ props.title }}</div>
      </q-card-section>
      <q-card-section class="q-pt-none" horizontal="">
        <q-card-section>
          <span class="text-subtitle1 text-weight-bold">Zeit: </span> <br />
          <q-icon name="schedule" /> {{ fromTime }} - {{ toTime }}
        </q-card-section>
        <q-card-section>
          <span class="text-subtitle1 text-weight-bold">Ort: </span><br />
          <q-icon name="location_on" /> {{ props.location }}
        </q-card-section>
      </q-card-section>
      <q-card-section>
        <span class="text-subtitle1 text-weight-bold">Beschreibung: </span
        ><br />
        <div></div>
      </q-card-section>
      <q-card-actions>
        <q-btn flat label="OK" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  title: String,
  fromDateProp: String,
  toDateProp: String,
  location: String,
  coding: Object,
});

const fromDate = new Date(props.fromDateProp);
const toDate = new Date(props.toDateProp);
const fromTime = formatTime(fromDate);
const toTime = formatTime(toDate);
const popup = ref(false);
var color = '';

init();

function init() {
  formatTime(fromDate);
  formatTime(toDate);
  setColors();
}

function formatTime(date) {
  const DateHours = (date.getHours() < 10 ? '0' : '') + date.getHours();
  const DateMins = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
  return DateHours + ':' + DateMins;
}

function setColors() {
  if (props.coding.code === '76168009') {
    color = 'bg-blue-3';
  } else if (props.coding.code === '75516001') {
    color = 'bg-grey-4';
  }
}
</script>
