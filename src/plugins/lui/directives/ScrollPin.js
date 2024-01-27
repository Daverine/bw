import { utils } from "../utils";

export function scrollPin() {
    const dnm = {
        default: {
            namespace: "scrollPin",
            className: "pinned",
            sticky: false,
            parentGuided: false,
            topSpacing: 0,
            bottomSpacing: 0,
            pinned: undefined,
            unpinned: undefined
        },
        initialize(el, binding) {
            // adjust settings
            dnm.el = el;
            dnm.settings = utils.isObject(binding.value) ? { ...dnm.default, ...binding.value } : dnm.default;
            dnm.settings.parentGuided = dnm.settings.sticky ? true : dnm.settings.parentGuided;
            dnm.uniqueId = utils.getUniqueId(dnm.settings.namespace);
            dnm.currState = 'unpinned';
            dnm.scrollableCont = window;
            // cache current style attribute of the scrollPin element to be used for resetting during window resize.
            dnm.initStyle = dnm.el.getAttribute('style');
            dnm.prop = {}; dnm.tmp = {};
            console.log(dnm.settings.topSpacing);
            window.addEventListener('resize', dnm.getGeometry);
            dnm.scrollableCont.addEventListener('scroll', dnm.onScrollMtd);
            dnm.el.addEventListener('spconsole', dnm.sp_console);

            // trigger a resize Method of windows used in scrollPin.
            dnm.getGeometry();
        },
        getGeometry() {
            // reset scrollPin
            dnm.el.classList.remove(dnm.settings.className);
            if (dnm.initStyle) dnm.el.setAttribute('style', dnm.initStyle);
            else dnm.el.removeAttribute('style');
            

            dnm.scrollPos = window.scrollY;
            dnm.prop.eBox = dnm.el.getBoundingClientRect();
            dnm.prop.eOffset = utils.offsetPos(dnm.el);
            dnm.tmp.pinnable = true;

            // determine if a scrollpin should be independent by element's height
            dnm.settings.independent = dnm.prop.eBox.height >= window.innerHeight;

            // needed if pinned element needs to be contained inside the parent element's boundaries
            if (dnm.settings.parentGuided) {
                dnm.elParent = dnm.el.parentNode;
                dnm.prop.pBox = elParent.getBoundingClientRect();
                dnm.prop.pOffset = utils.offsetPos(dnm.elParent);

                if (dnm.prop.eBox.height + dnm.settings.topSpacing + dnm.settings.bottomSpacing > utils.contentSize(dnm.elParent).height) {
                    dnm.tmp.pinnable = false;
                    console.warn('a scrollPin element on this page is not currently pinnable.');
                }
            }

            // trigger a scroll Method of windows used in scrollPin.
            dnm.onScrollMtd();
        },
        onScrollMtd() {
            if (!dnm.tmp.pinnable) return;
            // store previous scroll position to be used in independent scrollPin
            let prevScrollPos = dnm.tmp.scrollPos;


            dnm.tmp.scrollDir = dnm.tmp.scrollPos < window.scrollY ? 1 : dnm.tmp.scrollPos > window.scrollY ? -1 : 0;
            dnm.tmp.scrollPos = window.scrollY;

            let
                offsetParent = utils.getParents(dnm.el).filter(el => utils.getCssVal(el, 'position') !== 'static')[0] || document.body,
                opOffset = utils.offsetPos(offsetParent)
            ;

            if (dnm.settings.independent) {
                // pin the element at the bottom
                // if element bottom and bottomSpacing is visible on the screen
                // and the user is scrolling down
                // and element is not parent-guilded
                // or the parent bottom (excluding it bottom-padding and bottomSpacing) have not reach the screen bottom. 
                if (
                    !dnm.el.classList.contains(dnm.settings.className) &&
                    dnm.tmp.scrollDir === 1 &&
                    utils.offsetPos(dnm.el).top + dnm.prop.eBox.height + dnm.settings.bottomSpacing <= dnm.tmp.scrollPos + window.innerHeight &&
                    (!dnm.settings.parentGuided || dnm.prop.pOffset.top + dnm.prop.pBox.height - dnm.settings.bottomSpacing - parseFloat(utils.getCssVal(dnm.elParent, 'padding-bottom')) >= dnm.tmp.scrollPos + window.innerHeight)
                ) {
                    dnm.el.classList.add(dnm.settings.className);
                    dnm.el.style.position = 'fixed';
                    dnm.el.style.top = `${window.innerHeight - dnm.prop.eBox.height - dnm.settings.bottomSpacing}px`;
                    dnm.el.style.left = `${dnm.prop.eOffset.left}px`;
                    // fix for the use of relative width on the element.
                    dnm.el.style.setProperty('width', dnm.prop.eBox.width + "px", "important");
                    dnm.currState = 'bottom-pinned';
                }
                // pin the element at the top
                // if element top and topSpacing is visible
                // and the user is scrolling up
                // while element have not reach its initial position
                else if (
                    !dnm.el.classList.contains(dnm.settings.className) &&
                    dnm.tmp.scrollDir === -1 &&
                    utils.offsetPos(dnm.el).top + dnm.settings.topSpacing > dnm.tmp.scrollPos &&
                    dnm.tmp.scrollPos >= dnm.prop.eOffset.top - dnm.settings.topSpacing
                ) {
                    dnm.el.classList.add(dnm.settings.className);
                    dnm.el.style.position = 'fixed';
                    dnm.el.style.top = `${dnm.settings.topSpacing}px`;
                    dnm.el.style.left = `${dnm.prop.eOffset.left}px`;
                    // fix for the use of relative width on the element.
                    dnm.el.style.setProperty('width', dnm.prop.eBox.width + "px", "important");
                    dnm.currState = 'top-pinned';
                }
                // unpin the element (from been pinned by pin1)
                // if it is guided by it parent and it as reach it parent limit at the bottom.
                else if (
                    dnm.settings.parentGuided &&
                    dnm.prop.pOffset.top + dnm.prop.pBox.height - dnm.settings.bottomSpacing - parseFloat(utils.getCssVal(dnm.elParent, 'padding-bottom')) < dnm.tmp.scrollPos + window.innerHeight
                ) {
                    dnm.el.classList.remove(dnm.settings.className);
                    dnm.el.style.position = 'absolute';
                    dnm.el.style.top = `${dnm.prop.pOffset.top + dnm.prop.pBox.height - dnm.prop.eBox.height - parseFloat(utils.getCssVal(dnm.elParent, 'padding-bottom')) - opOffset.top}px`;
                    dnm.el.style.left = `${dnm.prop.eOffset.left - opOffset.left}px`;
                    // fix for the use of relative width on the element.
                    dnm.el.style.setProperty('width', dnm.prop.eBox.width + "px", "important");
                    dnm.currState = 'bottom-unpinned';
                }
                // unpin the element if the page scrolls to where the initial offset of the element is visible
                else if (dnm.prop.eOffset.top >= dnm.tmp.scrollPos) {
                    dnm.el.classList.remove(dnm.settings.className);
                    dnm.el.style.position = 'absolute';
                    dnm.el.style.top = `${dnm.prop.eOffset.top - opOffset.top}px`;
                    dnm.el.style.left = `${dnm.prop.eOffset.left - opOffset.left}px`;
                    // fix for the use of relative width on the element.
                    dnm.el.style.setProperty('width', dnm.prop.eBox.width + "px", "important");
                    dnm.currState = 'top-unpinned';
                }
                // unpin element
                // if element was pinned by pin1
                // and the scroll direction for been pinned has changed
                else if (dnm.currState === 'bottom-pinned' && dnm.tmp.scrollDir === -1) {
                    dnm.el.classList.remove(dnm.settings.className);
                    dnm.el.style.position = 'absolute';
                    dnm.el.style.top = `${prevScrollPos + window.innerHeight - dnm.prop.eBox.height - dnm.settings.bottomSpacing - opOffset.top}px`;
                    dnm.el.style.left = `${dnm.prop.eOffset.left - opOffset.left}px`;
                    // fix for the use of relative width on the element.
                    dnm.el.style.setProperty('width', dnm.prop.eBox.width + "px", "important");
                    dnm.currState = 'dir-bottom-unpinned';
                }
                // unpin element
                // if element was pinned by pin2
                // and the scroll direction for been pinned has changed
                else if (dnm.currState === 'top-pinned' && dnm.tmp.scrollDir === 1) {
                    dnm.el.classList.remove(dnm.settings.className);
                    dnm.el.style.position = 'absolute';
                    dnm.el.style.top = `${prevScrollPos + dnm.settings.topSpacing - opOffset.top}px`;
                    dnm.el.style.left = `${dnm.prop.eOffset.left - opOffset.left}px`;
                    // fix for the use of relative width on the element.
                    dnm.el.style.setProperty('width', dnm.prop.eBox.width + "px", "important");
                    dnm.currState = 'dir-top-unpinned';
                }
            }
            else {
                // pin element at the top if element has been scrolled out of page (from top)
                // also if element is guided by parent, the parent must have enough visible area to contain the element and its top spacing
                // and if element is sticky, then the user must be scrolling down \/ and the element must not be recently unpined by unpin2
                if (
                    (!dnm.settings.sticky || (dnm.tmp.scrollDir === 1 && dnm.currState !== 'bottom-unpinned')) &&
                    dnm.tmp.scrollPos > dnm.prop.eOffset.top - dnm.settings.topSpacing &&
                    (!dnm.settings.parentGuided || dnm.prop.pOffset.top + dnm.prop.pBox.height - dnm.tmp.scrollPos > dnm.prop.eBox.height + dnm.settings.topSpacing + parseFloat(utils.getCssVal(dnm.elParent, 'padding-bottom'))) &&
                    !dnm.el.classList.contains(dnm.settings.className)
                ) {
                    dnm.el.classList.add(dnm.settings.className);
                    dnm.el.style.position = 'fixed';
                    dnm.el.style.top = `${dnm.settings.topSpacing}px`;
                    dnm.el.style.left = `${dnm.prop.eOffset.left}px`;
                    // fix for the use of relative width on the element.
                    dnm.el.style.setProperty('width', `${dnm.prop.eBox.width}px`, 'important');

                    dnm.currState = 'top-pinned';
                }
                // pin element at the bottom if element is sticky
                // and was recently unpined by unpin2
                // and the user is scrolling the page up /\
                // also the parent of sticky has enough space in the viewport to contain the element
                else if (
                    dnm.settings.sticky && dnm.currState === 'bottom-unpinned' && dnm.tmp.scrollDir === -1 &&
                    dnm.prop.pOffset.top + dnm.prop.pBox.height > dnm.tmp.scrollPos + window.innerHeight &&
                    utils.offsetPos(dnm.el).top + dnm.prop.eBox.height + dnm.settings.bottomSpacing >= window.innerHeight + dnm.tmp.scrollPos &&
                    !dnm.el.classList.contains(dnm.settings.className)
                ) {
                    dnm.el.classList.add(dnm.settings.className);
                    dnm.el.style.position = 'fixed';
                    dnm.el.style.top = `${window.innerHeight - dnm.prop.eBox.height - dnm.settings.bottomSpacing}px`;
                    dnm.el.style.left = `${dnm.prop.eOffset.left}px`;
                    // fix for the use of relative width on the element.
                    dnm.el.style.setProperty('width', `${dnm.prop.ebox.width}px`, 'important');

                    dnm.currState = 'bottom-pinned';
                }
                // unpin the element if the page scrolls to where the initial offset of the element is visible
                // but element must not be sticky
                // else element must not be recently pined by pin2
                // else user must be scrolling up /\ and must have scroll to the initial position of the element
                else if (
                    dnm.tmp.scrollPos + dnm.settings.topSpacing <= dnm.prop.eOffset.top &&
                    (!dnm.settings.sticky || (dnm.currState !== 'bottom-pinned' || dnm.tmp.scrollDir === -1)) &&
                    dnm.el.classList.contains(dnm.settings.className)
                ) {
                    dnm.el.classList.remove(dnm.settings.className);
                    dnm.el.style.position = 'absolute';
                    dnm.el.style.top = `${dnm.prop.eOffset.top - opOffset.top}px`;
                    dnm.el.style.left = `${dnm.prop.eOffset.left - opOffset.left}px`;
                    // fix for the use of relative width on the element.
                    dnm.el.style.setProperty('width', `${dnm.prop.eBox.width}px`, 'important');

                    dnm.currState = 'top-unpinned';
                }
                // unpin element and make it stay at the bottom of parent if it is parent-guided
                // and the page has scrolled reaching or past the parent
                // and if element was recently pinned by pin2, the user must be scrolling down \/ the page
                // must have reach or scrolled the parent out of viewport
                else if (
                    dnm.settings.parentGuided &&
                    (dnm.tmp.scrollPos > dnm.prop.pOffset.top + dnm.prop.pBox.height - dnm.prop.eBox.height - dnm.settings.topSpacing - parseFloat(utils.getCssVal(dnm.elParent, 'padding-bottom')) ||
                        (dnm.currState === 'bottom-pinned' && dnm.tmp.scrollDir === 1 && dnm.prop.pOffset.top + dnm.prop.pBox.height < dnm.scrollPos + window.innerHeight)    
                    ) && dnm.el.classList.contains(dnm.settings.className)
                ) {
                    dnm.el.classList.remove(dnm.settings.className);
                    dnm.el.style.position = 'absolute';
                    dnm.el.style.top = `${dnm.prop.pOffset.top + dnm.prop.pBox.height - dnm.prop.eBox.height - parseFloat(utils.getCssVal(dnm.elParent, 'padding-bottom')) - opOffset.top}px`;
                    // dnm.el.style.top = dnm.prop.pBox.height - parseFloat(utils.getCssVal(dnm.elParent, 'padding-bottom')) - dnm.prop.eBox.height;
                    dnm.el.style.left = `${dnm.prop.eOffset.left - opOffset.left}px`;
                    // fix for the use of relative width on the element.
                    dnm.el.style.setProperty('width', `${dnm.prop.ebox.width}px`, 'important');

                    dnm.currState = 'bottom-unpinned';
                }
            }

            console.log(dnm.currState);
        },
        sp_console() {

        }
    }
    
    return {
        mounted(el, binding) {
            dnm.initialize(el, binding)
        },
        updated(el) {
            console.log('i sense an update');
        },
        unmounted(el) {

        }
    }
};