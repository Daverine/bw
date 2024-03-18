<script>
	import { useUserStore } from '../stores/userStore';
	import BizCard from '../components/BizCard.vue';

	export default {
		title: 'Following | BizWorld',
		components: { BizCard },
		setup() {
			const userStore = useUserStore();

			return { userStore }
		},
		mounted() {
			this.userStore.getFollowedCards();
		}
	}
</script>
<template>
    <h6 class="centered">Following</h6>
    <div class="fluid" style="display: flex; flex-flow: row wrap; justify-content: center; gap: 1em; padding: 1rem;">
        <BizCard v-for="(result, i) in userStore.followedCards" :key="i" :details="result" />
    </div>
    <div class="divider"><button class="button">More results <SvgIcon class="trailing" name="expand_more" /></button></div>
</template>