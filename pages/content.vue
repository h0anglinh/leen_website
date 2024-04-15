<template>
  <v-container>
    <div v-if="!isValid">Odkaz je neplatný nebo vypršel.</div>
    <div v-else>Othee see.</div>
  </v-container>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import CryptoJS from "crypto-js";
const encryptKey = useRuntimeConfig().public.encryptKey;
const route = useRoute();

if (!route.query?.code) {
  throw createError({
    statusCode: 405,
    message: "Access denied",
  });
}

const encryptedCode = route.query.code as string;
const decryptedCode = CryptoJS.AES.decrypt(encryptedCode, encryptKey).toString(CryptoJS.enc.Utf8);
const timestamp = parseInt(decryptedCode);
const isValid = new Date().getTime() - timestamp < 300000; // Platnost 5 minut

if (!route.query?.code || !isValid) {
  throw createError({
    statusCode: 405,
    message: "Access denied",
  });
}
</script>
