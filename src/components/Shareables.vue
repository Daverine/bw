<script>
    import { useMainStore } from '../stores';
	import { useUserStore } from '../stores/userStore';
    
    export default {
        name: "rc-shareables",
        props: ['name'],
        setup() {
			const
				mainStore = useMainStore(),
				userStore = useUserStore()
			;

			return { mainStore, userStore }
		},
        methods: {
            timeInDateJs(time) {
                time = time.split(':');
                let result = new Date();
                result.setHours(Number(time[0]));
                result.setMinutes(Number(time[1]));
                result.setSeconds(0);
                result.setMilliseconds(0);
                return result;
            }
        }
    }
</script>

<template>
    <Dropmenu v-if="name === 'profile_menu'" class="rounded">
        <div class="header centered item xhover">Welcome,<br /> Ayoola Folorunso</div>
        <router-link to="/profile" class="item"><SvgIcon name="person" class="lead" /> Profile</router-link>
        <router-link to="/feedback" class="item"><SvgIcon name="feedback" class="lead" /> Give feedback</router-link>
        <div class="item" @click="userStore.logout()"><SvgIcon name="logout" class="lead" /> Log out</div>
    </Dropmenu>
    <template v-else-if="name === 'supports'">
        <div class="item">Get help</div>
        <div class="item">Become a developer</div>
        <div class="item">Support us</div>
        <div class="item">Thank you</div>
    </template>
    <template v-else-if="name === 'nav_menu'">
        <template v-if="userStore.auth">
            <router-link to="/" exact-active-class="active" class="item exit-sidepanel">
                <SvgIcon name="home" class="lead nview" />
                <SvgIcon name="home_filled" class="lead aview" />
                Home
            </router-link>
            <router-link to="saved" exact-active-class="active" class="item">
                <SvgIcon name="bookmarks" class="lead nview" />
                <SvgIcon name="bookmarks_filled" class="lead aview" />
                Saved
            </router-link>
            <div class="item">
                <SvgIcon name="explore" class="lead nview" />
                <SvgIcon name="explore_filled" class="lead aview" />
                Explore
            </div>
            <div class="item exit-sidepanel open-modal" data-target="scanqr-modal">
                <SvgIcon name="qr_code_scanner" class="lead" />
                Scan QR
            </div>
            <router-link to="/following" exact-active-class="active" class="item">
                <SvgIcon name="groups" class="lead nview" />
                <SvgIcon name="groups_filled" class="lead aview" />
                Following
            </router-link>
            <router-link to="/profile" exact-active-class="active" class="item">
                <SvgIcon name="person" class="lead nview" />
                <SvgIcon name="person_filled" class="lead aview" />
                Profile
            </router-link>
            <div v-collapsible class="item">
                <i class="lead viewbox icon">
                    <SvgIcon name="contact_support" class="n-view" />
                    <SvgIcon name="contact_support_filled" class="a-view" />
                </i>
                Support
                <i class="trailing viewbox icon">
                    <SvgIcon name="expand_more" class="a-view" />
                    <SvgIcon name="chevron_left" class="n-view" />
                </i>
            </div>
            <div class="collapsible sub items">
                <rc-shareables name="supports" />
            </div>
            <div class="transparent compact divider"></div>
            <div class="xhover item 0-padding"><button class="fluid rounded button">Have a shop online</button></div>
        </template>
        <template v-else>
            <div class="item exit-sidepanel open-modal" data-target="scanqr-modal">
                <SvgIcon name="qr_code_scanner" class="lead" />
                Scan Business QR
            </div>
            <div v-collapsible class="item">
                <i class="lead viewbox icon">
                    <SvgIcon name="contact_support" class="n-view" />
                    <SvgIcon name="contact_support_filled" class="a-view" />
                </i>
                Support
                <i class="trailing viewbox icon">
                    <SvgIcon name="expand_more" class="a-view" />
                    <SvgIcon name="chevron_left" class="n-view" />
                </i>
            </div>
            <div class="collapsible sub items">
                <rc-shareables name="supports" />
            </div>
            <div class="item">
                <SvgIcon name="add_business" class="lead" />
                Have a shop online
            </div>
            <div class="item open-modal exit-sidepanel" data-target="login-modal">
                <SvgIcon name="login" class="lead" />
                Log in
            </div>
            <div class="transparent compact divider"></div>
            <div class="xhover item 0-padding"><button class="fluid rounded primary button open-modal exit-sidepanel" data-target="register-modal">Sign Up</button></div>
        </template>
    </template>
</template>