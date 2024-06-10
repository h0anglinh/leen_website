<script setup lang="ts">
import CryptoJS from 'crypto-js'
import type { Enums, Tables } from '~/typings/database.types'
definePageMeta({
    middleware: 'semiauth',
})

const { path, query } = useRoute()
if (!query.code) {
    useRouter().push({ name: 'signin', query: { redirect: path } })
}
const tabs: { label: string; value: Enums<{ schema: 'mobile_services' }, 'tariff_group'> }[] = [
    { label: 'o2 (NEW)', value: 'o2' },
    { label: 'o2 family (OLD)', value: 'o2 family' },
]
const thegroup = ref<Tables<{ schema: 'mobile_services' }, 'groups'>>({
    margin: 65,
    discount: 0,
    name: 'default',
    group_id: 9999,
})

const tariffs = ref<Tables<{ schema: 'mobile_services' }, 'tariff'>[]>()
const tab = ref<Enums<{ schema: 'mobile_services' }, 'tariff_group'>>('o2')

const encryptKey = useRuntimeConfig().public.encryptKey
let [user, time] = (CryptoJS.AES.decrypt(query.code || '', encryptKey).toString(CryptoJS.enc.Utf8) as string).split(':')

const fetchTariffs = async () => {
    const groupData = await $fetch('/api/mobiles/group', {
        query: {
            groupName: user.replace('nepomuk', 'nepal').replace('toet', 'nha toet'),
        },
    })
    const tariffsData = await $fetch('/api/mobiles/tariff')
    tariffs.value = tariffsData

    thegroup.value = groupData[0]
}

onMounted(async () => {
    await fetchTariffs()
})

const isDev = process.env.NODE_ENV === 'development'
</script>
<template>
    <v-container> Tariffs {{ user }}</v-container>
    <v-tabs fixed-tabs v-model="tab" class="mb-10">
        <v-tab v-for="tab in tabs" :key="tab.value" :value="tab.value"> {{ tab.label }}</v-tab>
    </v-tabs>

    <v-tabs-window v-model="tab">
        <v-tabs-window-item v-for="tabItem in tabs" :key="tabItem.value" :value="tabItem.value">
            <v-alert
                class="my-5 mx-auto"
                width="550"
                :title="tabItem.value !== 'o2' ? 'POZOR' : undefined"
                :text="tabItem.value !== 'o2' ? 'Platnost tarifů do 18.6.2024' : 'Tarify budou v nabídce od 18.6.2024'"
                :type="tabItem.value === 'o2' ? 'info' : 'error'"
            >
            </v-alert>
            <v-row v-if="tariffs">
                <v-col
                    v-for="(item, i) in tariffs.filter((item) => item.group_name === tabItem.value && item.active).sort((a, b) => (a.monthly_fee < b.monthly_fee ? -1 : 1))"
                    :key="i"
                    cols="12"
                    md="6"
                    lg="4"
                >
                    <v-card>
                        <v-card-title class="text-blue-darken-3">
                            <div class="d-flex justify-space-between">
                                <div>{{ item.name }}</div>
                                <div v-if="thegroup">
                                    <v-chip class="ma-2" label color="grey" v-if="isDev">
                                        {{ item.monthly_fee }}
                                        CZK
                                    </v-chip>
                                    <v-chip class="ma-2" label color="blue" v-if="!item.action_price">
                                        {{ (item.monthly_fee + item.monthly_fee * ((thegroup.margin || 5) / 100)).toFixed(0) }}

                                        CZK
                                    </v-chip>
                                    <v-chip class="ma-2" label color="red" v-else-if="item.action_price === item.monthly_fee">
                                        <span class="text-decoration-line-through mr-2"> {{ (item.monthly_fee + item.monthly_fee * ((thegroup.margin || 5) / 100)).toFixed(0) }}</span>
                                        {{ (item.action_price + item.action_price * ((thegroup.margin || 5) / 100)).toFixed(0) }}
                                        CZK
                                    </v-chip>
                                    <template v-else>
                                        <v-chip>
                                            <span class="text-decoration-line-through mr-2">
                                                {{ (item.monthly_fee + item.monthly_fee * ((thegroup.margin || 5) / 100)).toFixed(0) }} CZK</span
                                            >
                                        </v-chip>
                                        <v-chip class="ma-2" label color="red">
                                            {{ (item.action_price + item.action_price * ((thegroup.margin || 5) / 100)).toFixed(0) }}
                                            CZK
                                        </v-chip>
                                    </template>
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
                                        <td class="text-right" v-if="typeof item.data === 'number'">
                                            <span v-if="item.data < 1000">{{ item.data }} MB</span>
                                            <span v-else-if="item.data >= 1000"> {{ item.data / 1000 }} GB </span>
                                        </td>
                                        <td v-else class="text-right">
                                            <v-chip color="success"> Neomezene </v-chip>
                                        </td>
                                    </tr>
                                    <template v-if="item.call_rate === item.sms_rate && item.call_rate === 0">
                                        <tr>
                                            <td>Voláni a SMS</td>
                                            <td class="text-right"><v-chip color="success">Neomezeně</v-chip></td>
                                        </tr>
                                    </template>
                                    <template v-else-if="item.call_rate === item.sms_rate">
                                        <tr>
                                            <td>Voláni a SMS</td>
                                            <td class="text-right" v-if="item.call_rate">{{ (item.call_rate + item.call_rate * ((thegroup.margin || 5) / 100)).toFixed(1) }} CZK</td>
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
        </v-tabs-window-item>
    </v-tabs-window>
</template>

<style scoped></style>
