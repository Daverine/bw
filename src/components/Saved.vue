<script>
	import { useUserStore } from '../stores/userStore';
	import ItemCard from '../components/ItemCard.vue';

	export default {
		title: 'Saved cards | BizWorld',
		components: { ItemCard },
		setup() {
			const userStore = useUserStore();

			return { userStore }
		},
		mounted() {
			this.userStore.getSavedCards();
		}
	}
</script>
<template>
    <h6 class="centered">Saved Cards</h6>
    
    <ItemCard v-for="(result, i) in userStore.savedCards" :key="i" :details="result" :isSaved="true" />

    <div class="divider"><button class="button">More results <SvgIcon class="trailing" name="expand_more" /></button></div>
</template>