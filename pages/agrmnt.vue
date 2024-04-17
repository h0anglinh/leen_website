<template>
  <v-container class="h-screen">
    <v-row justify="center" align="center" class="h-screen">
      <v-col cols="12" sm="6" md="4">
        <v-card>
          <v-form @submit.prevent="handleLogin">
            <v-card-title class="text-center"> Enter password </v-card-title>
            <v-card-text>
              <v-text-field v-model="password" label="Password" type="password"></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" type="submit">SUBMIT</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import CryptoJS from "crypto-js";
const encryptKey = useRuntimeConfig().public.encryptKey;
const headTitle = "My Docs";
useHead({
  title: headTitle,
  meta: [{ property: "og:title", content: `${headTitle} | LH` }],
});

const password = ref("");
const router = useRouter();
const correctPassword = "leech";
type IpStackResponse = {
  ip: string;
  country_code: string;
  country_name: string;
  region_code: string;
  region_name: string;
  city: string;
  zip: string;
  latitude: number;
  longitude: number;
  location: {
    geoname_id?: number;
    capital: string;
    languages: Array<{
      code: string;
      name: string;
      native: string;
    }>;
    country_flag: string;
    country_flag_emoji: string;
    country_flag_emoji_unicode: string;
    calling_code: string;
    is_eu: boolean;
  };
};

async function handleLogin() {
  // const fetchIpData = async (ipAddress: string, accessKey: string) => {
  //   const url = `http://api.ipstack.com/${ipAddress}?access_key=${accessKey}&format=1`;

  //   try {
  //     const { data } = await useFetch(url);
  //     console.log(data.value);

  //     return data.value;
  //   } catch (error) {
  //     console.error("Error fetching IP data:", error);
  //     return null;
  //   }
  // };

  // Usage:
  // const accessKey = 'YOUR_ACCESS_KEY_FROM_IPSTACK';
  // fetchIpData('134.201.250.155', accessKey).then(data => console.log(data));

  const deviceInfo = useDeviceInfo();

  // const resData = await fetchIpData('ip', 'ac')

  const passed = password.value === correctPassword;
  await $fetch("/api/logs", {
    method: "POST",
    body: { correct_pass: passed, meta: deviceInfo },
  });

  if (passed) {
    const timestamp = new Date().getTime();
    const code = CryptoJS.AES.encrypt(`${timestamp}`, encryptKey).toString();
    router.push({ path: "/content", query: { code } });
  } else {
    alert("Incorrect password");
  }
}
</script>
