<script setup lang="ts">
const title = 'Linh Hoang | Software Developer'
const titleTemplate = (titleChunk: unknown) => {
    if (process.env.NODE_ENV === 'development') {
        return titleChunk ? '[DEV] ${titleChunk} | LH' : `[DEV] ${title}`
    }
    return titleChunk ? `${titleChunk} | LH` : title
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
