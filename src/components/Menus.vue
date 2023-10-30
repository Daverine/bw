<script>
	import { useMainStore } from '../stores';
	import { useSearchStore } from '../stores/searchStore';
	import { useUserStore } from '../stores/userStore';
	import Shareables from './Shareables.vue';

    export default {
		components: { Shareables },
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
			}
		}
    }
</script>
<template>
	<SidePanel class="left" id="msidepanel">
		<div class="panel padded">
			<div class="rounded vertical transparent menu">
				<div class="centered item exit-sidepanel"><SvgIcon name="arrow_back" /></div>
				<router-link to="/" class="xhover centered item exit-sidepanel">
					<img src="/images/logo.png" alt="site logo" class="logo-sm site-logo">
				</router-link>
				<div class="items">
					<Shareables name="nav_menu" />
				</div>
			</div>
			<footer>
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
	</SidePanel>
	<div id="fmenu" class="menu z-level-3" :class="{ pinned: mainStore.showFixedMenu }">
		<div class="container rounded items auto-margined">
			<div class="item as-icon open-sidepanel" data-target="msidepanel">
				<SvgIcon name="menu" />
			</div>
			<router-link to="/" class="xhover item as-icon">
				<img src="/images/logo_sqr.png" alt="site logo" class="logo-lg site-logo">
			</router-link>
			<form class="xhover adaptable item md-and-down-hidden" @submit.prevent="submitSearch">
				<label class="input fluid rounded transparent clue-bg" style="max-width: 550px;">
					<SvgIcon name="search" class="xhover" />
					<input v-model="searchStore.searchBox" type="search" placeholder="Your search here." class="subject">
					<button type="button" title="Scan QR" class="icon open-modal" data-target="scanqr-modal">
						<SvgIcon name="qr_code_scanner" />
					</button>
					<button type="button" title="Search location is set to Nigeria. Click to change it." class="icon open-modal" data-target="">
						<SvgIcon name="location_on" />	
					</button>
				</label>
			</form>
			<div v-if="userStore.auth" class="items r-aligned">
				<div class="open-modal as-icon item md-and-up-hidden" data-target="search-modal">
					<SvgIcon name="search" />
				</div>
				<div class="as-icon item">
					<SvgIcon name="notifications" />
				</div>
				<Dropdown class="xhover as-icon item">
					<img src="/images/profile.jpg" alt="profile"  class="fully-rounded logo" />
					<Shareables name="profile_menu" />
				</Dropdown>
			</div>
			<div v-else class="items r-aligned">
				<div class="open-modal as-icon item md-and-up-hidden" data-target="search-modal">
					<SvgIcon name="search" />
				</div>
				<div class="items lg-and-down-hidden">
					<div class="item open-modal" data-target="login-modal">Log in</div>
					<div class="xhover item 0-h-padding"><button class="rounded primary button open-modal" data-target="register-modal">Sign Up</button></div>
				</div>
				<Dropdown class="item lg-and-up-hidden sm-and-down-hidden">
					<SvgIcon name="person_add" class="lead" /> Account
					<Dropmenu class="rounded">
						<div class="item open-modal" data-target="login-modal">Log in</div>
						<div class="xhover item"><button class="rounded primary button open-modal" data-target="register-modal">Sign Up</button></div>
					</Dropmenu>
				</Dropdown>
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
</template>

<style scoped>
#msidepanel > .panel {
	display: flex;
	flex-flow: column nowrap;
}

#msidepanel > .panel > footer {
	margin-top: auto;
}
</style>