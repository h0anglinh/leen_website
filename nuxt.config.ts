// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      title: "LH",
      link: [
        { rel: "icon", type: "image/png", href: "@/assets/favicon/favicon-32x32.png" },
        { rel: "apple-touch-icon", type: "image/png", href: "./assets/favicon/apple-touch-icon.png" },
        { rel: "author" },
      ],
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
  },
});
