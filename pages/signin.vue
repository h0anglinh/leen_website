<script setup lang="ts">
import * as yup from "yup";
const validationSchema = yup.object({
	password: yup.string().required(),
});
import { useForm } from "vee-validate";
import { validGroups } from "~/constants";
import CryptoJS from "crypto-js";
const { defineField, handleSubmit, meta, setErrors, errors } = useForm<{ password: string }>({ validationSchema });
const { encryptKey } = useRuntimeConfig().public;
const router = useRouter();
const { redirect } = useRoute().query;
const [name, nameAttrs] = defineField("password");

const signIn = handleSubmit((val) => {
	if (redirect && typeof redirect === "string") {
		if (!validGroups.includes(val.password.toLowerCase())) {
			setErrors({ password: "Neplatné heslo" });
			return;
		}
		const [_, ...pages] = redirect.split("/");
		const timestamp = new Date().getTime();
		const code = CryptoJS.AES.encrypt(`${val.password.toLowerCase()}:${timestamp}`, encryptKey).toString();
		router.push({ name: pages.join("-"), query: { code } });
	}
});

useHead({
	title: () => "SIGN IN",
});
</script>

<template>
	<v-container fluid>
		<v-row justify="center" align="center" class="h-screen">
			<v-col cols="12" sm="8" md="6" lg="4">
				<v-card flat>
					<v-form @submit="signIn">
						<v-card-title class="text-center"> Zadej heslo </v-card-title>
						<v-card-text>
							<v-text-field
								placeholder="heslo"
								v-model="name"
								v-bind="nameAttrs"
								:error-messages="errors.password"
								:error="meta.dirty && meta.validated"
							></v-text-field>
							<v-btn block type="submit" :disabled="!meta.valid">Odeslat</v-btn>
						</v-card-text>
					</v-form>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>
