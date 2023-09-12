<script>
	import { useMainStore } from '../stores';
	import { useSearchStore } from '../stores/searchStore';
	import { useUserStore } from '../stores/userStore';
	import { useFeedStore } from '../stores/feedStore';
	import FeedCard from './FeedCard.vue';
	import navMenu from './navMenu.vue';
	import Sharerables from './Sharerables.vue';

	export default {
		components: { FeedCard, navMenu, Sharerables },
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
			},
			submitSearch() {
				this.searchStore.triggerSearch();
				this.$router.push('/search?'+this.searchStore.searchBox);
			}
		},
		mounted() {
			this.$refs.page.dispatchEvent(new Event("scroll"));
			this.feedStore.getUpdate();
			console.log(this.feedStore.feeds);
		}
	}
</script>
<template>
	<div id="page" class="as-page" ref="page" @scroll="handleScroll">
		<header id="main-header">
			<div class="rounded transparent menu" style="height: 64px;">
				<div class="container items auto-margined">
					<div class="item as-icon md-and-up-hidden open-sidepanel" data-target="msidepanel">
						<SvgIcon name="menu" />
					</div>
					<div class="items md-and-down-hidden">
						<router-link to="/bookmarks" class="item">Bookmarks</router-link>
						<router-link to="/following" class="item">Following</router-link>
						<router-link to="/help#shop-online" class="item">Have a shop online</router-link>
						<router-link to="/support" class="item">Support</router-link>
					</div>
					<div class="items r-aligned">
						<div class="as-icon item">
							<SvgIcon name="notifications" />
						</div>
						<Dropdown class="xhover as-icon item">
							<img src="images/profile.jpg" alt="profile"  class="fully-rounded logo" />
							<Sharerables name="profile_menu" />
						</Dropdown>
					</div>
				</div>
			</div>
			<form id="searchbox" class="rounded centered" @submit.prevent="submitSearch">
				<div style="margin-bottom: 16px;">
					<img src="images/logo_full.png" alt="site logo" class="site-logo fluid image" style="max-width: 500px; background-color: rgba(128,128,128,0.025);" />
					<p class="huge" style="margin-top: 8px;">Search for business names, products and services.</p>
				</div>
				<div>
					<label class="input rounded big fluid">
						<SvgIcon name="search" class="xhover" />
						<input v-model="searchStore.searchBox" type="search" id="searchinput" ref="inputbox" placeholder="Your search here." class="subject" autofocus />
						<button type="button" title="Scan QR" class="icon open-modal" data-target="scanqr-modal">
							<SvgIcon name="qr_code_scanner" />
						</button>
					</label>
					<div style="margin-top: 8px;">Search in: <span class="bold">Nigeria</span>. <a href="#">Change Location</a></div>
					<div class="grid" style="gap: 16px; margin: 32px auto 0px; max-width: 300px;">
						<div class="col">
							<button type="submit" class="rounded fluid button">
								SEARCH
							</button>
						</div>
						<div class="col">
							<button type="button" class="rounded fluid button">
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
			<div class="manual-width col lg-and-down-hidden" id="navmenu">
				<div class="vertical rounded transparent menu">
					<navMenu />
				</div>
			</div>
			<div class="col" id="feeds">
				<h6 class="centered" id="bizupdate">Update from page you're following (Feeds)</h6>
				<FeedCard v-for="(feed, i) in feedStore.feeds" :key="i" :details="feed" />
				<div class="divider">
					<button class="fully-rounded button">
						Load more
						<SvgIcon name="expand_more" />
					</button>
				</div>

			</div>
			<div class="manual-width col" id="admenu">
				<div style="width: 100%;">
					<h6 class="centered" style="margin-bottom: 16px;">Sponsored (Ads)</h6>
					<div class="ads">
						<div class="centered rounded ad">
							<img src="images/ads.jpg" alt="ad" class="image">
							<div>
								Fix your laptops and desktops (Hardware and Software).
								<button class="primary button">contact us</button>
							</div>
						</div>
					</div>
				</div>
				<footer style="align-self: flex-end;">
					<div class="transparent text menu wrap flex-centered">
						<div class="item">Terms of use</div>
						<div class="item">About us</div>
						<div class="item">Help</div>
						<div class="item">Settings</div>
						<div class="item">@ Copyright 2023</div>
						<div class="item">Emmadave Inc.</div>
					</div>
				</footer>
			</div>
		</article>
	</div>
</template>
<style scoped>
	.as-page {
		scroll-behavior: smooth;
	}

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

	#navmenu,
	#admenu,
	#inavmenu {
		position: sticky;
		width: 275px;
		top: 64px;
		min-height: calc(100vh - 64px);
		height: min-content !important;
		padding: 10px;
		box-shadow: none;
		background-color: transparent !important;
	}

	#inavmenu { width: auto; }

	#navmenu .item {
		padding-left: 72px;
	}

	#admenu {
		display: flex;
		flex-flow: row wrap;
		padding: 25px 1rem;
	}

	@media only screen and (max-width: 800px) {
		#admenu { display: none !important; }
	}

	.ad {
		box-shadow: 0px 0px 5px #aaa;
		padding: 10px;
		background-color: var(--surface);
	}

	#feeds {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 20px;
		position: relative;
		width: 100%;
		max-width: 700px;
		min-height: 120vh;
		padding: 20px 1em;
		margin: 0px auto;
	}
</style>