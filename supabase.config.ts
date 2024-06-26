import type { NuxtConfig } from "nuxt/schema";

const supabase: NuxtConfig["supabase"] = {
  redirect: false,
  redirectOptions: {
    login: '/login',
    callback: '/callback',
  }
};

export default supabase;
