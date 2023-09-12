<script>
	import { useMainStore } from '../stores';
	import { useSearchStore } from '../stores/searchStore';
	import SearchCard from '../components/SearchCard.vue';
	import { useUserStore } from '../stores/userStore';
	import Sharerables from '../components/Sharerables.vue';

	export default {
		title() {
			return `${this.searchStore.searchBox} | Bizworld`
		},
		components: { SearchCard, Sharerables },
		setup() {
			const
				mainStore = useMainStore(),
				searchStore = useSearchStore(),
				userStore = useUserStore()
			;

			return { mainStore, searchStore, userStore }
		},
		methods: {
			submitSearch() {
				this.searchStore.triggerSearch();
				this.$router.push('/search?'+this.searchStore.searchBox);
			},
			handleScroll() {
				if (this.$refs.main.getBoundingClientRect().top <= 0) this.mainStore.mutateSFM(true);
				else this.mainStore.mutateSFM(false);
			}
		},
		mounted() {
			if (!this.searchStore.searchBox) this.$router.push('/');
			this.$refs.page.dispatchEvent(new Event("scroll"));
		}
	}
</script>
<template>
	<div class="as-page" ref="page" @scroll="handleScroll">
		<header id="main-header" style="background-color: var(--surface);">
			<div class="menu" style="height: 64px;">
				<div class="container rounded items">
					<div class="item as-icon open-sidepanel" data-target="msidepanel">
						<SvgIcon name="menu" />
					</div>
					<router-link to="/" class="xhover item as-icon">
						<img src="images/logo_sqr.png" alt="site logo" class="logo-lg site-logo" />
					</router-link>
					<form class="xhover adaptable item md-and-down-hidden" @submit.prevent="submitSearch">
						<label class="input fluid rounded transparent clue-bg" style="max-width: 550px;">
							<SvgIcon name="search" class="xhover" />
							<input v-model="searchStore.searchBox" type="search" id="searchinput" placeholder="Your search here." class="subject" ref="inputbox" autofocus />
							<button type="button" title="Scan QR" class="icon open-modal" data-target="scanqr-modal">
								<SvgIcon name="qr_code_scanner" />
							</button>
							<button type="button" title="Search location is set to Nigeria. Click to change it." class="icon open-modal" data-target="">
								<SvgIcon name="location_on" />	
							</button>
						</label>
					</form>
					<div v-if="userStore.auth" class="items r-aligned">
						<div class="as-icon item">
							<SvgIcon name="notifications" />
						</div>
						<Dropdown class="xhover as-icon item">
							<img src="images/profile.jpg" alt="profile"  class="fully-rounded logo" />
							<Sharerables name="profile_menu" />
						</Dropdown>
					</div> 
					<div v-else class="items r-aligned">
						<div class="items sm-and-down-hidden">
							<div class="item open-modal" data-target="login-modal">Log in</div>
							<div class="xhover item 0-h-padding"><button class="rounded primary button open-modal" data-target="register-modal">Sign Up</button></div>
						</div>
						<Dropdown class="as-icon item sm-and-up-hidden">
							<SvgIcon name="person_add" />
							<Dropmenu class="rounded">
								<div class="item open-modal" data-target="login-modal">Log in</div>
								<div class="xhover item"><button class="rounded primary button open-modal" data-target="register-modal">Sign Up</button></div>
							</Dropmenu>
						</Dropdown>
					</div>
				</div>
			</div>
			<div class="container md-and-up-hidden" style="padding-top: 0.5rem; padding-bottom: 0.5rem;">
				<form class="fluid" @submit.prevent="submitSearch">
					<label class="input fluid rounded transparent clue-bg">
						<SvgIcon name="search" class="xhover" />
						<input v-model="searchStore.searchBox" type="search" id="searchinput" placeholder="Your search here." class="subject" ref="inputbox" autofocus />
						<button type="button" title="Scan QR" class="icon open-modal" data-target="scanqr-modal">
							<SvgIcon name="qr_code_scanner" />
						</button>
						<button type="button" title="Search location is set to Nigeria. Click to change it." class="icon open-modal" data-target="">
							<SvgIcon name="location_on" />	
						</button>
					</label>
				</form>
			</div>
			<div class="md-and-down-hidden" style="padding: 0em 0em 0.5em;">
				<div class="container">
					<div id="categories" class="scroll-items" style="margin:0px;">
						<div class="l-scroll"><SvgIcon name="double_arrow_left" class="mini" /></div>
						<div class="r-scroll"><SvgIcon name="double_arrow_right" class="mini" /></div>
						<div class="items" style="gap: 8px;">
							<button class="fully-rounded chip"><SvgIcon name="restaurant" class="small lead" /> Restaurants</button>
							<button class="fully-rounded chip"><SvgIcon name="local_bar" class="small lead" /> Bars</button>
							<button class="fully-rounded chip"><SvgIcon name="local_parking" class="small lead" /> Parks</button>
							<button class="fully-rounded chip"><SvgIcon name="hotel" class="small lead" /> Hotels</button>
							<button class="fully-rounded chip"><SvgIcon name="shopping_cart" class="small lead" /> Groceries</button>
							<button class="fully-rounded chip"><SvgIcon name="local_gas_station" class="small lead" /> Filling stations</button>
							<button class="fully-rounded chip"><SvgIcon name="local_pharmacy" class="small lead" /> Pharmacies</button>
							<button class="fully-rounded chip"><SvgIcon name="local_hospital" class="small lead" /> Hospitals and clinics</button>
							<button class="fully-rounded chip"><SvgIcon name="more_horiz" class="small lead" /> More</button>
						</div>
					</div>
				</div>
			</div>
			<div class="centered basic menu">
				<div class="active item">All</div>
				<div class="item">Businesses</div>
				<div class="item">Products</div>
				<div class="item">Services</div>
			</div>
			<hr style="margin: 0px;"/>
		</header>
		<section style="margin-top: 25px; min-height: 70vh;" ref="main">
			<div style="max-width: 600px; padding: 0px 1rem; margin: 0px auto;">
				<SearchCard v-for="(result, i) in searchStore.searchResults" :key="i" :details="result" />
				<div class="divider"><button class="fully-rounded button">More results <SvgIcon name="expand_more" /></button></div>
			</div>
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