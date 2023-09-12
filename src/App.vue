<script>
	import { RouterLink, RouterView } from 'vue-router';
	import { useUserStore } from './stores/userStore';
	import { useSearchStore } from './stores/searchStore';
	import Modals from './components/Modals.vue';
	import Menus from './components/Menus.vue';

	export default {
		setup() {
			const
				userStore = useUserStore(),
				searchStore = useSearchStore()
			;

			return { userStore, searchStore }
		},
		components: {
			Menus, Modals
		}
	}
</script>

<template>
	<Menus />
	<RouterView />
	<Modals />
</template>