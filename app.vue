<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | LH` : "Linh Hoang | Software Developer";
  },
});
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
