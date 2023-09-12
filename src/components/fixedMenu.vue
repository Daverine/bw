<script>
	export default {
		data() {
			return {
				pinned: false
			}
		},
		methods: {
			handleScroll() {
				if (window.pageYOffset >= this.offsetTop) {
					this.pinned = true;
				}
				else {
					this.pinned = false;
				}
			}
		},
		mounted() {
			// this.offsetTop = this.$el.offsetTop;
			// let fm = this;
			// window.addEventListener('resize', function() {
			// 	window.removeEventListener('scroll', function () { fm.handleScroll(); });
			// 	fm.pinned = false;
			// 	window.addEventListener('scroll', function () { fm.handleScroll(); });
			// 	window.dispatchEvent(new Event('scroll'));
			// });
			// window.dispatchEvent(new Event('resize'));
		},
		beforeUnmount() {
			// window.removeEventListener('resize', function() {
			// 	window.removeEventListener('scroll', function () { fm.handleScroll(); });
			// 	fm.pinned = false;
			// 	window.addEventListener('scroll', function () { fm.handleScroll(); });
			// 	window.dispatchEvent(new Event('scroll'));
			// });
			// window.removeEventListener('scroll', function () { fm.handleScroll(); });
		},
	}
</script>

<template>
	<div id="fmenu" class="menu z-level-3">
		<slot></slot>
	</div>
</template>

<style scoped>
	:root {
		--fmenu-bg: rgba(255,255,255,0.8);
	}
	.dark-mode {
		--fmenu-bg: rgba(26,26,26,0.8);
	}

	#fmenu {
		position: absolute;
		left: 0px;
		height: 64px;
		transform: translateY(-100%);
		transform-origin: 0%;
		opacity: 0;
		overflow: hidden;
		box-shadow: 0px 1px 10px rgba(128,128,128,0.5);
		z-index: 9000;
		background-color: var(--fmenu-bg);
		backdrop-filter: saturate(50%) blur(8px);
	}

	#fmenu.pinned {
		position: fixed;
		top: 0px;
		opacity: 1;
		transform: translateY(0%);
		transition: transform ease 0.1s, opacity ease 0.1s;
	}
</style>