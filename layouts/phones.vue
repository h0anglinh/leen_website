<script setup lang="ts">
const route = useRoute()
const router = useRouter()

const isRootPage = ref(false)
const goBackToParent = () => {
    const currentPath = route.fullPath
    const segments = currentPath.split('/')
    segments.pop()
    const parentPath = segments.join('/')
    if (parentPath !== '') {
        router.push(parentPath)
    } else {
        router.push('/')
    }
}
</script>

<template>
    <v-btn @click="goBackToParent">Back</v-btn>
    <slot />
</template>
