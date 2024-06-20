<template>
	<v-card>
		<v-card-title class="text-blue-darken-3">
			<div class="d-flex justify-space-between flex-column overflow-auto my-2">
				<div>{{ item.name }}</div>
				<div v-if="group">
					<v-chip class="mr-2" label color="grey" v-if="isDev" :size="chipSize">
						{{ item.monthly_fee }}
						CZK
					</v-chip>
					<v-chip class="ma-2" label color="blue" v-if="!item.action_price" :size="chipSize">
						{{ (item.monthly_fee + item.monthly_fee * ((group.margin || 5) / 100)).toFixed(0) }}

						CZK
					</v-chip>
					<v-chip class="ma-2" label color="red" v-else-if="item.action_price === item.monthly_fee" :size="chipSize">
						<span class="text-decoration-line-through mr-2">
							{{ (item.monthly_fee + item.monthly_fee * ((group.margin || 5) / 100)).toFixed(0) }}</span
						>
						{{ (item.action_price + item.action_price * ((group.margin || 5) / 100)).toFixed(0) }}
						CZK
					</v-chip>
					<template v-else>
						<v-chip :size="chipSize">
							<span class="text-decoration-line-through mr-2">
								{{ (item.monthly_fee + item.monthly_fee * ((group.margin || 5) / 100)).toFixed(0) }}
								CZK</span
							>
						</v-chip>
						<v-chip class="ma-2" label color="red" :size="chipSize">
							{{ (item.action_price + item.action_price * ((group.margin || 5) / 100)).toFixed(0) }}
							CZK
						</v-chip>
					</template>
				</div>
			</div>
		</v-card-title>
		<v-card-text>
			<v-table>
				<thead>
					<tr>
						<th class="text-left" colspan="2">Položka</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Data</td>
						<td class="text-right" v-if="typeof item.data === 'number'">
							<span v-if="item.data < 1000">{{ item.data }} MB</span>
							<span v-else-if="item.data >= 1000"> {{ item.data / 1000 }} GB </span>
						</td>
						<td v-else class="text-right">
							<v-chip color="success"> Neomezeně </v-chip>
						</td>
					</tr>
					<template v-if="item.call_rate === item.sms_rate && item.call_rate === 0">
						<tr>
							<td>Voláni a SMS</td>
							<td class="text-right"><v-chip color="success">Neomezeně</v-chip></td>
						</tr>
					</template>
					<template v-else-if="item.call_rate === item.sms_rate">
						<tr>
							<td>Voláni a SMS</td>
							<td class="text-right" v-if="item.call_rate">
								{{ (item.call_rate + item.call_rate * ((group.margin || 5) / 100)).toFixed(1) }}
								CZK
							</td>
						</tr>
					</template>
					<template v-else>
						<tr>
							<td>Calls</td>
							<td class="text-right">{{ item.call_rate }} CZK</td>
						</tr>
						<tr>
							<td>SMS</td>
							<td class="text-right">{{ item.sms_rate }} CZK</td>
						</tr>
					</template>
				</tbody>
			</v-table>
		</v-card-text>
	</v-card>
</template>

<script setup lang="ts">
import type { Tables } from "~/typings/database.types";
const chipSize = "small";
const { item, group } = defineProps<{
	item: Tables<{ schema: "mobile_services" }, "tariff">;
	group: Tables<{ schema: "mobile_services" }, "groups">;
}>();
const isDev = process.env.NODE_ENV === "development";
</script>

<style scoped></style>
