<template>
	<div id="app">
		<router-view />
		<div ><Spinner /></div>
	</div>
</template>

<script>
import Spinner from "./components/Spinner/Spinner.vue";

export default {
  name: "App",
  // eslint-disable-next-line vue/no-unused-components
  components: { Spinner },
};
</script>

<style src="./App.css"></style>

