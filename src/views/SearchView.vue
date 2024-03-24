<script>
	import { useMainStore } from '../stores';
	import { useSearchStore } from '../stores/searchStore';
	import { useUserStore } from '../stores/userStore';
	import Shareables from '../components/Shareables.vue';
	import ItemCard from '../components/ItemCard.vue';

	export default {
		title() {
			return `BizWorld | Search: ${this.$route.query.q}`
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
			this.$watch(() => this.$route.query.q, (to, from) => {
				document.title = this.$options.title.call(this);
			});
		},
		mounted() {
			if (!this.searchStore.searchBox) {
				this.searchStore.searchBox = this.$route.query.q;
				this.searchStore.triggerSearch();
			}
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
		<Shareables name="common_header" />
		<section ref="main" class="csection grid">
			<Shareables name="page_nav" />
			<main class="col" id="feed">
				<div class="sp-wrapper fluid z-level-3" style="margin-bottom: 1rem;">
					<div v-iScroller v-scrollPin="{ topSpacing: 68, ancestorGuarded: true }" class="i-scroller">
						<div class="l-scroll"><SvgIcon name="double_arrow_left" class="mini" /></div>
						<div class="r-scroll"><SvgIcon name="double_arrow_right" class="mini" /></div>
						<div class="rail menu scroll-items">
							<div class="items" style="margin: 0px auto;">
								<div class="active item">All</div>
								<div class="item">Businesses</div>
								<div class="item">Products</div>
								<div class="item">Services</div>
							</div>
						</div>
					</div>
				</div>

				<ItemCard v-for="(result, i) in searchStore.searchResults" :key="i" :details="result" />

				<div class="divider"><button class="button">More results <SvgIcon class="trailing" name="expand_more" /></button></div>
			</main>
			<!-- <Shareables name="ad_menu" /> -->
		</section>
		<!-- <div style="height: 100px"></div> -->
	</div>
</template>