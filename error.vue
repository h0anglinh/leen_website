<template>
    <v-container class="h-screen">
        <v-row justify="center" align="center" class="h-screen">
            <v-col cols="12" sm="8" md="6">
                <v-card variant="flat">
                    <v-card-title>
                        <h1 class="text-h5">Page Not Found</h1>
                    </v-card-title>
                    <v-card-text>
                        <p>We're sorry, but the page you're looking for doesn't exist.</p>
                        <p>Try going back to the <router-link to="/">home page</router-link>.</p>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'ErrorPage',
}
</script>

<style scoped>
/* Přizpůsobte si styly podle svých potřeb */
</style>
