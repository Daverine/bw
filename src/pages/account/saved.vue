<script setup>
	const userStore = useUserStore();

	defineOptions({ title: 'Saved cards | BizWorld' });
	onMounted(() => userStore.getSavedCards());
</script>

<template>
	<h6 class="centered">Saved Cards</h6>
	
	<ItemCard v-for="(result, i) in userStore.savedCards" :key="i" :details="result" :isSaved="true" />

	<div class="divider"><button class="button">More results <SvgIcon class="trailing" name="expand_more" /></button></div>
</template>