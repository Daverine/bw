<script>
	import { useMainStore } from '../stores';
	import { useSearchStore } from '../stores/searchStore';
	import { useUserStore } from '../stores/userStore';
	import Shareables from '../components/Shareables.vue';
	import ItemCard from '../components/ItemCard.vue';

	export default {
		title() {
			return `${this.searchStore.searchBox} | Bizworld`
		},
		components: { ItemCard, Shareables },
		setup() {
			const
				mainStore = useMainStore(),
				searchStore = useSearchStore(),
				userStore = useUserStore()
			;

			return { mainStore, searchStore, userStore }
		},
		methods: {
			handleScroll() {
				if (this.$refs.main.getBoundingClientRect().top <= 0) this.mainStore.mutateSFM(true);
				else this.mainStore.mutateSFM(false);
			}
		},
		created() {
			this.$watch(() => this.$route.query, (to, from) => {
				document.title = this.$options.title.call(this);
			});
		},
		mounted() {
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
			<div v-iScroller class="i-scroller" style="overflow: hidden;">
				<div class="centered basic menu scroll-items">
					<div class="active item">All</div>
					<div class="item">Businesses</div>
					<div class="item">Products</div>
					<div class="item">Services</div>
				</div>
			</div>
			<hr style="margin: 0px;"/>
		</header>
		<section id="main" ref="main" class="grid" style="position: relative; margin-top: 25px; min-height: 70vh;">
			<Shareables name="page_nav" />
			<main class="col" id="feed">
				<ItemCard v-for="(result, i) in searchStore.searchResults" :key="i" :details="result" />

				<div class="divider"><button class="button">More results <SvgIcon class="trailing" name="expand_more" /></button></div>
			</main>
			<Shareables name="ad_menu" />
		</section>
	</div>
</template>