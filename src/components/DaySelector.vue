<template>
  <div class="row justify-evenly items-center q-mb-sm">
    <q-btn @click="removeDay" class="q-px-sm">
      <q-icon name="arrow_back" size="xs" />
    </q-btn>
    <q-btn @click="setToday">Heute</q-btn>

    <q-btn color="grey-7" outline class="row justify-evenly"
      ><q-icon name="event" />{{ currentDay }}</q-btn
    >
    <q-btn @click="addDay" class="q-px-sm">
      <q-icon name="arrow_forward" size="xs"
    /></q-btn>
  </div>

  <div
    class="text-h6 row wrap justify-evenly items-start content-start q-mb-sm"
  ></div>
</template>

<script setup>
import { ref } from 'vue';
import { date } from 'quasar';

const currentDay = ref(new Date());
const countDays = ref(0);

setDays();

function setDays() {
  const baseDate = new Date();
  currentDay.value = date.formatDate(
    date.addToDate(baseDate, { days: countDays.value }),
    'DD.MM.YYYY',
  );
}

function addDay() {
  countDays.value += 1;
  setDays();
}

function removeDay() {
  countDays.value -= 1;
  setDays();
}

function setToday() {
  countDays.value = 0;
  setDays();
}
</script>
