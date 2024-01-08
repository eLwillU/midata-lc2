<template>
  <div class="text-h5">Wochenplan</div>

  <div
    class="no-wrap row text-caption"
    v-for="wEvent in weeklyEvents"
    :key="wEvent"
    :style="{
      border: '1px solid black',
      minHeight: wEvent.height,
      width: divWidth + 'px',
    }"
  >
    <div
      class="col-2"
      :style="{ border: '1px solid black', minHeight: wEvent.height }"
    >
      {{ wEvent.startTime }} - {{ wEvent.endTime }}
    </div>
    <q-card
      class="q-pl-sm"
      flat
      bordered
      square
      :style="{
        border: '1px solid black',
        minHeight: wEvent.height,
      }"
    >
      {{ wEvent.description }}</q-card
    >
  </div>
  <div
    v-for="event in day1"
    :key="event"
    class="row no-wrap text-caption"
    name="sourceDiv"
  >
    <div
      class="col-2"
      :style="{ border: '1px solid black', minHeight: event.height }"
    >
      {{ event.startTime }} - {{ event.endTime }}
    </div>

    <q-card
      class="q-pl-sm col-6"
      flat
      bordered
      square
      :style="{
        border: '1px solid black',
        minHeight: event.height,
      }"
    >
      {{ event.description }}</q-card
    >
    <q-card
      class="q-pl-sm col-6"
      flat
      bordered
      square
      :style="{
        border: '1px solid black',
        minHeight: event.height,
      }"
    >
      {{ event.description }}</q-card
    >
    <q-card
      class="q-pl-sm col-6"
      flat
      bordered
      square
      :style="{
        border: '1px solid black',
        minHeight: event.height,
      }"
    >
      {{ event.description }}</q-card
    >
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
const children = ref(0);
const divWidth = ref(0);

onMounted(() => {
  getWidth();
});

//const weekdays = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'];

function getWidth() {
  children.value = document.getElementsByName('sourceDiv')[0].childNodes;
  console.log(children);
  divWidth.value = calculateWidth();
}

function calculateWidth() {
  var width = 0;
  children.value.forEach((child) => {
    width += child.offsetWidth;
  });
  return width;
}

const weeklyEvents = [
  {
    startTime: '07:00',
    endTime: '08:00',
    timeInMin: '',
    description: 'Gemeinsames Frühstück Haus 14 Entwöhnung',
    height: '3em',
  },
  {
    startTime: '08:15',
    endTime: '08:45',
    timeInMin: '',
    description: 'Gemeinsamer Morgen Spaziergang ALLE',
    height: '3em',
  },
  {
    startTime: '08:45',
    endTime: '09:15',
    timeInMin: '',
    description: 'Morgenrunde Haus 18 Entzug',
    height: '3em',
  },
  {
    startTime: '11:00',
    endTime: '12:00',
    timeInMin: '',
    description: 'Mittagessen',
    height: '6em',
  },
];

const day1 = [
  {
    startTime: '09:15',
    endTime: '10:45',
    timeInMin: '',
    description: 'Ärztliche Gruppentherapie (ARZT)  RAUM 203 / Haus 18',
    height: '6em',
    weekly: false,
  },
  {
    startTime: '11:00',
    endTime: '12:00',
    timeInMin: '',
    description: 'Einzeltermine / Peergespräche',
    height: '6em',
    weekly: false,
  },
];

day1.forEach((day) => {
  day.timeInMin = calcTime(day.startTime, day.endTime);
});
console.log(weeklyEvents);

function calcTime(start, end) {
  const startTime = start.split(':');
  const endTime = end.split(':');
  const startHour = startTime[0];
  const startMin = startTime[1];
  const endHour = endTime[0];
  const endMin = endTime[1];
  const timeInMin = (endHour - startHour) * 60 + (endMin - startMin);
  return timeInMin;
}
</script>
