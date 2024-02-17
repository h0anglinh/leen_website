<script setup lang="ts">
import type { RouteLocationRaw } from "vue-router";

const contacts = ref<{ icon: string; text: string; href?: string; to?: RouteLocationRaw }[]>([
  {
    icon: "fa-solid fa-envelope",
    text: "E-mail",
    href: "mailto:linh.hoang@outlook.cz",
  },
  {
    icon: "fa-brands fa-linkedin",
    text: "LinkedIn",
    href: "https://www.linkedin.com/in/linh-h0ang/",
  },
  {
    icon: "fa-brands fa-square-facebook",
    text: "Facebook",
    href: "https://www.facebook.com/hoang.l1nh",
  },
  {
    text: "Drop a message",
    icon: "fa-regular fa-face-laugh-wink",
    to: { name: "send_me_a_message" },
  },
]);
</script>

<template>
  <v-container class="h-screen wrapper" fluid>
    <v-row align="center">
      <v-col>
        <h1>LINH <span>Hoang</span></h1>
        <h2 class="text-right">
          developer <br />
          based in Prague, CZ
        </h2>
      </v-col>
    </v-row>
    <div class="contacts">
      <v-chip-group>
        <v-hover v-for="contact in contacts">
          <template v-slot:default="{ isHovering, props }">
            <v-chip
              :elevation="isHovering ? 1 : 0"
              v-bind="props"
              :key="contact.text"
              label
              :variant="isHovering ? 'tonal' : 'text'"
              :prepend-icon="contact.icon"
              :href="contact.href"
              :to="contact.to"
              :target="contact.href ? '_blank' : undefined"
            >
              {{ contact.text }}
            </v-chip>
          </template>
        </v-hover>
      </v-chip-group>
    </div>
  </v-container>
</template>

<style scoped lang="scss">
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
  h1 {
    font-size: 5.5em;
    letter-spacing: 0.1em;
  }
  h2 {
    font-size: 3em;
    margin-right: 0.2em;
  }
  .contacts {
    position: absolute;
    bottom: 1em;
    left: 1em;
  }
}
.heading {
  flex-direction: column;
  h1 {
    font-size: 5.5em;
    letter-spacing: 1.2rem !important;
    @media (max-width: 768px) {
      // 768px je často používaná šířka pro rozlišení mezi mobilním a desktop zobrazením
      font-size: 1.3em;
      letter-spacing: 1rem !important; // Menší velikost fontu pro mobilní zařízení
    }
    position: relative;
    display: inline-flex;

    align-items: center;
    position: relative;
    &::after {
      content: "";
      width: 55%;
      border-bottom: 2px solid red;
      position: absolute;
      bottom: 10%;
      left: 50%;
      padding-bottom: 2rem;
      transform: translate(-50%, 0);
    }
  }
  .desc {
    font-size: 1.5em;
    margin: 0 0.6em;
    text-transform: uppercase;
  }
}
</style>
