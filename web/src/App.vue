<template>
	<v-timeline :reverse="reverse" dense>
		<v-timeline-item v-for="n in 2" :key="n">
			<span slot="opposite">Tus eu perfecto</span>
			<v-card class="elevation-2">
				<v-card-title class="text-h5">
					Lorem ipsum
				</v-card-title>
				<v-card-text>
					Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod
					convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an
					salutandi sententiae.
				</v-card-text>
			</v-card>
		</v-timeline-item>
	</v-timeline>
</template>
<template>
	<v-timeline
	:reverse="reverse"
	:dense="$vuetify.breakpoint.smAndDown"
  >
	<v-timeline-item
	  v-for="n in 2"
	  :key="n"
	>
	  <span slot="opposite">Tus eu perfecto</span>
	  <v-card class="elevation-2">
		<v-card-title class="text-h5">
		  Lorem ipsum
		</v-card-title>
		<v-card-text>
		  Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.
		</v-card-text>
	  </v-card>
	</v-timeline-item>
  </v-timeline>
</template>

<script>
import Spinner from "./components/Spinner/Spinner.vue";

export default {
	name: "App",
	// eslint-disable-next-line vue/no-unused-components

	components: { Spinner },

};
</script>

<style src="./App.css">

</style>

