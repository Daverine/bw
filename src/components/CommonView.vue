<script>
	import { useMainStore } from '../stores';
	import { useUserStore } from '../stores/userStore';

	export default {
		setup() {
			const
				mainStore = useMainStore(),
				userStore = useUserStore()
			;

			return { mainStore, userStore }
		},
        created() {
			this.$watch(() => this.$route, () => {
                // trigger resize on window for scrollpin element on the page
                setTimeout(() => {
                    window.dispatchEvent(new Event('resize'));
                }, 50);
			});
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
        <section ref="main" class="container csection grid">
			<Shareables name="page_nav" />
            <RouterView />
            <Shareables name="ad_menu" />
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
