<script setup lang="ts">
import CryptoJS from 'crypto-js'
import type { Tables } from '~/typings/database.types'
import { format } from 'date-fns'
import { cs } from 'date-fns/locale'
import usePersonalInfo from '~/composables/usePersonalInfo'
definePageMeta({
    middleware: 'semiauth',
})
const { path, query } = useRoute()
if (!query.code) {
    useRouter().push({ name: 'signin', query: { redirect: path } })
}
const encryptKey = useRuntimeConfig().public.encryptKey
let [user, time] = (CryptoJS.AES.decrypt(query.code, encryptKey).toString(CryptoJS.enc.Utf8) as string).split(':')
const { mobile } = useDisplay()
const { bankAccount, bankCode } = usePersonalInfo()

const paymentSum = ref(0)
const expenseSum = ref(0)
const otherExpenseSum = ref(0)
const qrURl = ref<string>()

type extendedExpense = Tables<{ schema: 'mobile_services' }, 'group_expenses_summary'> & {
    status: 'paid' | 'partly paid' | 'waiting for payment'
}

const { data: expenses } = await useAsyncData<extendedExpense[]>('expenses', () =>
    $fetch('/api/expense', {
        method: 'GET',
        query: {
            groupName: user.replace('toet', 'nha toet').replace('nepomuk', 'nepal'),
        },
    })
)

const { data: expensesRaw } = await useAsyncData('expenses-raw', () =>
    $fetch('/api/expense/raw', {
        method: 'GET',
        query: {
            groupName: user.replace('toet', 'nha toet').replace('nepomuk', 'nepal'),
            type: 'others',
        },
    })
)

const getdate = (month: number, year: number) => {
    // Vytvoření nového datumového objektu
    const date = new Date(year, month - 1) // Měsíce jsou v JavaScriptu indexované od 0

    // Formátování data pro získání měsíce slovy
    const monthName = format(date, 'MMMM yyyy', { locale: cs })
    return monthName
}

const { data: payments } = await useAsyncData('payments', () =>
    $fetch('/api/payments', {
        method: 'GET',
        query: { name: user.replace('nepomuk', 'Suot') },
    })
)

const currentYear = format(new Date(), 'yyyy')
const currentMonth = format(new Date(), 'MM')

const summary = computed(() => {
    return [
        {
            label: 'Stav',
            value: (paymentSum.value - expenseSum.value - otherExpenseSum.value).toFixed(1),
        },
    ]
})

watch(summary, (val) => {
    if (!val) return
    const amount = val.find((i) => i.label === 'Stav')?.value
    qrURl.value = useQRCodeUrl({
        amount,
        accountNumber: bankAccount,
        bankCode: bankCode,
    })
})
</script>
<template>
    <countdown :start-time-in-ms="Number(time)" />
    <v-container>
        <h2 class="text-h2 my-10">Vyúčtování</h2>
        <v-sheet class="d-flex align-center pa-3">
            <v-row>
                <v-col cols="12" lg="6" md="6" :order="mobile ? 2 : 1">
                    <v-card class="mb-5">
                        <v-card-text>
                            <v-list>
                                <v-list-item v-for="(expense, i) in expenses?.filter((item, i) => item.year === new Date().getFullYear() || i < 6)" :key="i">
                                    <v-list-item-subtitle>
                                        {{ getdate(expense.month || 0, expense.year || 0) }}
                                    </v-list-item-subtitle>

                                    <template #append>
                                        <v-chip variant="tonal" :color="expense.status === 'paid' ? 'info' : expense.status === 'partly paid' ? 'warning' : 'warning'">
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
                                        <v-chip :variant="expense.year <= Number(currentYear) && expense.month <= Number(currentMonth) ? 'plain' : 'tonal'">
                                            {{ expense.amount }} CZK
                                        </v-chip>
                                    </template>
                                </v-list-item>
                            </v-list>
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="12" lg="6" md="6" :order="mobile ? 1 : 2">
                    <v-card class="mb-5">
                        <v-card-text>
                            <v-table>
                                <tbody>
                                    <tr v-for="item in summary" :key="item.label">
                                        <td>{{ item.label }}</td>
                                        <td>
                                            <v-chip variant="outlined" :color="Number(item.value) < 0 ? 'error' : 'primary'">{{ item.value + ' CZK' }}</v-chip>
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
                                        <td class="text-right">{{ item.amount }} CZK</td>
                                    </tr>
                                </tbody>
                            </v-table>
                        </v-card-text>
                    </v-card>

                    <v-card>
                        <v-card-text>
                            <v-sheet class="d-flex align-center justify-center flex-wrap text-center mx-auto p-1">
                                <v-row>
                                    <v-col cols="12" md="8"
                                        ><v-table density="compact">
                                            <tbody>
                                                <tr>
                                                    <td>Číslo účtu</td>
                                                    <td>{{ bankAccount }}/{{ bankCode }}</td>
                                                </tr>
                                                <tr>
                                                    <td>Částka</td>
                                                    <td>
                                                        {{ summary.find((i) => i.label === 'Stav')?.value.replace('-', '') }}
                                                        CZK
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Zpráva pro příjemce</td>
                                                    <td>"{{ user }}"</td>
                                                </tr>
                                            </tbody>
                                        </v-table></v-col
                                    >
                                    <v-col cols="12" md="4">
                                        <v-img :src="qrURl" v-if="qrURl" width="110" class="mx-auto"></v-img>
                                    </v-col>
                                </v-row>
                            </v-sheet>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-sheet>
    </v-container>
</template>

<style scoped></style>
