<script>
	import { useMainStore } from './stores';
	import { useUserStore } from './stores/userStore';
	import { useSearchStore } from './stores/searchStore';
	import Modals from './components/Modals.vue';
	import Menus from './components/Menus.vue';

	export default {
		setup() {
			const
				mainStore = useMainStore(),
				userStore = useUserStore(),
				searchStore = useSearchStore()
			;

			return { mainStore, userStore, searchStore }
		},
		components: {
			Menus, Modals
		},
		mounted() {
			window.dispatchEvent(new Event("scroll"));
			window.addEventListener('scroll', this.handleScroll);
		},
		unmounted() {
			window.removeEventListener('scroll', this.handleScroll);
		},
		updated() {
			window.dispatchEvent(new Event("scroll"));
		},
		methods: {
			handleScroll() {
				let firstSection = document.getElementById('firstSec');
				if (firstSection && firstSection.getBoundingClientRect().top <= 0) this.mainStore.mutateSFM(true);
				else this.mainStore.mutateSFM(false);
			}
		},
		watch: {
			'mainStore.colorScheme': {
				handler(value) {
					document.documentElement.classList.remove('dark-mode');
					document.documentElement.classList.remove('light-mode');
					if (value !== 'auto-mode') document.documentElement.classList.add(value);
				},
				immediate: true
			}
		}
	}
</script>

<template>
	<Menus />
	<RouterView />
	<Modals />
</template>