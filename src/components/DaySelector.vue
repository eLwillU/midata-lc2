<template>
  <div class="row justify-evenly items-center q-mb-sm">
    <q-btn color="grey-7" outline class="row justify-evenly q-mx-none"
      ><q-icon name="event" class="q-pr-sm" />{{ formattedDate }}</q-btn
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
import { computed } from 'vue';
import { useUserStore } from 'stores/user';

const storedDay = computed(() => useUserStore().currentDay);
const formattedDate = ref(date.formatDate(new Date(), 'DD.MM.YYYY'));
const varDate = ref(new Date());

init();

function init() {
  varDate.value = storedDay.value;
}

function updateDate(daysToAdd = 0, reset = false) {
  if (reset) {
    varDate.value = new Date();
  }
  varDate.value = date.addToDate(varDate.value, { days: daysToAdd });
  formattedDate.value = date.formatDate(varDate.value, 'DD.MM.YYYY');
  console.log('Date changed to: ' + formattedDate.value);
}

function addDay() {
  updateDate(1);
}

function removeDay() {
  updateDate(-1);
}

function setToday() {
  updateDate(0, true);
}
</script>
