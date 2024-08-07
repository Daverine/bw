<script>
    import { useMainStore } from '../stores';
	import { useUserStore } from '../stores/userStore';
    import { useSearchStore } from '../stores/searchStore';
    
    export default {
        name: "rc-shareables",
        props: ['name'],
        setup() {
			const
				mainStore = useMainStore(),
				userStore = useUserStore(),
                searchStore = useSearchStore()
			;

			return { mainStore, userStore, searchStore }
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
    <template v-if="name === 'account'">
        <router-link to="/account/profile" class="item exit-sidepanel" exact-active-class="active"><SvgIcon name="person" class="lead" /> Your profile</router-link>
        <router-link to="/account/reviews" class="item exit-sidepanel" exact-active-class="active"><SvgIcon name="reviews" class="lead" /> Your reviews</router-link>
        <router-link to="/account/saved" class="item exit-sidepanel" exact-active-class="active"><SvgIcon name="bookmarks" class="lead" />Saved cards</router-link>
        <router-link to="/account/followed" class="item exit-sidepanel" exact-active-class="active"><SvgIcon name="groups" class="lead" />Followed providers</router-link>
    </template>
    <Dropdown v-else-if="name === 'do_more_item'" :options="{directionPriority: {x: 'center', y: 'bottom'}}" v-tooltip.unblocking data-tooltip="Do more" class="as-icon item">
        <SvgIcon name="apps" />
        <Dropmenu class="rounded">
            <div class="grid-menu sm-grid app-items">
                <div class="bar-item item open-modal exit-dd" data-target="search-modal">
                    <SvgIcon name="search" />
                    <span class="text label">Search</span>
                </div>
                <div class="bar-item item open-modal exit-dd" data-target="explore-modal">
                    <SvgIcon name="manage_search" />
                    <span class="text label">Explore</span>
                </div>
                <div class="bar-item item open-modal exit-dd" data-target="scanqr-modal">
                    <SvgIcon name="qr_code_scanner" />
                    <span class="text label">Scan QR</span>
                </div>
                <div v-if="userStore.auth && userStore.userData.manageBisiness" class="bar-item item open-modal exit-dd" data-target="create-post">
                    <SvgIcon name="edit_square" />
                    <span class="text label">Post</span>
                </div>
            </div>
        </Dropmenu>
    </Dropdown>
    <Dropmenu v-else-if="name === 'profile_menu'">
        <router-link to="/account" class="header centered item"><img :src="userStore.userData.profileImg" class="free-img circular image">{{ `${userStore.userData.firstName} ${userStore.userData.lastName}` }}</router-link>
        <rc-shareables name="account" />
        <div class="item" @click="userStore.logout()"><SvgIcon name="logout" class="lead" /> Log out</div>
    </Dropmenu>
    <template v-else-if="name === 'supports'">
        <div class="item"><SvgIcon name="help" class="lead" /> Help center</div>
        <div class="item"><SvgIcon name="feedback" class="lead" /> Give feedback</div>
    </template>
    <template v-else-if="name === 'nav_menu'">
        <div class="items" style="border-radius: var(--radius-default);">
            <template v-if="userStore.auth">
                <router-link to="/home" exact-active-class="active" class="item exit-sidepanel">
                    <SvgIcon name="home" class="lead nview" />
                    <SvgIcon name="home_filled" class="lead aview" />
                    Home
                </router-link>
                <router-link to="/messaging" exact-active-class="active" class="item exit-sidepanel">
                    <SvgIcon name="chat" class="lead nview" />
                    <SvgIcon name="chat_filled" class="lead aview" />
                    Messaging
                </router-link>
                <router-link to="/myshops" exact-active-class="active" class="item exit-sidepanel">
                    <SvgIcon name="store" class="lead nview" />
                    <SvgIcon name="store_filled" class="lead aview" />
                    My Shops
                </router-link>
                <div v-collapsible class="item xactive">
                    <SvgIcon name="person" class="lead nview" />
                    <SvgIcon name="person_filled" class="lead aview" />
                    Account
                    <SvgIcon name="expand_more" class="trailing aview" />
                    <SvgIcon name="chevron_left" class="trailing nview" />
                </div>
                <div class="collapsible sub items">
                    <rc-shareables name="account" />
                </div>
                <div v-collapsible class="item xactive">
                    <SvgIcon name="contact_support" class="lead nview" />
                    <SvgIcon name="contact_support_filled" class="lead aview" />
                    Support
                    <SvgIcon name="expand_more" class="trailing aview" />
                    <SvgIcon name="chevron_left" class="trailing nview" />
                </div>
                <div class="collapsible sub items">
                    <rc-shareables name="supports" />
                </div>
                <div class="item" @click="userStore.logout()"><SvgIcon name="logout" class="lead" /> Log out</div>
                <div class="transparent compact divider"></div>
                <div class="xhover item 0-padding"><button class="fluid button">Have a shop online</button></div>
            </template>
            <template v-else>
                <div v-collapsible class="item xactive">
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
                <div class="xhover item 0-padding"><button class="fluid primary button open-modal exit-sidepanel" data-target="register-modal">Sign Up</button></div>
            </template>
        </div>
    </template>
    <div v-else-if="name === 'main_menu'" class="container items auto-margined" style="border-radius: var(--radius-default)">
        <div class="item as-icon open-sidepanel" v-tooltip.unblocking data-tooltip="Menu" data-target="msidepanel">
            <SvgIcon name="menu" />
        </div>
        <router-link :to="userStore.auth ? '/home' : '/'" class="xhover item as-icon">
            <img src="/images/logo_sqr.png" alt="site logo" class="logo-lg site-logo">
        </router-link>
        <form class="xhover adaptable item md-and-down-hidden" @submit.prevent="searchStore.triggerSearch()">
            <label class="input fluid transparent" style="max-width: var(--container-text); background-color: var(--surface-v4) !important;">
                <SvgIcon name="search" class="xhover" />
                <input v-model="searchStore.searchBox" type="search" placeholder="Your search here." class="subject">
                <button type="button" v-tooltip.unblocking data-tooltip="Scan Business QR" class="icon open-modal" data-target="scanqr-modal">
                    <SvgIcon name="qr_code_scanner" />
                </button>
                <button type="button" v-tooltip.unblocking data-tooltip="Search location is set to Nigeria. Click to change it." class="icon open-modal" data-target="">
                    <SvgIcon name="location_on" />	
                </button>
            </label>
        </form>
        <div class="items r-aligned">
            <div v-tooltip.unblocking data-tooltip="Search" class="open-modal as-icon item md-and-up-hidden sm-and-down-hidden" data-target="search-modal">
                <SvgIcon name="search" />
            </div>
            <rc-shareables name="do_more_item" />
            <template v-if="userStore.auth">
                <div class="as-icon item" v-tooltip.unblocking data-tooltip="Notifications">
                    <SvgIcon name="notifications" />
                </div>
                <Dropdown :options="{directionPriority: {x: 'left', y: 'bottom'}}" v-tooltip.unblocking data-tooltip="Your profile" class="xhover as-icon item">
                    <img :src="userStore.userData.profileImg" alt="profile"  class="fully-rounded logo" />
                    <rc-shareables name="profile_menu" />
                </Dropdown>
            </template>
            <template v-else>
                <div class="items lg-and-down-hidden">
                    <div class="item open-modal" data-target="login-modal">Log in</div>
                    <div class="xhover item as-icon 0-l-padding"><button class="primary button open-modal" data-target="register-modal">Sign Up</button></div>
                </div>
                <Dropdown :options="{directionPriority: {x: 'left', y: 'bottom'}}" v-tooltip.unblocking data-tooltip="Account" class="item as-icon lg-and-up-hidden">
                    <SvgIcon name="person_add" /> <span class="sm-and-down-hidden">Account</span>
                    <Dropmenu>
                        <div class="item open-modal" data-target="login-modal">Log in</div>
                        <div class="item open-modal" data-target="register-modal">Sign Up</div>
                    </Dropmenu>
                </Dropdown>
            </template>
        </div>
    </div>
    
    <header v-else-if="name === 'common_header'" id="main-header" style="border-bottom: 1px solid var(--outline); background-color: var(--surface);">
        <div class="menu" style="height: 64px;">
            <rc-shareables name="main_menu" />
        </div>
        <div class="container md-and-up-hidden" style="padding-top: 0.5rem; padding-bottom: 0.5rem;">
            <form class="fluid" @submit.prevent="searchStore.triggerSearch()">
                <label class="input fluid transparent" style="background-color: var(--surface-v4) !important;">
                    <SvgIcon name="search" class="xhover" />
                    <input v-model="searchStore.searchBox" type="search" id="searchinput" placeholder="Your search here." class="subject" ref="inputbox" autofocus />
                    <button type="button" v-tooltip.unblocking data-tooltip="Scan Business QR" class="icon open-modal" data-target="scanqr-modal">
                        <SvgIcon name="qr_code_scanner" />
                    </button>
                    <button type="button" v-tooltip.unblocking data-tooltip="Search location is set to Nigeria. Click to change it." class="icon open-modal" data-target="">
                        <SvgIcon name="location_on" />	
                    </button>
                </label>
            </form>
        </div>
        <div class="md-and-down-hidden" style="padding: 0em 0em 0.5em;">
            <div class="container grid flex-no-wrap" style="gap: 0.5em;">
                <div class="manual-width col"><div class="compact transparent button bold open-modal" data-target="explore-modal"><SvgIcon name="manage_search" class="lead" /> Explore:</div></div>
                <div v-iScroller id="categories" class="i-scroller col" style="overflow: hidden; padding: 4px 0px;">
                    <div class="l-scroll"><SvgIcon name="double_arrow_left" class="mini" /></div>
                    <div class="r-scroll"><SvgIcon name="double_arrow_right" class="mini" /></div>
                    <div class="scroll-items" style="gap: 8px;">
                        <button class="chip"><SvgIcon name="restaurant" class="small lead" /> Restaurants</button>
                        <button class="chip"><SvgIcon name="local_bar" class="small lead" /> Bars</button>
                        <button class="chip"><SvgIcon name="local_parking" class="small lead" /> Parks</button>
                        <button class="chip"><SvgIcon name="hotel" class="small lead" /> Hotels</button>
                        <button class="chip"><SvgIcon name="shopping_cart" class="small lead" /> Groceries</button>
                        <button class="chip"><SvgIcon name="local_gas_station" class="small lead" /> Filling stations</button>
                        <button class="chip"><SvgIcon name="local_pharmacy" class="small lead" /> Pharmacies</button>
                        <button class="chip"><SvgIcon name="local_hospital" class="small lead" /> Hospitals and clinics</button>
                        <button class="chip"><SvgIcon name="more_horiz" class="small lead" /> More</button>
                    </div>
                </div>
            </div>
        </div>
	</header>
    <footer v-else-if="name === 'common_footer'" style="align-self: flex-end;">
       <rc-shareables name="copyright" />
    </footer>
    <div v-else-if="name === 'copyright'" class="transparent text wrappable menu flex-centered">
        <div class="item">Terms of use</div>
        <div class="item">About us</div>
        <div class="item">Help</div>
        <div class="item">Settings</div>
        <div class="item">@ Copyright 2023</div>
        <div class="item">Emmadave Inc.</div>
    </div>


    <template v-else-if="name === 'page_nav'">
        <aside id="navmenu" class="manual-width col sidemenu sp-wrapper">
            <div v-scrollPin="{ topSpacing: 84, bottomSpacing: 16, ancestorGuarded: true }" class="vertical transparent menu">
                <rc-shareables name="nav_menu" />
            </div>
        </aside>
    </template>
    <template v-else-if="name === 'ad_menu'">
        <aside class="manual-width col sidemenu lg-and-down-hidden">
            <div id="admenu" v-scrollPin="{ topSpacing: 84, bottomSpacing: 16, parentGuided: true }">
                <div style="width: 100%;">
                    <h6 class="centered" style="margin-bottom: 16px;">Sponsored (Ads)</h6>
                    <div class="ads">
                        <div class="centered ad">
                            <img src="/images/ads.jpg" alt="ad" class="image">
                            <div>
                                Fix your laptops and desktops (Hardware and Software).
                                <button class="primary button">contact us</button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- <rc-shareables name="common_footer" /> -->
            </div>
        </aside>
    </template>
    <div v-else-if="name === 'color_scheme'" class="field" style="align-self: flex-end">
        <label>Color scheme settings</label>
        <div class="icon fluid option-group">
            <label>
                <input v-model="mainStore.colorScheme" type="radio" value="light-mode" />
                <SvgIcon name="light_mode" />
            </label>
            <label>
                <input v-model="mainStore.colorScheme" type="radio" value="auto-mode" />
                <SvgIcon name="desktop_windows" />
            </label>
            <label>
                <input v-model="mainStore.colorScheme" type="radio" value="dark-mode" />
                <SvgIcon name="dark_mode" />
            </label>
        </div>
    </div>
</template>