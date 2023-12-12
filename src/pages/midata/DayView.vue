<template>
  <div v-for="appointment in appointments" :key="appointment">
    <AppointmentCardComponent
      :title="appointment.description"
      location="N321"
    ></AppointmentCardComponent>
  </div>
</template>

<script setup>
import AppointmentCardComponent from 'src/components/AppointmentCardComponent.vue';
import { onMounted } from 'vue';
import { midata } from 'src/boot/plugins';
let appointments = [];

onMounted(async () => {
  try {
    console.log('Getting item');
    const loadedAppointments = await midata.loadAppointments();
    appointments.value = loadedAppointments;
    console.log('Index 0', appointments.value[0]);
    console.log('Index 1', appointments.value[1]);

    for (let appointment of appointments.value) {
      console.log('Descr: ', appointment.description);
    }
  } catch (error) {
    console.error('Error loading appointments:', error);
  }
});
</script>

<style></style>
