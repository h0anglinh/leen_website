<script setup lang="ts">
import { useForm } from "vee-validate";
import { useAuthStore } from "~/stores/useAuthStore";
import CryptoJS from "crypto-js";
const { defineField, handleSubmit } = useForm<{ group: string }>({});
const { encryptKey } = useRuntimeConfig().public;
const authStore = useAuthStore();
const { users } = storeToRefs(authStore);
const router = useRouter();
const { redirect } = useRoute().query;
const [name, nameAttrs] = defineField("group");

const signIn = handleSubmit((val) => {
	if (redirect && typeof redirect === "string") {
		const [_, ...pages] = redirect.split("/");
		const timestamp = new Date().getTime();
		const code = CryptoJS.AES.encrypt(`${val.group.toLowerCase()}:${timestamp}`, encryptKey).toString();
		router.push({ name: pages.join("-"), query: { code } });

		// router.push({name: ''})
	}
});
</script>

<template>
	<v-container fluid>
		<v-row justify="center" align="center" class="h-screen">
			<v-col cols="12" sm="8" md="6" lg="4">
				<v-card flat width="30rem">
					<v-form @submit="signIn">
						<v-card-title class="text-center"> Enter user </v-card-title>
						<v-card-text>
							<v-text-field v-model="name" v-bind="nameAttrs"></v-text-field>
							<v-btn block type="submit">Submit</v-btn>
						</v-card-text>
					</v-form>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>
