<template>
  <div class="row justify-evenly items-center q-mb-sm">
    <q-btn @click="addDay" class="q-px-sm">
      <q-icon name="arrow_back" size="xs" />
    </q-btn>
    <q-btn>Heute</q-btn>
    <q-input
      v-model="text"
      :dense="dense"
      :placeholder="currentDay"
      class="col-5"
      standout
      disable
    >
      <template v-slot:prepend>
        <q-icon name="event" />
      </template>
    </q-input>

    <q-btn @click="removeDay" class="q-px-sm">
      <q-icon name="arrow_forward" size="xs"
    /></q-btn>
  </div>

  <div
    class="text-h6 row wrap justify-evenly items-start content-start q-mb-sm"
  ></div>
</template>

<script setup>
import { ref } from 'vue';

const currentDay = ref(new Date().toLocaleDateString());
const previousDay = ref(new Date().toLocaleDateString());
const nextDay = ref(new Date().toLocaleDateString());
const countDays = ref(0);

setDays();

function setDays() {
  const baseDate = new Date();

  // Update the dates with formatted strings
  currentDay.value = new Date(
    baseDate.setDate(baseDate.getDate() + countDays.value),
  ).toLocaleDateString();
  nextDay.value = new Date(
    baseDate.setDate(baseDate.getDate() + 1),
  ).toLocaleDateString();
  previousDay.value = new Date(
    baseDate.setDate(baseDate.getDate() - 2),
  ).toLocaleDateString();
}

function addDay() {
  countDays.value += 1;
  console.log(countDays);
  setDays();
}

function removeDay() {
  countDays.value -= 1;
  console.log(countDays);
  setDays();
}
</script>
