<script setup lang="ts">
import { useRoute } from "vue-router";
import CryptoJS from "crypto-js";
import type { Tables } from "~/typings/database.types";
const encryptKey = useRuntimeConfig().public.encryptKey;
const { query, params } = useRoute();
const is_dev = query.mode ? query.mode === "dev" : process.env.NODE_ENV === "development";
const isValid = ref(false);

if (!query?.code || !params.date) {
  throw createError({
    statusCode: 401,
    message: "no code provided",
  });
}

const encryptedCode = query.code as string;
let [user, time] = (
  CryptoJS.AES.decrypt(encryptedCode, encryptKey).toString(CryptoJS.enc.Utf8) as string
).split(":");

const timestamp = parseInt(time);
isValid.value =
  new Date().getTime() - timestamp < (is_dev ? 9999999999 : 300000) && params.user === user; // Platnost 5 minut

if (!isValid.value && process.env.NODE_ENV === "production") {
  throw createError({
    statusCode: 401,
    message: "Access denied",
  });
}

const [pMonth, pYear] = (params.date as string).split("-");

const { data: expenses } = await useAsyncData("expenses", () =>
  $fetch("/api/expense/raw", {
    method: "GET",
    query: {
      groupName: user.replace("toet", "nha toet").replace("nepomuk", "nepal"),
      month: pMonth,
      year: pYear,
    },
  })
);

console.log({ expenses });
</script>
<template>
  <v-container v-if="isValid && expenses" class="min-h-screen">
    <h2 class="text-h2">{{ params.date }}</h2>
    <v-sheet class="d-flex align-center pa-3">
      <v-table>
        <thead>
          <tr>
            <th class="text-left">CN</th>
            <th class="text-left">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) in expenses" :key="i">
            <td>{{ item.phone_number }}</td>
            <td>
              {{ item.amount }}
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-sheet>
  </v-container>

  <v-container v-else>
    <v-row justify="center" align="center" class="h-screen">
      <v-col cols="12" sm="6" md="6">
        <v-alert icon="fa-solid fa-circle-exclamation">
          Heslo je neplatné nebo relace již vypršela
        </v-alert>
        <div class="d-flex align-center pa-5">
          <v-btn class="mx-auto" variant="tonal" :to="{ name: 'phones' }">Back</v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
