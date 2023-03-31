<template>
  <div>
    <select v-model="selected">
      <option v-for="option in loginOptions" :value="option">
        {{ option }}
      </option>
    </select>
    <input type="password" placeholder="Passwort" v-model="password" />
    <button @click="login">Login</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const loginOptions = ["Viewer", "Admin"];

const selected = ref(loginOptions[0]);
const password = ref();

function login() {
  console.log("Login: ", selected.value, password.value);
}
</script>

<style scoped></style>
