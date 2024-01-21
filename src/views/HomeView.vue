<script>
	import { useUserStore } from '../stores/userStore';
	import ClientHome from '../components/ClientHome.vue';
	import landinghome from '../components/landinghome.vue';

	export default {
		setup() {
			const userStore = useUserStore();

			return { userStore }
		},
		title: "Bizworld - The internet world of businesses",
		components: { ClientHome, landinghome }
	}
</script>
<template>
	<landinghome v-if="userStore.auth" />
	<ClientHome v-else />
</template>