<template>
	<div>
		<v-card flat>
			<v-card-text>
				<v-radio-group v-model="csvSelect" row>
					<v-radio v-for="(option) in csvOption" :key="option.value" :label="option.name"
						:value="option.value">
					</v-radio>
				</v-radio-group>
				<v-date-picker v-model="monthSelect" type="month" :allowed-dates="allowedMonths"></v-date-picker>
			</v-card-text>
		</v-card>

		<!-- <v-date-picker
      v-model="monthSelect"
      type="year"
      :allowed-dates="allowedMonths"
    ></v-date-picker> -->
	</div>
</template>

<script src="./AdminCSVExport.js">
</script>

<style src="./AdminCSVExport.css">

</style>