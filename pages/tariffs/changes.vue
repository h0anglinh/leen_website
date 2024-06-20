<script setup lang="ts">
import CryptoJS from "crypto-js";
import TariffCard2 from "~/components/TariffCard2.vue";
import type { Enums, Tables } from "~/typings/database.types";
definePageMeta({
	middleware: "semiauth",
});

const { path, query: pathQuery } = useRoute();
if (!pathQuery.code) {
	useRouter().push({ name: "signin", query: { redirect: path } });
}
const thegroup = ref<Tables<{ schema: "mobile_services" }, "groups">>({
	margin: 65,
	discount: 0,
	name: "default",
	group_id: 9999,
});

const tariffs = ref<Tables<{ schema: "mobile_services" }, "vw_tariff_change">[]>();

const encryptKey = useRuntimeConfig().public.encryptKey;
let [user, time] = (CryptoJS.AES.decrypt(pathQuery.code || "", encryptKey).toString(CryptoJS.enc.Utf8) as string).split(":");

const fetchTariffs = async () => {
	const groupData = await $fetch("/api/mobiles/group", {
		query: {
			groupName: user.replace("nepomuk", "nepal").replace("toet", "nha toet"),
		},
	});
	const tariffsData = await $fetch("/api/mobiles/changes");
	tariffs.value = tariffsData;
	thegroup.value = groupData[0];
};

onMounted(async () => {
	await fetchTariffs();
});
</script>
<template>
	<div>
		<countdown v-if="time" :start-time-in-ms="Number(time)" />
		<v-container fluid>
			<v-btn :to="{ name: 'tariffs', query: { code: pathQuery.code } }" variant="tonal" color="primary" class="my-3"
				>Kompletni seznam tarifů</v-btn
			>
			<h1 class="text-h2">Tariffs</h1>
			<template v-for="(item, i) in tariffs" :key="item.id">
				<TariffCard2 :item :group="thegroup" direct="from" />
				<hr class="my-4" v-if="tariffs?.length !== i + 1" />
			</template>
		</v-container>
	</div>
</template>

<style scoped></style>
