<template>
	<v-alert elevation="2">
		<v-row>
			<v-col>
				<v-card>
					<v-card-title class="text-blue-darken-3">
						<div class="d-flex justify-space-between flex-column overflow-auto my-2">
							<div class="text-h7"><v-chip color="error">Starý</v-chip> {{ item.from_tariff_name }}</div>
							<div v-if="group">
								<v-chip class="mr-2" label color="grey" v-if="isDev" :size="chipSize">
									{{ item.from_monthly_fee }}
									CZK
								</v-chip>
								<v-chip class="ma-2" label color="blue" v-if="!item.from_action_price && item.from_monthly_fee" :size="chipSize">
									{{ (item.from_monthly_fee + item.from_monthly_fee * ((group.margin || 5) / 100)).toFixed(0) }}

									CZK
								</v-chip>
								<v-chip
									class="ma-2"
									label
									color="red"
									v-else-if="item.from_action_price === item.from_monthly_fee && item.from_action_price"
									:size="chipSize"
								>
									<span class="text-decoration-line-through mr-2" v-if="item.from_monthly_fee && item.from_action_price">
										{{ (item.from_monthly_fee + item.from_monthly_fee * ((group.margin || 5) / 100)).toFixed(0) }}</span
									>
									{{ (item.from_action_price + item.from_action_price * ((group.margin || 5) / 100)).toFixed(0) }}
									CZK
								</v-chip>
								<template v-else>
									<v-chip :size="chipSize" v-if="item.from_monthly_fee">
										<span class="text-decoration-line-through mr-2">
											{{ (item.from_monthly_fee + item.from_monthly_fee * ((group.margin || 5) / 100)).toFixed(0) }}
											CZK</span
										>
									</v-chip>
									<v-chip class="ma-2" label color="red" :size="chipSize" v-if="item.from_action_price">
										{{ (item.from_action_price + item.from_action_price * ((group.margin || 5) / 100)).toFixed(0) }}
										CZK
									</v-chip>
								</template>
							</div>
						</div>
					</v-card-title>
					<v-card-text>
						<v-table>
							<tbody>
								<tr>
									<td>Data</td>
									<td class="text-right" v-if="typeof item.from_data === 'number'">
										<span v-if="item.from_data < 1000">{{ item.from_data }} MB</span>
										<span v-else-if="item.from_data >= 1000"> {{ item.from_data / 1000 }} GB </span>
									</td>
									<td v-else class="text-right">
										<v-chip color="success"> Neomezene </v-chip>
									</td>
								</tr>
								<template v-if="item.from_call_rate === item.from_sms_rate && item.from_call_rate === 0">
									<tr>
										<td>Voláni a SMS</td>
										<td class="text-right"><v-chip color="success">Neomezeně</v-chip></td>
									</tr>
								</template>
								<template v-else-if="item.from_call_rate === item.from_sms_rate">
									<tr>
										<td>Voláni a SMS</td>
										<td class="text-right" v-if="item.from_call_rate">
											{{ (item.from_call_rate + item.from_call_rate * ((group.margin || 5) / 100)).toFixed(1) }}
											CZK
										</td>
									</tr>
								</template>
								<template v-else>
									<tr>
										<td>Calls</td>
										<td class="text-right">{{ item.from_call_rate }} CZK</td>
									</tr>
									<tr>
										<td>SMS</td>
										<td class="text-right">{{ item.from_sms_rate }} CZK</td>
									</tr>
								</template>
							</tbody>
						</v-table>
					</v-card-text>
					<v-card-actions>
						<v-btn color="orange-lighten-2" text="Telefonní čisla"></v-btn>

						<v-spacer></v-spacer>

						<v-btn :icon="show ? 'fa solid fa-chevron-up' : 'fa-solid fa-chevron-down'" @click="show = !show"></v-btn>
					</v-card-actions>
					<v-expand-transition>
						<div v-show="show">
							<v-divider></v-divider>

							<v-card-text>
								<div>
									<v-chip size="x-small" v-for="number in item.phone_numbers_with_from_tariff"> {{ number }} </v-chip>
								</div>
							</v-card-text>
						</div>
					</v-expand-transition>
				</v-card>
			</v-col>
			<v-col>
				<v-card>
					<v-card-title class="text-blue-darken-3">
						<div class="d-flex justify-space-between flex-column overflow-auto my-2">
							<div><v-chip color="info">Nový</v-chip> {{ item.to_tariff_name }}</div>
							<div v-if="group">
								<v-chip class="ma-2" label color="blue" v-if="!item.to_action_price && item.to_monthly_fee" :size="chipSize">
									{{ (item.to_monthly_fee + item.to_monthly_fee * ((group.margin || 5) / 100)).toFixed(0) }}

									CZK
								</v-chip>
								<v-chip
									class="ma-2"
									label
									color="red"
									v-else-if="item.to_monthly_fee && item.to_action_price === item.to_monthly_fee"
									:size="chipSize"
								>
									<span class="text-decoration-line-through mr-2">
										{{ (item.to_monthly_fee + item.to_monthly_fee * ((group.margin || 5) / 100)).toFixed(0) }}</span
									>
									{{ (item.to_action_price + item.to_action_price * ((group.margin || 5) / 100)).toFixed(0) }}
									CZK
								</v-chip>
								<template v-else>
									<v-chip :size="chipSize">
										<span class="text-decoration-line-through mr-2" v-if="item.to_monthly_fee">
											{{ (item.to_monthly_fee + item.to_monthly_fee * ((group.margin || 5) / 100)).toFixed(0) }}
											CZK</span
										>
									</v-chip>
									<v-chip class="ma-2" label color="red" :size="chipSize" v-if="item.to_action_price">
										{{ (item.to_action_price + item.to_action_price * ((group.margin || 5) / 100)).toFixed(0) }}
										CZK
									</v-chip>
								</template>
							</div>
						</div>
					</v-card-title>
					<v-card-text>
						<v-table>
							<tbody>
								<tr>
									<td>Data</td>
									<td class="text-right" v-if="typeof item.to_data === 'number'">
										<span v-if="item.to_data < 1000">{{ item.to_data }} MB</span>
										<span v-else-if="item.to_data >= 1000"> {{ item.to_data / 1000 }} GB </span>
									</td>
									<td v-else class="text-right">
										<v-chip color="success"> Neomezene </v-chip>
									</td>
								</tr>
								<template v-if="item.to_call_rate === item.to_sms_rate && item.to_call_rate === 0">
									<tr>
										<td>Voláni a SMS</td>
										<td class="text-right"><v-chip color="success">Neomezeně</v-chip></td>
									</tr>
								</template>
								<template v-else-if="item.to_call_rate === item.to_sms_rate">
									<tr>
										<td>Voláni a SMS</td>
										<td class="text-right" v-if="item.to_call_rate">
											{{ (item.to_call_rate + item.to_call_rate * ((group.margin || 5) / 100)).toFixed(1) }}
											CZK
										</td>
									</tr>
								</template>
								<template v-else>
									<tr>
										<td>Calls</td>
										<td class="text-right">{{ item.to_call_rate }} CZK</td>
									</tr>
									<tr>
										<td>SMS</td>
										<td class="text-right">{{ item.to_sms_rate }} CZK</td>
									</tr>
								</template>
							</tbody>
						</v-table>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</v-alert>
</template>

<script setup lang="ts">
import type { Tables } from "~/typings/database.types";
const chipSize = "small";
const { item, group, direct } = defineProps<{
	item: Tables<{ schema: "mobile_services" }, "tariff_change_view">;
	group: Tables<{ schema: "mobile_services" }, "groups">;
	direct: "from" | "to";
}>();
const isDev = process.env.NODE_ENV === "development";

const show = ref(false);
</script>

<style scoped></style>
