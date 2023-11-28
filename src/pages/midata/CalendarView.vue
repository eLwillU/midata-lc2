<template>

  <q-btn-group push spread toggle>
    <q-btn label="Mo" @click="currentDay = 'Montag'"></q-btn>
    <q-btn label="Di" @click="currentDay = 'Dienstag'"></q-btn>
    <q-btn label="Mi" @click="currentDay = 'Mittwoch'"></q-btn>
    <q-btn label="Do" @click="currentDay = 'Donnerstag'"></q-btn>
    <q-btn label="Fr" @click="currentDay = 'Freitag'"></q-btn>
  </q-btn-group>

  <q-separator></q-separator>
  <div>{{ currentDay}}</div>

  


</template>

<script setup>
import { ref } from 'vue';

const currentDay = ref('Montag');
</script>
