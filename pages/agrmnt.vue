<template>
  <v-container class="h-screen">
    <v-row justify="center" align="center" class="h-screen">
      <v-col cols="12" sm="6" md="4">
        <v-card>
          <v-form @submit.prevent="handleLogin">
            <v-card-title class="text-center"> Enter password </v-card-title>
            <v-card-text>
              <v-text-field v-model="password" label="Password" type="password"></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" type="submit">SUBMIT</v-btn>
            </v-card-actions>
          </v-form>
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
const headTitle = "My Docs";
useHead({
  title: headTitle,
  meta: [{ property: "og:title", content: `${headTitle} | LH` }],
});

const password = ref("");
const router = useRouter();
const correctPassword = "leech";

async function handleLogin() {
  const deviceInfo = useDeviceInfo();

  const passed = password.value === correctPassword;
  await $fetch("/api/logs", {
    method: "POST",
    body: { correct_pass: passed, meta: deviceInfo },
  });

  if (passed) {
    const timestamp = new Date().getTime();
    const code = CryptoJS.AES.encrypt(`${timestamp}`, encryptKey).toString();
    router.push({ path: "/content", query: { code } });
  } else {
    alert("Incorrect password");
  }
}
</script>
