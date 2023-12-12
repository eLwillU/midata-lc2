<template>
  <div v-for="(appointment, index) in appointments" :key="index">
    <AppointmentCardComponent
      :time="appointment.time"
      :location="appointment.location"
    ></AppointmentCardComponent>
  </div>
</template>

<script setup>
import AppointmentCardComponent from 'src/components/AppointmentCardComponent.vue';

const appointments = [
  {
    time: '08:00 - 12:00',
    location: 'N321',
  },
  {
    time: '12:00 - 13:00',
    location: 'N311',
  },
  {
    time: '15:00 - 16:00',
    location: 'N123',
  },
];
</script>

<style></style>
