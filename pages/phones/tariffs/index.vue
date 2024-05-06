<script setup lang="ts">
const { data: tarrifs, error } = await useAsyncData("Tariffs", () =>
  $fetch("/api/mobiles/tariff", { method: "get" })
);

const { data: group } = await useAsyncData("group", () =>
  $fetch("/api/mobiles/group", { method: "GET" })
);

if (!group.value) {
  throw createError({
    statusCode: 400,
    message: "try it again later",
  });
}
const [defaultGroup] = group.value;

useHead({
  title: "Tariffs",
});

definePageMeta({
  middleware: "auth",
});
</script>

<template>
  <v-container>
    <h1 class="text-h1">Tariffs</h1>

    <v-row v-if="tarrifs && tarrifs.length > 0">
      <v-col v-for="(item, i) in tarrifs" :key="i" cols="12" md="6" lg="4">
        <v-card>
          <v-card-title class="text-blue-darken-3">
            <div class="d-flex justify-space-between">
              <div>{{ item.name }}</div>
              <div>
                <v-chip class="ma-2" label color="blue" v-if="!item.action_price">
                  {{
                    (item.monthly_fee + item.monthly_fee * ((defaultGroup.margin || 0) / 100)).toFixed(0)
                  }}
                  CZK
                </v-chip>
                <v-chip class="ma-2" label color="red" v-else>
                  {{
                    (item.action_price + item.action_price * ((defaultGroup.margin || 0) / 100)).toFixed(
                      0
                    )
                  }}
                  CZK
                </v-chip>
              </div>
            </div>
          </v-card-title>
          <v-card-text>
            <v-table>
              <thead>
                <tr>
                  <th class="text-left" colspan="2">Položka</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Data</td>
                  <td class="text-right" v-if="item.data">
                    <span v-if="item.data < 1000">{{ item.data }} MB</span>
                    <span v-else-if="item.data >= 1000"> {{ item.data / 1000 }} GB </span>
                  </td>
                  <td v-else class="text-right">
                    <v-chip color="success"> Neomezene </v-chip>
                  </td>
                </tr>
                <template v-if="item.call_rate === item.sms_rate && item.call_rate === 0">
                  <tr>
                    <td>Volani a SMS</td>
                    <td class="text-right"><v-chip color="success">Neomezene</v-chip></td>
                  </tr>
                </template>
                <template v-else-if="item.call_rate === item.sms_rate">
                  <tr>
                    <td>Calls & SMS</td>
                    <td class="text-right">{{ item.call_rate }} CZK</td>
                  </tr>
                </template>
                <template v-else>
                  <tr>
                    <td>Calls</td>
                    <td class="text-right">{{ item.call_rate }} CZK</td>
                  </tr>
                  <tr>
                    <td>SMS</td>
                    <td class="text-right">{{ item.sms_rate }} CZK</td>
                  </tr>
                </template>
              </tbody>
            </v-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
