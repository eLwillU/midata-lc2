<template>
  <div>Termin-Template hinzufügen</div>
  <div>
    <q-file v-model="uploadedFile" label="FHIR .json Datei auswählen" counter>
      <template v-slot:prepend>
        <q-icon name="cloud_upload" @click.stop.prevent />
      </template>
      <template v-slot:append>
        <q-icon
          name="close"
          @click.stop.prevent="uploadedFile = null"
          class="cursor-pointer"
          :disabled="!uploadedFile"
        />
      </template>
    </q-file>
  </div>
  <q-btn @click="parseFile">Patient-Ressource Getten</q-btn>
  <q-btn @click="$midata.createObservation()">Observation Createn</q-btn>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const uploadedFile = ref(null);
    let tempFile = new File([''], '');
    const fileReader = new FileReader();

    // Add a load event listener to handle the file read completion
    fileReader.onload = function (event) {
      console.log(event.target.result);
    };

    function parseFile() {
      if (uploadedFile.value) {
        tempFile = uploadedFile.value;
        fileReader.readAsText(tempFile);
      } else {
        console.log('No file selected');
      }
    }

    return { parseFile, uploadedFile, fileReader };
  },
};
</script>
