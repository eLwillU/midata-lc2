<template>
  <DaySelector></DaySelector>
  <div>
    <AppointmentCardComponent
      v-for="appointment in filteredAppointments"
      :key="appointment.id"
      :title="appointment.description"
      :fromDateProp="appointment.start"
      :toDateProp="appointment.end"
      :coding="appointment.appointmentType.coding[0]"
      location="N123"
    ></AppointmentCardComponent>
  </div>
  <q-btn @click="logDay" label="Log Day"></q-btn>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import { midata } from 'src/boot/plugins';
import AppointmentCardComponent from 'src/components/AppointmentCardComponent.vue';
import DaySelector from 'src/components/DaySelector.vue';
import { useUserStore } from 'stores/user';

const currentDate = computed(() => useUserStore().currentDay);
const filteredAppointments = computed(() => {
  return appointments.value.filter((appointment) => {
    const appointmentDate = new Date(String(appointment.start));
    const current = new Date(currentDate.value);
    return (
      appointmentDate.getDate() === current.getDate() &&
      appointmentDate.getMonth() === current.getMonth() &&
      appointmentDate.getFullYear() === current.getFullYear()
    );
  });
});

const appointments = ref([]);

function logDay() {
  console.log('Current day: ', currentDate.value);
  console.log('Eiqlas', filteredAppointments.value);
}

onMounted(async () => {
  try {
    const loadedAppointments = await midata.loadAppointments();
    appointments.value = loadedAppointments;
    console.log('Appointments: ', appointments.value);
  } catch (error) {
    console.error('Error loading appointments:', error);
  }
});

//TODO: Add Location to FHIR Resource!!
</script>

<style></style>
