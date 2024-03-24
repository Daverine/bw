<script>
	import { useMainStore } from '../stores';
	import { useUserStore } from '../stores/userStore';
	import Shareables from '../components/Shareables.vue';
	import BizCard from '../components/BizCard.vue';

	export default {
		title: 'Following | BizWorld',
		components: { Shareables, BizCard },
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
			this.userStore.getFollowedCards();
		},
		unmounted() {
			window.removeEventListener('scroll', this.handleScroll);
		}
	}
</script>
<template>
	<div class="as-page">
		<Shareables name="common_header" />
		<section id="main" ref="main" class="grid" style="position: relative; margin-top: 25px; min-height: 70vh;">
			<Shareables name="page_nav" />
			<main class="col" id="feed">
				<h6 class="centered">Following</h6>
				<div class="fluid" style="display: flex; flex-flow: row wrap; justify-content: center; gap: 1em; padding: 1rem;">
					<BizCard v-for="(result, i) in userStore.followedCards" :key="i" :details="result" />
				</div>
				<div class="divider"><button class="button">More results <SvgIcon class="trailing" name="expand_more" /></button></div>
			</main>
			<!-- <Shareables name="ad_menu" /> -->
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

<style lang="scss">
	.following-cont {
		display: flex;
		flex-flow: row nowrap;
		gap: 0.5em;
		align-items: flex-start;
		width: 100%;
		padding: 0rem 1rem;
		overflow: hidden;

		& > * { flex: 0 0 auto; }
	}
</style>