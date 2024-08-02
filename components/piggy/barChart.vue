<template>
	<div class="chart-container">
		<Bar :style="{ height: '350px', position: 'relative' }" :id="chartId" :options="props.options" :data="props.data" />
	</div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Bar } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";

import type { ChartData, ChartOptions } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const chartId = ref("my-chart-id");

interface BarChartProps {
	data: ChartData<"bar">;
	options: ChartOptions<"bar">;
}

const props = withDefaults(defineProps<BarChartProps>(), {
	data: () => {
		return {
			labels: ["January", "February", "March"],
			datasets: [
				{
					data: [40, 20, 12],
					backgroundColor: "#4BB2FA",
					label: "Savings",
				},
			],
		};
	},
	options: () => ({
		responsive: true,
		indexAxis: "x",
	}),
});
</script>
