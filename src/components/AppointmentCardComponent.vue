<template>
  <q-card class="bg-blue-3 q-mb-sm">
    <q-card-section>
      <div class="texttext-subtitle1 text-weight-bold">
        {{ props.title }}
      </div>
      <div class="text-body2">
        <div>
          <q-icon name="schedule"></q-icon> {{ props.timeFrom }} -
          {{ props.timeTo }} <q-icon name="location_on"></q-icon>
          {{ props.location }}
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
const props = defineProps({
  title: String,
  timeFrom: String,
  timeTo: String,
  location: String,
});
</script>
