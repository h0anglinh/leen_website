<script setup lang="ts">
const hash = useRoute().hash;

const items = ref([
  {
    label: "phone",
    hash: "#phone",
  },
  {
    label: "laptop",
    hash: "#laptop",
  },
]);

const currentItem = ref("device");

const contacts = ref([
  {
    label: "+420 774 316 610",
    href: "tel:+420774316610",
    icon: "fa-solid fa-mobile-screen",
    meta: {
      tooltip: {
        msg: "yep, this is my phone number, but for obvious reasons, I won't be available on it :)",
        availableForHash: "#phone",
      },
    },
  },
  {
    label: "linh.hoang@outlook.cz",
    href: "mailto:linh.hoang@outlook.cz",
    icon: "fa-regular fa-envelope",
  },
  {
    label: "ExxonMobil Czech Republic",
    href: "https://maps.app.goo.gl/nJFTw84ghEUCHkV78",
    icon: "fa-solid fa-location-dot",
    meta: {
      tooltip: {
        msg: "Here I work",
        availableForHash: "all",
      },
    },
  },
]);

onMounted(() => {
  currentItem.value = items.value.find((item) => item.hash === hash)?.label || "device";
});
</script>
<template>
  <v-container>
    <div class="h-screen d-flex align-center">
      <div>
        <h1 class="text-h1">Hello!</h1>
        <p>
          If you're reading this, it means you've found my
          {{ currentItem }}. I'm really grateful that you took a moment to scan the QR code.
        </p>
        <h2 class="text-decoration-underline">How You Can Help</h2>
        <p>
          If you could return the {{ currentItem }} to me, I would be incredibly thankful. If you feel
          comfortable, we can arrange for the {{ currentItem }} to be returned in person, or I can
          organize for it to be picked up at a location that suits you.
        </p>
        <h2>Additional Options</h2>
        <ul>
          <li>
            Police: You may also consider handing the {{ currentItem }} over to the nearest police
            station. The police have procedures for found items and can help return them to their
            rightful owners.
          </li>
          <li>
            Facility Staff: If you found the {{ currentItem }} in a specific facility, like a restaurant
            or café, you could approach the staff or management, who can assist in getting the
            {{ currentItem }} back to me.
          </li>
        </ul>

        <p>
          It's amazing to see that there are still people in the world who are willing to help others.
          Thank you for your time and for deciding to do the right thing.
        </p>

        <p>
          Thank you for your help, <br />
          Linh
        </p>

        <v-chip-group>
          <v-tooltip
            v-for="contact in contacts"
            location="top"
            :text="contact.meta?.tooltip.msg"
            :disabled="
              !contact.meta?.tooltip.msg ||
              (contact.meta.tooltip.availableForHash !== hash &&
                contact.meta.tooltip.availableForHash !== 'all')
            "
          >
            <template v-slot:activator="{ props }">
              <v-chip :href="contact.href" :prepend-icon="contact.icon" v-bind="props">
                {{ contact.label }}
              </v-chip>
            </template>
          </v-tooltip>
        </v-chip-group>
      </div>
    </div>
  </v-container>
</template>

<style>
p {
  margin: 0.5em 0;
  text-align: justify;
}
</style>
