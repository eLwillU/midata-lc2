<template>
  <DaySelector></DaySelector>
  <div>
    <AppointmentCardComponent
      v-for="appointment in appointments"
      :key="appointment.id"
      :title="appointment.description"
      :fromDateProp="appointment.start"
      :toDateProp="appointment.end"
      location="N123"
    ></AppointmentCardComponent>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { midata } from 'src/boot/plugins';
import AppointmentCardComponent from 'src/components/AppointmentCardComponent.vue';
import DaySelector from 'src/components/DaySelector.vue';
const appointments = ref([]);

onMounted(async () => {
  try {
    const loadedAppointments = await midata.loadAppointments();
    appointments.value = loadedAppointments;
    logDates();
  } catch (error) {
    console.error('Error loading appointments:', error);
  }
});

function logDates() {
  appointments.value.forEach((a) => {
    var tempString = '';
    tempString = a.start;
    console.log('Reeeee', new Date(tempString));
    console.log(a.start);
  });
}
//TODO: Add Location to FHIR Resource!!
</script>

<style></style>
