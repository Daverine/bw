import { utils } from "../utils";
import anime from "animejs";

export function iScroller() {
    const dnm = function() {
        return {
            settings: {
                namespace: 'iScroller',
                scrollBody: '.scroll-items',
                scrollChildren: '.item',
                prevCtrlBtn: '.l-scroll',
                nextCtrlBtn: '.r-scroll',
                autoProvideCtrls: true,
                tolerance: 20,
                duration: 300,
            },
            initialize(el, binding) {
                this.el = el;
                this.settings = utils.isObject(binding.value) ? { ...this.settings, ...binding.value } : this.settings;
                this.e = {
                    scrollElem: this.el.querySelector(this.settings.scrollBody),
				    prevBtn: [...this.el.querySelectorAll(this.settings.prevCtrlBtn)],
				    nextBtn: [...this.el.querySelectorAll(this.settings.nextCtrlBtn)],
				    items: [...this.el.querySelectorAll(this.settings.scrollChildren)],
                };
				this.prop = {};

                // bind all event methods to the correct 'this'
                Object.keys(this).forEach(el => {
                    if (typeof(this[el]) === 'function') {
                        this[el] = this[el].bind(this);
                    }
                });

                if (!this.e.scrollElem) return;
                this.uniqueId = utils.getUniqueId(this.settings.namespace);
                window.addEventListener('resize', this.onResizeMtd);
                this.e.scrollElem.addEventListener('scroll', this.onScrollMtd);
                this.el.ondragstart = () => false;
                this.el.addEventListener('mousedown', this.gestureStart);
                this.el.addEventListener('touchstart', this.gestureStart);
                this.el.addEventListener('wheel', this.wheelControl);
                this.el.addEventListener('activeView', this.viewActiveItem);
                if (this.e.prevBtn[0]) this.e.prevBtn.forEach(el => el.addEventListener('click', this.prevControl));
                if (this.e.nextBtn[0]) this.e.nextBtn.forEach(el => el.addEventListener('click', this.nextControl));
                this.el.addEventListener('stopIscroller', this.stopIscroller);
                this.onResizeMtd();
            },
            onResizeMtd() {
                this.prop.width = this.e.scrollElem.clientWidth;
                this.prop.left = utils.offsetPos(this.e.scrollElem).left;
                this.prop.scrollPos = this.e.scrollElem.scrollLeft;
                this.onScrollMtd();
            },
            onScrollMtd() {
                if (this.e.scrollElem.scrollLeft === 0) this.e.prevBtn.forEach(el => el.classList.add('disabled'));
                else this.e.prevBtn.forEach(el => el.classList.remove('disabled'));
                if (this.e.scrollElem.scrollLeft + this.e.scrollElem.clientWidth >= this.e.scrollElem.scrollWidth - this.settings.tolerance) this.e.nextBtn.forEach(el => el.classList.add('disabled'));
                else this.e.nextBtn.forEach(el => el.classList.remove('disabled'));
            },
            dist(e) {
				return e.type.indexOf("touch") > -1 ? e.touches[0].pageX : e.clientX;
			},
            gestureStart(e) {
                if (this.e.scrollElem.contains(e.target) || e.target === this.e.scrollElem) {
                    this.prop.width = this.e.scrollElem.clientWidth;
                    this.prop.left = utils.offsetPos(this.e.scrollElem).left;
                    this.prop.scrollPos = this.e.scrollElem.scrollLeft;
                    this.startCoords = this.dist(e);
                    this.coordChange = false;
                    this.e.scrollElem.classList.add('swiping');
    
                    if (e.type === 'touchstart') {
                        document.addEventListener('touchmove', this.gestureMove);
                        document.addEventListener('touchend', this.gestureEnd);
                    }
                    else if (e.type === 'mousedown') {
                        document.addEventListener('mousemove', this.gestureMove);
                        document.addEventListener('mouseup', this.gestureEnd);
                    }
                }
            },
            gestureMove(e) {
                this.endCoords = this.dist(e);
                if (Math.abs(this.endCoords - this.startCoords) > 5 && !this.coordChange) this.coordChange = true;
                if (this.coordChange) this.e.scrollElem.scrollLeft = this.prop.scrollPos - (this.endCoords - this.startCoords);
            },
            gestureEnd(e) {
                if (e.type === 'touchend') {
					document.removeEventListener('touchmove', this.gestureMove);
					document.removeEventListener('touchend', this.gestureEnd);
				}
				else {
					document.removeEventListener('mousemove', this.gestureMove);
					document.removeEventListener('mouseup', this.gestureEnd);
				}

                this.e.scrollElem.classList.remove('swiping');
                this.prop.scrollPos = this.e.scrollElem.scrollLeft;
            },
            wheelControl(e) {
                e.preventDefault();
                this.prop.width = this.e.scrollElem.clientWidth;
                this.prop.left = utils.offsetPos(this.e.scrollElem).left;
                this.prop.scrollPos = this.e.scrollElem.scrollLeft;

				if (e.deltaY > 0) {
					this.e.scrollElem.scrollLeft = this.prop.scrollPos + 30;
					this.prop.scrollPos = this.e.scrollElem.scrollLeft;
				}
				else {
					this.e.scrollElem.scrollLeft = this.prop.scrollPos - 30;
					this.prop.scrollPos = this.e.scrollElem.scrollLeft;
				}
            },
            viewActiveItem(e) {
                if (!e.detail.el) return;

                let
                    ae = e.detail.el,
                    aeProp = {
                        left: ae.offset().left,
                        width: ae.outerWidth()
                    },
                    scrollExt = prop.scrollPos - ((prop.width/2) - aeProp.left + prop.left - (aeProp.width/2))
                ;

                this.e.scrollElem.scrollLeft = scrollExt;
                this.onScrollMtd();
            },
            prevControl() {
                this.prop.width = this.e.scrollElem.clientWidth;
                this.prop.left = utils.offsetPos(this.e.scrollElem).left;
                this.prop.scrollPos = this.e.scrollElem.scrollLeft;

                let checker = [];
                if (this.e.items[0]) {
                    this.e.items.forEach((el) => {
                        if (utils.offsetPos(el).left + el.offsetWidth - this.prop.left < 0) return;
                        else checker.push(this.prop.scrollPos - (this.prop.left + this.prop.width - utils.offsetPos(el).left - el.offsetWidth));
                    });
                }

                this.animateScroll((checker.length) ? Math.min.apply(null, checker) + this.settings.tolerance : (this.prop.scrollPos - this.prop.width) > 0 ? this.prop.scrollPos - this.prop.width : 0);
            },
            nextControl() {
                this.prop.width = this.e.scrollElem.clientWidth;
                this.prop.left = utils.offsetPos(this.e.scrollElem).left;
                this.prop.scrollPos = this.e.scrollElem.scrollLeft;

                let checker = [];
                if (this.e.items[0]) {
                    this.e.items.forEach((el) => {
                        if (utils.offsetPos(el).left - this.prop.left < 0 || utils.offsetPos(el).left + el.offsetWidth < this.prop.left + this.prop.width) return;
						else checker.push(this.prop.scrollPos + utils.offsetPos(el).left - this.prop.left);
                    });
                }

                this.animateScroll((checker.length) ? Math.min.apply(null, checker) - this.settings.tolerance : this.prop.scrollPos + this.prop.width >= this.e.scrollElem.scrollWidth ? this.e.scrollElem.scrollWidth : this.prop.scrollPos + this.prop.width);
            },
            animateScroll(scrollExt) {
                anime({
                    targets: this.e.scrollElem,
                    scrollLeft: scrollExt,
                    duration: this.settings.duration,
                    easing: "linear",
                });
            },
            stopIscroller() {
                window.removeEventListener('resize', this.onResizeMtd);
                this.e.scrollElem.removeEventListener('scroll', this.onScrollMtd);
                this.el.removeEventListener('mousedown', this.gestureStart);
                this.el.removeEventListener('wheel', this.wheelControl);
                this.el.removeEventListener('activeView', this.viewActiveItem);
                if (this.e.prevBtn[0]) this.e.prevBtn.forEach(el => el.removeEventListener('click', this.prevControl));
                if (this.e.nextBtn[0]) this.e.nextBtn.forEach(el => el.removeEventListener('click', this.nextControl));
            }
        }
    };

    return {
        mounted(el, binding) {
            if (!el.lui) el.lui = {};
            el.lui.iScroller = dnm();
            el.lui.iScroller.initialize(el, binding);
        },
        updated(el) {
            el.lui.iScroller.onResizeMtd();
        },
        unmounted(el) {
            utils.triggerEvent(el, 'stopIscroller');
        }
    };
};

