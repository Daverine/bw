<script>
	import { useMainStore } from '../stores';
	import { useSearchStore } from '../stores/searchStore';
	import { useUserStore } from '../stores/userStore';
	import Shareables from '../components/Shareables.vue';

	export default {
		title() {
			return `${this.searchStore.searchBox} | Bizworld`
		},
		components: { Shareables },
		setup() {
			const
				mainStore = useMainStore(),
				searchStore = useSearchStore(),
				userStore = useUserStore()
			;

			return { mainStore, searchStore, userStore }
		},
		methods: {
			submitSearch() {
				this.searchStore.triggerSearch();
				this.$router.push('/search?'+this.searchStore.searchBox);
			},
			handleScroll() {
				if (this.$refs.main.getBoundingClientRect().top <= 0) this.mainStore.mutateSFM(true);
				else this.mainStore.mutateSFM(false);
			}
		},
		mounted() {
			// if (!this.searchStore.searchBox) this.$router.push('/');
			window.dispatchEvent(new Event("scroll"));
			window.addEventListener('scroll', this.handleScroll);
		},
		unmounted() {
			window.removeEventListener('scroll', this.handleScroll);
		}
	}
</script>
<template>
	<div class="as-page">
		<header id="main-header" style="background-color: var(--surface);">
			<Shareables name="common_header" />
			<hr style="margin: 0px;"/>
		</header>
		<section id="main" ref="main" class="grid" style="position: relative; margin-top: 25px; min-height: 70vh;">
			<Shareables name="page_nav" />
			<main class="col" id="feed">
				<h5 class="centered">Saved Cards</h5>

				<div class="divider"><button class="fully-rounded button">More results <SvgIcon name="expand_more" /></button></div>
			</main>
			<Shareables name="ad_menu" />
		</section>
		<footer>
			<div class="transparent text menu" style="padding: 10px 0px; background-color: var(--surface-focus-alpha) !important; font-weight: normal;">
				<div class="container items">
					<div class="item">Terms of use</div>
					<div class="item">About us</div>
					<div class="item">Help</div>
					<div class="item">Settings</div>
					<div class="items r-aligned">
						<div class="item">@ Copyright 2023</div>
						<div class="item">Emmadave Inc.</div>
					</div>
				</div>
			</div>
		</footer>
	</div>
</template>