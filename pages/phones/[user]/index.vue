<script setup lang="ts">
import { useRoute } from "vue-router";
import CryptoJS from "crypto-js";
import type { Tables } from "~/typings/database.types";
const encryptKey = useRuntimeConfig().public.encryptKey;
const { query, params } = useRoute();
import { format } from "date-fns";
import { cs } from "date-fns/locale";
const is_dev = query.mode ? query.mode === "dev" : process.env.NODE_ENV === "development";
const isValid = ref(false);
const paymentSum = ref(0);
const expenseSum = ref(0);
const otherExpenseSum = ref(0);

if (!query?.code) {
  throw createError({
    statusCode: 401,
    message: "no code provided",
  });
}

const currentYear = format(new Date(), "yyyy");
const currentMonth = format(new Date(), "MM");

const qrURl = ref<string>();
function updateExpenseStatus() {
  if (!expenses.value || !payments.value) return;
  let remainingPayments = payments.value.reduce((sum, payment) => sum + (payment.amount || 0), 0);

  let othersExpenses =
    expensesRaw.value
      ?.filter((ex) => ex.year <= Number(currentYear))
      .filter((ex) => ex.month <= Number(currentMonth))
      .reduce((acc, item) => acc + (item.amount || 0), 0) || 0;

  const newExpense = expenses.value.reverse();
  newExpense.forEach((expense) => {
    if (remainingPayments > 0) {
      remainingPayments -= othersExpenses;
      if (remainingPayments >= (expense.total_amount || 0)) {
        expense.status = "paid";
        remainingPayments -= expense.total_amount || 0;
      } else {
        expense.status = "partly paid";
        remainingPayments = 0; // veškeré dostupné platby byly využity
      }
    } else {
      expense.status = "waiting for payment"; // žádné zbylé platby pro tento výdaj
    }
  });

  expenses.value = newExpense.reverse();
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
type extendedExpense = Tables<{ schema: "mobile_services" }, "group_expenses_summary"> & {
  status: "paid" | "partly paid" | "waiting for payment";
};
const { data: expenses } = await useAsyncData<extendedExpense[]>("expenses", () =>
  $fetch("/api/expense", {
    method: "GET",
    query: { groupName: user.replace("toet", "nha toet").replace("nepomuk", "nepal") },
  })
);

const { data: expensesRaw } = await useAsyncData("expenses-raw", () =>
  $fetch("/api/expense/raw", {
    method: "GET",
    query: {
      groupName: user.replace("toet", "nha toet").replace("nepomuk", "nepal"),
      type: "others",
    },
  })
);

const { data: payments } = await useAsyncData("payments", () =>
  $fetch("/api/payments", { method: "GET", query: { name: user.replace("nepomuk", "Suot") } })
);

onMounted(() => {
  if (payments.value) {
    const items = payments.value.reduce((acc, item) => acc + (item.amount || 0), 0);
    paymentSum.value = items;
  }

  if (expenses.value) {
    const items = expenses.value.reduce((acc, item) => acc + (item.total_amount || 0), 0);
    expenseSum.value = items;
    updateExpenseStatus();
  }

  if (expensesRaw.value) {
    const items =
      expensesRaw.value
        ?.filter((ex) => ex.year <= Number(currentYear))
        .filter((ex) => ex.month <= Number(currentMonth))
        .reduce((acc, item) => acc + (item.amount || 0), 0) || 0;

    otherExpenseSum.value = items;
  }
});

const getdate = (month: number, year: number) => {
  // Vytvoření nového datumového objektu
  const date = new Date(year, month - 1); // Měsíce jsou v JavaScriptu indexované od 0

  // Formátování data pro získání měsíce slovy
  const monthName = format(date, "MMMM yyyy", { locale: cs });
  return monthName;
};

const summary = computed(() => {
  return [
    { label: "Stav", value: (paymentSum.value - expenseSum.value - otherExpenseSum.value).toFixed(1) },
  ];
});

const { bankAccount, bankCode } = usePayments();
watch(summary, (val) => {
  if (!val) return;

  const amount = val.find((i) => i.label === "Stav")?.value;
  qrURl.value = useQRCodeUrl({ amount, accountNumber: bankAccount, bankCode: bankCode });
});
</script>
<template>
  <v-container v-if="isValid" class="min-h-screen">
    <h2 class="text-h2">Vyúčtování</h2>
    <v-sheet class="d-flex align-center pa-3">
      <div>
        <v-row>
          <v-col cols="5">
            <v-card class="mb-5">
              <v-card-text>
                <v-list>
                  <v-list-item
                    v-for="(expense, i) in expenses?.filter(
                      (item, i) => item.year === new Date().getFullYear() || i < 6
                    )"
                    :to="{
                      name: 'phones-user-date',
                      params: { user: params.user, date: `${expense.month || 0}-${expense.year}` },
                      query: {
                        code: query.code,
                      },
                    }"
                    :key="i"
                  >
                    <v-list-item-title>
                      {{ getdate(expense.month || 0, expense.year || 0) }}
                    </v-list-item-title>

                    <template #append>
                      <v-chip
                        variant="tonal"
                        :color="
                          expense.status === 'paid'
                            ? 'info'
                            : expense.status === 'partly paid'
                            ? 'warning'
                            : 'warning'
                        "
                      >
                        {{ expense.total_amount }} CZK
                      </v-chip>
                    </template>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
            <v-card v-if="expensesRaw && expensesRaw.length > 0">
              <v-card-text>
                <v-list>
                  <v-list-item v-for="(expense, i) in expensesRaw" :key="i">
                    <v-list-item-title>
                      {{ getdate(expense.month || 0, expense.year || 0) }}
                    </v-list-item-title>
                    <v-list-item-subtitle v-if="expense.group_name">
                      {{ expense.comment }}
                    </v-list-item-subtitle>

                    <template #append>
                      <v-chip
                        :variant="
                          expense.year <= Number(currentYear) && expense.month <= Number(currentMonth)
                            ? 'plain'
                            : 'tonal'
                        "
                      >
                        {{ expense.amount }} CZK
                      </v-chip>
                    </template>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="7">
            <v-card class="mb-5">
              <v-card-text>
                <v-table>
                  <tbody>
                    <tr v-for="item in summary" :key="item.label">
                      <td>{{ item.label }}</td>
                      <td>
                        <v-chip
                          variant="outlined"
                          :color="Number(item.value) < 0 ? 'error' : 'primary'"
                          >{{ item.value + " CZK" }}</v-chip
                        >
                      </td>
                    </tr>
                  </tbody>
                </v-table></v-card-text
              >
            </v-card>

            <v-card class="mb-5">
              <v-card-text>
                <v-table>
                  <thead>
                    <tr>
                      <th colspan="2" class="text-left">Poslední 3 přijaté platby</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, i) in payments?.filter((_item, i) => i < 3)" :key="i">
                      <td>{{ item.transaction_date }}</td>
                      <td>{{ item.amount }} CZK</td>
                    </tr>
                  </tbody>
                </v-table>
              </v-card-text>
            </v-card>

            <v-card>
              <v-card-text>
                <v-sheet class="d-flex align-center justify-center flex-wrap text-center mx-auto p-1">
                  <v-table density="compact">
                    <tbody>
                      <tr>
                        <td>Číslo účtu</td>
                        <td>{{ bankAccount }}/{{ bankCode }}</td>
                      </tr>
                      <tr>
                        <td>Částka</td>
                        <td>
                          {{ summary.find((i) => i.label === "Stav")?.value.replace("-", "") }} CZK
                        </td>
                      </tr>
                      <tr>
                        <td>Zpráva pro příjemce</td>
                        <td>"{{ user }}"</td>
                      </tr>
                    </tbody>
                  </v-table>

                  <v-img :src="qrURl" v-if="qrURl" width="116"></v-img>
                  <v-btn color="primary"> colr </v-btn>
                </v-sheet>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </div>
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
