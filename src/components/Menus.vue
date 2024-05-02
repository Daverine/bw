<script>
	import { useMainStore } from '../stores';
	import { useSearchStore } from '../stores/searchStore';
	import { useUserStore } from '../stores/userStore';

    export default {
		setup() {
			const
				mainStore = useMainStore(),
				searchStore = useSearchStore(),
				userStore = useUserStore()
			;

			return { mainStore, searchStore, userStore }
		},
		methods: {
			toTop() {
				window.scrollTo({top: 0, behavior: 'smooth'});
			}
		}
    }
</script>
<template>
	<SidePanel class="left" id="msidepanel">
		<div class="panel padded">
			<div class="vertical transparent menu">
				<div class="items" style="border-radius: var(--radius-default);">
					<div class="centered item exit-sidepanel"><SvgIcon name="arrow_back" /></div>
					<router-link to="/" class="xhover centered item exit-sidepanel">
						<img src="/images/logo.png" alt="site logo" class="logo-sm site-logo">
					</router-link>
				</div>
				<Shareables name="nav_menu" />
			</div>
			<Shareables name="common_footer" />
		</div>
	</SidePanel>
	<div id="fmenu" class="menu z-level-3 respect-lock" :class="{ pinned: mainStore.showFixedMenu }">
		<Shareables name="main_menu" />
	</div>
	<div class="fab-group respect-lock">
		<button class="open-modal fab radius-lg secondary button" data-target="create-post">
			<SvgIcon name="edit_square" />
		</button>
		<button id="qaction" @click="toTop" class="outlined fab compact radius-lg secondary button" :class="{ 'now-visible': mainStore.showFixedMenu }">
			<SvgIcon name="vertical_align_top" />
		</button>
	</div>
</template>

<style lang="scss">
	#qaction {
		pointer-events: none;
		opacity: 0;
		box-shadow: var(--z-depth-3);

		&.now-visible {
			pointer-events: all;
			opacity: 1;
		}
	}
	#msidepanel > .panel {
		display: flex;
		flex-flow: column nowrap;
	}

	#msidepanel > .panel > footer {
		margin-top: auto;
	}
</style>