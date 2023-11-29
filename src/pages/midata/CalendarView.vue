<template>

  <q-btn-group push spread toggle>
    <q-btn label="Mo" @click="currentDay = 'Montag'"></q-btn>
    <q-btn label="Di" @click="currentDay = 'Dienstag'"></q-btn>
    <q-btn label="Mi" @click="currentDay = 'Mittwoch'"></q-btn>
    <q-btn label="Do" @click="currentDay = 'Donnerstag'"></q-btn>
    <q-btn label="Fr" @click="currentDay = 'Freitag'"></q-btn>

    <q-btn-dropdown auto-close rounded color="primary" label="Three" split>
        <!-- dropdown content goes here -->
        <q-list padding style="width: 250px">
          <q-item clickable>
            <q-item-section avatar>
              <q-avatar icon="folder" color="purple" text-color="white" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Photos</q-item-label>
              <q-item-label caption>February 22, 2016</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-icon name="info" color="amber" />
            </q-item-section>
          </q-item>

          <q-item clickable>
            <q-item-section avatar>
              <q-avatar icon="folder" color="purple" text-color="white" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Videos</q-item-label>
              <q-item-label caption>London</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-icon name="info" color="amber" />
            </q-item-section>
          </q-item>

          <q-separator inset />
          <q-item-label header>Files</q-item-label>

          <q-item clickable>
            <q-item-section avatar>
              <q-avatar icon="assignment" color="teal" text-color="white" />
            </q-item-section>
            <q-item-section>
              <q-item-label>London</q-item-label>
              <q-item-label caption>March 1st, 2018</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-icon name="info" color="amber" />
            </q-item-section>
          </q-item>

          <q-item clickable>
            <q-item-section avatar>
              <q-avatar icon="assignment" color="teal" text-color="white" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Paris</q-item-label>
              <q-item-label caption>January 22nd, 2017</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-icon name="info" color="amber" />
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
  </q-btn-group>

  <q-separator></q-separator>
  <div>{{ currentDay}}</div>

</template>

<script setup>
import { ref } from 'vue';

const currentDay = ref('Montag');
</script>
