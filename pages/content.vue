<script setup lang="ts">
import { useRoute } from "vue-router";
import CryptoJS from "crypto-js";
const encryptKey = useRuntimeConfig().public.encryptKey;
const route = useRoute();

const isValid = ref(true);

const persons = 2;

const expenses = ref([
  { label: "Plyn", value: Math.round(962) },
  { label: "Elektřina", value: Math.round(2221) },
  { label: "Vodné / stočné", value: 800 },
  { label: "Úklid", value: 174 },
  { label: "Popelnice", value: 174 },
  { label: "Společná elektřina", value: 380 },
  { label: "Užívání telefonního čísla 607629072", value: 270, excluded: true },
  { label: "Pojištění", value: 270 },
]);

const paymentDetails = ref([
  { label: "Číslo účtu", value: "2202867349 / 2010" },
  { label: "IBAN", value: "CZ66 2010 0000 0022 0286 7349" },
  { label: "BIC/SWIFT", value: "FIOBCZPPXXX" },
]);

const rent = 16000;
const discount = 0.4;

const totalSum = expenses.value.filter((i) => !i.excluded).reduce((sum, item) => sum + item.value, 0);

// if (!route.query?.code && process.env.NODE_ENV === "production") {
//   throw createError({
//     statusCode: 401,
//     message: "Access denied",
//   });
// }

// const encryptedCode = route.query.code as string;
// const decryptedCode = CryptoJS.AES.decrypt(encryptedCode, encryptKey).toString(CryptoJS.enc.Utf8);
// const timestamp = parseInt(decryptedCode);
// isValid.value = new Date().getTime() - timestamp < 300000; // Platnost 5 minut

// if ((!route.query?.code || !isValid) && process.env.NODE_ENV === "production") {
//   throw createError({
//     statusCode: 401,
//     message: "Access denied",
//   });
// }
</script>
<template>
  <v-container>
    <v-row justify="center" align="center" class="h-screen" v-if="!isValid">
      <v-col cols="12" sm="6" md="6">
        <v-alert icon="fa-solid fa-circle-exclamation">
          The password is invalid or the session has expired
        </v-alert></v-col
      >
    </v-row>
    <div v-else>
      <!-- <v-row justify="center" align="center" class="h-screen">
        <v-col cols="12" sm="6" md="6">
          <v-alert icon="fa-solid fa-circle-exclamation"> this offer is not available anymore. </v-alert></v-col
        >
      </v-row> -->
      <v-container>
        <v-sheet width="1100" class="pa-6 pt-10 mt-30 mx-auto" elevation="1">
          <h1 class="text-h2 mb-2">Podnájemní smlouva</h1>

          <p>
            Tento dokument slouží jako podnájemní smlouva mezi Linh Hoang, dále jen "pronajímatel",
            <br />
            a Nam Hoang dále jen "podnájemce", <br />
            k podnájmu nemovitosti nacházející se na adrese Suchý vršek 2118/8 byt č.2, dále jen "byt".
          </p>

          <h3 class="text-h4">Článek 1: Předmět podnájmu</h3>
          <p>
            Předmět podnájmu Pronajímatel se zavazuje poskytnout podnájemci do podnájmu nemovitost, která zahrnuje 3
            pokoje (2 ložnice a obývací pokoj), kuchyni, koupelnu, toaletu, balkon a sklep. V byte se nachází jeden
            další pokoj, jehož přístup je nájemci zakázán.
          </p>
          <h3 class="text-h4">Článek 2: Měsíční podnájemné a zálohy</h3>

          <p>
            Měsíční podnájemné a zálohy Měsíční podnájemné činí <b>{{ rent }} CZK</b>.
          </p>

          <v-card width="500" class="mb-5">
            <v-card-text>
              <v-table density="compact">
                <thead>
                  <tr>
                    <th class="text-left">Položka</th>
                    <th class="text-right">Částka</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in expenses" :key="item.label">
                    <td :class="{ 'text-decoration-line-through': item.excluded }">{{ item.label }}</td>
                    <td class="text-right" :class="{ 'text-decoration-line-through': item.excluded }">
                      {{ item.value }} CZK
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Celkem za zálohy</strong></td>
                    <td class="text-right">
                      <strong>{{ totalSum }} CZK</strong>
                    </td>
                  </tr>
                </tbody>
              </v-table>
            </v-card-text>
          </v-card>

          <p>
            <span v-if="discount || discount !== 0"
              >Pokud tato smlouva přejde v platnost je nájemci poskytnuta jednorazová sleva na nájemné, která činí
              {{ discount * 100 }}% z ceny nájemného.</span
            >
            (Nájemné do 31.12.2024 činí {{ rent - rent * discount }}CZK). Celkově nájemce uhradí
            <strong>měsíčně {{ rent - rent * discount + totalSum }} CZK</strong>. Platnost a sleva Tato smlouva je
            platná do 31.12.2024. Částky jsou splatné nejpozději do 5. dne v měsíci. První platba za nájem musí být
            provedena nejpozději <strong>5.5.2024</strong>.
          </p>

          Platebni údaje pronajímatele: <br />

          <v-card width="500" class="mb-5">
            <v-card-text>
              <v-table density="compact">
                <tbody>
                  <tr v-for="item in paymentDetails" :key="item.label">
                    <td>{{ item.label }}</td>
                    <td class="text-right">
                      <strong>{{ item.value }}</strong>
                    </td>
                  </tr>
                </tbody>
              </v-table>
            </v-card-text>
          </v-card>

          <h3 class="text-h4">Článek 3: Kauce</h3>

          <p>Kauce Nájemci se zavazují zaplatit kauci ve výši <b>25,000 CZK.</b></p>

          <h3 class="text-h4">Článek 4: Sankce</h3>
          <p>
            V případě zpoždění s platbou, nájemce zaplatí penalizaci ve výši 10% z dlužné částky.
            <br />Pokud nájemné nebude uhrazeno po dobu dvou měsíců, pronajímatel má právo okamžitě vypovědět smlouvu a
            omezit nájemci přístup do bytu.
          </p>
          <h3 class="text-h4">Článek 5: Prodloužení smlouvy</h3>

          <p>
            V případě prodloužení této smlouvy po 31.12.2024 se měsíční nájemné automaticky navyšuje o inflační doložku,
            jejíž výši určí pronajímatel v souladu s aktuálními ekonomickými podmínkami.
          </p>

          <h3 class="text-h4">Článek 6: Potvrzení a souhlas</h3>
          <p>
            Souhlas s těmito podmínkami nájemci vyjádří uhrazením první zálohy do 5.5.2024, což bude považováno za
            přijetí těchto podmínek.
          </p>
          <h3 class="text-h4">Článek 7: Výpovědní lhůta a vyklizení bytu</h3>
          <p>
            Výpovědní lhůta této smlouvy je jeden měsíc, který začíná běžet dnem doručení písemného oznámení výpovědi
            druhé straně. Nájemci jsou povinni byt vyklidit nejpozději do posledního dne platnosti nájemní smlouvy. V
            případě, že nájemci byt nevyklidí v stanoveném termínu, pronajímatel má právo využít služby úklidové
            společnosti k vyklizení bytu. Náklady spojené s vyklizením bytu úklidovou službou budou následně fakturovány
            nájemcům. Nájemci se zavazují tyto náklady uhradit v plné výši.
          </p>
        </v-sheet>
      </v-container>
    </div>
  </v-container>
</template>

<style scoped>
p {
  margin-bottom: 2rem;
  text-align: justify;
  font-size: 1.2rem;
}
</style>
