<script setup lang="ts">
import { useForm } from "vee-validate";
import type { Provider } from "@supabase/supabase-js";
const { defineField, handleSubmit } = useForm<{ email: string; password: string }>({});

const user = useSupabaseUser();
const client = useSupabaseClient();
const { redirect } = useRoute().query;
const [email, emailAttrs] = defineField("email");
const [password, passswordAttrs] = defineField("password");

const signIn = handleSubmit(() => {});

const providers: { label: string; provider: Provider }[] = [
	{ label: "Login with Google", provider: "google" },
	{ label: "Login with Facebook", provider: "facebook" },
];

const handleLogOut = async () => {
	await client.auth.signOut();
};
</script>

<template>
	<v-container fluid>
		<v-row justify="center" align="center" class="h-screen" v-if="!user">
			<v-col cols="12" sm="8" md="6" lg="4">
				<v-card flat>
					<v-form>
						<v-card-title class="text-center"> Enter password {{ redirect }} </v-card-title>
						<v-card-text> </v-card-text>
						<v-divider></v-divider>
						<v-card-actions>
							<v-row justify="space-between">
								<v-col v-for="provider in providers" :key="provider.label">
									<v-btn size="small" @click="useSignIn('oauth', provider.provider, redirect as string)">
										{{ provider.label }}
									</v-btn>
								</v-col>
							</v-row>
						</v-card-actions>
					</v-form>
				</v-card>
			</v-col>
		</v-row>
		<v-row justify="center" align="center" class="h-screen" v-else>
			<v-col cols="12" sm="8" md="6" lg="4">
				<v-card flat width="30rem">
					<v-card-actions>
						<v-row justify="space-between">
							<v-col>
								<v-btn @click="handleLogOut" block> Log Out </v-btn>
							</v-col>
						</v-row>
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>
