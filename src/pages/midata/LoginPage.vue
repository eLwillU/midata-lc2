<template>
  <login-card v-if="!$midata.isLoggedIn()"></login-card>
  <q-page v-if="$midata.isLoggedIn()">
    <div class="q-mb-xl">
      <div class="text-h4 text-weight-thin">Mein Profil</div>
      <q-separator spaced class="midata-fade"></q-separator>
    </div>

    <div class="row justify-end">
      <q-btn
        @click="store.patientResourceVisible = true"
        flat
        text-color="white"
        class="gt-xs midata-fade"
      >
        <q-icon left name="person"></q-icon>
        Patientenresource von MIDATA abfragen
      </q-btn>
      <q-btn
        @click="store.patientResourceVisible = true"
        flat
        icon="person"
        text-color="white"
        class="lt-sm midata-fade"
        label="Patienten Ressource abfragen"
      >
      </q-btn>
      <q-space />
      <q-btn
        color="black"
        label="Logout"
        icon="logout"
        rounded
        outline
        @click="logout()"
        class="gt-xs"
      />
      <q-btn
        color="black"
        icon="logout"
        round
        outline
        @click="logout()"
        class="lt-sm"
      />
    </div>
    <div style="height: 25px"></div>

    <PatientResource
      v-if="
        store.patientResourceVisible &&
        Object.keys(store.patientResource).length !== 0
      "
    />
  </q-page>
</template>

<script setup lang="ts">
import LoginCard from '../../components/LoginCard.vue';
import PatientResource from 'components/midata/PatientResource.vue';
import { midata } from 'boot/plugins';
import { useUserStore } from 'stores/user';

const store = useUserStore();

function logout() {
  store.patientResourceVisible = false;
  midata.logout();
  store.deleteDataInStore();
  location.reload();
}
</script>

<style scoped>
.innerCardScroll {
  overflow: scroll;
  height: 300px;
}
</style>
