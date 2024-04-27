import type { NuxtConfig } from "nuxt/schema";

const supabase: NuxtConfig["supabase"] = {
  redirect: false,
  redirectOptions: {
    login: '/login',
    callback: '/callback',
    cookieRedirect: true
  }
};

export default supabase;
