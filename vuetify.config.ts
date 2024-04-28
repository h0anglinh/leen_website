// vuetify.config.ts
import type { ExternalVuetifyOptions } from 'vuetify-nuxt-module'
import {   type ThemeDefinition } from 'vuetify'
import { defineVuetifyConfiguration } from 'vuetify-nuxt-module/custom-configuration'
const myCustomLightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    background: '#F9F9F9',
    surface: '#FFFFFF',
    primary: '#6200EE',
    'primary-darken-1': '#3700B3',
    secondary: '#03DAC6',
    'secondary-darken-1': '#018786',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  },
}
export default defineVuetifyConfiguration({
  /* vuetify options */
  theme: {
    defaultTheme: 'myCustomLightTheme',
    themes: {
      myCustomLightTheme
    }
  },
  icons: {
    defaultSet: "fa",
    sets: ["fa", "mdi"],
  },
})