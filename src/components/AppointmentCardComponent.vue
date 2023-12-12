<template>
  <q-card class="bg-blue-1 q-mb-sm" bordered>
    <q-card-section horizontal>
      <q-card-section class="col-10">
        <div>
          <div class="texttext-subtitle1 text-weight-bold">
            {{ props.title }}
          </div>
          <div class="text-body2">
            <div>
              <q-icon name="schedule"></q-icon> {{ fromTime }} - {{ toTime }}
              <q-icon name="location_on"></q-icon>
              {{ props.location }}
            </div>
          </div>
        </div>
      </q-card-section>

      <q-card-section
        ><q-btn
          round
          icon="info"
          color="blue-6"
          @click="alert = true"
          size="xs"
        ></q-btn
      ></q-card-section>
    </q-card-section>
  </q-card>

  <q-dialog v-model="alert">
    <q-card>
      <q-card-section>
        <div class="text-h6">Alert</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
        repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis
        perferendis totam, ea at omnis vel numquam exercitationem aut, natus
        minima, porro labore.
      </q-card-section>

      <q-card-actions>
        <q-btn flat label="OK" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from 'vue';
const props = defineProps({
  title: String,
  fromDateProp: String,
  toDateProp: String,
  location: String,
});

var fromDate = new Date(props.fromDateProp);
var toDate = new Date(props.toDateProp);

const fromTime = formatTime(fromDate);
const toTime = formatTime(toDate);

const alert = ref(false);

formatTime(fromDate);
formatTime(toDate);

function formatTime(date) {
  const DateHours = (date.getHours() < 10 ? '0' : '') + date.getHours();
  const DateMins = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();

  // You can return the formatted time as per your requirement
  return DateHours + ':' + DateMins;
}
</script>
