<script>
	import { useMainStore } from '../stores';
	import { useUserStore } from '../stores/userStore';
	import Shareables from '../components/Shareables.vue';
	import ItemCard from '../components/ItemCard.vue';

	export default {
		title: 'Saved cards | BizWorld',
		components: { Shareables, ItemCard },
		setup() {
			const
				mainStore = useMainStore(),
				userStore = useUserStore()
			;

			return { mainStore, userStore }
		},
		methods: {
			handleScroll() {
				if (this.$refs.main.getBoundingClientRect().top <= 0) this.mainStore.mutateSFM(true);
				else this.mainStore.mutateSFM(false);
			}
		},
		mounted() {
			window.dispatchEvent(new Event("scroll"));
			window.addEventListener('scroll', this.handleScroll);
			this.userStore.getSavedCards();
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
				<h6 class="centered">Saved Cards</h6>
				
				<ItemCard v-for="(result, i) in userStore.savedCards" :key="i" :details="result" :isSaved="true" />

				<div class="divider"><button class="button">More results <SvgIcon class="trailing" name="expand_more" /></button></div>
			</main>
			<Shareables name="ad_menu" />
		</section>
		<footer>
			<div class="wrappable text menu" style="padding: 10px 0px; background-color: var(--surface-focus-alpha) !important; font-weight: normal;">
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