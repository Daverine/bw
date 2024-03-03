import { utils } from "../utils";

export function scrollPin() {
    const dnm = function() {
        return {
            default: {
                namespace: 'scrollPin',
                className: 'pinned',
                sticky: false,
                parentGuided: false,
                topSpacing: 0,
                bottomSpacing: 0,
                streamSizeToParent: true,
                pinned: undefined,
                unpinned: undefined,
            },
            initialize(el, binding) {
                // adjust settings
                this.el = el;
                this.settings = utils.isObject(binding.value) ? { ...this.default, ...binding.value } : this.default;
                this.settings.parentGuided = this.settings.sticky ? true : this.settings.parentGuided;
                this.uniqueId = utils.getUniqueId(this.settings.namespace);
                // cache current style attribute of the scrollPin element to be used for resetting during window resize.
                this.initStyle = this.el.getAttribute('style');
                this.prop = {}; this.tmp = {};
                window.addEventListener('resize', this.getGeometry.bind(this));
                window.addEventListener('scroll', this.onScrollMtd.bind(this));
                this.el.addEventListener('stopScrollPin', this.stopScrollPin.bind(this));
                
                const requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
                this.sizeStreamId = requestAnimationFrame(this.streamCallback.bind(this));
                
                // trigger a resize Method of windows used in scrollPin.
                this.getGeometry();
            },
            streamCallback() {
                let elHeight = this.el.getBoundingClientRect().height;
                
                // let parent take scrollPin element height + the parent padding top and bottom as min-height
                if (this.settings.streamSizeToParent) this.el.parentNode.style.minHeight = `${elHeight + parseFloat(utils.getCssVal(this.el.parentNode, 'padding-top')) + parseFloat(utils.getCssVal(this.el.parentNode, 'padding-bottom'))}px`;
                if (elHeight && Math.round(elHeight) !== Math.round(this.prop.eBox.height)) this.getGeometry();
                if (this.settings.parentGuided && this.elParent.getBoundingClientRect().height !== this.prop.pBox.height) this.getGeometry();
                const requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
                requestAnimationFrame(this.streamCallback.bind(this));
            },
            getGeometry() {
                // reset scrollPin
                this.el.classList.remove(this.settings.className);
                if (this.initStyle) this.el.setAttribute('style', this.initStyle);
                else this.el.removeAttribute('style');
                this.currState = 'reset-state';
                

                this.scrollPos = window.scrollY;
                this.prop.eBox = this.el.getBoundingClientRect();
                this.prop.eOffset = utils.offsetPos(this.el);
                this.tmp.pinnable = true;

                // determine if a scrollpin should be independent by element's height
                this.settings.independent = this.prop.eBox.height + this.settings.topSpacing >= window.innerHeight || this.prop.eBox.height + this.settings.bottomSpacing > window.innerHeight;

                // needed if pinned element needs to be contained inside the parent element's boundaries
                if (this.settings.parentGuided) {
                    this.elParent = this.el.parentNode;
                    this.prop.pBox = this.elParent.getBoundingClientRect();
                    this.prop.pOffset = utils.offsetPos(this.elParent);

                    if (this.prop.eBox.height + this.settings.topSpacing + this.settings.bottomSpacing > utils.contentSize(this.elParent).height) {
                        this.tmp.pinnable = false;
                        console.warn('a scrollPin element on this page is not currently pinnable.');
                    }
                }

                // trigger a scroll Method of windows used in scrollPin.
                this.onScrollMtd();
            },
            onScrollMtd() {
                if (this.el.offsetHeight !== Math.round(this.prop.eBox.height)) {
                    this.getGeometry();
                    return;
                }

                if (!this.tmp.pinnable) return;
                // store previous scroll position to be used in independent scrollPin
                let prevScrollPos = this.tmp.scrollPos;


                this.tmp.scrollDir = this.tmp.scrollPos < window.scrollY ? 1 : this.tmp.scrollPos > window.scrollY ? -1 : 0;
                this.tmp.scrollPos = window.scrollY;

                let
                    offsetParent = utils.getParents(this.el).filter(el => utils.getCssVal(el, 'position') !== 'static')[0] || document.body,
                    opOffset = utils.offsetPos(offsetParent)
                ;

                if (this.settings.independent) {
                    // pin the element at the bottom
                    // if element bottom and bottomSpacing is visible on the screen
                    // and the user is scrolling down
                    // and element is not parent-guilded
                    // or the parent bottom (excluding it bottom-padding and bottomSpacing) have not reach the screen bottom. 
                    if (
                        !this.el.classList.contains(this.settings.className) &&
                        (
                            (this.tmp.scrollDir === 1 && utils.offsetPos(this.el).top + this.prop.eBox.height + this.settings.bottomSpacing <= this.tmp.scrollPos + window.innerHeight) ||
                            (this.currState === 'reset-state' && !this.settings.parentGuided && document.body.getBoundingClientRect().height - this.tmp.scrollPos <= this.prop.eBox.height + this.settings.topSpacing)
                         ) &&
                        (!this.settings.parentGuided || this.prop.pOffset.top + this.prop.pBox.height - this.settings.bottomSpacing - parseFloat(utils.getCssVal(this.elParent, 'padding-bottom')) >= this.tmp.scrollPos + window.innerHeight)
                    ) {
                        this.el.classList.add(this.settings.className);
                        this.el.style.position = 'fixed';
                        this.el.style.top = `${window.innerHeight - this.prop.eBox.height - this.settings.bottomSpacing}px`;
                        this.el.style.left = `${this.prop.eOffset.left}px`;
                        // fix for the use of relative width on the element.
                        this.el.style.setProperty('width', this.prop.eBox.width + "px", "important");
                        this.currState = 'bottom-pinned';
                    }
                    // pin the element at the top
                    // if element top and topSpacing is visible
                    // and the user is scrolling up
                    // while element have not reach its initial position
                    else if (
                        !this.el.classList.contains(this.settings.className) &&
                        (   
                            (this.tmp.scrollDir === -1 && utils.offsetPos(this.el).top > this.tmp.scrollPos + this.settings.topSpacing) ||
                            this.currState === 'reset-state' && (this.settings.parentGuided && this.prop.pOffset.top + this.prop.pBox.height - this.tmp.scrollPos > this.prop.eBox.height + this.settings.topSpacing + parseFloat(utils.getCssVal(this.elParent, 'padding-bottom')) || !this.settings.parentGuided && document.body.getBoundingClientRect().height - this.tmp.scrollPos > this.prop.eBox.height + this.settings.topSpacing)
                        ) &&
                        this.tmp.scrollPos >= this.prop.eOffset.top - this.settings.topSpacing
                    ) {
                        this.el.classList.add(this.settings.className);
                        this.el.style.position = 'fixed';
                        this.el.style.top = `${this.settings.topSpacing}px`;
                        this.el.style.left = `${this.prop.eOffset.left}px`;
                        // fix for the use of relative width on the element.
                        this.el.style.setProperty('width', this.prop.eBox.width + "px", "important");
                        this.currState = 'top-pinned';
                    }
                    // unpin the element (from been pinned by pin1)
                    // if it is guided by it parent and it as reach it parent limit at the bottom.
                    else if (
                        this.settings.parentGuided &&
                        this.prop.pOffset.top + this.prop.pBox.height - this.settings.bottomSpacing - parseFloat(utils.getCssVal(this.elParent, 'padding-bottom')) < this.tmp.scrollPos + window.innerHeight
                    ) {
                        this.el.classList.remove(this.settings.className);
                        this.el.style.position = 'absolute';
                        this.el.style.top = `${this.prop.pOffset.top + this.prop.pBox.height - this.prop.eBox.height - parseFloat(utils.getCssVal(this.elParent, 'padding-bottom')) - opOffset.top}px`;
                        this.el.style.left = `${this.prop.eOffset.left - opOffset.left}px`;
                        // fix for the use of relative width on the element.
                        this.el.style.setProperty('width', this.prop.eBox.width + "px", "important");
                        this.currState = 'bottom-unpinned';
                    }
                    // unpin the element if the page scrolls to where the initial offset of the element is visible
                    else if (this.prop.eOffset.top >= this.tmp.scrollPos) {
                        this.el.classList.remove(this.settings.className);
                        this.el.style.position = 'absolute';
                        this.el.style.top = `${this.prop.eOffset.top - opOffset.top}px`;
                        this.el.style.left = `${this.prop.eOffset.left - opOffset.left}px`;
                        // fix for the use of relative width on the element.
                        this.el.style.setProperty('width', this.prop.eBox.width + "px", "important");
                        this.currState = 'top-unpinned';
                    }
                    // unpin element
                    // if element was pinned by pin1
                    // and the scroll direction for been pinned has changed
                    else if (this.currState === 'bottom-pinned' && this.tmp.scrollDir === -1) {
                        this.el.classList.remove(this.settings.className);
                        this.el.style.position = 'absolute';
                        this.el.style.top = `${prevScrollPos + window.innerHeight - this.prop.eBox.height - this.settings.bottomSpacing - opOffset.top}px`;
                        this.el.style.left = `${this.prop.eOffset.left - opOffset.left}px`;
                        // fix for the use of relative width on the element.
                        this.el.style.setProperty('width', this.prop.eBox.width + "px", "important");
                        this.currState = 'dir-bottom-unpinned';
                    }
                    // unpin element
                    // if element was pinned by pin2
                    // and the scroll direction for been pinned has changed
                    else if (this.currState === 'top-pinned' && this.tmp.scrollDir === 1) {
                        this.el.classList.remove(this.settings.className);
                        this.el.style.position = 'absolute';
                        this.el.style.top = `${prevScrollPos + this.settings.topSpacing - opOffset.top}px`;
                        this.el.style.left = `${this.prop.eOffset.left - opOffset.left}px`;
                        // fix for the use of relative width on the element.
                        this.el.style.setProperty('width', this.prop.eBox.width + "px", "important");
                        this.currState = 'dir-top-unpinned';
                    }
                }
                else {
                    // pin element at the top if element has been scrolled out of page (from top)
                    // also if element is guided by parent, the parent must have enough visible area to contain the element and its top spacing
                    // and if element is sticky, then the user must be scrolling down \/ and the element must not be recently unpined by unpin2
                    if (
                        (!this.settings.sticky || (this.tmp.scrollDir === 1 && this.currState !== 'bottom-unpinned')) &&
                        this.tmp.scrollPos > this.prop.eOffset.top - this.settings.topSpacing &&
                        (!this.settings.parentGuided || this.prop.pOffset.top + this.prop.pBox.height - this.tmp.scrollPos > this.prop.eBox.height + this.settings.topSpacing + parseFloat(utils.getCssVal(this.elParent, 'padding-bottom'))) &&
                        !this.el.classList.contains(this.settings.className)
                    ) {
                        this.el.classList.add(this.settings.className);
                        this.el.style.position = 'fixed';
                        this.el.style.top = `${this.settings.topSpacing}px`;
                        this.el.style.left = `${this.prop.eOffset.left}px`;
                        // fix for the use of relative width on the element.
                        this.el.style.setProperty('width', `${this.prop.eBox.width}px`, 'important');

                        this.currState = 'top-pinned';
                    }
                    // pin element at the bottom if element is sticky
                    // and was recently unpined by unpin2
                    // and the user is scrolling the page up /\
                    // also the parent of sticky has enough space in the viewport to contain the element
                    else if (
                        this.settings.sticky && this.currState === 'bottom-unpinned' && this.tmp.scrollDir === -1 &&
                        this.prop.pOffset.top + this.prop.pBox.height > this.tmp.scrollPos + window.innerHeight &&
                        utils.offsetPos(this.el).top + this.prop.eBox.height + this.settings.bottomSpacing >= window.innerHeight + this.tmp.scrollPos &&
                        !this.el.classList.contains(this.settings.className)
                    ) {
                        this.el.classList.add(this.settings.className);
                        this.el.style.position = 'fixed';
                        this.el.style.top = `${window.innerHeight - this.prop.eBox.height - this.settings.bottomSpacing}px`;
                        this.el.style.left = `${this.prop.eOffset.left}px`;
                        // fix for the use of relative width on the element.
                        this.el.style.setProperty('width', `${this.prop.eBox.width}px`, 'important');

                        this.currState = 'bottom-pinned';
                    }
                    // unpin the element if the page scrolls to where the initial offset of the element is visible
                    // but element must not be sticky
                    // else element must not be recently pined by pin2
                    // else user must be scrolling up /\ and must have scroll to the initial position of the element
                    else if (
                        this.tmp.scrollPos + this.settings.topSpacing <= this.prop.eOffset.top &&
                        (!this.settings.sticky || (this.currState !== 'bottom-pinned' || this.tmp.scrollDir === -1)) &&
                        this.el.classList.contains(this.settings.className)
                    ) {
                        this.el.classList.remove(this.settings.className);
                        this.el.style.position = 'absolute';
                        this.el.style.top = `${this.prop.eOffset.top - opOffset.top}px`;
                        this.el.style.left = `${this.prop.eOffset.left - opOffset.left}px`;
                        // fix for the use of relative width on the element.
                        this.el.style.setProperty('width', `${this.prop.eBox.width}px`, 'important');

                        this.currState = 'top-unpinned';
                    }
                    // unpin element and make it stay at the bottom of parent if it is parent-guided
                    // and the page has scrolled reaching or past the parent
                    // and if element was recently pinned by pin2, the user must be scrolling down \/ the page
                    // must have reach or scrolled the parent out of viewport
                    else if (
                        this.settings.parentGuided &&
                        (this.tmp.scrollPos > this.prop.pOffset.top + this.prop.pBox.height - this.prop.eBox.height - this.settings.topSpacing - parseFloat(utils.getCssVal(this.elParent, 'padding-bottom')) ||
                            (this.currState === 'bottom-pinned' && this.tmp.scrollDir === 1 && this.prop.pOffset.top + this.prop.pBox.height < this.scrollPos + window.innerHeight)
                        ) && (this.el.classList.contains(this.settings.className) || this.currState === 'reset-state')
                    ) {
                        this.el.classList.remove(this.settings.className);
                        this.el.style.position = 'absolute';
                        this.el.style.top = `${this.prop.pOffset.top + this.prop.pBox.height - this.prop.eBox.height - parseFloat(utils.getCssVal(this.elParent, 'padding-bottom')) - opOffset.top}px`;
                        // this.el.style.top = this.prop.pBox.height - parseFloat(utils.getCssVal(this.elParent, 'padding-bottom')) - this.prop.eBox.height;
                        this.el.style.left = `${this.prop.eOffset.left - opOffset.left}px`;
                        // fix for the use of relative width on the element.
                        this.el.style.setProperty('width', `${this.prop.eBox.width}px`, 'important');

                        this.currState = 'bottom-unpinned';
                    }
                }
            },
            stopScrollPin() {
                // stop height streaming
                const cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
                cancelAnimationFrame(this.sizeStreamId);

                // stop scrollPin events
                window.removeEventListener('resize', this.getGeometry.bind(this));
                window.removeEventListener('scroll', this.onScrollMtd.bind(this));
                this.el.removeEventListener('stopScrollPin', this.stopScrollPin.bind(this));
                
                // reset scrollPin element
                this.el.classList.remove(this.settings.className);
                if (this.initStyle) this.el.setAttribute('style', this.initStyle);
                else this.el.removeAttribute('style');
            }
        }
    };
    
    return {
        mounted(el, binding) {
            if (!el.lui) el.lui = {};
            el.lui.scrollPin = dnm();
            el.lui.scrollPin.initialize(el, binding);
        },
        unmounted(el) {
            utils.triggerEvent(el, 'stopScrollPin');
        }
    };
};