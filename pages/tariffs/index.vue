<script setup lang="ts">
import CryptoJS from "crypto-js";
import type { Enums, Tables } from "~/typings/database.types";
definePageMeta({
	middleware: "semiauth",
});

const { path, query } = useRoute();
if (!query.code) {
	useRouter().push({ name: "signin", query: { redirect: path } });
}
const tabs: { label: string; value: Enums<{ schema: "mobile_services" }, "tariff_group"> }[] = [
	{ label: "o2 (NEW)", value: "o2" },
	{ label: "o2 family (OLD)", value: "o2 family" },
];
const thegroup = ref<Tables<{ schema: "mobile_services" }, "groups">>({
	margin: 65,
	discount: 0,
	name: "default",
	group_id: 9999,
});

const tariffs = ref<Tables<{ schema: "mobile_services" }, "tariff">[]>();
const tab = ref<Enums<{ schema: "mobile_services" }, "tariff_group">>("o2");

const encryptKey = useRuntimeConfig().public.encryptKey;
let [user, time] = (CryptoJS.AES.decrypt(query.code || "", encryptKey).toString(CryptoJS.enc.Utf8) as string).split(":");

const fetchTariffs = async () => {
	const groupData = await $fetch("/api/mobiles/group", {
		query: {
			groupName: user.replace("nepomuk", "nepal").replace("toet", "nha toet"),
		},
	});
	const data = await $fetch("/api/mobiles/tariff");
	tariffs.value = data;
	808;
	thegroup.value = groupData[0];
};

onMounted(async () => {
	await fetchTariffs();
});
</script>
<template>
	<countdown v-if="time" :start-time-in-ms="Number(time)" />
	<v-container fluid>
		Tariffs
		<v-tabs fixed-tabs v-model="tab" class="mb-10">
			<v-tab v-for="tab in tabs" :key="tab.value" :value="tab.value"> {{ tab.label }}</v-tab>
		</v-tabs>

		<v-tabs-window v-model="tab">
			<v-tabs-window-item v-for="tabItem in tabs" :key="tabItem.value" :value="tabItem.value">
				<v-alert
					class="my-5 mx-auto"
					width="550"
					:title="tabItem.value !== 'o2' ? 'POZOR' : undefined"
					:text="tabItem.value !== 'o2' ? 'Platnost tarifů do 18.6.2024' : 'Tarify budou v nabídce od 18.6.2024'"
					:type="tabItem.value === 'o2' ? 'info' : 'error'"
				>
				</v-alert>
				<v-row v-if="tariffs">
					<v-col
						v-for="(item, i) in tariffs
							.filter((item) => item.group_name === tabItem.value && item.active)
							.sort((a, b) => (a.monthly_fee < b.monthly_fee ? -1 : 1))"
						:key="i"
						cols="12"
						md="6"
						lg="4"
					>
						<tariff-card :item="item" :group="thegroup" />
					</v-col>
				</v-row>
			</v-tabs-window-item>
		</v-tabs-window>
	</v-container>
</template>

<style scoped></style>
