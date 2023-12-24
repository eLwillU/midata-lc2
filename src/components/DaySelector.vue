<template>
  <div class="row justify-evenly items-center q-mb-sm">
    <q-btn color="grey-7" outline class="row justify-evenly q-mx-none"
      ><q-icon name="event" class="q-pr-sm" />{{ currentDay }}</q-btn
    >
    <q-btn @click="removeDay" flat class="q-px-xs">
      <q-icon name="arrow_back_ios_new" size="xs" />
    </q-btn>
    <q-btn @click="setToday" flat class="q-px-sm">Heute</q-btn>

    <q-btn @click="addDay" flat class="q-px-xs">
      <q-icon name="arrow_forward_ios" size="xs" />
    </q-btn>
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
