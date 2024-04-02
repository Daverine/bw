<script>
	import { useUserStore } from '../stores/userStore';

	export default {
		title: 'Your account page | BizWorld',
		setup() {
			const userStore = useUserStore();

			return { userStore }
		},
	}
</script>
<template>
	<div class="as-page">
        <Shareables name="common_header" />
		<section id="firstSec" ref="main" class="container csection grid">
			<Shareables name="page_nav" />
            <main class="col" id="feed">
				<header>
					<div class="container guttered grid">
						<div class="col manual-width">
							<img :src="userStore.userData.profileImg" class="profile-pic circular image" alt="Your profile Picture" />
						</div>
						<div class="col">
							<h5>{{ `${userStore.userData.firstName} ${userStore.userData.lastName}` }}</h5>
							<div class="semibold">
								<span>{{ userStore.userData.following.length }} Following </span> |
								<span>{{ userStore.userData.bookmarks.length }} Bookmarks </span>
							</div>
						</div>
					</div>
					<div class="sp-wrapper fluid z-level-3" style="margin-top: 1rem;">
						<div v-iScroller v-scrollPin="{ topSpacing: 68, ancestorGuarded: true }" class="i-scroller fluid">
							<div class="l-scroll"><SvgIcon name="double_arrow_left" class="mini" /></div>
							<div class="r-scroll"><SvgIcon name="double_arrow_right" class="mini" /></div>
							<div class="rail menu scroll-items">
								<div class="items" style="margin: 0px auto;">
									<router-link to="/account/profile" class="item" exact-active-class="active">Profile</router-link>
									<router-link to="/account/reviews" class="item" exact-active-class="active">Reviews</router-link>
									<router-link to="/account/saved" class="item" exact-active-class="active">Saved cards</router-link>
									<router-link to="/account/followed" class="item" exact-active-class="active">Followed providers</router-link>
									<router-link to="/account/settings" class="item" exact-active-class="active">Settings</router-link>
								</div>
							</div>
						</div>
					</div>
					<hr style="margin: 0px;"/>
					<div>
						<router-view></router-view>
					</div>
				</header>
				
				
			</main>
            <Shareables name="ad_menu" />
        </section>
	</div>
</template>

<style lang="scss" scoped>
	#feed {
		header {
			position: relative;
			width: 100%;
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
			width: 5rem;
			height: 5rem;
			border: 4px solid var(--surface);
			// margin-top: calc(-7.5rem / 2 - 1rem);
		}
	}

</style>