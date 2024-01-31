import { utils } from "../utils";

export function streamSize() {
    const dnm = {
        // config: {
        //     attributes: true,
        //     subtree: true,
        //     childList: true, 
        //     characterData: true
        // },
        // callback() {
        //     const
        //         el = arguments[0],
        //         options = arguments[1],
        //         elParent = el.parentNode,
        //         settings = { height: true, width: true }
        //     ;
            
        //     settings.height = !options ? settings.height : options.height;
        //     settings.width = !options ? settings.width : options.width;
        //     let elRect = el.getBoundingClientRect();

        //     if (settings.height && elRect.height !== parseFloat(utils.getCssVal(elParent, 'min-height'))) elParent.style.minHeight = `${elRect.height}px`;
        //     if (settings.width && elRect.width !== parseFloat(utils.getCssVal(elParent, 'min-width'))) elParent.style.minWidth = `${elRect.width}px`;
        // },
        // animOn(e) {

        // },
        streamCallback() {
            dnm.elParent.style.minHeight = `${parseFloat(utils.getCssVal(dnm.el, 'height'))}px`;
            window.requestAnimationFrame(dnm.streamCallback);
        }
    }
    return {
        mounted(el, binding) {
            dnm.el = el;
            dnm.elParent = el.parentNode;
            dnm.sizeStream = window.requestAnimationFrame(dnm.streamCallback);
            // dnm.observer = new MutationObserver(dnm.callback.bind(null, el, binding.value));
            // dnm.observer.observe(el, dnm.config);

            // window.addEventListener('animationstart' )
        },
        unmonted() {
            window.cancelAnimationFrame(dnm.sizeStream);
            // dnm.observer.disconnect();
        }
    }
}