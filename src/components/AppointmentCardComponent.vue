<template>
  <q-card class="bg-blue-3 q-mb-sm">
    <q-card-section>
      <div class="texttext-subtitle1 text-weight-bold">
        {{ props.description }}
      </div>
      <div class="text-body2">
        <div>
          <q-icon name="schedule"></q-icon> {{ props.time }}
          <q-icon name="location_on"></q-icon> {{ props.location }}
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
const props = defineProps({
  description: String,
  time: String,
  location: String,
});
</script>
