<template>
  <div>Termin-Template hinzufügen</div>
  <div>
    <q-file
      filled
      bottom-slots
      v-model="model"
      label="FHIR .json Datei auswählen"
      counter
    >
      <template v-slot:prepend>
        <q-icon name="cloud_upload" @click.stop.prevent />
      </template>
      <template v-slot:append>
        <q-icon
          name="close"
          @click.stop.prevent="model = null"
          class="cursor-pointer"
        />
      </template>
    </q-file>
  </div>
  <q-btn>Datei absenden</q-btn>
</template>

<script setup></script>
