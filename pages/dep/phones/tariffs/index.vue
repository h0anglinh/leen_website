<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import CryptoJS from 'crypto-js'
import type { Json, TablesInsert } from '~/typings/database.types'
const { encryptKey, toet_pass, nepal_pass } = useRuntimeConfig().public
const headTitle = 'My Docs'
useHead({
    title: headTitle,
    meta: [{ property: 'og:title', content: `${headTitle} | LH` }],
})

definePageMeta({
    middleware: 'semiauth',
})

const user = ref('')
const router = useRouter()

const users = ref([
    {
        user: 'toet',
        password: toet_pass,
    },
    {
        user: 'nepomuk',
        password: nepal_pass,
    },
])

async function handleLogin() {
    if (!user.value) {
        alert('invalid user ')
        return
    }

    const theUser = user.value.toLowerCase().trim()
    const deviceInfo = useDeviceInfo()

    const passed = users.value.find((i) => i.user === theUser)?.user === theUser
    const mode = process.env.NODE_ENV
    const body: TablesInsert<'log'> = {
        correct_pass: passed,
        user: theUser,
        meta: deviceInfo as any,
        MODE: mode,
    }

    await $fetch('/api/logs', {
        method: 'POST',
        body,
    })

    if (passed) {
        const timestamp = new Date().getTime()
        const code = CryptoJS.AES.encrypt(`${theUser}:${timestamp}`, encryptKey).toString()

        router.push({ name: 'phones-tariffs-group', params: { group: theUser }, query: { code } })
    } else {
        alert('Incorrect user / password')
    }
}
</script>

<template>
    <v-container class="h-screen">
        <v-row justify="center" align="center" class="h-screen">
            <v-col cols="12" sm="6" md="5">
                <v-card>
                    <v-form @submit.prevent="handleLogin">
                        <v-card-title class="text-center"> Enter username </v-card-title>
                        <v-card-text>
                            <v-text-field v-model="user" label="User" type="text"></v-text-field>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" type="submit">SUBMIT</v-btn>
                            <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-form>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
