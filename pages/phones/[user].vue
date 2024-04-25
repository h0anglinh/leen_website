<script setup lang="ts">
import { useRoute } from "vue-router";
import CryptoJS from "crypto-js";
import type { Tables } from "~/typings/database.types";
const encryptKey = useRuntimeConfig().public.encryptKey;
const { query, params } = useRoute();
import { format } from "date-fns";
import { cs } from "date-fns/locale";
const isValid = ref(false);

const is_dev = process.env.NODE_ENV === "development";

if (!query?.code && !is_dev) {
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
isValid.value = new Date().getTime() - timestamp < 500000 && params.user === user; // Platnost 5 minut

if (!isValid.value && process.env.NODE_ENV === "production") {
  throw createError({
    statusCode: 401,
    message: "Access denied",
  });
}

const { data } = await useAsyncData("expenses", () =>
  $fetch("/api/expense", {
    method: "GET",
    query: { groupName: user.replace("toet", "nha toet").replace("nepomuk", "nepal") },
  })
);

const expenseItems = ref<Partial<Record<string, Tables<{ schema: "mobile_services" }, "expenses">[]>>>();

onMounted(() => {
  if (data.value) {
    const items = Object.groupBy(data.value, (i) => `${i.month} - ${i.year}`);
    expenseItems.value = items;
  }
});

const getdate = (dateString: string) => {
  const [month, year] = dateString.split("-").map(Number);

  // Vytvoření nového datumového objektu
  const date = new Date(year, month - 1); // Měsíce jsou v JavaScriptu indexované od 0

  // Formátování data pro získání měsíce slovy
  const monthName = format(date, "MMMM yyyy", { locale: cs });
  return monthName;
};
</script>
<template>
  <v-container v-if="isValid">
    <v-expansion-panels v-if="expenseItems">
      <v-expansion-panel v-for="item in Object.keys(expenseItems)" :key="item">
        <v-expansion-panel-title>
          <v-row>
            <v-col> {{ getdate(item) }}</v-col>
            <v-col> {{ expenseItems[item]?.reduce((acc, item) => acc + item.amount, 0) }}</v-col>
          </v-row>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-table>
            <thead>
              <tr>
                <th class="text-left">Number</th>
                <th class="text-left">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="number in expenseItems[item]" v-if="expenseItems[item]">
                <td>
                  <v-chip>
                    {{ number.phone_number }}
                  </v-chip>

                  <v-tooltip :text="number.comment" v-if="number.comment">
                    <template v-slot:activator="{ props }">
                      <v-btn icon v-bind="props" size="x-small" variant="flat">
                        <v-icon color="grey-lighten-1"> fa-solid fa-info </v-icon>
                      </v-btn>
                    </template>
                  </v-tooltip>
                </td>
                <td>{{ number.amount }} CZK</td>
              </tr>
            </tbody>
          </v-table>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>

  <v-container v-else>
    <v-row justify="center" align="center" class="h-screen">
      <v-col cols="12" sm="6" md="6">
        <v-alert icon="fa-solid fa-circle-exclamation">
          Heslo je neplatné nebo relace již vypršela
        </v-alert></v-col
      >
    </v-row>
  </v-container>
</template>
