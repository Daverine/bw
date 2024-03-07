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
				if (!this.searchStore.searchBox) return;
				this.searchStore.triggerSearch();
				this.$router.push('/search?'+this.searchStore.searchBox);
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