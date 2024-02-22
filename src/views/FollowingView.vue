<script>
	import { useMainStore } from '../stores';
	import { useUserStore } from '../stores/userStore';
	import Shareables from '../components/Shareables.vue';
	import SvgIcon from '../components/SvgIcon.vue';

	export default {
		title: 'Following | BizWorld',
		components: { Shareables, SvgIcon },
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
				<h6 class="centered">Following</h6>
				
				<div class="biz-card card">
					<div class="biz-display">
						<img src="images/logo-sq.png" class="image" />
						<SvgIcon name="verified_sp" title="Verified" class="small green-text" style="position: absolute; bottom: 0px; right: 0px;" />
					</div>
					<div class="biz-title">Emmadave Computer Technology Services</div>
					<div class="small semibold">Computer Repair Services</div>
					<div class="sc-gap">
						<span class="semibold" title="Average Rate (Number of raters)">
							<SvgIcon name="star_filled" class="yellow-text mini r-spaced" />
							<span class="small">{{ `4.0 (1323)` }}</span>
						</span>
					</div>
					<div style="display: flex; flex-flow: row; gap: 0.25em; margin-top: 0.5rem;">
						<div class="primary compact button">Visit</div>
						<div class="outlined compact button">More</div>
					</div>
				</div>

				<div class="divider"><button class="button">More results <SvgIcon name="expand_more" /></button></div>
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
<style scoped>
	.biz-card {
		display: flex;
		flex-flow: column nowrap;
		align-items: center;
		width: 100%;
		max-width: 15rem;
		gap: var(--sc-gap);
		padding: 0.5rem;
		cursor: pointer;
	}
	.biz-display {
		position: relative;
		width: 4.25rem;
		height: 4.25rem;
	}
	.biz-title {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		text-align: center;
		overflow: hidden;
		font-size: 1.125em;
		font-weight: var(--semibold-weight);
		color: var(--on-surface);
		line-height: 1.25 !important;
		width: 100%;
		padding-bottom: 0.125em;
		margin: 0 0 0.125em !important;
	}
</style>