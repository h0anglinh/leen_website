<template>
	<v-alert :color="timeLeftMS > 60000 ? 'grey-lighten-5' : 'red'" border="start" border-color="primary" class="m-5 mt-3" elevation="1">
		<div class="d-flex justify-center ga-5">
			<div class="d-flex flex-column align-center" v-for="(value, key) in timeLeft" :key="key">
				<template v-if="value !== 0">
					<span class="number">{{ value }}</span>
					<span class="label">{{ key }}</span>
				</template>
			</div>
		</div>
	</v-alert>
</template>

<script setup lang="ts">
// Definování props pomocí defineProps
interface Props {
	startTimeInMs: number;
}

const onCountdownEnd = () => {
	// Tato funkce se spustí na konci odpočtu
	console.log("Countdown finished");
	// Můžete sem přidat jakýkoli další kód, který se má spustit po skončení odpočtu
};

const router = useRouter();
const route = useRoute();

const props = defineProps<Props>();

interface TimeLeft {
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
}

const timeLeft = ref<TimeLeft>({
	days: 0,
	hours: 0,
	minutes: 0,
	seconds: 0,
});

const is_dev = process.env.NODE_ENV === "development";
const is_prod = process.env.NODE_ENV === "production";
const endTime = ref(0);
const timeLeftMS = ref(0);
const endTimeMS = is_dev ? 5 * 60 * 60 * 1000 : is_prod ? 5 * 60 * 1000 : 1000; // add 5 min (prod) vs 5 hours (dev)

const startCountdown = () => {
	endTime.value = props.startTimeInMs + endTimeMS;
	updateCountdown();
	setInterval(updateCountdown, 1000);
};

const updateCountdown = () => {
	if (endTime.value === null) return;

	const now = new Date().getTime();
	timeLeftMS.value = endTime.value - now;

	if (timeLeftMS.value < 0) {
		timeLeft.value = {
			days: 0,
			hours: 0,
			minutes: 0,
			seconds: 0,
		};
		onCountdownEnd();

		return;
	}

	timeLeft.value = {
		days: Math.floor(timeLeftMS.value / (1000 * 60 * 60 * 24)),
		hours: Math.floor((timeLeftMS.value % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
		minutes: Math.floor((timeLeftMS.value % (1000 * 60 * 60)) / (1000 * 60)),
		seconds: Math.floor((timeLeftMS.value % (1000 * 60)) / 1000),
	};
};

watch(() => props.startTimeInMs, startCountdown);

onMounted(startCountdown);
</script>

<style scoped>
.number {
	font-size: 1rem;
	font-weight: bold;
	transition: all 0.5s ease-in-out;
}
.label {
	font-size: 0.5rem;
	text-transform: uppercase;
}
</style>
