<script>
    import { utils } from '../utils';

    export default {
        props: ['options'],
        data() {
            return {
                factory: {
					namespace: 'carousel',
                    continuous: true, // can also be set it to string 'rewind'
                    slidesPerView: 1,
                    sliderMove: 'slide',
                    spaceBetween: '0.5em',
					breakpoints: {
						// // when window width is >= 320px
						// 320: {
						// 	slidesPerView: 2,
						// 	spaceBetween: 20
						// }
					},
					animation: 'slide',
                    direction: 'horizontal',
                    track: 'default', // can also be the following: 'thumbnails', 'scroll'.
                    trackView: 'slide',
					slidesHeight: 'auto', // can also be 'inherit'
                    transitionDuration: 500,
                    autoplay: true,
                    autoplayInterval: 5000,
                    pauseOnHover: false,
					pauseOnClick: true,
                    imageZoom: true,
                    videoAutoPlay: false,
                    videoMute: true,
                    controllable: true
                },
                e: {},
                tmp: {
                    sliderDistance: '0px',
					newCoord: 0,
					startCoord: 0,
					endCoord: 0,
					initCoords: 0,
					gsmScale: 0,
					coordChange: false,
					gsmSt: false,
					aStartCoord: 0,
					gsDir: 0
                }
            }
        },
        methods: {
			init(breakpoint = {}) {
				breakpoint = {
					...{
						slidesPerView: this.settings.slidesPerView,
						spaceBetween: this.settings.spaceBetween,
						slidesHeight: this.settings.slidesHeight
					},
					...breakpoint
				};
				breakpoint.spaceBetween = typeof(breakpoint.spaceBetween) === 'number' ? `${breakpoint.spaceBetween}px` : breakpoint.spaceBetween;
				this.e.slides = [...this.e.slider.querySelectorAll(`:scope > .cs-slide`)].filter(el => !el.matches(`[data-creator='${this.uniqueId}']`));
				if (!this.e.slides[0]) return;

				// Initialize carousel
				if (!this.initialized || this.tmp.slidesNo !== this.e.slides.length) {
					[...this.e.carousel.querySelectorAll(`:scope [data-creator='${this.uniqueId}']`)].forEach(el => el.remove());
					this.e.slides.forEach((el, index) => {
						el.setAttribute('data-csId', index+1);
						let track = document.createElement('button');
						track.classList.add('track');
						track.setAttribute('data-trackId', index+1);
						track.setAttribute('data-creator', this.uniqueId);
						this.e.tracker.append(track);

						if (this.settings.continuous && this.settings.continuous !== 'rewind') {
							let eC = el.cloneNode(true);
							eC.setAttribute('data-creator', this.uniqueId);
							eC.classList.remove('active');
							this.e.slider.append(eC);
							if (!index) this.e.slider.prepend(eC.cloneNode(true));
							else this.e.slider.insertBefore(eC.cloneNode(true), this.e.slider.children[index]);
						}
					});
					this.initialized = true;
				}

				this.tmp.slidesNo = this.e.slides.length; // number of slides in the carousel
				// the 1-based index of the current slide
				this.tmp.slideNo = this.e.slides.filter(el => el.classList.contains('active'))[0]
					? Number(this.e.slides.filter(el => el.classList.contains('active'))[0].getAttribute('data-csId'))
					: 1;
				this.e.currSlide = this.e.slides[this.tmp.slideNo - 1];

				// ensure the slidePerPage is not more than the number of slides in the carousel in a continuous carousel
				this.tmp.slidesPerView = (this.settings.continuous && this.settings.continuous !== 'rewind') && breakpoint.slidesPerView > this.tmp.slidesNo ? this.tmp.slidesNo : breakpoint.slidesPerView;
				[...this.e.slider.querySelectorAll(`:scope > .cs-slide`)].forEach((el) => {
					el.style.width = `calc(((100% + ${breakpoint.spaceBetween}) / ${this.tmp.slidesPerView}) - ${breakpoint.spaceBetween})`;
                	el.style.marginRight = breakpoint.spaceBetween;
					if (breakpoint.slidesHeight === 'inherit') el.style.height = 'inherit';
				});
				// cache slide extent
				this.tmp.slideExt = this.e.currSlide.offsetWidth + parseFloat(window.getComputedStyle(this.e.currSlide).getPropertyValue('margin-right'));
				
				if (this.settings.continuous && this.settings.continuous !== 'rewind') {
					this.tmp.minExt = -(this.tmp.slideExt*this.tmp.slidesNo);
					this.tmp.maxExt = -(this.tmp.slideExt*this.tmp.slidesNo*2) + this.tmp.slideExt;
				}

				this.update();
			},
			sizeResponse() {
				let breakpoint = this.settings.breakpoints[Object.getOwnPropertyNames(this.settings.breakpoints).sort(function (a,b) { return Number(b) - Number(a); }).filter(el => window.innerWidth >= Number(el))[0]];
				if (breakpoint) this.init(breakpoint);
				else this.init();
			},
            gestureStart(e) {
				if (this.tmp.slidesNo <= 1) return; // stop gesture if total number of slides is one or less;

				if (this.tmp.playing) {
					this.stopSlideshow();
					this.tmp.playing = true;
				}
	
				// save gesture time start to know gesture duration
				this.tmp.gT = new Date().getTime();
				
				// save the initial value of bb.newCoord to have it accessable when the move-gesture event is triggered. (That's because the newCoord value might change during the event)
				this.tmp.initCoords = this.tmp.newCoord; 
				this.tmp.startCoord = e.clientX;
				this.tmp.endCoord = e.clientX; // set the initial endCoord to the startpoint coord;

				// Swiping
				this.e.slider.classList.add('swiping');
				
				e.currentTarget.setPointerCapture(e.pointerId);
				e.currentTarget.addEventListener('pointermove', this.gestureMove);
				e.currentTarget.addEventListener('pointerup', this.gestureEnd);
			},
			gestureMove(e) {
				this.tmp.gsDir = this.tmp.endCoord > e.clientX ? 1 : this.tmp.endCoord < e.clientX ? -1 : this.tmp.gsDir;
				this.tmp.endCoord = e.clientX;

				if (Math.abs(this.tmp.endCoord - this.tmp.startCoord) > 5) {
					this.tmp.newCoord = this.tmp.initCoords + this.tmp.endCoord - this.tmp.startCoord + (this.tmp.gsmScale * Math.abs(this.tmp.minExt));

					// Swipping in action
					this.tmp.coordChange = true;

					if (this.settings.continuous && this.settings.continuous !== 'rewind') {
						if (this.tmp.gsDir === 1 && this.tmp.newCoord < this.tmp.maxExt) this.tmp.gsmScale += 1;
						else if (this.tmp.gsDir === -1 && this.tmp.newCoord > this.tmp.minExt) this.tmp.gsmScale -= 1;
						this.tmp.newCoord = this.tmp.initCoords + this.tmp.endCoord - this.tmp.startCoord + (this.tmp.gsmScale * Math.abs(this.tmp.minExt));
					}

					this.e.slider.style.transform = `translateX(${this.tmp.newCoord}px)`;
				}
			},
			gestureEnd(e) {
				e.currentTarget.removeEventListener('pointermove', this.gestureMove);
				e.currentTarget.removeEventListener('pointerup', this.gestureEnd);
			
				this.tmp.endCoord = e.clientX;
				this.tmp.gsDir = 0; // reset gesture move direction
				this.tmp.gsmScale = 0; // reset gesture move scale offset calculation

				if (this.e.slider.classList.contains('swiping') && this.tmp.coordChange) {
					let
						xChange = this.tmp.endCoord - this.tmp.startCoord,
						sChange = Math.abs(xChange/this.tmp.slideExt)
					;

					if (Math.abs(xChange) > this.tmp.slideExt/3 || (Math.abs(xChange) > this.tmp.slideExt/20 && new Date().getTime() - this.tmp.gT < 300)) {
						this.e.slider.classList.remove('swiping');
						sChange = (this.settings.continuous)
							? Math.ceil(sChange) > this.tmp.slidesNo
								? Math.ceil(sChange) % this.tmp.slidesNo
								: Math.ceil(sChange)
							: Math.ceil(sChange);
						this.update(this.tmp.slideNo + ((xChange > 0) ? -sChange : sChange), 'gesture');
					}
					else {
						this.tmp.newCoord = this.tmp.initCoords + this.tmp.endCoord - this.tmp.startCoord;
						this.e.slider.style.transform = `translateX(${this.tmp.newCoord}px)`;
						setTimeout(() => { 
							this.e.slider.classList.remove('swiping');
							this.update(this.tmp.slideNo, 'gesture');
						}, 20);						
					}
				}
				else {
					this.e.slider.classList.remove('swiping'); // Do this to ensure the swiping class is removed if added by event emulation
					this.update(this.tmp.slideNo, 'gesture');
					// this.stopSlideshow();
				}
			},
            prevSlides() {				
				let newI = this.tmp.slideNo - (this.settings.sliderMove === 'page' ? this.tmp.slidesPerView : 1);
	
				if ((this.settings.continuous && this.settings.continuous !== 'rewind') && newI < 1) {
					this.e.slider.classList.add('ghost-walk');
					this.e.slider.style.transform = `translateX(${this.tmp.newCoord + this.tmp.minExt}px)`;
					setTimeout(() => { this.e.slider.classList.remove('ghost-walk'); }, 10);
				}
				setTimeout(() => { this.update(newI, 'control'); }, 20);
                // stopSlideshow();
            },
            nextSlides() {
				let newI = this.tmp.slideNo + (this.settings.sliderMove === 'page' ? this.tmp.slidesPerView : 1);
				
				if ((this.settings.continuous && this.settings.continuous !== 'rewind') && newI > this.tmp.slidesNo) {
					this.e.slider.classList.add('ghost-walk');
					this.e.slider.style.transform = `translateX(${this.tmp.newCoord - this.tmp.minExt}px)`;
					setTimeout(() => { this.e.slider.classList.remove('ghost-walk'); }, 10);
				}
				setTimeout(() => { this.update(newI, 'control'); }, 20);

                // if (settings.playing) {
                //     stopSlideshow();
                //     startSlideshow();
                // }
            },
            trackControl(e) {
				let track = e.target.closest('button.track');
				if (track) this.update(Number(track.getAttribute('data-trackid')));
            },
			update(newI = this.tmp.slideNo) {
				let sBleed = (this.settings.continuous && this.settings.continuous !== 'rewind') ? this.tmp.slidesNo * this.tmp.slideExt : 0;
				clearTimeout(this.tmp.updateSet);
				
				newI = (!this.settings.continuous)
					? (newI < 1)
						? 1
						: (newI > this.tmp.slidesNo)
							? this.tmp.slidesNo
							: newI
					: (newI < 1)
						? this.tmp.slidesNo + newI
						: (newI > this.tmp.slidesNo)
							? newI - this.tmp.slidesNo
							: newI;
				;
				// pause html5 video when current slide change
				// stop youtube video when current slide change

				this.e.prevSlide = this.e.currSlide;
				this.tmp.slideNo = newI;
				this.e.currSlide = this.e.slides[this.tmp.slideNo - 1];
				this.tmp.newCoord = -sBleed + Math.min(Math.max((newI - 1) * -this.tmp.slideExt, -(this.tmp.slideExt * this.tmp.slidesNo - this.tmp.slideExt)), 0);
				this.e.slider.style.transform = `translateX(${this.tmp.newCoord}px)`;
				this.tmp.updateSet = setTimeout(() => {
					[...this.e.slider.querySelectorAll(`:scope > .cs-slide`)].forEach((el) => el.classList.remove('active'));
					[...this.e.slider.querySelectorAll(`:scope > .cs-slide[data-csid='${newI}']`)].forEach((el) => el.classList.add('active'));
				}, this.settings.transitionDuration);
				
				
				// determine controls
				if (!this.settings.continuous && this.tmp.slidesNo > 1) {
					if (this.tmp.slideNo === 1) {
						this.e.prevBtn.classList.add('disabled');
						this.e.nextBtn.classList.remove('disabled');
					}
					else if (this.tmp.slideNo === this.tmp.slidesNo) {
						this.e.nextBtn.classList.add('disabled');
						this.e.prevBtn.classList.remove('disabled');
					}
					else {
						this.e.prevBtn.classList.remove('disabled');
						this.e.nextBtn.classList.remove('disabled');
					}
				}

				if (this.tmp.slidesNo === 1) {
					this.e.prevBtn.classList.add('disabled');
					this.e.nextBtn.classList.add('disabled');
				}

				let track = this.e.tracker.querySelector(`:scope [data-trackid="${newI}"]`);
				track.classList.add('active');
				[...this.e.tracker.children].filter((el) => el != track).forEach((el) => el.classList.remove('active'));
				this.tmp.coordChange = false;
			},
            startSlideshow() {
				settings.slidePlayer = setInterval(function() {
					update(1);
					lightbox.find(".progress-bar > .determinate").removeAttr("style")
					setTimeout(function() {
						lightbox.find(".progress-bar > .determinate").css({width: "100%", transition: "width "+(settings.slideshowDuration-200)+"ms ease 0s"});
					}, 200);
				}, settings.slideshowDuration);

				if (!settings.playing) {
					setTimeout(function() {
						lightbox.find(".progress-bar > .determinate").css({width: "100%", transition: "width "+(settings.slideshowDuration-200)+"ms ease 0s"});
					}, 200);
				}

				settings.playing = true;
				toolbar.find(".slideshow").addClass("active");
				lightbox.addClass("playing");
			},
			stopSlideshow() {
				settings.playing = false;
				clearInterval(settings.slidePlayer);
				lightbox.removeClass("playing").find(".progress-bar > .determinate").removeAttr("style");
				toolbar.find(".slideshow").removeClass("active");
			}
        },
        mounted() {
            this.settings = {
                ...this.factory,
                ...this.options || {}
            };
			this.uniqueId = utils.getUniqueId(this.settings.namespace);
            
			this.e.carousel = this.$refs.carousel;
			this.e.viewbox = this.$refs.viewbox;
			this.e.slider = this.$refs.slider;
			
			this.e.prevBtn = this.$refs.prevBtn;
            this.e.nextBtn = this.$refs.nextBtn;
            this.e.tracker = this.$refs.tracker;

			this.e.slider.style.transitionDuration = `${this.settings.transitionDuration}ms`;
			this.e.slider.setAttribute('data-anim', this.settings.animation);

			// Use mouse wheel to zoom image
			// this.e.slider.addEventListener('wheel', this.mouseWheel);

            // Gesture control on carousel
			this.e.slider.ondragstart = () => false; // prevent browser from hijacking swiping process
			this.e.slider.addEventListener('pointerdown', this.gestureStart);

            // navigator control on carousel
            this.e.prevBtn.addEventListener('click', this.prevSlides);
            this.e.nextBtn.addEventListener('click', this.nextSlides);

            // slide track control on carousel
            this.e.tracker.addEventListener('click', this.trackControl);

			// responsiveness
			window.addEventListener('resize', this.sizeResponse);
			this.sizeResponse();
        },
		updated() {
			this.sizeResponse();
		}
    }
</script>
<template>
    <div ref="carousel" class="carousel">
        <div ref="viewbox" class="cs-viewbox">
            <div ref="slider" class="cs-slider">
                <slot></slot>
            </div>
        </div>
        <div ref="tracker" class="cs-tracker">
		</div>
        <div class="cs-controls">
            <button ref="prevBtn" type="button" class="cs-nav cs-prev">
                <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M660.173-441.348H183.261q-18.826 0-30.457-11.63-11.63-11.631-11.63-29.457 0-17.261 11.63-29.674 11.631-12.413 30.457-12.413h476.912L531.652-653.609q-12.131-11.565-12.131-28.826 0-17.261 12.696-29.956 11.565-11.566 28.544-11.066 16.978.5 29.109 12.066l200.565 199q5 6 8.848 13.695 3.847 7.696 3.847 16.261t-3.847 16.261q-3.848 7.696-8.848 13.261l-199 197.87q-12.696 12.13-29.674 12.63-16.979.5-28.544-12.63-12.696-10.566-12.196-28.327.5-17.76 12.631-30.456l126.521-127.522Z"/></svg>
				<!-- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40"><path d="m13.5 7.01 13 13m-13 13 13-13"></path></svg> -->
            </button>
            <button ref="nextBtn" type="button" class="cs-nav cs-next">
                <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M660.173-441.348H183.261q-18.826 0-30.457-11.63-11.63-11.631-11.63-29.457 0-17.261 11.63-29.674 11.631-12.413 30.457-12.413h476.912L531.652-653.609q-12.131-11.565-12.131-28.826 0-17.261 12.696-29.956 11.565-11.566 28.544-11.066 16.978.5 29.109 12.066l200.565 199q5 6 8.848 13.695 3.847 7.696 3.847 16.261t-3.847 16.261q-3.848 7.696-8.848 13.261l-199 197.87q-12.696 12.13-29.674 12.63-16.979.5-28.544-12.63-12.696-10.566-12.196-28.327.5-17.76 12.631-30.456l126.521-127.522Z"/></svg>
				<!-- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40"><path d="m13.5 7.01 13 13m-13 13 13-13"></path></svg> -->
            </button>
        </div>
    </div>
</template>
<style lang="scss">
    .carousel {
        display: block;
        position: relative;
        max-width: 100%;
    }
    .cs-viewbox {
        display: block;
        overflow: hidden !important;
		user-select: none;
		width: 100%;
		height: inherit;
    }

    .cs-slider {
        display: flex;
        align-items: center;
        backface-visibility: hidden;
        list-style: none !important;
        overflow: visible !important;
        margin: 0 !important;
        padding: 0 !important;
		width: 100% !important;
		height: inherit;
		transition: transform 500ms cubic-bezier(0, 0, 0.25, 1);
		touch-action: none;
		
		&.swiping,
		&.ghost-walk { transition-duration: 0ms !important; }

        .cs-slide {
            display: flex;
            flex: 0 0 auto;
            justify-content: center;
            align-items: center;
			text-align: center;
            overflow: hidden;
            list-style: none !important;
            position: relative;
            width: 100%;
            height: auto;
            z-index: 0;

            & > * {
                width: 100%;
                height: auto;
            }

			// &.active { background-color: var(--surface-v5); }
        }

		&[data-anim="slide"] {
			flex-flow: row nowrap;
		}
    }

	.cs-tracker {
		display: flex;
		position: absolute;
		bottom: 0.5rem;
		left: 0px;
		width: 100%;
		align-items: center;
		justify-content: center;
		flex-flow: row wrap;
		gap: 0.25em;
		margin: 0;
		pointer-events: none;

		& > .track {
			display: inline-block;
			position: relative;
			background-color: var(--outline);
			border: 0;
			border-radius: 50%;
			height: 0.625em;
			width: 0.625em;
			margin: 0;
			padding: 0;
			opacity: 0.75;
			transition: background-color .2s ease,color .2s ease;
			pointer-events: auto;

			&.active {
				background-color: var(--primary);
				opacity: 1;
			}
		}
	}

	.cs-controls {transition: opacity ease 0.2s; }
	.carousel:not(:hover) > .cs-controls { opacity: 0; }

    .cs-nav {
        background: transparent;
        border: 0;
		opacity: 0.5;
		border-radius: 50%;
        padding: 0px !important;
        margin: 0 !important;
        color: var(--on-surface);
        cursor: pointer;
        font-size: 1.25em;
        position: absolute;
        top: 50%;

		&:hover { opacity: 1; }

		&.disabled {
			opacity: 0;
			pointer-events: none;
		}
        & > svg {
            height: 1.5em;
            width: 1.5em;
            fill: currentColor;
            vertical-align: -0.375em;
        }
    }

    .cs-prev {
        left: 0.0625rem;
        transform: scaleX(-1) translateY(-50%);
    }
    .cs-next {
        right: 0.0625rem;
        transform: translateY(-50%);
    }
</style>