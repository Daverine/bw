<script>
	import { useMainStore } from '../stores';
	import { useUserStore } from '../stores/userStore';
	import Shareables from '../components/Shareables.vue';

	export default {
		title: 'Profile | BizWorld',
		components: { Shareables },
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
			this.userStore.getFollowedCards();
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
				<header>
					<div class="profile-cover">
						<div class="cover-pic"></div>
						<div class="profile-wrapper">
							<div class="profile-pic circular image">
								<img :src="userStore.userData.profileImg" alt="Your profile Picture" />
							</div>
							<div class="compact button">Edit profile</div>
						</div>
					</div>
					
					<h5>{{ `${userStore.userData.firstName} ${userStore.userData.lastName}` }}</h5>
					<div class="semibold">
						<span>{{ userStore.userData.following.length }} Following </span> |
						<span>{{ userStore.userData.bookmarks.length }} Bookmarks </span>
					</div>
					<div class="basic menu" style="margin-top: 1rem;">
						<div class="item">Reviews</div>
						<div class="item">Settings</div>
					</div>
					<hr style="margin: 0px;"/>
				</header>
				
				<div class="semibold">
					<SvgIcon name="location" /> Default Search Location: {{ userStore.userData.searchLocation }}
				</div>
				<div class="compact button">Create a work profile</div>
			</main>
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

<style lang="scss" scoped>
	#feed {
		header {
			width: 100%;
		}
		.profile-cover {

		}

		.profile-wrapper {
			display: flex;
			justify-content: space-between;
			align-items: start;
			padding: 1rem;
		}
		.cover-pic {
			width: 100%;
			padding-top: calc(100% / 3 * 1);
			background-color: gray;
		}

		.profile-pic {
			width: 7.5rem;
			height: 7.5rem;
			border: 4px solid var(--surface);
			margin-top: calc(-7.5rem / 2 - 1rem);
		}
	}

</style>