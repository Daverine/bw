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
			<Shareables name="common_footer" />
		</div>
	</SidePanel>
	<div id="fmenu" class="menu z-level-3" :class="{ pinned: mainStore.showFixedMenu }">
		<div class="container rounded items auto-margined">
			<div class="item as-icon open-sidepanel lg-and-up-hidden" v-tooltip.unblocking data-tooltip="Menu" data-target="msidepanel">
				<SvgIcon name="menu" />
			</div>
			<router-link to="/" class="xhover item as-icon">
				<img src="/images/logo_sqr.png" alt="site logo" class="logo-lg site-logo">
			</router-link>
			<form class="xhover adaptable item md-and-down-hidden" @submit.prevent="submitSearch">
				<label class="input fluid rounded transparent clue-bg" style="max-width: 550px;">
					<SvgIcon name="search" class="xhover" />
					<input v-model="searchStore.searchBox" type="search" placeholder="Your search here." class="subject">
					<button type="button" v-tooltip.unblocking data-tooltip="Scan QR" class="icon open-modal" data-target="scanqr-modal">
						<SvgIcon name="qr_code_scanner" />
					</button>
					<button type="button" v-tooltip.unblocking data-tooltip="Search location is set to Nigeria. Click to change it." class="icon open-modal" data-target="">
						<SvgIcon name="location_on" />	
					</button>
				</label>
			</form>
			<div class="items r-aligned">
				<div v-tooltip.unblocking data-tooltip="Search" class="open-modal as-icon item md-and-up-hidden" data-target="search-modal">
					<SvgIcon name="search" />
				</div>
				<template v-if="userStore.auth">
					<div class="as-icon item" v-tooltip.unblocking data-tooltip="Notifications">
						<SvgIcon name="notifications" />
					</div>
					<Dropdown data-target="dm_profile" :options="{directionPriority: {x: 'left', y: 'bottom'}}" v-tooltip.unblocking data-tooltip="Your profile and also test" class="xhover as-icon item">
						<img src="/images/profile.jpg" alt="profile"  class="fully-rounded logo" />
						<Shareables name="profile_menu" />
					</Dropdown>
				</template>
				<template v-else>
					<div class="items lg-and-down-hidden">
						<div class="item open-modal" data-target="login-modal">Log in</div>
						<div class="xhover item 0-h-padding"><button class="rounded primary button open-modal" data-target="register-modal">Sign Up</button></div>
					</div>
					<Dropdown :options="{directionPriority: {x: 'left', y: 'bottom'}}" v-tooltip.unblocking data-tooltip="Account" class="item as-icon lg-and-up-hidden">
						<SvgIcon name="person_add" /> <span class="sm-and-down-hidden">Account</span>
						<Dropmenu class="rounded">
							<div class="item open-modal" data-target="login-modal">Log in</div>
							<div class="xhover item"><button class="rounded primary button open-modal" data-target="register-modal">Sign Up</button></div>
						</Dropmenu>
					</Dropdown>
				</template>
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