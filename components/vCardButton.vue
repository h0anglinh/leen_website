<template>
    <div>
        <v-btn prepend-icon="fa-solid fa-plus" variant="outlined" @click="downloadVCard"> ADD TO CONTACTS</v-btn>
        <!-- <div v-if="qrCodeUrl">
            <img :src="qrCodeUrl" alt="QR Code" />
        </div>

        <v-btn @click="getCode">GET CODE</v-btn> -->
    </div>
</template>

<script lang="ts" setup>
import { VCardType, type VCardInput } from '~/composables/useGenerateVCard'
import QRCode from 'qrcode'
const { my } = usePersonalInfo()
const qrCodeUrl = ref<string>()
const vCard = ref<VCardInput>({
    kind: 'individual',
    firstName: 'Linh',
    lastName: 'Hoang2',
    phone: [{ number: '+420 774 316 610', type: VCardType.Main }],
    email: [
        { email: 'linh.hoang@exxonmobil.com', type: 'work' },
        { email: my.email, type: 'personal' },
    ],
    address: { address: my.workAddress, type: VCardType.Work },
    web: 'https://linhhoang.eu',
})

const downloadVCard = () => {
    useGenerateVCard(vCard.value, 'file')
}

const getCode = async () => {
    const str = useGenerateVCard(vCard.value, 'string-only')
    qrCodeUrl.value = await QRCode.toDataURL(str as string)
}
</script>

<style scoped></style>
