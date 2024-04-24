<script setup lang="ts">
import { useRoute } from "vue-router";
import CryptoJS from "crypto-js";
import type { Tables } from "~/typings/database.types";
const encryptKey = useRuntimeConfig().public.encryptKey;
const route = useRoute();

const isValid = ref(false);

if (!route.query?.code && process.env.NODE_ENV === "production") {
  throw createError({
    statusCode: 401,
    message: "Access denied",
  });
}

const encryptedCode = route.query.code as string;
let [user, time] = (
  CryptoJS.AES.decrypt(encryptedCode, encryptKey).toString(CryptoJS.enc.Utf8) as string
).split(":");

const timestamp = parseInt(time);
isValid.value = new Date().getTime() - timestamp < 500000 && route.params.user === user; // Platnost 5 minut

if ((!route.query?.code || !isValid) && process.env.NODE_ENV === "production") {
  throw createError({
    statusCode: 401,
    message: "Access denied",
  });
}

if (!isValid.value) {
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

if (data.value) {
  const items = Object.groupBy(data.value, (i) => `${i.month} - ${i.year}`);
  expenseItems.value = items;
}
</script>
<template>
  <v-container v-if="isValid">
    <v-expansion-panels v-if="expenseItems">
      <v-expansion-panel v-for="item in Object.keys(expenseItems)" :key="item">
        <v-expansion-panel-title>
          <v-row>
            <v-col> {{ item }}</v-col>
            <v-col> {{ expenseItems[item]?.reduce((acc, item) => acc + item.amount, 0) }}</v-col>
          </v-row>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-table>
            <thead>
              <tr>
                <th class="text-left">Date</th>
                <th class="text-left">Number</th>
                <th class="text-left">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="number in expenseItems[item]" v-if="expenseItems[item]">
                <td>{{ number.month }} {{ number.year }}</td>
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
</template>
