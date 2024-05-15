<script setup lang="ts">
const titleTemplate = (titleChunk: string) => {
    if (process.env.NODE_ENV === 'development') {
        return titleChunk ? `DEV__${titleChunk} | LH` : 'DEV__Linh Hoang | Software Developer'
    }
    return titleChunk ? `${titleChunk} | LH` : 'Linh Hoang | Software Developer'
}

useHead({
    titleTemplate,
})
</script>

<template>
    <NuxtLoadingIndicator />
    <v-app>
        <NuxtLayout>
            <v-main>
                <NuxtPage />
            </v-main>
        </NuxtLayout>
    </v-app>
</template>
