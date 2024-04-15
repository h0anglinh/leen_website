// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      title: "LH",
    },
  },
  
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/device",
    "@nuxtjs/google-fonts",
    "@vee-validate/nuxt",
    "@nuxtjs/supabase",
    "vuetify-nuxt-module",
  ],
  supabase: {
    redirect: false,
  },
  runtimeConfig: {
    public: {
      encryptKey: process.env.THE_SECRET
    }
  },
  vuetify: {
    vuetifyOptions: {
      icons: {
        defaultSet: "fa",
        sets: ["fa", "mdi"],
      },
    },
  },
  googleFonts: {
    outputDir: "assets/fonts",
    families: {
      'DM+Mono': true
    }
  },
});
