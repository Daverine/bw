<script setup>
	const
		searchStore = useSearchStore(),
		route = useRoute();
	;

	watch(() => route.query.q, () => document.title = `BizWorld | Search: ${route.query.q}`, { immediate: true });
	onMounted(() => {
		if (!searchStore.searchBox) {
			searchStore.searchBox = route.query.q;
			searchStore.triggerSearch();
		}
	});
</script>

<template>
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
</template>