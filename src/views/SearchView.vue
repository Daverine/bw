<script>
	import { useSearchStore } from '../stores/searchStore';
	import { useUserStore } from '../stores/userStore';
	import ItemCard from '../components/ItemCard.vue';

	export default {
		title() {
			return `BizWorld | Search: ${this.$route.query.q}`
		},
		components: { ItemCard },
		setup() {
			const
				searchStore = useSearchStore(),
				userStore = useUserStore()
			;

			return { searchStore, userStore }
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
		}
	}
</script>
<template>
	<div class="as-page">
        <Shareables name="common_header" />
		<section id="firstSec" ref="main" class="container csection grid">
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