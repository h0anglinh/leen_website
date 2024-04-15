<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="6" md="4">
        <v-card>
          <v-card-title> Zadejte heslo </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="handleLogin">
              <v-text-field v-model="password" label="Heslo" type="password"></v-text-field>
              <v-btn color="primary" @click="handleLogin">Přihlásit</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import CryptoJS from "crypto-js";
const encryptKey = useRuntimeConfig().public.encryptKey;

const password = ref("");
const router = useRouter();
const correctPassword = "leech";

async function handleLogin() {
  const deviceInfo = useDeviceInfo();
  const passed = password.value === correctPassword;
  const data = await $fetch("/api/logs", {
    method: "POST",
    body: { correct_pass: passed, meta: deviceInfo },
  });
  console.log({ data });

  if (passed) {
    const timestamp = new Date().getTime();
    const code = CryptoJS.AES.encrypt(`${timestamp}`, encryptKey).toString();
    router.push({ path: "/content", query: { code } });
  } else {
    alert("Incorrect password");
  }
}
</script>
