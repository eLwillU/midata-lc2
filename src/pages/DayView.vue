<template>
  <login-card v-if="!$midata.isLoggedIn()"></login-card>
  <template v-if="$midata.isLoggedIn()">
  <q-dialog v-model="showDialog">
  <q-card>
    <q-card-section>
      
    <div class="text-bold text-h6">Zur Info beim Testen:
      Alle Termine sind am 15.01.2024 eingetragen.
    </div>
  </q-card-section> 
  </q-card>
  </q-dialog>
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
</template>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import { midata } from 'src/boot/plugins';
import AppointmentCardComponent from 'src/components/AppointmentCardComponent.vue';
import DaySelector from 'src/components/DaySelector.vue';
import { useUserStore } from 'stores/user';
import LoginCard from '../components/LoginCard.vue';

const showDialog = ref(true)

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
