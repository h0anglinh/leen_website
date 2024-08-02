<template>
	<Pie :id="chartId" :data="chartData" :options="chartOptions" />
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Pie } from "vue-chartjs";
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js";

import type { ChartData, ChartOptions } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const chartId = ref("pie_chart-id");

const chartData = ref<ChartData<"pie">>({
	labels: ["Vue", "asd"],
	datasets: [{ data: [40, 20], backgroundColor: ["blue", "red"] }],
});

const chartOptions = ref<ChartOptions<"pie">>({
	responsive: true,
	maintainAspectRatio: false,
});
</script>
