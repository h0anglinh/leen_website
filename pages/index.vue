<script setup lang="ts">
import type { RouteLocationRaw } from "vue-router";

const user = useSupabaseUser();

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

const { mobile } = useDisplay();
</script>

<template>
	<v-container class="h-screen" fluid>
		<v-row align="center">
			<v-col cols="12">
				<Typewriter :toRotate="['Hi,  my name\'s Linh', 'developer, live in Prague, CZ']" :period="250">
					<div class="mb-3 mx-auto text-center">
						<span class="text-h2">Linh.</span>
					</div>
					<VCardButton />
				</Typewriter>
			</v-col>
		</v-row>
		<div class="contacts d-flex justify-space-between">
			<v-hover v-for="contact in contacts">
				<template v-slot:default="{ isHovering, props }">
					<v-btn
						size="small"
						:elevation="isHovering ? 1 : 0"
						v-bind="props"
						:key="contact.text"
						label
						:variant="isHovering ? 'tonal' : 'text'"
						:prepend-icon="contact.icon"
						:href="contact.href"
						:to="contact.to"
						:target="contact.href ? '_blank' : undefined"
						:color="isHovering ? 'primary' : 'grey'"
						class="mx-1"
					>
						{{ !mobile || contact.text === "Drop a message" ? contact.text : undefined }}
					</v-btn>
				</template>
			</v-hover>
		</div>
	</v-container>
</template>
