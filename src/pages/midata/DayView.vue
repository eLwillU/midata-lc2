<template>
  <div>
    <AppointmentCardComponent
      v-for="appointment in appointments"
      :key="appointment.id"
      :title="appointment.description"
      :timeFrom="appointment.start"
      :timeTo="appointment.end"
    ></AppointmentCardComponent>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { midata } from 'src/boot/plugins';
import AppointmentCardComponent from 'src/components/AppointmentCardComponent.vue';
const appointments = ref([]);

onMounted(async () => {
  try {
    const loadedAppointments = await midata.loadAppointments();
    appointments.value = loadedAppointments;
  } catch (error) {
    console.error('Error loading appointments:', error);
  }
});
</script>

<style></style>
