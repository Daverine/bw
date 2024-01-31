<script>
	import { useMainStore } from '../stores';
	import { useSearchStore } from '../stores/searchStore';
	import Shareables from './Shareables.vue';

	export default {
		setup() {
			const
				mainStore = useMainStore(),
				searchStore = useSearchStore()
			;

			return { mainStore, searchStore }
		},
		components: { Shareables },
		methods: {
			handleScroll() {
				if (this.$refs.main.getBoundingClientRect().top <= 0) this.mainStore.mutateSFM(true);
				else this.mainStore.mutateSFM(false);
			},
			submitSearch() {
				this.searchStore.triggerSearch();
				this.$router.push('/search?'+this.searchStore.searchBox);
			}
		},
		mounted() {
			window.dispatchEvent(new Event("scroll"));
			window.addEventListener('scroll', this.handleScroll);
		},
		unmounted() {
			window.removeEventListener('scroll', this.handleScroll);
		}
	}
</script>
<template>
	<div class="as-page">
		<header id="main-header">
			<div class="rounded transparent menu" style="height: 64px;">
				<div class="container items">
					<div class="item as-icon lg-and-up-hidden open-sidepanel" v-tooltip.unblocking data-tooltip="Menu" data-target="msidepanel">
						<SvgIcon name="menu" />
					</div>
					<div class="xhover item as-icon">
						<img src="/images/logo_sqr.png" alt="site logo" class="logo-lg site-logo" />
					</div>
					<div class="items r-aligned">
						<div class="items lg-and-down-hidden">
							<Dropdown class="item">
								Support
								<SvgIcon name="expand_more" class="trailing" />
								<Dropmenu class="rounded">
									<Shareables name="supports" />
								</Dropmenu>
							</Dropdown>
							<a href="help.html#shop-online" class="item">Have a shop online</a>
						</div>
						<div class="items sm-and-down-hidden">
							<div class="item open-modal" data-target="login-modal">Log in</div>
							<div class="xhover item 0-h-padding"><button class="rounded primary button open-modal" data-target="register-modal">Sign Up</button></div>
						</div>
						<Dropdown class="as-icon item sm-and-up-hidden">
							<SvgIcon name="person_add" class="lead" /> Account
							<Dropmenu class="rounded">
								<div class="item open-modal" data-target="login-modal">Log in</div>
								<div class="xhover item"><button class="rounded primary button open-modal" data-target="register-modal">Sign Up</button></div>
							</Dropmenu>
						</Dropdown>
					</div>
				</div>
			</div>
			<form id="searchbox" class="rounded centered" @submit.prevent="submitSearch">
				<div style="margin-bottom: 32px;">
					<h1 id="call-text">Let's do business</h1>
					<p class="huge">Search for business names, products and services.</p>
				</div>
				<div>
					<label class="input rounded big fluid">
						<SvgIcon name="search" class="xhover" />
						<input v-model="searchStore.searchBox" type="search" id="searchinput" placeholder="Your search here." class="subject" ref="inputbox" autofocus />
						<button type="button" v-tooltip.unblocking data-tooltip="Scan QR" class="icon open-modal" data-target="scanqr-modal">
							<SvgIcon name="qr_code_scanner" />
						</button>
					</label>
					<div style="margin-top: 8px;">Search in: <span class="bold">Nigeria</span>. <a href="#">Change Location</a></div>
					<div class="grid" style="gap: 16px; margin: 32px auto 0px; max-width: 300px;">
						<div class="col">
							<button class="rounded fluid button">
								SEARCH
							</button>
						</div>
						<div class="col">
							<button type="button" class="rounded fluid button open-modal" data-target="explore-modal">
								EXPLORE
							</button>
						</div>
					</div>
				</div>
			</form>

			<div style="width: 100%; align-self: flex-end; margin: 2rem auto 1rem;">
				<div role="button" @click="$refs.main.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })" class="mouse_scroll">
					<div class="mouse">
						<div class="wheel"></div>
					</div>
					<div>
						<span class="m_scroll_arrows unu"></span>
						<span class="m_scroll_arrows doi"></span>
						<span class="m_scroll_arrows trei"></span>
					</div>
				</div>
			</div>
		</header>
		<article ref="main">
			<section id="whatfor" class="sec-block">
				<div class="big centered container">
					<h1>What is BizWorld for?</h1>
					<p>BizWorld is where new and old customers meet businesses. You can perceive Bizworld as a very large market online where you meet variety of businesses. You can get updates from stores and offices. You can rate and write review on businesses.</p>
				</div>
			</section>
			<section class="sec-block">
				<div class="container grid">
					<div class="col">
						<img src="/images/explore.jpg" alt="picture depicting explore" class="rounded image" />
					</div>
					<div class="col big">
						<div>
							<h2>Explore businesses around you without leaving your spot</h2>
							<p>You can browse for businesses based on a listed categories of common needed services; You can compare businesses and determine where is best for you to get things done.</p>
							<ul>
								<li>Find the category of service or shopping you need</li>
								<li>Compare distance, rating, review of businesses</li>
								<li>View business info like location, what they offer, etc.</li>
								<li>Navigate to a business page to interact with the business</li>
								<li>Rate and write review on a business based on your experience</li>
								<!-- Browse for products and services around you and know where to get things done without having to ask anyone. Our explore section displays businesses in categories of what they offer. So you can easily compare businesses there. If the category you are looking for is not there you can make use of seach instead.</li> -->
							</ul>
							<div class="centered">
								<button class="rounded primary button open-modal" data-target="explore-modal">EXPLORE</button>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section class="sec-block">
				<div class="container grid">
					<div class="col big">
						<div>
							<h2>Know there products and services without asking</h2>
							<p>Scan a business bizWorld QR Code and get to know what products or services a business offer. Businesses that have page(s) on bizWorld usually have their BizWorld QR Code pasted in public places to help people easyly access their page. You can utilize the QR scanner on this page on such Code and directly access a business page and explore their business world.</p>
							<div class="centered">
								<button class="rounded primary button open-modal" data-target="scanqr-modal">SCAN QR</button>
							</div>
						</div>
					</div>
					<div class="col">
						<img src="/images/qr.jpg" alt="picture depicting qr" class="rounded image" />
					</div>
				</div>
			</section>
			<section class="sec-block">
				<div class="big centered container">
					<h2>Take your business online with ease.</h2>
					<p>Are you a business owner? Do you want people to connect with your business with ease online? We got you covered. Get started create your microsite here on BizWorld today and get connected with new clients and customers.</p>
					<div class="centered">
						<button class="rounded primary button">GET STARTED</button>
					</div>
				</div>
			</section>
		</article>
		<footer style="background-color: rgba(128, 128, 128, 0.1);">
			<div class="container grid" style="gap: 1rem; padding-top: 45px; padding-bottom: 20px;">
				<div class="col">
					<div class="heading">Resources</div>
					<div class="vertical text menu">
						<a href="#" class="item">Help & Support</a>
						<a href="#" class="item">Blog</a>
						<a href="#" class="item">What’s a micro-site</a>
						<a href="#" class="item">What’s new</a>
						<a href="#" class="item">About Us</a>
					</div>
				</div>
				<div class="col">
					<div class="heading">Business</div>
					<div class="vertical text menu">
						<a href="#" class="item">BizWorld</a>
						<a href="#" class="item">Linda - POS</a>
						<a href="#" class="item">School Management System</a>
					</div>
				</div>
				<div class="col">
					<div class="heading">Contacts</div>
					<div class="vertical text menu">
						<a href="#" class="item">+234000000000</a>
						<a href="#" class="item">info@bizworld.com</a>
						<a href="#" class="item">support@bizworld.com</a>
					</div>
					<button class="rounded secondary button">Anonymous Feedback</button>
				</div>
				<div class="col">
					<div class="heading">Follow us</div>
					<div class="vertical text menu">
						<a href="#" class="item">Twitter</a>
						<a href="#" class="item">YouTube</a>
						<a href="#" class="item">Instagram</a>
						<a href="#" class="item">Facebook</a>
					</div>
				</div>
			</div>
			<div class="transparent wrappable text menu" style="padding: 10px 0px;">
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

<style scoped>
	.as-page {
		scroll-behavior: smooth;
	}

	#main-header {
		min-height: calc(100vh - 64px);
		display: flex;
		flex-wrap: wrap;
	}

	#searchbox {
		width: 100%;
		max-width: 600px;
		padding: 0px 1rem;
		margin: 32px auto;
		align-self: center;
	}

	#call-text {
		margin-top: 0px;
		margin-bottom: 10px;
		line-height: 1.125em;
		font-family: 'Lilita One', cursive;
	}

	.sec-block {
		padding-top: 75px;
		padding-bottom: 75px;
	}
	.sec-block .col {
		display: flex;
		flex-flow: row wrap;
		align-items: center;
		padding-left: 20px;
		padding-right: 20px;
	}
	
	.mouse_scroll {
		display: block;
		width: 24px;
		margin: auto;
	}

	.m_scroll_arrows {
		display: block;
		width: 5px;
		height: 5px;
		transform: rotate(45deg);

		border-right: 2px solid var(--on-surface);
		border-bottom: 2px solid var(--on-surface);
		margin: 0 0 3px 4px;

		width: 16px;
		height: 16px;
	}
	.unu { margin-top: 1px; }
	
	.unu,
	.doi,
	.trei { animation: mouse-scroll 1s infinite; }

	.unu {
		animation-direction: alternate;
		animation-delay: alternate;
	}

	.doi {
		animation-delay: .2s;
		animation-direction: alternate;
		margin-top: -6px;
	}

	.trei {
		animation-delay: .3s;
		animation-direction: alternate;
		margin-top: -6px;
	}

	.mouse {
		height: 42px;
		width: 24px;
		border-radius: 14px;
		transform: none;
		border: 2px solid var(--on-surface);
		top: 170px;
	}

	.wheel {
		height: 5px;
		width: 2px;
		display: block;
		margin: 5px auto;
		background-color: var(--on-surface);
		position: relative;
		height: 4px;
		width: 4px;
		border: 2px solid var(--on-surface);
		border-radius: 8px;
	}

	.wheel {
		animation: mouse-wheel 0.6s linear infinite;
	}

	@keyframes mouse-wheel {
		0% { top: 1px; }
		25% { top: 2px; }
		50% { top: 3px;}
		75% { top: 2px;}
		100% { top: 1px;}
	}

	@keyframes mouse-scroll {
		0%   { opacity: 0; }
		50%  { opacity: .5; }
		100% { opacity: 1; }
	}
</style>
