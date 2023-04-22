<template>
  <div v-if="loggedInRole">
    <h3>Du bist eingelogged als {{ loggedInRole }}</h3>
    <a href="/bookings"><button>Zeitbuchungen</button></a>
    <button class="secondary" @click="logoff">Logoff</button>
  </div>
  <div v-else>
    <select v-model="selected">
      <option v-for="option in loginOptions" :value="option">
        {{ option }}
      </option>
    </select>
    <input type="password" placeholder="Passwort" v-model="password" />

    <button @click="login" :disabled="password.length === 0">Login</button>
    <a href="/bookings" id="bookingsLink"></a>
    <div v-if="errorMsg" class="error-msg">{{ errorMsg }}</div>
    <div v-if="showLoader" class="loader"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { Ref } from "vue";
import {
  storeToken,
  clearToken,
  getLoggedInRole,
} from "../utils/handleLoginToken";

const { PUBLIC_API_URL } = import.meta.env;

const loginOptions = ["Viewer", "Admin"];
const bookingsLink = ref(null);
const loggedInRole: Ref<string | null> = ref(null);
const selected = ref(loginOptions[0]);
const password = ref("");
const errorMsg = ref("");
const showLoader = ref(false);

onMounted(() => {
  // Because of hydration errors we have to call DOM changing effects only after the component was successfully mounted
  loggedInRole.value = getLoggedInRole();
});

async function logoff() {
  clearToken();
  loggedInRole.value = getLoggedInRole();
}

async function login() {
  try {
    showLoader.value = true;
    const response = await fetch(`${PUBLIC_API_URL}/api/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password.value,
        role: selected.value,
      }),
    });

    if (response.status == 200) {
      errorMsg.value = "";
      document?.getElementById("bookingsLink")?.click();

      const token = await response.json();
      console.log("BODY: ", token);
      storeToken(token);
      loggedInRole.value = getLoggedInRole();
      return;
    }

    if (response.status == 401) {
      errorMsg.value = "Falsches Passwort";
      password.value = "";
      return;
    }
  } catch (error) {
    errorMsg.value = "Ein unbekannter Fehler ist eingetreten";
    console.log(error);
  } finally {
    showLoader.value = false;
  }
}
</script>

<style scoped>
.error-msg {
  text-align: center;
  color: darkred;
  animation: jump-shaking 0.83s;
}

@keyframes jump-shaking {
  0% {
    transform: translateX(0);
  }
  25% {
    transform: translateY(-9px);
  }
  35% {
    transform: translateY(-9px) rotate(17deg);
  }
  55% {
    transform: translateY(-9px) rotate(-17deg);
  }
  65% {
    transform: translateY(-9px) rotate(17deg);
  }
  75% {
    transform: translateY(-9px) rotate(-17deg);
  }
  100% {
    transform: translateY(0) rotate(0);
  }
}
</style>
