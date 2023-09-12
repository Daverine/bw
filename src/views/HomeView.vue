<script>
	import { useUserStore } from '../stores/userStore';
	import ClientHome from '../components/ClientHome.vue';
	import LandingHome from '../components/LandingHome.vue';

	export default {
		setup() {
			const userStore = useUserStore();

			return { userStore }
		},
		title: "Bizworld - The internet world of businesses",
		components: { ClientHome, LandingHome }
	}
</script>
<template>
	<LandingHome v-if="userStore.auth" />
	<ClientHome v-else />
</template>