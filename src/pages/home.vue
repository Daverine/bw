<script setup>
import { useRouter } from 'vue-router';

	const
		props = defineProps(['name']),
		userStore = useUserStore(),
		searchStore = useSearchStore(),
		feedStore = useFeedStore(),
		main = ref(null),
		router = useRouter()
	;

	function scrollToView() {
		main.value.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
	}

	onMounted(() => feedStore.getUpdate());
</script>
<template>
	<header id="main-header">
		<div class="transparent menu" style="height: 64px;">
			<div class="container items auto-margined" style="border-radius: var(--radius-default);">
				<div class="item as-icon open-sidepanel" v-tooltip.unblocking data-tooltip="Menu" data-target="msidepanel">
					<SvgIcon name="menu" />
				</div>
				<div class="xhover item as-icon">
					<img src="/images/logo_sqr.png" alt="site logo" class="logo-lg site-logo" />
				</div>
				<div class="items r-aligned">
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
					<Shareables name="do_more_item" />
					<div class="as-icon item" v-tooltip.unblocking data-tooltip="Notifications">
						<SvgIcon name="notifications" />
					</div>
					<Dropdown data-target="dm1_profile" :options="{directionPriority: {x: 'left', y: 'bottom'}}" v-tooltip.unblocking data-tooltip="Your profile" class="xhover browse as-icon item">
						<img :src="userStore.userData.profileImg" alt="profile"  class="fully-rounded logo" />
					</Dropdown>
					<Shareables id="dm1_profile" name="profile_menu" />
				</div>
			</div>
		</div>
		<form id="searchbox" class="centered" @submit.prevent="searchStore.triggerSearch()">
			<div style="margin-bottom: 2rem;">
				<h2 id="call-text">Let us do business</h2>
				<p class="huge">Search for business names, products, and services.</p>
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
			<div role="button"  @click="scrollToView">
				<SvgIcon name="double_arrow_down" style="font-size: 2em; line-height: 1;" />
				<div style="font-size: 1.2em; line-height: 1; font-weight: 500;">FEEDS</div>
			</div>
		</div>
	</header>
	<section id="firstSec" ref="main" class="container csection grid">
		<Shareables name="page_nav" />
		<main ref="main" class="col" id="feed">
			<header class="sp-wrapper fluid z-level-3 p-h" style="margin-bottom: 1rem;">
				<div v-iScroller v-scrollPin="{ topSpacing: 64, ancestorGuarded: true }" class="i-scroller">
					<div class="l-scroll"><SvgIcon name="double_arrow_left" class="mini" /></div>
					<div class="r-scroll"><SvgIcon name="double_arrow_right" class="mini" /></div>
					<div class="rail fillable menu scroll-items">
						<div class="items" style="margin: 0px auto;">
							<div class="active item">For you</div>
							<div class="item">Following</div>
						</div>
					</div>
				</div>
			</header>
			<section style="display: flex; flex-direction: column; align-items: center;">
				<h6 class="centered" style="margin-bottom: 2rem;" id="bizupdate">Update from page you're following (Feeds)</h6>
				<FeedCard v-for="(feed, i) in feedStore.feeds" :key="i" :details="feed" />
				<div class="divider">
					<button class="button">
						Load more
						<SvgIcon name="expand_more" />
					</button>
				</div>
			</section>
		</main>
		<Shareables name="ad_menu" />
	</section>
</template>
<style scoped>
	@import url('https://fonts.googleapis.com/css2?family=Lemon&family=Lilita+One&family=Noto+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Sunshiney&display=swap');

	#call-text {
		margin-top: 0px;
		margin-bottom: 10px;
		font-family: "Lemon", cursive;
		font-size: 3.25rem;
		line-height: 1.125em;
	}
	
	#feed {
		padding: 5rem 0.5em 20px;
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
</style>
