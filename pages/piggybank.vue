<template>
	<v-container>
		<h1>Piggy Bank</h1>

		<v-row>
			<v-col cols="12" md="6">
				<v-card>
					<v-card-title> Balance trend </v-card-title>
					<v-card-text> <PiggyBarChart /> </v-card-text>
				</v-card>
			</v-col>
			<v-col cols="12" md="6">
				<v-card>
					<v-card-title> Portfolio structure </v-card-title>
					<v-card-text> <PiggyPieChart /> </v-card-text>
				</v-card>
			</v-col>
			<v-col cols="12" md="6">
				<v-card>
					<v-card-title> Portfolio structure </v-card-title>
					<v-card-text> <PiggyPieChart /> </v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>
