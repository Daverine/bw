<script>
	import { useMainStore } from '../stores';
	import { useSearchStore } from '../stores/searchStore';
	import { useUserStore } from '../stores/userStore';
	import { useFeedStore } from '../stores/feedStore';
	import Shareables from './Shareables.vue';
	import FeedCard from './FeedCard.vue';

	export default {
		components: { FeedCard, Shareables },
		setup() {
			const
				mainStore = useMainStore(),
				searchStore = useSearchStore(),
				userStore = useUserStore(),
				feedStore = useFeedStore()
			;

			return { mainStore, searchStore, userStore, feedStore }
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
			this.feedStore.getUpdate();
		},
		unmounted() {
			window.removeEventListener('scroll', this.handleScroll);
		}
	}
</script>
<template>
	<div class="as-page">
		<header id="main-header">
			<div class="transparent menu" style="height: 64px;">
				<div class="container items auto-margined" style="border-radius: var(--radius-default);">
					<div class="item as-icon md-and-up-hidden open-sidepanel" v-tooltip.unblocking data-tooltip="Menu" data-target="msidepanel">
						<SvgIcon name="menu" />
					</div>
					<div class="items md-and-down-hidden">
						<router-link to="/help#shop-online" class="item">Have a shop online</router-link>
						<Dropdown class="item">
							Support
							<SvgIcon name="expand_more" class="trailing" />
							<Dropmenu>
								<Shareables name="supports" />
							</Dropmenu>
						</Dropdown>
					</div>
					<div class="items r-aligned">
						<div class="as-icon item" v-tooltip.unblocking data-tooltip="Notifications">
							<SvgIcon name="notifications" />
						</div>
						<Dropdown data-target="dm1_profile" :options="{directionPriority: {x: 'left', y: 'bottom'}}" v-tooltip.unblocking data-tooltip="Your profile and also test" class="xhover browse as-icon item">
							<img src="/images/profile.jpg" alt="profile"  class="fully-rounded logo" />
						</Dropdown>
						<Shareables id="dm1_profile" name="profile_menu" />
					</div>
				</div>
			</div>
			<form id="searchbox" class="centered" @submit.prevent="searchStore.triggerSearch()">
				<div style="margin-bottom: 16px;">
					<img src="/images/logo_full.png" alt="site logo" class="site-logo fluid image" style="max-width: 500px; background-color: rgba(128,128,128,0.025);" />
					<p class="huge" style="margin-top: 8px;">Search for business names, products and services.</p>
				</div>
				<div>
					<label class="input big fluid">
						<SvgIcon name="search" class="xhover" />
						<input v-model="searchStore.searchBox" type="search" id="searchinput" ref="inputbox" placeholder="Your search here." class="subject" autofocus />
						<button type="button" v-tooltip.unblocking data-tooltip="Scan QR" class="icon open-modal" data-target="scanqr-modal">
							<SvgIcon name="qr_code_scanner" />
						</button>
					</label>
					<div style="margin-top: 8px;">Search in: <span class="bold">Nigeria</span>. <a href="#">Change Location</a></div>
					<div class="grid" style="gap: 16px; margin: 32px auto 0px; max-width: 300px;">
						<div class="col">
							<button type="submit" class="fluid button">
								<SvgIcon name="search" class="lead" /> SEARCH
							</button>
						</div>
						<div class="col">
							<button type="button" class="fluid button open-modal" data-target="explore-modal">
								EXPLORE
							</button>
						</div>
					</div>
				</div>
			</form>
			<div class="centered" style="width: 100%; align-self: flex-end; margin: 2rem auto 1rem;">
				<div role="button" onclick="document.getElementById('main').scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })">
					<SvgIcon name="double_arrow_down" style="font-size: 2em; line-height: 1;" />
					<div style="font-size: 1.2em; line-height: 1; font-weight: 500;">FEEDS</div>
				</div>
			</div>
		</header>
		<article id="main" ref="main" class="grid" style="position: relative; min-height: 100vh; padding-top: 64px;">
			<Shareables name="page_nav" />
			<main class="col" id="feed">
				<h6 class="centered" id="bizupdate">Update from page you're following (Feeds)</h6>
				<FeedCard v-for="(feed, i) in feedStore.feeds" :key="i" :details="feed" />
				<div class="divider">
					<button class="button">
						Load more
						<SvgIcon name="expand_more" />
					</button>
				</div>

			</main>
			<Shareables name="ad_menu" />
		</article>
	</div>
</template>
<style scoped>
	#main-header {
		min-height: 100vh;
		display: flex;
		flex-wrap: wrap;
	}

	#searchbox {
		width: 100%;
		max-width: 600px;
		padding: 0px 1rem;
		margin: 32px auto;
		align-self: center;
	}
</style>