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
	<v-container class="h-screen wrapper" fluid>
		<div class="d-flex" v-if="user">
			<v-card elevation="0" variant="outlined"><v-card-title>Dien thoai</v-card-title></v-card>
		</div>
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
		<!-- <div class="contacts d-flex justify-space-between">
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
                        {{ !mobile || contact.text === 'Drop a message' ? contact.text : undefined }}
                    </v-btn>
                </template>
            </v-hover>
        </div> -->

		<div class="contacts d-flex justify-space-between">
			<button v-for="contact in contacts" :key="contact.text">{{ contact.text }}</button>
		</div>
	</v-container>
</template>

<style scoped lang="scss">
.typewriter h1 {
	overflow: hidden;
	border-right: 0.15em solid orange;
	white-space: nowrap;
	margin: 0 auto;
	letter-spacing: 0.15em;
	animation:
		typing 3.5s steps(40, end),
		blink-caret 0.75s step-end infinite;
}

/* The typing effect */
@keyframes typing {
	from {
		width: 0;
	}
	to {
		width: 100%;
	}
}

/* The typewriter cursor effect */
@keyframes blink-caret {
	from,
	to {
		border-color: transparent;
	}
	50% {
		border-color: orange;
	}
}
.wrapper {
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	position: relative;
	h1 {
		font-size: 5.5em;
		letter-spacing: 0.1em;
		line-height: 4.5rem;
	}
	h2 {
		font-size: 3em;
		margin-right: 0.2em;
	}
	.contacts {
		position: absolute;
		bottom: 1em;
		left: 1em;
	}
}
.heading {
	flex-direction: column;
	h1 {
		font-size: 5.5em;
		letter-spacing: 1.2rem !important;
		@media (max-width: 768px) {
			font-size: 1.3em;
			letter-spacing: 1rem !important;
		}
		position: relative;
		display: inline-flex;

		align-items: center;
		position: relative;
		&::after {
			content: "";
			width: 55%;
			border-bottom: 2px solid red;
			position: absolute;
			bottom: 10%;
			left: 50%;
			padding-bottom: 2rem;
			transform: translate(-50%, 0);
		}
	}
	.desc {
		font-size: 1.5em;
		margin: 0 0.6em;
		text-transform: uppercase;
	}
}

button {
	position: relative;
	cursor: pointer;
	color: #efefee;
	font-size: 28px;
	padding: 0.5rem 1rem;
	&::after {
		position: absolute;
		content: "";
		inset: 0;
		background: white;
		scale: 1 0;
		z-index: -1;
	}
}
</style>
