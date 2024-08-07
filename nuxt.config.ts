// https://nuxt.com/docs/api/configuration/nuxt-config
import supabase from "./supabase.config";
import vuetify from './vuetify.config'

const app = {
  head: {
    meta: [
      { charset: "utf-8" },
      { hid: 'robots', name: 'robots', content: 'noindex, nofollow' },
      { name: 'author', content: 'Linh Hoang' },
      { "http-equiv":"refresh", content: '3600' },
      { property: 'og:title', content: 'Linh Hoang | Software Developer' },
      { property: 'og:description', content: 'I create exciting and fun things, and I cook delicious Pho :)' },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'Linh Hoang' },
      { property: 'og:url', content: 'https://linhhoang.eu' }
    ]
  },
}

export default defineNuxtConfig({
 devtools: { enabled: true },
 app,

 $development: {
   app
 },

 $production: {
   app
 },

 modules: [
   "@nuxtjs/tailwindcss",
   "@nuxtjs/device",
   "@nuxtjs/google-fonts",
   "@vee-validate/nuxt",
   "@nuxtjs/supabase",
   "vuetify-nuxt-module",
   '@pinia/nuxt',
 ],

 pinia: {
   storesDirs: ['./stores/**'],
 },

 supabase,

 runtimeConfig: {
   mode: process.env.NODE_ENV,
   public: {
     encryptKey: process.env.THE_SECRET,
     toet_pass: process.env.TOET_PASSWORD,
     nepal_pass: process.env.NEPAL_PASSWORD
   }
 },

 vuetify: {
   vuetifyOptions:  './vuetify.config.ts'
 },

 googleFonts: {
   outputDir: "assets/fonts",
   families: {
     'DM+Mono': true
   }
 },

 routeRules: {
  "/": { prerender: true }
 },

 compatibilityDate: '2024-08-01'
});