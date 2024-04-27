<script setup lang="ts">
const user = useSupabaseUser();

const { redirect } = useRoute().query;

watch(
  user,
  () => {
    if (user.value) {
      // Clear cookie
      // Redirect to path
      return navigateTo((redirect as string) || "/");
    }
  },
  { immediate: true }
);
</script>
<template>
  <div>Waiting for login... {{ redirect }}</div>
</template>
