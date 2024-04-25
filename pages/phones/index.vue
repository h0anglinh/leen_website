<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import CryptoJS from "crypto-js";
const { encryptKey, toet_pass } = useRuntimeConfig().public;
const headTitle = "My Docs";
useHead({
  title: headTitle,
  meta: [{ property: "og:title", content: `${headTitle} | LH` }],
});
const password = ref("");
const user = ref("");
const router = useRouter();

const users = ref([
  {
    user: "toet",
    password: toet_pass,
  },
  {
    user: "nepomuk",
    password: toet_pass,
  },
]);

async function handleLogin() {
  if (!user.value) {
    alert("invalid user ");
    return;
  }
  const deviceInfo = useDeviceInfo();

  const passed = users.value.find((user) => user.user)?.password === password.value;

  await $fetch("/api/logs", {
    method: "POST",
    body: { correct_pass: passed, user: user.value, meta: deviceInfo },
  });

  if (passed) {
    const timestamp = new Date().getTime();
    const code = CryptoJS.AES.encrypt(`${user.value}:${timestamp}`, encryptKey).toString();
    // router.push({ path: "/content", query: { code } });
    router.push({ name: "phones-user", params: { user: user.value }, query: { code } });
  } else {
    alert("Incorrect user / password");
  }
}

const mode = process.env.NODE_ENV;
</script>

<template>
  <v-container class="h-screen">
    <v-row justify="center" align="center" class="h-screen">
      <v-col cols="12" sm="6" md="4">
        <v-card>
          <v-form @submit.prevent="handleLogin">
            <v-card-title class="text-center"> Enter password {{ mode }}</v-card-title>
            <v-card-text>
              <v-text-field v-model="user" label="User" type="text"></v-text-field>
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
